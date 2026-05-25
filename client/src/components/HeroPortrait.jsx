import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';

export default function HeroPortrait() {
  const ref = useRef(null);
  const { isDark } = useTheme();

  // 3D Tilt calculations
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for rotation
  const rx = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), { stiffness: 100, damping: 20 });
  const ry = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), { stiffness: 100, damping: 20 });

  // Lighting glare calculations
  const lightX = useSpring(useTransform(mouseX, [-0.5, 0.5], [100, 0]), { stiffness: 100, damping: 20 });
  const lightY = useSpring(useTransform(mouseY, [-0.5, 0.5], [100, 0]), { stiffness: 100, damping: 20 });
  const background = useMotionTemplate`radial-gradient(circle at ${lightX}% ${lightY}%, rgba(255,255,255,0.08) 0%, transparent 50%)`;

  const onMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const onMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div className="relative flex items-center justify-center w-[280px] h-[340px] sm:w-[330px] sm:h-[400px] mx-auto perspective-[1000px] select-none z-10">
      
      {/* ── Layer 1: Soft Outer Ambient Glow (Extremely minimal & elegant) ── */}
      <div 
        className="absolute -inset-8 rounded-[2.5rem] blur-[60px] pointer-events-none z-0 transition-opacity duration-300"
        style={{
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, rgba(168, 85, 247, 0.08) 50%, transparent 100%)',
          opacity: isDark ? 1 : 0.4,
        }}
      />

      {/* ── Layer 2: Tiltable Portrait Frame ── */}
      <motion.div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        whileHover={{ scale: 1.01 }}
        style={{
          rotateX: rx,
          rotateY: ry,
          transformStyle: "preserve-3d",
          boxShadow: isDark 
            ? '0 30px 70px rgba(0,0,0,0.65), inset 0 1px 0 0 rgba(255,255,255,0.05)'
            : '0 30px 60px rgba(15,23,42,0.08), inset 0 1px 0 0 rgba(255,255,255,0.9)'
        }}
        className="relative w-full h-full rounded-[2.2rem] overflow-hidden cursor-pointer group z-10 bg-white/70 dark:bg-[#07070d]/60 border border-slate-200/50 dark:border-white/10 backdrop-blur-xl p-[7px]"
      >
        {/* Subtle Inner Gradient Border Effect */}
        <div className="absolute inset-0 rounded-[2.2rem] border border-transparent bg-gradient-to-tr from-indigo-500/10 via-purple-500/10 to-sky-400/10 pointer-events-none" />

        {/* ── Layer 3: Picture Container ── */}
        <div className="relative w-full h-full rounded-[1.8rem] overflow-hidden bg-slate-50 dark:bg-[#0c0c14] border border-slate-200/30 dark:border-white/5 flex items-center justify-center">
          
          {/* Subtle Radial Glow behind the photo for separation */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.08)_0%,transparent_70%)] pointer-events-none" />
          
          <img
            src="/assets/images/HarshPanditHero.png"
            alt="Harsh Kumar Pandit"
            draggable={false}
            className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
          />

          {/* Elegant vignette bottom shade overlay */}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-slate-900/15 dark:from-black/50 to-transparent pointer-events-none" />
        </div>

        {/* ── Layer 4: Dynamic Glare Overlay ── */}
        <motion.div 
          className="absolute inset-0 z-20 pointer-events-none mix-blend-overlay transition-opacity duration-300 opacity-0 group-hover:opacity-100 rounded-[2.2rem]"
          style={{ background }}
        />

      </motion.div>
    </div>
  );
}
