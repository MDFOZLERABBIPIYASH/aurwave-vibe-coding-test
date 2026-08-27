import { NextResponse } from "next/server";
import {
  validateContact,
  isValid,
  type ContactPayload,
  type ContactResponse,
} from "@/lib/contact";

/**
 * POST /api/contact — receives a contact-form submission.
 *
 * Phase 06 stub: validates the payload server-side and returns
 * `{ ok: true }` on success. The real delivery (Resend / Formspree /
 * a CRM) is wired up in a later phase. The route logs the inquiry to
 * the server console so we can verify the contract end-to-end.
 *
 * Contract:
 *  - Request: JSON body matching `ContactPayload` (all fields optional
 *    except `name`, `email`, `message`).
 *  - Response: JSON matching `ContactResponse`. 200 on success, 422
 *    with field-level errors when validation fails, 400 for malformed
 *    JSON.
 */
export async function POST(request: Request): Promise<NextResponse<ContactResponse>> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid JSON body.", errors: [] },
      { status: 400 },
    );
  }

  const payload = (body ?? {}) as Partial<ContactPayload>;
  const errors = validateContact(payload);

  if (!isValid(errors)) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  // Stub: log the inquiry. A real provider will replace this block.
  // See plan.md open question #4 (contact form backend).
  console.info("[contact] new inquiry", {
    name: payload.name,
    email: payload.email,
    company: payload.company,
    projectType: payload.projectType,
    budget: payload.budget,
    messagePreview:
      typeof payload.message === "string"
        ? payload.message.slice(0, 120)
        : undefined,
  });

  return NextResponse.json({ ok: true });
}
