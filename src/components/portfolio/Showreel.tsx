import { motion } from "framer-motion";
import { ExternalLink, Play } from "lucide-react";
import { DRIVE_FOLDER_URL, videoLabel, videoThumb, videos } from "@/data/videos";
import { cn } from "@/lib/utils";
import { useMediaModal } from "./MediaModal";
import { Reveal, Section, SectionHeading, toMedia } from "./primitives";

export function Showreel() {
  const { open } = useMediaModal();
  const featuredIndex = Math.max(0, videos.findIndex((v) => v.featured));
  const featured = videos[featuredIndex];
  const rest = videos.map((v, i) => ({ v, i })).filter(({ i }) => i !== featuredIndex);

  return (
    <Section id="showreel" className="overflow-hidden">
      <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <SectionHeading
          index="04"
          eyebrow="Showreel"
          title={
            <>
              Frames from the <span className="font-serif font-normal italic text-aurora">archive.</span>
            </>
          }
          lead="AI-generated cinematic pieces from my video library. Select any frame to play it here."
        />
        <Reveal>
          <a
            href={DRIVE_FOLDER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm text-muted-foreground transition hover:border-foreground/40 hover:text-foreground"
          >
            Full library on Google Drive <ExternalLink className="size-4" />
          </a>
        </Reveal>
      </div>

      {featured && (
        <Reveal className="mt-14">
          <button
            onClick={() => open(toMedia(featured, featuredIndex))}
            className="group relative block w-full overflow-hidden rounded-[2rem] border border-border text-left shadow-deep"
            aria-label={`Play ${videoLabel(featured, featuredIndex)}`}
          >
            <div className="aspect-[16/10] sm:aspect-[21/9]">
              <img
                src={videoThumb(featured)}
                alt={`Frame from ${videoLabel(featured, featuredIndex)}`}
                loading="lazy"
                className="size-full object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="relative grid size-20 place-items-center rounded-full glass-strong transition duration-500 group-hover:scale-110 sm:size-28">
                <span className="absolute inset-0 rounded-full bg-aurora opacity-0 blur-xl transition group-hover:opacity-50" />
                <Play className="relative size-7 fill-current sm:size-9" />
              </span>
            </div>
            <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 p-6 sm:p-10">
              <div>
                <p className="eyebrow text-lavender">Featured film</p>
                <h3 className="mt-2 font-display text-2xl font-bold sm:text-4xl">
                  {videoLabel(featured, featuredIndex)}
                </h3>
              </div>
              <span className="font-mono text-xs text-muted-foreground">{featured.fileName}</span>
            </div>
          </button>
        </Reveal>
      )}

      <div className="mt-6 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        {rest.map(({ v, i }, k) => (
          <Reveal
            key={v.driveId}
            delay={(k % 4) * 0.06}
            className={cn(v.orientation === "portrait" && "row-span-2", k === 0 && "col-span-2 lg:col-span-2")}
          >
            <motion.button
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              onClick={() => open(toMedia(v, i))}
              className="group relative block size-full overflow-hidden rounded-2xl border border-border bg-surface text-left"
              aria-label={`Play ${videoLabel(v, i)}`}
            >
              <div className={cn("h-full", v.orientation === "portrait" ? "aspect-[9/16]" : "aspect-video")}>
                <img
                  src={videoThumb(v)}
                  alt={`Frame from ${videoLabel(v, i)}`}
                  loading="lazy"
                  className="size-full object-cover transition duration-700 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-80 transition group-hover:opacity-100" />
              <span className="absolute right-3 top-3 grid size-9 place-items-center rounded-full glass-strong opacity-0 transition group-hover:opacity-100">
                <Play className="size-3.5 fill-current" />
              </span>
              <div className="absolute inset-x-0 bottom-0 p-4">
                <p className="font-display text-sm font-semibold sm:text-base">{videoLabel(v, i)}</p>
                <p className="truncate font-mono text-[10px] text-muted-foreground">{v.fileName}</p>
              </div>
            </motion.button>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
