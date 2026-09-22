import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import InteractiveStar from '../components/InteractiveStar'
import MemoryCard from '../components/MemoryCard'
import { EASE, GlowButton, Reveal } from '../components/Ui'
import { draggableStar, memories, specialStar } from '../data/memories'
import { useEffect } from 'react'

export default function Memories() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState(null)
  const [openedIds, setOpenedIds] = useState([])
  const [surprise, setSurprise] = useState(false)
  const [surpriseStep, setSurpriseStep] = useState(0)
  const [dropped, setDropped] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const id = setTimeout(() => setReady(true), 9000)
    return () => clearTimeout(id)
  }, [])

  const openMemory = (m) => {
    setSelected(m)
    setOpenedIds((ids) => (ids.includes(m.id) ? ids : [...ids, m.id]))
  }

  const revealSurprise = () => {
    setSurprise(true)
    setTimeout(() => setSurpriseStep(1), 2400)
    setTimeout(() => setSurpriseStep(2), 5600)
  }
  const closeSurprise = () => {
    setSurprise(false)
    setSurpriseStep(0)
  }

  const messages = [
    'Tu viens de trouver quelque chose que je n’avais pas prévu de te montrer.',
    'Il y a des choses que je ressens pour toi que je n’arrive même pas à expliquer.',
  ]

  return (
    <div className="relative min-h-svh overflow-hidden px-6 py-10">
      {/* galaxie de fond */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[150vmin] w-[150vmin] -translate-x-1/2 -translate-y-1/2 animate-slow-spin opacity-50"
        style={{
          background:
            'conic-gradient(from 0deg, rgba(90,60,120,0.14), rgba(10,13,30,0) 15%, rgba(217,184,120,0.07) 30%, rgba(10,13,30,0) 45%, rgba(75,16,35,0.12) 60%, rgba(10,13,30,0) 78%, rgba(90,60,120,0.14))',
        }}
      />

      {/* titre */}
      <div className="relative z-20 pt-[7vh] text-center">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.5em] text-ivory/40">chapitre un</p>
          <h2 className="mt-3 font-display text-3xl italic text-ivory sm:text-5xl">Nos souvenirs</h2>
          <p className="mx-auto mt-4 max-w-sm font-body text-sm leading-relaxed text-ivory/55">
            Quelques souvenirs flottent quelque part dans ce ciel.
            <br />
            Touche les étoiles pour les ouvrir.
          </p>
        </Reveal>
      </div>

      {/* étoiles souvenirs */}
      <div className="pointer-events-none absolute inset-0 z-10">
        {memories.map((m) => (
          <InteractiveStar
            key={m.id}
            x={m.x}
            y={m.y}
            size={16}
            label={m.star}
            delay={0.6 + m.x * 0.02}
            onClick={() => openMemory(m)}
          />
        ))}
      </div>

      {/* étoile secrète */}
      <div className="pointer-events-none absolute inset-0 z-10">
        <InteractiveStar
          x={specialStar.x}
          y={specialStar.y}
          size={24}
          label={specialStar.label}
          gold
          delay={1.4}
          onClick={revealSurprise}
        />
      </div>

      {/* étoile à déplacer vers le centre */}
      <div className="pointer-events-none absolute inset-0 z-10">
        <InteractiveStar
          x={draggableStar.x}
          y={draggableStar.y}
          size={15}
          label={draggableStar.label}
          draggable
          hint={dropped ? undefined : draggableStar.hint}
          onDrop={() => setDropped(true)}
        />
      </div>

      {/* message après dépôt au centre */}
      <AnimatePresence>
        {dropped && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: EASE }}
            className="absolute bottom-[16vh] left-1/2 z-30 w-72 -translate-x-1/2 text-center font-display text-lg italic leading-snug text-gold-light text-glow-soft"
          >
            {draggableStar.dropMessage}
          </motion.p>
        )}
      </AnimatePresence>

      {/* bouton continuer */}
      <AnimatePresence>
        {ready && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: EASE }}
            className="absolute bottom-[7vh] left-1/2 z-30 -translate-x-1/2"
          >
            <GlowButton
              tone={openedIds.length > 0 ? 'gold' : 'ivory'}
              onClick={() => navigate('/devine')}
            >
              {openedIds.length > 0 ? 'Continuer mon voyage' : 'Suivre le chemin des étoiles'}
            </GlowButton>
          </motion.div>
        )}
      </AnimatePresence>

      {/* carte souvenir */}
      <AnimatePresence>
        {selected && <MemoryCard key={selected.id} memory={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>

      {/* étoile secrète */}
      <AnimatePresence>
        {surprise && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-40 flex items-center justify-center bg-night/80 p-6 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.1, ease: EASE }}
              onClick={closeSurprise}
              className="flex cursor-pointer flex-col items-center text-center"
            >
              <motion.span
                animate={{ scale: [1, 1.25, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
                className="text-5xl text-gold glow-gold"
              >
                ✦
              </motion.span>
              <div className="relative mt-8 min-h-24">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={surpriseStep}
                    initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -14, filter: 'blur(6px)' }}
                    transition={{ duration: 1.4, ease: EASE }}
                    className="max-w-md font-display text-xl italic leading-relaxed text-gold-light text-glow-soft sm:text-2xl"
                  >
                    {surpriseStep === 0 ? '…' : messages[surpriseStep - 1]}
                  </motion.p>
                </AnimatePresence>
              </div>
              <p className="mt-10 text-[10px] uppercase tracking-[0.35em] text-ivory/35">
                touche pour refermer
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}