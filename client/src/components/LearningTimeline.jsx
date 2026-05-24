import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Network, Server, Zap, BrainCircuit } from 'lucide-react';

const milestones = [
  {
    year: '2024',
    title: 'Built Programming Fundamentals',
    description: 'Mastered core programming concepts, OOP, and data structures using Python.',
    icon: Code2,
  },
  {
    year: '2024',
    title: 'Networking & Cybersecurity Basics',
    description: 'Learned OSI/TCP models, routing, and fundamental threat awareness.',
    icon: Network,
  },
  {
    year: '2025',
    title: 'Completed MERN Full Stack Development',
    description: 'Built scalable web apps with React, Node.js, Express, and MongoDB.',
    icon: Server,
  },
  {
    year: '2025',
    title: 'Built Real-Time Applications',
    description: 'Implemented low-latency WebSockets (Socket.io) for live chat and collaboration.',
    icon: Zap,
  },
  {
    year: '2025',
    title: 'Integrated AI APIs into Production',
    description: 'Used Gemini and Stream SDKs to build intelligent, AI-powered platforms.',
    icon: BrainCircuit,
  }
];

const LearningTimeline = () => {
  return (
    <div className="relative w-full max-w-4xl mx-auto py-10 px-4">
      {/* Central Glowing Line */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/50 to-transparent -translate-x-1/2" />
      
      <div className="space-y-12 md:space-y-24">
        {milestones.map((milestone, index) => {
          const isEven = index % 2 === 0;
          const Icon = milestone.icon;
          
          return (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative flex flex-col md:flex-row items-center w-full group ${isEven ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Timeline Node */}
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full glass-card border border-primary/30 flex items-center justify-center z-10 shadow-[0_0_15px_rgba(139,92,246,0.3)] group-hover:scale-110 group-hover:border-primary transition-all duration-300">
                <Icon className="w-4 h-4 text-primary" />
              </div>

              {/* Content Card */}
              <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? 'md:pr-16 text-left md:text-right' : 'md:pl-16 text-left'}`}>
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="glass-card p-6 rounded-2xl border border-outline-variant/15 hover:border-primary/30 transition-colors shadow-sm hover:shadow-[0_10px_30px_rgba(139,92,246,0.1)] relative overflow-hidden"
                >
                  {/* Subtle Background Glow */}
                  <div className={`absolute top-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -z-10 ${isEven ? 'right-0' : 'left-0'}`} />
                  
                  <span className="inline-block px-3 py-1 mb-3 bg-surface-container rounded-full text-xs font-black text-primary tracking-widest border border-outline-variant/30">
                    {milestone.year}
                  </span>
                  <h3 className="font-sans text-lg md:text-xl font-bold text-on-surface mb-2">
                    {milestone.title}
                  </h3>
                  <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                    {milestone.description}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default LearningTimeline;
