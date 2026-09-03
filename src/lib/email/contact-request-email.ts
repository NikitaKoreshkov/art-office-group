import { buildContactRequestMessage } from "@/lib/contacts-utils";
import type { ContactRequestPayload } from "@/lib/content/types";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function buildContactRequestEmail(payload: ContactRequestPayload, lang: "ru" | "kz" = "ru") {
  const labels =
    lang === "kz"
      ? { name: "Аты-жөні", phone: "Телефон", direction: "Қызмет бағыты", title: "Жаңа өтінім" }
      : { name: "Имя", phone: "Телефон", direction: "Направление", title: "Новая заявка с сайта" };

  const name = payload.name.trim();
  const phone = payload.phone.trim();
  const service = payload.service.trim();
  const plainText = buildContactRequestMessage(payload, lang);
  const timestamp = new Intl.DateTimeFormat(lang === "kz" ? "kk-KZ" : "ru-RU", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(new Date());

  const html = `<!DOCTYPE html>
<html lang="${lang}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(labels.title)}</title>
  </head>
  <body style="margin:0;padding:0;background:#eef1f4;font-family:Inter,Arial,sans-serif;color:#28303d;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#eef1f4;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background:#ffffff;border-radius:18px;overflow:hidden;box-shadow:0 18px 48px rgba(30,51,64,0.12);">
            <tr>
              <td style="background:linear-gradient(135deg,#1e3340 0%,#2a4555 100%);padding:28px 32px;">
                <div style="font-size:11px;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;color:rgba(255,255,255,0.45);margin-bottom:8px;">
                  ART OFFICE GROUP
                </div>
                <div style="font-size:24px;line-height:1.25;font-weight:700;color:#ffffff;">
                  ${escapeHtml(labels.title)}
                </div>
              </td>
            </tr>
            <tr>
              <td style="height:4px;background:#d42b2b;font-size:0;line-height:0;">&nbsp;</td>
            </tr>
            <tr>
              <td style="padding:28px 32px 8px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                  <tr>
                    <td style="padding:0 0 18px;border-bottom:1px solid #edf0f3;">
                      <div style="font-size:11px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:#8a929c;margin-bottom:6px;">
                        ${escapeHtml(labels.name)}
                      </div>
                      <div style="font-size:18px;line-height:1.4;font-weight:600;color:#28303d;">
                        ${escapeHtml(name)}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:18px 0;border-bottom:1px solid #edf0f3;">
                      <div style="font-size:11px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:#8a929c;margin-bottom:6px;">
                        ${escapeHtml(labels.phone)}
                      </div>
                      <div style="font-size:18px;line-height:1.4;font-weight:600;color:#28303d;">
                        <a href="tel:${escapeHtml(phone.replace(/\s/g, ""))}" style="color:#1a6b7a;text-decoration:none;">
                          ${escapeHtml(phone)}
                        </a>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:18px 0 0;">
                      <div style="font-size:11px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:#8a929c;margin-bottom:6px;">
                        ${escapeHtml(labels.direction)}
                      </div>
                      <div style="display:inline-block;padding:10px 14px;border-radius:999px;background:#fdf0f0;color:#b82222;font-size:15px;font-weight:600;line-height:1.4;">
                        ${escapeHtml(service)}
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 32px 28px;">
                <div style="padding:16px 18px;border-radius:14px;background:#f7f8fa;font-size:13px;line-height:1.6;color:#66707a;">
                  Заявка отправлена через форму на сайте art-office.kz<br />
                  ${escapeHtml(timestamp)}
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  return {
    subject: `${labels.title}: ${service}`,
    html,
    text: plainText,
  };
}
