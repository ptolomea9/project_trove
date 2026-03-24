"use client";

import { useRef } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Camera,
  ScanSearch,
  Sparkles,
  RotateCcw,
  Upload,
  Check,
  Loader2,
} from "lucide-react";

/* ────────────────────────────────────────────────────────
   Step definitions — left text + right demo content
   ──────────────────────────────────────────────────────── */
const STEPS = [
  {
    label: "Step 01",
    title: "Snap a Photo",
    description:
      "Drop or photograph your card — our uploader handles any angle, any lighting.",
    icon: Camera,
  },
  {
    label: "Step 02",
    title: "AI Identifies It",
    description:
      "Machine vision scans the image in under a second. Set, rarity, edition, and current market price — all automatic.",
    icon: ScanSearch,
  },
  {
    label: "Step 03",
    title: "Details Confirmed",
    description:
      "Review the AI's match. Condition grading, price comps, and listing suggestions — ready to go.",
    icon: Sparkles,
  },
  {
    label: "Step 04",
    title: "3D Showcase",
    description:
      "Your card gets a cinematic 3D render. Buyers can rotate, zoom, and inspect every detail before purchasing.",
    icon: RotateCcw,
  },
];

/* ────────────────────────────────────────────────────────
   Faked demo screens (right panel)
   ──────────────────────────────────────────────────────── */

function UploadScreen() {
  return (
    <div className="flex flex-col items-center justify-center h-full px-6">
      {/* Drop zone */}
      <div className="relative w-full max-w-[280px] aspect-[3/4] rounded-2xl border-2 border-dashed border-orange-500/40 bg-orange-500/[0.04] flex flex-col items-center justify-center gap-4 transition-all duration-500 hover:border-orange-500/60 hover:bg-orange-500/[0.06]">
        {/* Pulsing upload icon */}
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-orange-500/20 animate-ping" style={{ animationDuration: "2.5s" }} />
          <div className="relative w-14 h-14 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
            <Upload className="w-6 h-6 text-orange-500" />
          </div>
        </div>
        <div className="text-center">
          <p className="text-sm font-bold text-white/80">Drop your card here</p>
          <p className="text-xs text-zinc-500 mt-1">PNG, JPG up to 25MB</p>
        </div>
      </div>

      {/* Or divider */}
      <div className="flex items-center gap-3 mt-5 w-full max-w-[280px]">
        <div className="flex-1 h-px bg-white/10" />
        <span className="text-[10px] uppercase tracking-wider text-zinc-600 font-semibold">or</span>
        <div className="flex-1 h-px bg-white/10" />
      </div>

      {/* Camera button */}
      <button className="mt-4 flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-2.5 text-xs font-bold text-white/70 transition-all hover:bg-white/[0.06] hover:border-orange-500/30 cursor-pointer">
        <Camera className="w-4 h-4" />
        Use Camera
      </button>
    </div>
  );
}

function ScanningScreen() {
  return (
    <div className="flex flex-col items-center justify-center h-full px-6 relative">
      {/* Card being scanned */}
      <div className="relative w-full max-w-[220px] aspect-[2.5/3.5] rounded-xl overflow-hidden">
        {/* Card placeholder with gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/10 rounded-xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/cards/demo-lugia.png"
            alt="Card being scanned"
            className="w-full h-full object-cover rounded-xl opacity-80"
          />
        </div>

        {/* Scan line animation */}
        <motion.div
          className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_rgba(34,211,238,0.6)]"
          animate={{ top: ["0%", "100%", "0%"] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
        />

        {/* Corner brackets */}
        <div className="absolute top-2 left-2 w-5 h-5 border-t-2 border-l-2 border-cyan-400/70 rounded-tl" />
        <div className="absolute top-2 right-2 w-5 h-5 border-t-2 border-r-2 border-cyan-400/70 rounded-tr" />
        <div className="absolute bottom-2 left-2 w-5 h-5 border-b-2 border-l-2 border-cyan-400/70 rounded-bl" />
        <div className="absolute bottom-2 right-2 w-5 h-5 border-b-2 border-r-2 border-cyan-400/70 rounded-br" />

        {/* Detection overlay boxes */}
        <motion.div
          className="absolute top-[15%] left-[10%] w-[80%] h-[30%] border border-cyan-400/40 rounded-lg"
          animate={{ opacity: [0, 0.6, 0.3, 0.6] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-[55%] left-[15%] w-[70%] h-[20%] border border-orange-400/40 rounded-lg"
          animate={{ opacity: [0.3, 0.6, 0, 0.6] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        />
      </div>

      {/* Status text */}
      <div className="mt-6 flex items-center gap-2">
        <Loader2 className="w-4 h-4 text-cyan-400 animate-spin" />
        <span className="text-sm font-semibold text-cyan-400">Analyzing card...</span>
      </div>

      {/* Progress indicators */}
      <div className="mt-3 flex gap-2">
        {["Set", "Rarity", "Edition", "Price"].map((tag, i) => (
          <motion.div
            key={tag}
            className="rounded-full bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-1 text-[10px] font-bold text-cyan-400/80"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
          >
            {tag}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function IdentifiedScreen() {
  return (
    <div className="flex flex-col h-full px-6 py-6">
      {/* Match confidence */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-5 h-5 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center">
          <Check className="w-3 h-3 text-green-400" />
        </div>
        <span className="text-xs font-bold text-green-400">98.7% Match</span>
      </div>

      {/* Card info header */}
      <div className="flex gap-4 mb-5">
        <div className="w-20 h-28 rounded-lg overflow-hidden border border-white/10 flex-shrink-0 bg-zinc-900">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/cards/demo-lugia.png" alt="Identified card" className="w-full h-full object-cover" />
        </div>
        <div>
          <h4 className="font-black text-base text-white uppercase tracking-wide">Lugia VSTAR</h4>
          <p className="text-xs text-zinc-500 mt-0.5">Crown Zenith &middot; #160</p>
          <div className="mt-2 flex gap-1.5">
            <span className="rounded-md bg-purple-500/15 border border-purple-500/20 px-2 py-0.5 text-[10px] font-bold text-purple-400">Secret Rare</span>
            <span className="rounded-md bg-yellow-500/15 border border-yellow-500/20 px-2 py-0.5 text-[10px] font-bold text-yellow-400">Holo</span>
          </div>
        </div>
      </div>

      {/* Detail rows */}
      <div className="space-y-2 flex-1">
        {[
          { label: "Market Price", value: "$42.50", color: "text-white" },
          { label: "Condition", value: "Near Mint", color: "text-cyan-400" },
          { label: "Recent Sales", value: "$38 – $47", color: "text-zinc-300" },
          { label: "Trend (30d)", value: "+12.4%", color: "text-green-400" },
        ].map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2.5"
          >
            <span className="text-[11px] text-zinc-500">{row.label}</span>
            <span className={`text-sm font-bold tabular-nums ${row.color}`}>{row.value}</span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-4 flex gap-2">
        <div className="flex-1 rounded-xl bg-orange-500 py-2.5 text-center text-xs font-black text-black uppercase tracking-wider">
          List Now
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] py-2.5 px-4 text-center text-xs font-bold text-white/70">
          Edit
        </div>
      </div>
    </div>
  );
}

function ThreeDScreen() {
  return (
    <div className="flex flex-col items-center justify-center h-full px-6 relative">
      {/* 3D card mock with perspective */}
      <div className="relative" style={{ perspective: "800px" }}>
        <motion.div
          className="relative w-[200px] h-[280px] rounded-xl overflow-hidden border border-white/20 shadow-2xl shadow-orange-500/20"
          animate={{ rotateY: [0, 15, -15, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/cards/demo-lugia.png"
            alt="3D card showcase"
            className="w-full h-full object-cover"
          />
          {/* Holographic glare */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.15) 45%, rgba(255,255,255,0.05) 50%, transparent 60%)",
            }}
            animate={{ left: ["-100%", "200%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
          />
        </motion.div>

        {/* Glow behind card */}
        <div className="absolute inset-0 -z-10 blur-3xl opacity-40 bg-orange-500/30 rounded-full scale-150" />
      </div>

      {/* Controls row */}
      <div className="mt-6 flex items-center gap-3">
        {[
          { icon: RotateCcw, label: "Rotate" },
          { icon: ScanSearch, label: "Zoom" },
          { icon: Sparkles, label: "Inspect" },
        ].map((ctrl) => (
          <div
            key={ctrl.label}
            className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-[10px] font-bold text-white/60"
          >
            <ctrl.icon className="w-3 h-3" />
            {ctrl.label}
          </div>
        ))}
      </div>

      {/* Badge */}
      <div className="mt-4 rounded-full bg-orange-500/10 border border-orange-500/20 px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-orange-400 flex items-center gap-1.5">
        <Sparkles className="w-3 h-3" />
        Interactive 3D Showcase
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────
   Main scroll-driven section
   ──────────────────────────────────────────────────────── */
/* Screen transition variants — hard swap, no bleed */
const screenVariants = {
  enter: { opacity: 0, y: 40, scale: 0.96 },
  active: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -30, scale: 0.98 },
};

const GLOW_COLORS = [
  "rgba(249,115,22,0.15)",
  "rgba(34,211,238,0.15)",
  "rgba(34,197,94,0.15)",
  "rgba(249,115,22,0.20)",
];

const screens = [UploadScreen, ScanningScreen, IdentifiedScreen, ThreeDScreen];

export function ScrollProductDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Map scroll to step — use 0.05-0.95 range so there's padding at top/bottom
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const clamped = Math.max(0, Math.min(1, (latest - 0.05) / 0.9));
    const step = Math.min(3, Math.floor(clamped * 4));
    setActiveStep(step);
  });

  const ActiveScreen = screens[activeStep];

  return (
    <section
      ref={containerRef}
      className="relative bg-[#0B0A09] border-t border-white/[0.03]"
      style={{ height: "400vh" }}
    >
      {/* Ambient glows */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[radial-gradient(ellipse,_rgba(249,115,22,0.07),_transparent_60%)] pointer-events-none" />
      <div className="absolute top-[60%] right-0 w-[400px] h-[400px] bg-[radial-gradient(circle,_rgba(6,182,212,0.04),_transparent_60%)] pointer-events-none" />

      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="mx-auto max-w-7xl w-full px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-2 items-center">

            {/* ── LEFT: Pinned text ── */}
            <div className="relative z-10">
              <p className="text-[10px] uppercase tracking-[0.3em] text-orange-500 font-semibold mb-3">
                How It Works
              </p>
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight mb-6">
                From Photo to<br />
                <span className="text-orange-500">3D Showcase</span>
              </h2>

              {/* Step indicators */}
              <div className="space-y-3">
                {STEPS.map((step, i) => {
                  const isActive = i === activeStep;
                  const isPast = i < activeStep;
                  return (
                    <motion.div
                      key={step.label}
                      layout
                      className={`flex items-start gap-4 rounded-xl border p-4 transition-colors duration-300 ${
                        isActive
                          ? "border-orange-500/30 bg-orange-500/[0.06]"
                          : isPast
                            ? "border-white/10 bg-white/[0.03]"
                            : "border-white/5 bg-transparent"
                      }`}
                      animate={{
                        opacity: isActive ? 1 : isPast ? 0.45 : 0.25,
                        scale: isActive ? 1 : 0.97,
                      }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                      {/* Step icon */}
                      <div
                        className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                          isActive
                            ? "bg-orange-500 shadow-lg shadow-orange-500/40"
                            : isPast
                              ? "bg-white/10"
                              : "bg-white/5"
                        }`}
                      >
                        {isPast ? (
                          <Check className={`w-4 h-4 text-white/50`} />
                        ) : (
                          <step.icon className={`w-4 h-4 ${isActive ? "text-black" : "text-white/30"}`} />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className={`text-[10px] uppercase tracking-wider font-bold mb-0.5 ${isActive ? "text-orange-400" : "text-zinc-600"}`}>
                          {step.label}
                        </p>
                        <h3 className={`font-bold text-sm uppercase tracking-wide ${isActive ? "text-white" : "text-zinc-500"}`}>
                          {step.title}
                        </h3>
                        <AnimatePresence mode="wait">
                          {isActive && (
                            <motion.p
                              key={`desc-${i}`}
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="text-xs text-zinc-400 mt-1.5 leading-relaxed"
                            >
                              {step.description}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Scroll progress bar */}
              <div className="mt-6 flex gap-1.5">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`h-1 rounded-full flex-1 transition-all duration-500 ${
                      i <= activeStep ? "bg-orange-500" : "bg-white/10"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* ── RIGHT: Animated product demo ── */}
            <div className="relative flex items-center justify-center">
              {/* Phone/browser frame */}
              <div className="relative w-full max-w-[380px] aspect-[9/14] rounded-2xl border border-white/10 bg-[#111111] overflow-hidden shadow-2xl shadow-black/60">
                {/* Top bar */}
                <div className="h-10 border-b border-white/5 flex items-center px-4 gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                    <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                    <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                  </div>
                  <div className="flex-1 mx-3 h-5 rounded-md bg-white/[0.04] flex items-center justify-center">
                    <span className="text-[9px] text-zinc-600 font-mono">trove.market/sell</span>
                  </div>
                </div>

                {/* Screen content — AnimatePresence hard swap, one screen at a time */}
                <div className="relative h-[calc(100%-40px)]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeStep}
                      variants={screenVariants}
                      initial="enter"
                      animate="active"
                      exit="exit"
                      transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                      className="absolute inset-0"
                    >
                      <ActiveScreen />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Glow behind frame */}
              <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none">
                <motion.div
                  className="w-[300px] h-[400px] rounded-full blur-3xl"
                  animate={{ backgroundColor: GLOW_COLORS[activeStep] }}
                  transition={{ duration: 0.6 }}
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
