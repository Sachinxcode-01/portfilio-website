/**
 * DottedSurface — Animated 3D wave of dots using Three.js
 *
 * Adapted from the original TSX shadcn component for use in a
 * Vite + React + JavaScript project (no Next.js, no TypeScript).
 *
 * Changes from original:
 *  - Removed 'use client' directive (Next.js only)
 *  - Removed TypeScript type annotations → plain JSX
 *  - Theme detection uses useTheme from next-themes (works standalone via ThemeProvider)
 *  - @/ imports work via the Vite alias in vite.config.mjs
 */
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function DottedSurface({ className, ...props }) {
  const { theme } = useTheme();

  const containerRef = useRef(null);
  const sceneRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const SEPARATION = 150;
    const AMOUNTX = 40;
    const AMOUNTY = 60;

    // ── Scene setup ──────────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0xffffff, 2000, 10000);

    const isMobile = window.innerWidth < 768;

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      10000,
    );
    if (isMobile) {
      // Pull back camera slightly on mobile to capture the wave width-wise beautifully
      camera.position.set(0, 430, 1420);
    } else {
      camera.position.set(0, 355, 1220);
    }

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(scene.fog.color, 0);

    containerRef.current.appendChild(renderer.domElement);

    // ── Particles ─────────────────────────────────────────────────────────────
    const positions = [];
    const colors = [];
    const geometry = new THREE.BufferGeometry();

    for (let ix = 0; ix < AMOUNTX; ix++) {
      for (let iy = 0; iy < AMOUNTY; iy++) {
        const x = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
        const y = 0;
        const z = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;

        positions.push(x, y, z);

        // Cyan/violet accent dots to match the portfolio palette
        if (theme === 'dark') {
          // bright cyan dots on dark
          colors.push(0, 0.78, 1); // #00c8ff normalised 0-1
        } else {
          // dark muted dots on light
          colors.push(0.1, 0.1, 0.12);
        }
      }
    }

    geometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(positions, 3),
    );
    geometry.setAttribute(
      'color',
      new THREE.Float32BufferAttribute(colors, 3),
    );

    const material = new THREE.PointsMaterial({
      size: isMobile ? 4.5 : 7.0, // smaller dot particle size on mobile for fine-grained elegance
      vertexColors: true,
      transparent: true,
      opacity: isMobile ? 0.65 : 0.55, // slightly more visible opacity on mobile
      sizeAttenuation: true,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    let count = 0;
    let animationId;

    // ── Animation loop ────────────────────────────────────────────────────────
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      const posAttr = geometry.attributes.position;
      const pos = posAttr.array;

      let i = 0;
      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          const idx = i * 3;
          pos[idx + 1] =
            Math.sin((ix + count) * 0.3) * 50 +
            Math.sin((iy + count) * 0.5) * 50;
          i++;
        }
      }

      posAttr.needsUpdate = true;
      renderer.render(scene, camera);
      count += 0.1;
    };

    let lastWidth = window.innerWidth;

    const handleResize = () => {
      // Skip if width is identical (prevents stuttering/flicker when mobile address bar hides/shows)
      if (window.innerWidth === lastWidth) return;
      lastWidth = window.innerWidth;

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    animate();

    sceneRef.current = { scene, camera, renderer, animationId };

    // ── Cleanup ───────────────────────────────────────────────────────────────
    return () => {
      window.removeEventListener('resize', handleResize);

      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animationId);

        sceneRef.current.scene.traverse((object) => {
          if (object instanceof THREE.Points) {
            object.geometry.dispose();
            if (Array.isArray(object.material)) {
              object.material.forEach((m) => m.dispose());
            } else {
              object.material.dispose();
            }
          }
        });

        sceneRef.current.renderer.dispose();

        if (
          containerRef.current &&
          sceneRef.current.renderer.domElement &&
          containerRef.current.contains(sceneRef.current.renderer.domElement)
        ) {
          containerRef.current.removeChild(sceneRef.current.renderer.domElement);
        }
      }
    };
  }, [theme]);

  return (
    <div
      ref={containerRef}
      className={cn('pointer-events-none fixed inset-0 -z-10', className)}
      {...props}
    />
  );
}
