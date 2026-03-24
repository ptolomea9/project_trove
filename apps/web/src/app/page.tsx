import { Header } from "@/components/layout/Header";
import { HeroSequence } from "@/components/hero/HeroSequence";
import { HoverCard3D } from "@/components/cards/HoverCard3D";
import { InteractiveCard } from "@/components/cards/InteractiveCard";
import { GradientButton } from "@/components/ui/gradient-button";
import { GlowCard } from "@/components/ui/spotlight-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Zap,
  Shield,
  TrendingDown,
  Camera,
  Eye,
  DollarSign,
  ChevronRight,
  BarChart3,
  RotateCcw,
  ZoomIn,
  ScanSearch,
  Timer,
  ArrowRight,
} from "lucide-react";

const CATEGORIES = [
  { name: "Pokemon", count: "2.4M+", accent: "border-yellow-500/30 hover:border-yellow-500/60 hover:bg-yellow-500/5" },
  { name: "Magic: The Gathering", count: "1.8M+", accent: "border-blue-500/30 hover:border-blue-500/60 hover:bg-blue-500/5" },
  { name: "Yu-Gi-Oh!", count: "900K+", accent: "border-purple-500/30 hover:border-purple-500/60 hover:bg-purple-500/5" },
  { name: "Sports Cards", count: "3.1M+", accent: "border-green-500/30 hover:border-green-500/60 hover:bg-green-500/5" },
  { name: "One Piece", count: "450K+", accent: "border-red-500/30 hover:border-red-500/60 hover:bg-red-500/5" },
  { name: "Lorcana", count: "320K+", accent: "border-cyan-500/30 hover:border-cyan-500/60 hover:bg-cyan-500/5" },
];

const BENTO_PANELS = [
  {
    title: "3D Visualization",
    description: "Rotate, zoom, and inspect every card in cinematic detail",
    bg: "from-orange-600/80 to-orange-900/80",
    bgPattern: "bg-[radial-gradient(circle_at_30%_70%,rgba(255,255,255,0.1)_0%,transparent_50%)]",
    span: "sm:col-span-2",
    icon: null as null,
    labels: ["Rotate", "Zoom", "Inspect"],
    labelIcons: [RotateCcw, ZoomIn, ScanSearch],
  },
  {
    title: "AI Card Scanner",
    description: "Snap a photo and let AI do the rest",
    bg: "from-cyan-600/80 to-cyan-900/80",
    bgPattern: "bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.08)_0%,transparent_50%)]",
    span: "",
    icon: Camera,
    labels: ["Snap", "Identify", "Price"],
    labelIcons: null as null,
  },
  {
    title: "Lowest Fees",
    description: "Keep more of what you earn",
    bg: "from-green-600/80 to-green-900/80",
    bgPattern: "bg-[radial-gradient(circle_at_50%_80%,rgba(255,255,255,0.08)_0%,transparent_50%)]",
    span: "",
    icon: TrendingDown,
    labels: null as null,
    labelIcons: null as null,
    feeTable: true,
  },
  {
    title: "Escrow Protection",
    description: "Both sides protected, every transaction",
    bg: "from-purple-600/80 to-purple-900/80",
    bgPattern: "bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.08)_0%,transparent_50%)]",
    span: "",
    icon: Shield,
    labels: null as null,
    labelIcons: null as null,
    badges: ["Buyer Protected", "Seller Protected"],
  },
  {
    title: "30-Second Listing",
    description: "From photo to live listing in moments",
    bg: "from-yellow-600/80 to-yellow-900/80",
    bgPattern: "bg-[radial-gradient(circle_at_20%_50%,rgba(255,255,255,0.08)_0%,transparent_50%)]",
    span: "",
    icon: Timer,
    labels: ["Upload", "AI", "Live"],
    labelIcons: null as null,
  },
  {
    title: "Price Tracking",
    description: "Real-time market data and trend alerts",
    bg: "from-teal-600/80 to-teal-900/80",
    bgPattern: "bg-[radial-gradient(circle_at_60%_40%,rgba(255,255,255,0.08)_0%,transparent_50%)]",
    span: "sm:col-span-2",
    icon: BarChart3,
    labels: null as null,
    labelIcons: null as null,
    chart: true,
  },
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0A0A0A] text-white">
      <Header />

      {/* ══════════════════════════════════════════════════════
          SECTION 1 — HERO: Sequenced Animation
      ══════════════════════════════════════════════════════ */}
      <HeroSequence />

      {/* ══════════════════════════════════════════════════════
          SECTION 2 — FEATURED CARD SHOWCASE (CSS 3D)
      ══════════════════════════════════════════════════════ */}
      <section className="relative bg-[#0A0A0A] py-28 overflow-hidden">
        {/* Ambient glows */}
        <div className="absolute top-1/2 left-[20%] -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,_rgba(249,115,22,0.07),_transparent_60%)] pointer-events-none" />
        <div className="absolute top-1/3 right-[10%] w-[400px] h-[400px] bg-[radial-gradient(circle,_rgba(6,182,212,0.04),_transparent_60%)] pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
          <div className="grid gap-12 lg:grid-cols-[420px_1fr] items-center">
            {/* Interactive 3D Card — drag to rotate, scroll to zoom */}
            <div className="relative max-w-sm mx-auto">
              {/* Glow ring behind card */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-72 h-96 rounded-3xl bg-orange-500/10 blur-3xl" />
              </div>
              <InteractiveCard
                imageUrl="/cards/demo-lugia.png"
                isHolo
              />
            </div>

            {/* Card details */}
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-orange-500 font-semibold mb-2">
                Featured Card
              </p>
              <h2 className="text-4xl font-black uppercase tracking-tight">
                Lugia VSTAR
              </h2>
              <p className="text-sm text-zinc-500 mt-1">
                Crown Zenith &middot; #160 &middot; Secret Rare
              </p>

              <div className="mt-8 grid grid-cols-3 gap-3">
                {[
                  { label: "Market Price", value: "$42.50", color: "text-white", border: "border-white/10 hover:border-orange-500/30", glow: "hover:shadow-orange-500/10", tilt: "rotate-[-1deg] hover:rotate-0" },
                  { label: "Condition", value: "NM", color: "text-cyan-400", border: "border-cyan-500/20 hover:border-cyan-500/40", glow: "hover:shadow-cyan-500/10", tilt: "rotate-[0.5deg] hover:rotate-0" },
                  { label: "Rarity", value: "Secret", color: "text-white", border: "border-white/10 hover:border-purple-500/30", glow: "hover:shadow-purple-500/10", tilt: "rotate-[1deg] hover:rotate-0" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className={`rounded-xl border bg-white/[0.03] p-4 transition-all duration-300 hover:bg-white/[0.06] hover:scale-[1.05] hover:shadow-xl ${stat.border} ${stat.glow} ${stat.tilt}`}
                  >
                    <p className="text-[10px] text-zinc-500 uppercase tracking-wider">{stat.label}</p>
                    <p className={`text-2xl font-black mt-1 tabular-nums ${stat.color}`}>{stat.value}</p>
                  </div>
                ))}
              </div>

              {/* Price trend line */}
              <div className="mt-4 rounded-xl border border-white/5 bg-white/[0.02] p-4 transition-all duration-300 hover:border-cyan-500/20 hover:shadow-lg hover:shadow-cyan-500/5">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[10px] text-zinc-500 uppercase tracking-wider">30-Day Trend</p>
                  <p className="text-xs font-bold text-green-400">+12.4%</p>
                </div>
                <svg viewBox="0 0 200 40" className="w-full h-8 text-cyan-500">
                  <polyline
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points="0,35 15,30 30,32 50,25 70,28 90,20 110,22 130,15 150,18 170,10 190,12 200,8"
                  />
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgb(6,182,212)" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="rgb(6,182,212)" stopOpacity="0" />
                  </linearGradient>
                  <polygon
                    fill="url(#chartGradient)"
                    points="0,35 15,30 30,32 50,25 70,28 90,20 110,22 130,15 150,18 170,10 190,12 200,8 200,40 0,40"
                  />
                </svg>
              </div>

              <div className="mt-6 flex gap-3">
                <GradientButton className="text-sm px-8">
                  Buy Now
                </GradientButton>
                <Button variant="outline" className="h-11 px-6 border-white/10 hover:bg-white/5 hover:border-white/20 cursor-pointer rounded-lg transition-all duration-300">
                  Make Offer
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 3 — ANIMATED BENTO GRID
      ══════════════════════════════════════════════════════ */}
      <section className="py-28 border-t border-white/[0.03] relative bg-gradient-to-b from-[#0A0A0A] via-[#0D0B08] to-[#0A0A0A]">
        {/* Section ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[radial-gradient(ellipse,_rgba(249,115,22,0.06),_transparent_70%)] pointer-events-none" />
        {/* Warm side glow */}
        <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-[radial-gradient(circle,_rgba(234,88,12,0.04),_transparent_60%)] pointer-events-none" />

        {/* Decorative card peeking from left */}
        <div className="absolute top-[20%] -left-6 w-28 opacity-[0.12] rotate-[-18deg] pointer-events-none select-none z-0 hidden lg:block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://images.pokemontcg.io/swsh12pt5/160.png" alt="" loading="lazy" aria-hidden="true" draggable={false} className="w-full drop-shadow-2xl" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
          <div className="text-center mb-16">
            <p className="text-[10px] uppercase tracking-[0.3em] text-orange-500 font-semibold mb-3">
              Features
            </p>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">
              Built Different
            </h2>
            <p className="mt-3 text-sm text-zinc-500 max-w-md mx-auto">
              Every feature designed to make trading cards faster, safer, and more beautiful.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {BENTO_PANELS.map((panel, panelIdx) => {
              /* The first panel (3D Visualization) gets the orange pop treatment */
              const isPopPanel = panelIdx === 0;
              /* Rotation classes for each panel to create playful tilt */
              const rotations = ["rotate-[-1.5deg]", "rotate-[1deg]", "rotate-[-0.5deg]", "rotate-[1.5deg]", "rotate-[-1deg]", "rotate-[0.5deg]"];
              const hoverRotations = ["hover:rotate-[0.5deg]", "hover:rotate-[-0.5deg]", "hover:rotate-[0.5deg]", "hover:rotate-[-0.5deg]", "hover:rotate-[0.5deg]", "hover:rotate-[-0.5deg]"];
              return (
                <GlowCard
                  key={panel.title}
                  glowColor={isPopPanel ? "orange" : "purple"}
                  className={`group transition-all duration-500 hover:scale-[1.05] hover:shadow-2xl hover:-translate-y-1 ${panel.span} min-h-[260px] ${rotations[panelIdx]} ${hoverRotations[panelIdx]} ${isPopPanel ? "hover:shadow-orange-500/30" : "hover:shadow-black/50"} !p-0 overflow-hidden`}
                >
                  {/* Background: pop panel gets bright orange, others keep gradient */}
                  {isPopPanel ? (
                    <div className="absolute inset-0 bg-orange-500 transition-all duration-500 group-hover:brightness-110" />
                  ) : (
                    <>
                      <div className={`absolute inset-0 bg-gradient-to-br ${panel.bg} transition-all duration-500 group-hover:brightness-125`} />
                      <div className={`absolute inset-0 ${panel.bgPattern}`} />
                    </>
                  )}

                  {/* Glowing border on hover */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ boxShadow: isPopPanel ? "inset 0 0 0 2px rgba(0,0,0,0.2), 0 0 60px rgba(249,115,22,0.3)" : "inset 0 0 0 1px rgba(255,255,255,0.15), 0 0 40px rgba(249,115,22,0.1)" }} />

                  {/* Noise texture overlay */}
                  <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }} />

                  {/* Dark floating card */}
                  <div className={`relative z-10 h-full p-6 flex flex-col justify-between ${isPopPanel ? "text-black" : ""}`}>
                    <div>
                      {panel.icon && (
                        <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl backdrop-blur-sm border mb-4 ${isPopPanel ? "bg-black/20 border-black/20" : "bg-black/40 border-white/10"}`}>
                          <panel.icon className={`h-5 w-5 ${isPopPanel ? "text-black" : "text-white"}`} />
                        </div>
                      )}
                      <h3 className={`font-black text-lg uppercase tracking-wide mb-1 ${isPopPanel ? "text-black" : "text-white"}`}>
                        {panel.title}
                      </h3>
                      <p className={`text-sm leading-relaxed ${isPopPanel ? "text-black/70" : "text-white/70"}`}>
                        {panel.description}
                      </p>
                    </div>

                    {/* 3D Visualization — label pills */}
                    {panel.labels && panel.labelIcons && (
                      <div className="mt-4 flex gap-2 flex-wrap">
                        {panel.labels.map((label, idx) => {
                          const LabelIcon = panel.labelIcons![idx];
                          return (
                            <div
                              key={label}
                              className={`inline-flex items-center gap-1.5 rounded-lg backdrop-blur-sm border px-3 py-1.5 text-xs font-bold ${isPopPanel ? "bg-black/20 border-black/20 text-black" : "bg-black/50 border-white/10 text-white/90"}`}
                            >
                              <LabelIcon className="h-3.5 w-3.5" />
                              {label}
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* AI Scanner — step flow */}
                    {panel.labels && !panel.labelIcons && (
                      <div className="mt-4 flex items-center gap-2">
                        {panel.labels.map((label, idx) => (
                          <div key={label} className="flex items-center gap-2">
                            <div className="rounded-lg bg-black/50 backdrop-blur-sm border border-white/10 px-3 py-1.5 text-xs font-bold text-white/90">
                              {label}
                            </div>
                            {idx < panel.labels!.length - 1 && (
                              <ArrowRight className="h-3 w-3 text-white/40" />
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Lowest Fees — fee table */}
                    {"feeTable" in panel && panel.feeTable && (
                      <div className="mt-4 space-y-1.5">
                        <div className="flex items-center justify-between rounded-lg bg-black/50 backdrop-blur-sm border border-white/10 px-3 py-2">
                          <span className="text-xs font-bold text-white">Trove</span>
                          <span className="text-sm font-black text-green-400">3-5%</span>
                        </div>
                        <div className="flex items-center justify-between rounded-lg bg-black/30 backdrop-blur-sm border border-white/5 px-3 py-1.5 opacity-50">
                          <span className="text-[11px] text-white/60">TCGPlayer</span>
                          <span className="text-xs line-through text-white/40">13.25%</span>
                        </div>
                        <div className="flex items-center justify-between rounded-lg bg-black/30 backdrop-blur-sm border border-white/5 px-3 py-1.5 opacity-50">
                          <span className="text-[11px] text-white/60">eBay</span>
                          <span className="text-xs line-through text-white/40">13.55%</span>
                        </div>
                      </div>
                    )}

                    {/* Escrow — badges */}
                    {"badges" in panel && panel.badges && (
                      <div className="mt-4 flex gap-2 flex-wrap">
                        {panel.badges.map((badge) => (
                          <div
                            key={badge}
                            className="inline-flex items-center gap-1.5 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 px-3 py-1.5 text-xs font-semibold text-white/90"
                          >
                            <Shield className="h-3 w-3 text-purple-300" />
                            {badge}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Price Tracking — mini chart */}
                    {"chart" in panel && panel.chart && (
                      <div className="mt-4 rounded-xl bg-black/40 backdrop-blur-sm border border-white/10 p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] text-white/50 uppercase tracking-wider">Market Index</span>
                          <span className="text-xs font-bold text-cyan-400">+8.2%</span>
                        </div>
                        <svg viewBox="0 0 200 40" className="w-full h-8 text-cyan-400">
                          <polyline
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            points="0,30 20,28 40,32 60,20 80,24 100,15 120,18 140,12 160,16 180,8 200,10"
                          />
                          <linearGradient id="bentoChart" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="rgb(34,211,238)" stopOpacity="0.2" />
                            <stop offset="100%" stopColor="rgb(34,211,238)" stopOpacity="0" />
                          </linearGradient>
                          <polygon
                            fill="url(#bentoChart)"
                            points="0,30 20,28 40,32 60,20 80,24 100,15 120,18 140,12 160,16 180,8 200,10 200,40 0,40"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                </GlowCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 4 — CATEGORIES
      ══════════════════════════════════════════════════════ */}
      <section className="py-20 border-t border-white/[0.03] relative overflow-hidden">
        {/* Decorative card peeking from right edge */}
        <div className="absolute top-[-20px] right-[-15px] w-24 opacity-[0.08] rotate-[25deg] pointer-events-none select-none z-0 hidden md:block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://images.pokemontcg.io/base1/4.png" alt="" loading="lazy" aria-hidden="true" draggable={false} className="w-full" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em]">Browse Categories</h2>
            <button className="flex items-center gap-1 text-xs text-orange-500 hover:text-orange-400 transition-colors cursor-pointer group">
              View all <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {CATEGORIES.map((cat, catIdx) => {
              const catRotations = ["rotate-[-1deg]", "rotate-[0.5deg]", "rotate-[-0.5deg]", "rotate-[1deg]", "rotate-[-0.75deg]", "rotate-[0.5deg]"];
              return (
                <button
                  key={cat.name}
                  className={`group/cat relative rounded-xl border p-5 text-left transition-all duration-300 cursor-pointer hover:scale-[1.08] hover:-translate-y-2 hover:rotate-0 hover:shadow-xl hover:shadow-black/30 ${cat.accent} ${catRotations[catIdx]}`}
                >
                  {/* Hover glow */}
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover/cat:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ boxShadow: "inset 0 0 30px rgba(249,115,22,0.05)" }} />
                  <p className="text-xs font-bold text-white relative z-10">{cat.name}</p>
                  <p className="mt-1 text-[10px] text-zinc-500 relative z-10">{cat.count} cards</p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 5 — HOW IT WORKS: Stepper
      ══════════════════════════════════════════════════════ */}
      <section className="py-28 border-t border-white/[0.03] overflow-hidden relative bg-[#0B0A09]">
        {/* Warm ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-[radial-gradient(ellipse,_rgba(249,115,22,0.07),_transparent_60%)] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[radial-gradient(circle,_rgba(234,88,12,0.04),_transparent_60%)] pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
          <div className="text-center mb-20">
            <p className="text-[10px] uppercase tracking-[0.3em] text-orange-500 font-semibold mb-3">
              Simple Process
            </p>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">
              Sell a Card in 3 Steps
            </h2>
          </div>

          <div className="relative">
            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  icon: Camera,
                  step: "01",
                  title: "Snap a Photo",
                  desc: "Take a photo of your card. AI identifies it instantly, pulling set info, rarity, and current market pricing.",
                  glow: "group-hover:shadow-orange-500/20",
                  isHighlight: false,
                  tilt: "rotate-[-1.5deg]",
                },
                {
                  icon: Eye,
                  step: "02",
                  title: "Review & Price",
                  desc: "See real-time comps across the market. Set your price with data. Your card gets a 3D showcase automatically.",
                  glow: "group-hover:shadow-orange-500/30",
                  isHighlight: true,
                  tilt: "rotate-[1deg]",
                },
                {
                  icon: DollarSign,
                  step: "03",
                  title: "Get Paid",
                  desc: "Card sells, we handle escrow + shipping label. Funds released after buyer confirms receipt.",
                  glow: "group-hover:shadow-green-500/20",
                  isHighlight: false,
                  tilt: "rotate-[-0.5deg]",
                },
              ].map((item) => (
                <div key={item.step} className={`group text-center relative ${item.tilt} transition-all duration-500 hover:rotate-0`}>
                  {/* Large background step number */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[120px] font-black text-white/[0.03] leading-none pointer-events-none select-none z-0">
                    {item.step}
                  </div>

                  {/* Step card */}
                  <div className={`relative rounded-2xl border p-8 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl ${item.glow} ${item.isHighlight ? "border-orange-500/30 bg-gradient-to-b from-orange-500/[0.08] to-transparent shadow-lg shadow-orange-500/10 scale-[1.03]" : "border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04]"}`}>
                    {/* Orange circle icon with animated glow ring */}
                    <div className={`relative z-10 mx-auto flex h-20 w-20 items-center justify-center rounded-full mb-6 shadow-lg transition-all duration-500 group-hover:scale-110 ${item.isHighlight ? "bg-orange-500 shadow-orange-500/40 group-hover:shadow-orange-500/60" : "bg-orange-500 shadow-orange-500/25 group-hover:shadow-orange-500/50"}`}>
                      {/* Glow ring */}
                      <div className="absolute inset-0 rounded-full bg-orange-500/20 animate-ping opacity-0 group-hover:opacity-30" style={{ animationDuration: "2s" }} />
                      <item.icon className="h-7 w-7 text-black" />
                    </div>
                    <p className={`text-[10px] uppercase tracking-[0.2em] font-bold mb-2 ${item.isHighlight ? "text-orange-400" : "text-orange-500"}`}>
                      Step {item.step}
                    </p>
                    <h3 className="font-black text-base uppercase tracking-wide mb-3">{item.title}</h3>
                    <p className="text-sm text-zinc-500 leading-relaxed max-w-xs mx-auto">{item.desc}</p>

                    {/* Highlight badge */}
                    {item.isHighlight && (
                      <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-orange-400">
                        <Zap className="h-3 w-3" /> Most Popular
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 6 — CTA
      ══════════════════════════════════════════════════════ */}
      <section className="py-32 border-t border-white/[0.03] relative overflow-hidden bg-gradient-to-b from-[#0A0A0A] via-[#10080A] to-[#0A0A0A]">
        {/* Multiple ambient glows — stronger for CTA drama */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(249,115,22,0.12),_transparent_50%)]" />
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle,_rgba(147,51,234,0.07),_transparent_60%)] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[radial-gradient(circle,_rgba(249,115,22,0.06),_transparent_60%)] pointer-events-none" />

        {/* Scattered decorative cards for depth */}
        <div className="absolute top-[10%] left-[5%] w-32 opacity-[0.08] rotate-[-20deg] pointer-events-none select-none z-0 hidden lg:block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://images.pokemontcg.io/base1/4.png" alt="" loading="lazy" aria-hidden="true" draggable={false} className="w-full drop-shadow-2xl" />
        </div>
        <div className="absolute bottom-[5%] right-[6%] w-28 opacity-[0.08] rotate-[15deg] pointer-events-none select-none z-0 hidden lg:block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://images.pokemontcg.io/swsh12pt5/160.png" alt="" loading="lazy" aria-hidden="true" draggable={false} className="w-full drop-shadow-2xl" />
        </div>
        <div className="absolute top-[50%] right-[12%] w-24 opacity-[0.06] rotate-[-8deg] pointer-events-none select-none z-0 hidden xl:block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://images.pokemontcg.io/base1/2.png" alt="" loading="lazy" aria-hidden="true" draggable={false} className="w-full drop-shadow-2xl" />
        </div>

        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 relative z-10">
          <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight rotate-[-1deg]">
            Ready to Trade{" "}
            <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-orange-600 bg-clip-text text-transparent">
              Smarter?
            </span>
          </h2>
          <p className="mt-5 text-base sm:text-lg text-zinc-400">
            Join the beta. Early sellers get <span className="text-orange-400 font-semibold">0% fees for 90 days</span>.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <GradientButton className="text-sm">
              Join the Beta
            </GradientButton>
            <GradientButton variant="variant" className="text-sm">
              Learn More
            </GradientButton>
          </div>

          {/* Social proof */}
          <div className="mt-14 inline-flex items-center gap-4 rounded-full border border-white/5 bg-white/[0.02] px-6 py-3 rotate-[0.5deg] hover:rotate-0 transition-transform duration-300">
            <div className="flex -space-x-2">
              {[
                "from-orange-500 to-amber-600",
                "from-cyan-500 to-blue-600",
                "from-purple-500 to-pink-600",
                "from-green-500 to-emerald-600",
              ].map((gradient, i) => (
                <div
                  key={i}
                  className={`h-8 w-8 rounded-full border-2 border-[#0A0A0A] bg-gradient-to-br ${gradient}`}
                />
              ))}
            </div>
            <p className="text-xs text-zinc-400">
              <span className="font-bold text-white">2,400+</span> sellers in the beta
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 7 — FOOTER
      ══════════════════════════════════════════════════════ */}
      <footer className="border-t border-white/5 py-8">
        <div className="mx-auto max-w-7xl px-4 flex items-center justify-between text-[11px] text-zinc-600 sm:px-6">
          <p>&copy; 2026 Trove. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="/terms" className="hover:text-zinc-400 transition-colors cursor-pointer">Terms</a>
            <a href="/privacy" className="hover:text-zinc-400 transition-colors cursor-pointer">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
