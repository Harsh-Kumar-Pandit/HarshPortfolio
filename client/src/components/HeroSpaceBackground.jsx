import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';

// Procedural Asteroid Shapes (Dark Mode)
const asteroidPaths = [
  "M20 15 Q35 5, 55 10 T85 30 T90 60 T75 85 T40 95 T10 70 Z",
  "M30 10 Q50 0, 70 20 T95 50 T80 80 T40 90 T5 60 Z",
  "M15 25 Q30 5, 60 15 T90 40 T85 75 T50 90 T10 65 Z"
];

// Procedural Glass Fragment Shapes (Light Mode)
const glassPaths = [
  "M50 0 L100 50 L50 100 L0 50 Z",
  "M20 0 L80 0 L100 80 L0 80 Z",
  "M0 20 L100 0 L80 100 L20 100 Z"
];

const objectConfigs = [
  { x: 8, y: 15, depth: 0.9, scale: 2.2, blur: 0 },    // Top left (Foreground, large)
  { x: 85, y: 12, depth: 0.5, scale: 1.2, blur: 2 },   // Top right (Mid)
  { x: 88, y: 50, depth: 0.8, scale: 1.8, blur: 0.5 }, // Mid right (Foreground)
  { x: 15, y: 80, depth: 0.4, scale: 0.9, blur: 4 },   // Bottom left (Background)
  { x: 45, y: 88, depth: 0.2, scale: 0.6, blur: 8 },   // Bottom center (Far background)
  { x: 80, y: 85, depth: 0.7, scale: 1.5, blur: 1 },   // Bottom right (Mid-foreground)
  { x: 5, y: 55, depth: 0.1, scale: 0.4, blur: 10 },   // Mid left (Far background)
];

const generateSpaceObjects = (isDark) => {
  return objectConfigs.map((config, i) => {
    return {
      id: i,
      ...config,
      rotationStart: Math.random() * 360,
      floatDuration: 25 + Math.random() * 20, // 25s to 45s loop
      pathIndex: i % 3,
      // Organic movement keyframes
      yKeyframes: [0, -30 * config.scale, 15 * config.scale, -10 * config.scale, 0],
      xKeyframes: [0, 20 * config.scale, -15 * config.scale, 10 * config.scale, 0],
      rotKeyframes: [0, 8, -5, 3, 0],
    };
  });
};

const generateStars = (count) => {
  return Array.from({ length: count }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    opacity: Math.random() * 0.8 + 0.2,
    twinkleDuration: 2 + Math.random() * 4
  }));
};

const SpaceObject = ({ obj, isDark, smoothMouseX, smoothMouseY }) => {
  // Calculate parallax based on depth
  const depthParallaxX = useTransform(smoothMouseX, [-1, 1], [`${-10 * obj.scale}%`, `${10 * obj.scale}%`]);
  const depthParallaxY = useTransform(smoothMouseY, [-1, 1], [`${-10 * obj.scale}%`, `${10 * obj.scale}%`]);
  
  const pathData = isDark ? asteroidPaths[obj.pathIndex] : glassPaths[obj.pathIndex];

  // Failsafe path if undefined
  const safePathData = pathData || "M0 0 L10 0 L10 10 L0 10 Z";

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: `${obj.x}%`,
        top: `${obj.y}%`,
        x: depthParallaxX,
        y: depthParallaxY,
        filter: `blur(${obj.blur}px)`,
        zIndex: obj.depth > 0.8 ? 10 : obj.depth > 0.4 ? 5 : 1,
      }}
    >
      <motion.div
        animate={{
          y: obj.yKeyframes,
          x: obj.xKeyframes,
          rotate: obj.rotKeyframes.map(r => obj.rotationStart + r)
        }}
        transition={{
          y: { duration: obj.floatDuration, repeat: Infinity, ease: "easeInOut" },
          x: { duration: obj.floatDuration * 1.1, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: obj.floatDuration * 1.3, repeat: Infinity, ease: "easeInOut" }
        }}
        className="relative"
        style={{
          width: 80 * obj.scale,
          height: 80 * obj.scale,
        }}
      >
        <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          {isDark ? (
            <>
              <defs>
                <linearGradient id={`rockGrad-${obj.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2A2A35" />
                  <stop offset="50%" stopColor="#1A1A24" />
                  <stop offset="100%" stopColor="#0D0D14" />
                </linearGradient>
                <linearGradient id={`highlightGrad-${obj.id}`} x1="0%" y1="0%" x2="50%" y2="50%">
                  <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
                </linearGradient>
                <filter id={`shadow-${obj.id}`} x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="-5" dy="10" stdDeviation="8" floodColor="#000" floodOpacity="0.8" />
                </filter>
              </defs>
              <path d={safePathData} fill={`url(#rockGrad-${obj.id})`} filter={`url(#shadow-${obj.id})`} />
              <path d={safePathData} fill={`url(#highlightGrad-${obj.id})`} style={{ mixBlendMode: 'overlay' }} />
              <path d={safePathData} fill="none" stroke="#3F3F5A" strokeWidth="0.5" strokeOpacity="0.5" />
            </>
          ) : (
            <>
              <defs>
                <linearGradient id={`glassGrad-${obj.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#F8FAFC" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#E2E8F0" stopOpacity="0.1" />
                </linearGradient>
                <filter id={`glassBlur-${obj.id}`}>
                  <feGaussianBlur stdDeviation="4" />
                </filter>
                <filter id={`glassShadow-${obj.id}`} x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="15" stdDeviation="15" floodColor="#8B5CF6" floodOpacity="0.08" />
                </filter>
              </defs>
              <path 
                d={safePathData} 
                fill={`url(#glassGrad-${obj.id})`} 
                stroke="#FFFFFF" 
                strokeWidth="1.5" 
                strokeOpacity="0.8"
                filter={`url(#glassShadow-${obj.id})`}
                style={{ backdropFilter: 'blur(10px)' }}
              />
            </>
          )}
        </svg>
      </motion.div>
    </motion.div>
  );
};

// Meteor component for occasional streaks
const Meteor = ({ isDark }) => {
  if (!isDark) return null;
  return (
    <motion.div
      initial={{ top: '-10%', left: '110%', opacity: 0 }}
      animate={{
        top: ['-10%', '110%'],
        left: ['110%', '-10%'],
        opacity: [0, 1, 0]
      }}
      transition={{
        duration: 2.5,
        ease: "linear",
        repeat: Infinity,
        repeatDelay: 15 + Math.random() * 20 // Occasional
      }}
      className="absolute w-[2px] h-[100px] bg-gradient-to-b from-white via-white to-transparent transform -rotate-45 z-0 blur-[1px]"
    />
  );
};

const HeroSpaceBackground = () => {
  const { isDark } = useTheme();
  
  // Parallax Mouse Tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 50, stiffness: 100, mass: 1 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Background shifts very slightly
  const bgX = useTransform(smoothMouseX, [-1, 1], ['-2%', '2%']);
  const bgY = useTransform(smoothMouseY, [-1, 1], ['-2%', '2%']);
  
  // Midground shifts moderately
  const midX = useTransform(smoothMouseX, [-1, 1], ['-5%', '5%']);
  const midY = useTransform(smoothMouseY, [-1, 1], ['-5%', '5%']);
  
  // Foreground shifts more
  const fgX = useTransform(smoothMouseX, [-1, 1], ['-12%', '12%']);
  const fgY = useTransform(smoothMouseY, [-1, 1], ['-12%', '12%']);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalize mouse coordinates between -1 and 1
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Memoize objects so they don't regenerate on re-renders, but recreate on theme change
  const [spaceObjects, setSpaceObjects] = useState([]);
  const [stars, setStars] = useState([]);

  useEffect(() => {
    setSpaceObjects(generateSpaceObjects(isDark));
    if (isDark) {
      setStars(generateStars(70)); // More stars for depth
    } else {
      setStars(generateStars(25)); // Fewer particles in light mode
    }
  }, [isDark]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-background transition-colors duration-700 pointer-events-none select-none">
      
      {/* ---------------- LAYER 1: Deep Space Gradient ---------------- */}
      <motion.div 
        style={{ x: bgX, y: bgY }}
        className="absolute -inset-[10%] w-[120%] h-[120%]"
      >
        {isDark ? (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#0A0F1F] via-[#050816] to-[#02030A] opacity-90" />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-[#F8FAFC] to-[#EEF2FF] opacity-90" />
        )}
      </motion.div>

      {/* ---------------- LAYER 2: Nebula / Atmosphere ---------------- */}
      <motion.div 
        style={{ x: midX, y: midY }}
        className="absolute -inset-[20%] w-[140%] h-[140%] opacity-60"
      >
        {isDark ? (
          <>
            <motion.div 
              animate={{ rotate: 360, scale: [1, 1.1, 1] }} 
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="absolute top-[10%] left-[20%] w-[50%] h-[50%] bg-primary/20 blur-[150px] rounded-full" 
            />
            <motion.div 
              animate={{ rotate: -360, scale: [1, 1.2, 1] }} 
              transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-[20%] right-[10%] w-[60%] h-[60%] bg-secondary/15 blur-[150px] rounded-full" 
            />
          </>
        ) : (
          <>
            <motion.div 
              animate={{ x: [0, 50, 0], y: [0, 30, 0] }} 
              transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[20%] left-[10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full" 
            />
            <motion.div 
              animate={{ x: [0, -40, 0], y: [0, -50, 0] }} 
              transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-[10%] right-[20%] w-[50%] h-[50%] bg-blue-400/5 blur-[120px] rounded-full" 
            />
          </>
        )}
      </motion.div>

      {/* ---------------- LAYER 3: Stars / Ambient Particles ---------------- */}
      <motion.div style={{ x: bgX, y: bgY }} className="absolute inset-0">
        {stars.map((star) => (
          <motion.div
            key={`star-${star.id}`}
            animate={{ 
              opacity: [star.opacity * 0.3, star.opacity, star.opacity * 0.3],
              y: [0, -20, 0], // Subtle drifting
              x: [0, 10, 0]
            }}
            transition={{ 
              opacity: { duration: star.twinkleDuration, repeat: Infinity, ease: "easeInOut" },
              y: { duration: 30 + star.id % 20, repeat: Infinity, ease: "linear" },
              x: { duration: 40 + star.id % 20, repeat: Infinity, ease: "linear" }
            }}
            className={`absolute rounded-full ${isDark ? 'bg-white' : 'bg-primary/40'}`}
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
              boxShadow: isDark ? `0 0 ${star.size * 2}px rgba(255,255,255,0.8)` : 'none'
            }}
          />
        ))}
      </motion.div>

      {/* ---------------- LAYER 3.5: Meteor ---------------- */}
      <Meteor isDark={isDark} />

      {/* ---------------- LAYER 4: Procedural Floating Objects ---------------- */}
      <div className="absolute inset-0">
        {spaceObjects.map((obj) => (
          <SpaceObject 
            key={`obj-${obj.id}-${isDark}`} 
            obj={obj} 
            isDark={isDark} 
            smoothMouseX={smoothMouseX} 
            smoothMouseY={smoothMouseY} 
          />
        ))}
      </div>

      {/* ---------------- LAYER 5: Front Gradient Mask (Fades into below sections) ---------------- */}
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-background to-transparent z-20 pointer-events-none" />

    </div>
  );
};

export default HeroSpaceBackground;
