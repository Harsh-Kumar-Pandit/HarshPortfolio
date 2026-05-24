import React from 'react';
import { Mail } from 'lucide-react';
import { Github, Linkedin } from './BrandIcons';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/Harsh-Kumar-Pandit', icon: <Github className="w-4 h-4" /> },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/harsh-kumar-pandit', icon: <Linkedin className="w-4 h-4" /> },
    { name: 'Email', url: 'mailto:harshkumarpandit2004@gmail.com', icon: <Mail className="w-4 h-4" /> },
  ];

  return (
    <footer className="w-full py-xl border-t border-outline-variant/10 mt-xl bg-background/50">
      <div className="flex flex-col md:flex-row justify-between items-center px-gutter max-w-container-max mx-auto gap-md">
        {/* Brand */}
        <div className="font-sans text-xl text-on-surface font-extrabold tracking-tighter">
          Harsh<span className="text-primary">.dev</span>
        </div>

        {/* Copy */}
        <div className="font-sans text-xs text-on-surface-variant font-medium tracking-wide text-center md:text-left">
          © {currentYear} Harsh Kumar Pandit. Built with precision.
        </div>

        {/* Social Icons */}
        <div className="flex gap-md">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-sans text-xs text-on-surface-variant hover:text-primary transition-colors duration-200"
              aria-label={link.name}
            >
              {link.icon}
              <span className="hidden sm:inline">{link.name}</span>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
