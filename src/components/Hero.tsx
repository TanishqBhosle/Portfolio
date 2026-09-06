import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

interface HeroProps {
  replayKey?: number;
}

export const Hero: React.FC<HeroProps> = ({ replayKey = 0 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showTitle, setShowTitle] = useState(false);
  const [progress, setProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Parallax transformations as user scrolls down
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const videoY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const textScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const glowScale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);

  // Initial sequence: First 4.5s show ONLY the navbar and video (NO letters above video)
  // After 4.5s: Reveal "I AM TANISHQ BHOSALE • WELCOME TO MY WORLD"
  useEffect(() => {
    // If user has already scrolled down, reveal immediately
    if (window.scrollY > 40) {
      setShowTitle(true);
      setProgress(100);
      return;
    }

    setShowTitle(false);
    setProgress(0);

    // Restart background video if available
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }

    const duration = 4500; // 4.5 seconds
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);

      if (elapsed >= duration) {
        setShowTitle(true);
        clearInterval(interval);
      }
    }, 50);

    // If user initiates scroll before 4.5s, reveal title immediately
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setShowTitle(true);
        clearInterval(interval);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [replayKey]);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex flex-col justify-between items-center px-4 sm:px-8 py-16 overflow-hidden select-none"
    >
      {/* Cinematic Fullscreen Background Video Layer (unobstructed by letters) */}
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
          className="w-full h-full object-cover object-center filter brightness-95 contrast-105"
        >
          <source src="/videos/hero-reveal.mp4" type="video/mp4" />
          <source src="/videos/intro-reveal.mp4" type="video/mp4" />
        </video>

        {/* Ambient Dark Vignette & Radial Shadow */}
        <div className="absolute inset-0 bg-radial from-transparent via-[#050507]/45 to-[#050507] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-transparent to-[#050507]/75 pointer-events-none" />

        {/* Fine Scanline Texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.05]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '100% 3px',
          }}
        />
      </motion.div>

      {/* Red ambient center-stage spotlight */}
      <motion.div
        style={{ scale: glowScale }}
        animate={{
          opacity: showTitle ? [0.25, 0.45, 0.25] : 0.15,
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[900px] h-[350px] sm:h-[550px] bg-red-600/25 rounded-full blur-[160px] pointer-events-none"
      />

      {/* Subtle bottom progress bar during initial 4.5s countdown */}
      {!showTitle && (
        <div className="absolute bottom-0 inset-x-0 h-[2px] bg-white/5 z-20 overflow-hidden pointer-events-none">
          <motion.div
            className="h-full bg-gradient-to-r from-red-600 to-red-400 shadow-[0_0_8px_rgba(239,68,68,0.8)]"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* Spacer pushing content to vertical center below navbar */}
      <div className="h-16 sm:h-20 w-full" />

      {/* Monumental Composition: Appears AFTER 4.5s (clean video before that) */}
      <div className="relative z-10 flex flex-col items-center justify-center my-auto w-full max-w-6xl mx-auto">
        <AnimatePresence>
          {showTitle && (
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 30, filter: 'blur(12px)' }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              style={{ opacity: textOpacity, scale: textScale, y: contentY }}
              className="flex flex-col items-center text-center w-full px-2"
            >
              {/* Pure Typography Monument (NO box, NO background card, 100% synced with video) */}
              <div className="relative flex flex-col items-center justify-center w-full select-none">
                {/* Top header: ••• WELCOME TO MY WORLD ••• */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm md:text-base font-mono-code font-semibold tracking-[0.4em] text-neutral-200 uppercase mb-2 sm:mb-4 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]"
                >
                  <span className="text-red-500 font-bold">•••</span>
                  <span>WELCOME TO MY WORLD</span>
                  <span className="text-red-500 font-bold">•••</span>
                </motion.div>

                {/* Monumental Letters: I AM TANISHQ (smaller, clean, without badges) */}
                <div className="relative flex items-center justify-center my-2 sm:my-3">
                  <h1
                    style={{ fontFamily: "'Bebas Neue', 'Anton', sans-serif" }}
                    className="font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-tight tracking-wider uppercase text-transparent bg-clip-text bg-gradient-to-b from-red-500 via-red-600 to-red-800 drop-shadow-[0_8px_24px_rgba(0,0,0,0.95)] drop-shadow-[0_0_40px_rgba(220,38,38,0.5)] px-4 text-center"
                  >
                    I AM TANISHQ
                  </h1>
                </div>

                {/* Subtitle & Role Identifier (NO repeated TANISHQ) */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.7 }}
                  className="mt-6 sm:mt-8 flex flex-col items-center gap-1.5"
                >
                  <p className="font-mono-code text-xs sm:text-sm md:text-base text-neutral-300 uppercase tracking-[0.35em] font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                    FULL-STACK × AI/ML DEVELOPER
                  </p>
                  <p className="text-[10px] sm:text-xs font-mono-code text-neutral-400 tracking-[0.25em] uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                    POLARIS SCHOOL OF TECHNOLOGY • B.TECH CS (AI/ML)
                  </p>
                </motion.div>
              </div>

              {/* Cinematic Scroll Prompt */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.7 }}
                className="mt-6 sm:mt-8 flex flex-col items-center gap-2 cursor-pointer group"
                onClick={() => {
                  const about = document.getElementById('about');
                  if (about) about.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-5 h-8 rounded-full border border-red-500/60 group-hover:border-red-400 flex items-start justify-center p-1 shadow-[0_0_12px_rgba(239,68,68,0.3)] transition-colors"
                >
                  <motion.div
                    animate={{ y: [0, 10, 0], opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-1 h-1.5 rounded-full bg-red-500"
                  />
                </motion.div>
                <span className="text-[10px] font-mono-code text-neutral-400 group-hover:text-white tracking-[0.3em] uppercase transition-colors">
                  SCROLL TO EXPLORE
                </span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom padding anchor */}
      <div className="h-8 w-full" />
    </section>
  );
};
