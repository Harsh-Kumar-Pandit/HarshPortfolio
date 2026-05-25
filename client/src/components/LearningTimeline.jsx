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
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-indigo-500/10 via-purple-500/60 to-sky-500/10 -translate-x-1/2 shadow-[0_0_8px_rgba(168,85,247,0.2)]" />
      
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
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-[#fcfcfd] dark:bg-[#05050a] border-2 border-indigo-500/40 dark:border-purple-500/40 flex items-center justify-center z-10 shadow-[0_0_12px_rgba(99,102,241,0.15)] dark:shadow-[0_0_20px_rgba(168,85,247,0.3)] group-hover:scale-110 group-hover:border-indigo-500 dark:group-hover:border-purple-400 transition-all duration-300">
                <Icon className="w-4 h-4 text-indigo-600 dark:text-purple-400" />
              </div>

              {/* Content Card */}
              <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? 'md:pr-16 text-left md:text-right' : 'md:pl-16 text-left'}`}>
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="glass-card p-6 rounded-2xl transition-all shadow-sm relative overflow-hidden"
                >
                  {/* Subtle Background Glow */}
                  <div className={`absolute top-0 w-32 h-32 bg-indigo-500/5 dark:bg-purple-500/5 rounded-full blur-[40px] -z-10 transition-opacity duration-300 opacity-60 group-hover:opacity-100 ${isEven ? 'right-0' : 'left-0'}`} />
                  
                  <span className="inline-block px-3 py-1 mb-3 bg-indigo-50/80 dark:bg-purple-950/30 rounded-full text-xs font-extrabold text-indigo-600 dark:text-purple-400 tracking-wider border border-indigo-200/50 dark:border-purple-500/20">
                    {milestone.year}
                  </span>
                  <h3 className="font-sans text-lg md:text-xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight group-hover:text-indigo-600 dark:group-hover:text-purple-400 transition-colors duration-200">
                    {milestone.title}
                  </h3>
                  <p className="font-sans text-sm text-slate-700 dark:text-white/80 leading-relaxed font-light">
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
