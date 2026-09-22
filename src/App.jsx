import { AnimatePresence } from 'framer-motion'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import CustomCursor from './components/CustomCursor'
import MusicPlayer, { MusicProvider } from './components/MusicPlayer'
import Navbar from './components/Navbar'
import PageTransition from './components/PageTransition'
import StarField from './components/StarField'
import Apology from './pages/Apology'
import Feelings from './pages/Feelings'
import Final from './pages/Final'
import Future from './pages/Future'
import Home from './pages/Home'
import Memories from './pages/Memories'
import WhyYou from './pages/WhyYou'
import { PageHint } from './components/Ui'

/* Pages protégées : Djamila garde le fil, rien ne se perd. */
const GUARDED = ['/souvenirs', '/devine', '/pourquoi-toi', '/lettre', '/futur', '/final']

/* Consigne à rappeler sur chaque écran : la route ne se perd jamais. */
const PAGE_INSTRUCTIONS = {
  '/': 'touche chaque lettre de mon prénom, une à la fois',
  '/souvenirs': 'touche une étoile pour ouvrir le souvenir caché',
  '/devine': 'retourne les cartes une à une et devine ce que je ressens',
  '/pourquoi-toi': 'parcours les cartes, elles racontent pourquoi c’est toi',
  '/lettre': 'lis le message lentement, puis écris ce que tu veux me dire',
  '/futur': 'touche les étoiles pour dessiner notre futur',
  '/final': 'touche chaque étoile pour déplier notre promesse jusqu’au bout',
}

function Guarded({ children }) {
  const promised = sessionStorage.getItem('djamila-promise') === '1'
  if (!promised) return <Navigate to="/" replace />
  return children
}

function AppRoutes() {
  const location = useLocation()
  const currentPath = location.pathname
  const hint = PAGE_INSTRUCTIONS[currentPath]
  return (
    <>
      {hint && <PageHint>{hint}</PageHint>}
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageTransition>
                <Home />
              </PageTransition>
            }
          />
          {GUARDED.map((path) => {
            const Page = {
              '/souvenirs': Memories,
              '/devine': Feelings,
              '/pourquoi-toi': WhyYou,
              '/lettre': Apology,
              '/futur': Future,
              '/final': Final,
            }[path]
            return (
              <Route
                key={path}
                path={path}
                element={
                  <Guarded>
                    <PageTransition>
                      <Page />
                    </PageTransition>
                  </Guarded>
                }
              />
            )
          })}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </>
  )
}

export default function App() {
  return (
    <MusicProvider>
      <div className="relative min-h-svh overflow-hidden bg-night">
        <StarField />
        <Navbar />
        <MusicPlayer />
        <CustomCursor />
        <AppRoutes />
      </div>
    </MusicProvider>
  )
}
