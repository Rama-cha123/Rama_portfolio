import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Clapperboard, FileText, Film, Lightbulb, Scissors, Send, Wand2 } from "lucide-react";
import { useState, type ReactNode } from "react";
import { videoLabel, videoThumb, videos } from "@/data/videos";
import { cn } from "@/lib/utils";
import { useMediaModal } from "./MediaModal";
import { Reveal, Section, SectionHeading, toMedia } from "./primitives";

/** Subtle 3D tilt that follows the pointer. */
function Tilt({ children, className }: { children: ReactNode; className?: string }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [5, -5]), { stiffness: 150, damping: 20 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), { stiffness: 150, damping: 20 });
  return (
    <div style={{ perspective: 1400 }} className={className}>
      <motion.div
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        onPointerMove={(e) => {
          if (e.pointerType !== "mouse") return;
          const r = e.currentTarget.getBoundingClientRect();
          mx.set((e.clientX - r.left) / r.width - 0.5);
          my.set((e.clientY - r.top) / r.height - 0.5);
        }}
        onPointerLeave={() => {
          mx.set(0);
          my.set(0);
        }}
        className="h-full"
      >
        {children}
      </motion.div>
    </div>
  );
}

const mythFocus = [
  "AI-generated mythological storytelling",
  "Cinematic scene design",
  "Visual composition",
  "Prompt engineering",
  "Video production & editing",
];

const workflow = [
  { icon: Lightbulb, title: "Idea", body: "Start from a story, topic or brief and define the intent of the piece." },
  { icon: FileText, title: "Script & prompts", body: "Use AI assistants to draft scripts and design prompts for each scene." },
  { icon: Wand2, title: "Generate", body: "Produce visuals, video and voice with generative tools." },
  { icon: Scissors, title: "Edit & assemble", body: "Cut, pace and sync voiceover and music into a finished piece." },
  { icon: Send, title: "Publish", body: "Format for Shorts, Reels or long-form and share." },
];

export function Projects() {
  const { open } = useMediaModal();
  const [step, setStep] = useState(0);
  const featuredIdx = Math.max(0, videos.findIndex((v) => v.featured));
  const stack = [featuredIdx, ...videos.map((_, i) => i).filter((i) => i !== featuredIdx && videos[i]?.orientation === "landscape")].slice(0, 4);

  return (
    <Section id="projects">
      <SectionHeading
        index="05"
        eyebrow="Selected Projects"
        title={
          <>
            Work that <span className="font-serif font-normal italic text-aurora">moves.</span>
          </>
        }
      />

      {/* Project 1 */}
      <Reveal className="mt-16">
        <Tilt>
          <article className="relative grid overflow-hidden rounded-[2rem] border border-border bg-surface lg:grid-cols-[1fr_1.15fr]">
            <div className="relative z-10 flex flex-col justify-between gap-10 p-8 sm:p-12">
              <div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-lavender">P—01</span>
                  <span className="eyebrow">AI Cinematic Video</span>
                </div>
                <h3 className="mt-6 font-display text-3xl font-bold leading-tight sm:text-5xl">
                  AI Cinematic Video Creation
                </h3>
                <p className="mt-2 font-serif text-2xl italic text-muted-foreground">Mythology-based series</p>
                <p className="mt-6 max-w-md leading-relaxed text-muted-foreground">
                  A series of short cinematic films retelling stories from Indian mythology — every scene generated
                  with AI, then composed, edited and scored into a narrative.
                </p>
              </div>
              <ul className="flex flex-wrap gap-2">
                {mythFocus.map((f) => (
                  <li key={f} className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground">
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative min-h-[380px] overflow-hidden bg-background/40 sm:min-h-[480px]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,color-mix(in_oklab,var(--lavender)_25%,transparent),transparent_60%)]" />
              <div className="group/stack absolute inset-0 flex items-center justify-center">
                {stack.map((vi, k) => {
                  const v = videos[vi]!;
                  const offset = k - (stack.length - 1) / 2;
                  return (
                    <button
                      key={v.driveId}
                      onClick={() => open(toMedia(v, vi))}
                      aria-label={`Play ${videoLabel(v, vi)}`}
                      className="absolute w-[62%] overflow-hidden rounded-xl border border-border shadow-deep transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)] hover:z-20 hover:scale-105 focus-visible:z-20"
                      style={{
                        transform: `translate(${offset * 10}%, ${offset * 9}%) rotate(${offset * 4}deg)`,
                        zIndex: 10 - Math.abs(Math.round(offset * 2)),
                      }}
                    >
                      <img src={videoThumb(v)} alt={`Frame from ${videoLabel(v, vi)}`} loading="lazy" className="aspect-video w-full object-cover" />
                      <span className="absolute inset-0 grid place-items-center bg-background/0 opacity-0 transition hover:bg-background/30 hover:opacity-100">
                        <Film className="size-7" />
                      </span>
                    </button>
                  );
                })}
              </div>
              <p className="absolute bottom-4 left-0 right-0 text-center font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                Select a frame to play
              </p>
            </div>
          </article>
        </Tilt>
      </Reveal>

      {/* Project 2 */}
      <Reveal className="mt-8">
        <Tilt>
          <article className="relative overflow-hidden rounded-[2rem] border border-border bg-surface p-8 sm:p-12">
            <div className="absolute -right-24 -top-24 size-72 rounded-full bg-electric opacity-15 blur-3xl" />
            <div className="relative grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
              <div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-electric">P—02</span>
                  <span className="eyebrow">Automation</span>
                </div>
                <h3 className="mt-6 font-display text-3xl font-bold leading-tight sm:text-5xl">
                  AI Content Automation Workflow
                </h3>
                <p className="mt-6 max-w-md leading-relaxed text-muted-foreground">
                  A workflow that uses AI at each stage of content creation — from the first idea to a published
                  video — designed to keep quality high while removing repetitive work.
                </p>
                <ul className="mt-8 flex flex-wrap gap-2">
                  {["AI-assisted creation", "Automation", "Workflow design", "Productivity"].map((t) => (
                    <li key={t} className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="relative">
                  <svg className="absolute left-0 top-7 hidden h-px w-full sm:block" aria-hidden>
                    <line x1="5%" y1="0" x2="95%" y2="0" stroke="var(--border)" strokeWidth="2" />
                    <line
                      x1="5%"
                      y1="0"
                      x2="95%"
                      y2="0"
                      stroke="var(--electric)"
                      strokeWidth="2"
                      strokeDasharray="6 14"
                      className="animate-flow"
                    />
                  </svg>
                  <ol className="relative grid grid-cols-5 gap-2" role="tablist" aria-label="Workflow stages">
                    {workflow.map((w, i) => (
                      <li key={w.title} className="flex flex-col items-center text-center">
                        <button
                          role="tab"
                          aria-selected={step === i}
                          onClick={() => setStep(i)}
                          onMouseEnter={() => setStep(i)}
                          className={cn(
                            "grid size-14 place-items-center rounded-2xl border transition-all duration-500",
                            step === i
                              ? "scale-110 border-electric bg-electric text-background shadow-glow"
                              : "border-border bg-background text-muted-foreground hover:text-foreground",
                          )}
                          aria-label={w.title}
                        >
                          <w.icon className="size-5" strokeWidth={1.6} />
                        </button>
                        <span className={cn("mt-3 hidden text-xs sm:block", step === i ? "text-foreground" : "text-muted-foreground")}>
                          {w.title}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
                <div className="mt-8 min-h-32 rounded-2xl border border-border bg-background/50 p-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-electric">
                        Stage {step + 1} / {workflow.length}
                      </p>
                      <p className="mt-2 font-display text-xl font-semibold">{workflow[step]?.title}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{workflow[step]?.body}</p>
                    </motion.div>
                  </AnimatePresence>
                </div>
                <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                  <Clapperboard className="size-3.5" /> The films in the showreel above were produced with this approach.
                </p>
              </div>
            </div>
          </article>
        </Tilt>
      </Reveal>
    </Section>
  );
}
