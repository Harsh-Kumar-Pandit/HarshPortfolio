import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Award, GraduationCap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import certificatesData from '../data/certificates';
import CertificateCard from '../components/CertificateCard';
import CertificateModal from '../components/CertificateModal';

const CATEGORIES = ['All', 'Full Stack', 'Programming', 'Networking', 'Cybersecurity', 'Computer Science'];

const Certifications = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCert, setSelectedCert] = useState(null);

  // Filter logic
  const filteredCerts = useMemo(() => {
    return certificatesData.filter(cert => {
      const matchesCategory = activeCategory === 'All' || cert.category === activeCategory;
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = 
        cert.title.toLowerCase().includes(searchLower) ||
        cert.issuer.toLowerCase().includes(searchLower) ||
        cert.skills.some(skill => skill.toLowerCase().includes(searchLower));
      
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <>
      <Helmet>
        <title>Certifications | Harsh Kumar Pandit</title>
        <meta name="description" content="A curated showcase of certifications reflecting my continuous learning across programming, networking, full-stack development, and core computer science." />
      </Helmet>

      <div className="pt-24 pb-12 w-full overflow-x-hidden min-h-screen relative">
        
        {/* Abstract Glowing Background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-[120px] pointer-events-none -z-10" />

        {/* ================= HERO SECTION ================= */}
        <section className="max-w-container-max mx-auto px-gutter mb-16 md:mb-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-surface-container-high border border-outline-variant/30 shadow-[0_8px_32px_rgba(139,92,246,0.15)] mb-4">
              <Award className="w-8 h-8 text-primary" />
            </div>
            
            <h1 className="font-sans text-4xl md:text-5xl lg:text-6xl font-black text-on-surface tracking-tight leading-tight">
              Certifications <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                & Learning Journey
              </span>
            </h1>
            
            <p className="font-sans text-base md:text-lg text-on-surface-variant leading-relaxed max-w-2xl mx-auto">
              A curated showcase of credentials reflecting my commitment to continuous learning across programming, networking, full-stack development, and modern software engineering.
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 pt-6">
              {[
                { label: 'Certifications', value: '6+' },
                { label: 'Learning Domains', value: '5' },
                { label: 'Status', value: 'Always Learning' },
              ].map((stat, i) => (
                <motion.div 
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + (i * 0.1) }}
                  className="glass-card px-6 py-3 rounded-2xl border border-outline-variant/20 flex flex-col items-center min-w-[120px]"
                >
                  <span className="text-xl font-black text-primary">{stat.value}</span>
                  <span className="text-[10px] uppercase font-bold text-on-surface-variant tracking-wider mt-1">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ================= SEARCH & FILTER SECTION ================= */}
        <section className="max-w-container-max mx-auto px-gutter mb-12 relative z-10">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between glass-card p-4 rounded-3xl border border-outline-variant/20 shadow-sm sticky top-6">
            
            {/* Search Input */}
            <div className="relative w-full md:max-w-xs">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
              <input
                type="text"
                placeholder="Search credentials, skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-surface-container-high text-on-surface pl-11 pr-4 py-3 rounded-2xl border border-outline-variant/30 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-sans"
              />
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-2 w-full md:w-auto justify-start md:justify-end">
              {CATEGORIES.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 relative ${
                    activeCategory === category 
                      ? 'text-on-primary shadow-[0_4px_15px_rgba(139,92,246,0.3)]' 
                      : 'bg-surface-container text-on-surface-variant hover:bg-surface-variant hover:text-on-surface border border-outline-variant/20'
                  }`}
                >
                  {activeCategory === category && (
                    <motion.div
                      layoutId="activeCategoryCert"
                      className="absolute inset-0 bg-primary rounded-xl -z-10"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ================= CERTIFICATE GRID ================= */}
        <section className="max-w-container-max mx-auto px-gutter mb-32 min-h-[400px]">
          <AnimatePresence mode="popLayout">
            {filteredCerts.length > 0 ? (
              <motion.div 
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredCerts.map((cert) => (
                  <motion.div
                    layout
                    key={cert.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CertificateCard 
                      certificate={cert} 
                      onClick={() => setSelectedCert(cert)} 
                    />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-20 glass-card rounded-3xl border border-outline-variant/20 border-dashed"
              >
                <Award className="w-12 h-12 text-on-surface-variant/30 mb-4" />
                <h3 className="text-xl font-bold text-on-surface">No Certifications Found</h3>
                <p className="text-on-surface-variant text-sm mt-2">Try adjusting your filters or search query.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* ================= CTA SECTION ================= */}
        <section className="max-w-container-max mx-auto px-gutter py-24 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-12 md:p-16 rounded-[2.5rem] border border-outline-variant/20 shadow-[0_20px_60px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.4)] relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/5 opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
            
            <h2 className="relative z-10 font-sans text-3xl md:text-5xl font-black text-on-surface mb-6">
              Continuous Learning.<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Real-World Building.
              </span>
            </h2>
            <p className="relative z-10 font-sans text-base text-on-surface-variant max-w-lg mx-auto mb-10">
              Certifications provide the foundation, but real projects prove the capability. See how I apply these concepts in production.
            </p>
            
            <Link 
              to="/projects"
              className="relative z-10 inline-flex items-center gap-2 px-8 py-4 bg-on-surface text-surface hover:scale-105 active:scale-95 rounded-full font-sans text-sm font-bold transition-all shadow-xl hover:shadow-[0_0_30px_rgba(139,92,246,0.3)]"
            >
              View My Projects
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </section>

      </div>

      {/* Modal Overlay */}
      <CertificateModal 
        certificate={selectedCert} 
        isOpen={!!selectedCert} 
        onClose={() => setSelectedCert(null)} 
      />
    </>
  );
};

export default Certifications;
