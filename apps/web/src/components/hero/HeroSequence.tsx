"use client"

import { useState, useCallback, useEffect } from "react"
import { motion } from "framer-motion"
import { BlurFade } from "@/components/ui/blur-fade"
import { ParticleText } from "@/components/ui/particle-text"
import { BubbleText } from "@/components/ui/bubble-text"
import { ShaderBackground } from "@/components/ui/shader-background"
import { DiagonalCarousel } from "@/components/cards/DiagonalCarousel"
import { GradientButton } from "@/components/ui/gradient-button"
import { Input } from "@/components/ui/input"
import { Search, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSequence() {
  const [phase, setPhase] = useState(0)
  // Phase 0: Text animates in (BlurFade)
  // Phase 1: "COME ALIVE." particle effect plays
  // Phase 2: Particles settle → crossfade to crisp text, shader bg + carousel + rest appears

  // Trigger phase 1 shortly after "where cards" starts fading in
  useEffect(() => {
    const timer = setTimeout(() => setPhase(1), 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleParticleComplete = useCallback(() => {
    setTimeout(() => setPhase(2), 200)
  }, [])

  return (
    <section className="relative" style={{ minHeight: "clamp(550px, 85vh, 850px)" }}>
      {/* Shader background — always mounted, opacity-controlled */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 2 ? 1 : 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <ShaderBackground />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, rgba(194,65,12,0.15) 0%, transparent 40%, rgba(88,28,135,0.1) 100%)",
            mixBlendMode: "screen",
          }}
        />
      </motion.div>

      {/* Carousel — always mounted, opacity-controlled, receives pointer events for card hover */}
      <motion.div
        className="absolute inset-0 z-10 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 2 ? 1 : 0 }}
        transition={{ duration: 1.2, delay: phase >= 2 ? 0.3 : 0, ease: "easeOut" }}
      >
        <DiagonalCarousel />
      </motion.div>

      {/* Dark base — crossfades out, no pointer events */}
      <motion.div
        className="absolute inset-0 bg-[#0A0A0A] pointer-events-none"
        initial={{ opacity: 1 }}
        animate={{ opacity: phase >= 2 ? 0 : 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />

      {/* Bottom gradient fade into next section — tall for seamless blend */}
      <div className="absolute bottom-0 left-0 right-0 h-64 z-20 pointer-events-none" style={{ background: "linear-gradient(to bottom, transparent, #0A0A0A)" }} />

      {/* Content overlay — pinned to top */}
      <div className="absolute inset-0 z-30 pointer-events-none">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 w-full pt-24 sm:pt-28 lg:pt-32">
          <div className="max-w-xl pointer-events-auto">
            {/* Badge */}
            <BlurFade delay={0.2} duration={0.6} yOffset={16} blur="8px">
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 backdrop-blur-sm px-4 py-1.5 mb-6">
                <div className="relative h-2 w-2">
                  <div className="absolute inset-0 rounded-full bg-orange-500 animate-ping opacity-75" />
                  <div className="relative h-2 w-2 rounded-full bg-orange-500" />
                </div>
                <span className="text-xs font-semibold text-orange-400 uppercase tracking-[0.2em]">
                  Beta — Early Access
                </span>
              </div>
            </BlurFade>

            <BlurFade delay={0.5} duration={0.7} yOffset={20} blur="10px">
              <h1 className="text-5xl font-black tracking-tight leading-[1.02] sm:text-6xl lg:text-7xl uppercase drop-shadow-2xl text-white">
                The marketplace
              </h1>
            </BlurFade>

            <BlurFade delay={0.9} duration={0.7} yOffset={20} blur="10px">
              <h1 className="text-5xl font-black tracking-tight leading-[1.02] sm:text-6xl lg:text-7xl uppercase drop-shadow-2xl text-white">
                where cards
              </h1>
            </BlurFade>

            {/* "COME ALIVE." — particle canvas crossfades to crisp BubbleText */}
            {/* Height matches heading line-height: text-5xl*1.02=~49px, sm:~61px, lg:~73px */}
            <div className="relative h-[49px] sm:h-[61px] lg:h-[73px]">
              {/* Particle canvas — stays in place, fades out once settled */}
              <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0, filter: "blur(0px)" }}
                animate={{
                  opacity: phase >= 1 && phase < 2 ? 1 : 0,
                  filter: phase >= 2 ? "blur(3px)" : "blur(0px)",
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <ParticleText
                  text="COME ALIVE."
                  color={{ r: 249, g: 115, b: 22 }}
                  delay={1100}
                  onComplete={handleParticleComplete}
                />
              </motion.div>

              {/* Crisp text with bubble hover — fades in with a slow pulse */}
              <motion.div
                className="absolute inset-0 flex items-center origin-left"
                initial={{ opacity: 0, filter: "blur(6px)", scale: 1.14 }}
                animate={{
                  opacity: phase >= 2 ? 1 : 0,
                  filter: phase >= 2 ? "blur(0px)" : "blur(6px)",
                  scale: phase >= 2 ? 1 : 1.14,
                }}
                transition={{
                  opacity: { duration: 0.25, ease: "easeIn" },
                  filter: { duration: 0.6, ease: "easeOut" },
                  scale: { type: "spring", stiffness: 120, damping: 14, mass: 1 },
                }}
              >
                <h1 className="text-5xl font-black tracking-tight leading-[1.02] sm:text-6xl lg:text-7xl uppercase drop-shadow-2xl">
                  <BubbleText text="COME ALIVE." />
                </h1>
              </motion.div>
            </div>

            {/* Phase 2: Rest of hero content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: phase >= 2 ? 1 : 0 }}
              transition={{ duration: 0.8, delay: phase >= 2 ? 0.2 : 0, ease: "easeOut" }}
              style={{ pointerEvents: phase >= 2 ? "auto" : "none" }}
            >
              <p className="mt-4 max-w-lg text-base sm:text-lg text-zinc-300 leading-relaxed drop-shadow-lg">
                Upload a card. Watch it transform into a cinematic 3D showcase.
                Trade with the lowest fees in the market.
              </p>

              {/* Search */}
              <div className="mt-6 flex max-w-lg gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600" />
                  <Input
                    type="search"
                    placeholder="Search any card..."
                    className="h-12 pl-11 text-sm bg-black/60 backdrop-blur-md border-white/10 placeholder:text-zinc-600 focus:border-orange-500/50 rounded-lg"
                  />
                </div>
                <Button className="h-12 px-6 bg-orange-500 text-black hover:bg-orange-400 font-bold cursor-pointer rounded-lg">
                  Search
                </Button>
              </div>

              {/* Quick tags */}
              <div className="mt-3 flex flex-wrap gap-2">
                {["Charizard", "Black Lotus", "LeBron Rookie", "Lugia VSTAR"].map((term) => (
                  <button
                    key={term}
                    className="rounded-full border border-white/10 bg-black/40 backdrop-blur-sm px-3 py-1 text-[11px] text-zinc-400 transition-all hover:border-orange-500/40 hover:text-zinc-200 hover:bg-orange-500/10 cursor-pointer"
                  >
                    {term}
                  </button>
                ))}
              </div>

              {/* CTAs */}
              <div className="mt-6 flex items-center gap-4">
                <GradientButton className="text-sm">
                  Start Selling <ArrowRight className="ml-2 h-4 w-4" />
                </GradientButton>
                <GradientButton variant="variant" className="text-sm">
                  Browse Cards
                </GradientButton>
              </div>

              {/* Fee strip */}
              <div className="mt-6 flex items-center gap-6 sm:gap-8 bg-black/40 backdrop-blur-sm rounded-xl border border-white/5 p-4 max-w-md">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-1">Trove</p>
                  <p className="text-3xl font-black text-orange-500 tabular-nums">3–5%</p>
                </div>
                <div className="h-10 w-px bg-white/10" />
                <div className="flex gap-6 opacity-40">
                  <div>
                    <p className="text-[10px] text-zinc-600 uppercase tracking-wider">TCGPlayer</p>
                    <p className="text-lg font-bold line-through tabular-nums text-zinc-500">13.25%</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-zinc-600 uppercase tracking-wider">eBay</p>
                    <p className="text-lg font-bold line-through tabular-nums text-zinc-500">13.55%</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
