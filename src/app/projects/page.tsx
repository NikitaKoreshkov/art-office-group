import { ProjectsPageContent } from "@/components/ProjectsPageContent";
import { FooterSection } from "@/components/FooterSection";
import { Container } from "@/components/ui/Container";

export default function ProjectsPage() {
  return (
    <>
      <main id="main-content" className="min-h-screen bg-[#f4f5f7]" data-header-theme="light">
        <div className="pt-[calc(var(--header-offset)+2rem)] pb-20">
          <Container>
            <ProjectsPageContent />
          </Container>
        </div>
      </main>

      <FooterSection />
    </>
  );
}
