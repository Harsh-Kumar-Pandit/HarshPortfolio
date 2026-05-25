import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';

const GlobalSpaceBackground = () => {
  const { isDark } = useTheme();

  return (
    <div className="fixed inset-0 pointer-events-none -z-50 overflow-hidden transition-colors duration-500 bg-background">
      
      {/* ── 1. Gradient Base ── */}
      <div 
        className={`absolute inset-0 transition-opacity duration-700 ${
          isDark 
            ? 'bg-gradient-to-b from-[#020204] via-[#06060f] to-[#020204] opacity-100' 
            : 'bg-gradient-to-b from-[#fcfcfd] via-[#f8fafc] to-[#f1f5f9] opacity-100'
        }`} 
      />

      {/* ── 2. Adaptive Grid Lines with Sidebar Masking ── */}
      <div 
        className="absolute inset-0 transition-all duration-500" 
        style={{
          backgroundImage: isDark
            ? `
              linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)
            `
            : `
              linear-gradient(to right, rgba(15,23,42,0.035) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(15,23,42,0.035) 1px, transparent 1px)
            `,
          backgroundSize: '48px 48px',
          maskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 88px, rgba(0,0,0,1) 140px)',
          WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 88px, rgba(0,0,0,1) 140px)'
        }}
      />

      {/* ── 3. Subtle Ambient Flows (Faint SaaS lights) ── */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${isDark ? 'opacity-20' : 'opacity-100'}`}>
        <motion.div 
          animate={{ 
            x: [0, 30, -15, 0], 
            y: [0, -20, 15, 0],
            scale: [1, 1.03, 0.97, 1] 
          }} 
          transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute top-[-10%] left-[-15%] w-[60vw] h-[60vh] blur-[130px] rounded-full ${
            isDark ? 'bg-indigo-500/10' : 'bg-indigo-200/25'
          }`} 
        />
        <motion.div 
          animate={{ 
            x: [0, -20, 20, 0], 
            y: [0, 30, -15, 0],
            scale: [1, 0.97, 1.03, 1] 
          }} 
          transition={{ duration: 45, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute bottom-[-15%] right-[-10%] w-[50vw] h-[55vh] blur-[140px] rounded-full ${
            isDark ? 'bg-blue-500/10' : 'bg-sky-200/20'
          }`} 
        />
      </div>

      {/* ── 4. Grain/Noise Overlay ── */}
      <div className={`absolute inset-0 transition-opacity duration-500 mix-blend-overlay ${isDark ? 'opacity-[0.18]' : 'opacity-[0.06]'}`}>
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <filter id="globalNoiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#globalNoiseFilter)" />
        </svg>
      </div>

    </div>
  );
};

export default GlobalSpaceBackground;
