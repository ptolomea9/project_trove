import { Header } from "@/components/layout/Header";
import { CardViewerLazy } from "@/components/3d/CardViewerLazy";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Demo card image (Pokemon Lugia VSTAR from Crown Zenith)
const DEMO_CARD =
  "https://images.pokemontcg.io/swsh12pt5/160_hires.png";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Gradient background */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />

        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
          {/* Left: Copy */}
          <div className="flex flex-col justify-center">
            <Badge
              variant="secondary"
              className="mb-4 w-fit border border-primary/20 bg-primary/10 text-primary"
            >
              Now in Beta
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Where Cards{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Come Alive
              </span>
            </h1>
            <p className="mt-4 max-w-lg text-lg text-muted-foreground">
              The next-gen trading card marketplace. Upload your card, watch it
              transform into a stunning 3D showcase, and sell it with fees
              starting at just 3%.
            </p>

            {/* Fee comparison */}
            <div className="mt-6 flex items-center gap-4">
              <div className="rounded-lg border border-border bg-card px-4 py-2">
                <p className="text-xs text-muted-foreground">Our fee</p>
                <p className="text-2xl font-bold text-accent">3-5%</p>
              </div>
              <div className="text-muted-foreground">vs</div>
              <div className="rounded-lg border border-border bg-card px-4 py-2 opacity-50">
                <p className="text-xs text-muted-foreground">TCGPlayer</p>
                <p className="text-2xl font-bold line-through">13.25%</p>
              </div>
              <div className="rounded-lg border border-border bg-card px-4 py-2 opacity-50">
                <p className="text-xs text-muted-foreground">eBay</p>
                <p className="text-2xl font-bold line-through">13.55%</p>
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              <Button size="lg" className="px-8">
                Start Selling
              </Button>
              <Button size="lg" variant="outline">
                Browse Cards
              </Button>
            </div>
          </div>

          {/* Right: 3D Card Viewer */}
          <div className="relative flex items-center justify-center lg:h-[500px]">
            <CardViewerLazy imageUrl={DEMO_CARD} isHolo />
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="border-t border-border bg-card/50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight">
            Why Traders Choose Trove
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: "💎",
                title: "3D Card Showcase",
                description:
                  "Every listing gets a cinematic 3D viewer. Rotate, zoom, and inspect cards like never before.",
              },
              {
                icon: "⚡",
                title: "List in 30 Seconds",
                description:
                  "Snap a photo. AI identifies the card, suggests a price, and creates your listing instantly.",
              },
              {
                icon: "🔒",
                title: "Escrow Protection",
                description:
                  "We hold payment until the buyer confirms delivery. Both sides are protected.",
              },
              {
                icon: "📊",
                title: "Lowest Fees",
                description:
                  "Tiered fees from 3-5%. Keep more of what you earn compared to any other marketplace.",
              },
            ].map((feature) => (
              <Card
                key={feature.title}
                className="border-border/50 bg-card transition-colors hover:border-primary/30"
              >
                <CardContent className="pt-6">
                  <div className="mb-3 text-2xl">{feature.icon}</div>
                  <h3 className="mb-2 font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight">
            Sell a Card in 3 Steps
          </h2>
          <div className="grid gap-8 sm:grid-cols-3">
            {[
              {
                step: "01",
                title: "Snap a Photo",
                description:
                  "Take a photo of your card. Our AI identifies it instantly, pulling in set info, rarity, and market pricing.",
              },
              {
                step: "02",
                title: "Set Your Price",
                description:
                  "See what it's selling for across platforms. Set your price with confidence, or let AI suggest one.",
              },
              {
                step: "03",
                title: "Get Paid",
                description:
                  "When your card sells, we handle escrow and shipping labels. Funds hit your account after buyer confirms.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 font-mono text-sm font-bold text-primary">
                  {item.step}
                </div>
                <h3 className="mb-2 font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border py-16">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-bold tracking-tight">
            Ready to Trade Smarter?
          </h2>
          <p className="mt-4 text-muted-foreground">
            Join the beta and be among the first to experience the future of
            card trading. Early sellers get 0% fees for 90 days.
          </p>
          <Button size="lg" className="mt-8 px-12">
            Join the Beta
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30 py-8">
        <div className="mx-auto max-w-7xl px-4 text-center text-sm text-muted-foreground sm:px-6">
          <p>&copy; 2026 Trove. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
