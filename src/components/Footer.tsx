import React from 'react';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/[0.06] bg-[#050507] py-14 px-4 sm:px-8 lg:px-16 select-none">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3 text-left">
          <div className="w-7 h-7 rounded bg-neutral-900 border border-white/10 flex items-center justify-center text-white font-display font-black text-xs">
            TB
          </div>
          <span className="font-mono-code text-xs text-neutral-400 uppercase tracking-widest">
            TANISHQ BHOSALE // 2026
          </span>
        </div>

        <div className="font-mono-code text-[11px] text-neutral-400 uppercase tracking-wider text-center">
          SCULPTED IN BENGALURU, INDIA • REACT 19 × THREE.JS × FRAMER MOTION
        </div>

        <button
          onClick={scrollToTop}
          data-cursor="TOP"
          className="flex items-center gap-2 font-mono-code text-xs text-neutral-400 hover:text-white uppercase tracking-wider transition-colors cursor-pointer"
        >
          <span>ASCEND</span>
          <ArrowUp className="w-3.5 h-3.5 text-red-500" />
        </button>
      </div>
    </footer>
  );
};
