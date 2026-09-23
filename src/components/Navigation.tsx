import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Menu, X, ArrowUpRight } from 'lucide-react';

const GithubIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
  </svg>
);

const LinkedinIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

interface NavigationProps {
  onReplayIntro?: () => void;
  onOpen3D?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onOpen3D }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      const sections = ['hero', 'about', 'projects', 'skills', 'timeline', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 250 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Journey', href: '#timeline', id: 'timeline' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 px-4 sm:px-8 py-4 transition-all duration-300">
      <nav
        aria-label="Main Navigation"
        className={`max-w-6xl mx-auto flex items-center justify-between px-5 py-2.5 rounded-full transition-all duration-500 ${scrolled
            ? 'bg-[#07070a]/80 backdrop-blur-xl border border-white/[0.08] shadow-xl shadow-black/60'
            : 'bg-[#07070a]/30 backdrop-blur-md border border-white/[0.05]'
          }`}
      >
        {/* Monogram Brand */}
        <a
          href="#hero"
          data-cursor="TOP"
          aria-label="Back to top"
          className="flex items-center gap-3 group cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-neutral-900/90 border border-white/10 group-hover:border-rose-500/80 flex items-center justify-center transition-colors shadow-sm">
            <span className="font-display font-black text-xs tracking-tight text-white group-hover:text-rose-400 transition-colors">
              TB
            </span>
          </div>
          <div className="flex flex-col text-left">
            <span className="text-sm font-display font-bold tracking-tight text-neutral-200 group-hover:text-white transition-colors">
              Tanishq Bhosle
            </span>
          </div>
        </a>

        {/* Center Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1 bg-white/[0.03] px-2 py-1 rounded-full border border-white/[0.06] backdrop-blur-md">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                data-cursor="GO"
                className={`relative px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-colors duration-200 cursor-pointer ${isActive ? 'text-white font-semibold' : 'text-neutral-400 hover:text-white'
                  }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 rounded-full bg-rose-500/15 border border-rose-500/30"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </a>
            );
          })}
        </div>

        {/* Right Controls: Socials & Resume */}
        <div className="hidden md:flex items-center gap-2.5">
          <a
            href="https://github.com/TanishqBhosle"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="GITHUB"
            aria-label="GitHub Profile"
            className="p-2 rounded-full text-neutral-400 hover:text-white hover:bg-white/[0.06] transition-colors"
          >
            <GithubIcon className="w-4 h-4" />
          </a>

          <a
            href="https://www.linkedin.com/in/tanishqbhosale/"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="LINKEDIN"
            aria-label="LinkedIn Profile"
            className="p-2 rounded-full text-neutral-400 hover:text-white hover:bg-white/[0.06] transition-colors"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>

          <div className="h-4 w-[1px] bg-white/10 mx-1" />

          {onOpen3D && (
            <button
              onClick={onOpen3D}
              data-cursor="3D"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-300 hover:text-white transition-all cursor-pointer shadow-sm group"
              title="Launch 3D Neural Realm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
              </span>
              <span className="font-mono text-[11px] tracking-wider uppercase font-semibold">3D Realm</span>
            </button>
          )}

          <a
            href="https://drive.google.com/file/d/15a1JQavD9AOKO9QJm_4z6s3UdsHsboDa/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="RESUME"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 hover:text-rose-200 transition-all cursor-pointer shadow-sm"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
            <ArrowUpRight className="w-3 h-3 opacity-70" />
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-neutral-900/80 border border-white/10 text-neutral-300 hover:text-white transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mt-3 p-5 rounded-2xl bg-[#0a0a0f]/95 border border-white/10 backdrop-blur-2xl shadow-2xl flex flex-col gap-1.5"
          >
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl text-sm font-medium text-neutral-300 hover:text-white hover:bg-white/5 transition-colors flex items-center justify-between"
              >
                <span>{link.name}</span>
                <span className="text-rose-400">›</span>
              </a>
            ))}

            <div className="pt-4 border-t border-white/10 mt-2 flex flex-col gap-2.5">
              {onOpen3D && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpen3D();
                  }}
                  className="w-full py-2.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-center text-xs font-semibold flex items-center justify-center gap-2 tracking-wide shadow-md cursor-pointer hover:bg-rose-500/25 transition-all"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
                  </span>
                  <span>Launch 3D Neural Realm</span>
                </button>
              )}

              <a
                href="https://drive.google.com/file/d/15a1JQavD9AOKO9QJm_4z6s3UdsHsboDa/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-rose-500 text-white text-center text-xs font-semibold flex items-center justify-center gap-2 tracking-wide shadow-md"
              >
                <FileText className="w-4 h-4" />
                <span>View Resume</span>
              </a>

              <div className="flex items-center justify-center gap-4 pt-2">
                <a
                  href="https://github.com/TanishqBhosle"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="flex items-center gap-2 text-xs text-neutral-400 hover:text-white py-1 px-3"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/tanishqbhosale/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="flex items-center gap-2 text-xs text-neutral-400 hover:text-white py-1 px-3"
                >
                  <LinkedinIcon className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
