import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Terminal, 
  BrainCircuit, 
  Activity, 
  Send, 
  ChevronRight, 
  Mail, 
  User, 
  MessageSquare, 
  BookOpen,
  ArrowUpRight
} from 'lucide-react';
import projectsData from '../data/projects';
import timelineData from '../data/timeline';
import ProjectCard from '../components/ProjectCard';
import { submitContact } from '../services/api';
import HeroPortrait from '../components/HeroPortrait';
import MagneticButton from '../components/MagneticButton';
import RevealSection from '../components/RevealSection';
import HeroBackground from '../components/HeroBackground';

const Home = () => {
  // Contact form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', text: '' });

  // Filter out featured projects
  const featuredProjects = projectsData.filter(p => p.featured);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitStatus({ type: 'error', text: 'Please fill in all required fields.' });
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus({ type: '', text: '' });

    try {
      await submitContact(formData);
      setSubmitStatus({ type: 'success', text: 'Thank you! Your message has been sent successfully.' });
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      setTimeout(() => {
        setSubmitStatus({ type: '', text: '' });
      }, 3000);

    } catch (error) {
      setSubmitStatus({ type: 'error', text: error });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Framer Motion animation presets
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 120, damping: 15 }
    }
  };

  return (
    <>
      <Helmet>
        <title>Harsh Kumar Pandit | Full-Stack MERN Developer & CSE Student</title>
        <meta name="description" content="Portfolio of Harsh Kumar Pandit, a B.Tech CSE student specializing in real-time MERN applications, AI-driven platforms, and interactive user experiences." />
        <meta name="keywords" content="MERN Stack Developer, CSE Student, React, Express, MongoDB, Node.js, Socket.io, Gemini API, India" />
      </Helmet>

      {/* ================= HERO SECTION ================= */}
      <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Isolated particles and ambient glows for Hero */}
        <HeroBackground />
        
        <section className="relative z-10 px-gutter w-full max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center pt-12 md:pt-16 pb-20">
            
          {/* ── Left Content ── */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-8"
          >
            {/* Elegant Badge */}
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/5 dark:bg-white/5 border border-slate-900/10 dark:border-white/10 backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981] animate-pulse" />
                <span className="text-xs font-semibold text-slate-900/80 dark:text-white/80 tracking-wide">Available for work</span>
              </div>
            </motion.div>
            
            {/* Headline */}
            <div className="space-y-4">
              <RevealSection delay={0.1}>
                <h1 className="font-sans text-5xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 dark:text-white leading-[1.1] tracking-tighter">
                  Crafting <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-sky-500 bg-clip-text text-transparent dark:from-indigo-400 dark:via-purple-400 dark:to-sky-400 font-serif italic font-light">Digital</span><br className="hidden md:block"/>
                  Experiences
                </h1>
              </RevealSection>
              
              <RevealSection delay={0.2}>
                <p className="font-sans text-lg sm:text-xl text-slate-700/90 dark:text-white/60 max-w-xl leading-relaxed font-light">
                  I'm Harsh Kumar Pandit, a full-stack engineer specializing in high-performance web applications, AI integration, and premium user interfaces.
                </p>
              </RevealSection>
            </div>

            {/* CTA Buttons */}
            <RevealSection delay={0.3}>
              <div className="flex flex-wrap gap-4 pt-4">
                <MagneticButton>
                  <Link 
                    to="/projects"
                    className="px-6 py-3.5 bg-slate-900 hover:bg-slate-950 text-white dark:bg-white dark:hover:bg-white/90 text-black dark:text-black font-semibold text-sm rounded-xl transition-all duration-300 flex items-center gap-1.5 shadow-md hover:shadow-[0_8px_30px_rgba(15,23,42,0.12)] dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.12)]"
                  >
                    View Work <ChevronRight className="w-4 h-4" />
                  </Link>
                </MagneticButton>
                
                <MagneticButton>
                  <a 
                    href="/assets/HarshPandit.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3.5 bg-white/40 hover:bg-white/90 border border-slate-200 dark:bg-white/5 dark:hover:bg-white/10 dark:border-white/10 text-slate-900 dark:text-white font-semibold text-sm rounded-xl transition-all duration-300 flex items-center gap-1.5 backdrop-blur-md hover:shadow-sm"
                  >
                    Download CV
                  </a>
                </MagneticButton>
              </div>
            </RevealSection>
          </motion.div>

          {/* ── Right Content (Sleek Glass Card Portrait) ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="flex items-center justify-center w-full"
          >
            <HeroPortrait />
          </motion.div>
        </section>
      </div>

      <div className="space-y-32 pb-32">
        {/* ================= QUICK STATS ================= */}
        <RevealSection className="px-gutter max-w-container-max mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card rounded-[2rem] p-8 flex flex-col items-center text-center">
              <span className="text-4xl font-extrabold text-slate-900 dark:text-white mb-2">3+</span>
              <span className="font-sans text-[10px] font-bold text-slate-500 dark:text-white/40 uppercase tracking-widest">Apps Shipped</span>
            </div>
            <div className="glass-card rounded-[2rem] p-8 flex flex-col items-center text-center">
              <span className="text-4xl font-extrabold text-slate-900 dark:text-white mb-2">&lt;100ms</span>
              <span className="font-sans text-[10px] font-bold text-slate-500 dark:text-white/40 uppercase tracking-widest">Messaging Latency</span>
            </div>
            <div className="glass-card rounded-[2rem] p-8 flex flex-col items-center text-center">
              <BrainCircuit className="w-8 h-8 text-slate-900 dark:text-white mb-3 opacity-60" />
              <span className="text-lg font-bold text-slate-900 dark:text-white">AI-Powered</span>
              <span className="font-sans text-[10px] font-bold text-slate-500 dark:text-white/40 uppercase tracking-widest mt-1">Logic Integration</span>
            </div>
          </div>
        </RevealSection>

        {/* ================= FEATURED PROJECTS ================= */}
        <section className="px-gutter max-w-container-max mx-auto space-y-10" id="projects">
          <div className="text-center md:text-left space-y-2">
            <div className="inline-flex items-center px-3 py-1 bg-slate-900/5 dark:bg-white/5 border border-slate-900/10 dark:border-white/10 rounded-full text-[9px] font-semibold tracking-[0.2em] text-slate-600 dark:text-white/60 uppercase">
              Featured Work
            </div>
            <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              Selected <span className="text-slate-400 dark:text-white/40 italic font-light">Projects</span>
            </h2>
            <p className="text-slate-600 dark:text-white/60 text-xs sm:text-sm max-w-2xl font-light">
              Production-grade applications designed and built from scratch.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          <div className="flex justify-center pt-4">
            <Link 
              to="/projects"
              className="group flex items-center gap-1.5 px-6 py-3 bg-slate-900/5 hover:bg-slate-900/10 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-900/10 dark:border-white/10 rounded-xl text-xs font-bold text-slate-900 dark:text-white transition-all duration-300"
            >
              Explore All Projects 
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </section>

        {/* ================= ABOUT ================= */}
        <section className="px-gutter max-w-container-max mx-auto" id="about">
          <div className="max-w-3xl mx-auto">
            <div className="space-y-8 text-center">
              <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
                About <span className="text-slate-400 dark:text-white/40 italic font-light">Me</span>
              </h2>
              <p className="font-sans text-sm sm:text-base text-slate-600 dark:text-white/60 leading-relaxed font-light">
                I'm a developer who bridges the gap between design-led aesthetics and hardcore system architecture. I thrive on building tools that feel invisible to the user but handle immense complexity under the hood. Currently focused on deep integration of AI models into everyday workflows.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-6 pt-6 text-left">
                <div className="flex items-center gap-4 glass-card rounded-2xl p-4 w-full sm:w-auto">
                  <span className="w-10 h-10 rounded-xl bg-slate-900/5 dark:bg-white/5 border border-slate-900/10 dark:border-white/10 flex items-center justify-center text-slate-800 dark:text-white/70">
                    <Terminal className="w-5 h-5" />
                  </span>
                  <div>
                    <h4 className="font-sans text-sm font-bold text-slate-900 dark:text-white">System Architect</h4>
                    <p className="text-xs text-slate-500 dark:text-white/40">Designing scalable microservices.</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 glass-card rounded-2xl p-4 w-full sm:w-auto">
                  <span className="w-10 h-10 rounded-xl bg-slate-900/5 dark:bg-white/5 border border-slate-900/10 dark:border-white/10 flex items-center justify-center text-slate-800 dark:text-white/70">
                    <Activity className="w-5 h-5" />
                  </span>
                  <div>
                    <h4 className="font-sans text-sm font-bold text-slate-900 dark:text-white">UX Driven</h4>
                    <p className="text-xs text-slate-500 dark:text-white/40">Focusing on pixel-perfect glass UI.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= JOURNEY TIMELINE ================= */}
        <section className="px-gutter max-w-container-max mx-auto" id="journey">
          <div className="text-center space-y-2 mb-16">
            <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              My <span className="text-slate-400 dark:text-white/40 italic font-light">Journey</span>
            </h2>
            <p className="text-slate-500 dark:text-white/40 text-xs tracking-wider">From student developer to full-stack engineer</p>
          </div>

          <div className="relative max-w-3xl mx-auto">
            {/* Center Axis */}
            <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-[1px] h-full bg-slate-900/10 dark:bg-white/10"></div>

            {timelineData.map((event, index) => {
              const isEven = index % 2 === 0;
              return (
                <div 
                  key={event.id} 
                  className={`relative flex flex-col md:flex-row justify-between items-center w-full mb-12 ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  <div className="hidden md:block w-[45%]"></div>
                  
                  {/* Timeline Orb node */}
                  <div className="z-10 w-3 h-3 rounded-full bg-slate-900 dark:bg-white ring-4 ring-slate-900/10 dark:ring-white/10 absolute left-4 md:left-1/2 md:-translate-x-1/2 shadow-[0_0_10px_rgba(15,23,42,0.15)] dark:shadow-[0_0_10px_rgba(255,255,255,0.4)]"></div>
                  
                  {/* Card Block */}
                  <div className="w-full md:w-[45%] pl-10 md:pl-0">
                    <motion.div 
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.08 }}
                      className="glass-card p-6 rounded-[2rem]"
                    >
                      <div className="flex items-center gap-2 mb-2 text-slate-500 dark:text-white/50 font-bold text-xs">
                        <span>{event.year}</span>
                        <span>•</span>
                        <span className="uppercase tracking-wider text-[9px]">{event.role}</span>
                      </div>
                      
                      <h4 className="font-sans text-base font-extrabold text-slate-900 dark:text-white mb-1">
                        {event.title}
                      </h4>
                      <p className="text-[10px] text-slate-500 dark:text-white/40 font-bold uppercase tracking-wider mb-2">
                        {event.company}
                      </p>
                      
                      <p className="font-sans text-xs text-slate-600 dark:text-white/60 leading-relaxed font-light">
                        {event.description}
                      </p>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ================= CONTACT SECTION ================= */}
        <section className="px-gutter max-w-container-max mx-auto" id="contact">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-2 space-y-6">
              <div className="space-y-3">
                <div className="inline-flex items-center px-3 py-1 bg-slate-900/5 dark:bg-white/5 border border-slate-900/10 dark:border-white/10 rounded-full text-[9px] font-semibold tracking-[0.2em] text-slate-600 dark:text-white/60 uppercase">
                  Get In Touch
                </div>
                <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
                  Let's Build Something <span className="text-slate-400 dark:text-white/40 italic font-light">Meaningful</span>
                </h2>
                <p className="text-slate-600 dark:text-white/60 text-xs sm:text-sm leading-relaxed font-light">
                  I'm currently looking for new opportunities. Whether you have a project idea, question, or just want to say hello, feel free to drop a message!
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-900/5 dark:bg-white/5 flex items-center justify-center text-slate-800 dark:text-white/70 border border-slate-900/10 dark:border-white/10">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-extrabold text-slate-500 dark:text-white/40 uppercase tracking-wider">Email Me</h4>
                    <a href="mailto:harshkumarpandit2004@gmail.com" className="text-sm text-slate-800 dark:text-white/75 hover:text-slate-900 dark:hover:text-white transition-colors font-semibold">
                      harshkumarpandit2004@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-900/5 dark:bg-white/5 flex items-center justify-center text-slate-800 dark:text-white/70 border border-slate-900/10 dark:border-white/10">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-extrabold text-slate-500 dark:text-white/40 uppercase tracking-wider">Education</h4>
                    <span className="text-sm text-slate-800 dark:text-white/75 font-semibold">
                      B.Tech in Computer Science
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Contact Form Card */}
            <div className="lg:col-span-3">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass-card p-6 sm:p-8 rounded-[2.5rem] relative overflow-hidden"
              >
                <form onSubmit={handleFormSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="text-[10px] font-bold text-slate-500 dark:text-white/40 uppercase tracking-wider flex items-center gap-1">
                        <User className="w-3.5 h-3.5" /> Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="input-premium w-full px-4 py-3 rounded-xl font-sans text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/20 focus:outline-none"
                      />
                    </div>
                    {/* Email */}
                    <div className="space-y-1.5">
                      <label htmlFor="email" className="text-[10px] font-bold text-slate-500 dark:text-white/40 uppercase tracking-wider flex items-center gap-1">
                        <Mail className="w-3.5 h-3.5" /> Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        className="input-premium w-full px-4 py-3 rounded-xl font-sans text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/20 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-1.5">
                    <label htmlFor="subject" className="text-[10px] font-bold text-slate-500 dark:text-white/40 uppercase tracking-wider flex items-center gap-1">
                      <MessageSquare className="w-3.5 h-3.5" /> Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Project Discussion"
                      className="input-premium w-full px-4 py-3 rounded-xl font-sans text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/20 focus:outline-none"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label htmlFor="message" className="text-[10px] font-bold text-slate-500 dark:text-white/40 uppercase tracking-wider flex items-center gap-1">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows="4"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Hi Harsh, I'd like to talk about..."
                      className="input-premium w-full px-4 py-3 rounded-xl font-sans text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/20 focus:outline-none resize-none"
                    />
                  </div>

                  {/* Status Banner */}
                  {submitStatus.text && (
                    <div 
                      className={`p-4 rounded-xl text-xs font-semibold border ${
                        submitStatus.type === 'success' 
                          ? 'bg-green-500/10 border-green-500/30 text-green-600 dark:text-green-400' 
                          : 'bg-red-500/10 border-red-500/30 text-red-600 dark:text-red-400'
                      }`}
                    >
                      {submitStatus.text}
                    </div>
                  )}

                  {/* Submit CTA */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-white/90 text-white dark:text-black font-semibold text-xs rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="w-4 h-4 border-2 border-slate-900 dark:border-black border-t-transparent rounded-full animate-spin"></span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            </div>

          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
