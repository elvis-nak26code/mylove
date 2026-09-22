import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { EASE } from './Ui'

export default function MemoryCard({ memory, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      onClick={onClose}
      className="fixed inset-0 z-40 flex items-end justify-center bg-night/70 p-4 backdrop-blur-md sm:items-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.94, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: 40, scale: 0.96, filter: 'blur(6px)' }}
        transition={{ duration: 0.7, ease: EASE }}
        onClick={(e) => e.stopPropagation()}
        className="glass-strong relative w-full max-w-md overflow-hidden rounded-3xl"
      >
        <button
          onClick={onClose}
          aria-label="Fermer"
          className="absolute right-4 top-4 z-10 rounded-full bg-white/5 p-2 text-ivory/60 transition hover:bg-white/15 hover:text-ivory"
        >
          <X size={16} />
        </button>

        <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-velvet/80 via-midnight to-bordeaux/60">
          {memory.photo ? (
            <img src={`/photos/${memory.photo}`} alt="" className="h-full w-full object-cover opacity-90" />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-3">
              <motion.span
                animate={{ scale: [1, 1.18, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
                className="text-4xl text-gold-light glow-gold"
              >
                ✦
              </motion.span>
              <p className="font-display text-[11px] uppercase tracking-[0.4em] text-ivory/40">
                [AJOUTER NOTRE PHOTO ICI]
              </p>
            </div>
          )}
          <div className="radial-vignette absolute inset-0" />
          {memory.date && (
            <p className="absolute bottom-3 left-4 font-display text-sm italic tracking-[0.25em] text-gold-light/80">
              {memory.date}
            </p>
          )}
        </div>

        <div className="p-6 sm:p-8">
          <p className="mb-3 font-display text-lg italic text-gold-light">{memory.question}</p>
          <p className="font-display text-[15px] leading-relaxed text-ivory/85">{memory.text}</p>
          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="rounded-full border border-ivory/20 px-6 py-2 text-[11px] uppercase tracking-[0.3em] text-ivory/60 transition hover:border-ivory/50 hover:text-ivory"
            >
              Reprendre
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}