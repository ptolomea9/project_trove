"use client";

import { useRef, useState, useCallback, type MouseEvent } from "react";

interface HoverCard3DProps {
  imageUrl: string;
  name?: string;
  subtitle?: string;
  price?: string;
  isHolo?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
}

export function HoverCard3D({
  imageUrl,
  name,
  subtitle,
  price,
  isHolo = false,
  size = "md",
  className = "",
  onClick,
}: HoverCard3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("");
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const sizes = {
    sm: "w-36 sm:w-40",
    md: "w-48 sm:w-56",
    lg: "w-64 sm:w-72",
  };

  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateX = (0.5 - y) * 25;
    const rotateY = (x - 0.5) * 25;
    setTransform(
      `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.08, 1.08, 1.08)`
    );
    setGlare({ x: x * 100, y: y * 100, opacity: 0.35 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTransform("");
    setGlare({ x: 50, y: 50, opacity: 0 });
    setIsHovered(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  return (
    <div
      className={`group relative ${sizes[size]} ${className}`}
      style={{ perspective: "800px" }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        onClick={onClick}
        className="relative cursor-pointer transition-all duration-300 ease-out rounded-xl overflow-hidden shadow-xl shadow-black/40"
        style={{
          transform: transform || "perspective(600px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        {/* Card image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt={name || "Trading card"}
          className="w-full h-auto block rounded-xl"
          loading="lazy"
          draggable={false}
        />

        {/* Holographic glare overlay */}
        {isHolo && (
          <div
            className="absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}), rgba(120,119,198,${glare.opacity * 0.5}), rgba(255,200,100,${glare.opacity * 0.3}), transparent 60%)`,
              mixBlendMode: "overlay",
            }}
          />
        )}

        {/* Shine sweep on hover */}
        <div
          className="absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-300"
          style={{
            background: `linear-gradient(115deg, transparent 30%, rgba(255,255,255,${isHovered ? 0.12 : 0}) 45%, transparent 55%)`,
          }}
        />

        {/* Edge highlight */}
        <div
          className="absolute inset-0 rounded-xl pointer-events-none ring-1 ring-white/10 transition-all duration-300"
          style={{
            boxShadow: isHovered
              ? "0 0 30px rgba(249,115,22,0.15), 0 20px 60px rgba(0,0,0,0.5)"
              : "0 4px 20px rgba(0,0,0,0.3)",
          }}
        />
      </div>

      {/* Card info below (optional) */}
      {(name || price) && (
        <div className="mt-3 text-center transition-all duration-300 group-hover:translate-y-0 translate-y-0">
          {name && (
            <p className="text-xs font-bold text-white truncate">{name}</p>
          )}
          {subtitle && (
            <p className="text-[10px] text-zinc-500 truncate">{subtitle}</p>
          )}
          {price && (
            <p className="text-sm font-black text-orange-500 mt-0.5 tabular-nums">
              {price}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
