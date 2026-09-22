import { useEffect, useRef } from 'react'
import { sky } from '../lib/sky'

function mulberry32(seed) {
  return function () {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export default function StarField({ density = 280, seed = 1, meteors = true }) {
  const ref = useRef(null)
  const visibleRef = useRef(sky.on)

  useEffect(() => sky.subscribe((on) => (visibleRef.current = on)), [])

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    let raf
    let w = window.innerWidth
    let h = window.innerHeight

    const rand = mulberry32(seed * 48271 + 1337)
    const stars = []
    const pointer = { x: w / 2, y: h / 2 }
    const smooth = { x: w / 2, y: h / 2 }
    let t = 0
    let glow = sky.on
    const showers = []

    const makeStars = () => {
      stars.length = 0
      for (let i = 0; i < density; i++) {
        const layer = rand() < 0.55 ? 0 : rand() < 0.65 ? 1 : 2
        stars.push({
          x: rand(),
          y: rand(),
          r: (0.25 + rand() * 1.7) * (layer * 0.6 + 0.5),
          a: 0.12 + rand() * 0.65,
          speed: 0.4 + rand() * 1.7,
          phase: rand() * Math.PI * 2,
          layer,
          gold: rand() < 0.1,
        })
      }
    }

    const spawnShower = () => {
      if (!meteors || showers.length > 1) return
      const from = { x: 0.15 + rand() * 0.6, y: 0.05 + rand() * 0.25 }
      const dx = -0.35 - rand() * 0.4
      const dy = 0.55 + rand() * 0.35
      showers.push({ x: from.x, y: from.y, dx, dy, life: 1, max: 0.9 + rand() * 0.8 })
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const onMove = (e) => {
      pointer.x = e.clientX
      pointer.y = e.clientY
    }
    const onTouch = (e) => {
      const touch = e.touches[0]
      if (touch) {
        pointer.x = touch.clientX
        pointer.y = touch.clientY
      }
    }

    const frame = () => {
      t += 0.016
      glow += (visibleRef.current - glow) * 0.045
      smooth.x += (pointer.x - smooth.x) * 0.05
      smooth.y += (pointer.y - smooth.y) * 0.05

      const pvx = (smooth.x - w / 2) / (w / 2)
      const pvy = (smooth.y - h / 2) / (h / 2)

      ctx.clearRect(0, 0, w, h)

      for (const s of stars) {
        const driftX = Math.sin(t * 0.12 * s.speed + s.phase) * 0.0012
        const sx = (s.x + pvx * 0.025 * (s.layer + 1) + driftX + 1) % 1
        const sy = (s.y + pvy * 0.018 * (s.layer + 1) + 1) % 1
        const tw = 0.55 + 0.45 * Math.sin(t * s.speed + s.phase)
        const alpha = s.a * tw * glow

        if (alpha < 0.02) continue

        const px = sx * w
        const py = sy * h
        const size = s.r * (0.85 + 0.3 * Math.sin(t * s.speed * 0.8 + s.phase))

        ctx.beginPath()
        if (s.gold && glow > 0.4) {
          ctx.fillStyle = `rgba(242, 221, 166, ${alpha})`
          ctx.shadowBlur = size * 9
          ctx.shadowColor = 'rgba(217, 184, 120, 0.9)'
        } else {
          ctx.fillStyle = `rgba(244, 240, 255, ${alpha})`
          ctx.shadowBlur = size * 6
          ctx.shadowColor = 'rgba(220, 222, 255, 0.7)'
        }
        ctx.arc(px, py, size, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0

        if (s.layer === 2) {
          ctx.beginPath()
          ctx.fillStyle = `rgba(255,255,255,${alpha * 0.14})`
          ctx.arc(px, py, size * 3.4, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      for (let i = showers.length - 1; i >= 0; i--) {
        const s = showers[i]
        s.x += s.dx * 0.008
        s.y += s.dy * 0.008
        s.life -= 0.016 / s.max
        if (s.life <= 0) {
          showers.splice(i, 1)
          continue
        }
        const trail = 18
        const a = s.life * glow
        const grad = ctx.createLinearGradient(
          s.x * w,
          s.y * h,
          (s.x - s.dx * trail) * w,
          (s.y - s.dy * trail) * h,
        )
        grad.addColorStop(0, `rgba(242, 226, 190, ${a})`)
        grad.addColorStop(1, 'rgba(242, 226, 190, 0)')
        ctx.strokeStyle = grad
        ctx.lineWidth = 1.4
        ctx.beginPath()
        ctx.moveTo(s.x * w, s.y * h)
        ctx.lineTo((s.x - s.dx * trail) * w, (s.y - s.dy * trail) * h)
        ctx.stroke()
      }

      if (rand() < 0.004 && meteors) spawnShower()

      raf = requestAnimationFrame(frame)
    }

    makeStars()
    resize()
    frame()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('touchmove', onTouch, { passive: true })

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('touchmove', onTouch)
    }
  }, [density, seed, meteors])

  return <canvas ref={ref} className="pointer-events-none fixed inset-0 z-0 h-full w-full" />
}