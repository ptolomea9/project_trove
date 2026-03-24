import { Header } from "@/components/layout/Header";
import { CardViewerLazy } from "@/components/3d/CardViewerLazy";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Gem,
  Zap,
  Shield,
  TrendingDown,
  ArrowRight,
  Camera,
  Eye,
  DollarSign,
  ChevronRight,
} from "lucide-react";

const DEMO_CARD = "https://images.pokemontcg.io/swsh12pt5/160_hires.png";

// Card images for the diagonal carousel
const SHOWCASE_CARDS = [
  "https://images.pokemontcg.io/base1/4_hires.png",
  "https://images.pokemontcg.io/swsh12pt5/160_hires.png",
  "https://images.pokemontcg.io/base1/15_hires.png",
  "https://images.pokemontcg.io/swsh45sv/SV107_hires.png",
  "https://images.pokemontcg.io/base1/2_hires.png",
  "https://images.pokemontcg.io/swsh12pt5/186_hires.png",
  "https://images.pokemontcg.io/base1/69_hires.png",
  "https://images.pokemontcg.io/swsh45sv/SV94_hires.png",
];

const CATEGORIES = [
  { name: "Pokemon", count: "2.4M+", accent: "border-yellow-500/30 hover:border-yellow-500/60 hover:bg-yellow-500/5" },
  { name: "Magic: The Gathering", count: "1.8M+", accent: "border-blue-500/30 hover:border-blue-500/60 hover:bg-blue-500/5" },
  { name: "Yu-Gi-Oh!", count: "900K+", accent: "border-purple-500/30 hover:border-purple-500/60 hover:bg-purple-500/5" },
  { name: "Sports Cards", count: "3.1M+", accent: "border-green-500/30 hover:border-green-500/60 hover:bg-green-500/5" },
  { name: "One Piece", count: "450K+", accent: "border-red-500/30 hover:border-red-500/60 hover:bg-red-500/5" },
  { name: "Lorcana", count: "320K+", accent: "border-cyan-500/30 hover:border-cyan-500/60 hover:bg-cyan-500/5" },
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <Header />

      {/* ── HERO: Diagonal Card Showcase ── */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center">
        {/* Background gradient - orange to purple diagonal like reference */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 via-black to-purple-900/20" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_rgba(249,115,22,0.15),_transparent_50%)]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_rgba(147,51,234,0.1),_transparent_50%)]" />

        {/* Diagonal card carousel - CSS animated */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute -right-20 top-1/2 -translate-y-1/2 flex gap-6 animate-[slideCards_20s_linear_infinite]"
            style={{ transform: "rotate(-15deg) translateY(-50%)" }}
          >
            {[...SHOWCASE_CARDS, ...SHOWCASE_CARDS].map((card, i) => (
              <div
                key={i}
                className="shrink-0 w-48 rounded-lg overflow-hidden shadow-2xl shadow-black/50 opacity-40 hover:opacity-70 transition-opacity"
                style={{
                  filter: "brightness(0.7)",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={card}
                  alt=""
                  className="w-full h-auto"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Content overlay */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 w-full">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 mb-6">
              <div className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse" />
              <span className="text-xs font-medium text-orange-400 uppercase tracking-widest">
                Beta — Early Access
              </span>
            </div>

            <h1 className="text-5xl font-black tracking-tight leading-[1.05] sm:text-6xl lg:text-7xl uppercase">
              The marketplace<br />
              where cards{" "}
              <span className="text-orange-500">come alive.</span>
            </h1>

            <p className="mt-5 max-w-md text-base text-zinc-400 leading-relaxed">
              Upload a card. Watch it transform into a cinematic 3D showcase.
              Trade with the lowest fees in the market.
            </p>

            {/* Hero search */}
            <div className="mt-8 flex max-w-lg gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600" />
                <Input
                  type="search"
                  placeholder="Search any card..."
                  className="h-12 pl-11 text-sm bg-white/5 border-white/10 placeholder:text-zinc-600 focus:border-orange-500/50"
                />
              </div>
              <Button className="h-12 px-6 bg-orange-500 text-black hover:bg-orange-400 font-bold cursor-pointer">
                Search
              </Button>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {["Charizard", "Black Lotus", "LeBron Rookie", "Lugia VSTAR"].map(
                (term) => (
                  <button
                    key={term}
                    className="rounded-full border border-white/10 px-3 py-1 text-[11px] text-zinc-500 transition-colors hover:border-orange-500/30 hover:text-zinc-300 cursor-pointer"
                  >
                    {term}
                  </button>
                )
              )}
            </div>

            {/* Fee strip */}
            <div className="mt-10 flex items-center gap-6">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">Trove</p>
                <p className="text-3xl font-black text-orange-500 tabular-nums">3–5%</p>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div className="flex gap-5 opacity-30">
                <div>
                  <p className="text-[10px] text-zinc-600">TCGPlayer</p>
                  <p className="text-base font-bold line-through tabular-nums">13.25%</p>
                </div>
                <div>
                  <p className="text-[10px] text-zinc-600">eBay</p>
                  <p className="text-base font-bold line-through tabular-nums">13.55%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3D CARD SHOWCASE ── */}
      <section className="relative border-t border-white/5 bg-black py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-[480px_1fr] items-center">
            {/* 3D Card viewer */}
            <div className="h-[450px] lg:h-[500px]">
              <CardViewerLazy imageUrl={DEMO_CARD} isHolo />
            </div>

            {/* Card details - like reference */}
            <div>
              <p className="text-[10px] uppercase tracking-widest text-orange-500 font-semibold mb-2">
                Featured Card
              </p>
              <h2 className="text-3xl font-black uppercase tracking-tight">
                Lugia VSTAR
              </h2>
              <p className="text-sm text-zinc-500 mt-1">
                Crown Zenith &middot; #160 &middot; Secret Rare
              </p>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                  <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Market Price</p>
                  <p className="text-xl font-bold text-white mt-1 tabular-nums">$42.50</p>
                </div>
                <div className="rounded-lg border border-cyan-500/20 bg-cyan-500/5 p-3">
                  <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Condition</p>
                  <p className="text-xl font-bold text-cyan-400 mt-1">NM</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                  <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Rarity</p>
                  <p className="text-xl font-bold text-white mt-1">Secret</p>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <Button className="h-11 px-8 bg-orange-500 text-black hover:bg-orange-400 font-bold cursor-pointer">
                  Buy Now
                </Button>
                <Button variant="outline" className="h-11 px-6 border-white/10 hover:bg-white/5 cursor-pointer">
                  Make Offer
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section className="py-12 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-sm font-bold uppercase tracking-widest">Browse Categories</h2>
            <button className="flex items-center gap-1 text-xs text-orange-500 hover:text-orange-400 transition-colors cursor-pointer">
              View all <ChevronRight className="h-3 w-3" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.name}
                className={`rounded-lg border p-3.5 text-left transition-all cursor-pointer ${cat.accent}`}
              >
                <p className="text-xs font-semibold text-white">{cat.name}</p>
                <p className="mt-0.5 text-[10px] text-zinc-500">{cat.count} cards</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-16 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-2xl font-black uppercase tracking-tight text-center mb-12">
            Built Different
          </h2>

          <div className="grid gap-px rounded-xl border border-white/5 bg-white/5 overflow-hidden sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Gem, title: "3D Card Showcase", desc: "Every listing gets a cinematic 3D viewer. Rotate, zoom, and inspect from every angle." },
              { icon: Zap, title: "List in 30 Seconds", desc: "Snap a photo. AI identifies the card, suggests pricing, and publishes your listing." },
              { icon: Shield, title: "Escrow Protection", desc: "Payment held until buyer confirms delivery. Both sides protected, every time." },
              { icon: TrendingDown, title: "Lowest Fees", desc: "Tiered from 3–5%. Keep more of what you earn versus any other marketplace." },
            ].map((f) => (
              <div key={f.title} className="bg-black p-6 transition-colors hover:bg-white/[0.02]">
                <f.icon className="h-5 w-5 text-orange-500 mb-3" />
                <h3 className="font-bold text-sm mb-1.5 uppercase tracking-wide">{f.title}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS (Shipping tracker style) ── */}
      <section className="py-16 border-t border-white/5 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-2xl font-black uppercase tracking-tight text-center mb-16">
            Sell a Card in 3 Steps
          </h2>

          {/* Horizontal tracker line like reference */}
          <div className="relative">
            {/* Dotted connecting line */}
            <div className="absolute top-6 left-[5%] right-[5%] h-px border-t-2 border-dashed border-orange-500/30 hidden md:block" />

            <div className="grid gap-10 md:grid-cols-3">
              {[
                { icon: Camera, step: "01", title: "Snap a Photo", desc: "Take a photo of your card. AI identifies it instantly, pulling set info, rarity, and current market pricing." },
                { icon: Eye, step: "02", title: "Review & Price", desc: "See real-time comps across the market. Set your price with data. Your card gets a 3D showcase automatically." },
                { icon: DollarSign, step: "03", title: "Get Paid", desc: "Card sells, we handle escrow + shipping label. Funds released after buyer confirms receipt." },
              ].map((item) => (
                <div key={item.step} className="text-center relative">
                  <div className="relative z-10 mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 mb-4">
                    <item.icon className="h-5 w-5 text-black" />
                  </div>
                  <p className="text-[10px] uppercase tracking-widest text-orange-500 font-bold mb-1">
                    Step {item.step}
                  </p>
                  <h3 className="font-bold text-sm uppercase tracking-wide mb-2">{item.title}</h3>
                  <p className="text-xs text-zinc-500 leading-relaxed max-w-xs mx-auto">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 border-t border-white/5">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-black uppercase tracking-tight">
            Ready to Trade Smarter?
          </h2>
          <p className="mt-3 text-sm text-zinc-500">
            Join the beta. Early sellers get 0% fees for 90 days.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Button className="h-12 px-10 bg-orange-500 text-black hover:bg-orange-400 font-bold text-sm cursor-pointer">
              Join the Beta
            </Button>
            <Button variant="outline" className="h-12 px-8 border-white/10 hover:bg-white/5 text-sm cursor-pointer">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/5 py-6">
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
