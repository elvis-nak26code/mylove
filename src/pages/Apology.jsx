import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LoveLetter from '../components/LoveLetter'
import { EASE, GlowButton, Reveal } from '../components/Ui'
import { letterAfter, loveLetter } from '../data/loveLetter'

const paths = [
  {
    key: 'a-nous',
    title: 'Un chapitre entre nous deux',
    text: 'Celui qu’on n’a pas encore écrit. Il t’attendra, aussi longtemps qu’il faudra.',
  },
  {
    key: 'nos-rituels',
    title: 'Créer nos petits rituels',
    text: 'Un message le matin, une musique le soir, une promesse d’écouter… de tout petits riens à nous.',
  },
  {
    key: 'decouvrir',
    title: 'Simplement continuer à se découvrir',
    text: 'C’est même ce que je préfère. Une promenade sans destination, tant que c’est avec toi.',
  },
]

export default function Apology() {
  const navigate = useNavigate()
  const [phase, setPhase] = useState('letter') // letter | write | saved | paths | chosen
  const [message, setMessage] = useState('')
  const [choice, setChoice] = useState(null)

  const saveMessage = () => {
    if (!message.trim()) return
    try {
      localStorage.setItem('msg-pour-djamila', JSON.stringify({ at: Date.now(), text: message.trim() }))
    } catch {
      /* stockage indisponible : on continue quand même */
    }
    setPhase('saved')
  }

  return (
    <div className="relative overflow-hidden">
      <AnimatePresence mode="wait">
        {phase === 'letter' && (
          <LoveLetter key="letter" letter={loveLetter} onEnd={() => setPhase('write')} />
        )}

        {phase === 'write' && (
          <motion.div
            key="write"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -24, filter: 'blur(8px)' }}
            transition={{ duration: 1, ease: EASE }}
            className="flex min-h-svh flex-col items-center justify-center px-6 py-14"
          >
            <Reveal className="text-center">
              <p className="text-[11px] uppercase tracking-[0.5em] text-ivory/40">
                une réponse, si tu veux
              </p>
              <h2 className="mt-3 font-display text-3xl italic text-ivory sm:text-4xl">
                {letterAfter[0]}
              </h2>
              <p className="mt-4 text-base text-ivory/60">
                Si tu pouvais me dire une seule chose maintenant…
              </p>
            </Reveal>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1, ease: EASE }}
              className="mt-10 w-full max-w-lg"
            >
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows="4"
                placeholder="Écris ici… rien ne quitte ton téléphone."
                className="glass w-full resize-none rounded-3xl px-6 py-5 font-body text-[15px] leading-relaxed text-ivory placeholder:text-ivory/30 focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/40"
              />
              <div className="mt-5 flex justify-center">
                <GlowButton
                  onClick={saveMessage}
                  disabled={!message.trim()}
                  tone={message.trim() ? 'gold' : 'ivory'}
                >
                  Garder ce message
                </GlowButton>
              </div>
              <p className="mt-4 text-center text-[11px] tracking-[0.25em] text-ivory/30">
                enregistré uniquement dans ton appareil
              </p>
            </motion.div>
          </motion.div>
        )}

        {phase === 'saved' && (
          <motion.div
            key="saved"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: EASE }}
            className="flex min-h-svh flex-col items-center justify-center px-6 text-center"
          >
            <motion.span
              animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
              className="text-3xl text-gold glow-gold"
            >
              ✦
            </motion.span>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1.2, ease: EASE }}
              className="mt-8 font-display text-3xl italic text-ivory"
            >
              Merci de me l’avoir dit.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 1.2, ease: EASE }}
              className="mt-12"
            >
              <GlowButton onClick={() => setPhase('paths')}>Et si, un jour…</GlowButton>
            </motion.div>
          </motion.div>
        )}

        {phase === 'paths' && (
          <motion.div
            key="paths"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -24, filter: 'blur(8px)' }}
            transition={{ duration: 1, ease: EASE }}
            className="flex min-h-svh flex-col items-center justify-center px-6 py-14"
          >
            <Reveal className="text-center">
              <p className="text-[11px] uppercase tracking-[0.5em] text-ivory/40">
                aucune pression
              </p>
              <h2 className="max-w-xl font-display text-2xl italic leading-snug text-ivory sm:text-3xl">
                Et si un jour tu décidais de me laisser une nouvelle chance…
              </h2>
            </Reveal>

            <div className="mt-12 flex w-full max-w-lg flex-col gap-4">
              {paths.map((p, i) => (
                <motion.button
                  key={p.key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: choice ? (choice === p.key ? 1 : 0.3) : 1,
                    y: 0,
                    scale: choice === p.key ? 1.04 : 1,
                  }}
                  transition={{ duration: 0.8, ease: EASE, delay: 0.3 + i * 0.16 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={Boolean(choice)}
                  onClick={() => setChoice(p.key)}
                  className={`rounded-2xl border px-7 py-5 text-left transition-colors duration-700 ${
                    choice === p.key
                      ? 'border-gold/70 bg-gold/10 glow-gold'
                      : 'border-white/10 bg-white/[0.03] hover:border-ivory/40'
                  }`}
                >
                  <p className="font-display text-xl italic text-ivory">{p.title}</p>
                </motion.button>
              ))}
            </div>

            <AnimatePresence>
              {choice && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.2, ease: EASE }}
                  className="mt-10 flex flex-col items-center gap-8 text-center"
                >
                  <p className="max-w-md font-display text-lg italic leading-relaxed text-gold-light text-glow-soft">
                    {paths.find((p) => p.key === choice)?.text}
                  </p>
                  <GlowButton onClick={() => navigate('/futur')}>
                    Je m’imagine notre futur
                  </GlowButton>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}