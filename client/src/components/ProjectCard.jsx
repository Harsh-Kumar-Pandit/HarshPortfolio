import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X, ChevronRight } from 'lucide-react';
import { Github } from './BrandIcons';

const ProjectCard = ({ project }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.div
        layoutId={`card-container-${project.id}`}
        whileHover={{ y: -10, scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        onClick={() => setIsModalOpen(true)}
        className="glass-card relative rounded-2xl overflow-hidden cursor-pointer group flex flex-col h-full border border-outline-variant/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] hover:border-primary/50 hover:shadow-[0_30px_60px_-15px_rgba(139,92,246,0.25)] transition-all duration-500"
      >
        {/* Layered premium lighting effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/0 via-primary/0 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
        {/* Project Thumbnail Image */}
        <div className="relative aspect-video overflow-hidden bg-surface-container-low border-b border-outline-variant/10">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-110"
            onError={(e) => {
              // Placeholder in case of loading error
              e.target.src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-40"></div>
          
          {/* Category Tag */}
          <span className="absolute top-4 left-4 px-3 py-1 bg-background/80 backdrop-blur-md rounded-full text-xs font-bold text-primary border border-primary/20 uppercase tracking-widest">
            {project.category}
          </span>
        </div>

        {/* Card Content */}
        <div className="p-6 flex flex-col flex-grow space-y-4">
          <h3 className="font-sans text-xl font-bold text-on-surface group-hover:text-primary transition-colors duration-200 line-clamp-1">
            {project.title.split('—')[0].trim()}
          </h3>
          
          <p className="font-sans text-sm text-on-surface-variant leading-relaxed line-clamp-3">
            {project.description}
          </p>

          {/* Tech Pills */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            {project.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-0.5 bg-surface-container rounded-full text-[11px] font-semibold text-on-surface-variant border border-outline-variant/30"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="px-2 py-0.5 bg-surface-container rounded-full text-[10px] font-bold text-primary/80">
                +{project.techStack.length - 4} more
              </span>
            )}
          </div>
          
          <div className="flex justify-end items-center text-primary font-bold text-xs pt-4 mt-auto group-hover:translate-x-1 transition-transform">
            View Project Details <ChevronRight className="w-4 h-4 ml-0.5" />
          </div>
        </div>
      </motion.div>

      {/* Interactive Modal Viewer */}
      <AnimatePresence>
        {isModalOpen && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto glass-card rounded-3xl p-6 md:p-8 space-y-6 shadow-[0_20px_50px_rgba(139,92,246,0.25)] border-primary/20"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full glass-card hover:bg-white/10 text-on-surface-variant hover:text-on-surface transition-all"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-4">
                <span className="inline-block px-3 py-1 bg-primary/10 rounded-full text-xs font-bold text-primary border border-primary/20 uppercase tracking-widest">
                  {project.category}
                </span>
                
                <h2 className="font-sans text-2xl md:text-3xl font-extrabold text-on-surface leading-tight">
                  {project.title}
                </h2>
              </div>

              {/* Full Image */}
              <div className="aspect-video w-full rounded-2xl overflow-hidden bg-surface-container-low border border-outline-variant/20 shadow-md">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop';
                  }}
                />
              </div>

              {/* Description & Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                <div className="md:col-span-2 space-y-4">
                  <h4 className="text-sm uppercase tracking-wider font-bold text-primary">Project Overview</h4>
                  <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                    {project.details || project.description}
                  </p>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-sm uppercase tracking-wider font-bold text-primary">Technologies</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 bg-surface-container rounded-full text-xs font-semibold text-on-surface-variant border border-outline-variant/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Call to Actions */}
              <div className="flex flex-wrap gap-4 pt-4 border-t border-outline-variant/20 justify-end">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 border border-outline-variant text-on-surface hover:bg-surface-variant/20 rounded-full font-sans text-sm font-bold transition-all"
                >
                  <Github className="w-4 h-4" />
                  GitHub Source
                </a>
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-2.5 bg-primary text-on-primary hover:shadow-[0_0_20px_rgba(208,188,255,0.4)] rounded-full font-sans text-sm font-bold transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Preview
                </a>
                {project.adminDemo && (
                  <a
                    href={project.adminDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-2.5 bg-secondary text-on-secondary hover:shadow-[0_0_20px_rgba(208,188,255,0.4)] rounded-full font-sans text-sm font-bold transition-all"
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
