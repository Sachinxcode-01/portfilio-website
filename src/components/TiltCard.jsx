import React, { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

/**
 * TiltCard — Interactive 3D tilt effect that follows the mouse cursor.
 *
 * Wraps any content and applies perspective-based rotation on hover,
 * creating a realistic 3D depth effect. Includes an optional glare overlay.
 *
 * Props:
 *  - children: content to render inside the card
 *  - className: extra class names
 *  - style: inline styles merged onto the card
 *  - intensity: max rotation in degrees (default 12)
 *  - glare: show a moving light glare overlay (default true)
 *  - ...rest: forwarded to the motion.div
 */
export default function TiltCard({
  children,
  className = '',
  style = {},
  intensity = 12,
  glare = true,
  ...rest
}) {
  const ref = useRef(null)

  // Raw mouse position (0–1 across the card)
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  // Smooth springs for natural motion
  const springConfig = { stiffness: 200, damping: 20 }
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [intensity, -intensity]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-intensity, intensity]), springConfig)

  // Glare position follows the cursor
  const glareX = useTransform(mouseX, [0, 1], ['0%', '100%'])
  const glareY = useTransform(mouseY, [0, 1], ['0%', '100%'])

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width)
    mouseY.set((e.clientY - rect.top) / rect.height)
  }

  const handleMouseLeave = () => {
    mouseX.set(0.5)
    mouseY.set(0.5)
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        ...style,
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        transformPerspective: 1000,
        position: 'relative',
      }}
      whileHover={{ scale: 1.03 }}
      {...rest}
    >
      {/* Content lifted slightly in 3D space for depth */}
      <div style={{ transform: 'translateZ(40px)', transformStyle: 'preserve-3d' }}>
        {children}
      </div>

      {/* Moving glare highlight */}
      {glare && (
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 'inherit',
            pointerEvents: 'none',
            background: useTransform(
              [glareX, glareY],
              ([x, y]) =>
                `radial-gradient(circle at ${x} ${y}, rgba(255,255,255,0.18), transparent 55%)`
            ),
          }}
        />
      )}
    </motion.div>
  )
}
