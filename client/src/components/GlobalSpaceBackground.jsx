import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';

const generateParticles = (count, isDark) => {
  return Array.from({ length: count }).map((_, i) => ({
    id: i,
    x: Math.random() * 100, // %
    y: Math.random() * 100, // %
    size: Math.random() * 2 + 1, // 1px to 3px
    opacityStart: Math.random() * 0.3 + 0.1,
    opacityPeak: Math.random() * 0.4 + 0.3,
    floatDuration: 15 + Math.random() * 15, // 15s to 30s
    pulseDuration: 3 + Math.random() * 4, // 3s to 7s
    xDrift: -5 + Math.random() * 10, // -5px to 5px
    yDrift: -20 - Math.random() * 20, // -20px to -40px upward
  }));
};

const GlobalSpaceBackground = () => {
  const { isDark } = useTheme();
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate particles once on mount/theme change
    setParticles(generateParticles(35, isDark));
  }, [isDark]);

  return (
    <div className="fixed inset-0 pointer-events-none -z-50 overflow-hidden bg-background transition-colors duration-700">
      
      {/* ---------------- BACKGROUND GRADIENT ---------------- */}
      <div className="absolute inset-0">
        {isDark ? (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-[#0A0F1F] via-[#050816] to-[#02030A] opacity-90" />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-[#F3E8FF] via-[#F8FAFC] to-[#FFFFFF] opacity-90" />
        )}
      </div>

      {/* ---------------- NEBULA HAZE ---------------- */}
      <div className="absolute inset-0 opacity-40">
        {isDark ? (
          <>
            <motion.div 
              animate={{ x: [0, 50, 0], y: [0, -30, 0] }} 
              transition={{ duration: 45, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-primary/10 blur-[130px] rounded-full" 
            />
            <motion.div 
              animate={{ x: [0, -40, 0], y: [0, 40, 0] }} 
              transition={{ duration: 55, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-[10%] -right-[10%] w-[60%] h-[60%] bg-blue-500/5 blur-[150px] rounded-full" 
            />
          </>
        ) : (
          <>
            <motion.div 
              animate={{ x: [0, 30, 0], y: [0, 20, 0] }} 
              transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-[10%] left-[10%] w-[50%] h-[50%] bg-primary/5 blur-[120px] rounded-full" 
            />
            <motion.div 
              animate={{ x: [0, -20, 0], y: [0, -30, 0] }} 
              transition={{ duration: 50, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-[10%] -right-[10%] w-[70%] h-[70%] bg-blue-300/5 blur-[140px] rounded-full" 
            />
          </>
        )}
      </div>

      {/* ---------------- FLOATING PARTICLES ---------------- */}
      <div className="absolute inset-0">
        {particles.map((p) => (
          <motion.div
            key={`particle-${p.id}-${isDark}`}
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
              y: { duration: p.floatDuration * 1.2, repeat: Infinity, ease: "linear" },
              opacity: { duration: p.pulseDuration, repeat: Infinity, ease: "easeInOut" }
            }}
            className={`absolute rounded-full ${isDark ? 'bg-white' : 'bg-primary/50'}`}
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              boxShadow: isDark ? `0 0 ${p.size * 2}px rgba(56, 189, 248, 0.4)` : 'none' // Subtle #38BDF8 accent in dark mode
            }}
          />
        ))}
      </div>

    </div>
  );
};

export default GlobalSpaceBackground;
