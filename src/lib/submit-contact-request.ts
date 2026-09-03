import type { ContactRequestPayload } from "@/lib/content/types";

export async function submitContactRequest(payload: ContactRequestPayload, lang: "ru" | "kz" = "ru") {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...payload, lang }),
  });

  if (!response.ok) {
    const data = (await response.json().catch(() => null)) as { error?: string } | null;
    throw new Error(data?.error || "Не удалось отправить заявку");
  }
}
