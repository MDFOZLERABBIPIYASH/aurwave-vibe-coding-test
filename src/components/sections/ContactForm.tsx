"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import {
  validateContact,
  type ContactError,
  type ContactPayload,
  type ContactResponse,
} from "@/lib/contact";

/**
 * Contact form.
 *
 * Validation runs both client-side (before submit) and server-side (in
 * `/api/contact`). The client uses the same `validateContact` helper as
 * the server so the rules cannot drift.
 *
 * UX states:
 *   - idle: form is editable.
 *   - submitting: submit button is disabled and shows "Sending…".
 *   - success: form is replaced by a thank-you panel.
 *   - error: form is editable with a server error message above the
 *     fields; field-level errors persist under the offending input.
 */
type FormState = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<ContactError[]>([]);
  const [serverError, setServerError] = useState<string | null>(null);
  const [values, setValues] = useState<ContactPayload>({
    name: "",
    email: "",
    company: "",
    projectType: "",
    budget: "",
    message: "",
  });
  const firstInvalidRef = useRef<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null>(null);
  const formId = useId();

  function update<K extends keyof ContactPayload>(key: K, value: ContactPayload[K]) {
    setValues((v) => ({ ...v, [key]: value }));
    // Clear the field-level error for this field as the user types.
    setErrors((es) => es.filter((e) => e.field !== key));
  }

  function fieldError(name: keyof ContactPayload): string | undefined {
    return errors.find((e) => e.field === name)?.message;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setServerError(null);

    const localErrors = validateContact(values);
    if (localErrors.length > 0) {
      setErrors(localErrors);
      // Move focus to the first invalid field for screen-reader users.
      const first = localErrors[0]?.field;
      if (first) {
        const el = document.getElementById(`${formId}-${first}`) as
          | HTMLInputElement
          | HTMLTextAreaElement
          | HTMLSelectElement
          | null;
        if (el) {
          el.focus();
          firstInvalidRef.current = el;
        }
      }
      return;
    }

    setState("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await res.json()) as ContactResponse;

      if (res.ok && data.ok) {
        setState("success");
        return;
      }

      if ("errors" in data && Array.isArray(data.errors) && data.errors.length > 0) {
        setErrors(data.errors);
        const firstField = data.errors[0]?.field;
        if (firstField) {
          const el = document.getElementById(`${formId}-${firstField}`) as
            | HTMLInputElement
            | HTMLTextAreaElement
            | HTMLSelectElement
            | null;
          el?.focus();
        }
      }
      if ("message" in data && typeof data.message === "string") {
        setServerError(data.message);
      } else {
        setServerError("We couldn't send your message. Please try again.");
      }
      setState("error");
    } catch {
      setServerError("Network error — please try again in a moment.");
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-lg border border-border bg-background p-8"
      >
        <h2 className="font-display text-h3 font-semibold tracking-tight text-foreground">
          Thanks — message received
        </h2>
        <p className="mt-3 text-body text-muted-foreground">
          We&apos;ll get back to you within two business days. If your
          inquiry is time-sensitive, email us directly at{" "}
          <a
            href="mailto:hello@aurwave.com"
            className="text-foreground underline decoration-muted-foreground/40 underline-offset-4 hover:decoration-foreground"
          >
            hello@aurwave.com
          </a>
          .
        </p>
      </div>
    );
  }

  const isSubmitting = state === "submitting";

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-lg border border-border bg-background p-6 sm:p-8"
      aria-label="Project inquiry"
      aria-describedby={serverError ? `${formId}-server-error` : undefined}
    >
      {serverError ? (
        <div
          id={`${formId}-server-error`}
          role="alert"
          className="mb-6 rounded-md border border-red-300 bg-red-50 p-4 text-small text-red-900 dark:border-red-800 dark:bg-red-950 dark:text-red-100"
        >
          {serverError}
        </div>
      ) : null}

      {errors.length > 0 ? (
        <div
          role="alert"
          className="mb-6 rounded-md border border-border bg-muted p-4 text-small text-foreground"
        >
          <p className="font-medium">Please fix the following:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-muted-foreground">
            {errors.map((e, i) => (
              <li key={i}>{e.message}</li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id={`${formId}-name`}
          label="Name"
          required
          autoComplete="name"
          value={values.name}
          onChange={(v) => update("name", v)}
          error={fieldError("name")}
        />
        <Field
          id={`${formId}-email`}
          label="Email"
          type="email"
          required
          autoComplete="email"
          value={values.email}
          onChange={(v) => update("email", v)}
          error={fieldError("email")}
        />
        <Field
          id={`${formId}-company`}
          label="Company"
          autoComplete="organization"
          value={values.company ?? ""}
          onChange={(v) => update("company", v)}
        />
        <SelectField
          id={`${formId}-projectType`}
          label="Project type"
          value={values.projectType ?? ""}
          onChange={(v) => update("projectType", v)}
          options={[
            "Web design",
            "Web development",
            "UI/UX",
            "E-commerce",
            "Redesign",
            "Performance",
            "Other",
          ]}
        />
        <div className="sm:col-span-2">
          <SelectField
            id={`${formId}-budget`}
            label="Budget range"
            value={values.budget ?? ""}
            onChange={(v) => update("budget", v)}
            options={["< $10k", "$10k – $25k", "$25k – $50k", "$50k – $100k", "$100k+"]}
          />
        </div>
        <div className="sm:col-span-2">
          <Field
            id={`${formId}-message`}
            label="Message"
            multiline
            required
            rows={5}
            value={values.message}
            onChange={(v) => update("message", v)}
            error={fieldError("message")}
          />
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-small text-muted-foreground">
          We reply within two business days.
        </p>
        <Button
          type="submit"
          intent="primary"
          size="lg"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
        >
          {isSubmitting ? "Sending…" : "Send message"}
        </Button>
      </div>
    </form>
  );
}

interface FieldProps {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  multiline?: boolean;
  rows?: number;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

function Field({
  id,
  label,
  type = "text",
  required,
  autoComplete,
  multiline,
  rows = 4,
  value,
  onChange,
  error,
}: FieldProps) {
  const errorId = error ? `${id}-error` : undefined;
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-small font-medium text-foreground"
      >
        {label}
        {required ? (
          <span aria-hidden className="ml-1 text-muted-foreground">
            *
          </span>
        ) : null}
      </label>
      {multiline ? (
        <textarea
          id={id}
          name={id}
          required={required}
          rows={rows}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={errorId}
          className={cn(inputClass, error && "border-red-500 focus-visible:ring-red-500")}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          required={required}
          autoComplete={autoComplete}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={errorId}
          className={cn(inputClass, error && "border-red-500 focus-visible:ring-red-500")}
        />
      )}
      {error ? (
        <p id={errorId} className="mt-1 text-small text-red-600 dark:text-red-400">
          {error}
        </p>
      ) : null}
    </div>
  );
}

interface SelectFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}

function SelectField({ id, label, value, onChange, options }: SelectFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-small font-medium text-foreground">
        {label}
      </label>
      <select
        id={id}
        name={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={inputClass}
      >
        <option value="" disabled>
          Select…
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

const inputClass = cn(
  "mt-2 block w-full rounded-md border border-border bg-background px-3 py-2 text-body text-foreground",
  "placeholder:text-muted-foreground",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  "disabled:cursor-not-allowed disabled:opacity-60",
);
