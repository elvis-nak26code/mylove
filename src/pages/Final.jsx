import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { EASE } from '../components/Ui'

const lines = [
  { text: 'Djamila…', d: 3000 },
  { text: 'Je ne sais pas ce que tu ressens en découvrant tout ça.', d: 3800 },
  { text: 'Je ne sais pas si tu es encore fâchée.', d: 3600 },
  { text: 'Et je respecte ça.', d: 3400 },
  { text: 'Je voulais simplement que tu saches une chose.', d: 3800 },
  { text: 'JE T’AIME.', d: 4300, big: true },
  { text: 'MON DIAMANT.', d: 4300, big: true },
]

const lastLines = [
  'Une dernière petite chose…',
  'Peu importe la distance, les disputes ou les mauvais jours… certaines personnes restent précieuses.',
  'Tu es l’une de ces personnes pour moi.',
]

export default function Final() {
  const [step, setStep] = useState(0)
  const [finalStar, setFinalStar] = useState(false)
  const [lastLine, setLastLine] = useState(0)

  // séquence principale
  useEffect(() => {
    if (step >= lines.length) return
    const id = setTimeout(() => setStep((s) => s + 1), lines[step].d)
    return () => clearTimeout(id)
  }, [step])

  // la petite étoile finale
  useEffect(() => {
    if (step < lines.length) return
    const id = setTimeout(() => setFinalStar(true), 4000)
    return () => clearTimeout(id)
  }, [step])

  // dernière phrase ligne par ligne
  useEffect(() => {
    if (!finalStar || lastLine >= lastLines.length) return
    const id = setTimeout(() => setLastLine((l) => l + 1), 3800)
    return () => clearTimeout(id)
  }, [finalStar, lastLine])

  const dim = Math.min(0.6, step / (lines.length - 1) * 0.6)

  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 py-14">
      {/* assombrissement progressif */}
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-night transition-opacity duration-[3000ms]"
        style={{ opacity: dim }}
      />

      {/* texte central */}
      <div className="relative z-10 flex min-h-64 items-center justify-center">
        <AnimatePresence mode="wait">
          {step < lines.length ? (
            <motion.p
              key={step}
              initial={{ opacity: 0, y: step >= 5 ? 40 : 14, scale: step >= 5 ? 1.6 : 1, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, scale: step >= 5 ? 1 : 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: step >= 5 ? -40 : -14, scale: step >= 5 ? 0.94 : 1, filter: 'blur(8px)' }}
              transition={{ duration: step >= 5 ? 1.7 : 1.2, ease: EASE }}
              className={`max-w-2xl text-center ${
                step >= 5
                  ? 'font-display text-7xl font-semibold tracking-[0.18em] text-gold-light text-glow-gold sm:text-9xl'
                  : 'font-display text-2xl italic leading-relaxed text-ivory sm:text-3xl'
              }`}
            >
              {lines[step].text}
            </motion.p>
          ) : (
            <motion.div
              key="end"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2 }}
              className="text-center"
            >
              <motion.p
                initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 1.6, delay: 0.6, ease: EASE }}
                className="font-display text-3xl italic text-ivory sm:text-4xl"
              >
                Prends ton temps.
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* petite étoile finale */}
      <AnimatePresence>
        {finalStar && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.6, ease: EASE }}
            onClick={() => setLastLine(1)}
            aria-label="Une dernière petite chose"
            className="absolute bottom-[9vh] left-1/2 z-20 -translate-x-1/2"
          >
            <motion.span
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
              className="block text-xl text-gold glow-gold"
            >
              ✦
            </motion.span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* la toute dernière chose */}
      <AnimatePresence>
        {lastLine > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9 }}
            className="fixed inset-0 z-40 flex items-center justify-center bg-night/85 p-6 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.1, ease: EASE }}
              onClick={() => lastLine >= lastLines.length && setLastLine(0)}
              className="flex max-w-lg cursor-pointer flex-col items-center text-center"
            >
              <AnimatePresence mode="wait">
                <motion.p
                  key={lastLine}
                  initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -16, filter: 'blur(6px)' }}
                  transition={{ duration: 1.4, ease: EASE }}
                  className={`font-display italic leading-relaxed ${
                    lastLine === 1
                      ? 'text-base text-ivory/70 sm:text-lg'
                      : lastLine === 2
                        ? 'text-xl text-ivory sm:text-2xl'
                        : 'text-2xl text-gold-light text-glow-soft sm:text-3xl'
                  }`}
                >
                  {lastLines[lastLine - 1]}
                </motion.p>
              </AnimatePresence>

              {lastLine >= lastLines.length && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.8, duration: 1.4 }}
                  className="mt-12 flex flex-col items-center gap-6"
                >
                  <p className="font-script text-3xl text-gold-light">
                    je t’aime, Djamila.
                  </p>
                  <Link
                    to="/"
                    className="border-b border-ivory/20 pb-1 text-[10px] uppercase tracking-[0.35em] text-ivory/40 transition hover:text-ivory/70"
                  >
                    revoir ce voyage
                  </Link>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}