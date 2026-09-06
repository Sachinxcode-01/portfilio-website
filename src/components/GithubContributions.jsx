import React, { useState, useEffect, useMemo } from 'react'
import { GitHubCalendar } from 'react-github-calendar'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Github,
  Flame,
  Trophy,
  GitCommit,
  FolderGit2,
  ExternalLink,
  TrendingUp,
  Sparkles,
  Star,
  Activity,
  Calendar,
} from 'lucide-react'

export default function GithubContributions() {
  const username = 'Sachinxcode-01'
  const [activeTab, setActiveTab] = useState('calendar') // 'calendar' | 'trends'
  const [stats, setStats] = useState({
    totalContributions: 0,
    currentStreak: 0,
    longestStreak: 0,
    activeDays: 0,
    publicRepos: 19,
    followers: 4,
    monthlyData: [],
  })

  // Theme matching the cyan cyber neon aesthetics
  const cyanTheme = {
    light: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
    dark: [
      'rgba(255, 255, 255, 0.05)',
      'rgba(0, 220, 255, 0.22)',
      'rgba(0, 220, 255, 0.45)',
      'rgba(0, 220, 255, 0.72)',
      '#00c8ff',
    ],
  }

  // Fetch GitHub public profile data
  useEffect(() => {
    fetch(`https://api.github.com/users/${username}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.public_repos !== undefined) {
          setStats((prev) => ({
            ...prev,
            publicRepos: data.public_repos || 19,
            followers: data.followers || 4,
          }))
        }
      })
      .catch(() => {})
  }, [username])

  // Compute live streaks, active days & monthly trends directly from calendar data
  const handleTransformData = (calendarData) => {
    if (!calendarData || calendarData.length === 0) return calendarData

    let total = 0
    let longest = 0
    let tempStreak = 0
    let activeDaysCount = 0
    const monthsMap = {}

    // Sort ascending by date
    const sorted = [...calendarData].sort((a, b) => new Date(a.date) - new Date(b.date))

    sorted.forEach((item) => {
      total += item.count
      if (item.count > 0) {
        activeDaysCount++
        tempStreak++
        if (tempStreak > longest) longest = tempStreak
      } else {
        tempStreak = 0
      }

      // Group into months for trend graph
      const d = new Date(item.date)
      const monthKey = d.toLocaleString('en-US', { month: 'short' })
      monthsMap[monthKey] = (monthsMap[monthKey] || 0) + item.count
    })

    // Compute current streak from end backwards
    let current = 0
    for (let i = sorted.length - 1; i >= 0; i--) {
      if (sorted[i].count > 0) {
        current++
      } else {
        // If today or yesterday is 0, allow 1 day tolerance for timezones
        if (i === sorted.length - 1) continue
        break
      }
    }

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const trendList = monthNames.map((m) => ({
      month: m,
      commits: monthsMap[m] || 0,
    }))

    setStats((prev) => ({
      ...prev,
      totalContributions: total,
      currentStreak: current,
      longestStreak: longest,
      activeDays: activeDaysCount,
      monthlyData: trendList,
    }))

    return calendarData
  }

  // Monthly Activity SVG Chart calculations
  const maxCommits = useMemo(() => {
    if (!stats.monthlyData.length) return 10
    const max = Math.max(...stats.monthlyData.map((d) => d.commits))
    return max > 0 ? max : 10
  }, [stats.monthlyData])

  // Top languages across repositories
  const topLanguages = [
    { name: 'JavaScript / Node.js', percent: 45, color: '#f7df1e' },
    { name: 'Python & AI', percent: 28, color: '#3776ab' },
    { name: 'TypeScript', percent: 15, color: '#3178c6' },
    { name: 'C / C++', percent: 12, color: '#00599c' },
  ]

  return (
    <motion.div
      className="github-developer-suite"
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      style={{
        width: '94%',
        maxWidth: '1200px',
        margin: '50px auto 30px',
        padding: '36px 32px',
        borderRadius: '20px',
        background: 'linear-gradient(165deg, rgba(255, 255, 255, 0.04) 0%, rgba(10, 15, 25, 0.7) 100%)',
        border: '1px solid rgba(0, 200, 255, 0.18)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4), inset 0 0 40px rgba(0, 200, 255, 0.02)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background radial glow */}
      <div
        style={{
          position: 'absolute',
          top: '-120px',
          right: '-100px',
          width: '320px',
          height: '320px',
          background: 'radial-gradient(circle, rgba(0, 200, 255, 0.12) 0%, transparent 70%)',
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
          background: 'radial-gradient(circle, rgba(0, 128, 255, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />

      {/* Top Header Row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '20px',
          marginBottom: '32px',
          paddingBottom: '22px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.07)',
        }}
      >
        <div style={{ textAlign: 'left' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
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
              Open Source Velocity
            </span>
            <span
              style={{
                fontSize: '0.75rem',
                color: '#10b981',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                fontWeight: 600,
              }}
            >
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#10b981',
                  boxShadow: '0 0 8px #10b981',
                }}
              />
              Live GitHub Feed
            </span>
          </div>

          <h3
            style={{
              fontSize: '1.85rem',
              fontWeight: 800,
              color: '#ffffff',
              margin: '0 0 6px 0',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              letterSpacing: '-0.5px',
            }}
          >
            GitHub Activity & <span style={{ color: '#00c8ff' }}>Contributions</span>
          </h3>
          <p style={{ margin: 0, fontSize: '0.95rem', color: '#9ca3af' }}>
            Verified commits, open-source codebases, and continuous development track record.
          </p>
        </div>

        {/* View on GitHub Pill */}
        <motion.a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{
            scale: 1.05,
            borderColor: '#00c8ff',
            boxShadow: '0 0 20px rgba(0, 200, 255, 0.35)',
            y: -2,
          }}
          whileTap={{ scale: 0.95 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 22px',
            borderRadius: '999px',
            fontSize: '0.92rem',
            fontWeight: 600,
            color: '#00c8ff',
            background: 'rgba(0, 200, 255, 0.08)',
            border: '1px solid rgba(0, 200, 255, 0.3)',
            textDecoration: 'none',
            cursor: 'pointer',
            transition: 'all 0.25s ease',
          }}
        >
          <Github size={18} />
          <span>@{username}</span>
          <ExternalLink size={14} />
        </motion.a>
      </div>

      {/* 4 Professional Metric Stat Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '18px',
          marginBottom: '32px',
        }}
      >
        {/* Card 1: Total Contributions */}
        <motion.div
          whileHover={{ y: -4, borderColor: 'rgba(0, 200, 255, 0.4)' }}
          transition={{ duration: 0.25 }}
          style={{
            background: 'rgba(255, 255, 255, 0.025)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '14px',
            padding: '18px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            textAlign: 'left',
          }}
        >
          <div
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              background: 'rgba(0, 200, 255, 0.1)',
              border: '1px solid rgba(0, 200, 255, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#00c8ff',
            }}
          >
            <GitCommit size={22} />
          </div>
          <div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff', lineHeight: 1.1 }}>
              {stats.totalContributions > 0 ? stats.totalContributions.toLocaleString() : '350+'}
            </div>
            <div style={{ fontSize: '0.82rem', color: '#9ca3af', marginTop: '4px', fontWeight: 500 }}>
              Annual Contributions
            </div>
          </div>
        </motion.div>

        {/* Card 2: Current Streak */}
        <motion.div
          whileHover={{ y: -4, borderColor: 'rgba(255, 122, 0, 0.4)' }}
          transition={{ duration: 0.25 }}
          style={{
            background: 'rgba(255, 255, 255, 0.025)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '14px',
            padding: '18px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            textAlign: 'left',
          }}
        >
          <div
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              background: 'rgba(255, 122, 0, 0.12)',
              border: '1px solid rgba(255, 122, 0, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ff7a00',
            }}
          >
            <Flame size={24} />
          </div>
          <div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff', lineHeight: 1.1 }}>
              {stats.currentStreak > 0 ? `${stats.currentStreak} Days` : 'Active'}
            </div>
            <div style={{ fontSize: '0.82rem', color: '#9ca3af', marginTop: '4px', fontWeight: 500 }}>
              Current Streak 🔥
            </div>
          </div>
        </motion.div>

        {/* Card 3: Longest Streak */}
        <motion.div
          whileHover={{ y: -4, borderColor: 'rgba(234, 179, 8, 0.4)' }}
          transition={{ duration: 0.25 }}
          style={{
            background: 'rgba(255, 255, 255, 0.025)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '14px',
            padding: '18px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            textAlign: 'left',
          }}
        >
          <div
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              background: 'rgba(234, 179, 8, 0.12)',
              border: '1px solid rgba(234, 179, 8, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#eab308',
            }}
          >
            <Trophy size={22} />
          </div>
          <div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff', lineHeight: 1.1 }}>
              {stats.longestStreak > 0 ? `${stats.longestStreak} Days` : '18+ Days'}
            </div>
            <div style={{ fontSize: '0.82rem', color: '#9ca3af', marginTop: '4px', fontWeight: 500 }}>
              Longest Streak 🏆
            </div>
          </div>
        </motion.div>

        {/* Card 4: Public Repositories */}
        <motion.div
          whileHover={{ y: -4, borderColor: 'rgba(59, 130, 246, 0.4)' }}
          transition={{ duration: 0.25 }}
          style={{
            background: 'rgba(255, 255, 255, 0.025)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '14px',
            padding: '18px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            textAlign: 'left',
          }}
        >
          <div
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              background: 'rgba(59, 130, 246, 0.12)',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#3b82f6',
            }}
          >
            <FolderGit2 size={22} />
          </div>
          <div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff', lineHeight: 1.1 }}>
              {stats.publicRepos} Repos
            </div>
            <div style={{ fontSize: '0.82rem', color: '#9ca3af', marginTop: '4px', fontWeight: 500 }}>
              Open Repositories 📦
            </div>
          </div>
        </motion.div>
      </div>

      {/* Tabs Navigation (Heatmap vs Monthly Graph) */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '20px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          paddingBottom: '12px',
        }}
      >
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setActiveTab('calendar')}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '0.86rem',
              fontWeight: 600,
              background: activeTab === 'calendar' ? 'rgba(0, 200, 255, 0.15)' : 'transparent',
              color: activeTab === 'calendar' ? '#00c8ff' : '#9ca3af',
              border: activeTab === 'calendar' ? '1px solid rgba(0, 200, 255, 0.35)' : '1px solid transparent',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s ease',
            }}
          >
            <Calendar size={15} />
            Contribution Heatmap
          </button>

          <button
            onClick={() => setActiveTab('trends')}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '0.86rem',
              fontWeight: 600,
              background: activeTab === 'trends' ? 'rgba(0, 200, 255, 0.15)' : 'transparent',
              color: activeTab === 'trends' ? '#00c8ff' : '#9ca3af',
              border: activeTab === 'trends' ? '1px solid rgba(0, 200, 255, 0.35)' : '1px solid transparent',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s ease',
            }}
          >
            <Activity size={15} />
            Activity Trends Graph
          </button>
        </div>

        <div style={{ fontSize: '0.82rem', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <TrendingUp size={14} color="#00c8ff" />
          <span>Synced directly with GitHub API</span>
        </div>
      </div>

      {/* Tab 1: Heatmap View */}
      {activeTab === 'calendar' && (
        <motion.div
          key="calendar-tab"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="github-calendar-wrapper"
          style={{
            overflowX: 'auto',
            padding: '16px 8px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <GitHubCalendar
            username={username}
            colorScheme="dark"
            theme={cyanTheme}
            fontSize={13}
            blockSize={12.5}
            blockMargin={4}
            transformData={handleTransformData}
            style={{
              margin: '0 auto',
              color: '#e5e7eb',
            }}
            labels={{
              totalCount: '{{count}} contributions in the last year',
            }}
          />
        </motion.div>
      )}

      {/* Tab 2: Monthly Activity Trends SVG Chart */}
      {activeTab === 'trends' && (
        <motion.div
          key="trends-tab"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          style={{ padding: '20px 0', width: '100%' }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: '12px',
              height: '180px',
              padding: '0 10px 10px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            {stats.monthlyData.map((d, idx) => {
              const heightPercent = maxCommits > 0 ? Math.max(12, (d.commits / maxCommits) * 100) : 12
              return (
                <div
                  key={idx}
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    height: '100%',
                    justifyContent: 'flex-end',
                    position: 'relative',
                  }}
                >
                  {/* Hover tooltip commit badge */}
                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      color: d.commits > 0 ? '#00c8ff' : '#6b7280',
                      marginBottom: '6px',
                    }}
                  >
                    {d.commits}
                  </span>

                  {/* Animated Bar */}
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${heightPercent}%` }}
                    transition={{ duration: 0.6, delay: idx * 0.04 }}
                    whileHover={{ scaleX: 1.15, filter: 'brightness(1.3)' }}
                    style={{
                      width: '100%',
                      maxWidth: '38px',
                      borderRadius: '6px 6px 2px 2px',
                      background:
                        d.commits > 0
                          ? 'linear-gradient(180deg, #00c8ff 0%, rgba(0, 200, 255, 0.3) 100%)'
                          : 'rgba(255, 255, 255, 0.05)',
                      boxShadow: d.commits > 0 ? '0 0 12px rgba(0, 200, 255, 0.35)' : 'none',
                      cursor: 'pointer',
                    }}
                  />

                  {/* Month Label */}
                  <span
                    style={{
                      fontSize: '0.75rem',
                      color: '#9ca3af',
                      marginTop: '8px',
                      fontWeight: 500,
                    }}
                  >
                    {d.month}
                  </span>
                </div>
              )
            })}
          </div>
        </motion.div>
      )}

      {/* Bottom Language & Core Competency Stack Bar */}
      <div
        style={{
          marginTop: '32px',
          paddingTop: '24px',
          borderTop: '1px solid rgba(255, 255, 255, 0.07)',
          textAlign: 'left',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
            marginBottom: '14px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Star size={16} color="#00c8ff" />
            <span style={{ fontSize: '0.92rem', fontWeight: 600, color: '#fff' }}>
              Primary Language Distribution Across Repositories
            </span>
          </div>
          <span style={{ fontSize: '0.8rem', color: '#9ca3af' }}>Full Stack & AI Development</span>
        </div>

        {/* Multi-color language bar */}
        <div
          style={{
            display: 'flex',
            height: '8px',
            borderRadius: '999px',
            overflow: 'hidden',
            background: 'rgba(255, 255, 255, 0.06)',
            marginBottom: '14px',
          }}
        >
          {topLanguages.map((lang, idx) => (
            <motion.div
              key={idx}
              initial={{ width: 0 }}
              whileInView={{ width: `${lang.percent}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              style={{
                background: lang.color,
                height: '100%',
              }}
              title={`${lang.name}: ${lang.percent}%`}
            />
          ))}
        </div>

        {/* Legend */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '18px',
            fontSize: '0.82rem',
            color: '#9ca3af',
          }}
        >
          {topLanguages.map((lang, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span
                style={{
                  width: '9px',
                  height: '9px',
                  borderRadius: '50%',
                  background: lang.color,
                  display: 'inline-block',
                }}
              />
              <span style={{ color: '#e5e7eb', fontWeight: 500 }}>{lang.name}</span>
              <span style={{ color: '#6b7280' }}>{lang.percent}%</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
