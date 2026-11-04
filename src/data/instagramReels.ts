/**
 * Instagram Reels — Beyond the Frame gallery.
 * Add or edit Instagram URLs in this file.
 */

export const INSTAGRAM_PROFILE_URL =
  "https://www.instagram.com/auraaniimate.ai/";

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
  url: string;
  title?: string;
  description?: string;
  category?: ReelCategory;
  thumbnail?: string;
  prominent?: boolean;
  verified?: boolean;
}

export const instagramReels: InstagramReel[] = [
  {
    url: "https://www.instagram.com/p/DWoD4DHE62J/",
    prominent: true,
  },
  {
    url: "https://www.instagram.com/p/DVZ7K6eE2J5/",
  },
  {
    url: "https://www.instagram.com/p/DVnJtM3k2qL/",
  },
  {
    url: "",
    category: "Mythological Cinematic Videos",
  },
  {
    url: "",
    category: "AI-Generated Stories",
  },
  {
    url: "",
    category: "Creative AI Animations",
  },
];

/**
 * Supports Instagram Reel and post URLs.
 * Returns the matching official embed URL.
 */
export function reelEmbedUrl(url: string): string | null {
  const match = url.match(
    /instagram\.com\/(reel|reels|p)\/([A-Za-z0-9_-]+)/
  );

  return match
    ? `https://www.instagram.com/${match[1]}/${match[2]}/embed/`
    : null;
}
