import { motion } from 'framer-motion'
import { useRef, useState } from 'react'

/**
 * Une étoile interactive placée en % de l'écran dans un conteneur plein écran.
 * - click / touch  -> animation lumineuse + onClick
 * - draggable      -> on peut la déplacer au doigt/souris
 * - dropTarget     -> affiche une zone au centre ; si déposée dedans, onDrop()
 */
export default function InteractiveStar({
  x,
  y,
  label = '✦',
  size = 16,
  gold = false,
  delay = 0,
  onClick,
  onDrop,
  draggable = false,
  className = '',
  hint = null,
}) {
  const starRef = useRef(null)
  const [pos, setPos] = useState({ mode: 'pct' })
  const [active, setActive] = useState(false)
  const [dragging, setDragging] = useState(false)

  const drag = useRef(null)

  const startDrag = (e) => {
    if (!draggable) return
    const rect = starRef.current
    const parent = rect.parentElement.getBoundingClientRect()
    const own = rect.getBoundingClientRect()
    drag.current = {
      parent,
      startX: e.clientX,
      startY: e.clientY,
      left: own.left - parent.left,
      top: own.top - parent.top,
      moved: false,
    }
    setDragging(true)
    const release = (ev) => {
      const d = drag.current
      if (d.moved) {
        const cx = window.innerWidth / 2
        const cy = window.innerHeight / 2
        const dx = ev.clientX - cx
        const dy = ev.clientY - cy
        if (Math.hypot(dx, dy) < 120 && onDrop) {
          onDrop()
        } else {
          setPos({ mode: 'pct' })
        }
      } else {
        setPos({ mode: 'pct' })
      }
      setDragging(false)
      drag.current = null
      cleanup()
    }
    const move = (ev) => {
      if (!drag.current) return
      const d = drag.current
      d.moved = Math.hypot(ev.clientX - d.startX, ev.clientY - d.startY) > 6
      setPos({
        mode: 'px',
        left: d.left + (ev.clientX - d.startX),
        top: d.top + (ev.clientY - d.startY),
      })
    }
    const cleanup = () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', release)
      window.removeEventListener('pointercancel', release)
    }
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', release)
    window.addEventListener('pointercancel', release)
  }

  const left = pos.mode === 'px' ? pos.left : `${x}%`
  const top = pos.mode === 'px' ? pos.top : `${y}%`

  return (
    <>
      {dragging && (
        <div
          className="pointer-events-none fixed left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
          style={{ width: 240, height: 240 }}
        >
          <div
            className="h-full w-full rounded-full border border-dashed"
            style={{
              borderColor: 'rgba(217,184,120,0.4)',
              boxShadow: 'inset 0 0 40px rgba(217,184,120,0.12)',
            }}
          />
          <p className="absolute -bottom-7 left-1/2 w-56 -translate-x-1/2 text-center font-body text-[11px] tracking-[0.2em] text-ivory/50">
            {hint || 'dépose-la ici…'}
          </p>
        </div>
      )}

      <motion.button
        ref={starRef}
        aria-label={label}
        initial={{ opacity: 0, scale: 0 }}
        animate={
          dragging
            ? { opacity: 1, scale: 1.15 }
            : active
              ? { opacity: 1, scale: [1.35, 1.2, 1.35] }
              : { opacity: pos.mode === 'pct' ? [0, 1, 0.8, 1] : 1, scale: [1, 1.12, 1] }
        }
        transition={{ duration: dragging ? 0.1 : 3.2, delay: dragging ? 0 : delay, repeat: dragging ? 0 : Infinity, ease: 'easeInOut' }}
        whileHover={{ scale: 1.35 }}
        style={{ left, top, width: size, height: size }}
        onClick={(e) => {
          if (dragging) return
          e.stopPropagation()
          setActive(true)
          setTimeout(() => setActive(false), 1200)
          if (onClick) onClick()
        }}
        onPointerDown={startDrag}
        onPointerMove={(e) => e.stopPropagation()}
        className={`pointer-events-auto absolute z-20 touch-none select-none rounded-full ${className}`}
      >
        <span
          className="block h-full w-full rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.35) 40%, rgba(255,255,255,0) 70%)',
            boxShadow: gold
              ? '0 0 16px rgba(217,184,120,0.85), 0 0 42px rgba(217,184,120,0.4)'
              : '0 0 12px rgba(240,240,255,0.8), 0 0 30px rgba(200,210,255,0.35)',
          }}
        />
      </motion.button>
    </>
  )
}