import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Terminal, 
  Settings, 
  Workflow, 
  Bolt, 
  Layers, 
  Search, 
  Compass, 
  FileDown
} from 'lucide-react';
import skillsData from '../data/skills';
import timelineData from '../data/timeline';
import DeveloperWorkspace from '../components/DeveloperWorkspace';
import RevealSection from '../components/RevealSection';

const About = () => {
  const steps = [
    { num: 1, title: 'Research', desc: 'Understanding requirements, exploring technologies, analyzing user needs.' },
    { num: 2, title: 'Architecture', desc: 'Designing database schemas, routing paths, state trees, and API specs.' },
    { num: 3, title: 'Development', desc: 'Writing clean modular components and testable backend endpoints.' },
    { num: 4, title: 'Integration', desc: 'Connecting APIs, payment gateways, AI interfaces, and sockets.' },
    { num: 5, title: 'Optimization', desc: 'Code splitting, asset minification, caching mechanisms, database tuning.' },
    { num: 6, title: 'Deployment', desc: 'Setting up continuous integration pipelines and cloud server hosting.' }
  ];

  return (
    <>
      <Helmet>
        <title>About Me | Harsh Kumar Pandit Profile</title>
        <meta name="description" content="Discover Harsh Kumar Pandit's development philosophy, specialized technical capabilities, B.Tech CSE background, and personal story." />
      </Helmet>

      <div className="pt-24 md:pt-12 space-y-24 pb-24">
        {/* ================= HERO SECTION ================= */}
        <RevealSection className="max-w-container-max mx-auto px-gutter py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/5 dark:bg-white/5 border border-slate-900/10 dark:border-white/10 backdrop-blur-md">
                <span className="text-xs font-semibold text-slate-800 dark:text-white/80 tracking-wide">About Me</span>
              </div>
              
              <h1 className="font-sans text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight tracking-tighter">
                Engineering <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-sky-500 bg-clip-text text-transparent dark:from-indigo-400 dark:via-purple-400 dark:to-sky-400 font-serif italic font-light">Digital Products</span> With Purpose
              </h1>
              
              <p className="font-sans text-base text-slate-700 dark:text-white/80 max-w-xl leading-relaxed font-light">
                Passionate full-stack engineer dedicated to crafting high-performance real-time web applications. I bridge the gap between complex system architecture and seamless user experiences.
              </p>
              
              {/* Stat block */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-200 dark:border-white/10">
                <div className="space-y-1">
                  <div className="text-slate-900 dark:text-white font-extrabold text-2xl">3+</div>
                  <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500 dark:text-white/40">Apps Shipped</div>
                </div>
                <div className="space-y-1">
                  <div className="text-slate-900 dark:text-white font-extrabold text-2xl">Real-Time</div>
                  <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500 dark:text-white/40">Systems</div>
                </div>
                <div className="space-y-1">
                  <div className="text-slate-900 dark:text-white font-extrabold text-2xl">API</div>
                  <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500 dark:text-white/40">Integrations</div>
                </div>
                <div className="space-y-1">
                  <div className="text-slate-900 dark:text-white font-extrabold text-2xl">Full Stack</div>
                  <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500 dark:text-white/40">Engineering</div>
                </div>
              </div>
            </motion.div>

            {/* Workspace Parallax Preview */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="relative justify-self-center lg:justify-self-end w-full max-w-md"
            >
              <DeveloperWorkspace />
            </motion.div>
          </div>
        </RevealSection>

        {/* ================= MY STORY ================= */}
        <section className="max-w-container-max mx-auto px-gutter">
          <div className="text-center space-y-2 mb-12">
            <h2 className="font-sans text-3xl font-extrabold text-slate-900 dark:text-white">My Story</h2>
            <p className="text-slate-500 dark:text-white/40 text-xs">From curiosity to building real products.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div 
              whileHover={{ y: -4 }}
              className="glass-card p-8 rounded-[2rem] space-y-4"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-900/5 dark:bg-white/5 border border-slate-900/10 dark:border-white/10 flex items-center justify-center text-slate-700 dark:text-white/70">
                <Terminal className="w-5 h-5" />
              </div>
              <p className="font-sans text-sm text-slate-700 dark:text-white/80 leading-relaxed font-light">
                My journey started with a simple curiosity about how websites and apps actually work behind the scenes. That curiosity turned into a passion for building full-stack applications, solving real problems, and continuously improving as a developer.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -4 }}
              className="glass-card p-8 rounded-[2rem] space-y-4"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-900/5 dark:bg-white/5 border border-slate-900/10 dark:border-white/10 flex items-center justify-center text-slate-700 dark:text-white/70">
                <Settings className="w-5 h-5" />
              </div>
              <p className="font-sans text-sm text-slate-700 dark:text-white/80 leading-relaxed font-light">
                Today, I focus on creating scalable web applications with clean backend architecture, intuitive user experiences, and real-time functionality. Every project I build is a step toward becoming a stronger software engineer.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ================= TECHNICAL EXPERTISE ================= */}
        <section className="max-w-container-max mx-auto px-gutter">
          <div className="text-center space-y-2 mb-12">
            <h2 className="font-sans text-3xl font-extrabold text-slate-900 dark:text-white">Technical Expertise</h2>
            <p className="text-slate-500 dark:text-white/40 text-xs">Languages and tools I use to bring ideas to life</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillsData.map((category) => (
              <div key={category.category} className="glass-card p-6 rounded-[2rem]">
                <h3 className="font-sans text-xs font-bold text-slate-500 dark:text-white/40 mb-4 uppercase tracking-wider">
                  {category.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((skill) => (
                    <span
                      key={skill.name}
                      className="flex items-center gap-2 px-3 py-1.5 bg-slate-900/5 dark:bg-white/5 rounded-full text-xs font-medium text-slate-800 dark:text-white/80 border border-slate-900/10 dark:border-white/5 hover:border-slate-400 dark:hover:border-white/20 transition-all duration-300"
                    >
                      <img 
                        src={skill.icon.startsWith('http') ? skill.icon : `https://cdn.simpleicons.org/${skill.icon}`} 
                        alt={skill.name} 
                        className="w-3.5 h-3.5 object-contain opacity-70"
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= SPECIALIZATIONS ================= */}
        <section className="max-w-container-max mx-auto px-gutter">
          <h2 className="font-sans text-3xl font-extrabold text-center text-slate-900 dark:text-white mb-12">Specializations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card p-8 rounded-[2rem]">
              <Bolt className="w-7 h-7 text-slate-700 dark:text-white mb-4 opacity-70" />
              <h4 className="font-sans text-base font-bold text-slate-900 dark:text-white mb-2">Real-Time Web Apps</h4>
              <p className="font-sans text-xs sm:text-sm text-slate-600 dark:text-white/60 leading-relaxed font-light">
                Low-latency communication systems built with WebSockets, events-driven architectures, and instant feed syncs.
              </p>
            </div>
            <div className="glass-card p-8 rounded-[2rem]">
              <Layers className="w-7 h-7 text-slate-700 dark:text-white mb-4 opacity-70" />
              <h4 className="font-sans text-base font-bold text-slate-900 dark:text-white mb-2">Full Stack Engineering</h4>
              <p className="font-sans text-xs sm:text-sm text-slate-600 dark:text-white/60 leading-relaxed font-light">
                End-to-end development from conceptual sketches to database normalization and production cloud deployments.
              </p>
            </div>
            <div className="glass-card p-8 rounded-[2rem]">
              <Workflow className="w-7 h-7 text-slate-700 dark:text-white mb-4 opacity-70" />
              <h4 className="font-sans text-base font-bold text-slate-900 dark:text-white mb-2">Modern Frontend Architecture</h4>
              <p className="font-sans text-xs sm:text-sm text-slate-600 dark:text-white/60 leading-relaxed font-light">
                Building highly responsive, state-driven user interfaces using React, Redux Toolkit, and Tailwind CSS for seamless interactive experiences.
              </p>
            </div>
          </div>
        </section>

        {/* ================= PROCESS ================= */}
        <section className="max-w-container-max mx-auto px-gutter" id="process">
          <div className="text-center space-y-2 mb-12">
            <h2 className="font-sans text-3xl font-extrabold text-slate-900 dark:text-white">Development Philosophy</h2>
            <p className="text-slate-500 dark:text-white/40 text-xs">My systematic approach to software engineering and product shipping</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((step) => (
              <div 
                key={step.num} 
                className="glass-card p-6 rounded-[2rem] space-y-3 relative overflow-hidden group"
              >
                <div className="w-8 h-8 rounded-full bg-slate-900/5 dark:bg-white/5 flex items-center justify-center font-mono text-xs font-bold text-slate-700 dark:text-white/80 border border-slate-900/10 dark:border-white/10">
                  {step.num}
                </div>
                <h4 className="font-sans text-sm font-bold text-slate-900 dark:text-white">{step.title}</h4>
                <p className="font-sans text-xs text-slate-600 dark:text-white/60 leading-relaxed font-light">{step.desc}</p>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-slate-900/20 to-transparent dark:from-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= EXPERIENCE TIMELINE ================= */}
        <section className="max-w-container-max mx-auto px-gutter">
          <h2 className="font-sans text-3xl font-extrabold text-slate-900 dark:text-white mb-12">Experience</h2>
          
          <div className="relative pl-6 border-l border-slate-200 dark:border-white/10 space-y-12 max-w-3xl">
            {timelineData.map((event) => (
              <div key={event.id} className="relative">
                {/* Node Orb */}
                <div className="absolute -left-[31px] top-1.5 w-2.5 h-2.5 rounded-full bg-slate-900 dark:bg-white shadow-[0_0_8px_rgba(15,23,42,0.15)] dark:shadow-[0_0_8px_rgba(255,255,255,0.4)]"></div>
                
                <span className="font-mono text-xs font-bold text-slate-500 dark:text-white/40 mb-1 block">{event.year}</span>
                <h3 className="font-sans text-base font-extrabold text-slate-900 dark:text-white">{event.title}</h3>
                <p className="text-xs text-slate-500 dark:text-white/40 font-bold uppercase tracking-wider mb-2">{event.company}</p>
                <p className="font-sans text-xs text-slate-600 dark:text-white/60 leading-relaxed max-w-2xl font-light">
                  {event.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ================= BEYOND CODE ================= */}
        <section className="max-w-container-max mx-auto px-gutter">
          <div className="text-center space-y-2 mb-12">
            <h2 className="font-sans text-3xl font-extrabold text-slate-900 dark:text-white">Beyond Code</h2>
            <p className="text-slate-500 dark:text-white/40 text-xs">Interests and traits that define my engineering mindset</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card p-6 rounded-[2rem] flex items-start gap-4">
              <span className="w-10 h-10 rounded-xl bg-slate-900/5 dark:bg-white/5 border border-slate-900/10 dark:border-white/10 flex items-center justify-center text-slate-700 dark:text-white/70 flex-shrink-0">
                <Search className="w-5 h-5" />
              </span>
              <div>
                <h4 className="font-sans text-sm font-bold text-slate-900 dark:text-white mb-1">Problem Solving</h4>
                <p className="font-sans text-xs text-slate-600 dark:text-white/60 leading-relaxed font-light">
                  Passionate about algorithmic challenges and system optimization strategies that enhance user productivity.
                </p>
              </div>
            </div>

            <div className="glass-card p-6 rounded-[2rem] flex items-start gap-4">
              <span className="w-10 h-10 rounded-xl bg-slate-900/5 dark:bg-white/5 border border-slate-900/10 dark:border-white/10 flex items-center justify-center text-slate-700 dark:text-white/70 flex-shrink-0">
                <Compass className="w-5 h-5" />
              </span>
              <div>
                <h4 className="font-sans text-sm font-bold text-slate-900 dark:text-white mb-1">Tech Exploration</h4>
                <p className="font-sans text-xs text-slate-600 dark:text-white/60 leading-relaxed font-light">
                  Constantly exploring emerging frameworks, AI integration modelings, and the evolving landscape of web tools.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= CTA BANNER ================= */}
        <section className="max-w-container-max mx-auto px-gutter">
          <div className="glass-card p-10 sm:p-12 text-center space-y-6 relative overflow-hidden">
            
            <h2 className="relative z-10 font-sans text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tighter">
              Let's Build Something <span className="text-slate-400 dark:text-white/40 italic font-light">Meaningful</span>
            </h2>
            <p className="text-slate-600 dark:text-white/60 text-xs sm:text-sm max-w-lg mx-auto font-light leading-relaxed">
              I am open to discussions about internships, project collaborations, and full-stack building roles. Let's create impact.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2 relative z-10">
              <Link
                to="/contact"
                className="px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-black dark:hover:bg-white/90 rounded-xl font-sans text-xs font-semibold transition-all shadow-sm"
              >
                Contact Me
              </Link>
              <a 
                href="/assets/HarshPandit.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 bg-slate-900/5 hover:bg-slate-900/10 border border-slate-900/10 text-slate-900 dark:bg-white/5 dark:border-white/10 dark:text-white dark:hover:bg-white/10 rounded-xl font-sans text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
              >
                <FileDown className="w-4 h-4" /> Download CV
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
