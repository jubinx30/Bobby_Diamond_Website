# Bobby Diamond — Website

Vocalist & entertainer site with a **Song Finder** that searches Bobby's real repertoire
(1,262 songs, no external music API), plus Events & Packages, Videos and Contact pages.

Black / white / gold theme, animated (twinkling stars, scroll fade-ins, floating portrait).

## Stack

- [TanStack Start](https://tanstack.com/start) v1 (React 19, Vite 7, SSR)
- TypeScript, Tailwind CSS v4, shadcn/ui
- Bun (or npm) for packages

## Run it locally (Antigravity, VS Code, any editor)

```sh
# 1. Install packages
bun install        # or: npm install

# 2. Start the dev server (http://localhost:8080)
bun run dev        # or: npm run dev

# 3. Production build + preview
bun run build
bun run preview

# 4. Tests
bun run test
```

Requires Node.js 20+ (and Bun, or just use npm).

## Open it in Antigravity

1. Unzip this folder somewhere permanent, e.g. `~/projects/bobby-diamond`.
2. In Antigravity: **File → Open Folder…** and pick that folder.
3. In the Antigravity agent/terminal run `bun install`, then `bun run dev`.
4. Point your browser at the printed local URL to see the site.

The agent can then edit files directly — everything the site needs is in this folder.

## Where things live

| Path | What it is |
| --- | --- |
| `src/routes/index.tsx` | Home page |
| `src/routes/songs.tsx` | **Song Finder** (search, genre filter, A–Z index, no-results message) |
| `src/routes/packages.tsx` | Events & Packages |
| `src/routes/videos.tsx` | Video cards → click to open the player |
| `src/routes/contact.tsx` | Contact + event inquiry form |
| `src/routes/__root.tsx` | Shared layout, nav, footer, star animation |
| `src/components/site/Layout.tsx` | Nav/footer, phone + email constants |
| `src/lib/songs.ts` | Search logic (title, artist, genre; typo-tolerant) |
| `src/lib/songs.test.ts` | Tests for the search logic |
| `src/data/songs.json` | The song list — edit here to add/remove songs |
| `src/styles.css` | All colors, fonts, animations (the black/white/gold theme) |
| `src/assets/` | Photos |

## Changing content

- **Songs**: edit `src/data/songs.json` — one entry per song with `title`, `artist`, `genre`.
- **Phone / email**: `src/components/site/Layout.tsx`.
- **Colors / theme**: `src/styles.css` (search for `--gold`, `--background`).
- **Videos**: `src/routes/videos.tsx` — each card has a YouTube ID and title.
- **Copy / headings**: the page files under `src/routes/`.

## Deploying

`bun run build` produces `dist/` (Cloudflare Worker output via Nitro).
Deploy with `npx wrangler deploy` from `dist/`, or `npx nitro deploy --prebuilt`.
Any Node host works too: `bun run preview`.

## Built with

- TanStack Start
- TypeScript
- React
- Tailwind CSS
- Vite