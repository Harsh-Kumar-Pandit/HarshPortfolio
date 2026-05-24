import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';

const DeveloperWorkspace = () => {
  const { isDark } = useTheme();
  const containerRef = useRef(null);

  // Parallax physics for subtle cinematic depth
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 40, stiffness: 100 });
  const smoothY = useSpring(mouseY, { damping: 40, stiffness: 100 });
  
  // Transform background slightly opposite to mouse
  const bgX = useTransform(smoothX, [-0.5, 0.5], [8, -8]);
  const bgY = useTransform(smoothY, [-0.5, 0.5], [8, -8]);

  // Floating dust particles
  const [particles, setParticles] = useState([]);
  useEffect(() => {
    const newParticles = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 15 + 15,
      delay: Math.random() * 5
    }));
    setParticles(newParticles);
  }, []);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
      className="relative w-full aspect-square max-w-md mx-auto rounded-3xl overflow-hidden glass-card border border-outline-variant/20 shadow-[0_12px_40px_rgba(0,0,0,0.15)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.5)] bg-[#0a0a0a]"
    >
      {/* Background Image Crossfade (Scaled slightly to hide edges during parallax) */}
      <motion.div style={{ x: bgX, y: bgY }} className="absolute -inset-6">
        <AnimatePresence mode="wait">
          {isDark ? (
            <motion.img 
              key="dark"
              src="/assets/images/dark_workspace.png"
              alt="Premium Dark Developer Workspace"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <motion.img 
              key="light"
              src="/assets/images/light_workspace.png"
              alt="Premium Light Developer Workspace"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
        </AnimatePresence>
      </motion.div>

      {/* Cinematic Screen Glow Overlays (Breathing effect on screens) */}
      <motion.div
        animate={{ opacity: [0.1, 0.4, 0.1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[25%] left-[20%] w-[45%] h-[35%] bg-[#60a5fa] dark:bg-[#a855f7] blur-[40px] mix-blend-screen pointer-events-none opacity-30"
      />
      
      {/* Blinking Terminal Cursor Activity Simulator */}
      <div className="absolute top-[38%] left-[28%] w-1 h-3 bg-white/70 dark:bg-[#4ade80]/80 animate-[ping_1.5s_ease-in-out_infinite] blur-[0.5px]" />
      <div className="absolute top-[42%] left-[35%] w-1.5 h-3.5 bg-white/50 dark:bg-[#60a5fa]/70 animate-[ping_2s_ease-in-out_infinite] blur-[0.5px]" />

      {/* Ambient Depth Vignette */}
      <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.3)] dark:shadow-[inset_0_0_120px_rgba(0,0,0,0.9)] pointer-events-none" />

      {/* Floating Cinematic Dust Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30 dark:opacity-60">
        {particles.map(p => (
          <motion.div
            key={p.id}
            animate={{ 
              y: [p.y + '%', p.y - 10 + '%'], 
              x: [p.x + '%', p.x + 3 + '%'],
              opacity: [0, 0.9, 0] 
            }}
            transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "linear" }}
            className="absolute rounded-full bg-white blur-[0.5px] mix-blend-overlay"
            style={{ width: p.size, height: p.size, left: `${p.x}%` }}
          />
        ))}
      </div>
      
      {/* Premium Glass Border Highlight */}
      <div className="absolute inset-0 rounded-3xl border border-white/40 dark:border-white/10 mix-blend-overlay pointer-events-none" />
    </div>
  );
};

export default DeveloperWorkspace;
