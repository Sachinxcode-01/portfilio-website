import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import "../CSS/Home.css"
import '../index.css'
import { SOCIAL_LINKS } from '../constants/socialLinks'

// Stagger container variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 12 } },
}

// Letter-by-letter animation for the name
const letterVariants = {
  hidden: { opacity: 0, y: 20, rotateX: -90 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { delay: 0.8 + i * 0.06, type: 'spring', stiffness: 150, damping: 12 },
  }),
}

// Wave animation for social links
const waveVariants = {
  hidden: { opacity: 0, scale: 0, rotate: -180 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { delay: 1.2 + i * 0.1, type: 'spring', stiffness: 200, damping: 15 },
  }),
}

export default function Home() {
  const professions = [
    'Computer Science Engineer',
    "Python Developer",
    'Web Developer',
    'React.js Developer',
  ]

  const quickLinks = SOCIAL_LINKS
  const nameLetters = "Sachin K".split("")

  return (
    <section className="home-section">

      {/* Typing Effect Styles */}
      <style>
        {`
          @keyframes typing { from { width: 0; } to { width: 100%; } }
          @keyframes blink { 50% { border-color: transparent; } }
        `}
      </style>

      {/* Top Section: Photo + Info */}
      <div className="home-top">
        {/* Left: Glowing Photo */}
        <motion.div
          initial={{ opacity: 0, x: -80, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1, type: 'spring', stiffness: 80 }}
          className="photo-container"
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            className="photo-ring"
          />
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="photo-frame"
          >
            <motion.img
              src="/Sachinxcode-07.png"
              alt="Sachin K — Computer Science Engineer and Developer"
              loading="eager"
              initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 1.2, type: 'spring', stiffness: 100 }}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 0 40px rgba(0, 200, 255, 0.4)',
              }}
              className="profile-photo"
            />
          </motion.div>
        </motion.div>

        {/* Right: Info Section */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, type: 'spring', stiffness: 80 }}
          className="home-info"
        >
          {/* Animated heading with letter-by-letter name */}
          <h1 className="home-title">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              Hi, I'm{' '}
            </motion.span>
            <span className="home-name" style={{ display: 'inline-flex' }}>
              {nameLetters.map((letter, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ scale: 1.3, color: '#7c3aed', transition: { duration: 0.2 } }}
                  style={{ display: 'inline-block', cursor: 'default' }}
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </motion.span>
              ))}
            </span>
          </h1>

          {/* Typing Animated Text */}
          <motion.p
            className="typing-effect"
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            transition={{ delay: 1.4, duration: 0.8 }}
          >
            Computer Science Engineer | Frontend Developer | Tech Explorer
          </motion.p>

          {/* Profession Tags — staggered entrance */}
          <motion.div
            className="profession-tags"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {professions.map((role, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{
                  scale: 1.08,
                  background: 'linear-gradient(90deg,var(--accent),var(--accent-2))',
                  boxShadow: '0 0 20px rgba(0, 200, 255, 0.3)',
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="profession-tag"
              >
                {role}
              </motion.div>
            ))}
          </motion.div>

          {/* Info Cards — staggered slide-up */}
          <motion.div
            className="info-cards"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {[
              { label: '📍 Location', value: 'Gadag, Karnataka, India' },
              { label: '💼 Expertise', value: 'CSE, Problem Solving' },
              { label: '📧 Contact', value: 'saxhin0708@gmail.com' },
            ].map((info, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{
                  y: -6,
                  scale: 1.05,
                  boxShadow: '0 8px 25px rgba(0, 200, 255, 0.15)',
                  borderColor: 'rgba(0, 200, 255, 0.3)',
                }}
                transition={{ type: 'spring', stiffness: 250 }}
                className="info-card"
              >
                <strong>{info.label}</strong>
                <p>{info.value}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* 🚀 Hero CTA Buttons */}
          <motion.div
            className="hero-cta-btns"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.7, type: 'spring', stiffness: 100 }}
          >
            <Link to="/projects">
              <motion.button
                className="cta-primary"
                whileHover={{
                  scale: 1.08,
                  boxShadow: '0 0 35px rgba(0,200,255,0.5)',
                  y: -3,
                }}
                whileTap={{ scale: 0.92 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                View My Work →
              </motion.button>
            </Link>
            <a href="/resume.pdf" download="Sachin_K_Resume.pdf">
              <motion.button
                className="cta-secondary"
                whileHover={{
                  scale: 1.08,
                  borderColor: 'var(--accent)',
                  color: 'var(--accent)',
                  boxShadow: '0 0 20px rgba(0,200,255,0.2)',
                  y: -3,
                }}
                whileTap={{ scale: 0.92 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                ⬇ Download Resume
              </motion.button>
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Quick Links — wave-like sequential entrance */}
      <motion.div
        className="quick-links"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.8 }}
      >
        <motion.h2
          className="quick-links-title"
          initial={{ opacity: 0, letterSpacing: '8px' }}
          animate={{ opacity: 1, letterSpacing: '0px' }}
          transition={{ delay: 1.1, duration: 0.8 }}
        >
          Connect with me
        </motion.h2>
        <div className="quick-links-list">
          {quickLinks.map((item, i) => (
            <motion.a
              key={i}
              href={item.link}
              title={item.title}
              target="_blank"
              rel="noopener noreferrer"
              className="quick-link-item"
              custom={i}
              variants={waveVariants}
              initial="hidden"
              animate="visible"
              whileHover={{
                scale: 1.2,
                y: -8,
                rotate: [0, -5, 5, 0],
                transition: { rotate: { duration: 0.4 }, scale: { type: 'spring', stiffness: 300 } },
              }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.img
                src={item.img}
                alt={item.title}
                className="quick-link-img"
                whileHover={{
                  filter: 'drop-shadow(0 0 15px var(--accent)) brightness(1.3)',
                }}
              />
              <span className="quick-link-label">{item.title}</span>
            </motion.a>
          ))}
        </div>
      </motion.div>

    </section>
  )
}
