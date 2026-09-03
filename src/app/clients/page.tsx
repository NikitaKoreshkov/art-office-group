import type { Metadata } from "next";
import { BackLink } from "@/components/ui/BackLink";
import { ClientPartnerCard } from "@/components/ClientPartnerCard";
import { FooterSection } from "@/components/FooterSection";
import { Container } from "@/components/ui/Container";
import { getSiteContent } from "@/lib/content/get-site-content";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent();
  const page = content.pages.clients;

  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: "/clients" },
  };
}

export default async function ClientsPage() {
  const content = await getSiteContent();
  const clients = content.homeSections.clients.items;
  const page = content.pages.clients;

  return (
    <>
      <main id="main-content" className="min-h-screen bg-[#f4f5f7]" data-header-theme="light">
        <div className="pt-[calc(var(--header-offset)+1.5rem)] pb-16 sm:pb-20">
          <Container>
            <div className="mb-8 sm:mb-10">
              <BackLink href="/#clients" className="mt-0" />
              <p className="mb-2 mt-6 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8b919c]">{page.label}</p>
              <h1 className="font-display text-[clamp(1.75rem,5vw,3rem)] font-semibold leading-tight tracking-[-0.03em] text-ink">
                {page.heading}
              </h1>
            </div>

            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 lg:gap-5">
              {clients.map((client, index) => (
                <li
                  key={client.id}
                  className="projects-card-appear"
                  style={{ animationDelay: `${index * 30}ms` }}
                >
                  <ClientPartnerCard client={client} index={index} />
                </li>
              ))}
            </ul>
          </Container>
        </div>
      </main>

      <FooterSection />
    </>
  );
}
