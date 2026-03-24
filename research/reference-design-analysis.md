# Reference Design Analysis: "Collector" Platform

**Sources:** `Trove Site Design.mp4` (33s), `animated grid.mp4` (15.5s), `User Track & Mint.mp4` (24.5s)
**Frames analyzed:** 146 total at 0.5s intervals
**Date:** March 23, 2026

---

## Platform Overview

The reference is **CollectorCrypt** — a card collector platform with NFT minting capabilities. While Trove won't have NFT/minting features, the visual design language, UI patterns, and animation approach are exactly what we want to adopt.

---

## 1. Color System

| Token | Hex | Usage |
|-------|-----|-------|
| Background | `#0A0A0A` | Pure black, page bg |
| Surface | `#141414` | Cards, panels, modals |
| Surface elevated | `#1C1C26` | Dropdowns, inner cards |
| Border | `#2A2A3A` | Subtle panel borders |
| Primary accent | `#F97316` | CTAs, progress bars, badges, brand color |
| Secondary accent | `#06B6D4` | Values, insurance badges, counts |
| Success | `#22C55E` | Checkmarks, "Ready" states, verification |
| Warning/Ineligible | `#F59E0B` | "Not Eligible" badges |
| Text primary | `#FAFAFA` | Headings, body |
| Text secondary | `#A1A1AA` | Labels, metadata |
| Gradient (hero) | Orange → Purple | Diagonal, landing page bg |
| Showcase bg | `#00FF66` | Bright green, portfolio/overview screens |

### Color Usage Rules
- **Orange** is the dominant brand color — every interactive element, progress indicator, and CTA
- **Teal/cyan** is reserved for numerical values (card counts, insurance values, prices)
- **Green** only for success states (checkmarks, "Ready for Mint", verified)
- **Dark surfaces** create maximum contrast with card imagery
- **Colored backgrounds** (orange, cyan, yellow, green) used in bento-grid panels to make cards pop

---

## 2. Typography

| Context | Style |
|---------|-------|
| Page titles ("MY CARDS", "DASHBOARD") | Bold, uppercase, large (36-48px), white |
| Section headings ("TRACKING DETAILS") | Bold, uppercase, medium (20-24px) |
| Feature labels ("SHIPPING IDENTIFIER") | Bold, uppercase, extra-large (32px+) |
| Success messages | Decorative/serif font, large centered |
| Body text | Regular weight, `#A1A1AA` secondary color |
| Values/numbers | Bold, large, often with teal badge |
| Table headers | Uppercase, small, `#A1A1AA` |
| Button text | Uppercase, bold, tracked |

---

## 3. Key Screens & Layouts

### 3a. Hero / Landing — Diagonal Card Carousel
- PSA-graded slabs arranged at ~30° diagonal angle in a continuous row
- Cards include Pokemon, sports, vintage — mixed categories
- Orange-to-purple diagonal gradient background
- Hand cursor icon centered (suggests interactivity)
- **Parallax scrolling** — cards move at different speeds as user scrolls
- This is THE signature visual of the platform

### 3b. Card Detail Page
- **Left panel:** Large card image with PSA label overlay
- **Right panel:** Card metadata
  - Title (full card name, large bold)
  - Insurance value in teal badge (e.g., "4,500")
  - Metadata grid: Owned by, Year, Category, Autographed
  - Expandable "Details" section
- **Below:** PRICE HISTORY chart
  - Clean line chart, white line on dark bg
  - Orange dots at data points
  - "Average price" in orange badge
  - "All time" dropdown for time range
  - Minimal axis labels

### 3c. Dashboard
- "DASHBOARD" title with wallet address + avatar
- **Two-column layout:**
  - Left: **COLLECTION STATISTIC** card
    - Total cards count (large number)
    - Estimated collection value (large number)
    - Mini sparkline charts next to each
    - "VIEW COLLECTION →" CTA
  - Right: **MOST RECENT ACTIVITY** feed
    - Color-coded dot indicators (orange=minting, green=shipping, gray=profile)
    - Activity description text
    - "VIEW ACTIVITY →" link
- **Below:** "FEATURED CARDS" section

### 3d. My Cards / Shipments
- Page title: "MY CARDS" (large bold)
- **Tab bar:** All Cards | IRL | [hidden] | My Shipments | Burnt | Archive
  - Active tab has orange underline
- **Filter pills:** Active | Past | Drafts (checkbox-style)
- **Status badge:** Green pill ("PROCESSING", "READY FOR MINT", "COMPLETE")
- **Shipping address** with tracking number
- **Edit Shipment / Cancel Shipment** buttons (outlined)

### 3e. Shipping Progress Tracker
- **Horizontal stepper** with stages:
  - TRACKING# → IN TRANSIT → RECEIVED → PROCESSING → READY FOR MINT → COMPLETE
- Orange dots connected by lines
- Filled/active stages are solid orange
- Upcoming stages are gray/empty
- Progress fills left-to-right as status advances

### 3f. List of Items Table
- Search input with placeholder
- Action button ("MINT pNFTS" — we'd use "LIST FOR SALE" etc.)
- **Table columns:** IMAGE | NAME | CATEGORY | VALUE | # | STATUS
- Card thumbnails on left
- Status column has colored pill buttons:
  - "Ready for Mint" → green/teal
  - "Not Eligible" → orange/yellow
- Clean dark rows with subtle borders

### 3g. Shipping Identifier Modal
- Dark overlay modal
- Large QR code centered
- "PRINT" and "DOWNLOAD" action buttons
- "DONE" dismiss button
- Purpose: physical-to-digital bridge for shipment identification

### 3h. Success Screens
- Large centered green checkmark in dark circle
- Bold text: "SHIPMENT CREATED SUCCESSFULLY" or "Items were successfully minted"
- Decorative/serif font for celebration
- Two CTA buttons below
- **Floating PSA-graded cards** scattered at angles in dark background
- Footer with social icons + legal links

---

## 4. Animation Patterns

### 4a. Bento Grid Transitions (from `animated grid.mp4`)
The signature animation: grid layouts that dramatically morph between configurations.

**3 Grid Layouts that cycle:**

1. **Layout A — 3-Panel Asymmetric**
   - Top-left: PSA card on orange bg with price chart overlay
   - Top-right: Real photo of card being held
   - Bottom-left: Feature panel on cyan bg (Shipping Identifier + QR)

2. **Layout B — 2-Panel 50/50**
   - Left: Large card on dark bg with themed wallpaper (Pokéball pattern)
   - Right: Orange bg with dark UI cards (Shipment Summary, Ship To)

3. **Layout C — 4-Panel Equal Grid**
   - Top-left: Payment UI on yellow starburst bg
   - Top-right: Real photo (Game Boy cartridges — nostalgia)
   - Bottom-left: Stacked PSA slabs on bright green bg
   - Bottom-right: Card on illustrated wave pattern bg

**Transition animation:**
- All panels scale down simultaneously to tiny points near center
- Screen goes pure black for ~0.3s
- New layout panels expand outward from those points
- Total transition: ~0.5-0.7s
- Creates dramatic, cinematic feel
- Loop is seamless

**Key principle:** Each panel has its own bold background color/pattern. Never flat dark. The dark UI elements (cards, buttons) float ON TOP of these colored backgrounds.

### 4b. Shipping Progress Animation (from Trove Site Design)
- Diagonal dotted line with orange dots appearing one by one
- Location pin icon slides along the path
- Stage labels ("TRACKING#", "IN TRANSIT", "PROCESSING", "READY FOR MINT", "COMPLETE") are positioned diagonally along the path
- Labels are orange rounded pills with bold uppercase text
- Smooth, continuous animation
- Very cinematic close-up view during the animation sequence

### 4c. Dashboard/Page Transitions
- Smooth scroll between sections
- Content fades/slides in as user navigates
- Loading states show orange spinner on dark bg

### 4d. Floating Card Backgrounds
- PSA-graded cards scattered at various angles around the viewport
- Cards are slightly blurred or at lower opacity to not compete with main content
- Creates depth and excitement
- Used on: success screens, behind browser mockups, landing areas

### 4e. Card Carousel Parallax
- Cards at ~30° angle move at different speeds
- Front cards move faster, back cards slower
- Creates 3D depth illusion without actual 3D rendering
- Hand cursor suggests drag-to-browse interaction

---

## 5. UI Component Patterns

### Navigation Bar
- Dark bg (`#141414`)
- Logo left (brand icon + "COLLECTOR" text)
- Nav links center: Dashboard | Collection | Marketplace
- Two CTA buttons right: "VERIFY pNFT" (outline), "MINT pNFT" (filled orange)
- User avatar + notification icon far right

### Status Badges
- Colored pill shapes with bold text
- Green: Active/success states
- Orange: Processing/warning
- Teal: Information/values

### Buttons
- **Primary:** Filled orange bg, bold uppercase white text
- **Secondary:** Dark bg with white border (outlined), uppercase text
- **Danger/Cancel:** Dark with subtle styling
- All buttons have rounded corners (~8px)

### Cards/Panels
- Dark bg (`#141414` to `#1C1C26`)
- Subtle border (`#2A2A3A`)
- Rounded corners (~12px)
- Internal padding generous (~24px)

### Tables
- Dark rows with very subtle borders
- No alternating row colors
- Thumbnail images aligned left
- Action buttons in status column
- Column headers uppercase, small, muted

### Modals
- Dark overlay (50-70% opacity black)
- Dark panel centered
- Large content area
- Action buttons at bottom

---

## 6. What Trove Should Adopt

### Directly Adopt
1. **Pure black background** with dark surface cards — maximum card contrast
2. **Orange as primary brand accent** — CTAs, progress, active states
3. **Teal/cyan for values** — prices, counts, insurance badges
4. **Bold uppercase headings** — creates premium, authoritative feel
5. **Horizontal stepper** for order/shipping tracking flow
6. **Diagonal card carousel** for hero section (adapt for 3D cards)
7. **Bento grid animated transitions** for homepage feature showcase
8. **Floating card backgrounds** on success/celebration screens
9. **Price history chart** style (dark bg, white line, orange dots)
10. **Dashboard layout** (collection stats + activity feed)
11. **Tab bar with orange underline** for active state
12. **Table layout** for inventory/listing management
13. **Success screen pattern** (checkmark + floating cards + dual CTAs)
14. **QR code / shipping identifier** concept for our escrow flow

### Adapt for Trove
1. Replace "MINT pNFT" / "VERIFY pNFT" with "LIST FOR SALE" / "AI IDENTIFY"
2. Replace minting flow with listing/selling flow
3. Add 3D card viewer (our unique differentiator) where they show flat images
4. Replace wallet connection with Stripe Connect seller onboarding
5. Replace "Burnt" / "Archive" tabs with "Sold" / "Watchlist"
6. Keep the shipping tracker but adapt for buyer-seller escrow flow
7. Use our violet (`#7C5CFC`) alongside their orange — or consider switching our primary to orange for stronger visual impact

### Avoid
1. NFT/blockchain terminology
2. The bright green (`#00FF66`) showcase background — too loud
3. Generic placeholder text in mockups
4. Overly busy floating card backgrounds that distract from content

---

## 7. Animation Implementation Priority

| Priority | Animation | Where | Complexity |
|----------|-----------|-------|------------|
| P0 | Diagonal card carousel (parallax) | Homepage hero | Medium — CSS transforms + scroll handler |
| P0 | Horizontal progress stepper | Order tracking | Low — CSS transitions |
| P1 | Bento grid morph transitions | Homepage features | High — Framer Motion layout animations |
| P1 | Floating card backgrounds | Success screens | Medium — CSS animations with random positioning |
| P2 | Shipping dotted-line animation | Order detail | Medium — SVG path animation |
| P2 | Page/section transitions | Global | Low — Framer Motion page transitions |
| P3 | Loading spinners (orange) | Data fetching | Low — CSS animation |

---

## 8. Revised Design System Recommendation

Based on this analysis, I recommend updating Trove's color palette:

```
Background:       #0A0A0A (pure black — matches reference exactly)
Surface:          #141414 (dark panels)
Surface elevated: #1C1C26 (modals, dropdowns)
Border:           #2A2A3A (subtle)
Primary accent:   #F97316 (orange — matches reference, stronger than our violet)
Secondary accent: #06B6D4 (teal — for values, prices)
Tertiary accent:  #7C5CFC (violet — for premium/special elements only)
Success:          #22C55E
Warning:          #F59E0B
Error:            #FF4757
Text primary:     #FAFAFA
Text secondary:   #A1A1AA
```

**Consider:** Making orange the primary and violet the secondary gives us the same bold, high-energy feel as the reference while keeping violet for special/premium card effects (holofoil shaders, rare card badges).
