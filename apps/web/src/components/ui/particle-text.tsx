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
  color = { r: 249, g: 115, b: 22 },
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

    const ctx = canvas.getContext("2d", { alpha: true })!
    const dpr = Math.min(window.devicePixelRatio, 2)
    const rect = canvas.getBoundingClientRect()

    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    const w = rect.width
    const h = rect.height

    // Render text offscreen — match EXACT same font as the CSS BubbleText
    const offscreen = document.createElement("canvas")
    offscreen.width = w
    offscreen.height = h
    const offCtx = offscreen.getContext("2d")!

    // Match Tailwind responsive sizes exactly:
    // text-5xl = 3rem (48px), sm:text-6xl = 3.75rem (60px), lg:text-7xl = 4.5rem (72px)
    let fontSize: number
    if (window.innerWidth >= 1024) {
      fontSize = 72
    } else if (window.innerWidth >= 640) {
      fontSize = 60
    } else {
      fontSize = 48
    }

    // Use the project font (Chakra Petch) with matching weight and tracking
    const fontFamily = getComputedStyle(document.documentElement)
      .getPropertyValue("--font-chakra")
      .trim()
    const font = `900 ${fontSize}px ${fontFamily || '"Chakra Petch"'}, system-ui, sans-serif`

    offCtx.fillStyle = "white"
    offCtx.font = font
    offCtx.textAlign = "left"
    offCtx.textBaseline = "middle"
    // Apply tracking-tight (-0.025em) to match CSS
    offCtx.letterSpacing = `${fontSize * -0.025}px`
    offCtx.fillText(text, 0, h / 2 - 2)

    const imageData = offCtx.getImageData(0, 0, w, h)
    const pixels = imageData.data
    const step = 2

    const particles: Particle[] = []
    for (let y = 0; y < h; y += step) {
      for (let x = 0; x < w; x += step) {
        const i = (y * w + x) * 4
        if (pixels[i + 3] > 128) {
          particles.push({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            tx: x,
            ty: y,
            size: Math.random() * 1.5 + 1.5,
            r: color.r + Math.floor(Math.random() * 40 - 20),
            g: color.g + Math.floor(Math.random() * 30 - 15),
            b: color.b + Math.floor(Math.random() * 20 - 10),
            speed: Math.random() * 6 + 5,
            force: Math.random() * 0.06 + 0.04,
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
          p.vx *= 0.95
          p.vy *= 0.95
        }

        ctx.fillStyle = `rgb(${p.r},${p.g},${p.b})`
        ctx.fillRect(p.x, p.y, p.size, p.size)
      }

      if (!completeFired && settled > particles.length * 0.95) {
        completeFired = true
        onComplete?.()
      }

      if (settled < particles.length) {
        rafRef.current = requestAnimationFrame(animate)
      }
    }

    rafRef.current = requestAnimationFrame(animate)
  }, [text, color, onComplete])

  useEffect(() => {
    // Wait for fonts to load before initializing
    const start = () => {
      const timer = setTimeout(init, delay)
      return timer
    }

    let timer: ReturnType<typeof setTimeout>
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        timer = start()
      })
    } else {
      timer = start()
    }

    return () => {
      clearTimeout(timer)
      cancelAnimationFrame(rafRef.current)
    }
  }, [init, delay])

  return (
    <canvas
      ref={canvasRef}
      className={`w-full ${className}`}
      style={{ height: "100%", background: "transparent" }}
    />
  )
}
