# B. Rama Chandra — Creative Technologist Portfolio

A cinematic 3D portfolio built with React 19, TypeScript, TanStack Start (Vite), Tailwind CSS v4,
React Three Fiber (three.js) and Framer Motion. Everything is free and open source — no paid APIs.

## Run locally

Requires Node.js 20+ (or Bun).

```sh
npm install
npm run dev        # http://localhost:8080
npm run build      # production build
npm run preview    # preview the production build
```

## Where to edit content

| What | File |
| --- | --- |
| Name, contact, socials, experience, skills, education, certifications | `src/data/profile.ts` |
| Google Drive showreel videos | `src/data/videos.ts` |
| Instagram Reels ("Beyond the Frame") | `src/data/instagramReels.ts` |
| Colors, fonts, effects (design system) | `src/styles.css` |
| Page sections | `src/components/portfolio/*.tsx` |
| 3D hero sculpture | `src/components/portfolio/HeroScene.tsx` |

### Adding a Google Drive video
1. In Drive, share the file as **Anyone with the link → Viewer**.
2. Copy the file ID from `https://drive.google.com/file/d/<FILE_ID>/view`.
3. Add an entry to `videos` in `src/data/videos.ts` (set `orientation` to `landscape` or `portrait`).
4. Optional: add a thumbnail at `src/assets/showreel/<FILE_ID>.webp`. Without it, Drive's own thumbnail is used.

A Drive **folder** link is not playable — always use individual file IDs.

### Adding an Instagram Reel
Paste the Reel URL into one of the empty `url: ""` slots in `src/data/instagramReels.ts`.
Add a `title`, `description` and `category` if you like. Empty slots appear as "Upcoming slot" tiles.

## Performance notes
- The 3D scene is lazy-loaded, pauses when off-screen or when the tab is hidden, and uses a lighter
  version on phones and low-memory devices.
- Reduced-motion preferences are respected (animations and camera drift are disabled).
- Video players only load when opened, and are removed when the player closes.

## Deploying
- **Lovable:** click Publish.
- **Elsewhere:** the project is a TanStack Start app configured for Cloudflare Workers. Connect the
  GitHub repository to Cloudflare (Workers & Pages), use `npm run build` as the build command, and
  deploy. Any host that supports TanStack Start (Cloudflare, Netlify, Vercel via Nitro) also works.

## Source code
Connect GitHub from the Lovable editor (Project → GitHub) to keep the complete source in your own
repository. All components, styles, assets, configuration and data files are included.
