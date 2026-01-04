# Copilot / AI Agent Instructions for this repository

Purpose: help AI coding agents become productive quickly in this Next.js blog repo.

1) Big picture
- This is a Next.js (app router) static/blog site in `src/app` using React + Tailwind.
- Content is consumed from Markdown files in the repository `posts/` (root). See `src/lib/blog.ts` which reads `posts/*.md` and exposes `getAllSlugs()`, `getPost()` and tag helpers.
- Static page generation: `src/app/blog/[slug]/page.tsx` calls `generateStaticParams()` which uses `getAllSlugs()` — add or update files in `posts/` then run a build to regenerate pages.

2) Key files to reference
- `src/lib/blog.ts` — canonical Markdown parsing, frontmatter expectations, reading-time calculation (words / 200).
- `src/app/layout.tsx`, `src/components/*` — global layout and shared components (`Header.tsx`, `Footer.tsx`, `ThemeProvider.tsx`).
- `src/app/blog/[slug]/page.tsx` — post rendering, metadata generation, and use of `getPost()`.
- `src/config/site.ts` — centralized site config (author, navigation, postsPerPage).
- `package.json` — scripts (dev/build/build:static/start/lint); see examples below.

3) Add or edit posts
- Canonical posts directory: `posts/` at repo root (not `content/posts/`). `src/lib/blog.ts` expects `posts/*.md`.
- Frontmatter observed in examples (use these keys):
  ```yaml
  ---
  title: "My Post Title"
  date: "2026-01-04"
  author: "0xadroit"
  summary: "Short summary"
  category: "Threat Analysis"
  tags: ["Tag1","Tag2"]
  published: true
  ---
  ```
- The parser (`gray-matter` + `remark -> remark-html`) converts MD body to HTML stored in `post.content`. Keep frontmatter fields consistent with the example in `content/posts/sliver-rat-threat-intelligence.md`.

4) Build / dev / deploy workflows
- Run locally: `npm run dev` (Next.js dev server).
- Production build: `npm run build` then `npm run start`.
- Static export (project provides a convenience script): `npm run build:static` — this sets `STATIC_EXPORT=true` via `cross-env` then runs `next build` (use when exporting static artefacts).
- Linting: `npm run lint` uses Next.js ESLint config.

5) Conventions & patterns to follow
- App router: pages live under `src/app`. Dynamic route example: `src/app/blog/[slug]/page.tsx` uses server-side utilities in `src/lib` to generate static params.
- Markdown parsing: prefer the existing `src/lib/blog.ts` helpers; do not reimplement parsing logic unless extending features.
- Reading time: computed in `src/lib/blog.ts` with a simple words/200 heuristic — keep changes compatible with stored `readingTime` expectations used in UI.
- Tag handling: `getAllTags()` aggregates tags from posts; tag routes live in `src/app/tags`.

6) Integrations & dependencies
- Markdown/frontmatter: `gray-matter`, `remark`, `remark-html` (see `package.json` deps).
- Styling: Tailwind CSS (`tailwind.config.ts` + `src/app/globals.css`). Theme toggle via `next-themes` and `src/components/ThemeProvider.tsx`.

7) What to watch out for / repo quirks
- There is a `content/posts/` directory with example content but the canonical runtime code reads `posts/` at repo root. When adding a new post for the site, add it to `posts/`.
- There are no automated tests present in the repo; do not rely on `npm test` (not defined).
- Static generation depends on `getAllSlugs()` reading the filesystem at build-time — ensure files are present in the repository (or in build container) before `next build`.

8) Examples (quick tasks)
- Add a post: create `posts/my-new-post.md` with the frontmatter above, then run:
  ```bash
  npm run build
  # or for static-specific flow
  npm run build:static
  ```
- Preview locally: `npm run dev` → visit `http://localhost:3000/blog` and generated slug paths.

9) When making code changes
- Follow existing file layout in `src/` (components vs app routes vs lib). Keep TypeScript types aligned with `src/types/blog.ts`.
- Update `src/config/site.ts` if changing site-level metadata.

10) If you need clarification
- Ask for intended output (static export vs server) and whether new posts should go into `posts/` or `content/posts/` (the runtime expects `posts/`).

---
If anything above is unclear or you want more examples (e.g., adding a new component, updating the blog parser, or preparing a production static export), tell me which area to expand.
