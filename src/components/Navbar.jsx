import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "Home", to: "/" },
  { label: "Projects", to: "/projects" },
  { label: "Gallery", to: "/gallery" },
  { label: "Skills", to: "/skills" },
  { label: "Certificates", to: "/certificates" },
  { label: "Blog", to: "/blog" },
  { label: "Resume", to: "/resume" },
  { label: "About Me", to: "/about" },
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
      delayChildren: 0.05
    }
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: {
      staggerChildren: 0.03,
      staggerDirection: -1,
      when: "afterChildren"
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: -20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 150, damping: 15 } },
  exit: { opacity: 0, y: -10 }
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const navRef = useRef(null);
  const linksRef = useRef(null);

  const checkOverflow = () => {
    if (window.innerWidth <= 1024) {
      setShowButton(true);
      return;
    }
    if (!navRef.current || !linksRef.current) return;
    setShowButton(linksRef.current.scrollWidth > navRef.current.offsetWidth);
  };

  useEffect(() => {
    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, []);

  return (
    <>
      {/* --- Navbar --- */}
      <nav
        ref={navRef}
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem 2rem",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          background: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(10px)",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <motion.div
            className="logo"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            style={{
              fontWeight: "bold",
              fontSize: "1.4rem",
              color: "var(--accent)",
            }}
          >
            SK
          </motion.div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <h1 style={{ margin: 0, fontSize: 14 }}>Sachin K</h1>
            <div style={{ fontSize: 12, color: "var(--muted)" }}>
              CSE Student • Developer
            </div>
          </div>
        </div>

        {/* Desktop Links */}
        <div
          ref={linksRef}
          style={{
            display: showButton ? "none" : "flex",
            justifyContent: "center",
            gap: "2rem",
            alignItems: "center",
            flexGrow: 1,
          }}
        >
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end
              aria-current={({ isActive }) => isActive ? "page" : undefined}
              style={{
                fontSize: "0.95rem",
                textDecoration: "none",
                color: "white",
                fontWeight: 500,
              }}
            >
              {({ isActive }) => (
                <motion.div
                  whileHover={{
                    scale: 1.1,
                    color: "var(--accent)",
                    textShadow: "0 0 8px var(--accent)",
                  }}
                  transition={{ duration: 0.3 }}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
                >
                  <motion.span
                    animate={{ color: isActive ? "var(--accent)" : "white" }}
                    transition={{ duration: 0.3 }}
                  >
                    {l.label}
                  </motion.span>

                  {isActive && (
                    <motion.div
                      layoutId="underline"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        width: "70%",
                        height: "2px",
                        marginTop: "4px",
                        borderRadius: "1px",
                        backgroundColor: "var(--accent)",
                        boxShadow: "0 0 6px var(--accent)",
                      }}
                    />
                  )}
                </motion.div>
              )}
            </NavLink>
          ))}
        </div>

        {/* Hamburger */}
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

      {/* --- Mobile Menu --- */}
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
              backdropFilter: "blur(16px)",
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

            {links.map((l) => (
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
                    padding: "1.2rem 0",
                    width: "100%",
                    textAlign: "center",
                    fontSize: 18,
                    fontWeight: 600,
                    letterSpacing: "0.5px",
                    borderBottom: "1px solid rgba(255,255,255,0.03)",
                    transition: "color 0.2s ease"
                  }}
                  className={({ isActive }) => isActive ? "text-cyan-400" : ""}
                >
                  {l.label}
                </NavLink>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
