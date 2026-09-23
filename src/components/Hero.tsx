import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Mail, FileText, Sparkles } from 'lucide-react';

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

// Morphing role text
const roles = [
  'Full-Stack Developer',
  'AI / ML Engineer',
  'System Architect',
  'Open Source Builder',
];

interface HeroProps {
  replayKey?: number;
}

export const Hero: React.FC<HeroProps> = ({ replayKey = 0 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showContent, setShowContent] = useState(false);
  const [currentRole, setCurrentRole] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Smooth parallax scrolling effects
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const videoY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const textScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Morphing role text cycle
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Show content almost immediately (was 30 seconds — way too long!)
    setShowContent(false);

    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }

    // Reveal after a brief cinematic pause
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 600);

    return () => clearTimeout(timer);
  }, [replayKey]);

  return (
    <section
      ref={containerRef}
      id="hero"
      aria-label="Hero Section"
      className="relative min-h-screen flex flex-col justify-between items-center px-4 sm:px-8 pt-28 pb-16 overflow-hidden select-none"
    >
      {/* Cinematic Fullscreen Background Video Layer */}
      <motion.div
        style={{ y: videoY }}
        className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden"
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          className="w-full h-full object-cover object-center filter brightness-[0.7] contrast-105"
        >
          <source src="/videos/hero-reveal.mp4" type="video/mp4" />
          <source src="/videos/intro-reveal.mp4" type="video/mp4" />
        </video>

        {/* Ambient Dark Vignette & Atmospheric Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#07070a]/90 via-[#07070a]/40 to-[#07070a] pointer-events-none" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#07070a]/50 to-[#07070a] pointer-events-none" />
      </motion.div>

      {/* Warm Ambient Spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[850px] h-[350px] sm:h-[500px] bg-rose-500/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Main Content Hero Monument */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 25, filter: 'blur(8px)' }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ opacity: textOpacity, scale: textScale, y: contentY }}
            className="relative z-10 flex flex-col items-center justify-center my-auto w-full max-w-5xl mx-auto text-center px-2"
          >
            {/* Availability Badge with breathing animation */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md mb-6 shadow-sm"
              style={{ animation: 'breathe 4s ease-in-out infinite' }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-xs sm:text-sm font-medium text-neutral-300 tracking-wide">
                Available for AI/ML Roles & Research
              </span>
              <span className="text-neutral-500 text-xs hidden sm:inline">•</span>
              <span className="text-neutral-400 text-xs font-mono-code hidden sm:inline">2026</span>
            </motion.div>

            {/* Primary Name Headline with Shimmer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative my-2 sm:my-3"
            >
              <h1 className="font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight leading-[1.05] drop-shadow-[0_12px_32px_rgba(0,0,0,0.85)]">
                <span className="text-shimmer">Tanishq</span>{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-rose-500 to-red-600">
                  Bhosale
                </span>
              </h1>
            </motion.div>

            {/* Morphing Role Descriptor */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base md:text-lg font-medium text-neutral-200 mt-2 mb-4 h-8"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentRole}
                  initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="text-rose-400 font-semibold"
                >
                  {roles[currentRole]}
                </motion.span>
              </AnimatePresence>
              <span className="text-neutral-600">•</span>
              <span className="text-neutral-300">AI / ML Engineer</span>
              <span className="text-neutral-600 hidden sm:inline">•</span>
              <span className="text-neutral-400 text-xs sm:text-sm font-mono-code hidden sm:inline">
                Polaris School of Technology
              </span>
            </motion.div>

            {/* Value Proposition Statement / Intro Message */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-3xl text-sm sm:text-base md:text-lg text-neutral-300 font-normal leading-relaxed mb-8 px-4"
            >
              Hi, I'm Tanishq a Full-Stack Developer who enjoys turning ideas into clean, interactive, and scalable digital experiences. I love combining frontend, backend, AI, and motion to build products that feel as good as they work.
            </motion.p>

            {/* Primary & Secondary Call to Actions */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-8"
            >
              <button
                onClick={() => scrollToSection('projects')}
                data-cursor="WORK"
                className="btn-primary cursor-pointer px-6 py-3.5 text-sm sm:text-base font-semibold group relative overflow-hidden"
              >
                {/* Animated shine sweep on button */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <span className="relative">Explore Work</span>
                <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5 relative" />
              </button>

              <button
                onClick={() => scrollToSection('contact')}
                data-cursor="CONTACT"
                className="btn-secondary cursor-pointer px-6 py-3.5 text-sm sm:text-base font-medium group"
              >
                <Mail className="w-4 h-4 text-neutral-400 group-hover:text-rose-400 transition-colors" />
                <span>Get In Touch</span>
              </button>

              <a
                href="https://drive.google.com/file/d/15a1JQavD9AOKO9QJm_4z6s3UdsHsboDa/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="RESUME"
                className="btn-secondary px-5 py-3.5 text-sm sm:text-base font-medium group"
              >
                <FileText className="w-4 h-4 text-neutral-400 group-hover:text-rose-400 transition-colors" />
                <span>Resume</span>
              </a>
            </motion.div>

            {/* Direct Social / Quick Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex items-center gap-5 text-neutral-400"
            >
              <a
                href="https://github.com/TanishqBhosle"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="GITHUB"
                aria-label="GitHub Profile"
                className="p-2.5 rounded-full border border-white/5 bg-white/[0.03] hover:text-white hover:border-white/20 hover:bg-white/[0.08] transition-all hover:scale-110"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/tanishqbhosale/"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="LINKEDIN"
                aria-label="LinkedIn Profile"
                className="p-2.5 rounded-full border border-white/5 bg-white/[0.03] hover:text-white hover:border-white/20 hover:bg-white/[0.08] transition-all hover:scale-110"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <div className="h-4 w-[1px] bg-white/10" />
              <div className="flex items-center gap-1.5 text-xs font-mono-code text-neutral-500">
                <Sparkles className="w-3.5 h-3.5 text-rose-400/80" />
                <span>React 19 • Three.js • PyTorch</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Elegant Minimal Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.8 }}
        onClick={() => scrollToSection('about')}
        className="relative z-10 flex flex-col items-center gap-2 cursor-pointer group pt-4"
      >
        <div className="w-5 h-8 rounded-full border border-white/20 group-hover:border-rose-400/80 flex items-start justify-center p-1 transition-colors">
          <motion.div
            animate={{ y: [0, 10, 0], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1 h-1.5 rounded-full bg-rose-400"
          />
        </div>
        <span className="text-[10px] font-mono-code text-neutral-400 group-hover:text-white tracking-[0.25em] uppercase transition-colors">
          SCROLL
        </span>
      </motion.div>
    </section>
  );
};
