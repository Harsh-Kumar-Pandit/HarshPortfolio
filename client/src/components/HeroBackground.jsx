import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';

const generateHeroParticles = (count) => {
  return Array.from({ length: count }).map((_, i) => ({
    id: i,
    x: Math.random() * 100, // %
    y: Math.random() * 100, // %
    size: Math.random() * 1.2 + 0.6, // 0.6px to 1.8px (very small and clean)
    opacityStart: Math.random() * 0.15 + 0.05,
    opacityPeak: Math.random() * 0.4 + 0.3,
    floatDuration: 18 + Math.random() * 15,
    pulseDuration: 3 + Math.random() * 3,
    xDrift: -8 + Math.random() * 16,
    yDrift: -20 - Math.random() * 20, // float upward slowly
  }));
};

const HeroBackground = () => {
  const { isDark } = useTheme();
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Very sparse particles (15 is enough for a clean premium look)
    setParticles(generateHeroParticles(15));
  }, [isDark]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 60, stiffness: 90, mass: 1.2 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Shifts for local lighting
  const glowX = useTransform(smoothMouseX, [-1, 1], ['-2%', '2%']);
  const glowY = useTransform(smoothMouseY, [-1, 1], ['-2%', '2%']);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden select-none pointer-events-none">
      
      {/* ── 1. Hero-specific Ambient Mouse Lighting ── */}
      <motion.div 
        style={{ x: glowX, y: glowY }} 
        className={`absolute inset-0 transition-opacity duration-500 ${isDark ? 'opacity-35' : 'opacity-10'}`}
      >
        <div className="absolute top-[-5%] left-[20%] w-[45vw] h-[45vh] rounded-full bg-indigo-500/10 blur-[130px] mix-blend-screen" />
        <div className="absolute bottom-[10%] right-[15%] w-[35vw] h-[35vh] rounded-full bg-blue-500/5 blur-[120px] mix-blend-screen" />
      </motion.div>

      {/* ── 2. Sparse Floating Dots ── */}
      <div className="absolute inset-0">
        {particles.map((p) => (
          <motion.div
            key={`hero-p-${p.id}`}
            initial={{ 
              x: 0, 
              y: 0, 
              opacity: p.opacityStart 
            }}
            animate={{ 
              x: [0, p.xDrift, 0],
              y: [0, p.yDrift, 0],
              opacity: [p.opacityStart, p.opacityPeak, p.opacityStart] 
            }}
            transition={{ 
              x: { duration: p.floatDuration, repeat: Infinity, ease: "easeInOut" },
              y: { duration: p.floatDuration * 1.1, repeat: Infinity, ease: "linear" },
              opacity: { duration: p.pulseDuration, repeat: Infinity, ease: "easeInOut" }
            }}
            className={`absolute rounded-full transition-colors duration-500 ${
              isDark ? 'bg-white' : 'bg-slate-400/30'
            }`}
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              boxShadow: isDark 
                ? `0 0 ${p.size * 2}px rgba(255, 255, 255, 0.4)` 
                : 'none'
            }}
          />
        ))}
      </div>

      {/* ── 3. Bottom fade for page continuity ── */}
      <div 
        className={`absolute inset-x-0 bottom-0 h-40 transition-colors duration-500 ${
          isDark 
            ? 'bg-gradient-to-t from-background to-transparent' 
            : 'bg-gradient-to-t from-background to-transparent'
        } z-10`} 
      />

    </div>
  );
};

export default HeroBackground;
