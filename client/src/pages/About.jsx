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
  Cpu, 
  Search, 
  Compass, 
  HelpCircle,
  FileDown
} from 'lucide-react';
import skillsData from '../data/skills';
import timelineData from '../data/timeline';
import DeveloperWorkspace from '../components/DeveloperWorkspace';
import RevealSection from '../components/RevealSection';

const About = () => {
  // Steps for development philosophy
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

      {/* Background is now handled by GlobalSpaceBackground in App.jsx */}

      <div className="pt-8 md:pt-12 space-y-24">
        {/* ================= HERO SECTION ================= */}
        <RevealSection className="max-w-container-max mx-auto px-gutter py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-xs uppercase tracking-widest">
                About Me
              </span>
              <h1 className="font-sans text-4xl sm:text-5xl font-extrabold text-on-surface leading-tight tracking-tight">
                Engineering Digital Products With Purpose
              </h1>
              <p className="font-sans text-base sm:text-lg text-on-surface-variant max-w-xl leading-relaxed">
                Passionate full-stack engineer dedicated to crafting high-performance real-time web applications. I bridge the gap between complex system architecture and seamless user experiences.
              </p>
              
              {/* Stat block */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
                <div className="space-y-1">
                  <div className="text-primary font-extrabold text-2xl">3+</div>
                  <div className="text-[10px] uppercase font-bold tracking-wider text-on-surface-variant">Apps Shipped</div>
                </div>
                <div className="space-y-1">
                  <div className="text-primary font-extrabold text-2xl">Real-Time</div>
                  <div className="text-[10px] uppercase font-bold tracking-wider text-on-surface-variant">Systems</div>
                </div>
                <div className="space-y-1">
                  <div className="text-primary font-extrabold text-2xl">API</div>
                  <div className="text-[10px] uppercase font-bold tracking-wider text-on-surface-variant">Integrations</div>
                </div>
                <div className="space-y-1">
                  <div className="text-primary font-extrabold text-2xl">Full Stack</div>
                  <div className="text-[10px] uppercase font-bold tracking-wider text-on-surface-variant">Engineering</div>
                </div>
              </div>
            </motion.div>

            {/* Cinematic Developer Workspace */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
              className="relative justify-self-center lg:justify-self-end w-full max-w-md float-animation"
            >
              <DeveloperWorkspace />
            </motion.div>
          </div>
        </RevealSection>

        {/* ================= MY STORY ================= */}
        <section className="max-w-container-max mx-auto px-gutter">
          <div className="text-center space-y-2 mb-10">
            <h2 className="font-sans text-3xl font-extrabold text-on-surface">My Story</h2>
            <p className="text-on-surface-variant text-xs">From curiosity to building real products.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div 
              whileHover={{ y: -4 }}
              className="glass-card p-8 rounded-2xl space-y-4 border border-outline-variant/15"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                <Terminal className="w-6 h-6" />
              </div>
              <p className="font-sans text-sm sm:text-base text-on-surface-variant leading-relaxed">
                My journey started with a simple curiosity about how websites and apps actually work behind the scenes. That curiosity turned into a passion for building full-stack applications, solving real problems, and continuously improving as a developer.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -4 }}
              className="glass-card p-8 rounded-2xl space-y-4 border border-outline-variant/15"
            >
              <div className="w-12 h-12 rounded-xl bg-tertiary/10 flex items-center justify-center text-tertiary border border-tertiary/20">
                <Settings className="w-6 h-6" />
              </div>
              <p className="font-sans text-sm sm:text-base text-on-surface-variant leading-relaxed">
                Today, I focus on creating scalable web applications with clean backend architecture, intuitive user experiences, and real-time functionality. Every project I build is a step toward becoming a stronger software engineer.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ================= TECHNICAL EXPERTISE ================= */}
        <section className="max-w-container-max mx-auto px-gutter">
          <div className="text-center space-y-2 mb-10">
            <h2 className="font-sans text-3xl font-extrabold text-on-surface">Technical Expertise</h2>
            <p className="text-on-surface-variant text-xs">Languages and tools I use to bring ideas to life</p>
          </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {skillsData.map((category) => (
                  <div key={category.category} className="glass-card p-6 rounded-2xl border border-outline-variant/15 hover:border-primary/30 transition-all duration-300">
                    <h3 className="font-sans text-sm font-extrabold text-primary mb-4 uppercase tracking-wider">
                      {category.category}
                    </h3>
                    <div className="flex flex-wrap gap-2.5">
                      {category.items.map((skill) => (
                        <span
                          key={skill.name}
                          className="flex items-center gap-2 px-3 py-1.5 bg-surface-container rounded-full text-xs font-semibold text-on-surface border border-outline-variant/20 hover:border-primary/45 hover:bg-surface-container-high transition-all shadow-sm hover:shadow-md"
                        >
                          <img 
                            src={skill.icon.startsWith('http') ? skill.icon : `https://cdn.simpleicons.org/${skill.icon}`} 
                            alt={skill.name} 
                            className="w-4 h-4 object-contain"
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
        <section className="bg-surface-container-lowest/80 border-y border-outline-variant/10 py-16">
          <div className="max-w-container-max mx-auto px-gutter">
            <h2 className="font-sans text-3xl font-extrabold text-center text-on-surface mb-10">Specializations</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-card p-8 rounded-2xl border border-outline-variant/15 hover:border-primary/30 transition-all duration-300">
                <Bolt className="w-8 h-8 text-primary mb-4" />
                <h4 className="font-sans text-lg font-extrabold text-on-surface mb-2">Real-Time Web Apps</h4>
                <p className="font-sans text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                  Low-latency communication systems built with WebSockets, events-driven architectures, and instant feed syncs.
                </p>
              </div>
              <div className="glass-card p-8 rounded-2xl border border-outline-variant/15 hover:border-secondary/30 transition-all duration-300">
                <Layers className="w-8 h-8 text-secondary mb-4" />
                <h4 className="font-sans text-lg font-extrabold text-on-surface mb-2">Full Stack Engineering</h4>
                <p className="font-sans text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                  End-to-end development from conceptual sketches to database normalization and production cloud deployments.
                </p>
              </div>
              <div className="glass-card p-8 rounded-2xl border border-outline-variant/15 hover:border-tertiary/30 transition-all duration-300">
                <Workflow className="w-8 h-8 text-tertiary mb-4" />
                <h4 className="font-sans text-lg font-extrabold text-on-surface mb-2">Modern Frontend Architecture</h4>
                <p className="font-sans text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                  Building highly responsive, state-driven user interfaces using React, Redux Toolkit, and Tailwind CSS for seamless interactive experiences.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= HOW I BUILD ================= */}
        <section className="max-w-container-max mx-auto px-gutter" id="process">
          <div className="text-center space-y-2 mb-12">
            <h2 className="font-sans text-3xl font-extrabold text-on-surface">Development Philosophy</h2>
            <p className="text-on-surface-variant text-xs">My systematic approach to software engineering and product shipping</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((step) => (
              <div 
                key={step.num} 
                className="glass-card p-6 rounded-2xl border border-outline-variant/15 space-y-3 relative overflow-hidden group hover:border-primary/20 transition-all"
              >
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-mono text-xs font-bold text-primary border border-primary/25">
                  {step.num}
                </div>
                <h4 className="font-sans text-sm font-extrabold text-on-surface">{step.title}</h4>
                <p className="font-sans text-xs text-on-surface-variant leading-relaxed">{step.desc}</p>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-tertiary to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= EXPERIENCE TIMELINE ================= */}
        <section className="max-w-container-max mx-auto px-gutter">
          <h2 className="font-sans text-3xl font-extrabold text-on-surface mb-10">Experience</h2>
          
          <div className="relative pl-6 border-l border-outline-variant/20 space-y-12 max-w-3xl">
            {timelineData.map((event) => (
              <div key={event.id} className="relative">
                {/* Node Orb */}
                <div className="absolute -left-[30px] top-1.5 w-3.5 h-3.5 rounded-full bg-primary shadow-[0_0_8px_rgba(139,92,246,0.6)]"></div>
                
                <span className="font-mono text-xs font-bold text-primary mb-1 block">{event.year}</span>
                <h3 className="font-sans text-base font-extrabold text-on-surface">{event.title}</h3>
                <p className="text-xs text-secondary font-bold uppercase tracking-wider mb-2">{event.company}</p>
                <p className="font-sans text-xs text-on-surface-variant leading-relaxed max-w-2xl">
                  {event.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ================= BEYOND CODE ================= */}
        <section className="max-w-container-max mx-auto px-gutter">
          <div className="text-center space-y-2 mb-10">
            <h2 className="font-sans text-3xl font-extrabold text-on-surface">Beyond Code</h2>
            <p className="text-on-surface-variant text-xs">Interests and traits that define my engineering mindset</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card p-6 rounded-2xl flex items-start gap-4 border border-outline-variant/15">
              <span className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20 flex-shrink-0">
                <Search className="w-5 h-5" />
              </span>
              <div>
                <h4 className="font-sans text-sm font-extrabold text-on-surface mb-1">Problem Solving</h4>
                <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                  Passionate about algorithmic challenges and system optimization strategies that enhance user productivity.
                </p>
              </div>
            </div>

            <div className="glass-card p-6 rounded-2xl flex items-start gap-4 border border-outline-variant/15">
              <span className="w-10 h-10 rounded-full bg-tertiary/10 flex items-center justify-center text-tertiary border border-tertiary/20 flex-shrink-0">
                <Compass className="w-5 h-5" />
              </span>
              <div>
                <h4 className="font-sans text-sm font-extrabold text-on-surface mb-1">Tech Exploration</h4>
                <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                  Constantly exploring emerging frameworks, AI integration modelings, and the evolving landscape of web tools.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= CTA BANNER ================= */}
        <section className="max-w-container-max mx-auto px-gutter pb-12">
          <div className="glass-card p-10 sm:p-12 rounded-3xl text-center space-y-6 relative overflow-hidden border border-outline-variant/15">
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-primary/10 blur-3xl rounded-full"></div>
            
            <h2 className="font-sans text-2xl sm:text-3xl lg:text-4xl font-extrabold text-on-surface">
              Let's Build Something Meaningful
            </h2>
            <p className="text-on-surface-variant text-xs sm:text-sm max-w-lg mx-auto">
              I am open to discussions about internships, project collaborations, and full-stack building roles. Let's create impact.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
              <Link
                to="/contact"
                className="px-8 py-3 bg-primary text-on-primary rounded-xl font-sans text-xs font-bold hover:shadow-[0_0_20px_rgba(208,188,255,0.4)] transition-all transform active:scale-95"
              >
                Contact Me
              </Link>
              <a 
                href="/assets/HarshPandit.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 glass-card border border-outline-variant/35 text-on-surface rounded-xl font-sans text-xs font-bold hover:bg-white/5 transition-all transform active:scale-95 flex items-center justify-center gap-1.5"
              >
                <FileDown className="w-4 h-4" /> Download HarshPandit
              </a>
            </div>
          </div>
        </section>

      </div>
    </>
  );
};

export default About;
