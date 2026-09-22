import { motion } from 'framer-motion'
import { EASE } from './Ui'

export default function MysteryCard({ id, title, text, flipped, onFlip, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: EASE, delay: index * 0.12 }}
      style={{ perspective: 1400 }}
      className="w-full"
    >
      <motion.button
        aria-label={flipped ? title : `${id} — ouvre-moi`}
        onClick={onFlip}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 1, ease: EASE }}
        whileHover={{ scale: flipped ? 1 : 1.03 }}
        className="relative h-72 w-full sm:h-80"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* ——— Face avant (cachée) ——— */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-2xl border border-white/10 bg-gradient-to-br from-midnight/80 via-deep to-velvet/80 shadow-[0_10px_50px_rgba(0,0,0,0.5)]"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(0deg)' }}
        >
          <span className="font-display text-5xl text-gold-light/30">
            {`${id.slice(0, 1)}`}
          </span>
          <span className="font-display text-3xl italic tracking-wide text-ivory/70">
            {id} — Ouvre-moi
          </span>
          <span className="absolute inset-0 rounded-2xl [background:radial-gradient(60%_40%_at_50%_0%,rgba(217,184,120,0.12),transparent)]" />
          <motion.span
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut', delay: index * 0.4 }}
            className="text-2xl text-gold"
          >
            ✦
          </motion.span>
        </div>

        {/* ——— Face arrière (révélation) ——— */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-2xl border border-gold/30 bg-gradient-to-br from-velvet via-midnight to-deep p-6 text-center shadow-[0_10px_60px_rgba(154,37,71,0.25)]"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <span className="font-display text-xs uppercase tracking-[0.5em] text-gold-light/70">
            {id}
          </span>
          <h3 className="font-display text-2xl italic text-ivory sm:text-3xl">{title}</h3>
          <span className="my-1 h-px w-12 bg-gold/40" />
          <p className="font-body text-[13px] leading-relaxed text-ivory/75 sm:text-sm">{text}</p>
        </div>
      </motion.button>
    </motion.div>
  )
}