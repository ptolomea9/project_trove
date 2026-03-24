# Trading Card Marketplace — MVP Plan

**Date:** March 23, 2026
**Status:** Planning → Scaffold
**Working Name:** Trove (top recommendation from brand research)
**Tagline candidates:** "Where cards come alive." / "Trade smarter. Pay less."

---

## Executive Summary

A next-gen trading card marketplace that undercuts incumbents on fees (tiered 3-5% vs industry 8-15%), differentiates on experience (AI-powered 3D card visualization, 30-second listing flow), and builds community (DM, collections, reputation). Dark-mode-first, mobile-first, visually stunning.

### Key Research Findings That Shaped This Plan

1. **Flat 3% is structurally unprofitable.** Stripe alone costs 2.9% + $0.30. Adopted tiered model instead.
2. **Fee-based differentiation is the weakest moat.** Must lead with experience, not price.
3. **No competitor does 3D card visualization.** Genuine first-mover opportunity.
4. **Cold-start is the #1 killer.** Build tools first (collection mgmt, price tracking), marketplace second.
5. **TCGPlayer UX is stagnant post-eBay acquisition.** Window of opportunity for mobile-first challenger.
6. **AI card identification is now feasible** at ~$1.50/1K images via Google Cloud Vision + API matching.

---

## Business Model (Revised from Research)

### Fee Structure (Tiered)

| Transaction Value | Seller Fee | Still vs TCGPlayer (13.25%) | vs eBay (13.55%) |
|-------------------|-----------|----------------------------|-------------------|
| Under $10 | $0.50 flat | 8+ pts cheaper at $10 | 8+ pts cheaper |
| $10 - $99 | 5% | 8.25 pts cheaper | 8.55 pts cheaper |
| $100 - $499 | 4% | 9.25 pts cheaper | 9.55 pts cheaper |
| $500+ | 3% | 10.25 pts cheaper | 10.55 pts cheaper |

**Payment processing**: Passed to buyer as a transparent "processing fee" line item (~3.2%). This is how MySlabs operates successfully.

**Supplemental revenue** (post-MVP):
- Promoted listings ($1-5/day)
- Pro seller subscription ($9.99/mo) for analytics + lower fees
- AI grading reports ($2.99 each)
- Data licensing to analytics platforms

### Unit Economics at 5% + Buyer Processing

| AOV | Our 5% | Stripe (buyer pays) | Net to Us | Viable? |
|-----|--------|--------------------|-----------| --------|
| $15 | $0.75 | $0 (buyer) | $0.75 | Yes |
| $30 | $1.50 | $0 | $1.50 | Yes |
| $50 | $2.50 | $0 | $2.50 | Yes |

Break-even at ~$500K monthly GMV with lean ops ($25K/mo costs).

---

## Tech Stack

| Layer | Choice | Why |
|-------|--------|-----|
| Frontend | Next.js 16 (App Router) on Vercel | SSR, image optimization, fast deploys |
| Backend/BaaS | Supabase | Auth, Postgres, Realtime, Storage, Edge Functions - one SDK |
| Database | Supabase PostgreSQL | RLS, full-text search, JSON columns |
| Auth | Supabase Auth | Email, Google, Discord, Apple OAuth |
| Payments | Stripe Connect (Separate Charges & Transfers) | Marketplace escrow, seller KYC |
| Image Storage | Supabase Storage + Vercel Image Optimization | Raw storage + CDN transforms |
| Realtime | Supabase Realtime (Broadcast + Presence) | Chat, notifications, live updates |
| 3D | React Three Fiber + drei + postprocessing | Card viewer, holographic effects |
| Card APIs | Scryfall (MTG), Pokemon TCG API, eBay Browse (sports) | Catalog + pricing |
| AI | Google Cloud Vision + OpenAI GPT-4o Vision | Card ID + condition assessment |
| UI | shadcn/ui + Tailwind CSS | Dark mode, consistent design system |
| Monorepo | Turborepo | Shared types, cached builds |

**Monthly cost**: $0 during dev (free tiers), $25-50 at 1K users, $70-230 at 10K users.

---

## Niche Strategy (per Devil's Advocate)

**Launch vertical: Pokemon TCG**
- Massive community, younger demographic
- Underserved by TCGPlayer's desktop-first UX
- Pokemon TCG API is free and comprehensive
- Lower AOV aligns with our "volume play" thesis
- Community is highly active on Discord/Reddit (organic growth channel)

**Expand to** (in order): Yu-Gi-Oh → MTG → Sports cards → One Piece/Lorcana

---

## Phase Plan

### Phase 0: Scaffold & Foundation (Week 1)
- [x] Research complete (6 reports)
- [ ] Create GitHub repo (`ptolomea9/trove` or chosen name)
- [ ] Scaffold Next.js 16 + Supabase + Turborepo monorepo
- [ ] Set up Supabase project (DB, Auth, Storage)
- [ ] Configure shadcn/ui with dark mode design system
- [ ] Deploy to Vercel (empty shell)
- [ ] Set up CI/CD (lint, type-check on PR)

### Phase 1: Core Marketplace (Weeks 2-3)
- [ ] Database schema (profiles, card_catalog, listings, transactions)
- [ ] Auth flow (email + Google + Discord)
- [ ] Card catalog sync from Pokemon TCG API
- [ ] Listing creation flow (upload photo → AI identify → set price → publish)
- [ ] Search & browse (filters: set, rarity, condition, price range)
- [ ] Card detail page with image gallery
- [ ] Buy flow (add to cart → Stripe checkout → escrow hold)

### Phase 2: 3D Visualization (Week 3-4)
- [ ] React Three Fiber card component (texture + clearcoat + rotation)
- [ ] Presentation controls (drag rotate, zoom, auto-spin)
- [ ] Environment + contact shadows + bloom
- [ ] Holographic/foil shader for special cards
- [ ] Static thumbnail fallback for grid views
- [ ] Card flip animation (front/back)
- [ ] Mobile touch + gyroscope support

### Phase 3: Community & Trust (Weeks 4-5)
- [ ] User profiles (collection showcase, reputation score)
- [ ] DM messaging system (Supabase Realtime Broadcast)
- [ ] Seller verification levels (email → phone → ID → trusted)
- [ ] Review/rating system
- [ ] Dispute resolution workflow
- [ ] Wishlist + "notify me" alerts

### Phase 4: Payments & Escrow (Week 5-6)
- [ ] Stripe Connect seller onboarding
- [ ] Escrow flow (hold → ship → confirm → release)
- [ ] Auto-confirm after delivery tracking shows delivered (3 days)
- [ ] Auto-cancel if not shipped (5 business days)
- [ ] Seller dashboard (earnings, payouts, analytics)
- [ ] Fee calculator (transparent breakdown on every listing)

### Phase 5: AI Features (Weeks 6-8)
- [ ] Card identification from photo (Google Cloud Vision + Pokemon TCG API)
- [ ] Auto-pricing based on recent sales data
- [ ] Condition assessment hints from AI
- [ ] AI-generated card descriptions
- [ ] PSA/CGC cert number verification lookup

### Phase 6: Polish & Launch Prep (Weeks 8-10)
- [ ] Homepage with hero 3D card animation
- [ ] Mobile responsive polish
- [ ] SEO (card pages, set pages)
- [ ] Legal (Terms of Service, Privacy Policy)
- [ ] Seed marketplace with initial inventory (recruit 10-20 sellers)
- [ ] Beta testing with card community Discord servers
- [ ] Launch on Product Hunt + Reddit r/PokemonTCG

---

## Design System (from UI/UX Research)

### Colors (Dark Mode Default)
- Background: `#0A0A0F` (near-black with blue undertone)
- Surface: `#13131A` (cards, panels)
- Surface elevated: `#1C1C26` (dropdowns, modals)
- Border: `#2A2A3A`
- Text primary: `#F0F0F5`
- Text secondary: `#8888A0`
- Accent primary: `#7C5CFC` (violet - premium, modern)
- Accent secondary: `#00D4AA` (teal - success, money)
- Warning: `#FFB547`
- Error: `#FF4757`

### Typography
- Headings: Inter (bold, tracking tight)
- Body: Inter (regular)
- Mono/prices: JetBrains Mono

### Key Patterns
- Cards pop on dark backgrounds (core insight from competitor audit)
- Glassmorphism for floating UI elements over 3D scenes
- Subtle gradients on CTAs (violet → purple)
- Fee transparency badge on every listing ("You save X% vs TCGPlayer")

---

## Cold-Start Strategy (per Devil's Advocate Mitigations)

1. **Build free tools first** (Month 1-2): Collection tracker, price lookup, card identifier app
2. **Accumulate users** (Month 2-4): Target Pokemon Discord servers, Reddit, YouTube card channels
3. **Introduce marketplace** (Month 3+): Users already trust the platform from free tools
4. **Recruit sellers**: Offer 0% fees for first 90 days, then tiered pricing kicks in
5. **Seed inventory**: Partner with 5-10 local card shops for initial listings
6. **Content play**: Card guides, set reviews, market analysis blog (SEO traffic)

---

## Repo Structure

```
trove/
├── apps/
│   └── web/                    # Next.js 16 frontend + API routes
│       ├── src/
│       │   ├── app/            # App Router
│       │   │   ├── (auth)/     # Login, signup, reset
│       │   │   ├── (marketplace)/
│       │   │   │   ├── page.tsx          # Homepage
│       │   │   │   ├── search/           # Search results
│       │   │   │   ├── card/[id]/        # Card detail + 3D viewer
│       │   │   │   └── listing/[id]/     # Listing detail
│       │   │   ├── (dashboard)/
│       │   │   │   ├── listings/         # Manage listings
│       │   │   │   ├── orders/           # Order management
│       │   │   │   ├── messages/         # DM inbox
│       │   │   │   └── settings/         # Profile, payments
│       │   │   └── api/
│       │   │       ├── webhooks/stripe/  # Stripe webhook
│       │   │       └── ai/identify/      # Card identification
│       │   ├── components/
│       │   │   ├── ui/         # shadcn/ui
│       │   │   ├── cards/      # Card components
│       │   │   ├── 3d/         # React Three Fiber
│       │   │   ├── chat/       # Messaging
│       │   │   └── layout/     # Header, sidebar, footer
│       │   ├── lib/
│       │   │   ├── supabase/   # Client + server + middleware
│       │   │   ├── stripe/     # Connect helpers
│       │   │   └── ai/         # Vision + card ID
│       │   ├── hooks/
│       │   ├── stores/         # Zustand
│       │   └── types/
│       └── public/
├── packages/
│   ├── supabase/               # Migrations, edge functions, config
│   ├── shared/                 # Types, constants, utils
│   └── eslint-config/
├── turbo.json
├── package.json
└── PLAN.md
```

---

## Risk Mitigations

| Risk | Mitigation |
|------|-----------|
| Unit economics fail at low AOV | $0.50 minimum fee + buyer-pays processing |
| Cold start / no liquidity | Free tools first strategy, 0% intro seller fees |
| TCGPlayer matches fees | Lead with 3D experience + listing speed, not fees |
| Escrow regulatory burden | Use Stripe Connect (they handle MTL compliance) |
| AI card ID inaccurate | Human review fallback, community corrections |
| 3D performance issues | Static thumbnails in grids, 3D only on detail pages |
| Fraud/counterfeits | PSA cert verification, AI flagging, community reporting |

---

## Success Metrics (from Devil's Advocate)

| Timeframe | Metric | Target |
|-----------|--------|--------|
| Month 1 | Tool users (collection tracker) | 1,000 |
| Month 3 | Active sellers | 100 |
| Month 3 | Unique listings | 5,000 |
| Month 6 | Monthly GMV | $50K |
| Month 6 | Monthly active buyers | 500 |
| Month 12 | Monthly GMV | $500K |
| Month 12 | Active sellers | 1,000 |
| Month 12 | Break-even | $25K/mo revenue vs costs |
