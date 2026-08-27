"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

/**
 * Contact form — Phase 04 stub.
 *
 * Renders the form fields and a client-side success state. The full
 * validation, accessibility (error messages, focus management), and
 * `/api/contact` server route land in Phase 06. For now, submitting
 * the form short-circuits to a local success state so the layout is
 * usable end-to-end during development.
 */
export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Phase 06: POST to /api/contact and surface server errors.
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div
        role="status"
        className={cn(
          "rounded-lg border border-border bg-background p-8",
        )}
      >
        <h2 className="font-display text-h3 font-semibold tracking-tight text-foreground">
          Thanks — message received
        </h2>
        <p className="mt-3 text-body text-muted-foreground">
          We&apos;ll reply within two business days. The form will be wired up to
          a real backend in Phase 06; this is a local success state for now.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-lg border border-border bg-background p-6 sm:p-8"
      aria-label="Project inquiry"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Name" required autoComplete="name" />
        <Field
          id="email"
          label="Email"
          type="email"
          required
          autoComplete="email"
        />
        <Field id="company" label="Company" autoComplete="organization" />
        <SelectField
          id="projectType"
          label="Project type"
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
            id="budget"
            label="Budget range"
            options={[
              "< $10k",
              "$10k – $25k",
              "$25k – $50k",
              "$50k – $100k",
              "$100k+",
            ]}
          />
        </div>
        <div className="sm:col-span-2">
          <Field
            id="message"
            label="Message"
            multiline
            required
            rows={5}
          />
        </div>
      </div>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-small text-muted-foreground">
          We reply within two business days.
        </p>
        <Button type="submit" intent="primary" size="lg">
          Send message
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
}

function Field({
  id,
  label,
  type = "text",
  required,
  autoComplete,
  multiline,
  rows = 4,
}: FieldProps) {
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
          className={inputClass}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          required={required}
          autoComplete={autoComplete}
          className={inputClass}
        />
      )}
    </div>
  );
}

interface SelectFieldProps {
  id: string;
  label: string;
  options: string[];
}

function SelectField({ id, label, options }: SelectFieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-small font-medium text-foreground"
      >
        {label}
      </label>
      <select id={id} name={id} defaultValue="" className={inputClass}>
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
