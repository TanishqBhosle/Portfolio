import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Menu, X, RotateCcw } from 'lucide-react';

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

      const sections = ['hero', 'about', 'projects', 'skills', 'timeline', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 300 && rect.bottom >= 200) {
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
    { name: 'ABOUT', href: '#about', id: 'about' },
    { name: 'WORK', href: '#projects', id: 'projects' },
    { name: 'SKILLS', href: '#skills', id: 'skills' },
    { name: 'JOURNEY', href: '#timeline', id: 'timeline' },
    { name: 'CONTACT', href: '#contact', id: 'contact' },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 px-4 sm:px-8 py-4 transition-all duration-300">
      <nav
        className={`max-w-7xl mx-auto flex items-center justify-between px-5 py-3 rounded-full transition-all duration-500 ${
          scrolled
            ? 'bg-[#08080c]/80 backdrop-blur-xl border border-white/[0.08] shadow-2xl shadow-black/80'
            : 'bg-transparent border border-transparent'
        }`}
      >
        {/* Monogram Brand */}
        <a
          href="#hero"
          data-cursor="TOP"
          className="flex items-center gap-3 group cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-white/10 group-hover:border-red-500/80 flex items-center justify-center transition-colors">
            <span className="font-display font-black text-xs tracking-tight text-white group-hover:text-red-400 transition-colors">
              TB
            </span>
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xs font-display font-black tracking-wider uppercase text-neutral-200 group-hover:text-white transition-colors">
              TANISHQ BHOSALE
            </span>
          </div>
        </a>

        {/* Center Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1 bg-white/[0.03] px-3 py-1.5 rounded-full border border-white/[0.06] backdrop-blur-md">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                data-cursor="GO"
                className={`relative px-4 py-1 rounded-full text-xs font-mono-code tracking-wider transition-colors duration-200 cursor-pointer ${
                  isActive ? 'text-white font-bold' : 'text-neutral-400 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 rounded-full bg-red-600/20 border border-red-500/40"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </a>
            );
          })}
        </div>

        {/* Right Controls */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="RESUME"
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-mono-code tracking-wider bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] hover:border-red-500/40 text-neutral-200 hover:text-white transition-all cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-red-400" />
            <span>CV</span>
          </a>

          {onReplayIntro && (
            <button
              onClick={onReplayIntro}
              data-cursor="INTRO"
              title="Replay cinematic prologue"
              className="p-2 rounded-full border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.06] text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-neutral-900/80 border border-white/10 text-neutral-300"
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
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="md:hidden mt-3 p-5 rounded-2xl bg-[#0a0a0f]/95 border border-white/10 backdrop-blur-2xl shadow-2xl flex flex-col gap-2"
          >
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl text-xs font-mono-code tracking-widest text-neutral-300 hover:text-white hover:bg-white/5 transition-colors flex items-center justify-between"
              >
                <span>{link.name}</span>
                <span className="text-red-500">›</span>
              </a>
            ))}

            <div className="pt-3 border-t border-white/10 mt-2 flex flex-col gap-2">
              <a
                href="/resume.pdf"
                download="Tanishq_Bhosale_Resume.pdf"
                className="w-full py-2.5 rounded-xl bg-red-600 text-white text-center font-mono-code text-xs font-bold flex items-center justify-center gap-2 uppercase tracking-wider"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>DOWNLOAD RESUME</span>
              </a>
              {onReplayIntro && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onReplayIntro();
                  }}
                  className="w-full py-2 text-center text-xs font-mono-code text-neutral-400 hover:text-white uppercase tracking-wider"
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
