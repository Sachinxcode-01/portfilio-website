import React from "react";
import { motion } from "framer-motion";
import { FaUniversity, FaSchool, FaGraduationCap } from "react-icons/fa";
import "../CSS/About.css";

const edu = [
  {
    icon: <FaUniversity size={26} color="var(--accent)" />,
    degree: "B.E in Computer Science Engineering",
    school: "Rural Engineering College, Hulkoti (REC) — Gadag, Karnataka",
    meta: ["1st Year (Pursuing)", "2025 – 2029"],
  },
  {
    icon: <FaGraduationCap size={26} color="var(--accent)" />,
    degree: "Higher Secondary Education (12th Grade)",
    school: "Government PU College, Gadag — Karnataka",
    meta: ["Karnataka Board", "Percentage: 74.83%", "Completed in 2025"],
  },
  {
    icon: <FaSchool size={26} color="var(--accent)" />,
    degree: "Secondary Education (10th Grade)",
    school: "Bright Horizon English Medium High School — Gadag, Karnataka",
    meta: ["Karnataka Board", "Percentage: 87.20%", "Completed in 2023"],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: "easeOut" },
  }),
};

const AboutMe = () => {
  return (
    <section className="about-section">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="about-card"
      >
        {/* --- About Me Header --- */}
        <h1 className="about-heading">About Me</h1>

        {/* --- Bio --- */}
        <p className="about-bio">
          Hi, I'm <strong>Sachin K</strong> — an aspiring{" "}
          <strong>Computer Science Engineer</strong> and{" "}
          <strong>Machine Learning enthusiast</strong>. A CSE student passionate
          about transforming ideas into intelligent systems. I love working with
          code, algorithms, and innovative technologies to build solutions that
          make an impact.
        </p>

        <p className="about-bio">
          Beyond code, I enjoy exploring design, experimenting with motion and
          interaction, and finding ways to blend{" "}
          <strong>artistic creativity</strong> with{" "}
          <strong>technical precision</strong>. My goal is to build solutions
          that not only perform — but also inspire.
        </p>

        {/* --- Education Section --- */}
        <motion.div
          className="edu-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h2 className="about-sub-heading">Education</h2>

          <div className="edu-cards">
            {edu.map((item, i) => (
              <motion.div
                key={i}
                className="edu-card"
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                whileHover={{ scale: 1.01 }}
              >
                <div className="edu-icon">{item.icon}</div>
                <div className="edu-info">
                  <h4>{item.degree}</h4>
                  <p className="edu-school">{item.school}</p>
                  {item.meta.map((m, j) => (
                    <p key={j} className="edu-meta">{m}</p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutMe;
