# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build/Dev Commands

This is a Turborepo monorepo. Run all commands from the project root unless noted.

```bash
npm run dev          # Start all apps (Next.js dev server at localhost:3000)
npm run build        # Build all packages and apps
npm run lint         # Lint all packages
npm run type-check   # TypeScript check across monorepo
npm run clean        # Clean build artifacts (.next, dist, .turbo)
```

To run commands for the web app only:

```bash
cd apps/web && npm run dev
cd apps/web && npm run build
cd apps/web && npm run lint
```

Package manager is **npm** (v10.9.2). Do not use yarn or pnpm.

## Architecture

**Monorepo structure:**
- `apps/web` — Next.js 16 app (App Router, React 19, Turbopack)
- `packages/supabase` — Supabase shared client/types
- `packages/shared` — Shared utilities and types
- `packages/eslint-config` — Shared ESLint configuration

**Key technologies:**
- **Next.js 16** with App Router and Turbopack (configured via `turbopack.root` in next.config.ts)
- **React Three Fiber** + drei + postprocessing for 3D card visualization
- **shadcn/ui** + Tailwind CSS v4 + tw-animate-css for UI components
- **Supabase** for auth, database, storage, and realtime
- **Stripe Connect** for marketplace payments
- **Zustand** for client state management
- **Chakra Petch** font (loaded via `next/font/google`)

**Component organization** (`apps/web/src/components/`):
- `3d/` — Three.js card viewer components
- `cards/` — Card display components (carousel, hover effects)
- `layout/` — Header and page layout
- `ui/` — shadcn/ui primitives (button, input, etc.)

**Path alias:** `@/*` maps to `apps/web/src/*`

## Key Conventions

**Next.js 16 breaking changes:** This project uses Next.js 16 which differs from training data. Before writing code, read the relevant guide in `node_modules/next/dist/docs/`. Key changes:
- `cookies()` and `headers()` are async — always `await` them
- Use `proxy.ts` instead of `middleware.ts` for request proxying
- Check AGENTS.md in apps/web for the latest Next.js agent rules

**Design system:**
- Dark mode first — the `<html>` tag has `className="dark"` hardcoded
- Primary accent color: orange (`#F97316` / Tailwind `orange-500`)
- Design reference is "CollectorCrypt" aesthetic
- Font: Chakra Petch (variable: `--font-chakra`)

**Supabase client utilities** live in `apps/web/src/lib/supabase/`:
- `client.ts` — browser client
- `server.ts` — server component client
- `middleware.ts` — middleware/proxy client

## Important Notes

**3D card images:** Card images from pokemontcg.io do NOT work with Three.js `TextureLoader` due to CORS restrictions. Always use local images stored in `public/cards/` for the 3D card viewer. Remote images work fine with Next.js `<Image>` component (configured in next.config.ts `remotePatterns`).

**Project context:** Trove is a trading card marketplace (Pokemon TCG first) competing on lower fees (3-5% vs industry 13%+) and superior UX (3D card visualization, AI scanning). See PLAN.md for the full roadmap.
