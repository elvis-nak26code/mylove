import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { EASE, GlowButton, Reveal } from '../components/Ui'
import { guessAnswers, guessReveal } from '../data/reasons'

const revealDurations = [0, 2400, 2500, 3000, 3400]

export default function Feelings() {
  const navigate = useNavigate()
  const [picked, setPicked] = useState(null)
  const [revealed, setRevealed] = useState(false)
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (!revealed || step >= guessReveal.length) return
    const id = setTimeout(() => setStep((s) => s + 1), revealDurations[step])
    return () => clearTimeout(id)
  }, [revealed, step])

  const choose = (key) => {
    if (picked) return
    setPicked(key)
    setTimeout(() => setRevealed(true), 2300)
  }

  const done = step >= guessReveal.length

  return (
    <div className="flex min-h-svh flex-col items-center justify-center px-6 py-14">
      <Reveal className="text-center">
        <p className="text-[11px] uppercase tracking-[0.5em] text-ivory/40">chapitre deux</p>
        <h2 className="mt-3 font-display text-3xl italic leading-snug text-ivory sm:text-4xl">
          Selon toi, qu’est-ce que j’aime
          <br className="hidden sm:block" /> le plus chez toi ?
        </h2>
      </Reveal>

      <div className="mt-10 flex w-full max-w-md flex-col items-center gap-3">
        {guessAnswers.map((ans, i) => (
          <motion.button
            key={ans.key}
            initial={{ opacity: 0, y: 18 }}
            animate={{
              opacity: picked ? (picked === ans.key ? 1 : 0.25) : 1,
              y: 0,
              scale: picked === ans.key ? 1.06 : 1,
            }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.3 + i * 0.14 }}
            disabled={Boolean(picked)}
            onClick={() => choose(ans.key)}
            whileTap={{ scale: 0.97 }}
            className={`w-full rounded-2xl border px-6 py-4 font-display text-lg italic transition-colors duration-700 ${
              picked === ans.key
                ? 'border-gold/70 bg-gold/10 text-gold-light glow-gold'
                : 'border-white/10 bg-white/[0.03] text-ivory/70 hover:border-ivory/40 hover:text-ivory'
            }`}
          >
            {ans.label}
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="fixed inset-0 z-40 flex items-center justify-center bg-night/85 p-6 backdrop-blur-xl"
          >
            <AnimatePresence mode="wait">
              {!done ? (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -16, filter: 'blur(6px)' }}
                  transition={{ duration: 1.2, ease: EASE }}
                  className="text-center"
                >
                  <p className="max-w-md font-display text-2xl italic leading-relaxed text-ivory sm:text-3xl">
                    {guessReveal[step]}
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="reveal"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.2, ease: EASE }}
                  className="flex flex-col items-center"
                >
                  <motion.span
                    animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                    className="text-4xl text-gold glow-gold"
                  >
                    ✦
                  </motion.span>
                  <p className="mt-8 text-center font-display text-2xl italic leading-relaxed text-gold-light text-glow-soft sm:text-3xl">
                    Je ne suis pas tombé amoureux d’une seule chose chez toi.
                    <br />
                    <span className="font-script text-4xl sm:text-5xl">
                      {' '}
                      Je suis tombé amoureux de toi.
                    </span>
                  </p>
                  <div className="mt-12">
                    <GlowButton onClick={() => navigate('/pourquoi-toi')}>
                      Tes cinq raisons
                    </GlowButton>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}