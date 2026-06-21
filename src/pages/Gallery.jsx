import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import "../CSS/Gallery.css";

const IMAGES = {
  personal: [
    {
      id: 1,
      caption: "✨ \"Lost in moments, found with friends 🤝💫\"",
      photos: ["/gallery/gal1.jpg", "/gallery/gal2.jpg", "/gallery/gal6.jpg"],
    },
    {
      id: 2,
      caption:
        "✨ Lost in my own little world 🌌💭",
      photos: ["/gallery/gal3.jpg", "/gallery/gal4.jpg", "/gallery/gal7.jpg", "/gallery/gal8.jpg"],
    },
  ],
  projects: [
    {
      id: 1,
      caption:
        "🧮 Quick Math, Clean Code.",
      photos: ["/gallery/cal1.png", "/gallery/cal.png"],
    },

    {
      id: 1,
      caption:
        "📂 Portfolio - Smart - Portfolio",
      photos: ["/gallery/web1.png", "/gallery/web2.png"],
    },
  ],
  achievements: [
    {
      id: 1,
      isSpecialArcade: true,
      caption: "🏆 Google Cloud Arcade Program - 6 Badges Earned! Representing a comprehensive journey of hands-on cloud labs, virtual infrastructure engineering, and server architecture games. ⚡☁️",
      photos: [
        "/gallery/Adventure.png",
        "/gallery/BaseCamp.png",
        "/gallery/SkillUpSummer.png",
        "/gallery/Trail.png",
        "/gallery/Voyage.png",
        "/gallery/WorkMeetsPlayExpressiveEffciency.png"
      ],
      badgeNames: [
        "Adventure",
        "Base Camp",
        "Skill Up Summer",
        "Trail",
        "Voyage",
        "Work Meets Play: Expressive Efficiency"
      ]
    },
    {
      id: 2,
      caption: "🚀 Hackathon 2026 — Designed, built, and presented innovative software prototypes, working collaboratively under high-intensity engineering deadlines. 👥🔥",
      photos: ["/gallery/hackathon.jpg"],
    },
  ],
};

// ✨ Animation Variants
const pageVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.2,
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

// ✨ Tab Switching Animations
const tabContentVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  exit: { opacity: 0, y: -30, scale: 0.98, transition: { duration: 0.4 } },
};

export default function Gallery() {
  const [tab, setTab] = useState("personal");
  const [zoom, setZoom] = useState({ img: null, post: null, index: 0 });

  const openZoom = (post, index) =>
    setZoom({ img: post.photos[index], post, index });

  const closeZoom = () => setZoom({ img: null, post: null, index: 0 });

  const nextImage = useCallback(() => {
    if (!zoom.post) return;
    const nextIndex = (zoom.index + 1) % zoom.post.photos.length;
    setZoom((prev) => ({ ...prev, img: prev.post.photos[nextIndex], index: nextIndex }));
  }, [zoom.post, zoom.index]);

  const prevImage = useCallback(() => {
    if (!zoom.post) return;
    const prevIndex =
      (zoom.index - 1 + zoom.post.photos.length) % zoom.post.photos.length;
    setZoom((prev) => ({ ...prev, img: prev.post.photos[prevIndex], index: prevIndex }));
  }, [zoom.post, zoom.index]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!zoom.img) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') closeZoom();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [zoom.img, nextImage, prevImage]);

  return (
    <motion.section
      className="gallery-container"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      {/* 🌟 Title */}
      <motion.h2 className="gallery-title" variants={childVariants}>
        Gallery
      </motion.h2>

      {/* 🧭 Tabs */}
      <motion.div className="tab-buttons" variants={childVariants}>
        {["personal", "projects", "achievements"].map((type) => (
          <motion.button
            key={type}
            className={`tab ${tab === type ? "active" : ""}`}
            onClick={() => setTab(type)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </motion.button>
        ))}
      </motion.div>

      {/* 🖼️ Posts with Animation on Tab Switch */}
      <AnimatePresence mode="wait">
        <motion.div
          key={tab} // Important for AnimatePresence to detect tab change
          className="post-feed"
          variants={tabContentVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {IMAGES[tab].map((post) => (
            <motion.div
              key={post.id}
              className="post-card"
              variants={childVariants}
              whileHover={{ y: -4 }}
            >
              <p className="caption">{post.caption}</p>
              {post.isSpecialArcade ? (
                <div 
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
                    gap: "24px",
                    marginTop: "20px",
                    background: "rgba(255,255,255,0.015)",
                    border: "1px solid rgba(255,255,255,0.04)",
                    borderRadius: "16px",
                    padding: "28px",
                    boxShadow: "inset 0 0 25px rgba(0, 255, 200, 0.03), 0 10px 40px rgba(0,0,0,0.6)",
                    backdropFilter: "blur(4px)"
                  }}
                >
                  {post.photos.map((src, i) => (
                    <motion.div
                      key={i}
                      onClick={() => openZoom(post, i)}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        cursor: "pointer",
                        position: "relative"
                      }}
                      animate={{
                        y: [0, -8, 0]
                      }}
                      transition={{
                        duration: 3 + (i % 3) * 0.45,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      whileHover={{
                        scale: 1.12,
                        filter: "drop-shadow(0 0 15px rgba(0, 255, 200, 0.4))"
                      }}
                    >
                      {/* Slow glowing halo rings */}
                      <motion.div 
                        animate={{
                          scale: [1, 1.05, 1],
                          opacity: [0.25, 0.6, 0.25]
                        }}
                        transition={{
                          duration: 4.5 + (i % 2) * 1.2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        style={{
                          position: "absolute",
                          width: "82px",
                          height: "82px",
                          borderRadius: "50%",
                          border: "1.5px solid rgba(0, 255, 200, 0.4)",
                          zIndex: 0,
                          boxShadow: "0 0 10px rgba(0, 255, 200, 0.2)"
                        }}
                      />
                      
                      <img 
                        src={src} 
                        alt={post.badgeNames[i]} 
                        loading="lazy"
                        style={{
                          width: "74px",
                          height: "74px",
                          objectFit: "contain",
                          filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.4))",
                          zIndex: 1,
                          position: "relative",
                          marginBottom: "10px"
                        }}
                      />
                      <span 
                        style={{
                          color: "#9aa0a6",
                          fontSize: "11px",
                          textAlign: "center",
                          fontWeight: 600,
                          zIndex: 1,
                          lineHeight: 1.25,
                          maxWidth: "120px",
                          fontFamily: "monospace"
                        }}
                      >
                        {post.badgeNames[i]}
                      </span>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div
                  className={`photo-grid ${post.photos.length > 1 ? "multi" : "single"
                    }`}
                >
                  {post.photos.map((src, i) => (
                    <motion.div
                      key={i}
                      className="photo-item"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 250 }}
                      onClick={() => openZoom(post, i)}
                    >
                      <img src={src} alt={`${post.caption} — photo ${i + 1}`} loading="lazy" />
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* 🔍 Zoom Overlay */}
      <AnimatePresence>
        {zoom.img && (
          <motion.div
            className="zoom-overlay"
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(6px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4 }}
          >
            <motion.img
              key={zoom.img}
              src={zoom.img}
              alt="Zoomed gallery image"
              className="zoom-img"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
            />

            {zoom.post?.photos.length > 1 && (
              <>
                <button className="nav-btn left" onClick={prevImage} aria-label="Previous image">
                  <ChevronLeft size={32} />
                </button>
                <button className="nav-btn right" onClick={nextImage} aria-label="Next image">
                  <ChevronRight size={32} />
                </button>
              </>
            )}
            <button className="close-btn" onClick={closeZoom} aria-label="Close zoomed image">
              <X size={28} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
