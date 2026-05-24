import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, ShieldCheck } from 'lucide-react';

const CertificateModal = ({ certificate, isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && certificate && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-background/80 backdrop-blur-xl"
          onClick={onClose}
        >
          <motion.div
            layoutId={`cert-container-${certificate.id}`}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-card rounded-[2rem] p-6 md:p-8 space-y-8 shadow-[0_20px_60px_rgba(139,92,246,0.15)] border-primary/20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full glass-card hover:bg-white/10 text-on-surface-variant hover:text-on-surface transition-all z-10 border border-outline-variant/20 shadow-sm"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="space-y-4 pr-12">
              <span className="inline-block px-4 py-1.5 bg-primary/10 rounded-full text-xs font-bold text-primary border border-primary/20 uppercase tracking-widest shadow-[inset_0_0_10px_rgba(139,92,246,0.1)]">
                {certificate.category}
              </span>
              
              <div>
                <h2 className="font-sans text-2xl md:text-4xl font-extrabold text-on-surface leading-tight">
                  {certificate.title}
                </h2>
                <div className="flex flex-wrap items-center gap-3 mt-3 font-sans text-sm text-on-surface-variant">
                  <span className="font-bold text-primary flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" /> {certificate.issuer}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-outline-variant/50" />
                  <span>Issued: {certificate.date}</span>
                  {certificate.credentialId !== "N/A" && (
                    <>
                      <span className="w-1 h-1 rounded-full bg-outline-variant/50" />
                      <span className="font-mono text-xs opacity-80">ID: {certificate.credentialId}</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Full High-Res Image or PDF */}
            <motion.div 
              layoutId={`cert-image-${certificate.id}`}
              className="w-full rounded-2xl overflow-hidden bg-surface-container-low border border-outline-variant/20 shadow-inner p-2 md:p-6 flex items-center justify-center relative min-h-[300px] md:min-h-[500px]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
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
                  className="w-full max-h-[60vh] object-contain drop-shadow-2xl relative z-10 rounded-xl bg-white/5"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=600&auto=format&fit=crop';
                  }}
                />
              )}
            </motion.div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-2">
              <div className="md:col-span-2 space-y-4">
                <h4 className="text-sm uppercase tracking-widest font-extrabold text-primary border-b border-outline-variant/20 pb-2 inline-block">
                  About the Credential
                </h4>
                <p className="font-sans text-sm md:text-base text-on-surface-variant leading-relaxed">
                  {certificate.description}
                </p>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-sm uppercase tracking-widest font-extrabold text-primary border-b border-outline-variant/20 pb-2 inline-block">
                  Acquired Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  {certificate.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 bg-surface-container hover:bg-surface-variant rounded-lg text-xs font-semibold text-on-surface transition-colors border border-outline-variant/30"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Verification CTA */}
            {certificate.verifyUrl && (
              <div className="pt-6 border-t border-outline-variant/20 flex justify-end">
                <a
                  href={certificate.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-8 py-3 bg-primary text-on-primary hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] hover:-translate-y-0.5 rounded-full font-sans text-sm font-bold transition-all"
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
