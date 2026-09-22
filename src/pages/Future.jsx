import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Constellation from '../components/Constellation'
import { Reveal } from '../components/Ui'

const dreams = [
  { label: 'Voyager', text: 'Prendre un train juste pour un paysage lointain, et le partager avec toi.' },
  { label: 'Construire', text: 'Construire un chez-nous, même petit, où tu te sens enfin en sécurité.' },
  { label: 'Grandir', text: 'Grandir à tes côtés, devenir doucement les meilleures versions de nous.' },
  { label: 'Réussir', text: 'Te voir réussir dans la médecine, et être fier de toi à chaque étape.' },
  { label: 'Se soutenir', text: 'Être là dans les jours lourds, sans toujours avoir besoin de mots.' },
  { label: 'Rire', text: 'Rire pour rien, longtemps, jusqu’à ce que le temps oublie de passer.' },
]

export default function Future() {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-svh flex-col items-center justify-center px-4 py-14">
      <Reveal className="mb-10 text-center">
        <p className="text-[11px] uppercase tracking-[0.5em] text-ivory/40">chapitre cinq</p>
        <h2 className="mt-3 font-display text-3xl italic text-ivory sm:text-4xl">
          Notre futur, dessiné dans le ciel.
        </h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1.4, delay: 0.8 }}
          className="mt-3 text-[11px] uppercase tracking-[0.35em] text-ivory/40"
        >
          — allume les points pour relier la constellation —
        </motion.p>
      </Reveal>

      <Constellation
        items={dreams}
        onDone={() => navigate('/final')}
      />
    </div>
  )
}