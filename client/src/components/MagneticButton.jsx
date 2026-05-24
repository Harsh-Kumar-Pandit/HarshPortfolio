import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const MagneticButton = ({ children, className = "", strength = 10 }) => {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    const moveX = ((clientX - centerX) / (width / 2)) * strength;
    const moveY = ((clientY - centerY) / (height / 2)) * strength;
    
    x.set(moveX);
    y.set(moveY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      className={`inline-block relative interactive ${className}`}
    >
      <motion.div
        animate={{
          scale: isHovered ? 1.05 : 1,
          y: isHovered ? -2 : 0, // Soft lift
        }}
        style={{ 
          x: xSpring, 
          y: ySpring,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className="w-full h-full relative z-10"
      >
        {children}
        
        {/* Subtle hover glow layer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 rounded-xl bg-primary/20 blur-md -z-10 pointer-events-none"
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </div>
  );
};

export default MagneticButton;
