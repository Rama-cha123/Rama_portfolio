<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project rules
- Portfolio content lives in `src/data/` (profile, videos, instagramReels); components only render it, so the owner can edit content without touching UI code.
- The hero 3D scene (`HeroScene.tsx`) is lazy-loaded client-side only and pauses off-screen; keep heavy three.js code out of SSR and other routes.
- Never present unverified media (titles, reel URLs, thumbnails, stats) as real work; empty reel slots render as "upcoming" tiles.
