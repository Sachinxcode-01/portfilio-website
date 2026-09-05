import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  GraduationCap,
  Sparkles,
  Cpu,
  Layers,
  Terminal,
  Trophy,
  Cloud,
  Rocket,
  ArrowRight,
  Code2,
  Users,
  CheckCircle2,
} from "lucide-react";
import TiltCard from "../components/TiltCard";
import "../CSS/About.css";

const PILLARS = [
  {
    icon: <Terminal size={24} color="#00ffe0" />,
    title: "Scalable Backend Systems",
    desc: "Architecting resilient RESTful APIs, clean architecture services, and production databases using Node.js, Express, Python, MongoDB, and PostgreSQL.",
    tags: ["Node.js", "Python", "Clean Arch", "PostgreSQL"],
  },
  {
    icon: <Cpu size={24} color="#818cf8" />,
    title: "Applied AI & Computer Vision",
    desc: "Building intelligent systems with InsightFace biometric verification, automated LLM workflows with Gemini & Groq, and edge computer vision.",
    tags: ["InsightFace", "OpenCV", "Gemini AI", "n8n"],
  },
  {
    icon: <Layers size={24} color="#38bdf8" />,
    title: "High-Performance Interactive UI",
    desc: "Merging visual aesthetics with fluid motion physics, 3D Canvas shaders, and responsive cross-platform mobile apps in React, Flutter, and GSAP.",
    tags: ["React", "TypeScript", "Flutter", "Framer Motion"],
  },
  {
    icon: <Users size={24} color="#34d399" />,
    title: "Leadership & Rapid Prototyping",
    desc: "Guiding project engineering squads, architecting hackathon management portals, and shipping production software under tight deadlines.",
    tags: ["Team Lead", "Hackathons", "Agile", "Mentorship"],
  },
];

const TIMELINE = [
  {
    year: "2026",
    badge: "Hackathon Innovation",
    title: "REC 1.0 Hackathon Lead & Platform Architect",
    org: "Rural Engineering College, Hulkoti",
    desc: "Designed and deployed the full-stack hackathon operations platform powering participant onboarding, team check-ins, automated QR credentials, and real-time live scoring leaderboards.",
    skills: ["Full-Stack", "QR Auth", "Live Scoring", "Cloud"],
    icon: <Trophy size={18} color="#facc15" />,
    iconBg: "rgba(234, 179, 8, 0.15)",
  },
  {
    year: "2026",
    badge: "Cloud Certification",
    title: "Google Cloud Arcade Facilitator & Explorer",
    org: "Google Cloud Skills Boost",
    desc: "Achieved Gold League rank (2,884+ XP) and earned 20+ verified skill badges across BigQuery analytics, Cloud Spanner global databases, IAM security, and Network Connectivity Center (NCC).",
    skills: ["BigQuery", "Cloud Spanner", "IAM Security", "NCC"],
    icon: <Cloud size={18} color="#60a5fa" />,
    iconBg: "rgba(66, 133, 244, 0.15)",
  },
  {
    year: "2026",
    badge: "Enterprise Automation",
    title: "Kedar Enterprises Automation Lead",
    org: "Kedar Enterprises",
    desc: "Engineered an automated WhatsApp CRM lead pipeline combining Meta Cloud API, n8n workflow triggers, Supabase, Groq, and Gemini LLMs for seamless business operations.",
    skills: ["Meta API", "n8n", "Supabase", "Gemini LLM"],
    icon: <Rocket size={18} color="#a855f7" />,
    iconBg: "rgba(168, 85, 247, 0.15)",
  },
  {
    year: "2025 – Present",
    badge: "Academic Journey",
    title: "B.E in Computer Science & Engineering",
    org: "Rural Engineering College, Hulkoti (VTU Affiliated)",
    desc: "Pursuing bachelor's degree with a deep focus on Data Structures & Algorithms, Operating Systems, Database Management, and Machine Learning systems.",
    skills: ["Data Structures", "Algorithms", "System Design"],
    icon: <GraduationCap size={18} color="#00ffe0" />,
    iconBg: "rgba(0, 255, 224, 0.15)",
  },
];

const EDU = [
  {
    degree: "B.E in Computer Science Engineering",
    school: "Rural Engineering College, Hulkoti (REC) — Gadag, Karnataka",
    meta: ["VTU Affiliated", "1st Year (Pursuing)", "2025 – 2029"],
    status: "In Progress",
    highlight: true,
  },
  {
    degree: "Higher Secondary Education (12th Grade)",
    school: "Government PU College, Gadag — Karnataka",
    meta: ["Karnataka State Board", "Science Stream (PCMB)", "Score: 74.83%"],
    status: "Completed 2025",
    highlight: false,
  },
  {
    degree: "Secondary School Leaving Certificate (10th Grade)",
    school: "Bright Horizon English Medium High School — Gadag, Karnataka",
    meta: ["Karnataka State Board", "Distinction", "Score: 87.20%"],
    status: "Completed 2023",
    highlight: false,
  },
];

export default function AboutMe() {
  return (
    <section className="about-section">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="about-card"
      >
        {/* --- Header & Intro --- */}
        <div className="about-header-area">
          <div className="about-pill">
            <Sparkles size={14} color="#00ffe0" />
            <span>Engineer · Builder · Tech Lead</span>
          </div>

          <h1 className="about-heading">About Me</h1>

          <p className="about-bio">
            Hi, I'm <strong>Sachin K</strong> — a passionate{" "}
            <strong>Computer Science Engineer</strong>, <strong>Backend Developer</strong>, and{" "}
            <strong>Applied AI enthusiast</strong>. Currently pursuing my B.E in CSE at Rural
            Engineering College, Hulkoti, I specialize in architecting scalable systems, intelligent
            biometric/NLP workflows, and full-stack interactive applications.
          </p>

          <p className="about-bio">
            I believe that great software lives at the intersection of{" "}
            <strong>architectural robustness</strong> and <strong>delightful user experience</strong>.
            Whether leading technical squads during national hackathons, completing Google Cloud
            infrastructure challenges, or deploying quick-commerce monorepos, I focus on shipping
            solutions that solve real-world problems.
          </p>
        </div>

        {/* --- 4 Core Technical Pillars --- */}
        <div className="about-sub-section">
          <h2 className="about-sub-heading">What I Do Best</h2>
          <p className="about-section-desc">
            Core engineering strengths developed through hands-on development and competition.
          </p>

          <div className="pillars-grid">
            {PILLARS.map((p, idx) => (
              <TiltCard
                key={p.title}
                intensity={8}
                className="pillar-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
              >
                <div className="pillar-icon-box">{p.icon}</div>
                <h3 className="pillar-title">{p.title}</h3>
                <p className="pillar-desc">{p.desc}</p>
                <div className="pillar-tags">
                  {p.tags.map((t) => (
                    <span key={t} className="pillar-tag">
                      {t}
                    </span>
                  ))}
                </div>
              </TiltCard>
            ))}
          </div>
        </div>

        {/* --- Experience & Milestones Timeline --- */}
        <div className="about-sub-section">
          <h2 className="about-sub-heading">Experience &amp; Milestones</h2>
          <p className="about-section-desc">
            Key milestones, leadership roles, and technical achievements along my engineering journey.
          </p>

          <div className="timeline-container">
            {TIMELINE.map((item, idx) => (
              <motion.div
                key={item.title}
                className="timeline-item"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                {/* Timeline Icon Node */}
                <div className="timeline-marker" style={{ background: item.iconBg }}>
                  {item.icon}
                </div>

                {/* Timeline Card */}
                <div className="timeline-content">
                  <div className="timeline-meta-row">
                    <span className="timeline-badge">{item.badge}</span>
                    <span className="timeline-year">{item.year}</span>
                  </div>

                  <h3 className="timeline-title">{item.title}</h3>
                  <div className="timeline-org">{item.org}</div>
                  <p className="timeline-desc">{item.desc}</p>

                  <div className="timeline-skills">
                    {item.skills.map((s) => (
                      <span key={s} className="timeline-skill-pill">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* --- Education Section --- */}
        <div className="about-sub-section">
          <h2 className="about-sub-heading">Academic Background</h2>
          <p className="about-section-desc">
            Formal foundations in computer science, mathematics, and engineering.
          </p>

          <div className="edu-cards">
            {EDU.map((item, i) => (
              <motion.div
                key={item.degree}
                className={`edu-card ${item.highlight ? "edu-highlight" : ""}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.01 }}
              >
                <div className="edu-icon">
                  <GraduationCap size={24} color="#00ffe0" />
                </div>
                <div className="edu-info">
                  <div className="edu-title-row">
                    <h4>{item.degree}</h4>
                    <span className="edu-status-pill">{item.status}</span>
                  </div>
                  <p className="edu-school">{item.school}</p>
                  <div className="edu-meta-list">
                    {item.meta.map((m, j) => (
                      <span key={j} className="edu-meta-item">
                        <CheckCircle2 size={13} color="#00ffe0" />
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* --- Bottom Call to Action Banner --- */}
        <motion.div
          className="about-cta-banner"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h3 className="about-cta-title">Interested in working together or hiring me?</h3>
            <p className="about-cta-desc">
              I'm open for software engineering internships, research collaborations, and freelance builds.
            </p>
          </div>

          <div className="about-cta-buttons">
            <Link to="/contact">
              <motion.button
                className="about-cta-primary"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.96 }}
              >
                <span>Get In Touch</span>
                <ArrowRight size={16} />
              </motion.button>
            </Link>

            <Link to="/projects">
              <motion.button
                className="about-cta-secondary"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.96 }}
              >
                Explore Projects
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
