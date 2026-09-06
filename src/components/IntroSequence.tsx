import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Terminal, ArrowRight } from 'lucide-react';

interface IntroSequenceProps {
  onComplete: () => void;
}

export const IntroSequence: React.FC<IntroSequenceProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('BOOT_SEQUENCE_START');
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Simulated system boot ticker
    const timer1 = setTimeout(() => {
      setProgress(32);
      setStatusText('MOUNTING_NEURAL_MODELS');
    }, 400);

    const timer2 = setTimeout(() => {
      setProgress(68);
      setStatusText('SYNCHRONIZING_SYSTEMS_DATA');
    }, 1100);

    const timer3 = setTimeout(() => {
      setProgress(100);
      setStatusText('SYSTEM_OPERATIONAL_READY');
    }, 1900);

    const timer4 = setTimeout(() => {
      handleComplete();
    }, 2800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  const handleComplete = () => {
    setIsClosing(true);
    setTimeout(() => {
      onComplete();
    }, 700);
  };

  return (
    <AnimatePresence>
      {!isClosing && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.7, ease: [0.77, 0, 0.175, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#070709] text-white px-6 overflow-hidden select-none"
        >
          {/* Subtle background glow */}
          <div className="absolute w-[500px] h-[500px] rounded-full bg-red-600/10 blur-[140px] pointer-events-none" />

          {/* Aperture lines */}
          <div className="absolute inset-x-0 top-12 flex justify-between px-8 text-xs font-mono text-zinc-600 tracking-widest pointer-events-none">
            <span>SYS_VERSION: 2.0.26</span>
            <span>NODE: IN_BLR_01</span>
          </div>

          <div className="relative z-10 flex flex-col items-center text-center max-w-2xl">
            {/* Monogram emblem */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="relative mb-8"
            >
              <div className="w-20 h-20 rounded-2xl border border-red-500/40 bg-zinc-950/80 flex items-center justify-center shadow-[0_0_40px_rgba(239,68,68,0.3)] backdrop-blur-md">
                <span className="font-display font-black text-3xl tracking-tight bg-gradient-to-br from-white via-zinc-200 to-red-500 bg-clip-text text-transparent">
                  TB
                </span>
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-2 rounded-3xl border border-red-500/20 border-dashed pointer-events-none"
              />
            </motion.div>

            {/* Title / Name reveal */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-3"
            >
              <div className="flex items-center justify-center gap-2 text-xs uppercase font-mono tracking-[0.3em] text-red-400">
                <Sparkles className="w-3.5 h-3.5 text-red-500 animate-pulse" />
                <span>Cinematic Portfolio Experience</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-display font-extrabold tracking-tight text-white uppercase">
                Tanishq <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-amber-500">Bhosale</span>
              </h1>

              <p className="text-zinc-400 font-mono text-xs sm:text-sm tracking-widest uppercase max-w-lg mx-auto">
                Full-Stack Engineer & AI/ML Specialist
              </p>
            </motion.div>

            {/* Terminal Boot Progress Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-12 w-72 sm:w-80 flex flex-col gap-2"
            >
              <div className="h-1 w-full bg-zinc-800/80 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-red-600 via-rose-500 to-amber-500 rounded-full"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                />
              </div>

              <div className="flex justify-between items-center text-[11px] font-mono text-zinc-500">
                <span className="flex items-center gap-1 text-zinc-400">
                  <Terminal className="w-3 h-3 text-red-400" />
                  {statusText}
                </span>
                <span>{progress}%</span>
              </div>
            </motion.div>

            {/* Skip / Enter Action */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="mt-8"
            >
              <button
                onClick={handleComplete}
                className="group px-5 py-2 rounded-full border border-zinc-700/70 hover:border-red-500/60 bg-zinc-900/60 hover:bg-zinc-800/80 text-xs font-mono tracking-widest text-zinc-300 hover:text-white transition-all flex items-center gap-2 cursor-pointer shadow-lg"
              >
                <span>ENTER ARCHIVE</span>
                <ArrowRight className="w-3.5 h-3.5 text-red-400 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>

          <div className="absolute inset-x-0 bottom-8 flex justify-center text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
            Press Enter or click to fast-forward
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
