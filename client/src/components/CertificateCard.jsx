import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, CheckCircle } from 'lucide-react';

const CertificateCard = ({ certificate, onClick }) => {
  return (
    <motion.div
      layoutId={`cert-container-${certificate.id}`}
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onClick={onClick}
      className="group relative flex flex-col h-full rounded-[2rem] glass-card overflow-hidden cursor-pointer"
    >
      {/* Subtle overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/5 to-transparent dark:from-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Thumbnail */}
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-950/5 dark:bg-black/40 border-b border-slate-900/5 dark:border-b-white/5 p-4 flex items-center justify-center">
        <motion.img
          layoutId={`cert-image-${certificate.id}`}
          src={certificate.thumbnail}
          alt={certificate.title}
          className="w-full h-full object-contain drop-shadow-md transition-transform duration-700 ease-out group-hover:scale-105"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=600&auto=format&fit=crop';
          }}
        />
        
        <span className="absolute top-4 left-4 px-3 py-1 bg-white/80 dark:bg-black/60 backdrop-blur-md rounded-full text-[10px] font-semibold text-slate-800 dark:text-white/80 border border-slate-900/10 dark:border-white/10 uppercase tracking-widest z-10 shadow-sm">
          {certificate.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow space-y-4">
        <div>
          <h3 className="font-sans text-base font-bold text-slate-900 dark:text-white transition-colors duration-300 line-clamp-2">
            {certificate.title}
          </h3>
          <p className="font-sans text-xs text-slate-500 dark:text-white/40 mt-1.5 flex items-center gap-1.5 font-light">
            <CheckCircle className="w-3.5 h-3.5 text-slate-400 dark:text-white/40" />
            {certificate.issuer} <span className="mx-1 opacity-50">•</span> {certificate.date}
          </p>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-1.5 pt-2">
          {certificate.skills.slice(0, 3).map((skill) => (
            <span
              key={skill}
              className="px-2.5 py-1 bg-slate-900/5 dark:bg-white/5 rounded-full text-[10px] font-medium text-slate-700 dark:text-white/70 border border-slate-900/10 dark:border-white/5"
            >
              {skill}
            </span>
          ))}
          {certificate.skills.length > 3 && (
            <span className="px-2 py-1 bg-slate-900/5 dark:bg-white/5 rounded-full text-[9px] font-bold text-slate-400 dark:text-white/40">
              +{certificate.skills.length - 3}
            </span>
          )}
        </div>
        
        <div className="flex justify-end items-center text-slate-800 dark:text-white/80 font-semibold text-xs pt-4 mt-auto group-hover:translate-x-1 transition-transform duration-300">
          View Certificate <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
        </div>
      </div>
    </motion.div>
  );
};

export default CertificateCard;
