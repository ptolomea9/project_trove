"use client"

import { useState } from "react"

interface BubbleTextProps {
  text?: string
  className?: string
}

export function BubbleText({ text = "COME ALIVE.", className = "" }: BubbleTextProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <span
      onMouseLeave={() => setHoveredIndex(null)}
      className={`inline-block select-none ${className}`}
    >
      {text.split("").map((char, idx) => {
        const distance = hoveredIndex !== null ? Math.abs(hoveredIndex - idx) : null

        let weight = "font-black"
        let color = "text-orange-500"

        if (distance !== null) {
          switch (distance) {
            case 0:
              weight = "font-black"
              color = "text-orange-300"
              break
            case 1:
              weight = "font-extrabold"
              color = "text-orange-400"
              break
            case 2:
              weight = "font-bold"
              color = "text-orange-400/80"
              break
            default:
              weight = "font-black"
              color = "text-orange-500"
              break
          }
        }

        return (
          <span
            key={idx}
            onMouseEnter={() => setHoveredIndex(idx)}
            className={`transition-all duration-300 ease-in-out cursor-default ${weight} ${color}`}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        )
      })}
    </span>
  )
}
