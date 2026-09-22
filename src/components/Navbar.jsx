import { Link, useLocation } from 'react-router-dom'

const chapters = [
  { path: '/', label: 'L’entrée', instruction: 'touche chaque lettre de mon prénom, dans l’ordre' },
  { path: '/souvenirs', label: 'Souvenirs', instruction: 'touche les étoiles pour ouvrir tes souvenirs, puis celle qui brille à part' },
  { path: '/devine', label: 'Devine', instruction: 'touche les étoiles une à une pour deviner' },
  { path: '/pourquoi-toi', label: 'Pourquoi toi', instruction: 'retourne les cartes et choisis celle qui te ressemble' },
  { path: '/lettre', label: 'Ma lettre', instruction: 's’il n’y a qu’une chose à retenir, c’est celle-là' },
  { path: '/futur', label: 'Notre futur', instruction: 'touche les points dans l’ordre pour dessiner la constellation' },
  { path: '/final', label: 'La fin', instruction: 'fais défiler cette dernière page tout doucement' },
]

export default function Navbar() {
  const { pathname } = useLocation()
  if (pathname === '/') return null
  const current = chapters.findIndex((c) => c.path === pathname)
  const label = current >= 0 ? chapters[current].label : ''

  return (
    <nav className="pointer-events-none fixed bottom-4 left-1/2 z-40 flex -translate-x-1/2 flex-col items-center gap-2">
      <p className="font-display text-[11px] tracking-[0.5em] text-ivory/30 uppercase">{label}</p>
      <div className="pointer-events-auto flex items-center gap-2.5 rounded-full border border-white/5 bg-white/[0.03] px-4 py-2 backdrop-blur-md">
        {chapters.map((c, i) => (
          <Link
            key={c.path}
            to={c.path}
            aria-label={c.label}
            className="group rounded-full p-0.5"
          >
            <span
              className={`block h-1.5 w-1.5 rounded-full transition-all duration-500 ${
                i === current
                  ? 'w-4 bg-gold shadow-[0_0_8px_rgba(217,184,120,0.9)]'
                  : 'bg-ivory/25 group-hover:bg-ivory/50'
              }`}
            />
          </Link>
        ))}
      </div>
    </nav>
  )
}