import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, FolderOpen, ArrowRight, ShieldCheck, Database, Layers, Sparkles } from 'lucide-react';
import projectsData from '../data/projects';
import ProjectCard from '../components/ProjectCard';

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Frontend', 'Backend', 'Full Stack'];

  // Filter projects based on category and search query
  const filteredProjects = useMemo(() => {
    return projectsData.filter(project => {
      const matchesCategory = selectedCategory === 'All' || 
        project.category.toLowerCase() === selectedCategory.toLowerCase();
      
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        project.title.toLowerCase().includes(query) || 
        project.description.toLowerCase().includes(query) ||
        project.techStack.some(tech => tech.toLowerCase().includes(query));
      
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <>
      <Helmet>
        <title>Portfolio | Harsh Kumar Pandit Projects</title>
        <meta name="description" content="Explore selected developer projects built by Harsh Kumar Pandit. Dynamic, interactive web apps, real-time messaging, and AI dashboards." />
      </Helmet>

      {/* Background is now handled by GlobalSpaceBackground in App.jsx */}

      <div className="pt-8 md:pt-12 space-y-12">
        {/* ================= HERO SECTION ================= */}
        <section className="max-w-container-max mx-auto px-gutter py-12 grid grid-cols-1 md:grid-cols-2 items-center gap-12 overflow-hidden">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-xs uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              Project Showcase
            </div>
            
            <h1 className="font-sans text-4xl sm:text-5xl font-extrabold text-on-surface max-w-[15ch] leading-tight">
              Building Full-Stack Products <span className="text-gradient">That Solve Real Problems</span>
            </h1>
            
            <p className="font-sans text-base sm:text-lg text-on-surface-variant max-w-[500px] leading-relaxed">
              A showcase of full-stack applications focused on scalable architecture, real-time communication, and AI-powered features through modern API integrations.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <a 
                href="#all-projects" 
                className="bg-primary text-on-primary font-bold text-sm px-6 py-3 rounded-xl hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all transform active:scale-95"
              >
                Explore Projects
              </a>
              <a 
                href="https://github.com/Harsh-Kumar-Pandit" 
                target="_blank" 
                rel="noopener noreferrer"
                className="glass-card text-on-surface border border-outline-variant/30 hover:bg-white/5 font-bold text-sm px-6 py-3 rounded-xl transition-all transform active:scale-95"
              >
                View GitHub
              </a>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 pt-8 border-t border-outline-variant/10">
              <div>
                <div className="font-sans text-2xl sm:text-3xl font-extrabold text-primary whitespace-nowrap">10+</div>
                <div className="text-[10px] sm:text-xs uppercase font-bold tracking-wider text-on-surface-variant mt-1">Projects Built</div>
              </div>
              <div>
                <div className="font-sans text-2xl sm:text-3xl font-extrabold text-primary flex items-center gap-1.5 whitespace-nowrap"><Sparkles className="w-5 h-5 sm:w-6 sm:h-6"/> AI</div>
                <div className="text-[10px] sm:text-xs uppercase font-bold tracking-wider text-on-surface-variant mt-1">Powered Features</div>
              </div>
              <div>
                <div className="font-sans text-2xl sm:text-3xl font-extrabold text-primary whitespace-nowrap">MERN</div>
                <div className="text-[10px] sm:text-xs uppercase font-bold tracking-wider text-on-surface-variant mt-1">Stack Focus</div>
              </div>
              <div>
                <div className="font-sans text-2xl sm:text-3xl font-extrabold text-primary flex items-center gap-1.5 whitespace-nowrap"><Database className="w-5 h-5 sm:w-6 sm:h-6"/> Live</div>
                <div className="text-[10px] sm:text-xs uppercase font-bold tracking-wider text-on-surface-variant mt-1">Real-Time Systems</div>
              </div>
            </div>
          </div>

          {/* Animated 3D Floating Layers (Stitch Parallax Design) */}
          <div className="relative h-[400px] hidden md:flex justify-center items-center">
            {/* Background floating card */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="absolute w-[240px] h-[320px] glass-card rounded-2xl shadow-2xl border-outline-variant/10 -rotate-6 -translate-x-24 z-10 p-5 flex flex-col justify-between"
            >
              <div className="w-full aspect-video rounded-lg overflow-hidden bg-surface-container-high border border-outline-variant/20">
                <img 
                  alt="Futuristic dashboard mockup" 
                  className="w-full h-full object-cover opacity-60" 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=300"
                />
              </div>
              <div className="space-y-2">
                <div className="h-3 w-2/3 bg-white/10 rounded"></div>
                <div className="h-2 w-1/2 bg-white/5 rounded"></div>
              </div>
            </motion.div>

            {/* Foreground floating card */}
            <motion.div 
              animate={{ y: [0, -12, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.5 }}
              className="absolute w-[260px] h-[340px] bg-primary/10 backdrop-blur-2xl border border-primary/20 rounded-2xl shadow-2xl rotate-3 translate-x-12 -translate-y-6 z-20 p-5 flex flex-col justify-between"
            >
              <div className="w-full aspect-video rounded-lg overflow-hidden bg-surface-container-highest border border-primary/20">
                <img 
                  alt="Mobile mockup" 
                  className="w-full h-full object-cover" 
                  src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=300"
                />
              </div>
              <div className="space-y-2">
                <div className="h-3.5 w-3/4 bg-primary/20 rounded"></div>
                <div className="h-2 w-1/3 bg-primary/10 rounded"></div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ================= STICKY FILTER BAR ================= */}
        <div id="all-projects" className="sticky top-6 z-30 px-gutter py-4 bg-background/80 backdrop-blur-md border-b border-outline-variant/10">
          <div className="max-w-container-max mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
            
            {/* Category selection pill tabs */}
            <div className="flex p-1 bg-surface-container rounded-full border border-outline-variant/20 overflow-x-auto max-w-full">
              {categories.map(cat => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 ${
                      isActive 
                        ? 'bg-primary text-on-primary shadow-md' 
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Search Input bar */}
            <div className="relative w-full sm:w-[280px]">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant w-4 h-4" />
              <input
                type="text"
                placeholder="Search tech stack..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-black/10 border border-outline-variant/20 focus:border-primary focus:ring-0 rounded-full font-sans text-xs text-on-surface placeholder:text-on-surface-variant/40 outline-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* ================= DYNAMIC GRID ================= */}
        <section className="max-w-container-max mx-auto px-gutter py-12">
          <AnimatePresence mode="popLayout">
            {filteredProjects.length > 0 ? (
              <motion.div 
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredProjects.map((project) => (
                  <motion.div
                    layout
                    key={project.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ProjectCard project={project} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 space-y-4"
              >
                <FolderOpen className="w-16 h-16 text-on-surface-variant/40 mx-auto" />
                <h3 className="text-xl font-bold text-on-surface">No Projects Found</h3>
                <p className="text-on-surface-variant text-sm max-w-sm mx-auto">
                  Try adjusting your filter category or entering a different search queries.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* ================= FUTURE RELEASES ================= */}
        <section className="max-w-container-max mx-auto px-gutter py-12">
          <div className="text-center mb-8">
            <h2 className="font-sans text-2xl font-extrabold text-on-surface">More Projects Coming Soon</h2>
            <p className="text-on-surface-variant text-xs mt-1">Active development on some groundbreaking concepts.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card border-dashed border-outline-variant/35 rounded-2xl h-44 flex flex-col items-center justify-center gap-2 group hover:border-primary/50 transition-all duration-300 cursor-help">
              <Sparkles className="w-8 h-8 text-primary animate-pulse" />
              <p className="font-sans text-xs font-bold text-on-surface-variant group-hover:text-primary">Upcoming Project</p>
            </div>
            <div className="glass-card border-dashed border-outline-variant/35 rounded-2xl h-44 flex flex-col items-center justify-center gap-2 group hover:border-primary/50 transition-all duration-300 cursor-help">
              <Layers className="w-8 h-8 text-primary animate-pulse" />
              <p className="font-sans text-xs font-bold text-on-surface-variant group-hover:text-primary">In Development</p>
            </div>
            <div className="glass-card border-dashed border-outline-variant/35 rounded-2xl h-44 flex flex-col items-center justify-center gap-2 group hover:border-primary/50 transition-all duration-300 cursor-help">
              <Database className="w-8 h-8 text-primary animate-pulse" />
              <p className="font-sans text-xs font-bold text-on-surface-variant group-hover:text-primary">Future Release</p>
            </div>
          </div>
        </section>

      </div>
    </>
  );
};

export default Projects;
