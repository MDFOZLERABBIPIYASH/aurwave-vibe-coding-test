/**
 * Shared contact-form types and validation.
 *
 * Used by the client form (ContactForm.tsx) for inline error messages
 * and by the server route (`app/api/contact/route.ts`) for the same
 * validation on the wire. Defining it once keeps the two sides in
 * agreement.
 */

export type ContactPayload = {
  name: string;
  email: string;
  company?: string;
  projectType?: string;
  budget?: string;
  message: string;
};

export type ContactError = {
  /** Dot-path into the payload, e.g. `"email"`. `null` for form-level errors. */
  field: keyof ContactPayload | null;
  message: string;
};

export type ContactResponse =
  | { ok: true }
  | { ok: false; errors: ContactError[]; message?: string };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const REQUIRED_FIELDS: (keyof ContactPayload)[] = ["name", "email", "message"];

/**
 * Validate a contact-form payload. Returns a list of field-level errors
 * (or an empty list when the payload is valid).
 */
export function validateContact(
  payload: Partial<ContactPayload>,
): ContactError[] {
  const errors: ContactError[] = [];

  for (const field of REQUIRED_FIELDS) {
    const value = payload[field];
    if (!value || !String(value).trim()) {
      errors.push({
        field,
        message: `${labelFor(field)} is required.`,
      });
    }
  }

  if (payload.email && !EMAIL_PATTERN.test(String(payload.email).trim())) {
    errors.push({
      field: "email",
      message: "Enter a valid email address.",
    });
  }

  if (payload.message && String(payload.message).trim().length > 0 && String(payload.message).trim().length < 10) {
    errors.push({
      field: "message",
      message: "Tell us a little more — at least 10 characters.",
    });
  }

  return errors;
}

/** True if there are no field-level errors. */
export function isValid(errors: ContactError[]): boolean {
  return errors.length === 0;
}

function labelFor(field: keyof ContactPayload): string {
  switch (field) {
    case "name":
      return "Name";
    case "email":
      return "Email";
    case "message":
      return "Message";
    case "company":
      return "Company";
    case "projectType":
      return "Project type";
    case "budget":
      return "Budget range";
  }
}
