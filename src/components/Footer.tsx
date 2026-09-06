import React from 'react';
import { ArrowUp } from 'lucide-react';
import { MagneticButton } from './MagneticButton';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/10 bg-[#070709] py-16 px-4 sm:px-6 lg:px-8 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Monogram and Identity */}
        <div className="flex items-center gap-4 text-left">
          <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-red-500/40 flex items-center justify-center text-white font-display font-black text-base shadow-inner">
            TB
          </div>
          <div>
            <h4 className="text-sm font-display font-bold uppercase tracking-wider text-white">
              Tanishq Bhosale
            </h4>
            <p className="text-xs font-mono text-zinc-500">
              Full-Stack & AI/ML Specialist • Bengaluru, India
            </p>
          </div>
        </div>

        {/* Tech Stack attribution */}
        <div className="text-center font-mono text-xs text-zinc-500 space-y-1">
          <div className="flex items-center justify-center gap-1">
            <span>Engineered with React 19, TypeScript, Three.js & Tailwind</span>
          </div>
          <div>
            © {new Date().getFullYear()} Tanishq Bhosale. All rights reserved.
          </div>
        </div>

        {/* Back to Top */}
        <div>
          <MagneticButton
            onClick={scrollToTop}
            className="p-3 rounded-2xl bg-zinc-900/80 hover:bg-zinc-800 border border-white/10 text-zinc-400 hover:text-white transition-all flex items-center gap-2 font-mono text-xs"
          >
            <span>BACK TO SUMMIT</span>
            <ArrowUp className="w-3.5 h-3.5 text-red-400" />
          </MagneticButton>
        </div>
      </div>
    </footer>
  );
};
