import { motion } from "framer-motion";
import { ArrowUpRight, Instagram, Play, Plus } from "lucide-react";
import { useState } from "react";
import {
  INSTAGRAM_HANDLE,
  INSTAGRAM_PROFILE_URL,
  instagramReels,
  reelCategories,
  reelEmbedUrl,
  type InstagramReel,
} from "@/data/instagramReels";
import { cn } from "@/lib/utils";
import { useMediaModal } from "./MediaModal";
import { Reveal, Section } from "./primitives";

export function BeyondTheFrame() {
  const filled = instagramReels.filter((r) => r.url.trim());
  const prominent = filled.find((r) => r.prominent) ?? filled[0];
  const others = filled.filter((r) => r !== prominent);
  const openSlots = instagramReels.filter((r) => !r.url.trim());

  return (
    <Section id="reels" className="overflow-hidden">
      <div className="glow-orb left-1/3 top-20 size-[600px] bg-lavender opacity-15" />

      <Reveal className="mx-auto max-w-4xl text-center">
        <p className="eyebrow mb-6 inline-flex items-center gap-2">
          <Instagram className="size-3.5" /> {INSTAGRAM_HANDLE}
        </p>
        <h2 className="font-display text-5xl font-extrabold leading-[0.9] tracking-tight sm:text-8xl">
          <span className="text-chrome">BEYOND</span>{" "}
          <span className="font-serif font-normal italic text-aurora">the</span>{" "}
          <span className="text-chrome">FRAME.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
          A collection of AI-generated cinematic stories, visual experiments and creative explorations.
        </p>
      </Reveal>

      <Reveal delay={0.1} className="mt-10">
        <ul className="flex flex-wrap justify-center gap-2" aria-label="Content categories">
          {reelCategories.map((c) => (
            <li key={c} className="rounded-full border border-border bg-surface/60 px-4 py-2 text-xs text-muted-foreground sm:text-sm">
              {c}
            </li>
          ))}
        </ul>
      </Reveal>

      <div className="mt-14 grid gap-4 sm:gap-6 md:grid-cols-3">
        {prominent && (
          <Reveal className="md:row-span-2">
            <FeaturedReel reel={prominent} />
          </Reveal>
        )}

        {others.map((r, i) => (
          <Reveal key={r.url} delay={i * 0.05}>
            <ReelCard reel={r} />
          </Reveal>
        ))}

        {openSlots.map((r, i) => (
          <Reveal key={`slot-${i}`} delay={(i % 3) * 0.06} className={cn(i === 0 && "md:col-span-2")}>
            <a
              href={INSTAGRAM_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-dashed border-border p-5 transition hover:border-lavender/50 hover:bg-surface/50",
                i === 0 ? "min-h-48" : "min-h-40",
              )}
            >
              <div className="flex items-start justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  Upcoming slot
                </span>
                <Plus className="size-4 text-muted-foreground transition group-hover:rotate-90 group-hover:text-lavender" />
              </div>
              <div>
                <p className="font-display text-lg font-semibold text-foreground/80">{r.category ?? "New reel"}</p>
                <p className="mt-1 text-xs text-muted-foreground">More stories live on Instagram →</p>
              </div>
            </a>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-12 flex flex-wrap justify-center gap-3">
        <a
          href={INSTAGRAM_PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-aurora px-6 py-3.5 text-sm font-semibold text-background transition hover:opacity-90"
        >
          <Instagram className="size-4" /> Follow on Instagram
        </a>
        <a
          href={`${INSTAGRAM_PROFILE_URL}reels/`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full glass px-6 py-3.5 text-sm font-semibold transition hover:border-lavender/60"
        >
          View All Reels <ArrowUpRight className="size-4" />
        </a>
      </Reveal>
    </Section>
  );
}

function FeaturedReel({ reel }: { reel: InstagramReel }) {
  const [playing, setPlaying] = useState(false);
  const embed = reelEmbedUrl(reel.url);

  return (
    <div className="relative h-full overflow-hidden rounded-[2rem] border border-border bg-surface shadow-glow">
      <div className="relative aspect-[9/14] h-full w-full md:aspect-auto md:min-h-[640px]">
        {playing && embed ? (
          <iframe
            src={embed}
            title={reel.title || "Featured Instagram Reel"}
            className="absolute inset-0 size-full bg-foreground"
            allow="autoplay; encrypted-media; clipboard-write; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        ) : (
          <button
            onClick={() => (embed ? setPlaying(true) : window.open(reel.url, "_blank", "noopener"))}
            className="group absolute inset-0 flex flex-col justify-between p-6 text-left"
            aria-label="Play featured Instagram Reel"
          >
            {reel.thumbnail ? (
              <img src={reel.thumbnail} alt="" className="absolute inset-0 size-full object-cover" loading="lazy" />
            ) : (
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,var(--lavender),transparent_55%),radial-gradient(circle_at_80%_80%,var(--electric),transparent_50%)] opacity-40" />
                <motion.div
                  className="absolute left-1/2 top-1/2 size-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-foreground/10"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                >
                  <span className="absolute -top-1 left-1/2 size-2 rounded-full bg-silver" />
                </motion.div>
                <div className="absolute left-1/2 top-1/2 size-[45%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-foreground/10" />
              </div>
            )}
            <div className="relative flex items-center justify-between">
              <span className="rounded-full glass-strong px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em]">
                Featured reel
              </span>
              <Instagram className="size-5" />
            </div>
            <div className="relative grid place-items-center">
              <span className="grid size-24 place-items-center rounded-full glass-strong transition duration-500 group-hover:scale-110">
                <Play className="size-8 fill-current" />
              </span>
            </div>
            <div className="relative">
              <p className="font-display text-2xl font-bold">{reel.title || "Watch on Instagram"}</p>
              <p className="mt-1 text-sm text-muted-foreground">{reel.description || INSTAGRAM_HANDLE}</p>
            </div>
          </button>
        )}
      </div>
      <a
        href={reel.url}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-3 right-3 z-10 inline-flex items-center gap-1 rounded-full glass-strong px-3 py-1.5 text-xs hover:text-lavender"
      >
        Open on Instagram <ArrowUpRight className="size-3" />
      </a>
    </div>
  );
}

function ReelCard({ reel }: { reel: InstagramReel }) {
  const { open } = useMediaModal();
  const embed = reelEmbedUrl(reel.url);
  const label = reel.title || "Instagram Reel";
  return (
    <button
      onClick={() =>
        embed
          ? open({
              title: label,
              subtitle: reel.category,
              embedUrl: embed,
              externalUrl: reel.url,
              externalLabel: "Open on Instagram",
              aspect: "portrait",
            })
          : window.open(reel.url, "_blank", "noopener")
      }
      className="group relative flex aspect-[4/5] w-full flex-col justify-end overflow-hidden rounded-2xl border border-border bg-surface p-5 text-left"
    >
      {reel.thumbnail && (
        <img src={reel.thumbnail} alt="" loading="lazy" className="absolute inset-0 size-full object-cover transition duration-700 group-hover:scale-105" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
      <div className="relative">
        {reel.category && <p className="eyebrow">{reel.category}</p>}
        <p className="mt-1 font-display text-lg font-semibold">{label}</p>
      </div>
    </button>
  );
}
