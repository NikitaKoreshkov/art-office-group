import { NextResponse } from "next/server";
import { buildContactRequestEmail } from "@/lib/email/contact-request-email";
import { getContactEmailConfig } from "@/lib/email/resend-config";
import type { ContactRequestPayload } from "@/lib/content/types";

type ContactRequestBody = ContactRequestPayload & {
  lang?: "ru" | "kz";
};

function isValidPayload(body: Partial<ContactRequestBody>): body is ContactRequestBody {
  return Boolean(body.name?.trim() && body.phone?.trim() && body.service?.trim());
}

export async function POST(request: Request) {
  let body: Partial<ContactRequestBody>;

  try {
    body = (await request.json()) as Partial<ContactRequestBody>;
  } catch {
    return NextResponse.json({ error: "Некорректный запрос" }, { status: 400 });
  }

  if (!isValidPayload(body)) {
    return NextResponse.json({ error: "Заполните все поля формы" }, { status: 400 });
  }

  const lang = body.lang === "kz" ? "kz" : "ru";
  const payload: ContactRequestPayload = {
    name: body.name.trim(),
    phone: body.phone.trim(),
    service: body.service.trim(),
  };

  const email = buildContactRequestEmail(payload, lang);

  let config: ReturnType<typeof getContactEmailConfig>;
  try {
    config = getContactEmailConfig();
  } catch (error) {
    console.error("Contact email config error:", error);
    return NextResponse.json({ error: "Сервис отправки не настроен" }, { status: 503 });
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: config.from,
        to: [config.to],
        subject: email.subject,
        html: email.html,
        text: email.text,
        reply_to: config.to,
      }),
    });

    if (!response.ok) {
      const details = await response.text();
      console.error("Resend API error:", response.status, details);
      return NextResponse.json({ error: "Не удалось отправить заявку" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form send failed:", error);
    return NextResponse.json({ error: "Не удалось отправить заявку" }, { status: 502 });
  }
}
