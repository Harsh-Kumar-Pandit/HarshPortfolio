import React, { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { Sun, Moon, Home, Briefcase, User, Mail, Download, Award } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';

const MagneticWrapper = ({ children, className }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((clientX - centerX) * 0.2); // Subtle magnetic pull
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

  return (
    <>
      {/* Fixed Top Left Logo */}
      <div className="hidden md:flex fixed top-8 left-8 z-50 items-center group/logo cursor-pointer">
        <MagneticWrapper className="flex items-center">
          <Link to="/" className="relative font-sans text-2xl font-black tracking-tighter transition-all duration-300 overflow-hidden px-2 py-1">
            {/* Shimmer overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/logo:translate-x-[200%] transition-transform duration-1000 z-20 pointer-events-none" />
            <span className="text-on-surface">Harsh</span>
            <motion.span 
              className="inline-block text-primary drop-shadow-[0_0_8px_rgba(139,92,246,0.6)] group-hover/logo:drop-shadow-[0_0_15px_rgba(139,92,246,0.9)] transition-all duration-500"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              .dev
            </motion.span>
          </Link>
        </MagneticWrapper>
      </div>

      {/* Slim Floating Dock (Icons Only) */}
      <motion.nav 
        whileHover={{ boxShadow: "0 20px 40px -10px rgba(139, 92, 246, 0.15)" }}
        className="fixed z-50 flex group/dock
          bottom-4 left-1/2 -translate-x-1/2 flex-row items-center gap-2 p-2 rounded-full
          md:bottom-auto md:left-6 md:top-1/2 md:-translate-y-1/2 md:-translate-x-0 md:flex-col md:p-3 md:rounded-3xl
          md:w-[72px]
          bg-surface/40 backdrop-blur-2xl border border-outline-variant/20 shadow-[0_8px_32px_rgba(0,0,0,0.2)]
          transition-colors duration-400 ease-[cubic-bezier(0.2,0.8,0.2,1)]
          overflow-hidden"
      >
        {/* Premium ambient glow layer inside the dock */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-primary/5 opacity-0 md:group-hover/dock:opacity-100 transition-opacity duration-700 pointer-events-none" />

        {/* Nav Links */}
        <div className="flex flex-row md:flex-col gap-1 md:w-full relative z-10">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            const Icon = link.icon;
            
            return (
              <Link
                key={link.name}
                to={link.path}
                className="relative flex items-center justify-center w-12 h-12 rounded-xl group/link shrink-0"
                title={link.name}
              >
                {/* Active State Background (Sliding Pill) */}
                {isActive && (
                  <motion.div
                    layoutId="activeDockTab"
                    className="absolute inset-0 bg-primary/20 border border-primary/40 rounded-xl shadow-[inset_0_0_20px_rgba(139,92,246,0.5),0_0_15px_rgba(139,92,246,0.3)] backdrop-blur-md"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}

                {/* Hover highlight for inactive links */}
                {!isActive && (
                  <div className="absolute inset-0 bg-surface-container-high/50 rounded-xl opacity-0 group-hover/link:opacity-100 transition-opacity duration-300" />
                )}
                
                {/* Icon Container with Magnetic physics */}
                <div className="relative z-10 flex items-center justify-center w-full h-full">
                  <MagneticWrapper className="flex items-center justify-center w-full h-full">
                    <motion.div 
                      whileHover={{ scale: 1.25, y: -4 }} 
                      whileTap={{ scale: 0.9 }}
                      transition={{ type: "spring", stiffness: 400, damping: 15 }}
                      className="flex items-center justify-center relative"
                    >
                      {/* Ambient hover bloom */}
                      {!isActive && (
                        <div className="absolute inset-0 bg-primary/40 rounded-full blur-[10px] opacity-0 group-hover/link:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      )}
                      <Icon 
                        className={`w-[22px] h-[22px] transition-colors duration-300 relative z-10 ${
                          isActive 
                            ? 'text-primary drop-shadow-[0_0_15px_rgba(139,92,246,0.9)]' 
                            : 'text-on-surface-variant group-hover/link:text-white group-hover/link:drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]'
                        }`} 
                      />
                    </motion.div>
                  </MagneticWrapper>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Desktop Divider */}
        <div className="hidden md:block w-full h-[1px] bg-gradient-to-r from-transparent via-outline-variant/30 to-transparent my-3 shrink-0 relative z-10" />

        {/* Utility Section (Theme & Resume) */}
        <div className="flex flex-row md:flex-col gap-1 md:w-full relative z-10">
          
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="relative flex items-center justify-center w-12 h-12 rounded-xl group/btn hover:bg-surface-container-high/50 transition-colors shrink-0"
            title="Toggle Theme"
          >
            <div className="relative z-10 flex items-center justify-center w-full h-full">
              <MagneticWrapper className="flex items-center justify-center w-full h-full">
                <motion.div 
                  whileHover={{ scale: 1.15, y: -2 }} 
                  whileTap={{ scale: 0.9 }} 
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="flex items-center justify-center"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={isDark ? 'dark' : 'light'}
                      initial={{ y: -20, opacity: 0, rotate: -90 }}
                      animate={{ y: 0, opacity: 1, rotate: 0 }}
                      exit={{ y: 20, opacity: 0, rotate: 90 }}
                      transition={{ duration: 0.2 }}
                      className="group-hover/btn:text-on-surface group-hover/btn:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] transition-colors"
                    >
                      {isDark ? <Sun className="w-[22px] h-[22px] text-on-surface-variant group-hover/btn:text-on-surface" /> : <Moon className="w-[22px] h-[22px] text-on-surface-variant group-hover/btn:text-on-surface" />}
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
              </MagneticWrapper>
            </div>
          </button>

          {/* Resume Button */}
          <button 
            onClick={handleResumeDownload}
            className="relative flex items-center justify-center w-12 h-12 rounded-xl group/btn bg-gradient-to-r from-primary to-secondary text-white shadow-[0_4px_14px_rgba(139,92,246,0.3)] hover:shadow-[0_6px_20px_rgba(139,92,246,0.5)] transition-all shrink-0 mt-1 md:mt-2"
            title="Download Resume"
          >
            <div className="relative z-10 flex items-center justify-center w-full h-full">
              <MagneticWrapper className="flex items-center justify-center w-full h-full">
                <motion.div 
                  whileHover={{ scale: 1.15, y: -2 }} 
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="flex items-center justify-center drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
                >
                  <Download className="w-[22px] h-[22px]" />
                </motion.div>
              </MagneticWrapper>
            </div>
          </button>

        </div>
      </motion.nav>
    </>
  );
};

export default Navbar;
