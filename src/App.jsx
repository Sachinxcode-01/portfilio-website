import React, { Suspense, lazy } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import { DottedSurface } from '@/components/ui/dotted-surface'

// 🚀 Lazy loaded pages
const Home = lazy(() => import('./pages/Home'))
const Projects = lazy(() => import('./pages/Projects'))
const Gallery = lazy(() => import('./pages/Gallery'))
const SkillNetwork = lazy(() => import('./pages/Skills'))
const Certificates = lazy(() => import('./pages/Certificates'))
const Blog = lazy(() => import('./pages/Blog'))
const Resume = lazy(() => import('./pages/Resume'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))

// 💎 Aesthetic Loading Spinner for Suspense fallback
const LoadingSpinner = () => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '80vh',
    background: 'transparent',
    color: 'var(--accent)'
  }}>
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
      style={{
        width: 50,
        height: 50,
        border: '3px solid transparent',
        borderTopColor: 'var(--accent)',
        borderBottomColor: 'var(--accent-2)',
        borderRadius: '50%',
        boxShadow: '0 0 20px rgba(0,200,255,0.25)'
      }}
    />
    <motion.p
      animate={{ opacity: [0.4, 1, 0.4] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      style={{ marginTop: 20, fontSize: 13, letterSpacing: 2, color: 'var(--muted)', fontWeight: 700 }}
    >
      LOADING...
    </motion.p>
  </div>
)

// 🌟 Page transition wrapper
const pageVariants = {
  initial: { opacity: 0, y: 12 },
  enter:   { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.2, ease: 'easeIn' } },
}

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="enter"
        exit="exit"
        style={{ flex: 1 }}
      >
        <Suspense fallback={<LoadingSpinner />}>
          <Routes location={location}>
            <Route path="/"             element={<Home />} />
            <Route path="/projects"     element={<Projects />} />
            <Route path="/gallery"      element={<Gallery />} />
            <Route path="/skills"       element={<SkillNetwork />} />
            <Route path="/certificates" element={<Certificates />} />
            <Route path="/blog"         element={<Blog />} />
            <Route path="/resume"       element={<Resume />} />
            <Route path="/about"        element={<About />} />
            <Route path="/contact"      element={<Contact />} />
            <Route path="*"             element={<NotFound />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <div className="app">
      {/* 🌊 Global animated dot background — same on every page */}
      <DottedSurface />
      <Navbar />
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <AnimatedRoutes />
      </main>
      <footer className="footer">
        © {new Date().getFullYear()} Sachin K — Built with React ⚡
      </footer>
      <SpeedInsights />
    </div>
  )
}
