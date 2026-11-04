/**
 * Showreel videos — the single place to edit the Google Drive gallery.
 *
 * Source folder: https://drive.google.com/drive/folders/10BLrr2rMFEPWev0oUQqsoqeB5anpNQIQ
 *
 * Every entry below is a real file from that folder (file IDs and file names were
 * read from the public folder listing). Titles are left empty unless the title is
 * visible in the video itself — add your own titles/descriptions any time.
 *
 * To add a video:
 *  1. In Google Drive, set sharing to "Anyone with the link can view".
 *  2. Copy the file ID from its link: https://drive.google.com/file/d/<FILE_ID>/view
 *  3. Add an entry here. Thumbnail is optional: drop a .webp in src/assets/showreel/
 *     named <FILE_ID>.webp, or leave it out and the Drive thumbnail is used.
 */

export type VideoOrientation = "landscape" | "portrait";

export interface ShowreelVideo {
  /** Google Drive file ID */
  driveId: string;
  /** Original file name in Drive (verified) */
  fileName: string;
  /** Display title — leave empty to show a neutral label */
  title?: string;
  /** Optional short description written by you */
  description?: string;
  orientation: VideoOrientation;
  /** Highlight as the main showreel piece */
  featured?: boolean;
}

export const videos: ShowreelVideo[] = [
  {
    driveId: "15poAAciHlvmc5qZ_HV3y-QjCkVu-7pqp",
    fileName: "VID_20260303_014902_616_bsl.mp4",
    // Title shown on screen in the video's opening frame
    title: "Holika Dahan — Where Pride Turns to Ash",
    orientation: "landscape",
    featured: true,
  },
  {
    driveId: "1KaCXD7OOz_xmbnMNYMfaCymOVwlW1z3B",
    fileName: "lv_0_20250822172638.mp4",
    orientation: "landscape",
  },
  {
    driveId: "1Bpz-Bwpsm8MoH9Qv9DpEbxhWUdDKqdry",
    fileName: "VID_20260224_065502_269_bsl.mp4",
    orientation: "landscape",
  },
  {
    driveId: "1fLUhx_qvix40_8oFYtl6xUQ2H7sDuV5T",
    fileName: "VID_20260302_090913_885_bsl.mp4",
    orientation: "landscape",
  },
  {
    driveId: "1ZJWkOqI-s1QV4VEOxsj4YZqsBwsDkUpJ",
    fileName: "VID_20260307_212846_420_bsl.mp4",
    orientation: "landscape",
  },
  {
    driveId: "16iZYXStTH5-V6F72K4IrUWf5qSqJpbLx",
    fileName: "VN20260126_120041.mp4",
    orientation: "landscape",
  },
  {
    driveId: "1tP11x6C1kw5SCvc_896CKEND6NK4S-ur",
    fileName: "video_260215_065615.mp4",
    orientation: "landscape",
  },
  {
    driveId: "1R7lCY4xzKKAB44j7Ppc2Q43-Fli3qAEO",
    fileName: "Video_2026-03-15_08_20_23.mp4",
    orientation: "portrait",
  },
];

export const DRIVE_FOLDER_URL =
  "https://drive.google.com/drive/folders/10BLrr2rMFEPWev0oUQqsoqeB5anpNQIQ";

export const drivePreviewUrl = (id: string) => `https://drive.google.com/file/d/${id}/preview`;
export const driveViewUrl = (id: string) => `https://drive.google.com/file/d/${id}/view`;
export const driveThumbUrl = (id: string) =>
  `https://drive.google.com/thumbnail?id=${id}&sz=w960`;

// Bundled, optimized thumbnails (src/assets/showreel/<driveId>.webp)
const localThumbs = import.meta.glob("../assets/showreel/*.webp", {
  eager: true,
  import: "default",
}) as Record<string, string>;

export function videoThumb(v: ShowreelVideo): string {
  const hit = Object.entries(localThumbs).find(([p]) => p.includes(v.driveId));
  return hit ? hit[1] : driveThumbUrl(v.driveId);
}

export function videoLabel(v: ShowreelVideo, index: number): string {
  return v.title?.trim() || `Film ${String(index + 1).padStart(2, "0")}`;
}
