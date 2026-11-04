import { Brain, Clapperboard, Sparkles, Workflow } from "lucide-react";
import { Reveal, Section, SectionHeading, sheenMove } from "./primitives";

const pillars = [
  { icon: Brain, title: "Generative AI", body: "Working with large language and generative models to build useful, intelligent tools." },
  { icon: Workflow, title: "Automation", body: "Connecting APIs and AI into workflows that remove repetitive work." },
  { icon: Clapperboard, title: "Cinematic storytelling", body: "Using AI video tools to tell mythological and imaginative stories." },
  { icon: Sparkles, title: "Visual experiences", body: "Shaping interfaces and visuals that feel considered and alive." },
];

export function About() {
  return (
    <Section id="about">
      <div className="grid gap-16 lg:grid-cols-[1.1fr_1fr] lg:gap-24">
        <SectionHeading
          index="01"
          eyebrow="About"
          title={
            <>
              Engineer by training.
              <br />
              <span className="font-serif font-normal italic text-aurora">Storyteller</span> by instinct.
            </>
          }
        />
        <Reveal delay={0.1} className="space-y-6 self-end text-base leading-relaxed text-muted-foreground sm:text-lg">
          <p>
            I'm an AI &amp; ML graduate in Computer Science Engineering who enjoys the space where engineering and
            imagination overlap. On one side, I build with generative AI — prompts, APIs, retrieval workflows and
            automation. On the other, I use those same tools to direct cinematic, story-driven video.
          </p>
          <p>
            What connects both is curiosity: how intelligent systems can help people create things that were
            hard to make before — and how to make them feel <span className="text-foreground">human</span>.
          </p>
        </Reveal>
      </div>

      <div className="mt-20 grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {pillars.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.08} className="h-full">
            <div
              onPointerMove={sheenMove}
              className="card-sheen group flex h-full flex-col gap-10 bg-background p-7 transition-colors hover:bg-surface"
            >
              <div className="relative z-10 flex items-center justify-between">
                <p.icon className="size-6 text-silver transition group-hover:text-lavender" strokeWidth={1.4} />
                <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
              </div>
              <div className="relative z-10">
                <h3 className="font-display text-xl font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
