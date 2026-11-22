# FOSSBilling Docs

Official documentation site for [FOSSBilling](https://fossbilling.org/), built with [Astro](https://astro.build/), [Starlight](https://starlight.astro.build/), and Markdoc. Published at [docs.fossbilling.org](https://docs.fossbilling.org).

## Local Development

```bash
npm install
npm run dev
```

The dev server runs at `http://localhost:4321`. Before opening a PR, run `npm run format`, `npm run check`, and `npm run build`.

## Scripts

- `npm run dev`: local dev server at `localhost:4321`
- `npm run build`: production build, written to the Cloudflare Build Output in `.cloudflare/output/`
- `npm run preview`: preview the production build locally
- `npm run check`: Astro/TypeScript diagnostics
- `npm run format` / `npm run format:check`: format with Prettier / verify formatting only
- `npm run cf-deploy`: deploy to production with the Cloudflare CLI (`cf deploy`)
- `npm run cf-preview`: deploy a Worker Preview (`cf previews deploy`)

The `cf` commands require `cf auth login` first.

## Editing Content

Pages live in `src/content/docs/` as `.mdoc` files with frontmatter:

```md
---
title: Page title
description: Short page description.
sidebar:
  label: Short label # optional
  order: 1 # sidebar position within the section
---
```

- Use section overview pages named `index.mdoc`.
- Prefer absolute internal links with trailing slashes, e.g. `[Installation](/getting-started/installation/)`.
- When a route moves, update internal links, and add a `redirects` entry in `astro.config.ts` if an old URL must keep working.

## Assets and Navigation

- Put images referenced by pages in `src/assets/` (Astro optimizes and fingerprints them); reference them with relative paths. Use `public/` only for files served as-is from the site root.
- The sidebar is configured in `astro.config.ts` — check whether a section uses `autogenerate` or explicit ordering before adding a page.

## Deployment

CI (`.github/workflows/ci-cd.yml`) runs on every push and on PRs targeting `main`: formatting checks, `astro check`, a production build, and a `cf deploy --prebuilt --dry-run` validation. Pushes to `main` deploy to production; pushes to other branches deploy previews through the shared [FOSSBilling/.workflows](https://github.com/FOSSBilling/.workflows) workflow, with preview links posted as PR comments and kept in sync by `cloudflare-events.yml`.

The Worker is configured in [`cloudflare.config.ts`](./cloudflare.config.ts) and managed with the Cloudflare CLI (`cf`): `cf auth login`, then `npm run cf-deploy` or `npm run cf-preview`.

## Project Structure

```text
.
├── astro.config.ts        # Astro, Starlight, sidebar, redirects
├── cloudflare.config.ts   # Cloudflare Worker config (cf CLI)
├── markdoc.config.mjs     # Starlight Markdoc integration
├── public/                # Static files served as-is
└── src/
    ├── assets/            # Bundled images and logos
    ├── components/        # Starlight component overrides
    ├── content/docs/      # Documentation pages (.mdoc)
    └── styles/            # Site-wide custom CSS
```

## Contributing

Fork, create a feature branch, make your changes, run `npm run format`, `npm run check`, and `npm run build`, then open a PR against `main`.

## Licensing

Code, configuration, and build tooling in this repository are licensed under the GNU Affero General Public License v3.0 or later. See [LICENSE](./LICENSE).

Documentation content is licensed under Creative Commons Attribution-ShareAlike 4.0 International. See [LICENSE-docs](./LICENSE-docs).

Unless otherwise noted, the documentation license applies to:

- `src/content/docs/**`
- `src/assets/**`

Logos, wordmarks, trademarks, and other brand assets are not licensed under CC BY-SA 4.0. Third-party marks remain subject to their respective owners' rights.
