import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface IntroSequenceProps {
  onComplete: () => void;
}

export const IntroSequence: React.FC<IntroSequenceProps> = ({ onComplete }) => {
  const prefersReduced = useReducedMotion();
  const [visible, setVisible] = useState(true);

  const handleFinish = React.useCallback(() => {
    setVisible(false);
    setTimeout(onComplete, 400);
  }, [onComplete]);

  useEffect(() => {
    if (prefersReduced) {
      onComplete();
      return;
    }

    // Auto complete after 1.4s
    const timer = setTimeout(() => {
      handleFinish();
    }, 1400);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        handleFinish();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [prefersReduced, handleFinish, onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(10px)' }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          onClick={handleFinish}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#07070a] text-white select-none cursor-pointer"
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute w-[500px] h-[500px] rounded-full bg-rose-500/10 blur-[140px] pointer-events-none" />

          {/* Elegant Monogram / Name Reveal */}
          <div className="relative z-10 flex flex-col items-center text-center px-4">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="w-24 h-[1px] bg-gradient-to-r from-transparent via-rose-500 to-transparent mb-5"
            />

            <motion.h1
              initial={{ opacity: 0, y: 15, letterSpacing: '0.05em' }}
              animate={{ opacity: 1, y: 0, letterSpacing: '0.15em' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-bold text-3xl sm:text-5xl md:text-6xl text-white tracking-[0.15em] uppercase"
            >
              Tanishq Bhosale
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="mt-3 font-mono-code text-xs sm:text-sm text-neutral-400 tracking-[0.3em] uppercase"
            >
              Full-Stack Developer & AI Engineer
            </motion.p>
          </div>

          {/* Subtle Skip Hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="absolute bottom-8 text-[11px] font-mono-code text-neutral-500 tracking-widest uppercase"
          >
            Click or [ESC] to Skip
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
