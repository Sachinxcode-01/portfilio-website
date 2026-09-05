import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Award, Cloud, ShieldCheck, Database, Terminal, Sparkles, CheckCircle2 } from 'lucide-react'
import TiltCard from './TiltCard'

const PROFILE_URL = 'https://www.skills.google/public_profiles/06835768-01eb-47ca-b2f6-2cb71f9fc3cf'

const GOOGLE_BADGES = [
  {
    id: 'bigquery',
    title: 'Derive Insights from BigQuery Data',
    category: 'data',
    date: 'Aug 2026',
    img: 'https://cdn.qwiklabs.com/Gka1cDvFoUpDQmKdCHIM1r5x7%2FOVJuNhrpmYHqRmRRo%3D',
    skills: ['BigQuery', 'SQL Analytics', 'Data Warehousing'],
  },
  {
    id: 'cloud-spanner',
    title: 'Create and Manage Cloud Spanner Instances',
    category: 'data',
    date: 'Aug 2026',
    img: 'https://cdn.qwiklabs.com/evdyXTK%2B7bFYY0CtRYIuU%2FNx4a0TW06vwiIjxVcKYMY%3D',
    skills: ['Cloud Spanner', 'Distributed DB', 'Global Scaling'],
  },
  {
    id: 'ncc-networking',
    title: 'Connecting Cloud Networks with NCC',
    category: 'network',
    date: 'Aug 2026',
    img: 'https://cdn.qwiklabs.com/Y0Bg%2FY1trEfF5%2FwE6ByOpoQbSFoZzhKA4AzWbVuBFmY%3D',
    skills: ['Network Connectivity Center', 'VPC Peering', 'Hybrid Cloud'],
  },
  {
    id: 'security-engineer',
    title: 'Arcade Simulator: Network Security Engineer',
    category: 'security',
    date: 'Aug 2026',
    img: 'https://cdn.qwiklabs.com/tfve7xMaebsownBg5sa8CUfJgurTxKMJ7TbxIlm1tec%3D',
    skills: ['Cloud Armor', 'Firewall Rules', 'VPC Service Controls'],
  },
  {
    id: 'iam-security',
    title: 'Privileged Access with IAM',
    category: 'security',
    date: 'Aug 2026',
    img: 'https://cdn.qwiklabs.com/rkz0zAOfJFxDCvn9CtoqPGSjRuZpXdT3gtvaKGfcf7I%3D',
    skills: ['Cloud IAM', 'Least Privilege', 'Role Policies'],
  },
  {
    id: 'data-cloud',
    title: 'Share Data Using Google Data Cloud',
    category: 'data',
    date: 'Aug 2026',
    img: 'https://cdn.qwiklabs.com/t8Eudux9kAj%2BngKmcxbc0QEX7UQ05HM9msixXv0vAi4%3D',
    skills: ['Datashare', 'BigLake', 'Data Analytics'],
  },
  {
    id: 'arcade-adventure',
    title: 'Arcade Adventure: Data Vault',
    category: 'arcade',
    date: 'Aug 2026',
    img: 'https://cdn.qwiklabs.com/ANWlnJBKahtIS3eQv7YxmnmJkhWYc3VSUheHu1TOpBY%3D',
    skills: ['Cloud Storage', 'Data Vault', 'KMS Encryption'],
  },
  {
    id: 'vaults-vectors',
    title: 'Arcade Re-Trail: Vaults & Vectors',
    category: 'arcade',
    date: 'Aug 2026',
    img: 'https://cdn.qwiklabs.com/iAUPykYUheJoZUrArdzblTqFRmY%2Fu6HCGgLoH1KH8fM%3D',
    skills: ['Vector Search', 'Generative AI', 'Embeddings'],
  },
  {
    id: 'cloud-delivery',
    title: 'Arcade Trail: Cloud Delivery Systems',
    category: 'arcade',
    date: 'Aug 2026',
    img: 'https://cdn.qwiklabs.com/s3e1UZHazecZsWuyxDItQZQcaqADNVdemWghibCfeEQ%3D',
    skills: ['Cloud Run', 'CI/CD Pipelines', 'Artifact Registry'],
  },
  {
    id: 'appsheet',
    title: 'Develop with Apps Script & AppSheet',
    category: 'network',
    date: 'Aug 2026',
    img: 'https://cdn.qwiklabs.com/WUI%2BxvmLhj0U4q2%2BG6Ec%2Bt5OpG8GoHQ%2FI2ONuFjKSlE%3D',
    skills: ['AppSheet', 'Apps Script', 'Workflow Automation'],
  },
]

const FILTER_TABS = [
  { id: 'all', label: 'All Badges' },
  { id: 'data', label: 'Data & Databases' },
  { id: 'security', label: 'Security & IAM' },
  { id: 'arcade', label: 'Arcade Facilitator' },
]

export default function GoogleArcadeShowcase() {
  const [activeFilter, setActiveFilter] = useState('all')

  const filteredBadges = GOOGLE_BADGES.filter((b) => {
    if (activeFilter === 'all') return true
    return b.category === activeFilter
  })

  return (
    <motion.div
      className="google-arcade-showcase"
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      style={{
        width: '94%',
        maxWidth: '1200px',
        margin: '50px auto 40px',
        padding: '38px 32px',
        borderRadius: '24px',
        background: 'linear-gradient(160deg, rgba(66, 133, 244, 0.05) 0%, rgba(15, 23, 42, 0.85) 100%)',
        border: '1px solid rgba(66, 133, 244, 0.25)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.45), inset 0 0 40px rgba(66, 133, 244, 0.04)',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'left',
      }}
    >
      {/* Decorative Glows */}
      <div
        style={{
          position: 'absolute',
          top: '-120px',
          right: '-100px',
          width: '320px',
          height: '320px',
          background: 'radial-gradient(circle, rgba(66, 133, 244, 0.18) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-120px',
          left: '-80px',
          width: '280px',
          height: '280px',
          background: 'radial-gradient(circle, rgba(52, 168, 83, 0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />

      {/* Header Section */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '20px',
          marginBottom: '32px',
          paddingBottom: '24px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        <div>
          {/* Tag Badges */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', flexWrap: 'wrap' }}>
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                padding: '4px 12px',
                borderRadius: '8px',
                background: 'rgba(66, 133, 244, 0.12)',
                color: '#60a5fa',
                border: '1px solid rgba(66, 133, 244, 0.35)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <Cloud size={14} color="#60a5fa" />
              Google Cloud Skills Boost
            </span>

            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                padding: '4px 12px',
                borderRadius: '8px',
                background: 'rgba(234, 179, 8, 0.12)',
                color: '#facc15',
                border: '1px solid rgba(234, 179, 8, 0.35)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <Award size={14} color="#facc15" />
              Gold League · 2,884+ Points
            </span>
          </div>

          <h3
            style={{
              fontSize: '1.9rem',
              fontWeight: 800,
              color: '#ffffff',
              margin: '0 0 8px 0',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              letterSpacing: '-0.5px',
            }}
          >
            Google Cloud <span style={{ color: '#60a5fa' }}>Arcade Facilitator</span> & Skills
          </h3>
          <p style={{ margin: 0, fontSize: '0.96rem', color: '#94a3b8', maxWidth: '780px', lineHeight: 1.6 }}>
            Hands-on technical mastery in BigQuery data analytics, Cloud Spanner architectures, Identity & Access
            Management (IAM), and hybrid networking through Google Cloud Skills Boost.
          </p>
        </div>

        {/* Verified Profile Link */}
        <motion.a
          href={PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{
            scale: 1.05,
            borderColor: '#60a5fa',
            boxShadow: '0 0 24px rgba(66, 133, 244, 0.4)',
            y: -2,
          }}
          whileTap={{ scale: 0.95 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '12px 24px',
            borderRadius: '12px',
            fontSize: '0.92rem',
            fontWeight: 700,
            color: '#ffffff',
            background: 'linear-gradient(135deg, #4285F4 0%, #1d4ed8 100%)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            textDecoration: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(66, 133, 244, 0.3)',
            transition: 'all 0.25s ease',
          }}
        >
          <span>Verify Google Profile</span>
          <ExternalLink size={16} />
        </motion.a>
      </div>

      {/* 4 Feature Milestone Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '18px',
          marginBottom: '34px',
        }}
      >
        <motion.div
          whileHover={{ y: -4, borderColor: 'rgba(234, 179, 8, 0.45)' }}
          transition={{ duration: 0.25 }}
          style={{
            background: 'rgba(255, 255, 255, 0.025)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '16px',
            padding: '18px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <img
            src="https://cdn.qwiklabs.com/assets/leagues/gold_sm_new-6a90c250a97c613f04487c7ef514ef238c5ad394.png"
            alt="Gold League"
            style={{ width: '48px', height: '48px', objectFit: 'contain' }}
          />
          <div>
            <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#facc15' }}>Gold League</div>
            <div style={{ fontSize: '0.82rem', color: '#94a3b8', marginTop: '2px' }}>2,884 Experience Points</div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -4, borderColor: 'rgba(66, 133, 244, 0.45)' }}
          transition={{ duration: 0.25 }}
          style={{
            background: 'rgba(255, 255, 255, 0.025)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '16px',
            padding: '18px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <div
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              background: 'rgba(66, 133, 244, 0.12)',
              border: '1px solid rgba(66, 133, 244, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#60a5fa',
            }}
          >
            <Database size={22} />
          </div>
          <div>
            <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#fff' }}>BigQuery &amp; Spanner</div>
            <div style={{ fontSize: '0.82rem', color: '#94a3b8', marginTop: '2px' }}>Enterprise Data Cloud</div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -4, borderColor: 'rgba(34, 197, 94, 0.45)' }}
          transition={{ duration: 0.25 }}
          style={{
            background: 'rgba(255, 255, 255, 0.025)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '16px',
            padding: '18px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <div
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              background: 'rgba(34, 197, 94, 0.12)',
              border: '1px solid rgba(34, 197, 94, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#4ade80',
            }}
          >
            <ShieldCheck size={22} />
          </div>
          <div>
            <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#fff' }}>IAM &amp; Networking</div>
            <div style={{ fontSize: '0.82rem', color: '#94a3b8', marginTop: '2px' }}>VPC, NCC &amp; Cloud Security</div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -4, borderColor: 'rgba(168, 85, 247, 0.45)' }}
          transition={{ duration: 0.25 }}
          style={{
            background: 'rgba(255, 255, 255, 0.025)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '16px',
            padding: '18px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <div
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              background: 'rgba(168, 85, 247, 0.12)',
              border: '1px solid rgba(168, 85, 247, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#c084fc',
            }}
          >
            <Award size={22} />
          </div>
          <div>
            <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#fff' }}>20+ Badges</div>
            <div style={{ fontSize: '0.82rem', color: '#94a3b8', marginTop: '2px' }}>Arcade Facilitator Milestone</div>
          </div>
        </motion.div>
      </div>

      {/* Filter Tabs */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          flexWrap: 'wrap',
          marginBottom: '24px',
        }}
      >
        {FILTER_TABS.map((tab) => {
          const isActive = activeFilter === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              style={{
                padding: '8px 18px',
                borderRadius: '10px',
                fontSize: '0.86rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                background: isActive ? 'rgba(66, 133, 244, 0.2)' : 'rgba(255, 255, 255, 0.03)',
                color: isActive ? '#60a5fa' : '#94a3b8',
                border: isActive ? '1px solid rgba(66, 133, 244, 0.5)' : '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Badges Grid */}
      <motion.div
        layout
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '20px',
        }}
      >
        <AnimatePresence>
          {filteredBadges.map((badge, idx) => (
            <TiltCard
              key={badge.id}
              intensity={8}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.35, delay: idx * 0.04 }}
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(66, 133, 244, 0.18)',
                borderRadius: '16px',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                justifyContent: 'space-between',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                {/* Badge Image */}
                <div
                  style={{
                    width: '90px',
                    height: '90px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '14px',
                    position: 'relative',
                  }}
                >
                  <img
                    src={badge.img}
                    alt={badge.title}
                    loading="lazy"
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                      objectFit: 'contain',
                      filter: 'drop-shadow(0 6px 12px rgba(66, 133, 244, 0.3))',
                    }}
                  />
                </div>

                <h4
                  style={{
                    fontSize: '0.98rem',
                    fontWeight: 700,
                    color: '#ffffff',
                    marginBottom: '6px',
                    lineHeight: 1.4,
                    minHeight: '44px',
                  }}
                >
                  {badge.title}
                </h4>

                <span style={{ fontSize: '0.78rem', color: '#60a5fa', marginBottom: '12px', fontWeight: 600 }}>
                  Earned {badge.date}
                </span>

                {/* Skill tags */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: '6px',
                    marginBottom: '16px',
                  }}
                >
                  {badge.skills.map((skill) => (
                    <span
                      key={skill}
                      style={{
                        fontSize: '0.72rem',
                        padding: '2px 8px',
                        borderRadius: '6px',
                        background: 'rgba(66, 133, 244, 0.08)',
                        color: '#93c5fd',
                        border: '1px solid rgba(66, 133, 244, 0.2)',
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Verify Badge Link */}
              <motion.a
                href={PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  color: '#60a5fa',
                  textDecoration: 'none',
                  padding: '6px 14px',
                  borderRadius: '8px',
                  background: 'rgba(66, 133, 244, 0.08)',
                  border: '1px solid rgba(66, 133, 244, 0.25)',
                  width: '100%',
                  justifyContent: 'center',
                }}
              >
                <CheckCircle2 size={13} color="#60a5fa" />
                <span>Verify Credential</span>
              </motion.a>
            </TiltCard>
          ))}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}
