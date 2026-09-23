import React from 'react';
import { useScroll, motion, useSpring } from 'framer-motion';

export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[2.5px] z-50 pointer-events-none bg-transparent"
      aria-hidden="true"
    >
      <motion.div
        className="h-full bg-gradient-to-r from-rose-500 via-rose-400 to-amber-400 origin-left shadow-[0_0_8px_rgba(244,63,94,0.6)]"
        style={{ scaleX }}
      />
    </div>
  );
};
