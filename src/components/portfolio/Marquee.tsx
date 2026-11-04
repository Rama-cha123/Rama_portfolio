const items = [
  "Generative AI",
  "Cinematic Storytelling",
  "Prompt Engineering",
  "RAG Workflows",
  "AI Video",
  "Automation",
  "Visual Composition",
  "Gemini APIs",
];

export function Marquee() {
  const row = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-border py-6" aria-hidden="true">
      <div className="flex w-max animate-marquee gap-12 motion-reduce:animate-none">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-12 font-display text-2xl font-semibold text-muted-foreground/60 sm:text-4xl">
            {t}
            <span className="size-2 rounded-full bg-aurora" />
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" />
    </div>
  );
}
