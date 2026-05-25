import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X, ChevronRight } from 'lucide-react';
import { Github } from './BrandIcons';
import MagneticButton from './MagneticButton';

const ProjectCard = ({ project }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.div
        layoutId={`card-container-${project.id}`}
        whileHover={{ y: -8, scale: 1.01 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        onClick={() => setIsModalOpen(true)}
        className="group relative flex flex-col h-full rounded-[2rem] glass-card overflow-hidden cursor-pointer"
      >
        {/* Hover shine */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/5 to-transparent dark:from-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Thumbnail Showcase */}
        <div className="relative aspect-video overflow-hidden bg-slate-950/5 dark:bg-black/40 border-b border-slate-900/5 dark:border-b-white/5">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop';
            }}
          />
          {/* Subtle bottom gradient cover */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent dark:from-[#08080c]/60 opacity-80 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none" />
          
          <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 dark:bg-black/75 backdrop-blur-md rounded-full text-[10px] font-bold text-slate-800 dark:text-white/90 border border-slate-200 dark:border-white/10 uppercase tracking-widest">
            {project.category}
          </span>
        </div>

        {/* Card Content */}
        <div className="p-6 flex flex-col flex-grow space-y-4">
          <h3 className="font-sans text-lg font-extrabold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-purple-400 transition-colors duration-200 line-clamp-1">
            {project.title.split('—')[0].trim()}
          </h3>
          
          <p className="font-sans text-xs sm:text-sm text-slate-700 dark:text-white/80 leading-relaxed line-clamp-3 font-light">
            {project.description}
          </p>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            {project.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 bg-slate-900/5 dark:bg-white/10 rounded-full text-[10px] font-bold text-slate-800 dark:text-white/90 border border-slate-200 dark:border-white/10"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="px-2 py-1 bg-slate-900/5 dark:bg-white/10 rounded-full text-[9px] font-extrabold text-slate-500 dark:text-white/50 border border-slate-200 dark:border-white/10">
                +{project.techStack.length - 4}
              </span>
            )}
          </div>
          
          <div className="flex justify-end items-center text-indigo-600 dark:text-purple-400 font-bold text-xs pt-4 mt-auto group-hover:translate-x-1 transition-transform duration-300">
            Details <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
          </div>
        </div>
      </motion.div>

      {/* Details Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 dark:bg-black/80 backdrop-blur-md"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              transition={{ type: 'spring', duration: 0.4 }}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] bg-white/95 dark:bg-[#0c0c0c]/90 border border-slate-200 dark:border-white/10 p-6 md:p-8 space-y-6 shadow-2xl backdrop-blur-2xl text-slate-900 dark:text-white"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/5 hover:bg-slate-900/10 dark:bg-white/5 dark:hover:bg-white/10 text-slate-600 dark:text-white/60 hover:text-slate-900 dark:hover:text-white border border-slate-900/10 dark:border-white/10 transition-all"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-4">
                <span className="inline-block px-3 py-1 bg-slate-900/5 dark:bg-white/5 rounded-full text-[10px] font-semibold text-slate-800 dark:text-white/80 border border-slate-900/10 dark:border-white/10 uppercase tracking-widest">
                  {project.category}
                </span>
                
                <h2 className="font-sans text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
                  {project.title}
                </h2>
              </div>

              {/* Showcased View */}
              <div className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-200 dark:border-white/15 shadow-md">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop';
                  }}
                />
              </div>

              {/* Specs and details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                <div className="md:col-span-2 space-y-4">
                  <h4 className="text-xs uppercase tracking-wider font-bold text-slate-400 dark:text-white/40">Overview</h4>
                  <p className="font-sans text-sm text-slate-600 dark:text-white/70 leading-relaxed font-light">
                    {project.details || project.description}
                  </p>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-xs uppercase tracking-wider font-bold text-slate-400 dark:text-white/40">Technologies</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 bg-slate-900/5 dark:bg-white/5 rounded-full text-xs font-semibold text-slate-800 dark:text-white/80 border border-slate-900/10 dark:border-white/5"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-6 border-t border-slate-200 dark:border-white/10 justify-end">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 border border-slate-900/10 dark:border-white/10 text-slate-800 dark:text-white/80 hover:text-slate-900 hover:bg-slate-950/5 dark:hover:text-white dark:hover:bg-white/5 rounded-full font-sans text-xs font-semibold transition-all"
                >
                  <Github className="w-4 h-4" />
                  GitHub Source
                </a>
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-black dark:hover:bg-white/90 rounded-full font-sans text-xs font-semibold transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Preview
                </a>
                {project.adminDemo && (
                  <a
                    href={project.adminDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 bg-slate-900/5 hover:bg-slate-900/10 border border-slate-900/10 text-slate-800 dark:bg-white/10 dark:border-white/15 dark:text-white dark:hover:bg-white/20 rounded-full font-sans text-xs font-semibold transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Admin Dashboard
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectCard;
