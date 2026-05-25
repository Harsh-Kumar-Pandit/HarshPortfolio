import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider, useTheme } from './hooks/useTheme';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Projects from './pages/Projects';
import About from './pages/About';
import Contact from './pages/Contact';
import Certifications from './pages/Certifications';
import GlobalSpaceBackground from './components/GlobalSpaceBackground';
import ScrollToTop from './components/ScrollToTop';
import PageTransition from './components/PageTransition';

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/projects" element={<PageTransition><Projects /></PageTransition>} />
        <Route path="/certifications" element={<PageTransition><Certifications /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

const AppContent = () => {
  const { isDark } = useTheme();

  return (
    <div className="min-h-screen bg-transparent text-on-surface flex flex-col transition-colors duration-300 relative">
      {/* Desktop Navbar Sidebar Pane (Equal spacing left/right around Navbar dock) */}
      <div className="hidden md:block fixed top-0 left-0 bottom-0 w-28 bg-[#f5f7fa]/30 dark:bg-[#020205]/40 border-r border-slate-200/40 dark:border-white/[0.03] backdrop-blur-xl z-40 pointer-events-none" />

      {/* Top-Left Brand Logo (Aligned left, with monochrome theme & animated glow) */}
      <div className="fixed top-8 left-6 md:left-8 z-50 pointer-events-auto">
        <Link to="/" className="relative flex items-center select-none hover:opacity-90 transition-opacity group">
          {/* Animated Soft Glow Background (Monochrome theme) */}
          <motion.div
            animate={{ 
              opacity: isDark ? [0.08, 0.18, 0.08] : [0.03, 0.08, 0.03],
              scale: [0.9, 1.1, 0.9]
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -inset-3 bg-slate-500/10 dark:bg-white/10 rounded-full blur-lg pointer-events-none -z-10"
          />

          <span className="font-sans text-lg sm:text-xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Harsh
          </span>
          <span className="font-sans text-lg sm:text-xl font-medium text-slate-500 dark:text-slate-400/80 ml-[1px]">
            .dev
          </span>
        </Link>
      </div>

      <Navbar />
      <div className="flex flex-col flex-grow pb-24 md:pb-0 md:pl-28 relative z-10">
        <div className="flex-grow">
          <AnimatedRoutes />
        </div>
        <Footer />
      </div>
    </div>
  );
};

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <Router>
          <ScrollToTop />
          <GlobalSpaceBackground />
          <AppContent />
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
