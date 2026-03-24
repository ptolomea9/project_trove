"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { RotateCcw, ZoomIn, ZoomOut, FlipHorizontal } from "lucide-react";

interface InteractiveCardProps {
  imageUrl: string;
  backImageUrl?: string;
  isHolo?: boolean;
  className?: string;
}

export function InteractiveCard({
  imageUrl,
  backImageUrl,
  isHolo = false,
  className = "",
}: InteractiveCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50 });

  // Determine which face is showing based on Y rotation
  const normalizedY = ((rotateY % 360) + 360) % 360;
  const showingBack = normalizedY > 90 && normalizedY < 270;

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    setIsDragging(true);
    setLastPos({ x: e.clientX, y: e.clientY });
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setGlare({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }
      if (!isDragging) return;
      const dx = e.clientX - lastPos.x;
      const dy = e.clientY - lastPos.y;
      setRotateY((prev) => prev + dx * 0.5);
      setRotateX((prev) => Math.max(-60, Math.min(60, prev - dy * 0.5)));
      setLastPos({ x: e.clientX, y: e.clientY });
    },
    [isDragging, lastPos]
  );

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    setScale((prev) => Math.max(0.5, Math.min(3, prev - e.deltaY * 0.002)));
  }, []);

  const handleReset = useCallback(() => {
    setRotateX(0);
    setRotateY(0);
    setScale(1);
  }, []);

  const handleFlip = useCallback(() => {
    setRotateY((prev) => prev + 180);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const prevent = (e: WheelEvent) => e.preventDefault();
    el.addEventListener("wheel", prevent, { passive: false });
    return () => el.removeEventListener("wheel", prevent);
  }, []);

  return (
    <div className={`relative ${className}`}>
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onWheel={handleWheel}
        className="relative w-full aspect-[2.5/3.5] cursor-grab active:cursor-grabbing select-none touch-none"
        style={{ perspective: "1000px" }}
      >
        <div
          className="w-full h-full relative"
          style={{
            transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`,
            transformStyle: "preserve-3d",
            transition: isDragging ? "none" : "transform 0.4s ease-out",
          }}
        >
          {/* FRONT FACE */}
          <div className="absolute inset-0 rounded-xl overflow-hidden shadow-2xl shadow-black/60" style={{ backfaceVisibility: "hidden" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageUrl}
              alt="Card front"
              className="w-full h-full object-cover"
              draggable={false}
            />

            {/* Holographic glare — front only */}
            {isHolo && !showingBack && (
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at ${glare.x}% ${glare.y}%,
                    rgba(255,255,255,0.25) 0%,
                    rgba(120,119,198,0.15) 20%,
                    rgba(255,200,100,0.1) 40%,
                    transparent 60%)`,
                  mixBlendMode: "overlay",
                  opacity: isDragging ? 0.8 : 0.4,
                  transition: "opacity 0.3s",
                }}
              />
            )}

            {/* Shine sweep */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `linear-gradient(${105 + rotateY * 0.5}deg, transparent 30%, rgba(255,255,255,0.1) 45%, transparent 55%)`,
              }}
            />
          </div>

          {/* BACK FACE */}
          <div className="absolute inset-0 rounded-xl overflow-hidden shadow-2xl shadow-black/60" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={backImageUrl || "/cards/pokemon-back.jpg"}
              alt="Card back"
              className="w-full h-full object-cover"
              draggable={false}
            />
          </div>

          {/* Card edge/thickness visible during rotation */}
          <div
            className="absolute top-0 bottom-0 rounded-sm"
            style={{
              width: "4px",
              left: "-2px",
              background: "linear-gradient(180deg, #d4c8b0, #e8dcc8, #d4c8b0)",
              transform: "rotateY(-90deg) translateZ(2px)",
              transformOrigin: "right center",
              backfaceVisibility: "hidden",
            }}
          />
          <div
            className="absolute top-0 bottom-0 rounded-sm"
            style={{
              width: "4px",
              right: "-2px",
              background: "linear-gradient(180deg, #d4c8b0, #e8dcc8, #d4c8b0)",
              transform: "rotateY(90deg) translateZ(2px)",
              transformOrigin: "left center",
              backfaceVisibility: "hidden",
            }}
          />
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-2 mt-4">
        <button
          onClick={() => setScale((s) => Math.min(3, s + 0.3))}
          className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
          title="Zoom in"
        >
          <ZoomIn className="h-4 w-4" />
        </button>
        <button
          onClick={() => setScale((s) => Math.max(0.5, s - 0.3))}
          className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
          title="Zoom out"
        >
          <ZoomOut className="h-4 w-4" />
        </button>
        <button
          onClick={handleFlip}
          className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
          title="Flip card"
        >
          <FlipHorizontal className="h-4 w-4" />
        </button>
        <button
          onClick={handleReset}
          className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
          title="Reset view"
        >
          <RotateCcw className="h-4 w-4" />
        </button>
      </div>

      <p className="text-center text-[10px] text-zinc-600 mt-2 uppercase tracking-widest">
        Drag to rotate &middot; Scroll to zoom &middot; Flip to see back
      </p>
    </div>
  );
}
