# Trading Card Marketplace -- Competitive Analysis Report

> **Date:** March 23, 2026
> **Purpose:** Market research for new trading card marketplace with flat 3-5% fee model
> **Scope:** 12 platforms, APIs/data sources, market sizing, gap analysis, unit economics

---

## Table of Contents

1. [Market Overview](#1-market-overview)
2. [Platform-by-Platform Analysis](#2-platform-by-platform-analysis)
3. [Fee Comparison Matrix](#3-fee-comparison-matrix)
4. [Card Verification & Pricing APIs](#4-card-verification--pricing-apis)
5. [Grading Services & Marketplace Integration](#5-grading-services--marketplace-integration)
6. [Industry Trends & Demographics](#6-industry-trends--demographics)
7. [Unit Economics: Is 3-5% Viable?](#7-unit-economics-is-3-5-viable)
8. [Gap Analysis & Opportunities](#8-gap-analysis--opportunities)
9. [Sources](#9-sources)

---

## 1. Market Overview

### Total Addressable Market (TAM)

| Metric | Value | Source |
|--------|-------|--------|
| Global trading card games market (2025) | $8.4B | GM Insights |
| Projected (2035) | $16.9B | GM Insights |
| CAGR | 6.9% | GM Insights |
| Broader trading cards market (all types, 2025) | $52.1B | Intel Market Research |
| Broader projected (2032) | $90.2B | Intel Market Research |
| Sports cards share of TCG market | 69.2% (~$5.2B) | GM Insights |
| North America share of collectible card games | 46% | Straits Research |
| E-commerce share of global card sales | 48%+ | Multiple |

### Key Market Segments

- **Sports cards**: ~$5.2B (baseball, basketball, football, soccer, hockey)
- **Pokemon TCG**: ~12% market share in 2026; average card value increasing ~46% YoY
- **Magic: The Gathering**: $1.3B+ revenue across physical + digital (2024 record year)
- **Yu-Gi-Oh!, One Piece, Lorcana, Digimon**: Growing secondary segments
- **Graded/slabbed cards**: High-value segment, PSA alone processes millions annually

### Online Secondary Market Estimate

The online secondary market for trading cards (resale, peer-to-peer, auction) is estimated at **$5-8B annually** in North America alone, based on:
- eBay trading cards GMV estimated at $3-4B+
- TCGPlayer GMV estimated at $1-2B+ (acquired by eBay for $295M in 2022)
- Whatnot, Goldin, COMC, and others collectively $1-2B+

---

## 2. Platform-by-Platform Analysis

### 2.1 TCGPlayer (tcgplayer.com)

**Owner:** eBay (acquired October 2022 for ~$295M)

**Fee Structure:**
| Fee Type | Amount |
|----------|--------|
| Marketplace commission (Level 1-4) | 10.75% (increased Feb 2026 from 10.25%) |
| Pro/Sync seller commission | 9.25% + 2.5% Pro fee on shipped orders |
| Payment processing (domestic) | 2.5% + $0.30 |
| Payment processing (international) | 3.5% + $0.30 |
| Commission cap per item | $50 |
| Direct/SYP minimum price | $0.40 |

**Effective total seller cost:** ~13.25% on domestic orders (commission + processing)

**Key Features:**
- Largest dedicated TCG marketplace (Pokemon, MTG, Yu-Gi-Oh!, Lorcana, One Piece, etc.)
- TCGPlayer Direct: consignment/fulfillment service (ship to TCGPlayer warehouse)
- Store Your Products (SYP): TCGPlayer stores and ships on seller's behalf
- Price optimization tools, market price tracking
- Cart optimizer automatically selects lowest-cost combination across sellers
- Seller levels (1-4) gate shipping rate control and listing volume
- Pro accounts with additional tools and lower rates
- Mobile app for buyers and sellers

**Target Market:** TCG-focused (not sports cards). Primarily MTG, Pokemon, Yu-Gi-Oh!. Mix of LGS (local game stores), semi-pro sellers, and casual sellers.

**Trust/Safety:**
- Buyer-favored dispute resolution (sellers frequently complain about this)
- TCGPlayer Direct provides quality verification on consigned items
- Seller rating system with levels

**Community Features:**
- Seller blog with market insights and bestseller data
- No built-in messaging/forums (transactions are relatively anonymous)
- Active community exists on Reddit, Discord externally

**Technology:**
- Web app + mobile app (iOS/Android)
- API available for pricing data (requires application/approval)
- Cart optimizer is a strong differentiator

**Pain Points (from Trustpilot, BBB, Reddit, forums):**
- Customer service nearly impossible to reach; chatbot-driven, emails go unanswered for months
- Seller protection is weak -- platform sides with buyers "100% of the time"
- Seller account terminations with little explanation or recourse
- Website/search functionality unreliable (zero results bugs)
- Fee increases (10.25% to 10.75% in Feb 2026) frustrating sellers
- Seller level system restricts new sellers from controlling shipping costs
- Card condition disputes are common (Near Mint vs Lightly Played)

**Volume/Market Share:** Largest dedicated TCG marketplace. 600+ employees. Millions of buyers, tens of thousands of sellers. Estimated $1-2B+ annual GMV.

---

### 2.2 eBay (Trading Cards Category)

**Fee Structure:**
| Fee Type | Amount |
|----------|--------|
| Final Value Fee (trading cards, non-store) | 13.25% up to $7,500 per item |
| Final Value Fee (above $7,500) | 2.35% |
| Final Value Fee (Basic+ store) | 12.35% up to $2,500 |
| Per-order fee | $0.30 (items $10 or less) / $0.40 (items over $10) |
| Promoted listings (optional) | Variable (1-20%+ additional) |
| High-value promo ($1,000+ cards) | 50% off FVF (limited time) |
| Store subscription | $4.95-$299.95/mo depending on tier |

**Effective total seller cost:** ~13.25-14% for most trading card sales

**Key Features:**
- Largest general marketplace with massive trading card category
- Authentication Guarantee for ungraded cards $750+
- PSA Grading Integration (2025): buyers can send raw cards ($250+) directly to PSA at checkout
- PSA Vault Direct Shipping: graded cards ship straight to PSA Vault
- eBay Standard Envelope: ~$1 shipping for individual cards with tracking
- Global reach with international buyer base
- Auction and fixed-price formats
- Best Offer negotiation
- Promoted Listings for visibility

**Target Market:** All card types -- sports, TCG, non-sports. Full spectrum from casual to professional. Largest reach for sports cards specifically.

**Trust/Safety:**
- eBay Money Back Guarantee (strongly buyer-favored)
- Authentication for high-value items
- Seller performance standards with consequences
- PayPal/Managed Payments dispute resolution

**Community Features:**
- Seller forums, community boards
- eBay for Charity integration
- Watch lists, saved searches

**Technology:**
- Full-featured web and mobile apps
- Robust API ecosystem
- AI-powered listing suggestions
- Image search capabilities

**Pain Points:**
- Fees feel punitive on low-value cards (a $0.99 card with $0.69 shipping can net a loss)
- 13.25% FVF is the highest category rate on eBay
- Buyer-favored returns policy leads to scams (INAD claims on cards)
- Promoted Listings creating pay-to-play dynamic
- Counterfeit card listings are common
- Condition grading disputes between buyers and sellers
- Fee structure opaque with multiple layered charges

**Volume/Market Share:** Dominant overall marketplace. Trading cards is one of eBay's focus verticals. Estimated $3-4B+ in annual trading card GMV. eBay's total GMV is ~$73B (2024).

---

### 2.3 COMC (Check Out My Cards - comc.com)

**Fee Structure:**
| Fee Type | Amount |
|----------|--------|
| Fixed-price commission | 5% flat |
| Cash-out fee | 10% of balance withdrawn |
| Store Credit eBay Auctions | 4% (min $0.99) |
| Direct-to-Cash Auctions | 5-8% (92-95% payout) + $5 listing fee if under $1,000 |
| Live Auctions | 5% (min $2) |
| Elite ingestion (2-week turnaround) | $2.00 (raw), $2.50 (graded), $5.00 (odd-sized) |
| Standard ingestion | Lower fee, longer turnaround |

**Effective total seller cost:** 5% commission + 10% cash-out = **~14.5% effective rate** when cashing out. If reinvesting as store credit, 5% only.

**Key Features:**
- Consignment model: ship cards to COMC, they photograph, list, store, and ship
- Professional photography and cataloging
- Massive inventory (millions of cards in warehouse)
- eBay integration (list on both COMC and eBay simultaneously)
- Auction services (weekly auctions, direct-to-cash, store credit)
- Port system for combining multiple purchases into one shipment

**Target Market:** Sports cards primarily. Collectors who want hands-off selling. High-volume sellers with bulk inventory. Vintage card specialists.

**Trust/Safety:**
- All cards physically held and verified by COMC
- Professional photography eliminates condition disputes
- Escrow-like model (COMC holds inventory)

**Community Features:**
- Blog with market insights
- Limited community features

**Technology:**
- Web-based platform
- No standalone mobile app
- Aging interface (common complaint)

**Pain Points:**
- 10% cash-out fee is a hidden cost that makes effective fees much higher
- Slow ingestion times (can be weeks to months for standard)
- Difficult to get cards back once consigned
- Website feels outdated compared to competitors
- Limited to sports cards primarily
- Slow customer service response times

**Volume/Market Share:** Niche but established. Estimated tens of millions in annual GMV. Strong in the sports card consignment niche.

---

### 2.4 Whatnot (whatnot.com)

**Fee Structure:**
| Fee Type | Amount |
|----------|--------|
| Seller commission | 8% of item selling price |
| Payment processing | 2.9% + $0.30 per transaction |
| Coins & Money category | 4% commission |
| Electronics category | 5% commission |
| Listing/storage fees | $0 |

**Effective total seller cost:** ~11-12%

**Key Features:**
- Live streaming auction platform (primary differentiator)
- "Dollar starts" -- auctions beginning at $1 to drive engagement
- Giveaways and breaks during streams
- Real-time bidding with social interaction
- BIN (Buy It Now) listings alongside live shows
- Shipping labels provided
- Multi-category (cards, sneakers, vintage, collectibles)

**Target Market:** Entertainment-driven collectors. Younger demographic (Gen Z, Millennials). Sports cards, Pokemon, vintage toys, sneakers. Sellers who are comfortable on camera.

**Trust/Safety:**
- Seller protection policy (updated March 2026 -- sellers now responsible for late shipment refunds)
- Buyer protection on purchases
- Authentication for select categories
- Regulated mystery packs (Nov 2025 policy)

**Community Features:**
- Live chat during streams (core feature)
- Follow sellers, notifications for upcoming streams
- Strong social/community dynamic
- Creator-economy model for sellers

**Technology:**
- Mobile-first (iOS/Android apps)
- Web app available
- Live streaming infrastructure
- Push notifications for favorite sellers

**Pain Points:**
- Orders received incorrectly or damaged
- Seller accounts banned with payouts ($4,500+) withheld
- Slow refund processing (months reported)
- Third-party mystery pack regulation causing confusion
- Customer support hard to reach for buyers
- "Dollar start" auctions can lead to items selling far below value
- Platform encourages impulse buying (not always best prices)

**Volume/Market Share:** Raised $260M+ in funding. Valued at $3.7B (2022). Growing rapidly. Live commerce format is unique differentiator. Estimated hundreds of millions in annual GMV across all categories.

---

### 2.5 Goldin (goldin.co)

**Fee Structure:**
| Fee Type | Amount |
|----------|--------|
| Buyer's premium (check/wire within 10 days) | 20% |
| Buyer's premium (credit card / late payment) | 23% |
| Buyer's premium (crypto) | 20% + 0.5% |
| Seller commission (traditional auctions) | 5-15% (negotiable based on item value) |
| Marketplace/Weekly Auctions (under $2,500) | 16.7% seller fee |
| Marketplace/Weekly Auctions (over $2,500) | Lower seller fee (tiered) |
| Buyer fee on marketplace | $0 |

**Effective total cost (buyer + seller combined):** 25-38% on traditional auctions

**Key Features:**
- Premier high-end collectibles auction house
- Weekly auctions and flagship events
- PSA Vault integration (direct from PSA to Goldin listing)
- Expert authentication and grading verification
- Curated, high-quality lots
- White-glove service for consignors
- Recently launched lower-cost marketplace alongside premium auctions

**Target Market:** High-end collectors and investors. Cards $500+. Trophy cards and vintage. Sports cards primarily but expanding to Pokemon/TCG.

**Trust/Safety:**
- Full authentication and verification
- Established auction house reputation (founded by Ken Goldin)
- Insurance on high-value items
- Escrow on all transactions

**Community Features:**
- Live auction events with commentary
- Social media presence (YouTube, Instagram)
- "Goldin 100" rankings of top cards

**Technology:**
- Web platform
- Mobile app
- Live streaming for auction events
- PSA Vault digital integration

**Pain Points:**
- 20% buyer's premium is steep
- Seller fees opaque and negotiated (favors high-value consignors)
- Not accessible for mid-range or lower-value cards
- Buyer's premium discourages competitive bidding
- Limited to auction format (no fixed-price for most items)

**Volume/Market Share:** Market leader in high-end card auctions. Set multiple world records for card sales (e.g., 1952 Topps Mickey Mantle for $12.6M). Owned by Collectors Holdings (also owns PSA). Estimated $500M-$1B+ in annual auction volume.

---

### 2.6 StockX (stockx.com - Cards Section)

**Fee Structure:**
| Fee Type | Amount |
|----------|--------|
| Transaction fee (varies by seller level) | 8-10% |
| Payment processing | 3% |
| Shipping fee (US, non-Flex) | $5 (increased from $4, March 2026) |
| Flex fulfillment fee | Removed March 2026, replaced by 2% Flex fee increase |

**Effective total seller cost:** ~11-15% depending on level and fulfillment method

**Key Features:**
- "Stock market for things" -- bid/ask pricing model
- Authentication on every transaction (items ship to StockX for verification)
- Price history charts and market data
- Anonymous buyer-seller model
- Seller levels with performance-based fee reductions

**Target Market:** Primarily sneakers/streetwear audience cross-selling into cards. Younger demographic. Graded cards focused. Sports and Pokemon.

**Trust/Safety:**
- Every item authenticated before delivery
- No direct buyer-seller interaction (anonymous)
- StockX acts as middleman on every transaction

**Community Features:**
- Market data and price charts
- News/editorial content
- Limited direct community features

**Technology:**
- Mobile app (iOS/Android) + web
- Real-time bid/ask pricing
- Price alerts and portfolio tracking

**Pain Points:**
- Card selection is limited compared to eBay/TCGPlayer
- Bid/ask model doesn't work well for unique/one-of-one cards
- Authentication errors reported (sneakers primarily, but extends to cards)
- Fee structure changes frequently (March 2026 updates)
- Not a primary destination for card collectors

**Volume/Market Share:** StockX is valued at $3.8B. Trading cards are a small segment of overall business (sneakers dominate). Card volume is modest compared to dedicated platforms.

---

### 2.7 Alt (alt.xyz)

**Fee Structure:**
| Fee Type | Amount |
|----------|--------|
| Fixed Price Exchange -- buyer fee | $0 |
| Fixed Price Exchange -- seller fee (Base tier) | 7% |
| Fixed Price Exchange -- seller fee (Black tier) | 4% |
| Auction buyer's premium | 20% |
| Vaulting (supported graded cards) | Free |
| Vaulting (unsupported/ungraded) | $5 per card |
| Storage fees | $0 (ongoing) |
| Insurance on vaulted cards | Included |
| Subscription (full price history data) | $15/month |

**Key Features:**
- Alternative asset investment platform for trading cards
- Vaulting with digitization, storage, and insurance included
- Instant pricing algorithm
- Portfolio tracking and analytics
- Liquid weekly auctions
- $0 sales tax
- Focus on treating cards as investable assets
- Plans to expand to watches, sneakers, and other alternative assets

**Target Market:** Card investors and high-value collectors. Sports cards primarily, expanding to Pokemon/Yu-Gi-Oh!. Users who view cards as financial assets.

**Trust/Safety:**
- Physical vaulting with insurance
- Professional authentication
- Digital verification/digitization

**Community Features:**
- Market data and analytics
- Portfolio tools
- Limited social features

**Technology:**
- Web + mobile app
- AI-powered pricing
- Digital card imaging/digitization

**Pain Points:**
- 20% buyer's premium on auctions is high
- Limited selection compared to eBay/TCGPlayer
- Platform is still growing -- lower liquidity
- Subscription required for full data access
- Primarily sports cards (limited TCG coverage)

**Volume/Market Share:** Raised $306M total funding. Growing but still small relative to eBay/TCGPlayer. Focused on high-value graded card niche.

---

### 2.8 MySlabs (myslabs.com)

**Fee Structure:**
| Fee Type | Amount |
|----------|--------|
| Seller fee (slabbed/graded items) | 2% |
| Seller fee (raw items) | 3% |
| Payment processing (Stripe/PayPal) | ~2.9% + $0.30 (separate from MySlabs fee) |

**Effective total seller cost:** ~5-6% (MySlabs fee + payment processing)

**Key Features:**
- Graded card marketplace focused on slabbed items
- PSA verification built into listings
- "Compare on eBay" price reference links
- Filter by sport, grader, or price
- Pre-screened sellers with one-strike policy for non-payment/late shipping
- Lowest fees in the dedicated marketplace space

**Target Market:** Graded/slabbed card sellers and buyers. Sports cards primarily. Price-conscious sellers seeking lower fees than eBay.

**Trust/Safety:**
- PSA cert verification on listings
- Pre-screened sellers
- Strict enforcement (one-strike policy)
- Stripe/PayPal buyer protection

**Community Features:**
- Minimal community features
- No forums or messaging

**Technology:**
- Web-based platform
- No standalone mobile app (mobile-responsive web)
- Basic search and filter

**Pain Points:**
- Small user base = lower liquidity and slower sales
- Limited to graded cards (no raw singles marketplace depth)
- Basic interface compared to TCGPlayer/eBay
- No mobile app
- Limited card categories (sports-focused)
- Payment processing fees are separate and add to total cost

**Volume/Market Share:** Small but notable for ultra-low fees. Card Ladder now tracks MySlabs sales, indicating growing relevance. Modest GMV relative to major platforms.

---

### 2.9 Card Ladder (cardladder.com)

**Type:** Analytics/pricing platform (not a marketplace)

**Pricing:**
| Plan | Cost |
|------|------|
| Free | Limited access |
| Pro Monthly | $20/month (increased from $15, Feb 2025) |
| Pro Annual | $200/year (~$16.67/mo, 2 months free) |
| Free trial | 7 days |

**Key Features:**
- Price tracking and analytics for 100M+ historical sales
- Data from 14+ platforms (eBay, Goldin, Heritage, MySlabs, etc.)
- Player/card indexes tracking aggregate daily value movements
- Collection portfolio tracking and valuation
- Market Efficiency Score for price stability analysis
- AI-powered pricing predictions
- Card population data
- Research team that manually vets sales data

**Target Market:** Serious collectors, investors, dealers who need pricing intelligence. Sports cards primary focus but expanding.

**Technology:**
- Web app + mobile app (iOS/Android)
- API access (limited/enterprise)

**Relevance to New Marketplace:** Card Ladder represents the pricing intelligence layer. A new marketplace could either integrate with Card Ladder data, build competing analytics, or partner. Card Ladder tracking your marketplace's sales would be a legitimacy signal.

---

### 2.10 Mercari (Trading Cards Section)

**Fee Structure:**
| Fee Type | Amount |
|----------|--------|
| Seller fee | 10% flat (item price + buyer-paid shipping) |
| Buyer protection fee (paid by buyer) | 3.6% |
| Withdrawal fee (standard) | $2.00 |
| Withdrawal fee (Instant Pay) | $3.00 |
| Listing fee | $0 |

**Effective total seller cost:** 10%

**Key Features:**
- General marketplace with dedicated trading card category
- Prepaid USPS First-Class Envelope labels (exclusive to trading cards)
- Simple listing flow (photo, describe, price, ship)
- Offer/negotiation system
- Smart pricing suggestions

**Target Market:** Casual sellers and buyers. General audience. Mix of sports and TCG cards. Younger, mobile-first demographic.

**Trust/Safety:**
- Mercari buyer protection (3.6% fee)
- Rating system for buyers and sellers
- In-app messaging
- Dispute resolution through Mercari

**Community Features:**
- In-app messaging between buyers and sellers
- Likes/follows on items
- Limited community beyond transactions

**Technology:**
- Strong mobile app (iOS/Android)
- Web app
- AI-powered pricing suggestions
- Photo-based listing

**Pain Points:**
- 10% flat fee is competitive but not the lowest
- Previously tried 0% seller fees (2024) but reversed due to buyer-side fee backlash killing volume
- Not card-specific -- less specialized search/filter than TCGPlayer
- Lowball offers are rampant
- Shipping issues and slow delivery
- Returns/disputes can be frustrating

**Volume/Market Share:** Mercari US has tens of millions of users. Trading cards are a growing but not primary category. Overall GMV in the billions. Card-specific volume is modest relative to TCGPlayer/eBay.

---

### 2.11 Facebook Marketplace / Facebook Groups

**Fee Structure:**
| Fee Type | Amount |
|----------|--------|
| Facebook Marketplace listing fee | $0 |
| Facebook Marketplace selling fee | 0% (local pickup) or ~5% (shipped) |
| Facebook Groups (P2P) | $0 (peer-to-peer, typically PayPal/Venmo) |
| PayPal G&S (common in groups) | 2.99% + $0.49 |
| PayPal Friends & Family | $0 (no buyer protection) |

**Key Features:**
- Zero or near-zero fees for local transactions
- Massive built-in audience (billions of Facebook users)
- Specialized groups for every card niche (e.g., "Sports Cards Non-Sense" with 100K+ members)
- Real-time posting and engagement
- Photo/video support
- Local meetup facilitation

**Target Market:** All levels. Local selling, group-specific niches. Heavy in sports cards. Community-driven transactions.

**Trust/Safety:**
- **Extremely weak.** Facebook Marketplace has become a "digital wasteland" for fraud (73% of marketplace fraud happens on Facebook per some reports)
- No built-in escrow or payment protection on local sales
- Group admins provide moderation but no financial protection
- PayPal F&F common but offers zero buyer protection
- Profile trust is shallow -- scammers prevalent
- Conversations pushed to WhatsApp/SMS (unmoderated)

**Community Features:**
- Groups are the strongest community feature in all of trading cards
- Live discussions, price checks, show-and-tell
- Real-time market sentiment
- Direct messaging
- Group-specific rules and culture

**Technology:**
- Facebook app (iOS/Android) + web
- Facebook Live for card shows/breaks
- Album-based listing in groups
- No card-specific tools (search, pricing, grading verification)

**Pain Points:**
- Rampant scams and fraud
- No buyer protection on most transactions
- PayPal F&F payments are risky
- No card-specific search, filtering, or price guides
- Disputes resolved informally (banned from group at best)
- Card condition misrepresentation is common
- No authentication or verification

**Volume/Market Share:** Impossible to quantify precisely. Facebook Groups collectively represent a massive volume of P2P card transactions -- potentially billions annually. But high fraud rate and lack of infrastructure make it more of a "dark market" for cards.

---

### 2.12 Newer Entrants

#### CardNexus (2025, Bordeaux France)
- First platform designed from the ground up for multi-game collectors
- ML-powered card scanner mobile app
- Portfolio dashboard with value tracking
- Scan-to-list workflow (scan card, add to portfolio, list on marketplace)
- Founded by former WeMaintain team ($50M+ raised at that company)
- Early stage -- small user base

#### CardTrader (cardtrader.com)
- European-focused TCG marketplace (MTG, Pokemon, Yu-Gi-Oh!)
- Seller fees: 5-7% (7% on CardTrader Zero consolidated shipping)
- CardTrader Zero: consolidates shipments from multiple sellers
- Guaranteed rates for active sellers through Dec 2026
- Free wire transfer withdrawals
- Strong in EU/international market

#### Card Synced (cardsynced.com)
- Positions as "0% seller fees" alternative to TCGPlayer
- CSV import from TCGPlayer inventory (easy switching)
- Newer platform, growing
- Revenue model unclear at 0% fees (likely VC-subsidized or planning future monetization)

#### Beckett Marketplace (marketplace.beckett.com)
- Leverages 35+ years of Beckett brand trust
- Integrated with Beckett grading and pricing
- Web-based marketplace
- Smaller volume than TCGPlayer/eBay

#### OpenThatPack
- Virtual trading card marketplace
- Aims to eliminate scalping and high markups
- Buy sealed packs virtually, open them on platform
- Niche concept

#### Mantel (onmantel.com)
- Collection management and social platform
- Not a full marketplace but adjacent

---

## 3. Fee Comparison Matrix

| Platform | Seller Commission | Payment Processing | Buyer Fees | Effective Total Seller Cost | Effective Total (Buyer + Seller) |
|----------|-------------------|-------------------|------------|---------------------------|--------------------------------|
| **TCGPlayer** | 10.75% | 2.5% + $0.30 | $0 | ~13.25% | ~13.25% |
| **eBay** | 13.25% | Included in FVF | $0.30-0.40/order | ~13.55% | ~13.55% |
| **COMC** | 5% + 10% cash-out | Included | $0 | ~14.5% (cash-out) or 5% (credit) | ~14.5% |
| **Whatnot** | 8% | 2.9% + $0.30 | $0 | ~11.2% | ~11.2% |
| **Goldin (auction)** | 5-15% | Included | 20-23% buyer premium | ~10% avg seller | ~30-38% combined |
| **Goldin (marketplace)** | 16.7% (under $2,500) | Included | $0 | ~16.7% | ~16.7% |
| **StockX** | 8-10% | 3% | $0 | ~11-13% | ~11-13% |
| **Alt (fixed)** | 4-7% | Included | $0 | ~4-7% | ~4-7% |
| **Alt (auction)** | Varies | Included | 20% buyer premium | Varies | ~20%+ |
| **MySlabs** | 2-3% | ~2.9% + $0.30 (Stripe) | $0 | ~5-6% | ~5-6% |
| **Mercari** | 10% | $0 (shifted to buyer) | 3.6% buyer protection | ~10% | ~13.6% |
| **CardTrader** | 5-7% | Varies | $0 | ~5-7% | ~5-7% |
| **Card Synced** | 0% | TBD | TBD | ~0% (subsidized?) | TBD |
| **Facebook** | 0-5% | PayPal/Venmo varies | $0 | ~0-3% | ~0-3% |
| **YOUR PLATFORM (proposed)** | **3-5%** | **TBD** | **TBD** | **~6-8%** | **~6-8%** |

**Key Insight:** The industry standard effective seller cost is **11-14%**. Your proposed 3-5% commission would be **60-75% cheaper** than TCGPlayer/eBay. Only MySlabs (2-3% + processing), Alt Black tier (4%), and Card Synced (0%) are in a similar range.

---

## 4. Card Verification & Pricing APIs

### Grading Company APIs

| Company | API Available? | Details |
|---------|---------------|---------|
| **PSA** | Yes (Public API) | REST API with OAuth 2.0 auth. Cert lookup, images, details by cert number. JSON/XML responses. Official documentation at psacard.com/publicapi |
| **BGS/Beckett** | Limited | No well-documented public API. Cert verification via website. Some data accessible through Beckett Online Price Guide subscription |
| **CGC** | Limited | Cert verification via website lookup. No public developer API documented |
| **SGC** | Limited | Cert/code lookup on gosgc.com. No public developer API |

### Pricing APIs

| API | Coverage | Pricing | Update Frequency |
|-----|----------|---------|-----------------|
| **Scryfall** | MTG only | Free (rate-limited) | Once daily |
| **TCGPlayer API** | All TCGs | Requires application/approval | Real-time |
| **Pokemon TCG API (pokemon-api.com)** | Pokemon + Lorcana + Star Wars | Freemium | Multiple times/day |
| **PokemonPriceTracker** | Pokemon | Free: 100 credits/day, API: $9.99/mo (20K/day), Business: $99/mo (200K/day) | Real-time (TCGPlayer + eBay + CardMarket) |
| **PokeWallet** | Pokemon | Generous free tier | Real-time |
| **JustTCG** | Multi-TCG (MTG, Pokemon, Yu-Gi-Oh!, Lorcana, One Piece, Digimon) | Freemium | Real-time |
| **CardMarket API** | EU pricing (all TCGs) | Requires partnership | Real-time |
| **Sports Card API (Zyla)** | Sports + Pokemon + Marvel | Paid | Varies |
| **Card Ladder** | Sports cards (100M+ sales) | $20/mo Pro subscription | Daily |
| **PriceCharting** | Multi-category | Free website, API requires partnership | Regular updates |

### Data Scraping (Apify Actors)

| Actor | Platform | Data Available |
|-------|----------|---------------|
| **parseforge/tcgplayer-scraper** | TCGPlayer | Products, prices, seller listings |
| **devcake/tcgplayer-data-scraper** | TCGPlayer | Product data |
| **scraped/tcgplayer-pokemon-scraper** | TCGPlayer (Pokemon) | Pokemon-specific data, MCP server available |
| **scraped/tcgplayer-sales-history** | TCGPlayer | Historical sales data |
| **apage/tcgplayer-products-listings-sales-scraper** | TCGPlayer | Products, listings, sales history (28 data fields per listing) |
| **ecomscrape/cardmarket-card-page-details-scraper** | CardMarket | EU card details |
| **ecomscrape/cardmarket-trend-scraper** | CardMarket | EU pricing trends |
| **ecomscrape/scryfall-card-details-scraper** | Scryfall | MTG card details |
| **ecomscrape/scryfall-card-search-scraper** | Scryfall | MTG card search |
| **ecomscrape/pricecharting-product-details-page-scraper** | PriceCharting | Multi-platform pricing |

### AI Grading APIs

| Service | Description |
|---------|-------------|
| **Ximilar** | Public API for AI card grading -- evaluates grade, centering, and condition. Pre-grading alternative. |
| **CardGrader.ai** | AI-powered card grading tool (2026 guide available) |

---

## 5. Grading Services & Marketplace Integration

### Current Integration Landscape

| Grading Company | eBay | TCGPlayer | Goldin | Alt | MySlabs | COMC |
|-----------------|------|-----------|--------|-----|---------|------|
| **PSA** | Deep (grading at checkout, vault, auth) | Cert lookup | PSA Vault to auction | Vaulting | Cert verification | Basic |
| **BGS/Beckett** | Auth for $750+ | Basic | Accepted | Vaulting | Supported | Basic |
| **CGC** | Auth for $750+ | Basic | Accepted | Vaulting | Supported | Limited |
| **SGC** | Auth for $750+ | Basic | Accepted | Vaulting | Supported | Limited |

### Key Observations

1. **PSA dominates integrations** -- deepest eBay partnership, Goldin ownership (both under Collectors Holdings), Alt vaulting support
2. **No platform offers unified multi-grader verification** -- each integration is siloed
3. **AI pre-grading is emerging** but not yet integrated into any major marketplace
4. **Grading submission from marketplace** is only available on eBay (PSA at checkout) -- massive gap
5. **Cross-platform grade verification** (scan a slab, verify across all grading companies) doesn't exist as a unified feature

### Opportunity: Universal Grading Integration
A new marketplace could differentiate by:
- Auto-verifying PSA, BGS, CGC, and SGC certs on listing
- AI pre-grading for raw cards before listing
- Direct submission to any grading company from the platform
- Population report data integrated into listing (how rare is this grade?)
- Slab scanner (phone camera reads cert number, auto-populates listing)

---

## 6. Industry Trends & Demographics

### Growth Drivers
- **Market CAGR of 6.9-7.3%** through 2031-2035
- **E-commerce now 48%+ of sales** and growing
- **Shopify TCG stores grew 213% YoY** in Q3 2025
- **Gen Z/Millennial dominance**: 65% of collectors are aged 18-35
- **Youth participation rising**: 32% of ages 12-24 collect cards (up from 21%)
- **48% of ages 18-35** play TCGs regularly
- **Pokemon cards appreciating ~46% annually** (outpacing Nvidia stock in 2025)
- **MTG hit $1.3B revenue** in 2024 (record year)

### Demographic Profile
| Segment | Share | Characteristics |
|---------|-------|----------------|
| Gen Z (18-25) | ~30% | Mobile-first, social/community-driven, Pokemon/modern sports |
| Millennials (26-40) | ~35% | Nostalgia-driven, investment-minded, all categories |
| Gen X (41-55) | ~20% | Vintage sports cards, established collections, higher ATV |
| Boomers (56+) | ~15% | Vintage sports, auction houses, highest ATV |

### Technology Trends
- **AR integration** emerging in card experiences
- **Blockchain-backed ownership** explored but not mainstream
- **AI grading/scanning** becoming viable for pre-grading
- **Live commerce** (Whatnot model) growing rapidly
- **Mobile-first** becoming table stakes
- **Social/community** increasingly important for Gen Z engagement

### Market Risks
- Potential bubble in certain segments (vintage sports, modern Pokemon)
- Grading company backlogs affecting market liquidity
- Counterfeit cards becoming more sophisticated
- Digital TCGs (MTG Arena, Pokemon TCG Live) competing for engagement time
- Economic downturn could reduce discretionary collectible spending

---

## 7. Unit Economics: Is 3-5% Viable?

### The Core Math Problem

**Payment processing is the floor cost.** Before your marketplace makes a single dollar of revenue:

| Cost Component | Amount |
|----------------|--------|
| Stripe Connect processing | 2.9% + $0.30 per transaction |
| Stripe Connect payout fee | 0.25% (capped at $25) |
| International cards additional | +1% |
| Fraud/chargeback reserve | ~0.1-0.5% |
| **Total payment cost floor** | **~3.15-3.45% + $0.30** |

### Margin Analysis at Different Fee Levels

Assuming **3% commission** on a $20 card sale:

| Item | Amount |
|------|--------|
| Sale price | $20.00 |
| Your commission (3%) | $0.60 |
| Stripe processing (2.9% + $0.30) | -$0.88 |
| Stripe payout (0.25%) | -$0.05 |
| **Net revenue per transaction** | **-$0.33** |

At 3% commission, **you lose money on every transaction under ~$35.**

Assuming **5% commission** on a $20 card sale:

| Item | Amount |
|------|--------|
| Sale price | $20.00 |
| Your commission (5%) | $1.00 |
| Stripe processing (2.9% + $0.30) | -$0.88 |
| Stripe payout (0.25%) | -$0.05 |
| **Net revenue per transaction** | **$0.07** |

At 5% commission, you make **$0.07 per $20 sale** -- a **0.35% net margin** on GMV.

### Break-Even Volume Analysis

Assuming $500K/year in fixed costs (engineering, hosting, support, marketing):

| Commission Rate | Net Margin on GMV | Annual GMV Needed to Break Even |
|-----------------|-------------------|-------------------------------|
| 3% | Negative on most sales | Not viable without subsidies |
| 5% | ~0.35% on $20 ATV | ~$143M |
| 5% | ~1.0% on $50 ATV | ~$50M |
| 5% | ~1.5% on $100 ATV | ~$33M |
| 8% (industry norm) | ~3.5% on $20 ATV | ~$14M |

### How Others Handle This

| Platform | Strategy |
|----------|----------|
| **MySlabs (2-3%)** | Passes payment processing to seller separately. 2% is MySlabs fee only. Total seller cost is ~5-6%. |
| **Card Synced (0%)** | VC-subsidized growth play. Not sustainable long-term without monetization pivot. |
| **Alt (4-7%)** | Vaulting services, subscription ($15/mo), auction buyer premiums (20%) create diversified revenue |
| **CardTrader (5-7%)** | EU-focused (lower processing costs in SEPA). Consolidated shipping service generates additional revenue. |

### Viability Assessment

**A flat 3% fee is NOT viable** as a standalone revenue model unless:
1. Payment processing fees are passed to buyers/sellers separately (making effective cost 6-7%)
2. Average transaction value is very high ($100+)
3. Volume is enormous ($100M+ GMV)
4. Other revenue streams exist

**A flat 5% fee is marginally viable** IF:
1. Average transaction value is $50+ (net ~$0.50/transaction)
2. Annual GMV exceeds $50-100M
3. Operating costs are kept extremely lean
4. Additional revenue streams supplement commission income

### Recommended Fee Model Options

**Option A: Transparent Split (Recommended)**
- 5% seller commission + buyer pays payment processing (2.9% + $0.30)
- Effective seller cost: 5% (feels cheap vs 13% at eBay)
- Effective buyer cost: ~3.2% (comparable to Mercari's buyer protection fee)
- Your net margin: ~1.8% of GMV
- Break-even at ~$28M annual GMV (with lean ops)

**Option B: Flat 5% All-In**
- 5% commission, you absorb processing
- Net margin: ~0.35% on $20 ATV, ~1.5% on $100 ATV
- Requires $50-143M GMV to break even
- Very difficult without massive VC funding

**Option C: Tiered + Value-Add**
- 5% base commission
- Premium features: analytics ($10-20/mo), promoted listings (2-5%), grading submission service (fee per card), insurance/authentication ($2-5/card)
- This is how Alt and others survive at lower take rates

---

## 8. Gap Analysis & Opportunities

### What's Missing Across ALL Platforms

| Gap | Description | Platforms Lacking |
|-----|-------------|-------------------|
| **Universal grading verification** | One-scan verification across PSA, BGS, CGC, SGC with population data | All except partial on MySlabs (PSA only) |
| **AI pre-grading at listing** | Snap a photo, get an estimated grade before sending to grading company | None offer natively |
| **Cross-platform price comparison** | Show what the same card sells for on eBay, TCGPlayer, COMC simultaneously | Card Ladder does this (analytics only), not in listing flow |
| **True peer-to-peer with escrow** | Facebook Groups trust + professional escrow protection | All platforms are either full marketplace or no protection |
| **Multi-game + sports unified search** | One platform that handles MTG, Pokemon, Yu-Gi-Oh! AND sports cards well | TCGPlayer = TCG only, eBay = sports-heavy, no one does both well |
| **Collection management + marketplace** | Scan/catalog collection AND list for sale in one flow | CardNexus attempting this. Others have separate tools. |
| **Transparent fee calculator at listing** | Show exact net payout before listing (fees, shipping, processing all calculated) | Most hide true costs until after sale |
| **Seller-friendly dispute resolution** | Balanced approach (not buyer-always-wins) | Universal complaint across eBay, TCGPlayer |
| **Instant payout** | Same-day payment after sale confirmation | Most hold funds 3-14 days |
| **Trade/swap functionality** | Built-in card-for-card trading with fair value calculation | No major platform offers this |
| **Bulk listing tools** | Scan a binder page, auto-identify and list 9 cards at once | Limited/no AI-powered bulk listing |
| **Condition standardization** | Objective condition grading for raw cards (AI-assisted) | Condition is subjective and inconsistent across platforms |

### Where Users Are Most Frustrated

1. **Fees are too high** (eBay 13.25%, TCGPlayer 10.75% + processing = 13.25%)
2. **Customer service is non-existent** (TCGPlayer especially)
3. **Buyer-favored disputes** (eBay and TCGPlayer both heavily favor buyers)
4. **Fraud on Facebook/P2P** (no protection on the cheapest option)
5. **Condition disputes** (NM vs LP is subjective, causes most disputes)
6. **No unified platform** for sports + TCG cards
7. **Shipping costs eat margins** on low-value cards ($1-5 range)
8. **Slow payouts** (COMC cash-out, Whatnot withholding, general hold periods)
9. **Platform lock-in** (inventory stuck on one platform, hard to cross-list)
10. **Opaque fee structures** (hidden costs, processing fees buried in fine print)

### What Would Make Sellers Switch

Based on forum analysis and competitive research:

1. **Dramatically lower fees** (your 3-5% vs 13%+ is the #1 draw)
2. **Easy inventory import** from TCGPlayer/eBay (CSV import like Card Synced)
3. **Better seller protection** in disputes
4. **Faster payouts** (same-day or next-day)
5. **Transparent, predictable costs** (show exact net payout before listing)
6. **Cross-listing tools** (list on your platform + eBay simultaneously)
7. **Built-in shipping solutions** at competitive rates
8. **Responsive customer support** (human, not chatbot)
9. **Critical mass of buyers** (the chicken-and-egg problem)
10. **Mobile-first experience** (Gen Z expects it)

### The Chicken-and-Egg Problem

The biggest challenge for any new marketplace: **sellers won't come without buyers, buyers won't come without inventory.**

**Strategies that have worked:**
- **Whatnot**: Entertainment-first (live streaming drew audiences, sellers followed)
- **StockX**: Cross-sold sneaker audience into cards
- **Card Synced**: 0% fees to attract sellers, building inventory for buyers
- **MySlabs**: Ultra-low fees (2%) attracted price-sensitive sellers from eBay

**Recommended approach for a 3-5% fee platform:**
1. Start with a single niche (e.g., graded sports cards OR Pokemon) to build density
2. Offer inventory import tools (TCGPlayer CSV, eBay bulk import)
3. Cross-list on eBay via API to give sellers immediate buyer access while building native audience
4. Build community features that Facebook Groups users want but with built-in payment protection
5. Partner with content creators/YouTubers in the card space for demand generation
6. Consider a "founding seller" program with even lower fees (2-3%) for first 6 months

---

## 9. Sources

### Platform Fee Information
- [TCGPlayer Seller Fee Changes (Feb 2026)](https://seller.tcgplayer.com/blog/important-changes-to-tcgplayer-direct-minimum-pricing-and-marketplace-fees)
- [TCGPlayer Fees Overview](https://help.tcgplayer.com/hc/en-us/articles/201357836-TCGplayer-Fees)
- [TCGPlayer Fee Calculator](https://tcgfeecalc.com/)
- [TCGPlayer Fee Cap Increase FAQ](https://help.tcgplayer.com/hc/en-us/articles/37531606328727-Marketplace-Fee-Cap-Increase-FAQ)
- [eBay Selling Fees](https://www.ebay.com/help/selling/fees-credits-invoices/selling-fees?id=4822)
- [eBay Final Value Fee Changes 2025](https://www.ebay.com/sellercenter/resources/seller-updates/2025-january/final-value-fee)
- [eBay Seller Fees in 2026 (Webgility)](https://www.webgility.com/blog/ebay-fees)
- [eBay $1,000+ Trading Cards Fee Promo](https://pages.ebay.com/promo/2025/tc-singles/)
- [COMC Commission Fees](https://comc.zendesk.com/hc/en-us/articles/360053737993-What-are-the-commission-fees)
- [COMC Consignment Rates](https://blog.comc.com/selling-rates/)
- [Whatnot Seller Fees](https://help.whatnot.com/hc/en-us/articles/4847069165965-Whatnot-Seller-Fees-and-Commissions-Schedule)
- [Whatnot Seller Fee Explained (CLOSO)](https://closo.co/blogs/fees/whatnot-seller-fee-explained-2025-full-guide-ebay-fee-comparison)
- [Goldin Auctions FAQ](https://goldin.co/faq)
- [Goldin Marketplace/Weekly Auction Rates](https://www.sportscollectorsdaily.com/collectors-goldin-set-to-open-new-lower-cost-marketplace-weekly-auctions/)
- [StockX Seller Fee Updates (March 2026)](https://stockx.com/news/en-us/updates-to-the-stockx-seller-program/)
- [Alt Fees](https://support.alt.xyz/en/articles/9682168-alt-fees)
- [MySlabs Review (OnlyGreats)](https://onlygreats.com/2023/09/07/myslabs-review/)
- [Card Ladder Pricing](https://www.cardladder.com/pricing)
- [Mercari Fees](https://www.mercari.com/us/help_center/article/169/)
- [Mercari Fee Changes (Retail Dive)](https://www.retaildive.com/news/mercari-eliminates-marketplace-selling-fees-updates-return-policy/711749/)
- [CardTrader Fees](https://static.cardtrader.com/en/pages/payments-fees-and-refunds)

### Market Size & Industry Data
- [Trading Card Games Market Forecast: $16.9B by 2035 (GM Insights)](https://www.gminsights.com/industry-analysis/trading-card-games-market)
- [Trading Card Games Market (Yahoo Finance)](https://finance.yahoo.com/news/trading-card-games-market-forecast-153356253.html)
- [Trading Cards Market Outlook 2026-2032](https://www.intelmarketresearch.com/trading-cards-market-21337)
- [Collectible Card Games Market (Straits Research)](https://straitsresearch.com/report/collectible-card-games-market)
- [Gen Z Pokemon Card Investment (Fortune)](https://fortune.com/2025/07/12/gen-z-millenial-men-addicted-to-pokemon-sports-trading-cards-outbeat-sp-500-resell-ebay-investment-move/)
- [Trading Card Market Demographics 2025 (Discount Vending)](https://discountvending.com/the-trading-card-market-in-2025-trends-demographics-and-whats-next/)
- [Shopify TCG Store Growth (Custom Vending)](https://customvending.com/the-exploding-trading-card-market-in-2025-from-hobby-to-global-phenomenon/)

### APIs & Data Sources
- [PSA Public API](https://www.psacard.com/publicapi)
- [PSA Public API Documentation](https://www.psacard.com/publicapi/documentation)
- [PSA API Python Client (GitHub)](https://github.com/brad-newman/fetch-psa-api)
- [Scryfall API Documentation](https://scryfall.com/docs/api)
- [Pokemon TCG API](https://www.pokemon-api.com/)
- [PokemonPriceTracker API](https://www.pokemonpricetracker.com/pokemon-card-price-api)
- [JustTCG API](https://justtcg.com/docs)
- [PokeWallet API](https://www.pokewallet.io/)
- [CardMarket API](https://www.cardmarket-api.com/)
- [Sports Card API (Zyla Labs)](https://zylalabs.com/api-marketplace/sports/sports+card+and+trading+card+api/2511)
- [Ximilar AI Card Grading](https://www.ximilar.com/blog/ai-card-grading-automate-sports-cards-pre-grading/)

### Apify Scraper Actors
- [TCGPlayer Scraper (parseforge)](https://apify.com/parseforge/tcgplayer-scraper)
- [TCGPlayer Data Scraper (devcake)](https://apify.com/devcake/tcgplayer-data-scraper)
- [TCGPlayer Pokemon Scraper with MCP](https://apify.com/scraped/tcgplayer-pokemon-scraper/api/mcp)
- [TCGPlayer Sales History](https://apify.com/scraped/tcgplayer-sales-history)
- [TCGPlayer Products/Listings/Sales Scraper](https://apify.com/apage/tcgplayer-products-listings-sales-scraper)
- [CardMarket Scraper](https://apify.com/ecomscrape/cardmarket-card-page-details-scraper/api)
- [Scryfall Scrapers](https://apify.com/ecomscrape/scryfall-card-details-scraper/api)

### Platform Reviews & Pain Points
- [TCGPlayer Trustpilot Reviews](https://www.trustpilot.com/review/tcgplayer.com)
- [TCGPlayer BBB Complaints](https://www.bbb.org/us/ny/syracuse/profile/games/tcgplayer-0041-235983801/complaints)
- [Whatnot Trustpilot Reviews](https://www.trustpilot.com/review/www.whatnot.com)
- [Whatnot App Review (CLOSO)](https://closo.co/blogs/blog/the-real-truth-about-the-whatnot-app-scams-steals-and-dollar-starts-2025-review)
- [eBay Trading Card Fee Complaints (Community Forum)](https://community.ebay.com/t5/Selling/eBay-Takes-Almost-50-in-Fees-on-Trading-Cards/td-p/34608050)
- [Facebook Marketplace Fraud](https://www.lookatmyprofile.org/blog/facebook-marketplace-has-become-a-digital-wasteland-where-73-1755691359352)

### New Entrants & Competitive Landscape
- [CardNexus Launch (GameTyrant)](https://gametyrant.com/news/cardnexus-launches-a-multi-game-trading-card-marketplace-and-it-might-be-exactly-what-the-tcg-community-needs)
- [Card Synced vs TCGPlayer](https://cardsynced.com/compare/tcgplayer)
- [Beckett Marketplace](https://marketplace.beckett.com/)
- [Best Sites to Buy & Sell Cards 2025 (CardSZN)](https://cardszn.com/blog/what-are-the-best-websites-to-buy-and-sell-sports-cards-in-2025/)
- [Top Trading Card Platforms (ConsignR)](https://consignr.com/blog/top-trading-card-platforms)

### Payment Processing
- [Stripe Pricing](https://stripe.com/pricing)
- [Stripe Connect Pricing](https://stripe.com/connect/pricing)
- [Stripe Connect Marketplace Guide 2026](https://greenmoov.app/articles/en/stripe-connect-for-marketplace-payments-explained-account-types-onboarding-and-pricing-2026-guide/)

### eBay/TCGPlayer Integration
- [eBay Acquires TCGPlayer ($295M)](https://investors.ebayinc.com/investor-news/press-release-details/2022/eBay-Acquires-TCGplayer/default.aspx)
- [eBay PSA Grading Integration](https://sports.yahoo.com/article/ebay-adds-feature-send-raw-193000544.html)
- [eBay Vault to PSA](https://www.ebayinc.com/stories/news/ebay-launches-its-vault-for-trading-cards/)
- [eBay Authentication Guarantee for Trading Cards](https://pages.ebay.com/authenticity-guarantee-tradingcards-seller/)

---

## Appendix: Key Takeaways for Product Strategy

### The 5 Strongest Competitive Advantages to Build

1. **Fee transparency and low cost** -- 5% seller fee + buyer-paid processing (effective ~8% total vs 13%+ everywhere else). Show exact net payout at listing time.

2. **Universal grading verification** -- Auto-verify PSA, BGS, CGC, SGC certs. Slab scanner via phone camera. Population report data in listing. No other platform does this comprehensively.

3. **AI-assisted condition standardization** -- Use AI pre-grading on raw cards to reduce condition disputes (the #1 source of buyer-seller conflict). Ximilar API or similar.

4. **Sports + TCG unified platform** -- Be the first platform that handles both sports cards AND TCG cards equally well. TCGPlayer only does TCG. eBay is general. No one specializes in both.

5. **Community + escrow** -- Combine the community feel of Facebook Groups (direct messaging, collections, discussion) with professional escrow/payment protection. The "Facebook Groups killer."

### Recommended MVP Scope

Start with **graded sports cards** (similar to MySlabs but better):
- Highest average transaction value ($20-500+) = better unit economics at 5%
- PSA API exists for verification
- Card Ladder integration possible for pricing
- Clearest product (cert number = unique identifier)
- Expand to raw sports cards, then TCGs once infrastructure is proven

### Revenue Diversification (Beyond Commission)

To make low fees sustainable:
- **Promoted listings**: 2-5% boost fee (optional, like eBay)
- **Analytics subscription**: $10-20/mo for pricing data, portfolio tracking
- **Grading submission service**: Aggregate submissions to PSA/BGS/CGC at group rates, charge handling fee
- **Insurance/authentication**: $2-5 per transaction for high-value items
- **Shipping label partnerships**: Negotiate bulk USPS/UPS rates, mark up slightly
- **Advertising**: Display ads from card-related businesses (grading companies, card supplies, etc.)
