import React from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  ArrowDown, 
  ChevronRight, 
  FileText
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, LeetCodeIcon } from './Icons';
import { MagneticButton } from './MagneticButton';

export const Hero: React.FC = () => {
  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex flex-col justify-center items-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden select-none"
    >
      {/* Radial spotlight effect behind hero */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[800px] h-[350px] sm:h-[450px] bg-gradient-to-b from-red-600/15 via-red-900/5 to-transparent rounded-full blur-[120px] pointer-events-none" />

      {/* Grid crosshair accents */}
      <div className="absolute top-28 left-8 sm:left-16 font-mono text-[10px] text-zinc-600 tracking-widest hidden md:block">
        LOC: 12.9716° N, 77.5946° E [BLR]
      </div>
      <div className="absolute top-28 right-8 sm:right-16 font-mono text-[10px] text-zinc-600 tracking-widest hidden md:block">
        CORE: AI/ML & DISTRIBUTED SYSTEMS
      </div>

      <div className="max-w-5xl mx-auto flex flex-col items-center text-center relative z-10">
        {/* Status Pill */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-red-500/30 bg-red-950/20 backdrop-blur-md mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
          </span>
          <span className="font-mono text-xs text-red-300 tracking-wider uppercase">
            POLARIS SCHOOL OF TECHNOLOGY • B.TECH CS (AI/ML)
          </span>
        </motion.div>

        {/* Monumental Name */}
        <div className="relative mb-6">
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-black tracking-tighter text-white uppercase"
          >
            TANISHQ <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-amber-500 text-glow-red">BHOSALE</span>
          </motion.h1>
        </div>

        {/* Subtitle / Focus Statement */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-lg sm:text-2xl font-light text-zinc-300 max-w-3xl font-display leading-relaxed mb-6"
        >
          Engineering autonomous multi-agent swarms, multimodal content moderation engines, and enterprise-grade distributed systems.
        </motion.p>

        {/* Key Metrics Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.8 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 py-4 px-6 rounded-2xl bg-zinc-950/60 border border-white/5 backdrop-blur-md mb-10 w-full max-w-3xl"
        >
          <div className="flex flex-col items-center">
            <span className="font-display font-bold text-2xl text-white">36+</span>
            <span className="font-mono text-[11px] text-zinc-400 uppercase tracking-wider">GitHub Repos</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-display font-bold text-2xl text-red-400">8</span>
            <span className="font-mono text-[11px] text-zinc-400 uppercase tracking-wider">Core Systems</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-display font-bold text-2xl text-amber-400">&lt;50ms</span>
            <span className="font-mono text-[11px] text-zinc-400 uppercase tracking-wider">API Inference</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-display font-bold text-2xl text-emerald-400">100%</span>
            <span className="font-mono text-[11px] text-zinc-400 uppercase tracking-wider">Type-Safe</span>
          </div>
        </motion.div>

        {/* CTA Button Group */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
        >
          <MagneticButton
            href="#projects"
            className="group px-7 py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-mono text-sm font-semibold flex items-center gap-2.5 shadow-[0_0_30px_rgba(239,68,68,0.35)] transition-all"
          >
            <span>EXPLORE ARCHITECTURES</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </MagneticButton>

          <MagneticButton
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download="Tanishq_Bhosale_Resume.pdf"
            className="group px-6 py-3.5 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-white/10 hover:border-red-500/40 font-mono text-sm font-semibold flex items-center gap-2.5 backdrop-blur-md transition-all"
          >
            <FileText className="w-4 h-4 text-red-400" />
            <span>DOWNLOAD RESUME</span>
          </MagneticButton>

          <MagneticButton
            href="#contact"
            className="px-6 py-3.5 rounded-xl bg-zinc-950/60 hover:bg-zinc-900 border border-white/5 hover:border-white/20 text-zinc-400 hover:text-white font-mono text-sm font-medium flex items-center gap-2 transition-all"
          >
            <Mail className="w-4 h-4" />
            <span>GET IN TOUCH</span>
          </MagneticButton>
        </motion.div>

        {/* Social Proof Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex items-center gap-4 text-zinc-400"
        >
          <a
            href="https://github.com/TanishqBhosle"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub: TanishqBhosle"
            className="p-3 rounded-xl bg-zinc-900/60 border border-white/5 hover:border-red-500/40 hover:text-white hover:bg-zinc-800/80 transition-all cursor-pointer"
          >
            <GithubIcon className="w-5 h-5" />
          </a>
          <a
            href="https://linkedin.com/in/tanishqbhosale"
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn: tanishqbhosale"
            className="p-3 rounded-xl bg-zinc-900/60 border border-white/5 hover:border-red-500/40 hover:text-white hover:bg-zinc-800/80 transition-all cursor-pointer"
          >
            <LinkedinIcon className="w-5 h-5" />
          </a>
          <a
            href="https://leetcode.com/u/TanishqNitinBhosale/"
            target="_blank"
            rel="noopener noreferrer"
            title="LeetCode: TanishqNitinBhosale"
            className="p-3 rounded-xl bg-zinc-900/60 border border-white/5 hover:border-red-500/40 hover:text-white hover:bg-zinc-800/80 transition-all cursor-pointer"
          >
            <LeetCodeIcon className="w-5 h-5" />
          </a>
          <a
            href="mailto:tanishqbhosale2006@gmail.com"
            title="Email Tanishq"
            className="p-3 rounded-xl bg-zinc-900/60 border border-white/5 hover:border-red-500/40 hover:text-white hover:bg-zinc-800/80 transition-all cursor-pointer"
          >
            <Mail className="w-5 h-5" />
          </a>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="absolute bottom-6 inset-x-0 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-[10px] font-mono tracking-[0.25em] text-zinc-500 uppercase">
          SCROLL TO INITIALIZE
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-4 h-4 text-red-500" />
        </motion.div>
      </motion.div>
    </section>
  );
};
