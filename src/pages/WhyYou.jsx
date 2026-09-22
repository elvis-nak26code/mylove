import { AnimatePresence, animate, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MysteryCard from '../components/MysteryCard'
import { EASE, GlowButton, Reveal } from '../components/Ui'
import { reasons } from '../data/reasons'

export default function WhyYou() {
  const navigate = useNavigate()
  const [flipped, setFlipped] = useState([])
  const [phase, setPhase] = useState('cards') // cards | count | done
  const allFlipped = flipped.length === reasons.length

  const flip = (i) => setFlipped((f) => (f.includes(i) ? f : [...f, i]))
  return (
    <div className="flex min-h-svh flex-col items-center justify-center px-6 py-14">
      <AnimatePresence mode="wait">
        {phase === 'cards' && (
          <motion.div
            key="cards"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -30, filter: 'blur(8px)' }}
            transition={{ duration: 0.9, ease: EASE }}
            className="flex w-full flex-col items-center"
          >
            <Reveal className="text-center">
              <p className="text-[11px] uppercase tracking-[0.5em] text-ivory/40">
                chapitre trois
              </p>
              <h2 className="mt-3 font-display text-3xl italic text-ivory sm:text-4xl">
                Cinq cartes, face cachée.
              </h2>
              <p className="mt-3 text-sm text-ivory/50">Retourne-les une par une…</p>
            </Reveal>

            <div className="mt-12 grid w-full max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3">
              {reasons.map((reason, i) => (
                <MysteryCard
                  key={reason.id}
                  id={reason.id}
                  title={reason.title}
                  text={reason.text}
                  index={i}
                  flipped={flipped.includes(i)}
                  onFlip={() => flip(i)}
                />
              ))}
            </div>

            <AnimatePresence>
              {allFlipped && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.2, delay: 0.8, ease: EASE }}
                  className="mt-12 flex flex-col items-center gap-8 text-center"
                >
                  <p className="max-w-md font-display text-xl italic leading-relaxed text-gold-light text-glow-soft">
                    Cinq raisons… mais une seule vérité :
                    <br />
                    <span className="font-script text-3xl"> toi.</span>
                  </p>
                  <GlowButton onClick={() => setPhase('count')}>Une question me tracasse…</GlowButton>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {phase === 'count' && (
          <motion.div
            key="count"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: EASE }}
            className="flex flex-col items-center"
          >
            <p className="max-w-md text-center font-display text-2xl italic leading-snug text-ivory sm:text-3xl">
              Djamila, est-ce que tu sais
              <br />
              combien de fois je pense à toi ?
            </p>
            <div className="relative mt-14 flex min-h-40 items-center justify-center">
              <AnimatePresence mode="wait">
                {phase === 'count' && <Counter key="c" onDone={() => setPhase('done')} />}
              </AnimatePresence>
            </div>
            <p className="mt-10 text-[10px] uppercase tracking-[0.4em] text-ivory/35">
              attends…
            </p>
          </motion.div>
        )}

        {phase === 'done' && (
          <motion.div
            key="done"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: EASE }}
            className="flex flex-col items-center text-center"
          >
            <motion.span
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.6, ease: EASE }}
              className="font-display text-8xl text-gold-light text-glow-gold sm:text-9xl"
            >
              ∞
            </motion.span>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1.2, ease: EASE }}
              className="mt-10 max-w-md font-display text-2xl italic text-ivory"
            >
              Beaucoup trop pour que je puisse compter.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 1.2, ease: EASE }}
              className="mt-12"
            >
              <GlowButton onClick={() => navigate('/lettre')}>J’ai une lettre pour toi</GlowButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const numbers = [1, 17, 284, 1000]

function Counter({ onDone }) {
  const [i, setI] = useState(0)
  const last = i >= numbers.length
  useEffect(() => {
    if (last) return
    const id = setTimeout(() => setI((v) => v + 1), 2600)
    return () => clearTimeout(id)
  }, [i, last])

  useEffect(() => {
    if (last) onDone()
  }, [last, onDone])

  return (
    <motion.span
      key={i}
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, filter: 'blur(6px)' }}
      transition={{ duration: 0.9, ease: EASE }}
      className="relative font-display text-7xl text-ivory text-glow-soft sm:text-8xl"
    >
      {!last && <CountUp value={numbers[i]} />}
    </motion.span>
  )
}

function CountUp({ value }) {
  const [display, setDisplay] = useState(0)
  useEffect(() => {
    const controls = animate(0, value, {
      duration: 1.5,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return () => controls.stop?.()
  }, [value])
  return <>{display.toLocaleString('fr-FR')}</>
}