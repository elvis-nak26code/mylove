import { AnimatePresence, motion } from 'framer-motion'
import { Music, Pause, Play, Volume2, VolumeX } from 'lucide-react'
import { createContext, useContext, useEffect, useRef, useState } from 'react'

const MusicContext = createContext(null)

export function useMusic() {
  const ctx = useContext(MusicContext)
  if (!ctx) throw new Error('useMusic doit être utilisé dans <MusicProvider>')
  return ctx
}

export function MusicProvider({ children }) {
  const [playing, setPlaying] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const [ready, setReady] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    const audio = new Audio('/music/our-song.mp3')
    audio.loop = true
    audio.volume = 0.5
    audio.preload = 'auto'
    audioRef.current = audio
    return () => {
      audio.pause()
      audioRef.current = null
    }
  }, [])

  const play = () => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = 0
    audio
      .play()
      .then(() => {
        setReady(true)
        setPlaying(true)
        // fondu d'entrée pour ne pas faire sursauter
        const fade = setInterval(() => {
          if (!audioRef.current) return clearInterval(fade)
          if (audioRef.current.volume >= volume - 0.01) {
            audioRef.current.volume = volume
            clearInterval(fade)
          } else {
            audioRef.current.volume = Math.min(volume, audioRef.current.volume + 0.04)
          }
        }, 80)
      })
      .catch(() => {})
  }

  const pause = () => {
    const audio = audioRef.current
    if (!audio) return
    audio.pause()
    setPlaying(false)
  }

  const toggle = () => (playing ? pause() : play())

  const changeVolume = (v) => {
    setVolume(v)
    if (audioRef.current) audioRef.current.volume = v
  }

  return (
    <MusicContext.Provider value={{ playing, volume, play, pause, toggle, changeVolume, ready }}>
      {children}
    </MusicContext.Provider>
  )
}

export default function MusicPlayer() {
  const { playing, volume, play, pause, toggle, changeVolume, ready } = useMusic()
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="glass-strong flex items-center gap-3 rounded-2xl px-4 py-3"
          >
            {playing ? (
              <button
                onClick={pause}
                aria-label="Mettre en pause"
                className="rounded-full p-2 text-gold-light transition hover:bg-white/10"
              >
                <Pause size={15} />
              </button>
            ) : (
              <button
                onClick={play}
                aria-label="Lire"
                className="rounded-full p-2 text-gold-light transition hover:bg-white/10"
              >
                <Play size={15} />
              </button>
            )}
            <input
              type="range"
              min="0"
              max="1"
              step="0.02"
              value={volume}
              onChange={(e) => changeVolume(Number(e.target.value))}
              aria-label="Volume"
              className="h-1 w-24 accent-[#d9b878]"
            />
            {volume === 0 ? (
              <VolumeX size={15} className="text-ivory/50" />
            ) : (
              <Volume2 size={15} className="text-ivory/50" />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          setOpen((o) => !o)
          if (!playing && !ready) toggle()
        }}
        aria-label="Musique"
        className={`glass-strong flex h-12 w-12 items-center justify-center rounded-full transition ${
          playing ? 'text-gold-light glow-gold' : 'text-ivory/70'
        }`}
      >
        <Music size={18} className={playing ? 'animate-pulse' : ''} />
      </motion.button>
    </div>
  )
}