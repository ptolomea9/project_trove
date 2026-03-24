"use client"

import { useEffect, useRef, useCallback } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  tx: number
  ty: number
  size: number
  r: number
  g: number
  b: number
  speed: number
  force: number
}

interface ParticleTextProps {
  text?: string
  className?: string
  color?: { r: number; g: number; b: number }
  onComplete?: () => void
  delay?: number
}

export function ParticleText({
  text = "COME ALIVE.",
  className = "",
  color = { r: 249, g: 115, b: 22 }, // orange-500
  onComplete,
  delay = 0,
}: ParticleTextProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)
  const startedRef = useRef(false)

  const init = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas || startedRef.current) return
    startedRef.current = true

    const ctx = canvas.getContext("2d")!
    const dpr = Math.min(window.devicePixelRatio, 2)
    const rect = canvas.getBoundingClientRect()

    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    const w = rect.width
    const h = rect.height

    // Render text offscreen to get pixel data
    const offscreen = document.createElement("canvas")
    offscreen.width = w
    offscreen.height = h
    const offCtx = offscreen.getContext("2d")!

    // Match the hero font style
    const fontSize = Math.min(w * 0.18, 120)
    offCtx.fillStyle = "white"
    offCtx.font = `900 ${fontSize}px system-ui, -apple-system, sans-serif`
    offCtx.textAlign = "center"
    offCtx.textBaseline = "middle"
    offCtx.fillText(text, w / 2, h / 2)

    const imageData = offCtx.getImageData(0, 0, w, h)
    const pixels = imageData.data
    const step = 4 // pixel sampling density

    // Create particles from text pixels
    const particles: Particle[] = []
    for (let y = 0; y < h; y += step) {
      for (let x = 0; x < w; x += step) {
        const i = (y * w + x) * 4
        if (pixels[i + 3] > 128) {
          // Spawn from random positions around the edges
          const angle = Math.random() * Math.PI * 2
          const dist = Math.max(w, h)
          particles.push({
            x: w / 2 + Math.cos(angle) * dist * (0.5 + Math.random()),
            y: h / 2 + Math.sin(angle) * dist * (0.5 + Math.random()),
            vx: 0,
            vy: 0,
            tx: x,
            ty: y,
            size: Math.random() * 2 + 1,
            r: color.r + Math.floor(Math.random() * 40 - 20),
            g: color.g + Math.floor(Math.random() * 30 - 15),
            b: color.b + Math.floor(Math.random() * 20 - 10),
            speed: Math.random() * 4 + 3,
            force: Math.random() * 0.04 + 0.02,
          })
        }
      }
    }

    let settled = 0
    let completeFired = false

    const animate = () => {
      ctx.clearRect(0, 0, w, h)
      settled = 0

      for (const p of particles) {
        const dx = p.tx - p.x
        const dy = p.ty - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < 1) {
          p.x = p.tx
          p.y = p.ty
          settled++
        } else {
          // Steering towards target
          const proximity = dist < 80 ? dist / 80 : 1
          const ax = (dx / dist) * p.speed * proximity - p.vx
          const ay = (dy / dist) * p.speed * proximity - p.vy
          const aMag = Math.sqrt(ax * ax + ay * ay)
          if (aMag > 0) {
            p.vx += (ax / aMag) * p.force * dist * 0.02
            p.vy += (ay / aMag) * p.force * dist * 0.02
          }
          p.x += p.vx
          p.y += p.vy
          // Damping
          p.vx *= 0.95
          p.vy *= 0.95
        }

        ctx.fillStyle = `rgb(${p.r},${p.g},${p.b})`
        ctx.fillRect(p.x, p.y, p.size, p.size)
      }

      // Fire onComplete when 95% of particles have settled
      if (!completeFired && settled > particles.length * 0.95) {
        completeFired = true
        onComplete?.()
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
  }, [text, color, onComplete])

  useEffect(() => {
    const timer = setTimeout(init, delay)
    return () => {
      clearTimeout(timer)
      cancelAnimationFrame(rafRef.current)
    }
  }, [init, delay])

  return (
    <canvas
      ref={canvasRef}
      className={`w-full ${className}`}
      style={{ height: "clamp(60px, 12vw, 140px)" }}
    />
  )
}
