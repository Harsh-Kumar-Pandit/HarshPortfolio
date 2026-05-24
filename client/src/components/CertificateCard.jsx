import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X, ChevronRight, CheckCircle } from 'lucide-react';

const CertificateCard = ({ certificate, onClick }) => {
  return (
    <motion.div
      layoutId={`cert-container-${certificate.id}`}
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      onClick={onClick}
      className="glass-card relative rounded-3xl overflow-hidden cursor-pointer group flex flex-col h-full border border-outline-variant/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] hover:border-primary/60 hover:shadow-[0_30px_60px_-15px_rgba(139,92,246,0.25)] transition-all duration-500 bg-surface-container/50"
    >
      {/* Layered premium lighting effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/0 via-primary/0 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
      {/* Thumbnail */}
      <div className="relative aspect-[4/3] overflow-hidden bg-surface-container-low border-b border-outline-variant/10 p-4 flex items-center justify-center">
        {/* Abstract Glow Behind Image */}
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <motion.img
          layoutId={`cert-image-${certificate.id}`}
          src={certificate.thumbnail}
          alt={certificate.title}
          className="w-full h-full object-contain drop-shadow-md transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-110"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=600&auto=format&fit=crop';
          }}
        />
        
        {/* Category Tag */}
        <span className="absolute top-4 left-4 px-3 py-1 bg-background/80 backdrop-blur-md rounded-full text-xs font-bold text-primary border border-primary/20 uppercase tracking-widest z-10 shadow-sm">
          {certificate.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow space-y-4">
        <div>
          <h3 className="font-sans text-xl font-bold text-on-surface group-hover:text-primary transition-colors duration-300 line-clamp-2">
            {certificate.title}
          </h3>
          <p className="font-sans text-sm font-semibold text-on-surface-variant/80 mt-1 flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5 text-primary/80" />
            {certificate.issuer} <span className="text-outline-variant mx-1">•</span> {certificate.date}
          </p>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-1.5 pt-2">
          {certificate.skills.slice(0, 3).map((skill) => (
            <span
              key={skill}
              className="px-2.5 py-1 bg-surface-container rounded-full text-[11px] font-semibold text-on-surface-variant border border-outline-variant/30"
            >
              {skill}
            </span>
          ))}
          {certificate.skills.length > 3 && (
            <span className="px-2 py-1 bg-surface-container rounded-full text-[10px] font-bold text-primary/80 border border-primary/10">
              +{certificate.skills.length - 3}
            </span>
          )}
        </div>
        
        <div className="flex justify-end items-center text-primary font-bold text-xs pt-4 mt-auto group-hover:translate-x-1 transition-transform">
          View Certificate <ChevronRight className="w-4 h-4 ml-0.5" />
        </div>
      </div>
    </motion.div>
  );
};

export default CertificateCard;
