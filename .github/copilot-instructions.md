# Copilot Instructions — astro-blog

## Commands

```bash
npm run dev       # Start dev server with hot reload
npm run build     # Build static site to dist/
npm run preview   # Preview production build locally
```

No test or lint tooling is configured.

## Architecture

This is a **static site** built with Astro 6 — all pages are pre-rendered HTML with zero client-side JavaScript by default. It serves as a personal portfolio and blog for a Cloud Architect.

### Content System

Blog posts live in `src/content/blog/` as `.md` or `.mdx` files. The collection is defined in `src/content.config.ts` using Astro 6's `glob` loader (not the older file-based API). Frontmatter is validated with Zod:

```
title        (required)
description  (required)
pubDate      (required, coerced Date)
updatedDate  (optional)
tags         (string[], defaults to [])
category     (optional)
draft        (boolean, defaults to true)  ← posts are drafts by default
heroImage    (optional, use image() schema)
```

**Note:** Draft filtering is not currently implemented in page queries — `getCollection('blog')` returns all posts unfiltered.

### Page Routing

- `src/pages/index.astro` — Full portfolio homepage (hero carousel, skill cards, blog preview, speaking section)
- `src/pages/blog/index.astro` — Blog listing grid
- `src/pages/blog/[...slug].astro` — Individual post via `getStaticPaths()`
- `src/pages/about.astro` — About page (uses BlogPost layout)
- `src/pages/rss.xml.js` — RSS feed endpoint

### Layout & Components

One layout (`src/layouts/BlogPost.astro`) wraps all blog posts and the about page. Reusable components are in `src/components/`:

- `BaseHead.astro` — All `<head>` content: SEO meta, Open Graph, Twitter cards, fonts, global CSS import
- `Header.astro` — Fixed navbar with mobile hamburger menu (vanilla JS toggle)
- `Footer.astro` — Contact CTA, social links, copyright
- `FormattedDate.astro` — Date formatting utility

Site-wide constants (title, author, social URLs) are in `src/consts.ts`.

## Conventions

### Styling — Tailwind CSS v4

Styling uses **Tailwind CSS v4** via `@tailwindcss/vite` plugin (not PostCSS). Theme colors are defined with the `@theme` directive in `src/styles/global.css`:

```css
@import "tailwindcss";
@theme {
    --color-primary: #e65100;
    --color-secondary: #ff9800;
    --color-dark-text: #1a1a2e;
    --color-light-background: #f8f9fa;
    --color-card: #ffffff;
    --color-border-light: #e5e7eb;
}
```

Use these as Tailwind classes: `text-primary`, `bg-dark-text`, `border-border-light`, etc. No `@apply` or `@layer` directives are used — all styling is inline utility classes. Blog post body content is styled with custom `.prose` rules in `global.css`.

### Images

- **Optimized images**: Import from `src/assets/` and use Astro's `<Image>` component with explicit `width`/`height`
- **Static assets**: Place in `public/images/` (served as-is, no optimization)
- **Hero images** in blog frontmatter: Reference relative to the post file, validated by `image()` schema

### TypeScript

Strict mode enabled (`extends: "astro/tsconfigs/strict"` + `strictNullChecks`). Components use `type Props` interface or `CollectionEntry<'blog'>['data']` for type-safe props.

### Deployment

Deployed on **Vercel** (zero-config). Vercel Analytics and Speed Insights are embedded in `BlogPost.astro` layout and `index.astro`. The `site` property in `astro.config.mjs` is still set to `https://example.com` and should be updated to the actual domain.

## Tooling Preferences

### JetBrains MCP (Required)

When JetBrains MCP tools are available, **always prefer them** over generic CLI or bash alternatives:

- **File reading**: Use `jetbrains-read_file` / `jetbrains-get_file_text_by_path` instead of `cat` or `view`
- **File editing**: Use `jetbrains-replace_text_in_file` instead of `sed` or the `edit` tool
- **File creation**: Use `jetbrains-create_new_file` instead of `touch` / `create`
- **File search**: Use `jetbrains-search_text` / `jetbrains-search_regex` / `jetbrains-search_symbol` instead of `grep`
- **File finding**: Use `jetbrains-search_file` / `jetbrains-find_files_by_name_keyword` instead of `find` / `glob`
- **Directory browsing**: Use `jetbrains-list_directory_tree` instead of `ls` / `tree`
- **Terminal commands**: Use `jetbrains-execute_terminal_command` instead of `bash`
- **Code inspection**: Use `jetbrains-get_file_problems` to check for errors after edits
- **Refactoring**: Use `jetbrains-rename_refactoring` for symbol renames (project-wide, safe)
- **Building**: Use `jetbrains-build_project` to validate changes
- **Formatting**: Use `jetbrains-reformat_file` after editing files
