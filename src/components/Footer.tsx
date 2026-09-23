import React from 'react';
import { ArrowUp, Heart } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/[0.08] bg-[#07070a] py-12 px-4 sm:px-8 lg:px-16 select-none">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Left: Brand & Title */}
        <div className="flex items-center gap-3 text-left">
          <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-white/10 flex items-center justify-center text-white font-display font-black text-xs">
            TB
          </div>
          <div>
            <span className="font-display font-bold text-sm text-neutral-200 block">
              Tanishq Bhosle
            </span>
            <span className="font-mono-code text-[11px] text-neutral-400">
              AI/ML Engineer & Full-Stack Architect
            </span>
          </div>
        </div>

        {/* Center: Tech stack credit */}
        <div className="flex flex-col items-center gap-1 text-center font-mono-code text-[11px] text-neutral-400">
          <div className="flex items-center gap-1.5">
            <span>Crafted with</span>
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
            <span>using React 19, Three.js & Tailwind CSS</span>
          </div>
          <div className="text-neutral-500 text-[10px]">
            © {new Date().getFullYear()} Tanishq Bhosle. All rights reserved.
          </div>
        </div>

        {/* Right: Quick links & Scroll to Top */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/TanishqBhosle"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="p-2 rounded-full text-neutral-400 hover:text-white hover:bg-white/[0.05] transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/tanishqbhosale/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="p-2 rounded-full text-neutral-400 hover:text-white hover:bg-white/[0.05] transition-colors"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
          </div>

          <div className="h-4 w-[1px] bg-white/10" />

          <button
            onClick={scrollToTop}
            data-cursor="TOP"
            className="flex items-center gap-1.5 font-mono-code text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-rose-400" />
          </button>
        </div>
      </div>
    </footer>
  );
};
