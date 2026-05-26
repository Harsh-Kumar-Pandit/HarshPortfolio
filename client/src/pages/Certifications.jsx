import React, { useState, useMemo, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Award, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import certificatesData from '../data/certificates';
import CertificateCard from '../components/CertificateCard';
import CertificateModal from '../components/CertificateModal';

const CATEGORIES = ['All', 'Full Stack', 'Programming', 'Networking', 'Cybersecurity', 'Computer Science'];

const Certifications = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCert, setSelectedCert] = useState(null);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

      <div className="pt-24 md:pt-12 pb-12 w-full min-h-screen relative">
        
        {/* ================= HERO SECTION ================= */}
        <section className="max-w-container-max mx-auto px-gutter mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-slate-900/5 dark:bg-white/5 border border-slate-900/10 dark:border-white/10 mb-4">
              <Award className="w-6 h-6 text-slate-800 dark:text-white/80" />
            </div>
            
            <h1 className="font-sans text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tighter leading-tight">
              Certifications <br/>
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-sky-500 bg-clip-text text-transparent dark:from-indigo-400 dark:via-purple-400 dark:to-sky-400 font-serif italic font-light">
                & Learning Journey
              </span>
            </h1>
            
            <p className="font-sans text-base text-slate-700 dark:text-white/80 leading-relaxed max-w-2xl mx-auto font-light">
              A curated showcase of credentials reflecting my commitment to continuous learning across programming, networking, full-stack development, and modern software engineering.
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 pt-6">
              {[
                { label: 'Certifications', value: '6+' },
                { label: 'Learning Domains', value: '5' },
                { label: 'Status', value: 'Active learning' },
              ].map((stat, i) => (
                <motion.div 
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + (i * 0.08) }}
                  className="glass-card px-6 py-3 rounded-2xl flex flex-col items-center min-w-[120px]"
                >
                  <span className="text-lg font-bold text-slate-900 dark:text-white">{stat.value}</span>
                  <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-white/40 tracking-wider mt-1">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ================= SEARCH & FILTER SECTION ================= */}
        <section className={`max-w-container-max mx-auto px-4 md:px-gutter mb-12 transition-all duration-300 ${
          isSticky 
            ? 'sticky top-6 z-30' 
            : 'relative z-10'
        }`}>
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between bg-[#f8f9fb]/60 dark:bg-white/[0.02] backdrop-blur-xl border border-slate-200 dark:border-white/5 p-3 md:p-4 rounded-[2rem] shadow-sm">
            
            {/* Search Input */}
            <div className="relative w-full md:max-w-xs">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-white/30" />
              <input
                type="text"
                placeholder="Search credentials..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-premium w-full pl-11 pr-4 py-2.5 rounded-full font-sans text-xs focus:ring-0 placeholder-slate-400 dark:placeholder-white/20 focus:outline-none"
              />
            </div>

            {/* Category Pills */}
            <div className="flex flex-row overflow-x-auto no-scrollbar gap-1.5 w-full md:w-auto justify-start md:justify-end py-1 max-w-full">
              {CATEGORIES.map(category => {
                const isActive = activeCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 relative whitespace-nowrap ${
                      isActive 
                        ? 'text-slate-900 dark:text-black font-semibold' 
                        : 'bg-slate-900/5 dark:bg-white/5 text-slate-500/60 dark:text-white/40 hover:bg-slate-900/10 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white/80 border border-slate-200 dark:border-white/5'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeCategoryCert"
                        className="absolute inset-0 bg-white rounded-full -z-10 shadow-sm"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    {category}
                  </button>
                );
              })}
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
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
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
                className="flex flex-col items-center justify-center py-20 bg-slate-900/5 dark:bg-white/[0.01] rounded-[2rem] border border-slate-200 dark:border-white/10 border-dashed"
              >
                <Award className="w-10 h-10 text-slate-300 dark:text-white/20 mb-4" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">No Certifications Found</h3>
                <p className="text-slate-500 dark:text-white/40 text-xs mt-1 font-light">Try adjusting your filters or search query.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* ================= CTA SECTION ================= */}
        <section className="max-w-container-max mx-auto px-gutter py-24 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-12 md:p-16 rounded-[2.5rem] relative overflow-hidden"
          >
            <h2 className="relative z-10 font-sans text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tighter">
              Continuous Learning.<br/>
              <span className="text-slate-400 dark:text-white/40 italic font-light">
                Real-World Building.
              </span>
            </h2>
            <p className="relative z-10 font-sans text-sm text-slate-600 dark:text-white/60 max-w-lg mx-auto mb-10 font-light leading-relaxed">
              Certifications provide the foundation, but real projects prove the capability. See how I apply these concepts in production.
            </p>
            
            <Link 
              to="/projects"
              className="relative z-10 inline-flex items-center gap-2 px-8 py-3.5 bg-slate-900 hover:bg-slate-950 text-white dark:bg-white dark:hover:bg-white/90 dark:text-black rounded-full font-sans text-xs font-semibold transition-all duration-300 shadow-md hover:shadow-[0_8px_30px_rgba(15,23,42,0.12)] dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.12)]"
            >
              View My Projects
              <ArrowRight className="w-3.5 h-3.5" />
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
