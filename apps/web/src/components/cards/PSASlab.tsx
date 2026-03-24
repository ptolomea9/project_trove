"use client";

import { useRef, useState, useCallback, type MouseEvent } from "react";

interface PSASlabProps {
  imageUrl: string;
  grade?: string;
  certNumber?: string;
  cardName?: string;
  year?: string;
  onClick?: () => void;
  className?: string;
}

export function PSASlab({
  imageUrl,
  grade = "10",
  certNumber = "63683350",
  cardName,
  year,
  onClick,
  className = "",
}: PSASlabProps) {
  const slabRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (!slabRef.current) return;
    const rect = slabRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateX = (0.5 - y) * 15;
    const rotateY = (x - 0.5) * 15;
    setTransform(
      `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`
    );
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTransform("");
    setIsHovered(false);
  }, []);

  return (
    <div
      ref={slabRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      onClick={onClick}
      className={`relative cursor-pointer transition-all duration-300 ease-out ${className}`}
      style={{
        transform: transform || "perspective(600px) rotateX(0deg) rotateY(0deg)",
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
    >
      {/* Outer slab case — clear plastic look */}
      <div
        className="relative rounded-lg overflow-hidden"
        style={{
          background: "linear-gradient(170deg, rgba(200,200,210,0.25) 0%, rgba(120,120,140,0.15) 40%, rgba(80,80,100,0.2) 100%)",
          padding: "6px",
          boxShadow: isHovered
            ? "0 25px 60px rgba(0,0,0,0.7), 0 0 30px rgba(249,115,22,0.1), inset 0 1px 0 rgba(255,255,255,0.15)"
            : "0 10px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
        }}
      >
        {/* PSA Red Label */}
        <div className="relative z-10 flex items-center justify-between rounded-t-[4px] px-2 py-[3px]"
          style={{
            background: "linear-gradient(180deg, #dc2626 0%, #b91c1c 100%)",
          }}
        >
          <div className="flex items-center gap-1">
            <span className="text-[7px] font-black text-white tracking-wider">PSA</span>
            <div className="h-2.5 w-px bg-white/30" />
            <span className="text-[6px] font-bold text-white/90 tracking-wide uppercase">
              {cardName || "Pokemon"}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[6px] text-white/70">{year || "2023"}</span>
            <div className="flex items-center justify-center rounded-sm bg-white px-1 py-px">
              <span className="text-[7px] font-black text-red-600">
                GEM MT
              </span>
            </div>
            <div className="flex items-center justify-center rounded-sm bg-white min-w-[16px] px-1 py-px">
              <span className="text-[9px] font-black text-red-600">{grade}</span>
            </div>
          </div>
        </div>

        {/* Card image area */}
        <div className="relative bg-gradient-to-b from-gray-800/50 to-gray-900/50 p-[6px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt={cardName || "Trading card"}
            className="w-full h-auto block rounded-[2px]"
            loading="lazy"
            draggable={false}
          />

          {/* Holographic glare on hover */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-[2px]"
            style={{
              background: isHovered
                ? "linear-gradient(135deg, transparent 20%, rgba(255,255,255,0.08) 40%, rgba(200,180,255,0.06) 50%, transparent 70%)"
                : "none",
            }}
          />
        </div>

        {/* Bottom cert strip */}
        <div className="flex items-center justify-center py-[2px] bg-white/5">
          <span className="text-[5px] text-white/40 tracking-[0.15em] font-medium">
            #{certNumber}
          </span>
        </div>

        {/* Case edge reflection */}
        <div
          className="absolute inset-0 rounded-lg pointer-events-none"
          style={{
            background: isHovered
              ? "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 30%, transparent 70%, rgba(255,255,255,0.04) 100%)"
              : "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 50%)",
          }}
        />
      </div>
    </div>
  );
}
