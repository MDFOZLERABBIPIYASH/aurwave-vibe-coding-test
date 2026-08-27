import { describe, it, expect } from "vitest";
import { validateContact, isValid } from "@/lib/contact";

describe("validateContact", () => {
  it("accepts a complete, well-formed payload", () => {
    const errors = validateContact({
      name: "Ada Lovelace",
      email: "ada@example.com",
      message: "I would like to talk about a new marketing site.",
    });
    expect(errors).toEqual([]);
    expect(isValid(errors)).toBe(true);
  });

  it("flags missing required fields", () => {
    const errors = validateContact({
      name: "",
      email: "",
      message: "",
    });
    const fields = errors.map((e) => e.field);
    expect(fields).toContain("name");
    expect(fields).toContain("email");
    expect(fields).toContain("message");
  });

  it("rejects an invalid email", () => {
    const errors = validateContact({
      name: "Ada",
      email: "not-an-email",
      message: "Hello, I would like to chat about a project.",
    });
    const emailError = errors.find((e) => e.field === "email");
    expect(emailError?.message).toMatch(/valid email/i);
  });

  it("requires messages to be at least 10 characters", () => {
    const errors = validateContact({
      name: "Ada",
      email: "ada@example.com",
      message: "short",
    });
    const messageError = errors.find((e) => e.field === "message");
    expect(messageError).toBeDefined();
  });

  it("treats whitespace-only fields as empty", () => {
    const errors = validateContact({
      name: "   ",
      email: "ada@example.com",
      message: "A real message that is more than ten characters long.",
    });
    expect(errors.find((e) => e.field === "name")).toBeDefined();
  });

  it("does not flag optional fields when missing", () => {
    const errors = validateContact({
      name: "Ada",
      email: "ada@example.com",
      message: "A real message that is more than ten characters long.",
    });
    expect(errors).toEqual([]);
  });
});
