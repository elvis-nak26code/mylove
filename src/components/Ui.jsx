import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

/* Petit set d'outils visuels réutilisables, pour rester sobre. */

export const EASE = [0.16, 1, 0.3, 1]

/** Bouton discret : fin contour, léger glow, jamais criard. */
export function GlowButton({ children, onClick, tone = 'gold', className = '', disabled = false, delay = 0 }) {
  const tones = {
    gold: 'border-gold/40 bg-gold/5 text-gold-light hover:border-gold/70 hover:bg-gold/10 glow-gold',
    ivory: 'border-ivory/25 bg-ivory/5 text-ivory hover:border-ivory/50 hover:bg-ivory/10 glow-white',
  }
  return (
    <motion.button
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: EASE, delay }}
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: 1.04 }}
      disabled={disabled}
      onClick={onClick}
      className={`rounded-full border px-8 py-3 text-[13px] uppercase tracking-[0.28em] backdrop-blur-xl transition-colors duration-500 ${tones[tone]} ${className}`}
    >
      {children}
    </motion.button>
  )
}

/** Simple apparition en fondu + montée discrète. */
export function Reveal({ children, delay = 0, className = '', y = 24 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y, filter: 'blur(10px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 1.3, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/** Petite étoile décorative en DOM (twinkle doux). */
export function DecorativeStar({ x, y, size = 3, gold = false, className = '' }) {
  return (
    <span
      className={`pointer-events-none absolute animate-shimmer rounded-full ${className}`}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        animationDuration: `${2.6 + ((x * 7) % 30) / 10}s`,
        background: gold ? '#f2dda6' : '#fff',
        boxShadow: gold
          ? '0 0 10px rgba(217,184,120,0.9)'
          : '0 0 6px rgba(255,255,255,0.8)',
      }}
    />
  )
}

/** Enchaîne des étapes séparées par un délai, avec rappel au changement. */
export function useSequence(steps, { onStep = () => {} } = {}) {
  const [idx, setIdx] = useState(0)
  const timeouts = useRef([])

  useEffect(() => {
    timeouts.current.forEach(clearTimeout)
    timeouts.current = []
    onStep(idx)
    const t = steps[idx]
    if (t && t > 0) {
      const id = setTimeout(() => setIdx((i) => Math.min(i + 1, steps.length)), t)
      timeouts.current.push(id)
    }
    return () => timeouts.current.forEach(clearTimeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx])

  return { index: idx, done: idx >= steps.length }
}

/* Écrit un texte lettre à lettre, puis `complete` devient true. */
export function useTypewriter(text, { delay = 0, speed = 42 } = {}) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  useEffect(() => {
    const startId = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(startId)
  }, [delay])
  useEffect(() => {
    if (!started) return
    if (count >= text.length) return
    const id = setTimeout(() => setCount((c) => c + 1), speed)
    return () => clearTimeout(id)
  }, [started, count, text, speed])
  return { value: text.slice(0, count), done: count >= text.length }
}

/* ————————————————————————————————————————————————
 * Rappel d'instruction, affiché en haut de chaque page.
 * Garde la tête claire : Djamila sait toujours quoi faire ici.
 * `children` = la petite phrase d'aide propre à la page.
 * ———————————————————————————————————————————————— */
export function PageHint({ children, tone = 'ivory' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -16, filter: 'blur(8px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 1.4, ease: EASE, delay: 0.4 }}
      className="pointer-events-none fixed left-1/2 top-[4vh] z-50 w-[92vw] max-w-md -translate-x-1/2 text-center"
    >
      <p
        className={`mx-auto inline-block rounded-full border px-5 py-2 text-[10px] uppercase tracking-[0.35em] backdrop-blur-xl ${
          tone === 'gold'
            ? 'border-gold/40 bg-night/70 text-gold-light glow-gold'
            : 'border-ivory/15 bg-night/70 text-ivory/70'
        }`}
      >
        ✦ {children}
      </p>
    </motion.div>
  )
}