import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, ShieldCheck } from 'lucide-react';

const CertificateModal = ({ certificate, isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && certificate && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/45 dark:bg-black/80 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            layoutId={`cert-container-${certificate.id}`}
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ type: 'spring', duration: 0.4 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] bg-white/95 dark:bg-[#0c0c0c]/90 border border-slate-200 dark:border-white/10 p-6 md:p-8 space-y-8 shadow-2xl backdrop-blur-2xl text-slate-900 dark:text-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full bg-slate-900/5 hover:bg-slate-900/10 dark:bg-white/5 dark:hover:bg-white/10 text-slate-600 dark:text-white/60 hover:text-slate-900 dark:hover:text-white border border-slate-900/10 dark:border-white/10 transition-all z-10"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="space-y-4 pr-12">
              <span className="inline-block px-3 py-1 bg-slate-900/5 dark:bg-white/5 rounded-full text-[10px] font-semibold text-slate-800 dark:text-white/85 border border-slate-900/10 dark:border-white/10 uppercase tracking-widest">
                {certificate.category}
              </span>
              
              <div>
                <h2 className="font-sans text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
                  {certificate.title}
                </h2>
                <div className="flex flex-wrap items-center gap-3 mt-3 font-sans text-xs text-slate-500 dark:text-white/60">
                  <span className="font-bold text-slate-800 dark:text-white flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 opacity-50" /> {certificate.issuer}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-slate-200 dark:bg-white/20" />
                  <span>Issued: {certificate.date}</span>
                  {certificate.credentialId !== "N/A" && (
                    <>
                      <span className="w-1 h-1 rounded-full bg-slate-200 dark:bg-white/20" />
                      <span className="font-mono opacity-80">ID: {certificate.credentialId}</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Render Preview Frame */}
            <motion.div 
              layoutId={`cert-image-${certificate.id}`}
              className="w-full rounded-2xl overflow-hidden bg-slate-950/5 dark:bg-black/60 border border-slate-200 dark:border-white/10 p-2 md:p-6 flex items-center justify-center relative min-h-[300px] md:min-h-[500px]"
            >
              {certificate.fullImage?.endsWith('.pdf') ? (
                <iframe 
                  src={`${certificate.fullImage}#toolbar=0`} 
                  className="w-full h-[50vh] min-h-[400px] md:min-h-[500px] relative z-10 rounded-xl border-none bg-white shadow-xl" 
                  title={certificate.title}
                />
              ) : (
                <img
                  src={certificate.fullImage || certificate.thumbnail}
                  alt={certificate.title}
                  className="w-full max-h-[60vh] object-contain drop-shadow-2xl relative z-10 rounded-xl bg-slate-950/5 dark:bg-white/5"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=600&auto=format&fit=crop';
                  }}
                />
              )}
            </motion.div>

            {/* Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-2">
              <div className="md:col-span-2 space-y-4">
                <h4 className="text-xs uppercase tracking-widest font-bold text-slate-500 dark:text-white/40">
                  Credential Details
                </h4>
                <p className="font-sans text-sm text-slate-600 dark:text-white/70 leading-relaxed font-light">
                  {certificate.description}
                </p>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-xs uppercase tracking-widest font-bold text-slate-500 dark:text-white/40">
                  Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  {certificate.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1.5 bg-slate-900/5 hover:bg-slate-900/10 rounded-lg text-xs font-semibold text-slate-800 dark:text-white/80 border border-slate-900/5 dark:border-white/5 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Verify CTA */}
            {certificate.verifyUrl && (
              <div className="pt-6 border-t border-slate-200 dark:border-white/10 flex justify-end">
                <a
                  href={certificate.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:hover:bg-white/90 dark:text-black rounded-full font-sans text-xs font-semibold transition-all shadow-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  Verify Authenticity
                </a>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CertificateModal;
