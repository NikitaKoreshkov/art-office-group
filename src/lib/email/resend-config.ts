function getFromEmail() {
  return process.env.RESEND_FROM_EMAIL || "info@art-office.kz";
}

export function getContactEmailConfig() {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = getFromEmail();
  const notifyEmail = process.env.CONTACT_NOTIFY_EMAIL || fromEmail;

  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured");
  }

  return {
    apiKey,
    from: `ART OFFICE GROUP <${fromEmail}>`,
    to: notifyEmail,
  };
}
