import { motion } from 'framer-motion'
import { useState } from 'react'
import { EASE, GlowButton } from './Ui'

/**
 * L'enveloppe : s'ouvre avec un rabat animé, puis la lettre
 * se déplie en plein écran, paragraphe après paragraphe.
 */
export default function LoveLetter({ letter, onEnd }) {
  const [stage, setStage] = useState('closed')

  const open = () => {
    setStage('opening')
    setTimeout(() => setStage('open'), 1700)
  }

  const close = () => {
    setStage('closed')
    if (onEnd) onEnd()
  }

  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center px-6">
      {stage === 'closed' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: EASE }}
          className="w-full max-w-xl"
        >
          <p className="mb-12 text-center font-display text-2xl italic leading-snug text-ivory sm:text-3xl">
            J’ai quelque chose à te dire
            <br />
            sans interruption.
          </p>

          {/* ——— L'enveloppe ——— */}
          <div className="relative mx-auto h-52 w-80 max-w-full sm:h-60 sm:w-96">
            <div className="absolute inset-0 overflow-hidden rounded-t-xl rounded-b-[10px] border border-gold/25 bg-gradient-to-br from-midnight via-deep to-velvet shadow-[0_0_60px_rgba(90,60,120,0.25)]">
              <div className="absolute inset-0 opacity-40 [background:radial-gradient(120%_100%_at_50%_0%,rgba(217,184,120,0.18),transparent_60%)]" />
              {/* rabat */}
              <div
                className="absolute inset-x-0 top-0 h-1/2 origin-top border-b border-gold/20 bg-gradient-to-b from-velvet/90 to-midnight"
                style={{ clipPath: 'polygon(0 0, 100% 0, 50% 96%)' }}
              />
            </div>
            {/* cartouche */}
            <div className="absolute inset-x-10 bottom-4 flex items-center justify-center rounded-full border border-gold/30 bg-gold/10 px-4 py-2">
              <span className="font-script text-lg text-gold-light">à Djamila</span>
            </div>
          </div>

          <div className="mt-12 text-center">
            <GlowButton onClick={open}>Ouvrir ma lettre</GlowButton>
          </div>
        </motion.div>
      )}

      {stage === 'opening' && (
        <motion.div
          className="relative h-52 w-80 max-w-full sm:h-60 sm:w-96"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {/* lettre qui sort de l'enveloppe */}
          <motion.div
            initial={{ y: 0, opacity: 0.4 }}
            animate={{ y: -260, opacity: 1 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.65 }}
            className="pointer-events-none absolute inset-x-2 -top-40 rounded-lg border border-ivory/20 bg-[#f6f1e6] p-6 text-deep shadow-2xl"
          >
            <p className="font-display text-xs italic tracking-widest text-deep/60">Djamila…</p>
            <div className="mt-3 space-y-2">
              <div className="h-1.5 w-11/12 rounded bg-deep/15" />
              <div className="h-1.5 w-9/12 rounded bg-deep/15" />
              <div className="h-1.5 w-10/12 rounded bg-deep/10" />
            </div>
          </motion.div>
          {/* flash de lumière */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.55, 0] }}
            transition={{ duration: 1.6, ease: 'easeOut' }}
            className="absolute -inset-16 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(242,221,166,0.9), transparent 70%)' }}
          />
        </motion.div>
      )}

      {stage === 'open' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-x-0 top-0 z-30 flex h-svh items-center justify-center overflow-y-auto bg-night/85 p-4 backdrop-blur-2xl sm:p-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="relative my-8 w-full max-w-2xl rounded-3xl border border-ivory/20 bg-[#f6f1e6] px-7 py-10 text-deep shadow-2xl sm:px-12 sm:py-14"
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-2 rounded-t-3xl bg-gradient-to-r from-gold/70 via-gold-light to-gold/70" />
            <p className="mb-8 text-center font-script text-4xl text-bordeaux-bright/80 sm:text-5xl">
              ma lettre
            </p>
            <div className="space-y-6">
              {letter.map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, ease: EASE, delay: 0.5 + i * 0.65 }}
                  className="font-display text-lg leading-relaxed text-deep/85 sm:text-xl"
                >
                  {line}
                </motion.p>
              ))}
            </div>
            <div className="mt-10 flex justify-end">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + letter.length * 0.65 + 0.6 }}
                className="font-script text-2xl text-bordeaux-bright/80"
              >
                Re.
              </motion.p>
            </div>
            <div className="mt-6 flex justify-center">
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + letter.length * 0.65 + 1.2 }}
                whileTap={{ scale: 0.97 }}
                onClick={close}
                className="rounded-full border border-deep/20 bg-deep/5 px-8 py-3 text-[12px] uppercase tracking-[0.3em] text-deep/70 transition hover:bg-deep hover:text-[#f6f1e6]"
              >
                Refermer la lettre
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}