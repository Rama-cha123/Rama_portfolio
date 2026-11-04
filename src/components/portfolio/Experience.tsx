import { motion, useScroll, useSpring } from "framer-motion";
import { Briefcase, MapPin } from "lucide-react";
import { useRef, useState } from "react";
import { experience } from "@/data/profile";
import { cn } from "@/lib/utils";
import { Reveal, Section, SectionHeading } from "./primitives";

export function Experience() {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 70%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const [hover, setHover] = useState<number | null>(null);

  return (
    <Section id="experience" className="overflow-hidden">
      <div className="glow-orb -left-60 top-40 size-[500px] bg-electric opacity-15" />
      <SectionHeading
        index="02"
        eyebrow="Experience"
        title={
          <>
            Where ideas meet <span className="font-serif font-normal italic text-aurora">infrastructure.</span>
          </>
        }
      />

      <div className="mt-16 grid gap-12 lg:grid-cols-[380px_1fr] lg:gap-20">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <div className="glass relative overflow-hidden rounded-3xl p-8 shadow-glow">
            <div className="absolute -right-16 -top-16 size-48 rounded-full bg-aurora opacity-25 blur-3xl" />
            <div className="relative">
              <div className="mb-8 grid size-12 place-items-center rounded-2xl border border-border bg-surface">
                <Briefcase className="size-5 text-lavender" strokeWidth={1.5} />
              </div>
              <p className="eyebrow">{experience.period}</p>
              <h3 className="mt-3 font-display text-3xl font-bold leading-tight">{experience.role}</h3>
              <p className="mt-1 text-lg text-chrome">{experience.company}</p>
              <div className="hairline my-6" />
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="size-4" /> {experience.mode}
              </p>
              <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-lavender/30 bg-lavender/10 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-lavender">
                <span className="size-1.5 animate-pulse-soft rounded-full bg-lavender" /> Current role
              </p>
            </div>
          </div>
        </Reveal>

        <ol ref={listRef} className="relative">
          <div className="absolute bottom-2 left-[19px] top-2 w-px bg-border" aria-hidden />
          <motion.div
            aria-hidden
            className="absolute left-[19px] top-2 w-px origin-top bg-gradient-to-b from-lavender to-electric"
            style={{ scaleY: progress, bottom: 8 }}
          />
          {experience.responsibilities.map((r, i) => (
            <li
              key={r.title}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              className="relative pb-10 pl-16 last:pb-0"
            >
              <Reveal delay={i * 0.05}>
                <span
                  className={cn(
                    "absolute left-0 top-0 grid size-10 place-items-center rounded-full border font-mono text-xs transition-all duration-500",
                    hover === i
                      ? "border-lavender bg-lavender text-background shadow-glow"
                      : "border-border bg-background text-muted-foreground",
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div
                  className={cn(
                    "rounded-2xl border p-6 transition-all duration-500",
                    hover === i ? "border-lavender/40 bg-surface translate-x-1" : "border-transparent",
                  )}
                >
                  <h4 className="font-display text-xl font-semibold sm:text-2xl">{r.title}</h4>
                  <p className="mt-2 text-muted-foreground">{r.body}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
