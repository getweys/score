"use server";

import nodemailer from "nodemailer";
import type { ContactFormState } from "@/lib/contact-form";
import { contactFormRecipient } from "@/lib/site-content";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!email || !isValidEmail(email)) {
    return { ok: false, message: "Please enter a valid email address." };
  }

  if (!phone) {
    return { ok: false, message: "Please enter your phone number." };
  }

  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return {
      ok: false,
      message: `Unable to send right now. Please email us directly at ${contactFormRecipient}.`,
    };
  }

  const transporter = nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: { user, pass },
  });

  try {
    await transporter.sendMail({
      from: process.env.CONTACT_FORM_FROM ?? user,
      to: process.env.CONTACT_FORM_TO ?? contactFormRecipient,
      replyTo: email,
      subject: `SCORE website contact — ${name || "New message"}`,
      text: [
        `Name: ${name || "—"}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        "",
        "Message:",
        message || "—",
      ].join("\n"),
    });

    return { ok: true, message: "Thank you. Your message has been sent successfully." };
  } catch {
    return {
      ok: false,
      message: `Something went wrong. Please try again or email ${contactFormRecipient} directly.`,
    };
  }
}
