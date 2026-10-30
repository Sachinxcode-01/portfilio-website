import React, { useState, useEffect, useRef } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "../CSS/Navbar.css";

// Primary navigation links (streamlined to reduce cognitive clutter)
const primaryLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Projects", to: "/projects" },
  { label: "Skills", to: "/skills" },
  { label: "Certificates", to: "/certificates" },
];

// Secondary links grouped inside the "More ▾" dropdown
const moreLinks = [
  { label: "Gallery", to: "/gallery", icon: "🖼️" },
  { label: "Blog", to: "/blog", icon: "✍️" },
  { label: "Resume", to: "/resume", icon: "📄" },
];

// Complete links for mobile menu
const allMobileLinks = [
  { label: "Home", to: "/" },
  { label: "About Me", to: "/about" },
  { label: "Projects", to: "/projects" },
  { label: "Skills", to: "/skills" },
  { label: "Certificates", to: "/certificates" },
  { label: "Gallery", to: "/gallery" },
  { label: "Blog", to: "/blog" },
  { label: "Resume", to: "/resume" },
  { label: "Contact", to: "/contact" },
];

// Staggered animations for mobile menu links
const menuVariants = {
  hidden: { opacity: 0, height: 0 },
  show: {
    opacity: 1,
    height: "100vh",
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: {
      staggerChildren: 0.03,
      staggerDirection: -1,
      when: "afterChildren",
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: -15 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 150, damping: 15 } },
  exit: { opacity: 0, y: -10 },
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const navRef = useRef(null);
  const linksRef = useRef(null);
  const moreRef = useRef(null);
  const location = useLocation();

  const isMoreActive = moreLinks.some((l) => location.pathname === l.to);

  // Close dropdown on route change or outside click
  useEffect(() => {
    setIsMoreOpen(false);
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (moreRef.current && !moreRef.current.contains(e.target)) {
        setIsMoreOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const checkOverflow = () => {
    if (window.innerWidth <= 1024) {
      setShowButton(true);
      return;
    }
    if (!navRef.current || !linksRef.current) return;
    setShowButton(linksRef.current.scrollWidth > navRef.current.offsetWidth - 220);
  };

  useEffect(() => {
    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, []);

  return (
    <header className="site-header" role="banner">
      {/* --- Main Navigation Bar --- */}
      <nav ref={navRef} className="nav" aria-label="Main Navigation">
        {/* Brand Logo & Name */}
        <Link to="/" className="nav-left" aria-label="Sachin K Portfolio Home">
          <motion.div
            className="logo"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            SK
          </motion.div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {/* Semantic span instead of h1 to maintain single h1 per page outline */}
            <span className="brand-title">Sachin K</span>
            <span className="nav-tagline">CSE Student • Developer</span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div
          ref={linksRef}
          className="nav-links"
          style={{ display: showButton ? "none" : "flex" }}
        >
          {primaryLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              style={{
                fontSize: "0.95rem",
                textDecoration: "none",
                color: "white",
                fontWeight: 500,
              }}
            >
              {({ isActive }) => (
                <div className="nav-link-content">
                  <motion.span
                    whileHover={{ scale: 1.08, color: "var(--accent)" }}
                    animate={{ color: isActive ? "var(--accent)" : "white" }}
                    transition={{ duration: 0.2 }}
                  >
                    {l.label}
                  </motion.span>

                  {isActive && (
                    <motion.div
                      layoutId="underline"
                      className="underline"
                      initial={{ opacity: 0, y: 3 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25 }}
                    />
                  )}
                </div>
              )}
            </NavLink>
          ))}

          {/* Grouped Secondary Pages: "More ▾" Dropdown */}
          <div
            ref={moreRef}
            className="nav-dropdown"
            onMouseEnter={() => setIsMoreOpen(true)}
            onMouseLeave={() => setIsMoreOpen(false)}
          >
            <button
              type="button"
              className={`nav-dropdown-btn ${isMoreActive ? "active" : ""}`}
              onClick={() => setIsMoreOpen((prev) => !prev)}
              aria-haspopup="true"
              aria-expanded={isMoreOpen}
              aria-label="More portfolio pages"
            >
              <span style={{ color: isMoreActive ? "var(--accent)" : "inherit" }}>
                More
              </span>
              <motion.span
                animate={{ rotate: isMoreOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                style={{ fontSize: "0.75rem", display: "inline-block" }}
              >
                ▼
              </motion.span>
            </button>

            <AnimatePresence>
              {isMoreOpen && (
                <motion.div
                  className="nav-dropdown-menu"
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                >
                  {moreLinks.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      className={({ isActive }) =>
                        `nav-dropdown-item ${isActive ? "active" : ""}`
                      }
                      onClick={() => setIsMoreOpen(false)}
                    >
                      <span style={{ fontSize: "1rem" }}>{item.icon}</span>
                      <span>{item.label}</span>
                    </NavLink>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Contact Direct Link / CTA */}
          <NavLink
            to="/contact"
            style={{
              fontSize: "0.95rem",
              textDecoration: "none",
              color: "white",
              fontWeight: 500,
            }}
          >
            {({ isActive }) => (
              <div className="nav-link-content">
                <motion.span
                  whileHover={{ scale: 1.08, color: "var(--accent)" }}
                  animate={{ color: isActive ? "var(--accent)" : "white" }}
                  transition={{ duration: 0.2 }}
                >
                  Contact
                </motion.span>
                {isActive && (
                  <motion.div
                    layoutId="underline"
                    className="underline"
                    initial={{ opacity: 0, y: 3 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                  />
                )}
              </div>
            )}
          </NavLink>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        {showButton && (
          <button
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            style={{
              background: "none",
              border: "none",
              color: "#fff",
              fontSize: "1.8rem",
              cursor: "pointer",
              zIndex: 10000,
            }}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? "✕" : "☰"}
          </button>
        )}
      </nav>

      {/* --- Mobile Fullscreen Drawer Menu --- */}
      <AnimatePresence>
        {isOpen && showButton && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              background: "rgba(3,3,6,0.98)",
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              paddingTop: "5rem",
              paddingBottom: "4rem",
              zIndex: 9999,
              overflowY: "auto",
              WebkitOverflowScrolling: "touch",
            }}
          >
            <button
              aria-label="Close navigation menu"
              style={{
                position: "absolute",
                top: "1.5rem",
                right: "1.5rem",
                fontSize: "2.2rem",
                color: "#00c8ff",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>

            {allMobileLinks.map((l) => (
              <motion.div
                key={l.to}
                variants={itemVariants}
                style={{ width: "100%" }}
              >
                <NavLink
                  to={l.to}
                  onClick={() => setIsOpen(false)}
                  style={{
                    display: "block",
                    color: "#fff",
                    textDecoration: "none",
                    padding: "1.1rem 0",
                    width: "100%",
                    textAlign: "center",
                    fontSize: 18,
                    fontWeight: 600,
                    letterSpacing: "0.5px",
                    borderBottom: "1px solid rgba(255,255,255,0.04)",
                    transition: "color 0.2s ease",
                  }}
                  className={({ isActive }) => (isActive ? "text-cyan-400" : "")}
                >
                  {l.label}
                </NavLink>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
