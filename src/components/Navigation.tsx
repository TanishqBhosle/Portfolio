import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Menu, X, Terminal } from 'lucide-react';
import { MagneticButton } from './MagneticButton';

interface NavigationProps {
  onReplayIntro?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onReplayIntro }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Simple active section detection
      const sections = ['hero', 'about', 'projects', 'skills', 'timeline', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
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
    { name: 'Systems & Projects', href: '#projects', id: 'projects' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Timeline', href: '#timeline', id: 'timeline' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-40 px-4 sm:px-8 py-4 transition-all duration-300">
      <nav 
        className={`max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3 rounded-2xl transition-all duration-300 ${
          scrolled 
            ? 'bg-[#0b0b0e]/80 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/50' 
            : 'bg-transparent border border-transparent'
        }`}
      >
        {/* Brand / Monogram */}
        <div className="flex items-center gap-3">
          <a 
            href="#hero" 
            className="flex items-center gap-2.5 group"
          >
            <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-red-500/30 flex items-center justify-center group-hover:border-red-500/80 transition-colors shadow-inner">
              <span className="font-display font-black text-sm tracking-tight text-white group-hover:text-red-400 transition-colors">
                TB
              </span>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-display font-bold tracking-wider uppercase text-zinc-200 group-hover:text-white transition-colors">
                Tanishq Bhosale
              </span>
              <span className="text-[10px] font-mono text-zinc-500 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping inline-block" />
                <span>ACTIVE • OPEN TO ROLES</span>
              </span>
            </div>
          </a>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-1 bg-zinc-900/60 p-1.5 rounded-full border border-white/5 backdrop-blur-md">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                className={`relative px-4 py-1.5 rounded-full text-xs font-mono transition-all duration-200 ${
                  isActive 
                    ? 'text-white' 
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavPill"
                    className="absolute inset-0 rounded-full bg-red-500/20 border border-red-500/40"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </a>
            );
          })}
        </div>

        {/* Action Controls */}
        <div className="hidden md:flex items-center gap-3">
          {/* Resume Download */}
          <MagneticButton
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download="Tanishq_Bhosale_Resume.pdf"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-medium shadow-[0_0_20px_rgba(239,68,68,0.3)] hover:shadow-[0_0_25px_rgba(239,68,68,0.5)] transition-all"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>RESUME</span>
          </MagneticButton>

          {/* Intro sequence replay trigger */}
          {onReplayIntro && (
            <button
              onClick={onReplayIntro}
              title="Replay cinematic intro"
              className="p-2 rounded-xl border border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700 transition-colors cursor-pointer"
            >
              <Terminal className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <a
            href="/resume.pdf"
            download="Tanishq_Bhosale_Resume.pdf"
            className="px-3 py-1.5 rounded-lg text-xs font-mono bg-red-600 text-white font-medium flex items-center gap-1.5"
          >
            <FileText className="w-3 h-3" />
            <span>CV</span>
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300"
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
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden mt-2 p-4 rounded-2xl bg-[#0e0e14]/95 border border-white/10 backdrop-blur-2xl shadow-2xl flex flex-col gap-2"
          >
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl text-sm font-mono text-zinc-300 hover:text-white hover:bg-white/5 transition-colors flex items-center justify-between"
              >
                <span>{link.name}</span>
                <span className="text-zinc-600 text-xs">→</span>
              </a>
            ))}

            <div className="pt-2 border-t border-white/10 mt-1 flex flex-col gap-2">
              <a
                href="/resume.pdf"
                download="Tanishq_Bhosale_Resume.pdf"
                className="w-full py-2.5 rounded-xl bg-red-600 text-white text-center font-mono text-xs font-semibold flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4" />
                <span>DOWNLOAD RESUME (PDF)</span>
              </a>
              {onReplayIntro && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onReplayIntro();
                  }}
                  className="w-full py-2 text-center text-xs font-mono text-zinc-500 hover:text-zinc-300"
                >
                  REPLAY INTRO
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
