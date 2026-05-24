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
import skillsData from '../data/skills';
import timelineData from '../data/timeline';
import ProjectCard from '../components/ProjectCard';
import { submitContact } from '../services/api';
import HeroPortrait from '../components/HeroPortrait';
import HeroSpaceBackground from '../components/HeroSpaceBackground';
import MagneticButton from '../components/MagneticButton';
import RevealSection from '../components/RevealSection';

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
      
      // Auto-hide success message after 3 seconds
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
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
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
        <HeroSpaceBackground />
        <section className="relative z-10 px-gutter w-full max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center pt-16 pb-24">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
              👋 Hi, I'm Harsh Kumar Pandit
            </div>
            
            <RevealSection delay={0.1}>
              <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-extrabold text-on-surface leading-tight tracking-tight">
                Building <span className="text-gradient">Real-Time</span><br className="hidden md:block"/> Full Stack Applications
              </h1>
            </RevealSection>
            
            <RevealSection delay={0.2}>
              <p className="font-sans text-base sm:text-lg text-on-surface-variant max-w-xl leading-relaxed">
                Full-stack developer building scalable web applications, AI-powered features, and intuitive digital experiences.
              </p>
            </RevealSection>

            <RevealSection delay={0.3}>
              <div className="flex flex-wrap gap-4 pt-4">
                <MagneticButton>
                  <Link 
                    to="/projects"
                    className="px-8 py-3 bg-primary text-on-primary font-bold text-sm rounded-xl border border-primary hover:shadow-[0_0_25px_rgba(139,92,246,0.3)] transition-all flex items-center gap-1.5"
                  >
                    View Work <ChevronRight className="w-4 h-4" />
                  </Link>
                </MagneticButton>
                
                <MagneticButton>
                  <a 
                    href="/assets/HarshPandit.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-3 glass-card text-on-surface border border-outline-variant hover:bg-white/5 font-bold text-sm rounded-xl transition-all"
                  >
                    Download Resume
                  </a>
                </MagneticButton>
              </div>
            </RevealSection>


          </motion.div>

          {/* ── Premium Liquid Blob Portrait ── */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="flex items-center justify-center w-full"
          >
            <HeroPortrait />
          </motion.div>
          </section>
      </div>

      <div className="pt-12 md:pt-20 space-y-24">
        {/* ================= QUICK STATS ================= */}
        <RevealSection className="px-gutter max-w-container-max mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card p-8 rounded-2xl flex flex-col items-center text-center hover:border-primary/30 transition-all duration-300">
              <span className="text-4xl font-extrabold text-primary mb-2">3+</span>
              <span className="font-sans text-xs font-bold text-on-surface-variant uppercase tracking-widest">Apps Shipped</span>
            </div>
            <div className="glass-card p-8 rounded-2xl flex flex-col items-center text-center hover:border-secondary/30 transition-all duration-300">
              <span className="text-4xl font-extrabold text-secondary mb-2">&lt;100ms</span>
              <span className="font-sans text-xs font-bold text-on-surface-variant uppercase tracking-widest">Messaging Latency</span>
            </div>
            <div className="glass-card p-8 rounded-2xl flex flex-col items-center text-center hover:border-tertiary/30 transition-all duration-300">
              <BrainCircuit className="w-8 h-8 text-tertiary mb-3 animate-pulse" />
              <span className="text-lg font-bold text-on-surface">AI-Powered</span>
              <span className="font-sans text-xs font-bold text-on-surface-variant uppercase tracking-widest mt-1">Logic Integration</span>
            </div>
          </div>
        </RevealSection>

        {/* ================= FEATURED PROJECTS ================= */}
        <section className="px-gutter max-w-container-max mx-auto space-y-10" id="projects">
          <div className="text-center md:text-left space-y-2">
            <div className="inline-flex items-center px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-[10px] font-bold tracking-[0.2em] text-primary uppercase">
              Featured Work
            </div>
            <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-on-surface">
              Selected <span className="text-gradient">Projects</span>
            </h2>
            <p className="text-on-surface-variant text-sm sm:text-base max-w-2xl">
              Production-grade applications designed and built from scratch
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
              className="group flex items-center gap-1.5 px-6 py-2.5 bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 rounded-xl text-xs font-bold text-on-surface hover:text-primary transition-all duration-300"
            >
              Explore All Projects 
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </section>

        {/* ================= ABOUT ================= */}
        <section className="px-gutter max-w-container-max mx-auto py-12 border-t border-outline-variant/10" id="about">
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6 text-center">
              <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-on-surface">
                About <span className="text-gradient">Me</span>
              </h2>
              <p className="font-sans text-sm sm:text-base text-on-surface-variant leading-relaxed">
                I'm a developer who bridges the gap between design-led aesthetics and hardcore system architecture. I thrive on building tools that feel invisible to the user but handle immense complexity under the hood. Currently focused on deep integration of AI models into everyday workflows.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-6 pt-6 text-left">
                <div className="flex items-center gap-4">
                  <span className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-primary">
                    <Terminal className="w-5 h-5" />
                  </span>
                  <div>
                    <h4 className="font-sans text-sm font-bold text-on-surface">System Architect</h4>
                    <p className="text-xs text-on-surface-variant">Designing scalable microservices.</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <span className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-secondary">
                    <Activity className="w-5 h-5" />
                  </span>
                  <div>
                    <h4 className="font-sans text-sm font-bold text-on-surface">UX Driven</h4>
                    <p className="text-xs text-on-surface-variant">Focusing on pixel-perfect glass UI.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= JOURNEY TIMELINE ================= */}
        <section className="px-gutter max-w-container-max mx-auto py-12" id="journey">
          <div className="text-center space-y-2 mb-12">
            <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-on-surface">
              My <span className="text-gradient">Journey</span>
            </h2>
            <p className="text-on-surface-variant text-sm">From student developer to full-stack engineer</p>
          </div>

          <div className="relative max-w-3xl mx-auto">
            {/* Center Timeline Axis */}
            <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-0.5 h-full bg-outline-variant/20"></div>

            {timelineData.map((event, index) => {
              const isEven = index % 2 === 0;
              return (
                <div 
                  key={event.id} 
                  className={`relative flex flex-col md:flex-row justify-between items-center w-full mb-12 ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Left Spacer for Desktop */}
                  <div className="hidden md:block w-[45%]"></div>
                  
                  {/* Timeline Orb node */}
                  <div className="z-10 w-4 h-4 rounded-full bg-primary ring-4 ring-primary/20 absolute left-4 md:left-1/2 md:-translate-x-1/2 shadow-[0_0_12px_rgba(139,92,246,0.6)]"></div>
                  
                  {/* Card Block */}
                  <div className="w-full md:w-[45%] pl-10 md:pl-0">
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="glass-card p-6 rounded-2xl hover:border-primary/20 transition-all duration-300"
                    >
                      <div className="flex items-center gap-2 mb-2 text-primary font-bold text-xs">
                        <span>{event.year}</span>
                        <span>•</span>
                        <span className="uppercase tracking-wider text-[10px]">{event.role}</span>
                      </div>
                      
                      <h4 className="font-sans text-base font-extrabold text-on-surface mb-1">
                        {event.title}
                      </h4>
                      <p className="text-[11px] text-secondary font-bold uppercase tracking-wider mb-2">
                        {event.company}
                      </p>
                      
                      <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
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
        <section className="px-gutter max-w-container-max mx-auto py-12" id="contact">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-2 space-y-6">
              <div className="space-y-3">
                <div className="inline-flex items-center px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-[10px] font-bold tracking-[0.2em] text-primary uppercase">
                  Get In Touch
                </div>
                <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-on-surface">
                  Let's Build Something <span className="text-gradient">Meaningful</span>
                </h2>
                <p className="text-on-surface-variant text-sm sm:text-base leading-relaxed">
                  I'm currently looking for new opportunities. Whether you have a project idea, question, or just want to say hello, feel free to drop a message!
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold text-on-surface uppercase tracking-wider">Email Me</h4>
                    <a href="mailto:harshkumarpandit2004@gmail.com" className="text-sm text-on-surface-variant hover:text-primary transition-colors font-semibold">
                      harshkumarpandit2004@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold text-on-surface uppercase tracking-wider">Education</h4>
                    <span className="text-sm text-on-surface-variant font-semibold">
                      B.Tech in Computer Science
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Contact Form Card */}
            <div className="lg:col-span-3">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass-card p-6 sm:p-8 rounded-3xl border border-outline-variant/15 shadow-xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-2xl rounded-full -z-10"></div>
                
                <form onSubmit={handleFormSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="text-xs font-bold text-on-surface-variant uppercase tracking-wider flex items-center gap-1">
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
                        className="input-premium w-full px-4 py-3 rounded-xl font-sans text-sm"
                      />
                    </div>
                    {/* Email */}
                    <div className="space-y-1.5">
                      <label htmlFor="email" className="text-xs font-bold text-on-surface-variant uppercase tracking-wider flex items-center gap-1">
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
                        className="input-premium w-full px-4 py-3 rounded-xl font-sans text-sm"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-1.5">
                    <label htmlFor="subject" className="text-xs font-bold text-on-surface-variant uppercase tracking-wider flex items-center gap-1">
                      <MessageSquare className="w-3.5 h-3.5" /> Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Project Discussion"
                      className="input-premium w-full px-4 py-3 rounded-xl font-sans text-sm"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label htmlFor="message" className="text-xs font-bold text-on-surface-variant uppercase tracking-wider flex items-center gap-1">
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
                      className="input-premium w-full px-4 py-3 rounded-xl font-sans text-sm resize-none"
                    />
                  </div>

                  {/* Status Banner */}
                  {submitStatus.text && (
                    <div 
                      className={`p-4 rounded-xl text-xs font-semibold border ${
                        submitStatus.type === 'success' 
                          ? 'bg-green-500/10 border-green-500/30 text-green-400' 
                          : 'bg-red-500/10 border-red-500/30 text-red-400'
                      }`}
                    >
                      {submitStatus.text}
                    </div>
                  )}

                  {/* Submit CTA */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full py-4 font-bold text-sm rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
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
