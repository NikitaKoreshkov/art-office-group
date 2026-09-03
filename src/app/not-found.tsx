import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Страница не найдена",
  description: "Запрошенная страница не найдена на сайте ART OFFICE GROUP.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main id="main-content" className="min-h-screen bg-light pt-[calc(var(--header-offset)+2rem)] pb-20">
      <Container>
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8b919c]">404</p>
        <h1 className="font-display text-[clamp(1.75rem,5vw,3rem)] font-semibold leading-tight tracking-[-0.03em] text-ink">
          Страница не найдена
        </h1>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[#8b919c]">
          Возможно, ссылка устарела или страница была перемещена.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[13px] font-semibold text-white transition-opacity hover:opacity-90"
        >
          На главную
        </Link>
      </Container>
    </main>
  );
}
