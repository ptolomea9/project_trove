# UI/UX Design Research & Concept Document
## Trading Card Marketplace Platform

**Date:** March 23, 2026
**Document Type:** Design Research, Competitive Audit, and UI Concept
**Status:** Phase 1-3 Complete

---

## Table of Contents

1. [Phase 1: Competitor Design Audit](#phase-1-competitor-design-audit)
2. [Phase 2: Design Concept for Our Platform](#phase-2-design-concept)
3. [Phase 3: Design System Foundations](#phase-3-design-system-foundations)

---

# Phase 1: Competitor Design Audit

## 1. TCGPlayer

**URL:** tcgplayer.com
**Position:** Dominant marketplace for collectible card games (Pokemon, Magic, Yu-Gi-Oh)

### Visual Design Language
- **Colors:** White background, black text, green accent (#00A651) for nav bar and CTAs. Yellow highlight for promotions. Very clean, utilitarian palette.
- **Typography:** System sans-serif stack. Functional, not branded. Product names in bold black, metadata in smaller gray. Prices use large bold black type with green "Market Price" annotations.
- **Spacing:** Dense but organized. The search results page packs 9 cards per visible row in grid view (3-column). Moderate padding between card tiles.
- **Imagery:** Flat product photography on white/neutral backgrounds. Card images are the actual scans, displayed at a consistent size. No lifestyle photography.

### Navigation & Information Architecture
- **Top bar:** Logo, location selector, search bar (with category dropdown), sign-in, account, cart.
- **Category nav:** Horizontal bar below header with game franchises (Magic, Yu-Gi-Oh, Pokemon, Disney Lorcana, One Piece, Digimon, More Products, Content). Each has dropdown menus.
- **Search tabs:** Products / Articles / Decks -- a unique three-way split that reflects their content strategy.
- **Filter system:** Horizontal filter pills (All Filters, Condition, Printing, game-specific set filters, Product Type, Card Type, Rarity) with "Clear Filters" option. Applied filters appear as colored chips that can be removed individually.

### Card Listing Page Design
- **Grid view (default):** 3-column grid. Each tile shows: card thumbnail (left), card name (bold), set name + rarity + number, "X listings from" count in blue, price in large bold, "Market Price" below in green.
- **List view:** Available via toggle. More detail-dense.
- **Sort:** "Best Match" default with dropdown.
- **Breadcrumbs:** "All Categories > Pokemon Cards > SV: Prismatic Evolutions"

### Search & Filtering UX
- **Strengths:** Extremely comprehensive filters. Can filter by condition (Near Mint, Lightly Played, etc.), printing (1st Edition, Unlimited, Reverse Holo), product type, card type, and rarity. Filter counts show results.
- **Weaknesses:** Filter UI is purely functional, no visual indicators. No price range slider visible by default.

### Listing Creation Flow
- Seller portal is separate. Multi-step process requiring card identification, condition grading, pricing against market data.

### Mobile Experience
- Responsive design, but clearly desktop-first. The dense grid layout compresses to 2-column on tablet, 1-column on mobile.

### What Works Well
- Market Price data is immediately visible, building trust and informing buyers.
- "X listings from $Y" clearly shows supply depth.
- Filter system is comprehensive for power users.
- Content integration (articles, deck builds) keeps users engaged.

### What Feels Dated/Clunky
- White utilitarian design lacks personality and emotion. Feels like a spreadsheet.
- Card images are small in grid view -- the actual card art doesn't get to shine.
- No social or community features visible.
- Hero banner carousel feels generic (standard e-commerce pattern).
- No 3D visualization, no card hover effects, no animation.

### Trust Signals
- "Market Price" data transparency.
- Seller ratings and "Direct" badge for TCGPlayer-fulfilled orders.
- Buyer Protection guarantee (buried in footer).
- Count of available listings signals active marketplace.

---

## 2. Whatnot

**URL:** whatnot.com
**Position:** Live auction/streaming marketplace (mobile-first)

### Visual Design Language
- **Colors:** Bold yellow (#FFE600) as brand color, black text, white backgrounds. High contrast, energetic. The yellow screams "excitement" and "deals."
- **Typography:** Bold sans-serif headings (appears custom or Inter/Satoshi family). Very large display text for hero: "The Live Shopping Marketplace."
- **Spacing:** Extremely generous whitespace. Mobile-first philosophy means content breathes. Large touch targets.
- **Imagery:** Lifestyle photography showing real people in live streams, physical products being held. Phone mockups showing the app experience.

### Navigation & Information Architecture
- **Minimal desktop nav:** Logo, "Become a Seller," "Log in," "Sign up." That's it. Everything else drives to the app.
- **Landing page is primarily a funnel to download the app.** QR codes are prominent. Desktop web is not the primary experience.
- **Section-based scroll:** Hero > How it works > Categories > Deals > Footer. Vertical storytelling.

### Card Listing Page Design
- **Not accessible on desktop.** The marketplace is app-only. Landing page shows phone screens with live stream UIs -- price overlays, bid counters, chat bubbles, seller video feeds.

### Search & Filtering UX
- N/A on desktop. App-based search with category browsing.

### Listing Creation Flow
- "Become a Seller" requires application and approval. Live selling format means sellers need to set up streams.

### Mobile Experience
- This IS the experience. Whatnot is mobile-native. The UI on phones shows TikTok-style vertical video feeds with real-time bidding overlays, emoji reactions, and chat.

### What Works Well
- The live auction format creates urgency and excitement.
- Community is built-in through live interaction.
- The yellow brand color is instantly recognizable and energetic.
- Mobile-first approach respects how younger collectors actually browse.

### What Feels Dated/Clunky
- Desktop experience is essentially a brochure -- can't actually shop.
- No searchable inventory outside of live streams.
- Hard to find specific cards if you know what you want.
- Seller approval process is a barrier.

### Trust Signals
- Seller verification (approved sellers only).
- Buyer protection highlighted in FAQs.
- Real faces in live streams build parasocial trust.

---

## 3. Goldin

**URL:** goldin.co
**Position:** High-end auction house (now owned by eBay)

### Visual Design Language
- **Colors:** Dark charcoal/black hero area (#1A1A1A), white content areas, gold (#C5A55A) as a luxury accent for auction-specific branding. Green (#34D399) for "Live" badges on active auctions. Clean and premium.
- **Typography:** Serif font for the logo ("Goldin" in a classic serif). Sans-serif for body. "Spring Coin Auction / Now Open" uses elegant weight contrasts -- thin "Spring Coin Auction" above heavy "Now Open."
- **Spacing:** Generous. The auction cards have significant padding. Premium feel through breathing room.
- **Imagery:** High-quality product photography. Cards shown in PSA slabs and display cases. Dark backgrounds make items pop. Multiple product thumbnails in a grid for auction previews.

### Navigation & Information Architecture
- **Top bar:** Logo, search bar, Auctions (dropdown), Private Sales (dropdown), Calendar, Results, Login icon, "Sell" CTA button (black pill).
- **Hierarchical:** Auctions are the primary focus, organized by event/date. "Calendar" and "Results" for past auction data.
- **Auction-centric:** Content organized by auction events rather than individual products.

### Card Listing Page Design
- **Auction card format:** Large image area, auction title (e.g., "2026 March Elite Auction"), "Live" green badge, countdown timer (Days / Hours / Minutes in large numbers), and date.
- **Items within auctions:** Grid of lots with images, descriptions, current bid amounts.

### Search & Filtering UX
- Search bar for "all lots and listings."
- Auction results page with filters for category, grade, price range.
- Historical sales data available under "Results."

### Listing Creation Flow
- Consignment model. "Sell" button leads to a submission form. Goldin handles authentication, photography, listing, and sale. White-glove service.

### Mobile Experience
- Responsive design. Auction cards stack vertically. Countdown timers remain prominent.

### What Works Well
- Dark hero sections make cards look like museum pieces -- premium positioning.
- Countdown timers create urgency without the chaos of live streams.
- Historical sales data builds price confidence.
- eBay backing adds legitimacy for high-value transactions.
- Gold accent color conveys luxury and high value.

### What Feels Dated/Clunky
- Consignment-only model means you can't list a $20 card.
- Desktop layout is somewhat traditional -- grid of auction event cards.
- No social features or community elements.
- Search functionality is basic compared to TCGPlayer.

### Trust Signals
- "An eBay Company" branding.
- Professional photography implies authentication.
- "Meet Our Experts" page.
- Historical auction results create price transparency.
- Bidding limit system (must request increases) signals controlled marketplace.

---

## 4. StockX

**URL:** stockx.com/trading-cards
**Position:** Authentication-first marketplace (sneakers heritage, expanding to cards)

### Visual Design Language
- **Colors:** White background, dark text, green (#006340) brand accent. Very clean, almost clinical. Minimal color beyond the green brand elements. "Deals" in red in the nav.
- **Typography:** Custom sans-serif (StockX Sans). Clean, modern, slightly condensed. Product names are truncated with ellipsis to maintain grid uniformity.
- **Spacing:** Airy product grid. White space between product tiles creates a gallery feel. Clean horizontal nav with generous spacing.
- **Imagery:** Products on white backgrounds, studio-quality shots. Cards shown in packaging (sealed products) or slabs (graded singles). Consistent image sizing.

### Navigation & Information Architecture
- **Top bar:** Logo, search bar ("Search for brand, color, etc."), News, About, Help, Sell, notification bell, Login/Sign Up buttons.
- **Category nav:** Horizontal mega-bar with "All, Brands, Trending, New, Deals, Men, Women, Kids, Sneakers, Shoes, Apparel, Accessories, Collectibles, Trading Cards, More."
- **Left sidebar filters:** Available Now toggle, Xpress Ship toggle, Below Retail toggle, Category (Trading Cards > Sealed Boxes, Graded Singles, Packs, Ungraded Singles), Brands, Activity, Color.

### Card Listing Page Design
- **4-column product grid:** Clean white tiles. Each shows: product image (centered, white bg), product name (truncated), "Lowest Ask" label in gray, price in bold black, "Xpress Ship" badge where applicable. Heart icon for wishlist.
- **"Sponsored" label** on promoted listings with different styling.
- **Sort dropdown:** "Featured" default.
- **SEO content block** at the top with expandable "Read More" about trading cards history.

### Search & Filtering UX
- **Toggle switches** for quick filters (Available Now, Xpress Ship, Below Retail) -- intuitive binary filters.
- **Collapsible sidebar sections** for Category, Brands, Activity, Color.
- **"Below Retail" filter** is brilliant -- unique to StockX's price-tracking model.

### Listing Creation Flow
- Bid/Ask model. Sellers "ask" a price, buyers "bid." When they match, a sale happens. Like a stock exchange. Sellers don't create traditional listings -- they set asking prices on pre-defined product pages.

### Mobile Experience
- Strong mobile web experience. Clean grid compresses to 2-column. Toggle filters become a bottom sheet.

### What Works Well
- The cleanest, most modern grid design of all competitors.
- "Lowest Ask" language frames pricing like a stock exchange -- sophisticated.
- Toggle filters are intuitive and accessible.
- Consistent white-background product photography creates visual harmony.
- "Below Retail" concept is a strong value proposition.
- "Xpress Ship" badge adds a differentiating service layer.

### What Feels Dated/Clunky
- Trading cards feel like an afterthought -- same template as sneakers.
- No card-specific features (grading info, set data, player info).
- Can't see multiple sellers' prices for the same card.
- Authentication process is a black box to users.
- Truncated product names lose important card details.

### Trust Signals
- Authenticity Guarantee badge system.
- Verification process for every item.
- "StockX Verified" branding.
- Transaction-based pricing (like a stock market) signals fair market value.

---

## 5. Alt

**URL:** alt.xyz
**Position:** Modern alternative asset platform for trading cards

### Visual Design Language
- **Colors:** Dark mode! Black (#0D0D0D) background with white text. Purple (#7C3AED) as primary accent for CTAs ("SELL" button, price/bid buttons). Green (#10B981) for positive price movements and sparkline trends. White for secondary elements. This is the most modern palette in the space.
- **Typography:** Bold serif for "Featured Auctions" heading (editorial feel), clean sans-serif for everything else. Mix of serif display and sans-serif body creates sophisticated contrast.
- **Spacing:** Generous card spacing in the featured auction carousel. Cards float on the dark background with subtle shadows, creating depth.
- **Imagery:** Cards shown in slabs and cases against the dark background -- they genuinely pop. Professional photography. PSA grade labels and POP counts visible in card descriptions.

### Navigation & Information Architecture
- **Top bar:** "ALT" logo (minimal, modern), search bar ("Search by name..."), ALL ITEMS, AUCTIONS (with "LIVE" red badge), MARKET TRENDS, MY COLLECTION, SELL (purple button), SIGN UP / LOG IN, hamburger menu.
- **Homepage flow:** Featured Auctions carousel (horizontal scroll with large card images) > Sport category icons (Basketball, Football, Baseball, Soccer, Combat Sports, Pokemon) > "Top rising / falling" market data table.
- **Market Trends page (unique):** "Alt Indices" showing sport-by-sport market indices with sparkline charts, 30d and 90d percentage changes. Below: "Top rising / falling" tables with player thumbnails, names, percentage changes, and 90-day trend sparklines.

### Card Listing Page Design
- **Featured auction carousel:** Large card images (the cards are the hero, not thumbnails). Below each: grade/pop info, player name, seller name with avatar, purple "$X / BID" button, countdown timer (e.g., "2D 20H").
- **Category filter bar:** Sport icons with labels, horizontally scrollable. Active category gets purple underline.
- **Market data table:** Player/character name, small avatar image, 7-day percentage change in green with up arrow.

### Search & Filtering UX
- "Search by name" -- simple, focused on player/character names.
- Category filtering via sport icons.
- Market Trends page provides data-driven discovery.

### Listing Creation Flow
- "SELL" button is prominent in purple. Flow appears streamlined but requires account creation.

### Mobile Experience
- Dark mode is inherently mobile-friendly (easier on eyes, OLED battery savings). The carousel swipe pattern is native mobile interaction.

### What Works Well
- **Dark mode makes cards look SPECTACULAR.** This is the single biggest design insight from the audit -- cards on dark backgrounds are objectively more visually striking.
- **"Stock market for cards" positioning** with indices, sparklines, and percentage changes frames cards as investments, not just collectibles.
- **Purple accent is distinctive** -- no other competitor uses it.
- **Sport category icons** are immediately recognizable and fun.
- **Featured auction carousel** gives premium listings proper visual weight.
- **Market Trends** page is genuinely useful and differentiating -- it creates a reason to visit even when not buying.

### What Feels Dated/Clunky
- Limited filtering options compared to TCGPlayer.
- No visible community features.
- Search is very basic -- just name-based.
- The "All Items" link doesn't seem to work reliably.
- "MY COLLECTION" requires login with no preview of the feature.

### Trust Signals
- Grade and POP count data visible on listings (PSA, BGS).
- Seller names with icons.
- Market data transparency (indices, price history).
- Professional, fintech-like design language implies institutional-grade operations.

---

## 6. COMC (Check Out My Cards)

**URL:** comc.com
**Position:** Traditional consignment marketplace (focused on sports cards)

### Visual Design Language
- **Colors:** White background, red (#CC0000) and dark gray accents. Red "Go" search button, red "Buy Cards" CTA. Yellow (#FFD700) notification bar. Overall very 2010s web design aesthetic.
- **Typography:** System fonts. Mix of serif and sans-serif that feels inconsistent. Bold red headings.
- **Spacing:** Dense, information-heavy. Feels cramped. The homepage packs promotion cards, value propositions, product grids, and navigation into tight spaces.
- **Imagery:** Actual card scans (front and back) -- this is their key differentiator. Products shown at small size in grid but with detailed hover/click views.

### Navigation & Information Architecture
- **Top bar:** Logo, "Browse" hamburger, search input, "Go" button, Sign In, Cart (with item count).
- **Homepage sections:** Promotional banner carousel > Seller promotions (user-run sales with countdown timers) > Value props ("Ideal for Set Builders") > Sell CTA > Recently Added (tabbed by sport) > Popular Players grid.
- **Category structure:** Browse by sport (Baseball, Football, Hockey, Basketball), then by year, set, card number. Deep hierarchical taxonomy.

### Card Listing Page Design
- **Grid:** Small card thumbnails with set info line, card name as heading, price link. Very text-heavy.
- **Unique:** Cards are organized by sport tabs (Baseball / Football / Hockey / Basketball) with horizontal scrollable rows.
- **Seller promotions:** Users can create sale events ("Bracket Battles - 42% OFF") with preview images and countdown timers.

### Search & Filtering UX
- Deep filtering by sport, year, manufacturer, set, player. Power-user oriented.
- "Suggested Prices" tool for valuation.

### Listing Creation Flow
- **Consignment model:** Ship your cards to COMC. They scan front and back, identify, list, store, insure, package, and ship. The seller does almost nothing except send cards and set prices.

### Mobile Experience
- Basic responsive design. Clearly desktop-first. The dense layout doesn't translate well to mobile.

### What Works Well
- **Front + back scans of every card** is genuinely valuable for condition assessment.
- **"Buy now, ship later"** model (accumulate purchases from multiple sellers, ship once) reduces shipping costs.
- **46 million cards under one roof** -- massive inventory signal.
- **User-created promotions** add a community/social element.
- **Historical sales data** for pricing.

### What Feels Dated/Clunky
- **The entire design feels like 2012.** Red/white color scheme, dense layouts, small card images, system fonts. Visually the weakest competitor.
- **No modern UI patterns** -- no cards-as-components, no hover effects, no animations.
- Social media icons (WordPress, Facebook, Twitter, YouTube) in a floating sidebar are an outdated pattern.
- **"Support" button** is the standard Zendesk widget -- not integrated.
- The promotional banner carousel has low-quality graphics.

### Trust Signals
- "We Do The Work To Sell Your Cards" with checkmark list.
- Front/back scans prove condition.
- COMC stores and insures cards.
- Volume stats ("46 million cards").

---

## 7. eBay (Trading Cards Section)

**URL:** ebay.com/b/Trading-Cards/bn_7116496578
**Position:** The everything marketplace -- largest trading card volume

### Visual Design Language
- **Colors:** White background, eBay's multicolor logo, blue (#0654BA) for CTAs/links/search button. Minimal accent colors. Clean, corporate, generic.
- **Typography:** Market Sans (eBay's custom font). Clean, readable, no personality for the trading cards vertical.
- **Spacing:** Well-organized grid layouts for categories. "Shop by Category" and "Shop by Sport" sections use uniform card sizes with generous spacing.
- **Imagery:** Category thumbnails use actual card images -- well-photographed singles, sealed products, etc. "Shop by Sport" uses individual card images as category markers.

### Navigation & Information Architecture
- **Standard eBay chrome:** Top utility bar (Sign in, Deals, Gift Cards, Help), main bar (logo, category dropdown, search, advanced search), and the universal eBay shopping experience.
- **Trading Cards hub:** Structured as a vertical landing page with: Buying & Selling Tools (sidebar links) > Shop by Category (visual grid) > Shop by Sport (visual grid) > Shop Collectible Card Games (visual grid) > Featured Release > Buying & Selling Tools (Vault, Authenticity Guarantee).
- **Sidebar links:** Well-organized by content type (Sports Trading Cards, Collectible Card Games, Non-Sport Trading Cards, eBay Live).

### Card Listing Page Design
- **Category grid:** 5-column image grid with category labels below. Images are well-composed product photography.
- **Individual listings (from search):** Standard eBay listing format -- image, title, price, condition, shipping info, seller rating, buy/bid buttons. Gallery and list view options.

### Search & Filtering UX
- **eBay's power search** is industry-leading for breadth but overwhelming for casual users. Advanced search lets you filter by everything imaginable.
- **"Vault Your Cards" and "Authenticity Guarantee"** prominently featured as trust tools.
- **eBay Live** integration for live auctions/breaks.

### Listing Creation Flow
- Standard eBay listing flow. Extensive but complex. Requires condition descriptions, photography, shipping setup, pricing strategy (auction vs. fixed). Recent improvements with card-specific tools and pre-filled details.

### Mobile Experience
- eBay's mobile app is mature and well-optimized. The trading cards section inherits the standard eBay mobile experience.

### What Works Well
- **Massive selection.** More trading cards than any other platform.
- **eBay Vault** is a unique feature -- store high-value cards in eBay's vault and trade them without physical shipping.
- **Authenticity Guarantee** with professional grading verification for items over $250.
- **eBay Live** brings Whatnot-style live selling to eBay's audience.
- **"Shop by Sport" and "Shop by Game"** visual navigation is intuitive.
- **Price history and "sold" data** helps buyers know fair value.

### What Feels Dated/Clunky
- **Generic platform.** Trading cards get the same template as sneakers, electronics, and car parts. No card-specific visual experience.
- **Listing flow is still complex** despite improvements.
- **Seller experience varies wildly** -- inconsistent photography, descriptions, pricing.
- **Fee structure is complex** and higher than specialized platforms.
- **Search results mix formats** (singles, lots, sealed, supplies) without clear visual distinction.

### Trust Signals
- eBay Money Back Guarantee.
- Authenticity Guarantee badge.
- eBay Vault for storage.
- Seller feedback/rating system (decades of trust data).
- "Top Rated Seller" and "Top Rated Plus" badges.

---

## Competitive Audit Summary Matrix

| Feature | TCGPlayer | Whatnot | Goldin | StockX | Alt | COMC | eBay |
|---------|-----------|---------|--------|--------|-----|------|------|
| **Visual Modernity** | 6/10 | 8/10 | 7/10 | 8/10 | 9/10 | 3/10 | 6/10 |
| **Dark Mode** | No | No | Partial | No | YES | No | No |
| **Card-Specific UX** | 9/10 | 5/10 | 7/10 | 4/10 | 8/10 | 8/10 | 5/10 |
| **Mobile Experience** | 6/10 | 10/10 | 7/10 | 8/10 | 8/10 | 4/10 | 8/10 |
| **Community Features** | 4/10 | 9/10 | 2/10 | 3/10 | 4/10 | 5/10 | 5/10 |
| **Trust Signals** | 7/10 | 6/10 | 8/10 | 9/10 | 7/10 | 6/10 | 9/10 |
| **Market Data** | 8/10 | 2/10 | 7/10 | 8/10 | 9/10 | 6/10 | 7/10 |
| **Search/Filtering** | 10/10 | 3/10 | 5/10 | 7/10 | 4/10 | 8/10 | 9/10 |
| **Listing Flow** | 6/10 | 7/10 | 8/10 | 9/10 | 7/10 | 9/10 | 5/10 |
| **Fee Transparency** | 5/10 | 5/10 | 4/10 | 6/10 | 6/10 | 5/10 | 4/10 |

### Key Design Gaps We Can Exploit

1. **No one has dark mode as default.** Alt is the only one with dark mode, and it makes cards look dramatically better. This is our biggest visual opportunity.

2. **No one has 3D card visualization.** Every platform shows flat 2D images. AI-powered 3D rotating cards would be a category-defining differentiator.

3. **Fee transparency is universally poor.** No platform makes fees a hero-level value proposition. Our 3-5% flat fee should be impossible to miss.

4. **Community is bolted on, not built in.** Whatnot has live stream chat but no persistent community. No platform has DMs, profiles, collections, and social features as a core part of the marketplace experience.

5. **Listing creation is universally painful.** Even the best (StockX's bid/ask model, COMC's consignment) require significant effort. AI-powered "snap a photo, we do the rest" would be revolutionary.

6. **Market data is siloed.** Alt has the best market data, but it's disconnected from the buying experience. Price history, market trends, and comparable sales should be contextual -- visible when you're looking at a card to buy.

---

# Phase 2: Design Concept

## Brand Name Assumption: "CardVault" (working title)

The design concepts below use "CardVault" as a placeholder. The name should evoke: security, collection, premium, modern.

---

## 2.1 Homepage Design Concept

### Hero Section
**Layout:** Full-width dark background (#0A0A0F) with a single featured card rendered in 3D, slowly rotating with a cinematic spotlight effect. Subtle particle effects (dust motes, light flares) create depth. The card floats slightly, casting a soft shadow below.

**Content overlay (left side):**
```
[Logo: CardVault]

THE FUTURE OF
CARD TRADING

Flat 3-5% fees. AI-powered.
Community-driven.

[Search bar: "Search 2M+ cards..."]

[CTA Button: "Start Browsing"]  [Ghost Button: "List a Card"]
```

**Fee callout badge (floating, top-right of hero):**
A persistent glassmorphism badge:
```
+-----------------------------+
|  FLAT 3-5% SELLER FEES     |
|  vs 8-15% everywhere else  |
+-----------------------------+
```
This badge uses a frosted glass effect (blur + transparency) with a green accent border. It should feel like a permanent truth of the platform, not a promotional banner.

**Below the fold:**

1. **"Live Now" ticker bar** -- horizontally scrolling strip showing real-time sales: "@user just bought [Card Name] for $XXX" with card thumbnails. Creates FOMO and signals marketplace activity.

2. **Featured Listings Carousel** -- 3-card horizontal carousel on dark background. Each card shown in 3D perspective with:
   - Card image (large, hero-sized)
   - Grade badge (PSA 10, BGS 9.5, etc.)
   - Price / Current Bid
   - Time remaining (for auctions)
   - Seller avatar + name + rating
   - "Buy Now" or "Place Bid" CTA

3. **Market Trends Section** (inspired by Alt but better integrated):
   - "Trending Up" and "Trending Down" cards with sparkline charts
   - Category indices (Pokemon, Sports, TCG)
   - "Hot Right Now" -- cards with the most views/bids in last 24h

4. **Community Activity Feed:**
   - Recent listings from followed users
   - New collection showcases
   - Achievement badges earned
   - "Just Graded" -- cards that just received grades

5. **Value Proposition Row:**
   Three cards (glassmorphism containers on dark bg):
   ```
   [Shield Icon]          [Brain Icon]           [People Icon]
   SECURE ESCROW         AI-POWERED             COMMUNITY
   Every transaction     Snap. Identify.        DMs, profiles,
   protected by          Price. List.           collections,
   escrow. Period.       That simple.           and rep scores.
   ```

6. **Fee Comparison Section:**
   Visual bar chart comparing fees across platforms:
   ```
   CardVault:  |||  3-5%
   TCGPlayer:  ||||||||||  8-11%
   eBay:       ||||||||||||||  10-15%
   Goldin:     ||||||||||||||||  15-20%
   ```
   Headline: "Keep More of What You Earn"

7. **Footer:** Dark, minimal. Links organized by Buyers / Sellers / Community / Company. Social icons. App download badges.

---

## 2.2 Card Listing Page (Product Detail Page)

This is the centerpiece of the experience -- where the 3D card viewer lives.

### Layout: Split Screen

**Left 60%: 3D Card Viewer**

The card occupies the majority of the viewport. On a dark background (#0A0A0F), the card floats and slowly rotates on its Y-axis (a subtle, continuous animation). The background behind the card features a soft, animated gradient glow that matches the card's dominant color (e.g., yellow glow for a Pikachu card, red for a Charizard).

**Interactions:**
- **Mouse move:** Card tilts to follow cursor (parallax effect, like holographic).
- **Click + drag:** Free 3D rotation.
- **Scroll over card area:** Zoom in/out.
- **Double-click:** Flip card to show back.
- **"View in AR" button:** Opens phone camera to see card in AR on your desk.
- **Screenshot button:** Saves a cinematic render of the card for sharing on social media (with watermark).

**Below the 3D viewer:**
- Thumbnail strip: Multiple angles/photos if seller provided them.
- "Condition close-ups" -- AI-identified areas of wear highlighted with magnification circles.

**Right 40%: Card Information Panel**

```
[Breadcrumb: Pokemon > Prismatic Evolutions > #131]

CHARIZARD EX
Special Illustration Rare - #131/165
SV: Prismatic Evolutions (2025)

[Grade Badge: PSA 10 GEM MINT]  [POP Count: 487]

---

$2,450.00                          [Heart]  [Share]
or Best Offer

+------------------------------------+
|        BUY NOW  ($2,450)           |  <-- Primary CTA, purple
+------------------------------------+
|        MAKE OFFER                  |  <-- Secondary CTA, outline
+------------------------------------+

Fee breakdown (expandable):
  Card price:     $2,450.00
  Platform fee:   $85.75 (3.5%)  <-- Green text: "You save $159.25 vs TCGPlayer"
  Shipping:       $0.00 (seller pays)
  Total:          $2,535.75

---

SELLER
[Avatar] @CardMaster99
[5 stars] 4.98 (1,247 sales)
[Verified badge] [Top Seller badge]
[Message Seller] button
Member since 2024 | Ships from: Austin, TX
Response time: < 2 hours

---

PRICE HISTORY (embedded chart)
[Sparkline showing this card's price over 30/90/365 days]
Average sale: $2,180 | Highest: $3,200 | Lowest: $1,800
[Link: "See all 47 recent sales"]

---

SIMILAR LISTINGS
[Horizontal scroll of 4-5 cards]
Same card, different sellers/grades/prices

---

MARKET CONTEXT
"This card is priced 12% above the 30-day average.
47 copies sold in the last 90 days.
PSA 10 population: 487 (growing 2.3% monthly)."
```

### Mobile Layout
On mobile, the 3D card viewer becomes a full-width hero at the top (with swipe gestures for rotation). The info panel scrolls below. The "Buy Now" button becomes a sticky bottom bar.

---

## 2.3 User Profile Page

### Design Concept: Collection Showcase

**Header (full-width, dark):**
```
[Cover Image: Custom or AI-generated based on collection theme]

[Large Avatar]
@CardMaster99
"Chasing the dream. PSA 10 or bust."
[Edit Profile]

[Stats Row:]
1,247 Sales | 342 Purchases | 4.98 Rating | Level 42

[Badges Row (horizontal scroll):]
[Founding Member] [Top Seller] [1000 Club] [Pokemon Master]
[Perfect Rating] [Speed Shipper] [Community Helper]
```

**Tabs below header:**
- **Collection** (default) -- Visual grid of all cards in their collection, organized by custom binders/sets. Each card shown as a small 3D thumbnail. Hover to see a larger preview with grade and value.
- **For Sale** -- Active listings grid.
- **Reviews** -- Buyer and seller reviews with ratings.
- **Activity** -- Recent transactions, listings, community posts.
- **Wishlist** -- Cards they're looking for (enables "I have this" matching).

**Collection View Detail:**
Users can create custom "binders" (like playlists for cards):
```
[Binder: "My PSA 10 Vintage"]
[Binder: "Chasing: Prismatic Evolutions Complete Set"]
[Binder: "Investment Portfolio"]
```

Each binder shows a cover image (auto-generated from the first 4 cards), card count, estimated total value, and value change over time.

**Gamification Elements:**
- **Level system:** XP earned from buying, selling, listing, rating, and community participation.
- **Level badges:** Bronze (1-10), Silver (11-25), Gold (26-50), Platinum (51-75), Diamond (76-99), Legend (100).
- **Achievement badges:** "First Sale," "100 Sales," "Perfect Month" (30 days of 5-star ratings), "Whale" (single purchase over $10K), "Set Completer," etc.
- **Streak counter:** "12-day listing streak" -- encourages daily engagement.

---

## 2.4 Listing Creation Flow

### Design Concept: AI-Powered Magic

This is our biggest UX differentiator. The flow should feel like magic.

**Step 1: Capture**
Full-screen camera view (mobile) or upload area (desktop).

```
+-------------------------------------+
|                                     |
|     [Camera viewfinder / Drop zone] |
|                                     |
|     Point your camera at any card   |
|     and we'll handle the rest.      |
|                                     |
|     [Take Photo]  [Upload Image]    |
+-------------------------------------+
```

**Step 2: AI Identification (2-3 seconds)**
After photo capture, a loading animation shows the AI "scanning" the card. A cyberpunk-style scan line sweeps across the card image. Particle effects identify key features (set symbol, card name, number).

```
+-------------------------------------+
|  [Card image with scan animation]   |
|                                     |
|  Identifying card...                |
|  [progress bar]                     |
|                                     |
|  Found: Charizard EX #131/165       |
|  Set: SV Prismatic Evolutions       |
|  Rarity: Special Illustration Rare  |
|                                     |
|  [Correct]  [Not quite - Edit]      |
+-------------------------------------+
```

**Step 3: Condition Assessment**
AI analyzes the photo for condition markers. Shows the card with highlighted areas:

```
+-------------------------------------+
|  [Card with condition overlay]      |
|                                     |
|  AI Condition Estimate: Near Mint   |
|                                     |
|  Corners: Excellent                 |
|  Edges: Light wear detected (left)  |
|  Surface: Clean                     |
|  Centering: 55/45                   |
|                                     |
|  [Accept NM]  [Change Condition v]  |
+-------------------------------------+
```

**Step 4: Pricing**
AI suggests a price based on recent sales, current listings, and market trends.

```
+-------------------------------------+
|  SUGGESTED PRICE: $2,450            |
|                                     |
|  [Price slider: $1,800 --- $3,200]  |
|                                     |
|  Market context:                    |
|  - 47 sold in last 90 days         |
|  - Avg sale price: $2,180           |
|  - Lowest current listing: $2,300   |
|  - "Your price is competitive"      |
|                                     |
|  Your earnings after 3.5% fee:      |
|  $2,364.25                          |
|                                     |
|  [Set Price: $2,450]                |
+-------------------------------------+
```

**Step 5: Review & Publish**

```
+-------------------------------------+
|  [3D Preview of your listing]       |
|                                     |
|  Charizard EX #131/165              |
|  Near Mint | $2,450                 |
|  Shipping: [Free / Buyer Pays v]    |
|                                     |
|  [Add more photos]                  |
|  [Add description (optional)]       |
|                                     |
|  Your fee: $85.75 (3.5%)            |
|  You'll earn: $2,364.25             |
|                                     |
|  +-------------------------------+  |
|  |     PUBLISH LISTING           |  |
|  +-------------------------------+  |
+-------------------------------------+
```

**Total time target: Under 60 seconds from photo to published listing.**

---

## 2.5 Search & Browse

### Design Concept: Filter + Gallery Hybrid

**Search Bar (persistent in header):**
```
[Icon: magnifying glass] Search cards, sets, players, sellers...
```
As you type, a rich dropdown appears with:
- **Cards:** Matching card names with thumbnails and prices
- **Players/Characters:** With card count and avg price
- **Sets:** With set logo and card count
- **Sellers:** With avatar and rating

**Browse Page Layout:**

**Top: Quick Filters (horizontal scrollable pills)**
```
[All] [Pokemon] [Sports] [Magic] [Yu-Gi-Oh] [Graded] [Raw] [Under $50] [Trending]
```

**Below: Advanced Filters (collapsible sidebar on desktop, bottom sheet on mobile)**
```
Category
  [x] Pokemon  [ ] Magic  [ ] Yu-Gi-Oh
  [ ] Baseball [ ] Basketball [ ] Football

Condition
  [x] Near Mint  [x] Lightly Played
  [ ] Moderately Played  [ ] Heavily Played

Grade
  [x] PSA 10  [x] PSA 9  [ ] PSA 8
  [ ] BGS 10  [ ] BGS 9.5

Price Range
  [$0] ----[]---- [$10,000+]

Sort by
  ( ) Newest  (x) Best Match
  ( ) Price: Low to High  ( ) Price: High to Low
  ( ) Most Popular  ( ) Ending Soonest
```

**Main Content: Card Grid**

Two view modes accessible via toggle icons:

**Grid View (default):** 4-column on desktop, 2-column on mobile. Each card tile is a glassmorphism container on the dark background:

```
+-------------------------+
|  [Card image - medium]  |
|  (3D tilt on hover)     |
|                         |
|  PSA 10 | Pop 487       |
|  Charizard EX #131      |
|  SV: Prismatic Evos     |
|                         |
|  $2,450                 |
|  @CardMaster99 [4.98]   |
|  [Buy Now]              |
+-------------------------+
```

**List View:** Single-column cards with more detail:
```
+-------------------------------------------------------------+
| [Thumb] | Charizard EX #131 | PSA 10 | $2,450 | @seller | [Buy] |
|         | SV: Prismatic Evo  | Pop 487 | Mkt: $2,180 |       |       |
+-------------------------------------------------------------+
```

**Infinite scroll** with a "Load more" fallback. As you scroll, cards subtly fade in with a slight upward motion.

---

## 2.6 Inbox / Messaging System

### Design Concept: Clean, Real-Time Chat

**Layout: Two-Panel (like iMessage/Discord)**

**Left Panel: Conversation List**
```
+----------------------------+
| MESSAGES              [New]|
| [Search conversations]     |
|                            |
| [Avatar] @CardMaster99     |
| "Hey, would you take $2.2k|
| for the Charizard?"        |
| 2 min ago          [unread]|
|                            |
| [Avatar] @SlabKing         |
| "Card shipped! Here's the  |
| tracking: ..."             |
| 1 hour ago                 |
|                            |
| [Avatar] @PokeFanatic      |
| "Thanks for the great deal!|
| Left you a review."        |
| Yesterday                  |
+----------------------------+
```

**Right Panel: Conversation Thread**
```
+--------------------------------------------+
| @CardMaster99               [View Profile] |
| Online now | 4.98 rating                   |
|------------------------------------------- |
|                                            |
| [Their message bubble - gray]              |
| "Hey, I saw your Charizard listing.        |
|  Would you consider $2,200?"               |
|                                            |
|                [Your message bubble - purple]|
|                "I can do $2,300. It's a     |
|                 clean PSA 10 with great     |
|                 centering."                 |
|                                            |
| [Card embed: Charizard EX #131 - $2,450]   |
| (clickable card preview with image)         |
|                                            |
| [Their message bubble]                      |
| "Deal! Can you update the listing?"         |
|                                            |
| [QUICK ACTIONS BAR]                         |
| [Send Offer: $2,300] [Share Listing] [...]  |
|                                            |
| [Message input] [Attach] [Send]            |
+--------------------------------------------+
```

**Key Features:**
- **Card embeds:** Share a listing in the chat with a rich preview (image, price, grade).
- **Offer system:** "Send Offer" button creates a formal offer that the other party can accept/decline/counter.
- **Transaction status:** When a sale is in progress, a status bar shows: "Payment Received > Shipped > Delivered > Completed."
- **Quick responses:** Suggested replies like "Still available," "I'll consider it," "Card shipped!"
- **Read receipts and online indicators.**
- **Mobile:** Full-screen conversation view with swipe-back to list.

---

## 2.7 Seller Dashboard

### Design Concept: Analytics-Forward, Dark Theme

**Header Stats Row (glassmorphism cards):**
```
+----------+ +----------+ +----------+ +----------+
| REVENUE  | | ACTIVE   | | AVG SALE | | RATING   |
| $14,230  | | LISTINGS | | $185.40  | | 4.98     |
| +12% MoM | | 47       | | +8% MoM  | | (1,247)  |
+----------+ +----------+ +----------+ +----------+
```

**Revenue Chart:**
Large area chart showing daily/weekly/monthly revenue. Purple fill with gradient. Hover to see individual data points.

**Active Listings Table:**
```
| Image | Card Name | Grade | Price | Views | Watchers | Listed | Actions |
|-------|-----------|-------|-------|-------|----------|--------|---------|
| [img] | Charizard | PSA10 | $2,450| 342   | 18       | 3d ago | [Edit] [Promote] |
| [img] | Pikachu   | Raw   | $45   | 89    | 4        | 1w ago | [Edit] [Promote] |
```

**Pricing Insights:**
- Cards priced above/below market highlighted.
- "Price too high" warning with suggestion.
- "Trending up" indicator for cards gaining value.

**Sections:**
- **Overview** (default) -- stats, charts, recent activity.
- **Active Listings** -- all current listings with management tools.
- **Sales History** -- completed transactions.
- **Earnings** -- payout schedule, balance, withdrawal.
- **Analytics** -- traffic sources, most viewed cards, buyer demographics.
- **Messages** -- link to inbox with unread count badge.

---

# Phase 3: Design System Foundations

## 3.1 Color Palette

### Primary Palette

| Role | Color | Hex | Usage |
|------|-------|-----|-------|
| **Background Primary** | Near Black | `#0A0A0F` | Main app background, header |
| **Background Secondary** | Dark Gray | `#13131A` | Card containers, sidebars |
| **Background Tertiary** | Medium Gray | `#1E1E2A` | Hover states, elevated surfaces |
| **Surface** | Frosted | `rgba(255,255,255,0.05)` | Glassmorphism containers |
| **Surface Hover** | Frosted Light | `rgba(255,255,255,0.08)` | Hover state for surfaces |
| **Border** | Subtle | `rgba(255,255,255,0.1)` | Dividers, card borders |

### Accent Colors

| Role | Color | Hex | Usage |
|------|-------|-----|-------|
| **Primary Accent** | Electric Purple | `#8B5CF6` | CTAs, links, active states, brand color |
| **Primary Hover** | Bright Purple | `#A78BFA` | Hover states for primary |
| **Secondary Accent** | Cyan | `#06B6D4` | Secondary actions, info badges |
| **Success** | Emerald | `#10B981` | Positive changes, confirmations, verified |
| **Warning** | Amber | `#F59E0B` | Warnings, price alerts |
| **Error** | Red | `#EF4444` | Errors, destructive actions |
| **Fee Highlight** | Green | `#34D399` | Fee comparison, savings callouts |

### Text Colors

| Role | Color | Hex |
|------|-------|-----|
| **Text Primary** | White | `#F8FAFC` |
| **Text Secondary** | Light Gray | `#94A3B8` |
| **Text Muted** | Medium Gray | `#64748B` |
| **Text Inverse** | Near Black | `#0F172A` |

### Special Effects

| Effect | Specification |
|--------|--------------|
| **Glassmorphism** | `background: rgba(255,255,255,0.05); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.1);` |
| **Card Glow** | `box-shadow: 0 0 60px rgba(139,92,246,0.15);` (purple glow for featured cards) |
| **Holographic Shimmer** | CSS gradient animation mimicking holographic card surfaces |

### Light Mode (secondary)
While dark mode is default, a light mode should exist for accessibility:
- Background: `#FAFAFA`
- Surface: `#FFFFFF`
- Primary Accent: `#7C3AED` (slightly darker purple for contrast)
- Text: `#0F172A`

---

## 3.2 Typography

### Font Pairing

**Display / Headings:** `"Plus Jakarta Sans"` (Google Fonts)
- Geometric sans-serif with personality
- Weights: Bold (700) for h1-h2, SemiBold (600) for h3-h4
- Tracking: -0.02em for tight, premium feel

**Body / UI:** `"Inter"` (Google Fonts)
- Highly legible, optimized for screens
- Weights: Regular (400) for body, Medium (500) for labels, SemiBold (600) for emphasis
- Features: tabular-nums for prices and numbers

**Monospace (prices, grades, IDs):** `"JetBrains Mono"` (Google Fonts)
- Clean monospace for financial data
- Weight: Medium (500)

### Type Scale

| Element | Font | Size | Weight | Line Height | Tracking |
|---------|------|------|--------|-------------|----------|
| **Display** | Plus Jakarta Sans | 48px / 3rem | 700 | 1.1 | -0.02em |
| **H1** | Plus Jakarta Sans | 36px / 2.25rem | 700 | 1.2 | -0.02em |
| **H2** | Plus Jakarta Sans | 28px / 1.75rem | 700 | 1.25 | -0.01em |
| **H3** | Plus Jakarta Sans | 22px / 1.375rem | 600 | 1.3 | -0.01em |
| **H4** | Plus Jakarta Sans | 18px / 1.125rem | 600 | 1.35 | 0 |
| **Body Large** | Inter | 18px / 1.125rem | 400 | 1.6 | 0 |
| **Body** | Inter | 16px / 1rem | 400 | 1.5 | 0 |
| **Body Small** | Inter | 14px / 0.875rem | 400 | 1.5 | 0 |
| **Caption** | Inter | 12px / 0.75rem | 500 | 1.4 | 0.02em |
| **Price Display** | JetBrains Mono | 28px / 1.75rem | 500 | 1.2 | 0 |
| **Price Inline** | JetBrains Mono | 16px / 1rem | 500 | 1.4 | 0 |
| **Badge** | Inter | 11px / 0.688rem | 600 | 1 | 0.05em |

---

## 3.3 Component Patterns

### Buttons

**Primary (Purple filled):**
```
Background: #8B5CF6
Text: White
Border-radius: 12px
Padding: 12px 24px
Font: Inter SemiBold 16px
Hover: #A78BFA with subtle lift (translateY(-1px))
Active: #7C3AED
Shadow: 0 4px 14px rgba(139,92,246,0.4)
```

**Secondary (Outline):**
```
Background: transparent
Border: 1px solid rgba(255,255,255,0.2)
Text: #F8FAFC
Border-radius: 12px
Hover: background rgba(255,255,255,0.05)
```

**Ghost (Text only):**
```
Background: transparent
Text: #8B5CF6
Hover: text #A78BFA, background rgba(139,92,246,0.1)
```

**Destructive:**
```
Background: transparent
Border: 1px solid #EF4444
Text: #EF4444
Hover: background rgba(239,68,68,0.1)
```

### Card Tile Component

```
Container:
  background: rgba(255,255,255,0.03)
  border: 1px solid rgba(255,255,255,0.06)
  border-radius: 16px
  overflow: hidden
  transition: all 0.3s ease

Hover:
  background: rgba(255,255,255,0.06)
  border-color: rgba(139,92,246,0.3)
  transform: translateY(-4px)
  box-shadow: 0 20px 40px rgba(0,0,0,0.3)

Image area:
  aspect-ratio: 3/4 (portrait, matching card shape)
  background: #0A0A0F
  display: flex
  align-items: center
  justify-content: center

Content area:
  padding: 16px

Grade badge (positioned over image, top-right):
  background: rgba(0,0,0,0.7)
  backdrop-filter: blur(8px)
  border-radius: 8px
  padding: 4px 8px
  font: JetBrains Mono 12px
  color: #10B981
```

### Badge / Tag Component

**Grade Badge:**
```
PSA 10: background #10B981, text white
PSA 9: background #06B6D4, text white
PSA 8: background #F59E0B, text black
Raw: background rgba(255,255,255,0.1), text #94A3B8
```

**Status Badge:**
```
Live: background #EF4444, pulsing animation
Sold: background rgba(255,255,255,0.1), text #64748B
New: background #8B5CF6, text white
Trending: background transparent, border #10B981, text #10B981
```

**User Badges:**
```
Verified: checkmark icon, #10B981
Top Seller: star icon, #F59E0B
Founding Member: diamond icon, #8B5CF6
```

### Input Fields

```
Container:
  background: rgba(255,255,255,0.05)
  border: 1px solid rgba(255,255,255,0.1)
  border-radius: 12px
  padding: 12px 16px
  color: #F8FAFC
  font: Inter 16px

Focus:
  border-color: #8B5CF6
  box-shadow: 0 0 0 3px rgba(139,92,246,0.2)

Placeholder:
  color: #64748B

Error:
  border-color: #EF4444
  box-shadow: 0 0 0 3px rgba(239,68,68,0.2)
```

### Modal / Dialog

```
Overlay:
  background: rgba(0,0,0,0.7)
  backdrop-filter: blur(8px)

Container:
  background: #13131A
  border: 1px solid rgba(255,255,255,0.1)
  border-radius: 20px
  padding: 32px
  max-width: 560px
  box-shadow: 0 25px 50px rgba(0,0,0,0.5)
  animation: slideUp 0.3s ease
```

### Toast / Notification

```
Container:
  background: #1E1E2A
  border: 1px solid rgba(255,255,255,0.1)
  border-radius: 12px
  padding: 16px 20px
  box-shadow: 0 10px 40px rgba(0,0,0,0.4)

  (left border accent color based on type):
  Success: 3px left border #10B981
  Error: 3px left border #EF4444
  Info: 3px left border #06B6D4
  Warning: 3px left border #F59E0B

Animation:
  Enter from bottom-right, slide up with fade
  Auto-dismiss after 5s with progress bar
```

---

## 3.4 Animation & Motion Principles

### Core Principles

1. **Cards are alive.** Cards should never feel flat or static. Even in a grid, subtle hover effects (3D tilt, glow increase, shadow deepen) make the experience feel premium.

2. **Motion communicates meaning.** Animations should reinforce the action: items sliding into a cart, price changes with number-rolling animations, successful purchase with a satisfying "pop."

3. **Performance first.** Use CSS transforms and opacity for animations (GPU-accelerated). Avoid layout-triggering properties. Use `will-change` sparingly.

4. **Respect reduced motion.** All animations should be wrapped in `@media (prefers-reduced-motion: no-preference)` and have static fallbacks.

### Specific Animations

**3D Card Tilt (hover):**
```
transform: perspective(1000px) rotateX(var(--rotateX)) rotateY(var(--rotateY));
transition: transform 0.1s ease;
-- Uses mousemove event to calculate rotation based on cursor position
-- Max rotation: 15deg on each axis
-- Add holographic gradient overlay that shifts with tilt
```

**3D Card Viewer (product page):**
```
-- Three.js or React Three Fiber for full 3D rendering
-- Card as a plane geometry with front/back textures
-- Environment map for realistic reflections
-- Animated spotlight that follows card rotation
-- Particle system for dust/light effects (subtle, performance-gated)
-- Auto-rotation: 0.2deg/frame on Y-axis when idle
```

**Page Transitions:**
```
-- Fade + slide between pages: 300ms ease
-- Card grid items: staggered fade-in, 50ms delay between each
-- Filter changes: smooth height/opacity transitions for results
```

**Micro-interactions:**
```
-- Button press: scale(0.97) for 100ms, then back
-- Heart/favorite: scale bounce + color fill animation
-- Price change: number rolls to new value
-- Badge earned: confetti burst + scale pop
-- Listing published: card flies from form into grid position
```

**Loading States:**
```
-- Skeleton screens with shimmer animation (not spinners)
-- Card grid skeletons match card tile aspect ratio
-- Purple shimmer gradient sweeps across skeleton elements
```

### Easing Functions
- **Standard:** `cubic-bezier(0.4, 0, 0.2, 1)` -- for most transitions
- **Enter:** `cubic-bezier(0, 0, 0.2, 1)` -- for elements appearing
- **Exit:** `cubic-bezier(0.4, 0, 1, 1)` -- for elements leaving
- **Bounce:** `cubic-bezier(0.34, 1.56, 0.64, 1)` -- for playful interactions (badges, achievements)

### Duration Guidelines
- **Instant feedback:** 100ms (button press, toggle)
- **Quick transitions:** 200ms (hover effects, color changes)
- **Standard transitions:** 300ms (page transitions, modals)
- **Emphasis animations:** 500ms (card flip, achievement pop)
- **Complex animations:** 800ms-1200ms (3D card entrance, listing publish)

---

## 3.5 Responsive Breakpoints

| Breakpoint | Name | Min Width | Columns | Card Grid |
|------------|------|-----------|---------|-----------|
| **xs** | Mobile S | 0px | 1 | 1 card |
| **sm** | Mobile L | 480px | 2 | 2 cards |
| **md** | Tablet | 768px | 2-3 | 3 cards |
| **lg** | Desktop | 1024px | 3-4 | 4 cards |
| **xl** | Desktop L | 1280px | 4 | 4 cards |
| **2xl** | Desktop XL | 1536px | 4-5 | 5 cards |

### Mobile-First Approach
- All CSS starts with mobile layout.
- Progressively enhance for larger screens.
- Touch targets: minimum 44x44px.
- Swipe gestures for carousels, card navigation, and back.
- Bottom navigation bar on mobile (Home, Browse, List, Inbox, Profile).
- Sticky "Buy Now" bar on mobile product pages.

### Container Widths
```css
.container {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 16px; /* mobile */
}

@media (min-width: 768px) {
  .container { padding: 0 24px; }
}

@media (min-width: 1024px) {
  .container { padding: 0 32px; }
}
```

---

## 3.6 Iconography

**Style:** Line icons, 1.5px stroke weight, rounded caps/joins. Consistent with the modern, clean aesthetic.

**Icon Library:** Lucide Icons (open source, consistent style, React components available).

**Custom Icons Needed:**
- Card grade badges (PSA, BGS, CGC logos stylized)
- Sport category icons (matching Alt's approach but unique style)
- TCG game logos (Pokemon, Magic, etc. -- use official where licensed)
- Gamification badges (custom illustrations)
- 3D viewer controls (rotate, flip, zoom, AR)

**Icon Sizes:**
- 16px: Inline with text, badges
- 20px: Navigation items, buttons
- 24px: Primary navigation, card actions
- 32px: Empty states, feature callouts
- 48px: Category icons, onboarding

---

## 3.7 Spacing System

Based on a 4px grid:

| Token | Value | Usage |
|-------|-------|-------|
| `space-0` | 0px | No spacing |
| `space-1` | 4px | Tight inline spacing |
| `space-2` | 8px | Between related elements |
| `space-3` | 12px | Padding inside small components |
| `space-4` | 16px | Standard padding, card gap (mobile) |
| `space-5` | 20px | Section margins |
| `space-6` | 24px | Card gap (desktop), section padding |
| `space-8` | 32px | Section separation |
| `space-10` | 40px | Page section spacing |
| `space-12` | 48px | Major section separation |
| `space-16` | 64px | Page-level vertical rhythm |
| `space-20` | 80px | Hero sections |

---

## 3.8 Shadow System

| Token | Value | Usage |
|-------|-------|-------|
| `shadow-sm` | `0 1px 2px rgba(0,0,0,0.3)` | Subtle depth |
| `shadow-md` | `0 4px 12px rgba(0,0,0,0.3)` | Cards, dropdowns |
| `shadow-lg` | `0 12px 32px rgba(0,0,0,0.4)` | Modals, elevated cards |
| `shadow-xl` | `0 20px 50px rgba(0,0,0,0.5)` | Featured elements |
| `shadow-glow-purple` | `0 0 40px rgba(139,92,246,0.2)` | Featured card glow |
| `shadow-glow-green` | `0 0 30px rgba(16,185,129,0.15)` | Success/verified glow |

---

## Appendix A: Design Principles Summary

1. **Cards are the hero.** Every design decision should make cards look their best. Dark backgrounds, dramatic lighting, 3D effects.

2. **Transparency builds trust.** Fees, prices, market data, seller history -- everything is visible. No hidden costs, no surprises.

3. **Simplicity is power.** Listing a card should take seconds, not minutes. Buying should be one click. Searching should be intuitive.

4. **Community is core.** Profiles, DMs, collections, badges, streaks -- these aren't features, they're the fabric of the platform.

5. **Mobile-native.** Design for thumbs first, then adapt for desktop. Touch targets, swipe gestures, bottom navigation.

6. **Data-informed discovery.** Market trends, price history, and popularity signals help users make better buying and selling decisions.

7. **Delight in details.** Micro-animations, holographic effects, achievement pops, confetti -- small moments of joy that make the experience memorable.

---

## Appendix B: Competitive Positioning Map

```
                    PREMIUM / LUXURY
                         |
                    Goldin
                         |
              Alt        |
                \        |
     TRADITIONAL --------+-------- MODERN
                /        |        \
          COMC  /        |         \ CardVault (us)
               /   eBay  |   StockX
              /          |
        TCGPlayer        |
                         |
                    Whatnot
                         |
                    VALUE / VOLUME
```

**Our position:** Modern + Premium-leaning. We combine Alt's fintech aesthetic with Whatnot's community energy, TCGPlayer's card-specific depth, and StockX's clean marketplace UX. The 3D card viewer and AI listing flow are unique category differentiators that no competitor offers.

---

## Appendix C: Next Steps

1. **Wireframes:** Convert these concepts into low-fidelity wireframes for each screen.
2. **Figma Design System:** Build the component library in Figma based on the design tokens above.
3. **3D Card Viewer Prototype:** Build a Three.js/React Three Fiber proof of concept for the card viewer.
4. **AI Listing Flow Prototype:** Mock the AI identification and pricing flow.
5. **User Testing:** Test the listing creation flow with 5-10 card sellers.
6. **Brand Identity:** Finalize name, logo, and full brand guidelines.
7. **Technical Architecture:** Define the frontend framework (Next.js recommended), 3D rendering approach, and mobile strategy (PWA vs. native).
