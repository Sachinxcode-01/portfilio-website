import React from 'react'
import { motion } from 'framer-motion'
import { Github, ExternalLink } from 'lucide-react'
import TiltCard from '../components/TiltCard'

const PROJECTS = [
  {
    title: '🖩 Simple Calculator (Python)',
    desc: 'SmartCalc — A Robust Python Calculator featuring advanced expression parser, scientific operations, CLI + GUI.',
    ss: '/calculator.jpg',
    tech: ['Python', 'CustomTkinter'],
    live: '#',
    code: 'https://github.com/Sachinxcode-01/calculator-app.git'
  },
  {
    title: '🌈 Bright Horizon School FullStack Website',
    desc: 'A full-stack school management platform featuring administrative dashboards, admission controls, multimedia gallery, and authentications.',
    ss: '/bhs.jpg',
    tech: ['TSX', 'TypeScript', 'React/Next.js', 'CSS Modules'],
    live: 'https://bright-horizon-school.vercel.app/',
    code: 'https://github.com/Sachinxcode-01/brighthorizonschool.com.git'
  },
  {
    title: 'AI Face Attendance System',
    desc: 'A contactless automated attendance logging system achieving >99% matching accuracy using computer vision (ArcFace & InsightFace), intruder alerts, and automated CSV reports.',
    ss: '/smartattendance.jpg',
    tech: ['Python 3.10', 'OpenCV', 'InsightFace', 'CustomTkinter', 'Pandas'],
    live: '#',
    code: 'https://github.com/Sachinxcode-01/AI-Face-Attendance-System.git'
  },
  {
    title: '💼 Portfolio Website',
    desc: 'A state-of-the-art developer portfolio built with React and Framer Motion, highlighting works with physics-based nodes and micro-interactions.',
    ss: '/portfolio.jpg',
    tech: ['React', 'Framer Motion', 'Tailwind CSS', 'D3.js'],
    live: 'https://sachinxcoder-chi.vercel.app/',
    code: 'https://github.com/Sachinxcode-01/portfilio-website.git'
  }
]

export default function Projects() {
  return (
    <motion.section
      className="container mx-auto px-4"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      id="projects"
    >
      <div className="card" style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 16, padding: 30 }}>
        <motion.h2
          className="text-4xl font-semibold text-cyan-400 mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          🚀 Projects
        </motion.h2>
        <p className="text-gray-400 mb-10">
          A collection of my major works — blending research, computer science, and AI innovation.
        </p>

        <div className="projects-grid" style={{ display: 'grid', gap: 24, gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
          {PROJECTS.map((p, idx) => (
            <TiltCard
              key={idx}
              className="project-card"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.4, delay: idx * 0.12 }}
              viewport={{ once: true }}
              intensity={10}
              style={{
                background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.01))',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(0,255,255,0.1)',
                borderRadius: 16,
                padding: 16,
                overflow: 'hidden',
                boxShadow: '0 0 20px rgba(0,255,255,0.06)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <motion.div className="ss" whileHover={{ scale: 1.03 }} style={{ borderRadius: 12, overflow: 'hidden' }}>
                  <img
                    src={p.ss}
                    alt={p.title}
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: '200px',
                      objectFit: 'cover',
                      borderRadius: 12
                    }}
                  />
                </motion.div>

                <div style={{ marginTop: 12 }}>
                  <h3 style={{ fontSize: 18, color: '#0ea5e9', marginBottom: 6, fontWeight: 700 }}>{p.title}</h3>
                  <p style={{ fontSize: 14, color: '#bbb', marginBottom: 12, lineHeight: 1.6 }}>{p.desc}</p>
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      style={{
                        background: 'rgba(0,255,255,0.05)',
                        border: '1px solid rgba(0,255,255,0.1)',
                        padding: '3px 8px',
                        borderRadius: 6,
                        fontSize: 11,
                        color: '#aaf',
                        fontWeight: 500
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                  <motion.a
                    href={p.code}
                    target="_blank"
                    rel="noreferrer"
                    className="btn"
                    whileHover={{ scale: 1.06 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      background: 'rgba(255,255,255,0.03)',
                      color: '#0ea5e9',
                      padding: '6px 14px',
                      borderRadius: 8,
                      fontSize: 13,
                      border: '1px solid rgba(0,255,255,0.15)',
                      textDecoration: 'none'
                    }}
                  >
                    <Github size={14} /> Code
                  </motion.a>
                  {p.live !== '#' && (
                    <motion.a
                      href={p.live}
                      target="_blank"
                      rel="noreferrer"
                      className="btn"
                      whileHover={{ scale: 1.06 }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        background: 'linear-gradient(90deg, #06b6d4, #0891b2)',
                        color: '#fff',
                        padding: '6px 14px',
                        borderRadius: 8,
                        fontSize: 13,
                        textDecoration: 'none'
                      }}
                    >
                      <ExternalLink size={14} /> Live
                    </motion.a>
                  )}
                </div>
              </div>
            </TiltCard>
          ))}

          {/* Premium "Next Innovation" Placeholder Card */}
          <motion.div
            className="project-card flex flex-col justify-between"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4, delay: PROJECTS.length * 0.12 }}
            whileHover={{ scale: 1.03 }}
            viewport={{ once: true }}
            style={{
              background: 'linear-gradient(145deg, rgba(124,58,237,0.05), rgba(255,255,255,0.01))',
              backdropFilter: 'blur(8px)',
              border: '1px dashed rgba(0,255,255,0.25)',
              borderRadius: 16,
              padding: 24,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              minHeight: '380px',
              boxShadow: '0 0 25px rgba(0,255,255,0.03)'
            }}
          >
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                borderColor: ['rgba(0,255,255,0.2)', 'rgba(124,58,237,0.5)', 'rgba(0,255,255,0.2)']
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                width: 70,
                height: 70,
                borderRadius: '50%',
                border: '2px solid rgba(0,255,255,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 16,
                boxShadow: '0 0 15px rgba(0, 255, 255, 0.1)'
              }}
            >
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{ fontSize: 24 }}
              >
                🚀
              </motion.span>
            </motion.div>
            <h3 style={{ fontSize: 18, color: '#0ea5e9', marginBottom: 8, fontWeight: 700 }}>Next Innovation</h3>
            <p style={{ fontSize: 13, color: '#9aa0a6', maxWidth: '240px', lineHeight: 1.6, marginBottom: 18 }}>
              Designing custom deep learning neural networks and elegant, interactive frontend systems. Something awesome is on its way!
            </p>
            <span
              className="animate-pulse"
              style={{
                background: 'rgba(0,255,255,0.04)',
                border: '1px solid rgba(0,255,255,0.18)',
                padding: '4px 12px',
                borderRadius: 20,
                fontSize: 11,
                color: '#00ffc8',
                fontWeight: 600,
                letterSpacing: 1
              }}
            >
              COOKING IN PROGRESS
            </span>
          </motion.div>

        </div>
      </div>
    </motion.section>
  )
}
