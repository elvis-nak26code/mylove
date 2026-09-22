import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { EASE, GlowButton, Reveal } from '../components/Ui'
import { sky } from '../lib/sky'

const introLines = [
  'J’ai créé quelque chose pour toi.',
  'Mais avant de commencer...',
  'Promets-moi simplement de rester jusqu’à la dernière page.',
]

const introSteps = [900, 3200, 3000] // ms avant la ligne suivante

const NAME = ['D', 'J', 'A', 'M', 'I', 'L', 'A']

export default function Home() {
  const navigate = useNavigate()
  const [stage, setStage] = useState(() =>
    sessionStorage.getItem('djamila-promise') === '1' ? 'name' : 'intro',
  )
  const [line, setLine] = useState(0)
  const [touched, setTouched] = useState([])
  const [opened, setOpened] = useState(false)

  // On arrive : le ciel est éteint (ou déjà allumé lors d'une relecture).
  useEffect(() => {
    sky.set(stage === 'intro' ? 0 : 1)
  }, [stage])

  // Séquence des textes d'intro.
  useEffect(() => {
    if (stage !== 'intro' || line >= introSteps.length) return
    const id = setTimeout(() => setLine((l) => l + 1), introSteps[line])
    return () => clearTimeout(id)
  }, [stage, line])

  const promiseKept = () => {
    sessionStorage.setItem('djamila-promise', '1')
    sky.set(1)
    setStage('promise')
    setTimeout(() => setStage('welcome'), 2600)
    setTimeout(() => setStage('name'), 5200)
  }

  const allTouched = touched.length === NAME.length
  useEffect(() => {
    if (!allTouched) return
    const id = setTimeout(() => setStage('door'), 5200)
    return () => clearTimeout(id)
  }, [allTouched])

  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6">
      {/* ciel de la promesse : qq étoiles isolées */}
      <AnimatePresence>
        {stage === 'intro' && (
          <motion.div className="pointer-events-none absolute inset-0" exit={{ opacity: 0 }}>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute left-1/2 top-[38%] h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-white text-white"
              style={{ boxShadow: '0 0 14px rgba(255,255,255,0.9)' }}
            />
            {[
              [28, 24, 0.8],
              [70, 18, 1.1],
              [16, 62, 1.3],
              [84, 58, 0.9],
              [58, 74, 1.5],
              [40, 16, 1.7],
            ].map(([x, y, delay], i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.15, 0.7, 0.15] }}
                transition={{ duration: 4 + i * 0.7, repeat: Infinity, delay, ease: 'easeInOut' }}
                className="absolute h-1 w-1 rounded-full bg-white/70"
                style={{ left: `${x}%`, top: `${y}%`, boxShadow: '0 0 6px rgba(255,255,255,0.6)' }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ——— INTRO ——— */}
      <AnimatePresence mode="wait">
        {stage === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(8px)' }}
            transition={{ duration: 1 }}
            className="relative z-10 flex flex-col items-center"
          >
            <div className="flex min-h-[14rem] flex-col items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={line}
                  initial={{ opacity: 0, y: 12, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -12, filter: 'blur(6px)' }}
                  transition={{ duration: 1.2, ease: EASE }}
                  className="text-center font-display text-2xl italic leading-snug text-ivory sm:text-3xl"
                >
                  {introLines[Math.min(line, introLines.length - 1)]}
                </motion.p>
              </AnimatePresence>
            </div>

            {line >= 2 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.4, delay: 0.8, ease: EASE }}
                className="mt-4"
              >
                <GlowButton onClick={promiseKept}>Je reste</GlowButton>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* ——— EXPLOSION DE LUMIÈRE ——— */}
        {stage === 'promise' && (
          <motion.div
            key="promise"
            className="relative flex h-svh w-screen items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.3, opacity: 0 }}
              animate={{ scale: [0.3, 1, 14], opacity: [0, 1, 1, 0] }}
              transition={{ duration: 2.4, ease: 'easeOut', times: [0, 0.3, 0.62, 1] }}
              className="h-40 w-40 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(255,248,230,1) 0%, rgba(217,184,120,0.65) 40%, rgba(90,60,120,0.15) 70%, transparent 78%)' }}
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.9, delay: 0.2, ease: 'easeInOut' }}
              className="absolute inset-0 bg-[#fff7e6]"
            />
          </motion.div>
        )}

        {/* ——— BIENVENUE ——— */}
        {stage === 'welcome' && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.6 }}
            className="relative z-10 flex flex-col items-center"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="text-3xl text-gold glow-gold"
            >
              ✦
            </motion.span>
            <Reveal delay={0.4} className="mt-6 text-center font-display text-3xl italic leading-snug text-ivory sm:text-4xl">
              Bienvenue dans mon petit univers,
              <br />
              <span className="font-script text-4xl text-gold-light sm:text-5xl"> Djamila.</span>
            </Reveal>
          </motion.div>
        )}

        {/* ——— SON PRÉNOM ——— */}
        {stage === 'name' && (
          <motion.div
            key="name"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            transition={{ duration: 1 }}
            className="relative z-10 flex flex-col items-center"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ duration: 1.4, delay: 0.2 }}
              className="mb-10 text-center text-[11px] uppercase tracking-[0.4em] text-ivory/50"
            >
              — touche chaque lettre —
            </motion.p>
            <div className="flex justify-center gap-1 sm:gap-2">
              {NAME.map((letter, i) => {
                const isTouched = touched.includes(i)
                return (
                  <motion.button
                    key={i}
                    initial={{ opacity: 0, y: 26, rotate: -6 }}
                    animate={
                      isTouched
                        ? { opacity: 1, y: 0, rotate: 0, color: '#f2dda6', textShadow: '0 0 26px rgba(217,184,120,0.9)' }
                        : { opacity: [0, 1, 0.72, 1], y: 0, rotate: 0, color: 'rgba(243,236,221,0.85)' }
                    }
                    transition={{ duration: isTouched ? 0.9 : 1.2, delay: i * 0.22, ease: EASE }}
                    whileHover={{ scale: 1.18 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setTouched((t) => (t.includes(i) ? t : [...t, i]))}
                    className="font-display text-6xl font-light sm:text-8xl"
                    aria-label={`Lettre ${letter}`}
                  >
                    {letter}
                  </motion.button>
                )
              })}
            </div>

            <div className="mt-10 min-h-16">
              {allTouched && (
                <motion.p
                  initial={{ opacity: 0, y: 14, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 1.6, delay: 0.6, ease: EASE }}
                  className="max-w-md text-center font-display text-xl italic leading-snug text-gold-light text-glow-soft sm:text-2xl"
                >
                  Même ton prénom possède quelque chose
                  <br />
                  que les autres n’ont pas.
                </motion.p>
              )}
            </div>
          </motion.div>
        )}

        {/* ——— LA PORTE ——— */}
        {stage === 'door' && (
          <motion.div
            key="door"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            transition={{ duration: 1.2 }}
            className="relative z-10 flex flex-col items-center"
          >
            <Reveal>
              <p className="mb-10 max-w-md text-center font-display text-xl italic leading-snug text-ivory sm:text-2xl">
                Derrière cette porte, il y a
                <br />
                quelques morceaux de mon cœur.
              </p>
            </Reveal>

            {(!opened ? (
              <div style={{ perspective: 1200 }} className="relative mb-12 flex">
                <PortalDoors onOpen={() => setOpened(true)} />
              </div>
            ) : (
              <LightBurst onDone={() => navigate('/souvenirs')} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ——— Les battants de la porte ——— */
function PortalDoors({ onOpen }) {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    if (!open) return
    const id = setTimeout(onOpen, 1500)
    return () => clearTimeout(id)
  }, [open, onOpen])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative"
    >
      {/* lueur derrière */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={open ? { opacity: [0, 1, 0] } : { opacity: 0.7 }}
        transition={{ duration: 1.2 }}
        className="absolute left-1/2 top-1/2 h-64 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: 'radial-gradient(60% 60% at 50% 50%, rgba(242,221,166,0.9), rgba(217,184,120,0.2) 55%, transparent 75%)' }}
      />
      <div className="relative flex" style={{ perspective: 1400 }}>
        {/* battant gauche */}
        <motion.div
          animate={open ? { rotateY: -108 } : { rotateY: 0 }}
          transition={{ duration: 1.3, ease: EASE }}
          style={{ transformOrigin: 'left center', transformStyle: 'preserve-3d' }}
          className="relative h-72 w-32 rounded-3xl rounded-r-none border border-gold/30 bg-gradient-to-tr from-velvet via-midnight to-deep sm:h-80 sm:w-40"
        >
          <div className="absolute inset-0 rounded-3xl rounded-r-none opacity-40 [background:radial-gradient(80%_50%_at_30%_20%,rgba(217,184,120,0.3),transparent)]" />
        </motion.div>
        {/* battant droit */}
        <motion.div
          animate={open ? { rotateY: 108 } : { rotateY: 0 }}
          transition={{ duration: 1.3, ease: EASE }}
          style={{ transformOrigin: 'right center' }}
          className="relative h-72 w-32 rounded-3xl rounded-l-none border border-gold/30 bg-gradient-to-tl from-velvet via-midnight to-deep sm:h-80 sm:w-40"
        >
          <div className="absolute inset-0 rounded-3xl rounded-l-none opacity-40 [background:radial-gradient(80%_50%_at_70%_20%,rgba(217,184,120,0.3),transparent)]" />
        </motion.div>
      </div>

      {!open && (
        <div className="absolute inset-0 flex items-center justify-center">
          <GlowButton onClick={() => setOpen(true)} tone="gold">
            Ouvrir
          </GlowButton>
        </div>
      )}
    </motion.div>
  )
}

/* ——— Lumière traversant la porte ouverte ——— */
function LightBurst({ onDone }) {
  useEffect(() => {
    const id = setTimeout(onDone, 1800)
    return () => clearTimeout(id)
  }, [onDone])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 1, 0] }}
      transition={{ duration: 1.8, times: [0, 0.4, 0.7, 1] }}
      className="pointer-events-none absolute inset-0 z-50 bg-[#fff7e6]"
    />
  )
}