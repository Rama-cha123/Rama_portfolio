/**
 * Instagram Reels — the single place to edit the "Beyond the Frame" gallery.
 *
 * Only the first reel is verified. The remaining slots are intentionally empty:
 * paste a Reel URL into `url` (and optionally a title/description) to publish it.
 * Slots with an empty `url` are shown as "upcoming" tiles, never as finished work.
 *
 * Reel URL format: https://www.instagram.com/reel/<CODE>/
 * Embedded playback uses https://www.instagram.com/reel/<CODE>/embed/
 */

export const INSTAGRAM_PROFILE_URL = "https://www.instagram.com/auraaniimate.ai/";
export const INSTAGRAM_HANDLE = "@auraaniimate.ai";

export type ReelCategory =
  | "Mythological Cinematic Videos"
  | "AI-Generated Stories"
  | "Fantasy & Visual Effects"
  | "Experimental AI Films"
  | "Creative AI Animations";

export const reelCategories: ReelCategory[] = [
  "Mythological Cinematic Videos",
  "AI-Generated Stories",
  "Fantasy & Visual Effects",
  "Experimental AI Films",
  "Creative AI Animations",
];

export interface InstagramReel {
  /** Full Reel URL. Leave empty ("") for an unfilled slot. */
  url: string;
  title?: string;
  description?: string;
  category?: ReelCategory;
  /** Optional thumbnail image you own (import it or use a URL). */
  thumbnail?: string;
  /** Show this reel large. Only one should be true. */
  prominent?: boolean;
  verified?: boolean;
}

export const instagramReels: InstagramReel[] = [
  {
    url: "https://www.instagram.com/reel/DK0G4h6OPnu/",
    prominent: true,
    verified: true,
  },
  { url: "", category: "Mythological Cinematic Videos" },
  { url: "", category: "AI-Generated Stories" },
  { url: "", category: "Fantasy & Visual Effects" },
  { url: "", category: "Experimental AI Films" },
  { url: "", category: "Creative AI Animations" },
];

/** Extracts the Reel code and returns the official embed URL, or null. */
export function reelEmbedUrl(url: string): string | null {
  const m = url.match(/instagram\.com\/(?:reel|reels|p)\/([A-Za-z0-9_-]+)/);
  return m ? `https://www.instagram.com/reel/${m[1]}/embed/` : null;
}
