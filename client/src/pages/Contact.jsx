import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Mail, User, MessageSquare, Send, BookOpen, MapPin } from 'lucide-react';
import { Github, Linkedin } from '../components/BrandIcons';
import { submitContact } from '../services/api';
import MagneticButton from '../components/MagneticButton';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', text: '' });

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

  return (
    <>
      <Helmet>
        <title>Contact | Harsh Kumar Pandit Profile</title>
        <meta name="description" content="Get in touch with Harsh Kumar Pandit, a B.Tech CSE student specializing in real-time MERN applications, AI-driven platforms, and interactive user experiences." />
        <meta name="keywords" content="Contact Harsh Kumar Pandit, Hire MERN Developer, Collaborate CSE Student" />
      </Helmet>

      {/* Background is now handled by GlobalSpaceBackground in App.jsx */}

      <div className="pt-8 md:pt-12 pb-20 px-gutter max-w-container-max mx-auto">
        <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-[10px] font-bold tracking-[0.2em] text-primary uppercase">
            Get In Touch
          </div>
          <h1 className="font-sans text-4xl sm:text-5xl font-extrabold text-on-surface">
            Let's Connect & Build <span className="text-gradient">Together</span>
          </h1>
          <p className="text-on-surface-variant text-sm sm:text-base leading-relaxed">
            Have an exciting project idea, a job opportunity, or just want to exchange thoughts on modern web development? Reach out through the form below or via my social profiles.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* Left: Contact Info Info cards */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="glass-card p-6 rounded-2xl border border-outline-variant/15 space-y-6"
            >
              <h3 className="font-sans text-lg font-bold text-on-surface border-b border-outline-variant/10 pb-3">
                Contact Information
              </h3>

              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-extrabold text-on-surface uppercase tracking-wider">Email Me</h4>
                    <a href="mailto:harshkumarpandit2004@gmail.com" className="text-sm text-on-surface-variant hover:text-primary transition-colors font-semibold">
                      harshkumarpandit2004@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shrink-0">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-extrabold text-on-surface uppercase tracking-wider">Education</h4>
                    <span className="text-sm text-on-surface-variant font-semibold">
                      B.Tech in Computer Science & Engineering
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-extrabold text-on-surface uppercase tracking-wider">Location</h4>
                    <span className="text-sm text-on-surface-variant font-semibold">
                      India
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Socials Connection Card */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="glass-card p-6 rounded-2xl border border-outline-variant/15 space-y-4"
            >
              <h3 className="font-sans text-sm font-extrabold text-on-surface-variant uppercase tracking-wider">
                Follow My Profiles
              </h3>
              <div className="flex items-center gap-3">
                <a 
                  href="https://github.com/Harsh-Kumar-Pandit" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 rounded-full glass-card border border-outline-variant/20 hover:border-primary/40 hover:text-primary flex items-center justify-center transition-all duration-300"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a 
                  href="https://linkedin.com/in/harsh-kumar-pandit" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 rounded-full glass-card border border-outline-variant/20 hover:border-primary/40 hover:text-primary flex items-center justify-center transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-3">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
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
                    rows="5"
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
                <MagneticButton className="w-full">
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
                </MagneticButton>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
