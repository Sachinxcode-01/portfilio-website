import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, ExternalLink, Sparkles, Code2, Layers, Cpu, Smartphone } from 'lucide-react'
import TiltCard from '../components/TiltCard'

const CATEGORIES = [
  { id: 'all', label: 'All Projects', icon: Layers },
  { id: 'web', label: 'Full-Stack & Web', icon: Code2 },
  { id: 'ai', label: 'AI & Automation', icon: Cpu },
  { id: 'mobile', label: 'Mobile & Flutter', icon: Smartphone },
]

const PROJECTS = [
  {
    title: 'Benaka Tours & Travels',
    category: 'web',
    desc: 'Luxury chauffeur-driven car rental platform featuring an interactive fleet showcase, route discovery, dynamic fare calculator, and instant WhatsApp booking integration.',
    ss: '/assets/images/projects/benaka-tours.jpg',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'GSAP', 'Framer Motion'],
    live: 'https://benaka-tours-travels.vercel.app',
    code: 'https://github.com/Sachinxcode-01/benaka-tours-travels',
    featured: true,
  },
  {
    title: 'Krishi AI',
    category: 'ai',
    desc: 'Intelligent agriculture platform combining real-time crop disease diagnosis, soil telemetry, satellite weather forecasts, and automated farming advisories.',
    ss: '/assets/images/projects/krishi-ai.jpg',
    tech: ['Python', 'React', 'AI/ML', 'Weather API', 'Tailwind CSS'],
    live: 'https://krishiai-red.vercel.app',
    code: 'https://github.com/Sachinxcode-01/KrishiAI',
    featured: true,
  },
  {
    title: 'MediConnect',
    category: 'web',
    desc: 'Next-gen telemedicine platform bridging patients with specialists through AI-assisted health vitals monitoring, doctor appointment slots, and encrypted records.',
    ss: '/assets/images/projects/mediconnect.jpg',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'AI Telemetry'],
    live: 'https://medi-connect-hazel.vercel.app',
    code: 'https://github.com/Sachinxcode-01/MediConnect',
    featured: true,
  },
  {
    title: 'Kedar Automation',
    category: 'ai',
    desc: 'Enterprise WhatsApp conversational automation system with n8n workflow triggers, Supabase storage, Groq, and Gemini LLMs for seamless customer CRM operations.',
    ss: '/assets/images/projects/kedar-automation.jpg',
    tech: ['TypeScript', 'n8n', 'Meta WhatsApp API', 'Supabase', 'Gemini AI'],
    live: 'https://kedar-enterprises-automation.vercel.app',
    code: 'https://github.com/Sachinxcode-01/Kedar-Enterprises-Automation',
    featured: false,
  },
  {
    title: 'Kirana OS',
    category: 'mobile',
    desc: 'Offline-first smart POS and supermarket inventory engine with barcode billing, high-speed receipt sync, supplier debt tracking, and real-time cloud backups.',
    ss: '/assets/images/projects/kirana-os.jpg',
    tech: ['Flutter', 'Next.js', 'Supabase', 'Barcode POS', 'PostgreSQL'],
    live: 'https://kirana-os-orcin.vercel.app',
    code: 'https://github.com/Sachinxcode-01/kirana-os',
    featured: false,
  },
  {
    title: 'Daily Basket',
    category: 'mobile',
    desc: 'Hyperlocal quick-commerce ecosystem featuring customer mobile apps, merchant management console, instant order routing, and Clean Architecture standards.',
    ss: '/assets/images/projects/daily-basket.jpg',
    tech: ['Flutter', 'Next.js', 'NestJS', 'PostgreSQL', 'Clean Architecture'],
    live: '#',
    code: 'https://github.com/Sachinxcode-01/Daily-Basket',
    featured: false,
  },
  {
    title: 'REC 1.0 Hackathon Platform',
    category: 'web',
    desc: 'Official platform for REC 1.0 hackathon hosting team registrations, automated QR check-in badges, mentor allocations, and a real-time live scoring leaderboard.',
    ss: '/assets/images/projects/rec-hackathon.jpg',
    tech: ['React', 'Node.js', 'QR Verification', 'Live Scoring', 'Cloud'],
    live: 'https://rechackathon.vercel.app/',
    code: 'https://github.com/Sachinxcode-01/rec-hackathon',
    featured: false,
  },
  {
    title: 'Digital Grievance Redressal',
    category: 'web',
    desc: 'Transparent public complaint lifecycle management platform with role-based administrative escalations, automated tracking milestones, and media proof attachments.',
    ss: '/assets/images/projects/grievance-system.jpg',
    tech: ['MERN Stack', 'Role-Based Auth', 'REST APIs', 'Cloudinary'],
    live: 'https://digitalgrievanceredressalsystem.vercel.app',
    code: 'https://github.com/Sachinxcode-01/digitalgrievanceredressalsystem',
    featured: false,
  },
  {
    title: 'AI Face Attendance System',
    category: 'ai',
    desc: 'Contactless automated biometric attendance logging system reaching >99% matching accuracy utilizing InsightFace, OpenCV, anti-spoofing checks, and automated CSV reports.',
    ss: '/assets/images/projects/smartattendance.jpg',
    tech: ['Python 3.10', 'OpenCV', 'InsightFace', 'CustomTkinter', 'Pandas'],
    live: '#',
    code: 'https://github.com/Sachinxcode-01/AI-Face-Attendance-System.git',
    featured: true,
  },
  {
    title: 'Nexa Voice Assistant',
    category: 'ai',
    desc: 'Multimodal AI desktop & Android voice assistant providing natural conversation, LiveKit real-time audio channels, PC automation, and voice-triggered web operations.',
    ss: '/assets/images/projects/nexa-assistant.jpg',
    tech: ['Python 3.11', 'Jetpack Compose', 'LiveKit', 'Speech NLP', 'Automation'],
    live: '#',
    code: 'https://github.com/Sachinxcode-01/NexaVoiceAssistant',
    featured: false,
  },
  {
    title: 'Bright Horizon School',
    category: 'web',
    desc: 'Comprehensive educational institution web portal incorporating student admission processing, interactive campus photo galleries, and curriculum overviews.',
    ss: '/assets/images/projects/bhs.jpg',
    tech: ['TypeScript', 'React/Next.js', 'CSS Modules', 'Admissions'],
    live: 'https://brighthorizonschool.vercel.app',
    code: 'https://github.com/Sachinxcode-01/brighthorizonschool',
    featured: false,
  },
  {
    title: 'Developer Portfolio',
    category: 'web',
    desc: 'Interactive personal portfolio built with React, Three.js, D3 dynamic force physics, Framer Motion, and live GitHub API activity analytics.',
    ss: '/assets/images/projects/portfolio.jpg',
    tech: ['React', 'Framer Motion', 'Tailwind CSS', 'D3.js', 'Three.js'],
    live: 'https://sachinxcoder-chi.vercel.app/',
    code: 'https://github.com/Sachinxcode-01/portfilio-website.git',
    featured: true,
  },
]

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredProjects = PROJECTS.filter((p) => {
    if (selectedCategory === 'all') return true
    return p.category === selectedCategory
  })

  return (
    <motion.section
      className="container mx-auto px-4 py-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      id="projects"
    >
      <div
        className="card"
        style={{
          background: 'rgba(255, 255, 255, 0.03)',
          borderRadius: 20,
          padding: '36px 30px',
          border: '1px solid rgba(0, 200, 255, 0.12)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4)',
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: 28, textAlign: 'left' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                padding: '4px 10px',
                borderRadius: '6px',
                background: 'rgba(0, 200, 255, 0.12)',
                color: '#00c8ff',
                border: '1px solid rgba(0, 200, 255, 0.3)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <Sparkles size={13} />
              Production & Open Source
            </span>
            <span style={{ fontSize: '0.85rem', color: '#9ca3af', fontWeight: 500 }}>
              {PROJECTS.length} Featured Repositories
            </span>
          </div>

          <motion.h2
            className="text-4xl md:text-5xl font-bold text-cyan-400 mb-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            style={{ color: '#00c8ff', letterSpacing: '-0.5px' }}
          >
            🚀 Featured Projects
          </motion.h2>
          <p className="text-gray-400" style={{ maxWidth: '750px', fontSize: '1.02rem', lineHeight: 1.6 }}>
            A curated collection of my software engineering builds from GitHub — spanning full-stack web systems,
            AI & computer vision models, and cross-platform mobile architectures.
          </p>
        </div>

        {/* Filter Tabs */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 10,
            marginBottom: 36,
            paddingBottom: 20,
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon
            const isActive = selectedCategory === cat.id
            const count =
              cat.id === 'all'
                ? PROJECTS.length
                : PROJECTS.filter((p) => p.category === cat.id).length

            return (
              <motion.button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '10px 18px',
                  borderRadius: 12,
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  background: isActive
                    ? 'linear-gradient(135deg, rgba(0, 200, 255, 0.22) 0%, rgba(0, 150, 255, 0.25) 100%)'
                    : 'rgba(255, 255, 255, 0.03)',
                  color: isActive ? '#00c8ff' : '#cbd5e1',
                  border: isActive
                    ? '1px solid rgba(0, 200, 255, 0.45)'
                    : '1px solid rgba(255, 255, 255, 0.08)',
                  boxShadow: isActive ? '0 0 20px rgba(0, 200, 255, 0.25)' : 'none',
                }}
              >
                <Icon size={16} />
                <span>{cat.label}</span>
                <span
                  style={{
                    fontSize: '0.72rem',
                    padding: '2px 7px',
                    borderRadius: 999,
                    background: isActive ? 'rgba(0, 200, 255, 0.3)' : 'rgba(255, 255, 255, 0.08)',
                    color: isActive ? '#fff' : '#9ca3af',
                  }}
                >
                  {count}
                </span>
              </motion.button>
            )
          })}
        </div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="projects-grid"
          style={{
            display: 'grid',
            gap: 26,
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          }}
        >
          <AnimatePresence>
            {filteredProjects.map((p, idx) => (
              <TiltCard
                key={p.title}
                className="project-card"
                initial={{ opacity: 0, y: 25, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                intensity={8}
                style={{
                  background: 'linear-gradient(160deg, rgba(255, 255, 255, 0.04) 0%, rgba(10, 15, 25, 0.7) 100%)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(0, 200, 255, 0.15)',
                  borderRadius: 18,
                  padding: 18,
                  overflow: 'hidden',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.35)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%',
                }}
              >
                <div>
                  {/* Widescreen 16:9 Image Container */}
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      aspectRatio: '16 / 9',
                      borderRadius: 12,
                      overflow: 'hidden',
                      background: '#0a0f1d',
                      boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)',
                    }}
                  >
                    <motion.img
                      src={p.ss}
                      alt={p.title}
                      loading="lazy"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'top center',
                        display: 'block',
                      }}
                    />

                    {/* Featured / Category Badge */}
                    <div
                      style={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        display: 'flex',
                        gap: 6,
                      }}
                    >
                      {p.featured && (
                        <span
                          style={{
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            padding: '3px 8px',
                            borderRadius: 6,
                            background: 'rgba(0, 200, 255, 0.9)',
                            color: '#05131a',
                            letterSpacing: '0.5px',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
                          }}
                        >
                          FEATURED
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div style={{ marginTop: 16 }}>
                    <h3
                      style={{
                        fontSize: '1.22rem',
                        color: '#ffffff',
                        marginBottom: 8,
                        fontWeight: 700,
                        letterSpacing: '-0.3px',
                      }}
                    >
                      {p.title}
                    </h3>
                    <p
                      style={{
                        fontSize: '0.88rem',
                        color: '#9ca3af',
                        marginBottom: 16,
                        lineHeight: 1.6,
                        minHeight: '68px',
                      }}
                    >
                      {p.desc}
                    </p>
                  </div>
                </div>

                {/* Tech Stack Tags & Actions */}
                <div>
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 6,
                      marginBottom: 18,
                    }}
                  >
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        style={{
                          background: 'rgba(0, 200, 255, 0.06)',
                          border: '1px solid rgba(0, 200, 255, 0.2)',
                          padding: '3px 9px',
                          borderRadius: 6,
                          fontSize: '0.75rem',
                          color: '#00c8ff',
                          fontWeight: 500,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Button links */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingTop: 12,
                      borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                    }}
                  >
                    <motion.a
                      href={p.code}
                      target="_blank"
                      rel="noreferrer"
                      whileHover={{ scale: 1.05, borderColor: '#00c8ff' }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6,
                        background: 'rgba(255, 255, 255, 0.03)',
                        color: '#cbd5e1',
                        padding: '7px 14px',
                        borderRadius: 8,
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        textDecoration: 'none',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <Github size={14} /> GitHub
                    </motion.a>

                    {p.live !== '#' ? (
                      <motion.a
                        href={p.live}
                        target="_blank"
                        rel="noreferrer"
                        whileHover={{
                          scale: 1.05,
                          boxShadow: '0 0 16px rgba(0, 200, 255, 0.4)',
                        }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 6,
                          background: 'linear-gradient(135deg, #00c8ff 0%, #00a8ff 100%)',
                          color: '#05131a',
                          padding: '7px 16px',
                          borderRadius: 8,
                          fontSize: '0.82rem',
                          fontWeight: 700,
                          textDecoration: 'none',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        <ExternalLink size={14} /> Live Demo
                      </motion.a>
                    ) : (
                      <span
                        style={{
                          fontSize: '0.78rem',
                          color: '#6b7280',
                          fontStyle: 'italic',
                        }}
                      >
                        Source Only
                      </span>
                    )}
                  </div>
                </div>
              </TiltCard>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.section>
  )
}
