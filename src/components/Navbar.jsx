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

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const navRef = useRef(null);
  const linksRef = useRef(null);

  const checkOverflow = () => {
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
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100vh",
              background: "rgba(0,0,0,0.95)",
              backdropFilter: "blur(12px)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              paddingTop: "4rem",
              zIndex: 9999,
            }}
          >
            <button
              style={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
                fontSize: "2rem",
                color: "#fff",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>

            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={() => setIsOpen(false)}
                style={{
                  color: "#fff",
                  textDecoration: "none",
                  padding: "1rem 0",
                  width: "100%",
                  textAlign: "center",
                  fontSize: 16,
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                {l.label}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
