"use client";

import { useState, useCallback } from "react";
import { PSASlab } from "./PSASlab";
import { HoverCard3D } from "./HoverCard3D";
import { ShaderBackground } from "@/components/ui/shader-background";
import { X } from "lucide-react";

const SHOWCASE_CARDS = [
  { img: "https://images.pokemontcg.io/base1/4.png", name: "Charizard", set: "Base Set", year: "1999", grade: "10", price: "$420.00", cert: "63683350", holo: true },
  { img: "https://images.pokemontcg.io/swsh12pt5/160.png", name: "Lugia VSTAR", set: "Crown Zenith", year: "2023", grade: "10", price: "$42.50", cert: "47932841", holo: true },
  { img: "https://images.pokemontcg.io/base1/15.png", name: "Venusaur", set: "Base Set", year: "1999", grade: "9", price: "$89.99", cert: "29481023", holo: true },
  { img: "https://images.pokemontcg.io/swsh45sv/SV107.png", name: "Umbreon VMAX", set: "Shining Fates", year: "2021", grade: "10", price: "$215.00", cert: "51823947", holo: true },
  { img: "https://images.pokemontcg.io/base1/2.png", name: "Blastoise", set: "Base Set", year: "1999", grade: "8", price: "$195.00", cert: "38291047", holo: true },
  { img: "https://images.pokemontcg.io/swsh12pt5/186.png", name: "Giratina VSTAR", set: "Crown Zenith", year: "2023", grade: "10", price: "$38.00", cert: "62940183", holo: true },
  { img: "https://images.pokemontcg.io/base1/69.png", name: "Raichu", set: "Base Set", year: "1999", grade: "7", price: "$52.00", cert: "19382741", holo: false },
  { img: "https://images.pokemontcg.io/swsh45sv/SV94.png", name: "Ditto VMAX", set: "Shining Fates", year: "2021", grade: "10", price: "$28.00", cert: "72918304", holo: true },
];

interface ExpandedCard {
  img: string;
  name: string;
  set: string;
  price: string;
  holo: boolean;
}

export function DiagonalCarousel() {
  const [isPaused, setIsPaused] = useState(false);
  const [expandedCard, setExpandedCard] = useState<ExpandedCard | null>(null);

  const handleCardClick = useCallback((card: ExpandedCard) => {
    setExpandedCard(card);
  }, []);

  const handleClose = useCallback(() => {
    setExpandedCard(null);
  }, []);

  return (
    <>
      <div
        className="relative w-full overflow-hidden"
        style={{ height: "clamp(550px, 85vh, 850px)" }}
      >
        {/* Animated WebGL shader background — streaming diagonal particles */}
        <ShaderBackground />
        {/* Slight warm overlay to blend with brand palette */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, rgba(194,65,12,0.15) 0%, transparent 40%, rgba(88,28,135,0.1) 100%)",
            mixBlendMode: "screen",
          }}
        />

        {/* Diagonal row of PSA slabs — steep 25° angle like reference */}
        <div
          className="absolute flex items-center gap-6 sm:gap-8"
          style={{
            transform: "rotate(-25deg)",
            top: "-15%",
            left: "-5%",
            animation: "slideCards 60s linear infinite",
            animationPlayState: isPaused ? "paused" : "running",
          }}
        >
          {[...SHOWCASE_CARDS, ...SHOWCASE_CARDS, ...SHOWCASE_CARDS].map((card, i) => (
            <div
              key={`r1-${i}`}
              className="shrink-0"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              style={{ perspective: "900px" }}
            >
              {/* 3/4 standing slab view */}
              <div
                className="transition-all duration-500 ease-out hover:!transform-none"
                style={{
                  transform: "rotateY(-20deg) rotateX(3deg)",
                  transformStyle: "preserve-3d",
                }}
              >
                <PSASlab
                  imageUrl={card.img}
                  grade={card.grade}
                  cardName={card.name}
                  year={card.year}
                  certNumber={card.cert}
                  className="w-48 sm:w-56"
                  onClick={() => handleCardClick(card)}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Left fade for text readability — lighter than before to show gradient */}
        <div className="absolute inset-y-0 left-0 w-[50%] bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/85 to-transparent z-20 pointer-events-none" />
        {/* Bottom fade to black (page bg) */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0A0A0A] to-transparent z-20 pointer-events-none" />
        {/* Top fade */}
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#0A0A0A]/60 to-transparent z-20 pointer-events-none" />
      </div>

      {/* ── Expanded card pop-out ── */}
      {expandedCard && (
        <div
          className="fixed inset-0 z-[100] animate-in fade-in duration-200"
          onClick={handleClose}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          <div
            className="fixed top-[160px] right-[30%] animate-in slide-in-from-right-10 zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleClose}
              className="absolute -top-10 right-0 text-zinc-400 hover:text-white transition-colors cursor-pointer z-10"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex flex-col items-center">
              <HoverCard3D
                imageUrl={expandedCard.img}
                isHolo={expandedCard.holo}
                size="lg"
              />

              <div className="mt-5 text-center">
                <h3 className="text-xl font-black uppercase tracking-tight text-white">
                  {expandedCard.name}
                </h3>
                <p className="text-xs text-zinc-500 mt-1">{expandedCard.set}</p>
                <p className="text-2xl font-black text-orange-500 mt-2 tabular-nums">
                  {expandedCard.price}
                </p>
                <div className="mt-4 flex gap-3 justify-center">
                  <button className="rounded-xl bg-orange-500 px-6 py-2.5 text-xs font-bold text-black hover:bg-orange-400 transition-colors cursor-pointer">
                    View Listing
                  </button>
                  <button className="rounded-xl border border-white/10 px-6 py-2.5 text-xs font-medium text-white hover:bg-white/5 transition-colors cursor-pointer">
                    Watchlist
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
