import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, FolderOpen, Database, Layers, Sparkles } from 'lucide-react';
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
        <title>Projects | Harsh Kumar Pandit Showcase</title>
        <meta name="description" content="Explore selected developer projects built by Harsh Kumar Pandit. Dynamic, interactive web apps, real-time messaging, and AI dashboards." />
      </Helmet>

      <div className="pt-24 md:pt-12 space-y-12 pb-24">
        {/* ================= HERO SECTION ================= */}
        <section className="max-w-container-max mx-auto px-gutter py-12 grid grid-cols-1 md:grid-cols-2 items-center gap-12 overflow-hidden">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/5 dark:bg-white/5 border border-slate-900/10 dark:border-white/10 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981] animate-pulse"></span>
              <span className="text-xs font-semibold text-slate-800 dark:text-white/80 tracking-wide">Project Showcase</span>
            </div>
            
            <h1 className="font-sans text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white max-w-[15ch] leading-tight tracking-tighter">
              Building Full-Stack Products <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-sky-500 bg-clip-text text-transparent dark:from-indigo-400 dark:via-purple-400 dark:to-sky-400 font-serif italic font-light">That Solve Real Problems</span>
            </h1>
            
            <p className="font-sans text-base text-slate-700 dark:text-white/80 max-w-[500px] leading-relaxed font-light">
              A showcase of full-stack applications focused on scalable architecture, real-time communication, and AI-powered features through modern API integrations.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <a 
                href="#all-projects" 
                className="bg-slate-900 hover:bg-slate-950 text-white dark:bg-white dark:hover:bg-white/90 dark:text-black font-semibold text-sm px-6 py-3.5 rounded-xl transition-all duration-300 shadow-md hover:shadow-[0_8px_30px_rgba(15,23,42,0.12)] dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.12)]"
              >
                Explore Projects
              </a>
              <a 
                href="https://github.com/Harsh-Kumar-Pandit" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/40 hover:bg-white/90 border border-slate-200 dark:bg-white/5 dark:hover:bg-white/10 dark:border-white/10 text-slate-900 dark:text-white font-semibold text-sm px-6 py-3.5 rounded-xl transition-all duration-300 hover:shadow-sm"
              >
                View GitHub
              </a>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 pt-8 border-t border-slate-200 dark:border-white/10">
              <div>
                <div className="font-sans text-2xl font-extrabold text-slate-900 dark:text-white">10+</div>
                <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500 dark:text-white/40 mt-1">Projects Built</div>
              </div>
              <div>
                <div className="font-sans text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5"><Sparkles className="w-4 h-4 opacity-50"/> AI</div>
                <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500 dark:text-white/40 mt-1">Powered Features</div>
              </div>
              <div>
                <div className="font-sans text-2xl font-extrabold text-slate-900 dark:text-white">MERN</div>
                <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500 dark:text-white/40 mt-1">Stack Focus</div>
              </div>
              <div>
                <div className="font-sans text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5"><Database className="w-4 h-4 opacity-50"/> Live</div>
                <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500 dark:text-white/40 mt-1">Real-Time Systems</div>
              </div>
            </div>
          </div>

          {/* Animated 3D Floating Layers */}
          <div className="relative h-[400px] hidden md:flex justify-center items-center">
            {/* Background floating card */}
            <motion.div 
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="absolute w-[240px] h-[320px] glass-card rounded-3xl -rotate-6 -translate-x-24 z-10 p-5 flex flex-col justify-between"
            >
              <div className="w-full aspect-video rounded-xl overflow-hidden bg-slate-950/10 dark:bg-black/40 border border-slate-200 dark:border-white/5">
                <img 
                  alt="Dashboard mockup preview" 
                  className="w-full h-full object-cover opacity-25 dark:opacity-30" 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=300"
                />
              </div>
              <div className="space-y-2">
                <div className="h-3 w-2/3 bg-slate-900/10 dark:bg-white/10 rounded-full"></div>
                <div className="h-2 w-1/2 bg-slate-900/5 dark:bg-white/5 rounded-full"></div>
              </div>
            </motion.div>

            {/* Foreground floating card */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.5 }}
              className="absolute w-[260px] h-[340px] glass-card rounded-3xl rotate-3 translate-x-12 -translate-y-6 z-20 p-5 flex flex-col justify-between"
            >
              <div className="w-full aspect-video rounded-xl overflow-hidden bg-slate-950/20 dark:bg-black border border-slate-200 dark:border-white/10">
                <img 
                  alt="Mobile mockup preview" 
                  className="w-full h-full object-cover opacity-40 dark:opacity-45" 
                  src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=300"
                />
              </div>
              <div className="space-y-2">
                <div className="h-3 w-3/4 bg-slate-900/20 dark:bg-white/20 rounded-full"></div>
                <div className="h-2 w-1/3 bg-slate-900/10 dark:bg-white/10 rounded-full"></div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ================= FILTER BAR ================= */}
        <div id="all-projects" className="sticky top-6 z-30 px-4 md:px-gutter py-3 md:py-4 bg-[#f8f9fb]/60 dark:bg-white/[0.02] backdrop-blur-xl border border-slate-200 dark:border-white/5 rounded-[2rem] max-w-container-max mx-auto shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            
            {/* Category tabs */}
            <div className="flex p-1 bg-slate-900/5 dark:bg-white/5 rounded-full border border-slate-200 dark:border-white/5 overflow-x-auto no-scrollbar max-w-full">
              {categories.map(cat => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-5 py-2 rounded-full text-xs font-semibold transition-all duration-300 relative whitespace-nowrap ${
                      isActive 
                        ? 'text-slate-900 dark:text-black font-semibold' 
                        : 'text-slate-500/60 dark:text-white/40 hover:text-slate-900 dark:hover:text-white/80'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeCategoryProjects"
                        className="absolute inset-0 bg-white dark:bg-white rounded-full -z-10 shadow-sm"
                        transition={{ type: "spring", stiffness: 380, damping: 28 }}
                      />
                    )}
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-[280px]">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-white/30 w-4 h-4" />
              <input
                type="text"
                placeholder="Search tech stack..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-premium w-full pl-10 pr-4 py-2.5 rounded-full font-sans text-xs focus:ring-0 placeholder-slate-400 dark:placeholder-white/20 focus:outline-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* ================= GRID ================= */}
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
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
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
                <FolderOpen className="w-12 h-12 text-slate-300 dark:text-white/20 mx-auto" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">No Projects Found</h3>
                <p className="text-slate-500 dark:text-white/40 text-xs max-w-sm mx-auto font-light">
                  Try adjusting your filter category or entering a different search term.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* ================= FUTURE RELEASES ================= */}
        <section className="max-w-container-max mx-auto px-gutter py-12">
          <div className="text-center mb-8">
            <h2 className="font-sans text-xl font-extrabold text-slate-900 dark:text-white">More Projects Coming Soon</h2>
            <p className="text-slate-500 dark:text-white/40 text-xs mt-1">Active development on some groundbreaking concepts.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900/5 border border-dashed border-slate-200 dark:bg-white/[0.01] dark:border-white/10 rounded-[2rem] h-40 flex flex-col items-center justify-center gap-2 group hover:border-slate-400 dark:hover:border-white/25 transition-all duration-300">
              <Sparkles className="w-6 h-6 text-slate-400 dark:text-white/40 animate-pulse" />
              <p className="font-sans text-xs font-semibold text-slate-500 dark:text-white/40">Upcoming Project</p>
            </div>
            <div className="bg-slate-900/5 border border-dashed border-slate-200 dark:bg-white/[0.01] dark:border-white/10 rounded-[2rem] h-40 flex flex-col items-center justify-center gap-2 group hover:border-slate-400 dark:hover:border-white/25 transition-all duration-300">
              <Layers className="w-6 h-6 text-slate-400 dark:text-white/40 animate-pulse" />
              <p className="font-sans text-xs font-semibold text-slate-500 dark:text-white/40">In Development</p>
            </div>
            <div className="bg-slate-900/5 border border-dashed border-slate-200 dark:bg-white/[0.01] dark:border-white/10 rounded-[2rem] h-40 flex flex-col items-center justify-center gap-2 group hover:border-slate-400 dark:hover:border-white/25 transition-all duration-300">
              <Database className="w-6 h-6 text-slate-400 dark:text-white/40 animate-pulse" />
              <p className="font-sans text-xs font-semibold text-slate-500 dark:text-white/40">Future Release</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Projects;
