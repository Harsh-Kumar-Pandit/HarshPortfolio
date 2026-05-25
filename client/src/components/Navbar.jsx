import React, { useRef, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { Sun, Moon, Home, Briefcase, User, Mail, Download, Award } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';

const MagneticWrapper = ({ children, className }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 180, damping: 14, mass: 0.1 });
  const mouseYSpring = useSpring(y, { stiffness: 180, damping: 14, mass: 0.1 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((clientX - centerX) * 0.2);
    y.set((clientY - centerY) * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: mouseXSpring, y: mouseYSpring }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Work', path: '/projects', icon: Briefcase },
    { name: 'Certifications', path: '/certifications', icon: Award },
    { name: 'About', path: '/about', icon: User },
    { name: 'Contact', path: '/contact', icon: Mail },
  ];

  const handleResumeDownload = () => {
    window.open('/assets/HarshPandit.pdf', '_blank');
  };

  // Gentle float keyframes
  const dockAnimate = isMobile 
    ? { y: [0, -4, 0] } 
    : { y: ["-50%", "-51.5%", "-50%"] };

  const dockTransition = {
    y: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <>
      {/* Floating Vertical/Horizontal Dock */}
      <motion.nav 
        initial={isMobile ? { y: 0 } : { y: "-50%" }}
        animate={dockAnimate}
        transition={dockTransition}
        className="fixed z-50 flex flex-row items-center gap-3 p-3 rounded-full
          bottom-4 left-1/2 -translate-x-1/2
          md:bottom-auto md:left-6 md:top-1/2 md:-translate-y-1/2 md:translate-x-0 md:flex-col md:p-4.5 md:rounded-[2.5rem]
          glass-nav transition-all duration-300 w-[92%] max-w-[400px] md:w-16 justify-between md:justify-center"
      >
        {/* Mount Entry Animation Wrapper */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 180, damping: 18, delay: 0.15 }}
          className="flex flex-row md:flex-col items-center justify-between md:justify-center w-full h-full"
        >
          {/* Nav Links */}
          <div className="flex flex-row md:flex-col gap-3 md:gap-5.5 w-full items-center justify-around md:justify-center">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              const Icon = link.icon;
              
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className="relative flex items-center justify-center w-11 h-11 rounded-full group/link shrink-0"
                  onMouseEnter={() => setHoveredIndex(link.name)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Translucent Active Pill + Glow */}
                  {isActive && (
                    <motion.div
                      layoutId="activeDockTab"
                      className="absolute inset-0 rounded-full border border-slate-900/10 dark:border-white/10 bg-slate-900/[0.04] dark:bg-white/5"
                      animate={{
                        boxShadow: isDark 
                          ? [
                              '0 0 14px rgba(255, 255, 255, 0.08), inset 0 1px 0 0 rgba(255, 255, 255, 0.05)',
                              '0 0 22px rgba(255, 255, 255, 0.16), inset 0 1px 0 0 rgba(255, 255, 255, 0.08)',
                              '0 0 14px rgba(255, 255, 255, 0.08), inset 0 1px 0 0 rgba(255, 255, 255, 0.05)'
                            ]
                          : [
                              '0 2px 8px rgba(15, 23, 42, 0.04), inset 0 1px 0 0 rgba(255, 255, 255, 0.6)',
                              '0 2px 14px rgba(15, 23, 42, 0.08), inset 0 1px 0 0 rgba(255, 255, 255, 0.8)',
                              '0 2px 8px rgba(15, 23, 42, 0.04), inset 0 1px 0 0 rgba(255, 255, 255, 0.6)'
                            ]
                      }}
                      transition={{
                        boxShadow: {
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        },
                        layoutId: { type: "spring", stiffness: 350, damping: 26 }
                      }}
                    />
                  )}

                  {/* Hover border */}
                  {!isActive && (
                    <div className="absolute inset-0 border border-transparent hover:border-slate-900/5 dark:hover:border-white/5 rounded-full transition-colors duration-200" />
                  )}
                  
                  {/* Icon content */}
                  <div className="relative z-10 flex items-center justify-center w-full h-full">
                    <MagneticWrapper className="flex items-center justify-center w-full h-full">
                      <motion.div 
                        whileHover={{ y: -3, scale: 1.12, rotate: 8 }} 
                        whileTap={{ scale: 0.9, rotate: -4 }}
                        transition={{ type: "spring", stiffness: 400, damping: 15 }}
                        className="flex items-center justify-center w-full h-full"
                      >
                        <Icon 
                          className={`w-5 h-5 transition-colors duration-300 relative z-10 ${
                            isActive 
                              ? 'text-slate-950 dark:text-white' 
                              : 'text-slate-400 dark:text-white/40 group-hover/link:text-slate-800 dark:group-hover/link:text-white/80'
                          }`} 
                          strokeWidth={isActive ? 2.2 : 1.8}
                        />
                      </motion.div>
                    </MagneticWrapper>
                  </div>

                  {/* Custom Animated Tooltip */}
                  <AnimatePresence>
                    {hoveredIndex === link.name && (
                      <motion.div
                        initial={isMobile ? { opacity: 0, y: 10, scale: 0.95 } : { opacity: 0, x: -10, scale: 0.95 }}
                        animate={isMobile ? { opacity: 1, y: 0, scale: 1 } : { opacity: 1, x: 0, scale: 1 }}
                        exit={isMobile ? { opacity: 0, y: 8, scale: 0.95 } : { opacity: 0, x: -8, scale: 0.95 }}
                        transition={{ type: 'spring', stiffness: 380, damping: 22 }}
                        className="absolute z-50 pointer-events-none px-3 py-1.5 rounded-lg
                          font-sans text-[10px] font-bold uppercase tracking-wider whitespace-nowrap
                          bg-slate-950/90 text-white dark:bg-white/95 dark:text-black shadow-lg border border-slate-800/10 dark:border-white/20 backdrop-blur-md
                          bottom-full mb-3.5 left-1/2 -translate-x-1/2
                          md:bottom-auto md:mb-0 md:top-1/2 md:-translate-y-1/2 md:left-16 md:translate-x-0"
                      >
                        {link.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Link>
              );
            })}
          </div>

          {/* Divider */}
          <div className="hidden md:block w-9 h-[1px] bg-slate-900/10 dark:bg-white/10 my-3 shrink-0" />

          {/* Theme and CV controls */}
          <div className="flex flex-row md:flex-col gap-3 md:gap-5.5 items-center">
            
            {/* Theme Switcher */}
            <button
              onClick={toggleTheme}
              className="relative flex items-center justify-center w-11 h-11 rounded-full group/btn hover:bg-slate-900/[0.04] dark:hover:bg-white/5 transition-colors shrink-0"
              onMouseEnter={() => setHoveredIndex('theme')}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative z-10 flex items-center justify-center w-full h-full">
                <MagneticWrapper className="flex items-center justify-center w-full h-full">
                  <motion.div 
                    whileHover={{ y: -3, scale: 1.12, rotate: 8 }} 
                    whileTap={{ scale: 0.9, rotate: -4 }} 
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    className="flex items-center justify-center"
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.div
                        key={isDark ? 'dark' : 'light'}
                        initial={{ opacity: 0, rotate: -30, scale: 0.8 }}
                        animate={{ opacity: 1, rotate: 0, scale: 1 }}
                        exit={{ opacity: 0, rotate: 30, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                        className="text-slate-400 dark:text-white/40 group-hover/btn:text-slate-800 dark:group-hover/btn:text-white/80 transition-colors"
                      >
                        {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                      </motion.div>
                    </AnimatePresence>
                  </motion.div>
                </MagneticWrapper>
              </div>

              {/* Custom Animated Tooltip */}
              <AnimatePresence>
                {hoveredIndex === 'theme' && (
                  <motion.div
                    initial={isMobile ? { opacity: 0, y: 10, scale: 0.95 } : { opacity: 0, x: -10, scale: 0.95 }}
                    animate={isMobile ? { opacity: 1, y: 0, scale: 1 } : { opacity: 1, x: 0, scale: 1 }}
                    exit={isMobile ? { opacity: 0, y: 8, scale: 0.95 } : { opacity: 0, x: -8, scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 380, damping: 22 }}
                    className="absolute z-50 pointer-events-none px-3 py-1.5 rounded-lg
                      font-sans text-[10px] font-bold uppercase tracking-wider whitespace-nowrap
                      bg-slate-950/90 text-white dark:bg-white/95 dark:text-black shadow-lg border border-slate-800/10 dark:border-white/20 backdrop-blur-md
                      bottom-full mb-3.5 left-1/2 -translate-x-1/2
                      md:bottom-auto md:mb-0 md:top-1/2 md:-translate-y-1/2 md:left-16 md:translate-x-0"
                  >
                    {isDark ? 'Light Mode' : 'Dark Mode'}
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            {/* Download Resume CV */}
            <button 
              onClick={handleResumeDownload}
              className="relative flex items-center justify-center w-11 h-11 rounded-full group/btn hover:bg-slate-900/[0.04] dark:hover:bg-white/5 transition-colors shrink-0"
              onMouseEnter={() => setHoveredIndex('resume')}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative z-10 flex items-center justify-center w-full h-full">
                <MagneticWrapper className="flex items-center justify-center w-full h-full">
                  <motion.div 
                    whileHover={{ y: -3, scale: 1.12, rotate: 8 }} 
                    whileTap={{ scale: 0.9, rotate: -4 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    className="flex items-center justify-center text-slate-400 dark:text-white/40 group-hover/btn:text-slate-800 dark:group-hover/btn:text-white/80 transition-colors"
                  >
                    <Download className="w-5 h-5" />
                  </motion.div>
                </MagneticWrapper>
              </div>

              {/* Custom Animated Tooltip */}
              <AnimatePresence>
                {hoveredIndex === 'resume' && (
                  <motion.div
                    initial={isMobile ? { opacity: 0, y: 10, scale: 0.95 } : { opacity: 0, x: -10, scale: 0.95 }}
                    animate={isMobile ? { opacity: 1, y: 0, scale: 1 } : { opacity: 1, x: 0, scale: 1 }}
                    exit={isMobile ? { opacity: 0, y: 8, scale: 0.95 } : { opacity: 0, x: -8, scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 380, damping: 22 }}
                    className="absolute z-50 pointer-events-none px-3 py-1.5 rounded-lg
                      font-sans text-[10px] font-bold uppercase tracking-wider whitespace-nowrap
                      bg-slate-950/90 text-white dark:bg-white/95 dark:text-black shadow-lg border border-slate-800/10 dark:border-white/20 backdrop-blur-md
                      bottom-full mb-3.5 left-1/2 -translate-x-1/2
                      md:bottom-auto md:mb-0 md:top-1/2 md:-translate-y-1/2 md:left-16 md:translate-x-0"
                  >
                    Download CV
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

          </div>
        </motion.div>
      </motion.nav>
    </>
  );
};

export default Navbar;
