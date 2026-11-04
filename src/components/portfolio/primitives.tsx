import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { videoLabel, drivePreviewUrl, driveViewUrl, type ShowreelVideo } from "@/data/videos";
import type { MediaItem } from "./MediaModal";

export function Reveal({
  children,
  delay = 0,
  className,
  y = 28,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  lead,
  className,
}: {
  index: string;
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  className?: string;
}) {
  return (
    <Reveal className={cn("max-w-3xl", className)}>
      <div className="mb-6 flex items-center gap-4">
        <span className="font-mono text-xs text-lavender">{index}</span>
        <span className="h-px w-10 bg-border" />
        <span className="eyebrow">{eyebrow}</span>
      </div>
      <h2 className="font-display text-4xl font-bold leading-[0.95] tracking-tight sm:text-6xl">{title}</h2>
      {lead && <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">{lead}</p>}
    </Reveal>
  );
}

export function Section({ id, children, className }: { id?: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={cn("relative px-5 py-24 sm:px-8 sm:py-36", className)}>
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}

export function toMedia(v: ShowreelVideo, i: number): MediaItem {
  return {
    title: videoLabel(v, i),
    subtitle: v.fileName,
    embedUrl: drivePreviewUrl(v.driveId),
    externalUrl: driveViewUrl(v.driveId),
    externalLabel: "Open in Google Drive",
    aspect: v.orientation,
  };
}

/** Tracks the pointer for the radial sheen used by .card-sheen */
export function sheenMove(e: React.PointerEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}
