import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, X } from "lucide-react";
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";

export interface MediaItem {
  title: string;
  subtitle?: string;
  embedUrl: string;
  externalUrl: string;
  externalLabel: string;
  aspect: "landscape" | "portrait";
}

const Ctx = createContext<{ open: (m: MediaItem) => void }>({ open: () => {} });
export const useMediaModal = () => useContext(Ctx);

/**
 * In-page player. The iframe only exists while the modal is open, so closing
 * it unmounts the player and stops playback. Nothing loads until opened.
 */
export function MediaModalProvider({ children }: { children: ReactNode }) {
  const [item, setItem] = useState<MediaItem | null>(null);
  const [loaded, setLoaded] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  const open = useCallback((m: MediaItem) => {
    lastFocus.current = document.activeElement as HTMLElement;
    setLoaded(false);
    setItem(m);
  }, []);
  const close = useCallback(() => setItem(null), []);

  useEffect(() => {
    if (!item) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => closeRef.current?.focus(), 50);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      clearTimeout(t);
      lastFocus.current?.focus?.();
    };
  }, [item, close]);

  return (
    <Ctx.Provider value={{ open }}>
      {children}
      <AnimatePresence>
        {item && (
          <motion.div
            key="modal"
            role="dialog"
            aria-modal="true"
            aria-label={item.title}
            className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <button
              aria-label="Close player"
              className="absolute inset-0 bg-background/85 backdrop-blur-xl"
              onClick={close}
              tabIndex={-1}
            />
            <motion.div
              className={`relative z-10 flex w-full flex-col ${
                item.aspect === "portrait" ? "max-w-[min(420px,90vw)]" : "max-w-5xl"
              }`}
              initial={{ y: 40, scale: 0.96, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 20, scale: 0.98, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="mb-3 flex items-end justify-between gap-4">
                <div className="min-w-0">
                  <p className="eyebrow">Now playing</p>
                  <h3 className="truncate font-display text-lg font-semibold sm:text-2xl">{item.title}</h3>
                  {item.subtitle && (
                    <p className="truncate font-mono text-xs text-muted-foreground">{item.subtitle}</p>
                  )}
                </div>
                <button
                  ref={closeRef}
                  onClick={close}
                  aria-label="Close player"
                  className="glass grid size-11 shrink-0 place-items-center rounded-full transition hover:border-lavender/60 hover:text-lavender focus-visible:outline-2 focus-visible:outline-lavender"
                >
                  <X className="size-5" />
                </button>
              </div>
              <div
                className={`relative w-full overflow-hidden rounded-2xl border border-border bg-surface shadow-deep ${
                  item.aspect === "portrait" ? "aspect-[9/16] max-h-[72vh]" : "aspect-video"
                }`}
              >
                {!loaded && (
                  <div className="absolute inset-0 grid place-items-center">
                    <div className="size-10 animate-spin rounded-full border-2 border-border border-t-lavender" />
                  </div>
                )}
                <iframe
                  src={item.embedUrl}
                  title={item.title}
                  className="absolute inset-0 size-full"
                  allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                  allowFullScreen
                  onLoad={() => setLoaded(true)}
                />
              </div>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
                <span>Video not playing? It may be restricted — open it directly.</span>
                <a
                  href={item.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-foreground underline-offset-4 hover:text-lavender hover:underline"
                >
                  {item.externalLabel} <ExternalLink className="size-3.5" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Ctx.Provider>
  );
}
