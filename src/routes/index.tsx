import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { Marquee } from "@/components/portfolio/Marquee";
import { About } from "@/components/portfolio/About";
import { Experience } from "@/components/portfolio/Experience";
import { CreativeLab } from "@/components/portfolio/CreativeLab";
import { Showreel } from "@/components/portfolio/Showreel";
import { BeyondTheFrame } from "@/components/portfolio/BeyondTheFrame";
import { Projects } from "@/components/portfolio/Projects";
import { Credentials } from "@/components/portfolio/Credentials";
import { Contact } from "@/components/portfolio/Contact";
import { MediaModalProvider } from "@/components/portfolio/MediaModal";

const title = "B. Rama Chandra — AI Technology Intern & Creative Technologist";
const description =
  "Portfolio of B. Rama Chandra: Generative AI, cinematic AI video, creative automation and intelligent digital experiences.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <MediaModalProvider>
      <div className="grain relative">
        <Nav />
        <main>
          <Hero />
          <Marquee />
          <About />
          <Experience />
          <CreativeLab />
          <Showreel />
          <BeyondTheFrame />
          <Projects />
          <Credentials />
          <Contact />
        </main>
      </div>
    </MediaModalProvider>
  );
}
