import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const isFinePointer = () => window.matchMedia('(pointer: fine)').matches

/**
 * Curseur lumineux (desktop uniquement).
 * Un point suit le doigt instantanément, un halo le poursuit doucement.
 * Le halo grossit au passage sur tout élément interactif.
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [halo, setHalo] = useState({ x: -100, y: -100 })

  useEffect(() => {
    setEnabled(isFinePointer())
    const mq = window.matchMedia('(pointer: fine)')
    const onChange = () => setEnabled(mq.matches)
    mq.addEventListener?.('change', onChange)
    return () => mq.removeEventListener?.('change', onChange)
  }, [])

  useEffect(() => {
    if (!enabled) return
    let target = { x: -100, y: -100 }
    let haloPos = { x: -100, y: -100 }
    setPos(target)
    setHalo(haloPos)

    const onMove = (e) => {
      target = { x: e.clientX, y: e.clientY }
      setPos(target)
    }
    const onOver = (e) => {
      const el = e.target.closest?.(
        'a, button, [data-cursor], input, textarea, [role="button"]',
      )
      setHovering(Boolean(el))
    }

    let raf
    const loop = () => {
      haloPos.x += (target.x - haloPos.x) * 0.14
      haloPos.y += (target.y - haloPos.y) * 0.14
      setHalo({ x: haloPos.x, y: haloPos.y })
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      cancelAnimationFrame(raf)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <>
      <motion.div
        animate={{ x: pos.x - 6, y: pos.y - 6, scale: hovering ? 0.6 : 1 }}
        transition={{ duration: 0.08 }}
        className="pointer-events-none fixed left-0 top-0 z-[100] h-3 w-3 rounded-full"
        style={{ background: 'rgba(255,248,230,0.95)', boxShadow: '0 0 12px rgba(255,240,200,0.9)' }}
      />
      <motion.div
        animate={{ x: halo.x - 20, y: halo.y - 20, scale: hovering ? 1.7 : 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="pointer-events-none fixed left-0 top-0 z-[99] h-10 w-10 rounded-full border"
        style={{
          borderColor: 'rgba(217,184,120,0.35)',
          background: 'radial-gradient(circle, rgba(217,184,120,0.14) 0%, rgba(217,184,120,0) 70%)',
          boxShadow: '0 0 24px rgba(217,184,120,0.18)',
        }}
      />
    </>
  )
}