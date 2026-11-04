import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { skillCategories } from "@/data/profile";
import { cn } from "@/lib/utils";
import { Reveal, Section, SectionHeading } from "./primitives";

export function CreativeLab() {
  const [activeId, setActiveId] = useState(skillCategories[0].id);
  const active = skillCategories.find((c) => c.id === activeId)!;
  const activeIndex = skillCategories.indexOf(active);

  return (
    <Section id="lab" className="overflow-hidden">
      <div className="glow-orb right-0 top-1/3 size-[480px] bg-lavender opacity-20" />
      <SectionHeading
        index="03"
        eyebrow="Creative Technology Lab"
        title={
          <>
            The toolkit behind <span className="font-serif font-normal italic text-aurora">the work.</span>
          </>
        }
        lead="Six disciplines I combine — from generating footage with AI to shaping it into stories people watch to the end. Select a discipline to explore it."
      />

      <div className="mt-16 grid gap-10 lg:grid-cols-[minmax(0,420px)_1fr] lg:gap-16">
        <Reveal>
          <div role="tablist" aria-label="Skill categories" className="flex flex-col">
            {skillCategories.map((c, i) => {
              const on = c.id === activeId;
              return (
                <button
                  key={c.id}
                  role="tab"
                  aria-selected={on}
                  aria-controls="lab-panel"
                  onClick={() => setActiveId(c.id)}
                  onMouseEnter={() => setActiveId(c.id)}
                  className={cn(
                    "group relative flex items-center gap-5 border-b border-border py-5 text-left transition-colors",
                    on ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <span className={cn("font-mono text-xs transition", on ? "text-lavender" : "")}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-xl font-semibold sm:text-2xl">{c.name}</span>
                  <span className="ml-auto font-mono text-xs opacity-60">{c.tools.length}</span>
                  {on && (
                    <motion.span
                      layoutId="lab-underline"
                      className="absolute -bottom-px left-0 h-px w-full bg-aurora"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            id="lab-panel"
            role="tabpanel"
            className="glass relative aspect-square w-full overflow-hidden rounded-[2rem] sm:aspect-[4/3] lg:aspect-square"
          >
            {/* Orbit field */}
            <div className="absolute inset-0 grid place-items-center">
              {[0.92, 0.66, 0.4].map((s, i) => (
                <div
                  key={s}
                  className="absolute rounded-full border border-border"
                  style={{ width: `${s * 100}%`, height: `${s * 100}%`, opacity: 1 - i * 0.2 }}
                />
              ))}
              <div className="absolute size-1/3 rounded-full bg-aurora opacity-20 blur-3xl" />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                className="absolute inset-0"
                initial={{ opacity: 0, rotate: -12, scale: 0.92 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 12, scale: 0.92 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Center */}
                <div className="absolute inset-0 grid place-items-center p-[28%] text-center">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-lavender">
                      {String(activeIndex + 1).padStart(2, "0")} / {String(skillCategories.length).padStart(2, "0")}
                    </p>
                    <h3 className="mt-2 font-display text-lg font-bold leading-tight sm:text-2xl">{active.name}</h3>
                    <p className="mt-2 hidden text-xs text-muted-foreground sm:block">{active.tagline}</p>
                  </div>
                </div>

                {/* Orbiting tool nodes */}
                <div className="absolute inset-0 animate-orbit motion-reduce:animate-none">
                  {active.tools.map((t, i) => {
                    const angle = (i / active.tools.length) * Math.PI * 2 - Math.PI / 2;
                    const r = 33;
                    const x = 50 + Math.cos(angle) * r;
                    const y = 50 + Math.sin(angle) * r;
                    return (
                      <div
                        key={t}
                        className="absolute -translate-x-1/2 -translate-y-1/2"
                        style={{ left: `${x}%`, top: `${y}%` }}
                      >
                        <div className="animate-counter-orbit motion-reduce:animate-none">
                          <motion.div
                            initial={{ opacity: 0, scale: 0.6 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.15 + i * 0.08 }}
                            className="glass-strong whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium shadow-glow sm:px-4 sm:py-2 sm:text-sm"
                          >
                            <span className="mr-2 inline-block size-1.5 rounded-full bg-aurora align-middle" />
                            {t}
                          </motion.div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <ul className="mt-5 flex flex-wrap gap-2 sm:hidden" aria-label={`${active.name} tools`}>
            {active.tools.map((t) => (
              <li key={t} className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                {t}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
