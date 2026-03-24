# Trading Card Marketplace -- Backend Infrastructure Research

> **Date:** March 23, 2026
> **Status:** Research / Pre-Development
> **Goal:** Define the technical stack, integrations, and architecture for an MVP trading card marketplace with AI-powered card identification, 3D visualization, escrow payments, and community features.

---

## Table of Contents

1. [Recommended Tech Stack (TL;DR)](#1-recommended-tech-stack-tldr)
2. [Hosting & Framework Deep Dive](#2-hosting--framework-deep-dive)
3. [Database Schema Concepts](#3-database-schema-concepts)
4. [Image & Media Storage](#4-image--media-storage)
5. [Payment Processing & Escrow](#5-payment-processing--escrow)
6. [Card Databases & APIs](#6-card-databases--apis)
7. [AI Integration](#7-ai-integration)
8. [3D Card Visualization](#8-3d-card-visualization)
9. [Authentication & Trust](#9-authentication--trust)
10. [Repository Structure](#10-repository-structure)
11. [MVP Scope & Phasing](#11-mvp-scope--phasing)
12. [Cost Analysis](#12-cost-analysis)
13. [Open Questions](#13-open-questions)

---

## 1. Recommended Tech Stack (TL;DR)

| Layer | Technology | Why |
|---|---|---|
| **Frontend** | Next.js 15+ (App Router) on Vercel | SSR/SSG, image optimization, API routes, fast deploys |
| **Backend/BaaS** | Supabase | Auth, Postgres, Realtime, Storage, Edge Functions -- single platform |
| **Database** | Supabase PostgreSQL (built on Neon under the hood) | RLS, full SQL, JSON columns, full-text search, pgvector for AI |
| **Auth** | Supabase Auth | Social login (Google, Apple, Discord), email/password, magic link, phone OTP |
| **Payments** | Stripe Connect (Separate Charges & Transfers) | Marketplace-native escrow, seller onboarding/KYC, dispute handling |
| **Image Storage** | Supabase Storage + Cloudinary (image processing) | Supabase for raw storage, Cloudinary for transforms/watermarks/CDN |
| **Realtime** | Supabase Realtime | Broadcast (messaging), Presence (online status), Postgres Changes (live bids) |
| **3D Visualization** | React Three Fiber (@react-three/fiber) + Drei helpers | Declarative Three.js in React, card flip/rotate/zoom, holographic effects |
| **Card Data APIs** | Scryfall (MTG), Pokemon TCG API, TCGPlayer API | Free/affordable card catalogs with images, pricing, and set data |
| **AI/ML** | Google Cloud Vision + OpenAI Vision API | Card identification from photos, condition hints |
| **Hosting** | Vercel (frontend) + Supabase (backend) | Both have generous free tiers, scale independently |

**Estimated monthly cost for MVP (0-1K users):** $0-50/month (free tiers cover most needs).

---

## 2. Hosting & Framework Deep Dive

### 2.1 Supabase -- The BaaS Layer

**What it provides:**
- **PostgreSQL Database:** Full Postgres with extensions (pgvector, pg_trgm for fuzzy search, PostGIS if needed). Row Level Security (RLS) for authorization built into the DB layer.
- **Authentication:** Email/password, magic link, OTP, social providers (Google, Apple, Discord, GitHub, Facebook, Twitter/X, LinkedIn). JWTs for session management. Deep integration with RLS.
- **Realtime:** Three modes:
  - **Broadcast:** Low-latency pub/sub between clients. Perfect for DM chat and live notifications.
  - **Presence:** Track who is online. Good for showing active users on a listing page.
  - **Postgres Changes:** Subscribe to INSERT/UPDATE/DELETE on any table. Ideal for live bid updates.
- **Storage:** S3-compatible object storage with CDN delivery, image optimization (resize/compress on the fly), TUS resumable uploads, RLS-protected buckets.
- **Edge Functions:** Globally distributed TypeScript (Deno) functions. Perfect for webhook handlers (Stripe, shipping carriers), AI processing triggers, and background tasks.

**Supabase Pricing (as of March 2026):**

| Tier | Price | DB | Storage | Bandwidth | Edge Functions | Realtime |
|---|---|---|---|---|---|---|
| **Free** | $0/mo | 500 MB, 2 projects | 1 GB | 2 GB | 500K invocations | 200 concurrent connections |
| **Pro** | $25/mo | 8 GB, unlimited projects | 100 GB | 250 GB | 2M invocations | 500 concurrent |
| **Team** | $599/mo | 8 GB base | 100 GB base | 250 GB base | 2M base | 500 base |
| **Enterprise** | Custom | Custom | Custom | Custom | Custom | Custom |

**Verdict:** Free tier is perfect for development and early MVP. Pro tier ($25/mo) covers up to ~10K users comfortably. The main scaling concern is Realtime connections if you have many concurrent chat users -- plan to use Broadcast (cheaper) over Postgres Changes where possible.

### 2.2 Vercel -- Frontend Hosting

- **Next.js native deployment** with zero config
- **Edge Network** for static assets and ISR
- **Serverless Functions** (API routes) as fallback for anything Supabase Edge Functions cannot handle
- **Image Optimization** via `next/image` (auto-resize, WebP/AVIF, lazy loading)
- **Analytics and Speed Insights** built in
- **Free tier:** 100 GB bandwidth, 100 hours serverless, unlimited deploys

### 2.3 Alternative Backends Considered

| Option | Pros | Cons | Verdict |
|---|---|---|---|
| **Firebase** | Google ecosystem, good mobile SDKs | NoSQL (Firestore) -- bad for relational card data, vendor lock-in | Not recommended |
| **PlanetScale** | MySQL-compatible, branching | No built-in auth/storage/realtime, MySQL not Postgres | Partial solution only |
| **Neon** | Serverless Postgres, branching | No auth/storage/realtime -- need to piece together | More work for same result |
| **Railway** | Easy deploys, Docker support | No built-in auth/storage/realtime | Good for custom backends, not BaaS |
| **Appwrite** | Open-source BaaS alternative | Smaller ecosystem, fewer integrations | Viable but less mature |

**Recommendation:** Supabase + Vercel is the fastest path to MVP. Supabase consolidates 4-5 services (DB, auth, realtime, storage, edge functions) into one platform with a single SDK. This saves weeks of integration work compared to stitching together separate services.

---

## 3. Database Schema Concepts

### 3.1 Core Tables

```sql
-- ============================================================
-- USERS & PROFILES
-- ============================================================

-- Supabase Auth handles the core auth.users table.
-- We extend it with a public profile.

CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  display_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  location TEXT,
  reputation_score NUMERIC(5,2) DEFAULT 0,
  verification_level TEXT DEFAULT 'unverified'
    CHECK (verification_level IN ('unverified', 'email_verified', 'phone_verified', 'id_verified', 'trusted_seller')),
  total_sales INTEGER DEFAULT 0,
  total_purchases INTEGER DEFAULT 0,
  stripe_account_id TEXT, -- Stripe Connect account
  stripe_onboarding_complete BOOLEAN DEFAULT FALSE,
  is_seller BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- CARD CATALOG (Master Reference Data)
-- ============================================================

CREATE TABLE public.card_games (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL, -- 'Magic: The Gathering', 'Pokemon', 'Yu-Gi-Oh!', 'Sports'
  slug TEXT UNIQUE NOT NULL,
  api_source TEXT, -- 'scryfall', 'pokemontcg', 'manual'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.card_sets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  game_id UUID REFERENCES public.card_games(id),
  name TEXT NOT NULL,
  code TEXT, -- Set code (e.g., 'MH3' for Modern Horizons 3)
  release_date DATE,
  external_id TEXT, -- ID from the source API
  icon_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.card_catalog (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  game_id UUID REFERENCES public.card_games(id),
  set_id UUID REFERENCES public.card_sets(id),
  name TEXT NOT NULL,
  external_id TEXT, -- Scryfall ID, Pokemon TCG ID, etc.
  collector_number TEXT,
  rarity TEXT,
  image_url_small TEXT,
  image_url_normal TEXT,
  image_url_large TEXT,
  oracle_text TEXT, -- Card text
  type_line TEXT, -- "Creature - Human Wizard"
  mana_cost TEXT,
  colors TEXT[], -- Array of colors
  keywords TEXT[], -- Searchable keywords
  market_price_usd NUMERIC(10,2), -- Latest market price
  price_updated_at TIMESTAMPTZ,
  metadata JSONB, -- Flexible field for game-specific data
  search_vector TSVECTOR, -- Full-text search
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_card_catalog_search ON public.card_catalog USING GIN(search_vector);
CREATE INDEX idx_card_catalog_game ON public.card_catalog(game_id);
CREATE INDEX idx_card_catalog_name ON public.card_catalog(name);
CREATE INDEX idx_card_catalog_external ON public.card_catalog(external_id);

-- ============================================================
-- LISTINGS (User-Created Card Listings for Sale)
-- ============================================================

CREATE TABLE public.listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_id UUID REFERENCES public.profiles(id) NOT NULL,
  catalog_card_id UUID REFERENCES public.card_catalog(id), -- Link to known card (nullable for custom/unknown cards)

  -- Card Details (user-provided, may differ from catalog)
  title TEXT NOT NULL,
  description TEXT,
  game_id UUID REFERENCES public.card_games(id) NOT NULL,
  card_name TEXT NOT NULL,
  card_set TEXT,
  card_number TEXT,

  -- Condition & Grading
  condition TEXT NOT NULL
    CHECK (condition IN ('mint', 'near_mint', 'lightly_played', 'moderately_played', 'heavily_played', 'damaged')),
  is_graded BOOLEAN DEFAULT FALSE,
  grading_company TEXT CHECK (grading_company IN ('PSA', 'BGS', 'CGC', 'SGC', NULL)),
  grade_value NUMERIC(3,1), -- e.g., 9.5, 10.0
  cert_number TEXT, -- Grading certificate number

  -- Pricing
  price_usd NUMERIC(10,2) NOT NULL,
  shipping_cost_usd NUMERIC(6,2) DEFAULT 0,
  accepts_offers BOOLEAN DEFAULT FALSE,
  minimum_offer_usd NUMERIC(10,2),

  -- Media
  images TEXT[] NOT NULL, -- Array of Supabase Storage URLs (min 1 required)
  threed_asset_url TEXT, -- URL to 3D model/scene if generated

  -- Status
  status TEXT DEFAULT 'draft'
    CHECK (status IN ('draft', 'active', 'sold', 'reserved', 'expired', 'cancelled')),

  -- Metadata
  views INTEGER DEFAULT 0,
  favorites_count INTEGER DEFAULT 0,
  listed_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_listings_seller ON public.listings(seller_id);
CREATE INDEX idx_listings_status ON public.listings(status);
CREATE INDEX idx_listings_game ON public.listings(game_id);
CREATE INDEX idx_listings_price ON public.listings(price_usd);
CREATE INDEX idx_listings_created ON public.listings(created_at DESC);

-- ============================================================
-- TRANSACTIONS (Escrow-Based Purchase Flow)
-- ============================================================

CREATE TABLE public.transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id UUID REFERENCES public.listings(id) NOT NULL,
  buyer_id UUID REFERENCES public.profiles(id) NOT NULL,
  seller_id UUID REFERENCES public.profiles(id) NOT NULL,

  -- Financial
  amount_usd NUMERIC(10,2) NOT NULL, -- Total charged to buyer
  shipping_cost_usd NUMERIC(6,2) DEFAULT 0,
  platform_fee_usd NUMERIC(10,2) NOT NULL, -- Our 3-5% cut
  seller_payout_usd NUMERIC(10,2) NOT NULL, -- Amount seller receives
  stripe_payment_intent_id TEXT,
  stripe_transfer_id TEXT, -- Transfer to seller's connected account

  -- Escrow Status
  status TEXT DEFAULT 'pending_payment'
    CHECK (status IN (
      'pending_payment',    -- Buyer initiated, awaiting payment
      'payment_held',       -- Payment captured, funds held on platform
      'shipped',            -- Seller marked as shipped
      'in_transit',         -- Tracking shows in transit
      'delivered',          -- Tracking shows delivered
      'buyer_confirmed',    -- Buyer confirmed receipt
      'payout_initiated',   -- Transfer to seller initiated
      'completed',          -- Funds released to seller
      'disputed',           -- Buyer opened dispute
      'refunded',           -- Full refund issued
      'cancelled'           -- Cancelled before shipping
    )),

  -- Shipping
  tracking_number TEXT,
  shipping_carrier TEXT,
  shipped_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,

  -- Dispute
  dispute_reason TEXT,
  dispute_opened_at TIMESTAMPTZ,
  dispute_resolved_at TIMESTAMPTZ,
  dispute_resolution TEXT CHECK (dispute_resolution IN ('buyer_favor', 'seller_favor', 'split', NULL)),

  -- Confirmation
  buyer_confirmed_at TIMESTAMPTZ,
  auto_confirm_at TIMESTAMPTZ, -- Auto-confirm 3 days after delivery
  seller_paid_at TIMESTAMPTZ,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- MESSAGING (Direct Messages)
-- ============================================================

CREATE TABLE public.conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id UUID REFERENCES public.listings(id), -- Optional: conversation about a listing
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.conversation_participants (
  conversation_id UUID REFERENCES public.conversations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  last_read_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (conversation_id, user_id)
);

CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES public.conversations(id) ON DELETE CASCADE NOT NULL,
  sender_id UUID REFERENCES public.profiles(id) NOT NULL,
  content TEXT NOT NULL,
  message_type TEXT DEFAULT 'text'
    CHECK (message_type IN ('text', 'image', 'offer', 'system')),
  metadata JSONB, -- For offers: { offer_amount: 25.00 }
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_messages_conversation ON public.messages(conversation_id, created_at DESC);

-- ============================================================
-- COLLECTIONS & WISHLISTS
-- ============================================================

CREATE TABLE public.collections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) NOT NULL,
  name TEXT NOT NULL DEFAULT 'My Collection',
  description TEXT,
  is_public BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.collection_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  collection_id UUID REFERENCES public.collections(id) ON DELETE CASCADE NOT NULL,
  catalog_card_id UUID REFERENCES public.card_catalog(id),
  listing_id UUID REFERENCES public.listings(id), -- If they own this specific listing
  quantity INTEGER DEFAULT 1,
  condition TEXT,
  notes TEXT,
  added_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.favorites (
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  listing_id UUID REFERENCES public.listings(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, listing_id)
);

-- ============================================================
-- REVIEWS & RATINGS
-- ============================================================

CREATE TABLE public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  transaction_id UUID REFERENCES public.transactions(id) UNIQUE NOT NULL,
  reviewer_id UUID REFERENCES public.profiles(id) NOT NULL,
  reviewed_id UUID REFERENCES public.profiles(id) NOT NULL,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  title TEXT,
  comment TEXT,
  review_type TEXT NOT NULL CHECK (review_type IN ('buyer_to_seller', 'seller_to_buyer')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- OFFERS (Price Negotiation)
-- ============================================================

CREATE TABLE public.offers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id UUID REFERENCES public.listings(id) NOT NULL,
  buyer_id UUID REFERENCES public.profiles(id) NOT NULL,
  amount_usd NUMERIC(10,2) NOT NULL,
  message TEXT,
  status TEXT DEFAULT 'pending'
    CHECK (status IN ('pending', 'accepted', 'declined', 'countered', 'expired', 'withdrawn')),
  counter_amount_usd NUMERIC(10,2),
  expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '48 hours'),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 3.2 Key Design Decisions

1. **Separate `card_catalog` from `listings`:** The catalog is reference data (synced from APIs). Listings are user-generated content. A listing *may* link to a catalog entry, but users can list cards not yet in the catalog.

2. **JSONB `metadata` columns:** Card games have very different data shapes. MTG has mana cost/colors/power/toughness. Pokemon has HP/weakness/resistance. Sports cards have player stats. JSONB handles this without separate tables per game.

3. **Full-text search via `tsvector`:** Postgres native full-text search handles most search needs without an external service. For more advanced search (fuzzy, typo-tolerant), consider adding Meilisearch or Typesense later.

4. **Offer/counter-offer flow:** Separate `offers` table enables price negotiation without cluttering the transaction table. Only accepted offers become transactions.

5. **Auto-confirm deadline:** `auto_confirm_at` is set to 3 days after delivery tracking shows delivered. If the buyer does not dispute, funds auto-release to the seller. This prevents indefinite escrow holds.

---

## 4. Image & Media Storage

### 4.1 Architecture

```
User uploads photo
    |
    v
[Next.js client] --upload--> [Supabase Storage] (raw originals)
    |
    v
[Supabase Edge Function / webhook trigger]
    |
    v
[Cloudinary] (resize, compress, watermark, generate thumbnails)
    |
    v
[Supabase DB] stores processed URLs
    |
    v
[Cloudinary CDN] serves optimized images to users
```

### 4.2 Storage Strategy

| Use Case | Service | Why |
|---|---|---|
| **Raw originals** | Supabase Storage | Cheap, S3-compatible, RLS-protected, resumable upload |
| **Thumbnails (200x280)** | Supabase Storage image transforms OR Cloudinary | On-the-fly resize via URL params |
| **Listing images (800x1120)** | Cloudinary | Watermarking, quality optimization, format negotiation (WebP/AVIF) |
| **3D assets (textures)** | Supabase Storage | GLB/GLTF models and high-res textures |
| **CDN delivery** | Cloudinary (images) + Supabase CDN (3D assets) | Global edge caching |

### 4.3 Supabase Storage Image Transforms

Supabase Storage has built-in image optimization. You can resize and format-convert via URL parameters:

```
https://<project>.supabase.co/storage/v1/render/image/public/cards/listing-123.jpg
  ?width=400
  &height=560
  &quality=80
  &format=webp
```

This eliminates the need for Cloudinary for basic transforms. Reserve Cloudinary for watermarking and advanced processing.

### 4.4 Image Processing Pipeline

For each listing upload:
1. **Client-side pre-processing:** Resize to max 2000px, compress to < 5MB before upload (use `browser-image-compression` library)
2. **Upload to Supabase Storage** in a private bucket (`listing-images/{user_id}/{listing_id}/`)
3. **Edge Function trigger** on upload:
   - Generate thumbnail (200x280)
   - Generate listing size (800x1120)
   - Apply watermark overlay (semi-transparent site logo)
   - Run AI card identification (optional, async)
   - Store processed URLs in the listing record
4. **Serve via CDN** with cache headers (long TTL since images rarely change)

### 4.5 Cost Analysis

| Scale | Storage | Bandwidth | Transforms | Monthly Cost |
|---|---|---|---|---|
| **1K listings** (~5K images) | ~5 GB | ~50 GB/mo | ~50K/mo | $0-25 (Supabase Pro) |
| **10K listings** (~50K images) | ~50 GB | ~500 GB/mo | ~500K/mo | $25-75 (Supabase Pro + bandwidth overage) |
| **100K listings** (~500K images) | ~500 GB | ~5 TB/mo | ~5M/mo | $200-500 (Supabase Team or Cloudinary paid) |

**Recommendation for MVP:** Use Supabase Storage with built-in image transforms. Add Cloudinary only when you need watermarking or advanced processing. This keeps the MVP cost at $0-25/month.

---

## 5. Payment Processing & Escrow

### 5.1 Why Stripe Connect

Stripe Connect is purpose-built for marketplaces. It handles:
- **Seller onboarding/KYC**: Stripe-hosted onboarding flow collects identity verification, bank details, and tax information. You do not need to build or store any of this.
- **Payment processing**: Accept cards, Apple Pay, Google Pay, ACH.
- **Fund holding**: Payments are captured to your platform account. You control when to transfer to sellers.
- **Dispute handling**: Stripe manages chargebacks. You can submit evidence.
- **1099 tax reporting**: Stripe files 1099s for US sellers who exceed thresholds.

### 5.2 Recommended Pattern: Separate Charges and Transfers

This is the best pattern for an escrow marketplace. Here is why:

| Pattern | How it Works | Escrow Compatible? | Multi-Seller? |
|---|---|---|---|
| **Direct Charges** | Customer pays seller directly | No -- funds go straight to seller | No |
| **Destination Charges** | Customer pays platform, auto-transfers to one seller | Partial -- transfer is immediate | No |
| **Separate Charges & Transfers** | Customer pays platform, you manually transfer later | **Yes -- you control timing** | **Yes** |

With Separate Charges and Transfers:
1. Buyer pays your platform account via Checkout or PaymentIntent
2. Funds land in your platform Stripe balance
3. You hold funds until buyer confirms delivery (or auto-confirm triggers)
4. You create a Transfer to the seller's connected account, minus your fee

**Note on "Funds Segregation":** Stripe has a private preview feature that keeps payment funds in a protected holding state before transfer. This prevents commingling of escrow funds with platform operating funds. Contact Stripe to request access -- this is important for regulatory compliance at scale.

### 5.3 Escrow Flow (Step by Step)

```
1. BUYER clicks "Buy Now" on listing ($100 card + $5 shipping)
   |
2. PLATFORM creates Stripe Checkout Session
   - amount: $105.00 (card + shipping)
   - Stripe processing fee: ~$3.35 (2.9% + $0.30)
   |
3. BUYER completes payment
   - $105.00 captured to PLATFORM's Stripe balance
   - Transaction status: 'payment_held'
   - Listing status: 'sold'
   |
4. SELLER is notified, ships the card
   - Seller enters tracking number
   - Transaction status: 'shipped'
   |
5. TRACKING shows delivered
   - Transaction status: 'delivered'
   - Auto-confirm timer starts (3 business days)
   |
6. BUYER confirms receipt (or timer expires)
   - Transaction status: 'buyer_confirmed'
   |
7. PLATFORM creates Stripe Transfer to seller
   - Platform fee: $3.15 (3% of $105)
   - Seller receives: $105.00 - $3.15 = $101.85
   - (Stripe's $3.35 fee already deducted from platform balance)
   - Transaction status: 'completed'

DISPUTE PATH (if buyer claims issue at step 5-6):
   - Transaction status: 'disputed'
   - Platform reviews evidence (photos, tracking)
   - Resolution: refund buyer OR release to seller
```

### 5.4 Fee Structure

| Fee | Amount | Who Pays |
|---|---|---|
| **Stripe processing** | 2.9% + $0.30 per transaction | Platform (deducted from total) |
| **Stripe Connect** | $2/mo per active connected account (Express) | Platform |
| **Platform fee** | 3-5% of sale price | Seller (deducted before payout) |
| **Stripe payout** | $0.25 per payout (to seller bank) | Platform or seller |

**Example on a $50 card sale:**
- Buyer pays: $50.00
- Stripe processing fee: $1.75 (2.9% + $0.30)
- Platform fee (3%): $1.50
- Seller receives: $50.00 - $1.50 = $48.50
- Platform net revenue: $1.50 - $1.75 = **-$0.25** (loss on small transactions!)

**Important:** At 3% platform fee, transactions under ~$15 are unprofitable after Stripe fees. Consider:
- Minimum listing price of $5
- Flat $0.50 minimum fee
- 5% fee for items under $20, 3% for items $20+
- Passing Stripe fees to the buyer (add "payment processing fee" line item)

### 5.5 Seller Onboarding

Stripe Connect Express accounts provide:
1. Hosted onboarding link (you redirect seller to Stripe)
2. Stripe collects: legal name, DOB, SSN (last 4), bank account, address
3. Stripe verifies identity (may require photo ID)
4. Onboarding complete callback to your app
5. Seller can now receive payouts

This takes 5-10 minutes for the seller and requires zero development on your side beyond generating the onboarding link.

### 5.6 PayPal as Alternative

Consider adding PayPal as a secondary payment method post-MVP:
- PayPal Commerce Platform is their marketplace equivalent
- Many trading card buyers/sellers are accustomed to PayPal from eBay
- PayPal Seller Protection can complement Stripe's dispute handling
- However, PayPal's API is more complex and their marketplace product is less mature

**MVP Recommendation:** Stripe Connect only. Add PayPal in a later phase.

---

## 6. Card Databases & APIs

### 6.1 Available APIs

#### Magic: The Gathering -- Scryfall API

| Feature | Details |
|---|---|
| **URL** | `https://api.scryfall.com` |
| **Authentication** | None required (public API) |
| **Rate Limit** | 10 requests/second (50-100ms delay between requests) |
| **Coverage** | Every MTG card ever printed (~90K+ unique cards, 600K+ printings) |
| **Data Included** | Name, mana cost, type, oracle text, rarity, set, prices (USD/EUR/TIX), legalities, images (small/normal/large/png/art_crop) |
| **Pricing Data** | Daily updated from TCGPlayer, CardMarket, Cardhoarder |
| **Bulk Data** | Full database downloadable as JSON (~350MB compressed) |
| **Images** | Free to use under Wizards Fan Content Policy |
| **Cost** | Free |
| **Quality** | Excellent -- the gold standard for MTG data |

Key endpoints:
- `GET /cards/search?q=name:lightning+bolt` -- Search cards
- `GET /cards/{id}` -- Get card by Scryfall ID
- `GET /cards/named?exact=Lightning+Bolt` -- Exact name lookup
- `GET /cards/collection` -- Batch lookup up to 75 cards
- `GET /bulk-data` -- Download entire database

**Strategy:** Download bulk data nightly via a cron Edge Function. Store in `card_catalog` table. Use Scryfall images directly (permitted by their terms) or cache in Supabase Storage.

#### Pokemon TCG API (pokemontcg.io)

| Feature | Details |
|---|---|
| **URL** | `https://api.pokemontcg.io/v2` |
| **Authentication** | Optional API key (higher rate limits with key) |
| **Rate Limit** | 1000 requests/day (no key) / 20K+ requests/day (with key) |
| **Coverage** | All Pokemon TCG cards (Base Set through current) |
| **Data Included** | Name, HP, types, attacks, weaknesses, resistances, rarity, set, images, TCGPlayer prices, Cardmarket prices |
| **Pricing Data** | Market, low, mid, high prices from TCGPlayer |
| **Bulk Data** | Not available -- must paginate through API |
| **Cost** | Free (key available at dev.pokemontcg.io) |
| **Quality** | Very good. Active maintenance. SDKs for JS, Python, Ruby, Go, etc. |

Key endpoints:
- `GET /v2/cards?q=name:charizard` -- Search cards
- `GET /v2/cards/{id}` -- Get card by ID (e.g., `base1-4`)
- `GET /v2/sets` -- List all sets

**Strategy:** Sync periodically (weekly is sufficient for catalog data). Price data updates are less frequent than Scryfall.

#### TCGPlayer API

| Feature | Details |
|---|---|
| **URL** | `api.tcgplayer.com` |
| **Authentication** | API key required (application to their developer program) |
| **Coverage** | MTG, Pokemon, Yu-Gi-Oh!, Sports cards, and more |
| **Data Included** | Catalog data, pricing (market, buylist, low, mid, high), product details |
| **Affiliate Program** | Earn commissions on referred sales |
| **Cost** | Free for approved developers |
| **Quality** | Good -- primary pricing source for US market |

**Strategy:** Apply for API access. Use primarily for **pricing data** (market prices, recent sales) to power our price suggestion feature. TCGPlayer is the US market standard for card pricing. Also explore their affiliate program for additional revenue.

#### Yu-Gi-Oh! -- YGOPRODeck API

| Feature | Details |
|---|---|
| **URL** | `https://db.ygoprodeck.com/api/v7/` |
| **Authentication** | None |
| **Rate Limit** | 20 requests/second |
| **Coverage** | All Yu-Gi-Oh! cards |
| **Data Included** | Name, type, description, ATK/DEF, level, race, attribute, images, prices from TCGPlayer/CardMarket/eBay/Amazon |
| **Cost** | Free |

#### Sports Cards

There is no single dominant free API for sports cards. Options:

| Source | Type | Coverage | Notes |
|---|---|---|---|
| **SportsCardsPro** | Website/scraping | MLB, NFL, NBA, NHL | No public API. Would require Apify scraper. |
| **COMC (CheckOutMyCards)** | Marketplace | Broad sports coverage | No public API. |
| **Beckett** | Pricing/grading service | Comprehensive | Paid subscription for pricing data. No developer API. |
| **eBay Browse API** | Marketplace data | Everything on eBay | Can search completed listings for price comps. Requires eBay developer account. |
| **Card Ladder** | Analytics | Investment-grade cards | Paid service, no public API. |

**Strategy for sports cards:** Build a manual entry flow for MVP. Use eBay's Browse API to pull comparable sold prices. Long-term, consider partnering with a data provider or building a community-contributed catalog.

#### PSA Cert Verification

| Feature | Details |
|---|---|
| **URL** | `https://www.psacard.com/cert/{cert_number}` |
| **Authentication** | None (public web page) |
| **API** | No official public API |
| **Strategy** | For MVP, accept cert number as user input. Display a link to PSA's verification page. Long-term, build a scraper (with legal review) or explore PSA's partner program for API access. |

BGS (Beckett Grading) and CGC similarly have public lookup pages but no developer APIs.

#### eBay Browse API

| Feature | Details |
|---|---|
| **URL** | `https://api.ebay.com/buy/browse/v1` |
| **Authentication** | OAuth 2.0 (eBay developer account) |
| **Rate Limit** | 5000 calls/day (default) |
| **Useful For** | Price comparisons from recently sold items |
| **Key Endpoint** | `GET /item_summary/search?q=charizard+base+set+psa+10&filter=buyingOptions:{FIXED_PRICE|AUCTION}&filter=conditionIds:{1000|3000}` |
| **Cost** | Free |

**Strategy:** Use eBay Browse API for "recent sales" price comparisons. Show users "This card recently sold for $X-$Y on eBay" to build trust and help pricing decisions.

### 6.2 Card Data Sync Architecture

```
[Nightly Cron via Supabase Edge Function or Vercel Cron]
    |
    +--> Scryfall Bulk Data Download (~350MB)
    |       Parse JSON, upsert into card_catalog
    |       Update market prices
    |
    +--> Pokemon TCG API (paginated fetch)
    |       Upsert into card_catalog
    |       Update prices from TCGPlayer/Cardmarket
    |
    +--> Yu-Gi-Oh! API
    |       Upsert into card_catalog
    |
    +--> (Future) TCGPlayer pricing refresh
            Update market_price_usd for all games
```

**Initial seeding:** For MVP, start with Scryfall (MTG) only. It is the most complete, highest quality, and free. Add Pokemon and Yu-Gi-Oh! in phase 2. Sports cards in phase 3.

---

## 7. AI Integration

### 7.1 Card Identification from Photos

The core AI feature: a user takes a photo of a card, and we identify which card it is.

#### Approach 1: Google Cloud Vision + Scryfall Search (Recommended for MVP)

```
User photo --> [Google Cloud Vision OCR] --> extract card name + set symbol text
                    |
                    v
              [Scryfall API search] --> match to specific card printing
                    |
                    v
              [Return matched card with pricing data]
```

**How it works:**
1. User uploads a photo of a card
2. Send to Google Cloud Vision `TEXT_DETECTION` (OCR)
3. Extract the card name (usually the largest text at the top)
4. Extract set symbol, collector number, or other identifying text
5. Search Scryfall (or our local catalog) with extracted text
6. Return top matches for user to confirm

**Cost:** Google Cloud Vision is $1.50 per 1,000 images (first 1,000/month free). At 10K identifications/month = $15/month.

**Accuracy:** Very high for English-language cards with clear text. Lower for foil cards, foreign language, or heavily damaged cards.

#### Approach 2: OpenAI Vision API (GPT-4o)

```
User photo --> [OpenAI GPT-4o Vision] --> "This is a Charizard from Base Set,
                                           card #4/102, Holo Rare"
```

**How it works:**
1. Send the photo to GPT-4o with a structured prompt:
   > "Identify this trading card. Return JSON with: game, card_name, set_name, card_number, rarity, estimated_condition"
2. GPT-4o can identify the card, its set, and even estimate condition from visual cues
3. Search our catalog with the returned data

**Cost:** GPT-4o Vision is ~$5 per 1,000 high-detail images. At 10K identifications/month = ~$50/month.

**Accuracy:** Excellent for well-known cards. GPT-4o has strong training data on MTG, Pokemon, and Yu-Gi-Oh! cards. Can also estimate condition (centering, whitening, creases) which Google Vision cannot.

#### Approach 3: Custom Model (Future)

Train a custom image classification model on card images:
- Use Scryfall's image database (100K+ images) as training data
- Fine-tune a vision model (e.g., CLIP, ResNet) for card identification
- Deploy on edge for instant identification

**Timeline:** Not for MVP. Requires significant ML engineering. Consider for v2 if API costs become prohibitive at scale.

#### Recommendation

**MVP:** Use Google Cloud Vision OCR + Scryfall search. It is cheap, accurate for text-heavy cards, and requires no model training.

**Phase 2:** Add OpenAI Vision as a premium feature for condition assessment and harder-to-identify cards (foils, promos, foreign language).

**Phase 3:** Explore custom model if volume exceeds 100K identifications/month.

### 7.2 Condition Assessment

| Approach | Method | Accuracy | Cost |
|---|---|---|---|
| **Manual (MVP)** | User selects condition from dropdown | N/A -- user self-reports | Free |
| **AI-assisted hints** | GPT-4o Vision analyzes card photo for centering, whitening, surface damage | Medium -- can flag obvious issues | $5/1K images |
| **Professional grading integration** | User enters PSA/BGS cert number | High -- verified by grading company | Free (lookup only) |

**Recommendation:** Start with manual condition selection. Add AI condition hints in Phase 2 as a "condition check" feature. Never present AI grades as authoritative -- always frame as "estimated" with a disclaimer.

### 7.3 Price Suggestion

```
Seller creates listing
    |
    v
[Fetch market data from card_catalog]
    - Scryfall market price
    - TCGPlayer low/mid/high
    - eBay recent sold (via Browse API)
    |
    v
[Adjust for condition]
    - NM: 100% of market
    - LP: 85% of market
    - MP: 70% of market
    - HP: 50% of market
    - Damaged: 30% of market
    |
    v
[Display to seller]
    "Suggested price: $12.50 - $18.00"
    "Recent sales: $14.99 (TCGPlayer), $16.50 (eBay)"
```

This does not require AI/ML -- it is straightforward data aggregation and condition-based multipliers.

### 7.4 AI Background Generation (3D Card Display)

Use AI to generate scenic/thematic backgrounds for the 3D card viewer:
- **Stable Diffusion / DALL-E**: Generate backgrounds based on card type ("fiery landscape for a Fire-type Pokemon", "dark swamp for a Black MTG card")
- **Pre-generated library**: Generate 50-100 themed backgrounds upfront, assign based on card attributes
- **User customization**: Let users pick or generate custom backgrounds for their collection showcase

**MVP:** Use 10-15 pre-made gradient/particle backgrounds. AI generation is a nice-to-have for Phase 3.

---

## 8. 3D Card Visualization

### 8.1 Technology: React Three Fiber + Drei

**React Three Fiber** (@react-three/fiber) is a React renderer for Three.js. It lets you write Three.js scenes as JSX components. **Drei** (@react-three/drei) provides ready-made helpers (cameras, controls, effects).

```
npm install three @types/three @react-three/fiber @react-three/drei
```

Why this stack:
- **Declarative:** Write 3D scenes as React components (works naturally with Next.js)
- **No overhead:** Components render outside React's reconciler -- same performance as raw Three.js
- **Rich ecosystem:** Drei has 100+ helpers (orbit controls, environment maps, post-processing, etc.)
- **SSR compatible:** Works with Next.js (render placeholder server-side, hydrate with 3D client-side)

### 8.2 3D Card Component Concept

The 3D card viewer renders a card as a textured plane with:
- **Front face:** High-res card image mapped as texture
- **Back face:** Generic card back texture (game-specific)
- **Thickness:** Slight extrusion to simulate card thickness (~0.5mm)
- **Holographic effect:** Reflective material with normal map for foil/holo cards
- **Interactions:** Click to flip, drag to rotate, scroll to zoom, auto-rotate idle animation

```jsx
// Conceptual component structure (not runnable code -- for architecture reference)

<Canvas camera={{ position: [0, 0, 2.5] }}>
  <ambientLight intensity={0.5} />
  <spotLight position={[5, 5, 5]} />

  <TradingCard
    frontTexture="/cards/charizard-base-front.jpg"
    backTexture="/cards/pokemon-back.jpg"
    isHolo={true}
    condition="near_mint"
  />

  <OrbitControls
    enableZoom={true}
    minDistance={1.5}
    maxDistance={5}
    autoRotate={true}
    autoRotateSpeed={1}
  />

  <Environment preset="studio" />
</Canvas>
```

### 8.3 Holographic/Foil Effect

For holographic cards, apply a custom shader or normal map that creates a rainbow refraction effect:
- Use `MeshPhysicalMaterial` with `clearcoat`, `iridescence`, and `reflectivity`
- Map a noise texture as a normal map for the "sparkle" pattern
- Animate the effect based on camera angle (iridescence shifts as you rotate)
- Drei's `MeshReflectorMaterial` and `MeshTransmissionMaterial` can help

### 8.4 Performance Considerations

- **Lazy load:** Only render the 3D viewer when the user clicks "View in 3D" (do not render on listing cards in the grid)
- **Texture size:** Use 1024x1024 textures for the 3D view (not full-res images)
- **Fallback:** Show a static image for devices that cannot run WebGL (use `<Canvas fallback={<img ... />}>`)
- **Mobile:** Reduce polygon count and disable auto-rotate on mobile. R3F handles this via `frameloop="demand"` (only re-render on interaction)

### 8.5 Future: True 3D Model Generation

Going from a 2D photo to a true 3D model (with depth, edge detail, etc.) would require:
- **NeRF / Gaussian Splatting:** Requires multiple photos from different angles. Not practical for single-photo listings.
- **AI depth estimation:** Use a model like MiDaS or Depth Anything to estimate a depth map from a single photo, then displace the plane geometry.
- **Practical approach for MVP:** A flat plane with edge thickness looks great for cards. True 3D is not needed and would over-complicate the MVP.

---

## 9. Authentication & Trust

### 9.1 Auth Architecture (Supabase Auth)

```
[User] --> [Next.js App]
              |
              v
        [Supabase Auth]
          - Email/Password signup
          - Magic Link (passwordless)
          - Google OAuth
          - Apple OAuth
          - Discord OAuth (popular in card communities)
              |
              v
        [JWT issued] --> [Stored in HTTP-only cookie]
              |
              v
        [Row Level Security]
          - Users can only read/write their own data
          - Listings are publicly readable
          - Messages are restricted to conversation participants
          - Transactions visible only to buyer/seller
```

Supabase Auth supports 20+ social providers. For a trading card marketplace, prioritize:
1. **Email/Password** (universal)
2. **Google** (most common social login)
3. **Discord** (popular in MTG/Pokemon communities)
4. **Apple** (required for iOS App Store if we build mobile)

### 9.2 Verification Levels

| Level | Requirements | Unlocks |
|---|---|---|
| **Unverified** | Just signed up | Browse, wishlist only |
| **Email Verified** | Confirmed email | Buy cards, message sellers |
| **Phone Verified** | Confirmed phone via SMS OTP | Create listings, sell cards |
| **ID Verified** | Stripe Connect KYC (happens during seller onboarding) | Receive payouts, higher listing limits |
| **Trusted Seller** | 10+ completed sales, 4.5+ rating, 90+ days active | Featured placement, lower fees, verification badge |

### 9.3 Anti-Fraud Measures

| Risk | Mitigation |
|---|---|
| **Fake listings (no card to sell)** | Require photos, hold funds in escrow, buyer confirmation required |
| **Shill bidding** | MVP uses fixed-price only (no auctions). Auctions in future phase with IP/device fingerprinting |
| **Counterfeit cards** | AI card identification flags suspicious cards. PSA/BGS cert verification for graded cards. Community reporting |
| **Account takeover** | MFA via Supabase Auth (TOTP), session management, email alerts on login from new device |
| **Payment fraud** | Stripe Radar (built-in ML fraud detection). 3D Secure for high-value transactions ($100+) |
| **Scam messaging** | Content filtering on messages (no external payment links). Flag messages containing PayPal/Venmo/Zelle/Cash App |
| **Buyer not confirming** | Auto-confirm 3 days after delivery tracking shows delivered |
| **Seller not shipping** | Auto-cancel and refund if not shipped within 5 business days |

### 9.4 Dispute Resolution Workflow

```
1. Buyer opens dispute (within 3 days of delivery)
   - Must provide reason + photos
   - Transaction status -> 'disputed'

2. Seller responds (48 hours)
   - Provides counter-evidence + photos

3. Platform reviews (48 hours)
   - Compare buyer/seller evidence
   - Check tracking data
   - Check card identification match

4. Resolution
   - BUYER FAVOR: Full refund, buyer returns card (prepaid label)
   - SELLER FAVOR: Funds released to seller
   - SPLIT: Partial refund, funds partially released

5. Appeal (optional, one time)
   - Escalate to senior review
```

---

## 10. Repository Structure

### 10.1 Recommended: Monorepo with Turborepo

```
trading-card-marketplace/
├── apps/
│   └── web/                          # Next.js frontend + API routes
│       ├── src/
│       │   ├── app/                  # App Router pages
│       │   │   ├── (auth)/           # Auth pages (login, signup, reset)
│       │   │   ├── (marketplace)/    # Main marketplace pages
│       │   │   │   ├── page.tsx      # Homepage / browse
│       │   │   │   ├── search/       # Search results
│       │   │   │   ├── card/[id]/    # Card detail + 3D viewer
│       │   │   │   └── listing/[id]/ # Listing detail
│       │   │   ├── (dashboard)/      # Seller dashboard
│       │   │   │   ├── listings/     # Manage listings
│       │   │   │   ├── orders/       # Order management
│       │   │   │   ├── messages/     # DM inbox
│       │   │   │   └── settings/     # Profile, payment settings
│       │   │   ├── api/              # API routes (webhooks, etc.)
│       │   │   │   ├── webhooks/
│       │   │   │   │   └── stripe/   # Stripe webhook handler
│       │   │   │   └── ai/
│       │   │   │       └── identify/ # Card identification endpoint
│       │   │   └── layout.tsx
│       │   ├── components/
│       │   │   ├── ui/               # shadcn/ui components
│       │   │   ├── cards/            # Card-related components
│       │   │   ├── listings/         # Listing components
│       │   │   ├── 3d/               # React Three Fiber components
│       │   │   │   ├── TradingCard.tsx
│       │   │   │   ├── CardViewer.tsx
│       │   │   │   └── HoloEffect.tsx
│       │   │   ├── chat/             # Messaging components
│       │   │   └── layout/           # Header, sidebar, footer
│       │   ├── lib/
│       │   │   ├── supabase/
│       │   │   │   ├── client.ts     # Browser client
│       │   │   │   ├── server.ts     # Server client (cookies)
│       │   │   │   └── middleware.ts  # Auth middleware
│       │   │   ├── stripe/
│       │   │   │   ├── client.ts     # Stripe client
│       │   │   │   └── connect.ts    # Connect helpers
│       │   │   └── ai/
│       │   │       ├── vision.ts     # Google Cloud Vision
│       │   │       └── openai.ts     # OpenAI Vision
│       │   ├── hooks/                # Custom React hooks
│       │   ├── stores/               # Zustand stores
│       │   └── types/                # TypeScript types
│       ├── public/
│       │   ├── textures/             # 3D card textures, card backs
│       │   └── images/               # Static assets
│       ├── next.config.ts
│       ├── tailwind.config.ts
│       └── package.json
│
├── packages/
│   ├── supabase/                     # Supabase project config
│   │   ├── migrations/               # SQL migrations
│   │   ├── functions/                # Edge Functions
│   │   │   ├── card-sync/            # Nightly card catalog sync
│   │   │   ├── image-process/        # Image processing on upload
│   │   │   ├── stripe-webhook/       # Stripe event handler
│   │   │   └── auto-confirm/         # Auto-confirm delivered orders
│   │   ├── seed.sql                  # Seed data
│   │   └── config.toml               # Supabase project config
│   │
│   ├── shared/                       # Shared types, utils, constants
│   │   ├── types/
│   │   │   ├── database.ts           # Generated from Supabase schema
│   │   │   ├── card.ts
│   │   │   ├── listing.ts
│   │   │   └── transaction.ts
│   │   ├── constants/
│   │   │   ├── conditions.ts         # Card condition definitions
│   │   │   ├── fees.ts               # Fee calculations
│   │   │   └── games.ts              # Supported card games
│   │   └── utils/
│   │       ├── price.ts              # Price formatting, fee calc
│   │       └── validation.ts         # Shared validation schemas (Zod)
│   │
│   └── eslint-config/                # Shared ESLint config
│
├── turbo.json                        # Turborepo config
├── package.json                      # Root package.json (workspaces)
├── .env.example                      # Environment variables template
├── .github/
│   └── workflows/
│       ├── ci.yml                    # Lint, type-check, test
│       ├── preview.yml               # Deploy preview on PR
│       └── production.yml            # Deploy to production on merge
└── README.md
```

### 10.2 Why Monorepo

- **Shared types:** Database types generated from Supabase schema are used by both frontend and Edge Functions
- **Atomic changes:** Schema migration + frontend code + Edge Function logic in one PR
- **Turborepo:** Caches builds, only rebuilds what changed. Fast CI.

### 10.3 CI/CD Pipeline

```
PR opened:
  1. Turborepo: lint + type-check + test (cached)
  2. Vercel: preview deploy (automatic)
  3. Supabase: preview branch (if using Supabase branching)

Merge to main:
  1. Supabase: run migrations on production DB
  2. Supabase: deploy Edge Functions
  3. Vercel: production deploy (automatic via Git integration)
```

### 10.4 Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...       # Server-only, never expose

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...           # Server-only
STRIPE_WEBHOOK_SECRET=whsec_...         # For webhook verification

# AI Services
GOOGLE_CLOUD_VISION_API_KEY=AIza...
OPENAI_API_KEY=sk-...                   # For GPT-4o Vision

# eBay
EBAY_APP_ID=...
EBAY_CERT_ID=...

# Card APIs
POKEMON_TCG_API_KEY=...
TCGPLAYER_API_KEY=...                   # If approved

# App
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

---

## 11. MVP Scope & Phasing

### Phase 1: Core Marketplace (Weeks 1-4) -- LAUNCH MVP

**Must-Have:**
- [ ] User auth (email + Google + Discord via Supabase)
- [ ] User profiles (username, avatar, bio)
- [ ] Card catalog (MTG only, synced from Scryfall)
- [ ] Create listing (title, photos, condition, price, game)
- [ ] Browse/search listings (text search, filters: game, condition, price range)
- [ ] Listing detail page with image gallery
- [ ] Buy Now (Stripe Checkout, payment captured to platform)
- [ ] Seller onboarding (Stripe Connect Express)
- [ ] Escrow flow (payment held -> seller ships -> buyer confirms -> payout)
- [ ] Basic messaging (DM between buyer and seller on a listing)
- [ ] Order management (seller: mark shipped + tracking, buyer: confirm receipt)
- [ ] Basic responsive design (mobile-friendly)

**Technical Infrastructure:**
- [ ] Supabase project setup (DB, Auth, Storage, Realtime)
- [ ] Next.js app on Vercel
- [ ] Stripe Connect integration
- [ ] Supabase Storage for card images
- [ ] Basic RLS policies
- [ ] GitHub repo with CI/CD

### Phase 2: Enhanced Experience (Weeks 5-8)

- [ ] 3D card viewer (React Three Fiber)
- [ ] AI card identification (Google Cloud Vision + Scryfall search)
- [ ] Pokemon TCG catalog sync
- [ ] Yu-Gi-Oh! catalog sync
- [ ] Price suggestion (aggregated market data)
- [ ] Make/receive offers (price negotiation)
- [ ] Collections (user card collections, public/private)
- [ ] Wishlist / favorites
- [ ] Review/rating system (after completed transactions)
- [ ] Notification system (new messages, order updates, price drops)
- [ ] Advanced search (filters by set, rarity, color, price range, condition)

### Phase 3: Community & Growth (Weeks 9-12)

- [ ] User verification badges (trusted seller program)
- [ ] Holographic card effects (custom shaders)
- [ ] AI condition assessment (GPT-4o Vision)
- [ ] Sports card support (manual catalog entry)
- [ ] eBay price comparison integration
- [ ] Push notifications (mobile web)
- [ ] Social features (follow users, activity feed)
- [ ] Dispute resolution system (structured workflow)
- [ ] Admin dashboard (user management, listing moderation, transaction monitoring)
- [ ] Analytics (sales volume, popular cards, pricing trends)

### Phase 4: Scale & Monetize (Weeks 13+)

- [ ] Auction/bidding system (Supabase Realtime for live bids)
- [ ] PayPal integration (secondary payment method)
- [ ] Mobile app (React Native, shared types from monorepo)
- [ ] Graded card integration (PSA/BGS cert verification)
- [ ] AI background generation for 3D viewer
- [ ] Affiliate program (earn commissions on external links)
- [ ] Premium seller plans (lower fees, promoted listings)
- [ ] International shipping + currency support
- [ ] Bulk listing tools (CSV upload, barcode scanning)

### Technical Debt to Plan For

1. **Search:** Postgres full-text search is fine to start but will need Meilisearch/Typesense for fuzzy search, typo tolerance, and faceted filtering at scale.
2. **Image processing:** Supabase Storage transforms work for MVP but may need a dedicated image pipeline (Lambda/Cloud Functions) for watermarking and batch processing.
3. **Caching:** Add Redis (Upstash) for frequently accessed data (card catalog, price lookups, search results).
4. **Rate limiting:** Add rate limiting on API routes (Upstash Rate Limit or Vercel middleware).
5. **Monitoring:** Add error tracking (Sentry), analytics (PostHog or Plausible), and uptime monitoring (BetterStack).
6. **Testing:** Start with integration tests on critical paths (auth, payment, escrow flow). Unit tests for fee calculations and business logic.

---

## 12. Cost Analysis

### Monthly Costs by Stage

| Service | Free/Dev | MVP (1K users) | Growth (10K users) | Scale (100K users) |
|---|---|---|---|---|
| **Supabase** | $0 | $25 (Pro) | $25 + overages (~$50) | $599 (Team) |
| **Vercel** | $0 | $0 (Hobby) | $20 (Pro) | $20 + bandwidth |
| **Stripe** | $0 | Deducted from transactions | Deducted from transactions | Deducted from transactions |
| **Google Cloud Vision** | $0 (1K free) | $0-15 | $15-75 | $150-750 |
| **OpenAI** (Phase 2) | $0 | $0 | $10-50 | $50-500 |
| **Cloudinary** (if needed) | $0 (25 credits) | $0 | $0-89 | $89-249 |
| **Domain** | $0 | $12/yr | $12/yr | $12/yr |
| **Email** (transactional) | $0 | $0 (Supabase built-in) | $0-20 (Resend) | $20-100 |
| **TOTAL** | **$0** | **$25-40** | **$70-230** | **$930-2,200** |

### Revenue Model (Break-Even Analysis)

Assuming 3% platform fee, average sale price $25:
- Revenue per transaction: $0.75
- Stripe cost per transaction: ~$1.03 (2.9% + $0.30)
- **Net per transaction: -$0.28** (we lose money on small sales!)

To break even on Stripe fees alone at 3%:
- Need average sale price of **$15+** (3% = $0.45, vs Stripe $0.74)... still negative.
- At 5% fee + $15 avg: $0.75 - $0.74 = **$0.01 net**
- At 5% fee + $25 avg: $1.25 - $1.03 = **$0.22 net**

**Recommendation:** Start with 5% platform fee (competitive with eBay's ~13-15% total fees and TCGPlayer's ~10-15%). Consider tiered fees:
- Items under $10: 8% (or $0.99 minimum fee)
- Items $10-99: 5%
- Items $100+: 3%

At 5% average fee and $25 average sale with 1,000 transactions/month:
- Revenue: $1,250
- Stripe fees: ~$1,025
- Infrastructure: ~$40
- **Net: ~$185/month**

At 10,000 transactions/month (same assumptions):
- Revenue: $12,500
- Stripe fees: ~$10,250
- Infrastructure: ~$200
- **Net: ~$2,050/month**

---

## 13. Open Questions

1. **Legal entity:** Is there a registered business for the marketplace? Stripe Connect requires a legal entity for the platform account.

2. **Escrow regulation:** In some US states, holding funds on behalf of others requires a money transmitter license. Stripe Connect's "Separate Charges and Transfers" pattern may mitigate this (Stripe is the money handler, not us), but legal review is recommended.

3. **Card game scope for MVP:** Starting with MTG only is the fastest path. Pokemon adds significant user base. Yu-Gi-Oh! and sports cards add complexity. What is the priority order?

4. **Fee structure:** 3% is likely too low to be sustainable (see section 12). What is the target fee? TCGPlayer charges sellers ~10-15%. eBay charges ~13%. We are competitive at 5%.

5. **Shipping:** Do we provide shipping labels (via Shippo/EasyPost API), or just require sellers to enter tracking numbers? Providing labels adds cost but reduces fraud (we know exactly what was shipped).

6. **International:** US-only for MVP? International shipping and multi-currency add significant complexity.

7. **Mobile app:** Is a mobile app planned? The web app will be responsive, but a native app (React Native) would enable camera-based card scanning, push notifications, and better UX for frequent users.

8. **Content moderation:** How do we handle inappropriate listing content? Manual review? AI content moderation? Community reporting?

9. **Card grading partnership:** Is there interest in partnering with PSA, BGS, or CGC for integrated cert verification? This would be a strong trust differentiator.

10. **Competitor differentiation:** TCGPlayer, eBay, and CardMarket are established. The 3D viewer and AI identification are novel. What else differentiates this marketplace? Community features? Lower fees? Better UX? Specialized in a niche (e.g., graded cards only)?

---

## Summary

The recommended stack -- **Next.js + Supabase + Stripe Connect + React Three Fiber** -- provides the fastest path to a functional marketplace MVP. Supabase eliminates the need to build or integrate separate auth, database, realtime, and storage services. Stripe Connect handles the complex escrow payment flow with minimal custom code. React Three Fiber enables the 3D card visualization differentiator without leaving the React ecosystem.

The critical path for MVP is:
1. Set up Supabase project + schema migration
2. Build auth flow (Supabase Auth + Next.js middleware)
3. Integrate Stripe Connect (seller onboarding + checkout + escrow)
4. Build listing CRUD with image upload
5. Build browse/search with filters
6. Build messaging (Supabase Realtime Broadcast)
7. Build order management + escrow flow

Estimated time to functional MVP: **4-6 weeks** with one full-time developer. The 3D viewer and AI features can be added in weeks 5-8 without disrupting the core marketplace.
