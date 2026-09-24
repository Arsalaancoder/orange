import type { Variants } from 'framer-motion';

export const springTransition = {
  type: 'spring' as const,
  stiffness: 120,
  damping: 16,
};

export const cubicEaseTransition = {
  duration: 0.6,
  ease: [0.22, 1, 0.36, 1] as const,
};

export const softPopUpVariant: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.94,
    y: 30,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: springTransition,
  },
};

export const featuredOvershootVariant: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.92,
    y: 35,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      ...springTransition,
      stiffness: 140,
    },
  },
};

export const heroSequenceVariant: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.96,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: cubicEaseTransition,
  },
};

export const staggeredContainerVariant: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

export const fadeInScaleVariant: Variants = {
  hidden: { opacity: 0, scale: 1.05 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: cubicEaseTransition,
  },
};
