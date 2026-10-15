import { Resend } from "resend";

/**
 * Shared Resend client + addressing for all transactional routes.
 * Defined once here so every API route uses the same sender and inbox.
 */
export const resend = new Resend(process.env.RESEND_API_KEY);

export const fromAddress =
  process.env.RESEND_FROM ?? "Sejfarms Website <onboarding@resend.dev>";

/** Inbox that receives website enquiries, applications and submissions. */
export const inbox =
  process.env.CONTACT_INBOX ?? "sejfarmsconsultltd@gmail.com";
