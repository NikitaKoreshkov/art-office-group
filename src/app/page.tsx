import { Hero } from "@/components/Hero";
import { SiteContent } from "@/components/SiteContent";
import { getSiteContent } from "@/lib/content/get-site-content";

export default async function Home() {
  const content = await getSiteContent();

  return (
    <main id="main-content" className="overflow-x-hidden bg-light">
      {content.hero.enabled && <Hero />}
      <SiteContent />
    </main>
  );
}
