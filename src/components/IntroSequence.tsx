import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface IntroSequenceProps {
  onComplete: () => void;
}

export const IntroSequence: React.FC<IntroSequenceProps> = ({ onComplete }) => {
  const prefersReduced = useReducedMotion();
  const [phase, setPhase] = useState<'black' | 'emerge' | 'title' | 'ready' | 'exit'>('black');
  const [progress, setProgress] = useState(0);
  const [timecode, setTimecode] = useState('00:00:00:00');
  const [audioActive, setAudioActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Play subtle cinematic low-frequency synth drone when sound enabled
  const toggleAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioActive) {
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioCtx();
        audioContextRef.current = ctx;

        // Sub bass drone oscillator
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(55, ctx.currentTime); // 55Hz (A1)
        osc.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 3);

        gain.gain.setValueAtTime(0.01, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 1.5);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        setAudioActive(true);
      } catch {
        setAudioActive(false);
      }
    } else {
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => { });
        audioContextRef.current = null;
      }
      setAudioActive(false);
    }
  };

  const handleSkip = React.useCallback(() => {
    if (audioContextRef.current) {
      try {
        audioContextRef.current.close().catch(() => { });
      } catch { }
    }
    setPhase('exit');
    setTimeout(onComplete, 700);
  }, [onComplete]);

  // Sequence Choreography
  useEffect(() => {
    if (prefersReduced) {
      onComplete();
      return;
    }

    const t1 = setTimeout(() => setPhase('emerge'), 350);
    const t2 = setTimeout(() => setPhase('title'), 1200);
    const t3 = setTimeout(() => setPhase('ready'), 3200);
    const t4 = setTimeout(() => {
      handleSkip();
    }, 5600);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        handleSkip();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      window.removeEventListener('keydown', handleKeyDown);
      if (audioContextRef.current) {
        try {
          audioContextRef.current.close().catch(() => { });
        } catch { }
      }
    };
  }, [onComplete, prefersReduced, handleSkip]);

  // Video Timecode & Progress tracker
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const cur = videoRef.current.currentTime;
      const dur = videoRef.current.duration || 5.6;
      const pct = Math.min(100, Math.round((cur / dur) * 100));
      setProgress(pct);

      const sec = Math.floor(cur);
      const frames = Math.floor((cur % 1) * 24);
      setTimecode(`00:00:0${sec}:${frames < 10 ? '0' : ''}${frames}`);
    }
  };

  const tanishqLetters = 'TANISHQ'.split('');
  const bhosaleLetters = 'BHOSALE'.split('');

  return (
    <AnimatePresence>
      {phase !== 'exit' && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04, filter: 'blur(14px)' }}
          transition={{ duration: 0.7, ease: [0.77, 0, 0.175, 1] }}
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-[#040406] text-[#f1f5f9] select-none overflow-hidden"
        >
          {/* Background Cinematic Video Layer */}
          <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
            <motion.video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              onTimeUpdate={handleTimeUpdate}
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{
                opacity: phase !== 'black' ? 0.65 : 0,
                scale: phase === 'ready' ? 1.0 : 1.05,
              }}
              transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full object-cover object-center filter brightness-95 contrast-110"
            >
              <source src="/videos/intro-reveal.mp4" type="video/mp4" />
              <source src="/videos/hero-reveal.mp4" type="video/mp4" />
            </motion.video>

            {/* Red Atmospheric Center Spotlight */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{
                opacity: phase !== 'black' ? 0.45 : 0,
                scale: phase !== 'black' ? 1.25 : 0.6,
              }}
              transition={{ duration: 2.0, ease: 'easeOut' }}
              className="absolute w-[680px] h-[680px] rounded-full bg-red-600/25 blur-[180px] pointer-events-none"
            />

            {/* Dark Cinematic Vignette & Radial Shadow */}
            <div className="absolute inset-0 bg-radial from-transparent via-[#040406]/40 to-[#040406] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#040406] via-transparent to-[#040406]/85 pointer-events-none" />

            {/* Fine Scanline Texture */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.06]"
              style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px)',
                backgroundSize: '100% 3px',
              }}
            />
          </div>

          {/* Top Letterbox Bar & Telemetry */}
          <div className="relative z-30 h-14 md:h-20 bg-black/90 border-b border-white/[0.06] backdrop-blur-sm px-6 md:px-12 flex items-center justify-between text-[10px] md:text-xs font-mono-code tracking-[0.25em] text-neutral-400 uppercase">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span className="text-red-400 font-bold">REC ● {timecode}</span>
              <span className="hidden sm:inline text-neutral-600">//</span>
              <span className="hidden sm:inline text-neutral-500">LUT: CINEDARK-RED</span>
            </div>

            <div className="hidden md:flex items-center gap-4 text-neutral-500">
              <span>VOL. 2026 // VISUAL IDENTITY</span>
              <span>•</span>
              <span>4K UHD 24FPS</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={toggleAudio}
                data-cursor="AUDIO"
                aria-label="Toggle synth audio"
                className="px-2.5 py-1 rounded border border-white/10 bg-white/[0.02] hover:bg-red-500/10 hover:border-red-500/40 text-[9px] md:text-[10px] text-neutral-300 transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span className={`w-1.5 h-1.5 rounded-full ${audioActive ? 'bg-emerald-400' : 'bg-neutral-600'}`} />
                <span>{audioActive ? 'SYNTH ON' : 'AUDIO OFF'}</span>
              </button>
            </div>
          </div>

          {/* Central Monumental Title Reveal */}
          <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 my-auto max-w-5xl mx-auto pointer-events-none">
            {/* Horizontal Laser Sweep Line */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{
                scaleX: phase !== 'black' ? 1 : 0,
                opacity: phase !== 'black' ? 1 : 0,
              }}
              transition={{ duration: 1.1, ease: [0.77, 0, 0.175, 1], delay: 0.15 }}
              className="w-48 sm:w-72 md:w-96 h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent mb-6 origin-center shadow-[0_0_15px_rgba(239,68,68,0.8)]"
            />

            {/* TANISHQ clipped letters */}
            <div className="overflow-hidden flex items-center justify-center">
              {tanishqLetters.map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ y: '130%', opacity: 0 }}
                  animate={{
                    y: phase === 'title' || phase === 'ready' ? 0 : '130%',
                    opacity: phase === 'title' || phase === 'ready' ? 1 : 0,
                  }}
                  transition={{
                    duration: 0.85,
                    ease: [0.77, 0, 0.175, 1],
                    delay: 0.08 + i * 0.035,
                  }}
                  className="font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight text-white inline-block drop-shadow-[0_10px_25px_rgba(0,0,0,0.9)]"
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            {/* BHOSALE clipped letters */}
            <div className="overflow-hidden flex items-center justify-center mt-1 sm:mt-2">
              {bhosaleLetters.map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ y: '-130%', opacity: 0 }}
                  animate={{
                    y: phase === 'title' || phase === 'ready' ? 0 : '-130%',
                    opacity: phase === 'title' || phase === 'ready' ? 1 : 0,
                  }}
                  transition={{
                    duration: 0.85,
                    ease: [0.77, 0, 0.175, 1],
                    delay: 0.28 + i * 0.035,
                  }}
                  className="font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-neutral-200 via-white to-red-500 inline-block drop-shadow-[0_10px_25px_rgba(0,0,0,0.9)]"
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            {/* Monospace Subtitle with Tracking Expand */}
            <motion.div
              initial={{ opacity: 0, letterSpacing: '-0.02em', y: 12 }}
              animate={{
                opacity: phase === 'title' || phase === 'ready' ? 1 : 0,
                letterSpacing: phase === 'title' || phase === 'ready' ? '0.35em' : '-0.02em',
                y: phase === 'title' || phase === 'ready' ? 0 : 12,
              }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.65 }}
              className="mt-6 sm:mt-8 font-mono-code text-xs sm:text-sm md:text-base text-neutral-300 uppercase font-medium tracking-[0.35em]"
            >
              FULL-STACK × AI/ML DEVELOPER
            </motion.div>

            {/* Academic Telemetry */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: phase === 'title' || phase === 'ready' ? 1 : 0,
              }}
              transition={{ duration: 1.0, delay: 0.9 }}
              className="mt-3 text-[10px] sm:text-xs font-mono-code text-neutral-500 tracking-[0.2em] uppercase"
            >
              POLARIS SCHOOL OF TECHNOLOGY • B.TECH CS (AI/ML)
            </motion.div>
          </div>

          {/* Bottom Letterbox Bar & Controls */}
          <div className="relative z-30 h-16 md:h-20 bg-black/90 border-t border-white/[0.06] backdrop-blur-sm px-6 md:px-12 flex items-center justify-between">
            {/* Progress Telemetry */}
            <div className="flex items-center gap-3 text-[10px] md:text-xs font-mono-code tracking-widest text-neutral-400 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              <span className="hidden sm:inline">SYSTEM BOOT:</span>
              <span className="text-white font-bold">{progress}%</span>
            </div>

            {/* Visual Laser Timeline Progress Bar */}
            <div className="hidden md:block w-72 lg:w-96 h-1 bg-white/10 rounded-full overflow-hidden mx-6">
              <motion.div
                className="h-full bg-gradient-to-r from-red-600 via-red-400 to-amber-300 shadow-[0_0_10px_rgba(239,68,68,1)]"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>

            {/* Skip / Enter Action */}
            <div className="flex items-center gap-4">
              <button
                onClick={handleSkip}
                data-cursor="ENTER"
                className="group relative px-5 py-2 rounded-lg border border-red-500/40 bg-red-950/20 hover:bg-red-600 hover:border-red-400 text-xs font-mono-code tracking-[0.2em] text-white transition-all duration-300 uppercase cursor-pointer flex items-center gap-2 shadow-[0_0_20px_rgba(239,68,68,0.2)] hover:shadow-[0_0_25px_rgba(239,68,68,0.5)]"
              >
                <span>ENTER ARCHIVE</span>
                <span className="text-neutral-400 group-hover:text-white transition-colors text-[10px]">[ESC]</span>
                <span className="w-1.5 h-1.5 rounded-full bg-white group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
