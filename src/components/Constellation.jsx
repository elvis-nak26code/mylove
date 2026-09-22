import { motion } from 'framer-motion'
import { useState } from 'react'
import { EASE, GlowButton } from './Ui'

const layout = [
  { x: 22, y: 14 },
  { x: 50, y: 8 },
  { x: 78, y: 14 },
  { x: 66, y: 30 },
  { x: 50, y: 46 },
  { x: 34, y: 30 },
]

const edges = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [5, 0],
  [1, 4],
  [0, 5],
]

export default function Constellation({ items, onDone }) {
  const [active, setActive] = useState([])
  const [selected, setSelected] = useState(null)
  const always = items.map((_, i) => active[i] ?? false)
  const allActive = always.every(Boolean)

  const pick = (i) => {
    if (allActive) {
      setSelected(i)
      return
    }
    setActive((a) => {
      const next = [...a]
      next[i] = true
      return next
    })
    setSelected(i)
  }

  return (
    <div className="flex w-full max-w-4xl flex-col items-center px-4">
      <div className="relative w-full">
        <svg viewBox="0 0 100 56" className="w-full">
          {allActive &&
            edges.map(([a, b], i) => (
              <motion.line
                key={i}
                x1={layout[a].x}
                y1={layout[a].y}
                x2={layout[b].x}
                y2={layout[b].y}
                stroke="rgba(217,184,120,0.55)"
                strokeWidth="0.25"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.7, ease: 'easeInOut', delay: 0.5 + i * 0.18 }}
                style={{ filter: 'drop-shadow(0 0 2px rgba(217,184,120,0.8))' }}
              />
            ))}

          {items.map((item, i) => {
            const isActive = always[i]
            const isSelected = selected === i
            const n = layout[i]
            return (
              <g key={i}>
                <motion.circle
                  cx={n.x}
                  cy={n.y}
                  r={isActive ? 1.4 : 1}
                  fill={isActive ? '#f2dda6' : '#c9c9e8'}
                  animate={
                    isActive
                      ? { r: [1.4, 1.8, 1.4], opacity: isSelected ? 0.5 : 1 }
                      : { r: [1, 1.25, 1], opacity: [0.8, 1, 0.8] }
                  }
                  transition={{ duration: isActive ? 2 : 3, repeat: Infinity, ease: 'easeInOut' }}
                  style={isActive ? { filter: 'drop-shadow(0 0 3px #f2dda6)' } : undefined}
                />
                <motion.text
                  x={n.x}
                  y={n.y}
                  textAnchor="middle"
                  dy="-3.2"
                  className="select-none"
                  style={{
                    fill: isActive ? 'rgba(242,221,166,0.95)' : 'rgba(243,236,221,0.65)',
                    fontFamily: 'Cormorant Garamond, serif',
                    fontStyle: 'italic',
                    fontSize: 2.6,
                    letterSpacing: '0.08em',
                  }}
                >
                  {item.label}
                </motion.text>
                {/* zone cliquable invisible */}
                <circle
                  cx={n.x}
                  cy={n.y}
                  r={10}
                  fill="transparent"
                  className="cursor-pointer"
                  onClick={() => pick(i)}
                />
              </g>
            )
          })}
        </svg>
      </div>

      <div className="mt-2 min-h-16 text-center">
        {selected !== null && (
          <motion.p
            key={selected}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE }}
            className="font-display text-lg italic leading-relaxed text-ivory/85"
          >
            {items[selected].text}
          </motion.p>
        )}
        {!allActive && selected === null && (
          <p className="font-display text-sm italic tracking-wide text-ivory/40">
            Touche chaque point pour allumer la constellation…
          </p>
        )}
      </div>

      {allActive && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 + edges.length * 0.18 + 0.4, duration: 1, ease: EASE }}
          className="mt-8 flex flex-col items-center gap-8"
        >
          <p className="max-w-md text-center font-display text-xl italic leading-snug text-gold-light text-glow-soft">
            Certaines choses ne prennent leur forme
            <br />
            qu’une fois qu’on les relie.
          </p>
          <GlowButton onClick={onDone}>Continuer mon voyage</GlowButton>
        </motion.div>
      )}
    </div>
  )
}