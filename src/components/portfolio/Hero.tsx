import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, Mail, Play } from "lucide-react";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { videos } from "@/data/videos";
import { profile } from "@/data/profile";
import { useMediaModal } from "./MediaModal";
import { toMedia } from "./primitives";

const HeroScene = lazy(() => import("./HeroScene"));

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

const words = ["INTELLIGENCE", "MEETS", "IMAGINATION."];

export function Hero() {
  const reduce = !!useReducedMotion();
  const { open } = useMediaModal();
  const ref = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);
  const [webgl, setWebgl] = useState(true);
  const [lite, setLite] = useState(false);
  const [active, setActive] = useState(true);

  useEffect(() => {
    setMounted(true);
    setWebgl(hasWebGL());
    const mq = window.matchMedia("(max-width: 900px)");
    const lowMem = ((navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8) <= 4;
    const update = () => setLite(mq.matches || lowMem);
    update();
    mq.addEventListener("change", update);

    // Pause rendering when the hero is off-screen or the tab is hidden
    let visible = true;
    let inView = true;
    const sync = () => setActive(visible && inView);
    const io = new IntersectionObserver(([e]) => {
      inView = e.isIntersecting;
      sync();
    });
    if (ref.current) io.observe(ref.current);
    const onVis = () => {
      visible = document.visibilityState === "visible";
      sync();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      mq.removeEventListener("change", update);
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  const featuredIndex = Math.max(
    0,
    videos.findIndex((v) => v.featured),
  );

  return (
    <section ref={ref} id="top" className="relative flex min-h-[100svh] items-end overflow-hidden">
      {/* Atmosphere */}
      <div className="glow-orb -right-40 top-10 size-[520px] bg-lavender" />
      <div className="glow-orb -left-40 bottom-0 size-[460px] bg-electric opacity-20" />

      {/* 3D centerpiece */}
      <div className="absolute inset-0" aria-hidden="true">
        {mounted && webgl ? (
          <Suspense fallback={<FallbackOrb />}>
            <HeroScene active={active} lite={lite} reducedMotion={reduce} />
          </Suspense>
        ) : (
          <FallbackOrb />
        )}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background via-background/70 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-16 pt-32 sm:px-8 sm:pb-24">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8 inline-flex items-center gap-3 rounded-full glass px-4 py-2"
        >
          <span className="size-2 animate-pulse-soft rounded-full bg-lavender" />
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            {profile.role}
          </span>
        </motion.div>

        <h1 className="font-display text-[13vw] font-extrabold leading-[0.86] tracking-[-0.04em] sm:text-[9.5vw] lg:text-[8.2rem]">
          {words.map((w, i) => (
            <span key={w} className="block overflow-hidden">
              <motion.span
                className={i === 1 ? "block font-serif text-[0.8em] font-normal italic tracking-normal text-aurora" : "block text-chrome"}
                initial={reduce ? false : { y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, delay: 0.3 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              >
                {w}
              </motion.span>
            </span>
          ))}
        </h1>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.8 }}
            className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            I'm <span className="text-foreground">Rama Chandra</span> — an AI Technology Intern and Creative
            Technologist exploring the intersection of Generative AI, cinematic storytelling, and intelligent
            digital experiences.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.95 }}
            className="flex flex-wrap gap-3"
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-semibold text-background transition hover:bg-silver"
            >
              Explore My Work
              <ArrowDownRight className="size-4 transition group-hover:rotate-[-45deg]" />
            </a>
            <button
              onClick={() => open(toMedia(videos[featuredIndex], featuredIndex))}
              className="group inline-flex items-center gap-2 rounded-full glass px-6 py-3.5 text-sm font-semibold transition hover:border-lavender/60"
            >
              <span className="grid size-6 place-items-center rounded-full bg-aurora text-background">
                <Play className="size-3 fill-current" />
              </span>
              View Showreel
            </button>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3.5 text-sm font-semibold text-muted-foreground transition hover:border-foreground/40 hover:text-foreground"
            >
              <Mail className="size-4" /> Contact Me
            </a>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Scroll</span>
        <span className="h-10 w-px bg-gradient-to-b from-lavender to-transparent" />
      </div>
    </section>
  );
}

function FallbackOrb() {
  return (
    <div className="absolute right-[8%] top-[18%] size-[42vmin] rounded-full opacity-70 blur-[2px]"
      style={{ background: "radial-gradient(circle at 35% 30%, var(--silver), var(--lavender) 45%, var(--background) 75%)" }}
    />
  );
}
