import React from 'react';
import { motion } from 'framer-motion';

const RevealSection = ({ children, className = "", delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.7, 
        delay: delay,
        ease: [0.22, 1, 0.36, 1] // Elegant easeOut
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default RevealSection;
