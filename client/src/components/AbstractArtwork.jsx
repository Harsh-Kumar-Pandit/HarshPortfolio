import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const AbstractArtwork = () => {
  const containerRef = useRef(null);
  
  // Parallax interaction variables
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for premium easing
  const springConfig = { damping: 40, stiffness: 100, mass: 1 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Aurora wave depth transforms for parallax
  const wave1X = useTransform(smoothMouseX, [-0.5, 0.5], [-20, 20]);
  const wave1Y = useTransform(smoothMouseY, [-0.5, 0.5], [-20, 20]);
  
  const wave2X = useTransform(smoothMouseX, [-0.5, 0.5], [30, -30]);
  const wave2Y = useTransform(smoothMouseY, [-0.5, 0.5], [10, -10]);
  
  const wave3X = useTransform(smoothMouseX, [-0.5, 0.5], [-15, 15]);
  const wave3Y = useTransform(smoothMouseY, [-0.5, 0.5], [20, -20]);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Minimal elegant particles
  const [particles, setParticles] = useState([]);
  useEffect(() => {
    const newParticles = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      size: Math.random() * 2 + 1,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 20 + 20,
      delay: Math.random() * 5
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full aspect-square max-w-md mx-auto rounded-3xl overflow-hidden bg-[#f8fafc] dark:bg-[#020205] border border-outline-variant/30 shadow-[0_8px_30px_rgba(0,0,0,0.05)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.4)] transition-colors duration-500"
    >
      {/* AURORA WAVES (Background Gradient Layers) */}
      
      {/* Wave 1: Deep Purple / Lavender Base Mesh */}
      <motion.div
        style={{ x: wave1X, y: wave1Y }}
        animate={{ 
          rotate: [0, 5, -5, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -inset-[50%] bg-gradient-to-tr from-[#e0e7ff] via-[#c7d2fe] to-transparent dark:from-[#312e81] dark:via-[#4c1d95] dark:to-transparent blur-3xl opacity-90 mix-blend-multiply dark:mix-blend-screen pointer-events-none"
      />

      {/* Wave 2: Electric Blue / Ice Blue Sweeping Ribbon */}
      <motion.div
        style={{ x: wave2X, y: wave2Y }}
        animate={{ 
          rotate: [-15, 10, -15],
          scale: [1.1, 1, 1.1]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 bottom-0 -left-[50%] -right-[50%] bg-gradient-to-r from-transparent via-[#bfdbfe] to-transparent dark:via-[#1e3a8a] blur-3xl opacity-80 mix-blend-multiply dark:mix-blend-screen transform -rotate-12 pointer-events-none"
      />

      {/* Wave 3: Bright Purple / Soft Pink Core Flow */}
      <motion.div
        style={{ x: wave3X, y: wave3Y }}
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.6, 0.9, 0.6]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] left-[20%] w-[60%] h-[60%] rounded-full bg-gradient-to-br from-[#ddd6fe] to-[#fbcfe8] dark:from-[#7c3aed] dark:to-[#be185d] blur-[60px] mix-blend-multiply dark:mix-blend-screen pointer-events-none"
      />

      {/* FROSTED GLASS OVERLAY (Creates the premium unified texture) */}
      <div className="absolute inset-0 backdrop-blur-[30px] bg-white/20 dark:bg-black/20 pointer-events-none" />

      {/* MINIMAL PARTICLES */}
      <div className="absolute inset-0 overflow-hidden opacity-50 dark:opacity-80 pointer-events-none">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            animate={{ 
              y: [p.y + '%', p.y - 20 + '%'], 
              opacity: [0, 0.7, 0] 
            }}
            transition={{ 
              duration: p.duration, 
              repeat: Infinity, 
              delay: p.delay,
              ease: "linear"
            }}
            className="absolute rounded-full bg-[#6366f1] dark:bg-white blur-[1px]"
            style={{
              left: `${p.x}%`,
              width: p.size,
              height: p.size,
            }}
          />
        ))}
      </div>

      {/* PREMIUM SURFACE REFLECTIONS */}
      {/* Top diagonal light streak */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent pointer-events-none mix-blend-overlay" />
      {/* Side reflection */}
      <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-white/40 to-transparent pointer-events-none mix-blend-overlay" />
      
      {/* Subtle Inner Glass Bevel */}
      <div className="absolute inset-0 rounded-3xl border border-white/50 dark:border-white/10 pointer-events-none mix-blend-overlay" />
      
      {/* Cinematic Vignette */}
      <div className="absolute inset-0 rounded-3xl shadow-[inset_0_0_80px_rgba(255,255,255,0.4)] dark:shadow-[inset_0_0_80px_rgba(0,0,0,0.6)] pointer-events-none" />
    </div>
  );
};

export default AbstractArtwork;
