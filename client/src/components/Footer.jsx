import React from 'react';
import { Mail } from 'lucide-react';
import { Github, Linkedin } from './BrandIcons';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/Harsh-Kumar-Pandit', icon: <Github className="w-4 h-4 opacity-70 hover:opacity-100 transition-opacity" /> },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/harsh-kumar-pandit', icon: <Linkedin className="w-4 h-4 opacity-70 hover:opacity-100 transition-opacity" /> },
    { name: 'Email', url: 'mailto:harshkumarpandit2004@gmail.com', icon: <Mail className="w-4 h-4 opacity-70 hover:opacity-100 transition-opacity" /> },
  ];

  return (
    <footer className="w-full py-12 border-t border-slate-200 dark:border-white/5 bg-transparent mt-12">
      <div className="flex flex-col md:flex-row justify-between items-center px-gutter max-w-container-max mx-auto gap-6">
        {/* Brand */}
        <div className="font-sans text-lg text-slate-900 dark:text-white font-extrabold tracking-tighter">
          Harsh<span className="text-slate-400 dark:text-white/40 font-light italic">.dev</span>
        </div>

        {/* Copy */}
        <div className="font-sans text-xs text-slate-400 dark:text-white/40 font-light tracking-wide text-center md:text-left">
          © {currentYear} Harsh Kumar Pandit. Built with precision.
        </div>

        {/* Social Icons */}
        <div className="flex gap-6">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-sans text-xs text-slate-400 dark:text-white/40 hover:text-slate-900 dark:hover:text-white transition-colors duration-200"
              aria-label={link.name}
            >
              {link.icon}
              <span className="hidden sm:inline font-light">{link.name}</span>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
