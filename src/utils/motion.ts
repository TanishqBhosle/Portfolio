import { type Variants } from 'framer-motion';

export const MOTION_DURATIONS = {
  instant: 0.15,
  fast: 0.25,
  normal: 0.45,
  section: 0.75,
  cinematic: 1.1,
} as const;

export const EASINGS = {
  easeOutCubic: [0.215, 0.61, 0.355, 1] as const,
  easeOutQuart: [0.165, 0.84, 0.44, 1] as const,
  easeCinematic: [0.16, 1, 0.3, 1] as const,
  easeInOutCubic: [0.645, 0.045, 0.355, 1] as const,
} as const;

export const SPRINGS = {
  snappy: { type: 'spring', stiffness: 450, damping: 30, mass: 0.5 },
  smooth: { type: 'spring', stiffness: 280, damping: 24, mass: 0.8 },
  physicsDrop: { type: 'spring', stiffness: 220, damping: 18, mass: 1.1 },
  magnetic: { type: 'spring', stiffness: 350, damping: 20, mass: 0.1 },
} as const;

export const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: MOTION_DURATIONS.normal,
      delay,
      ease: EASINGS.easeCinematic,
    },
  }),
};

export const fadeScaleVariant: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: MOTION_DURATIONS.normal,
      delay,
      ease: EASINGS.easeCinematic,
    },
  }),
};

export const staggerContainerVariant: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const objectDropVariant: Variants = {
  hidden: {
    opacity: 0,
    y: -180,
    rotate: -12,
    scale: 0.85,
  },
  visible: (customIndex = 0) => ({
    opacity: 1,
    y: 0,
    rotate: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 180,
      damping: 16,
      mass: 0.9,
      delay: customIndex * 0.12,
    },
  }),
};
