import type { Variants } from 'framer-motion';

// Premium Easing Curve
export const PREMIUM_EASING = [0.22, 1, 0.36, 1] as const;

// Low-bounce Spring Configuration for Soft Pop-Up
export const SOFT_POP_SPRING = {
  type: 'spring',
  stiffness: 120,
  damping: 16,
} as const;

// Default Viewport Trigger Config
export const DEFAULT_VIEWPORT = {
  once: true,
  amount: 0.2,
} as const;

// 1. Heading & Badge Soft Pop Variant
export const headingSoftPopVariant: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: PREMIUM_EASING,
    },
  },
};

// 2. Paragraph & Subtitle Fade-Up Variant
export const textRevealVariant: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 0.1,
      ease: PREMIUM_EASING,
    },
  },
};

// 3. Staggered Container Variant for Card Pop-Up Grids
export const staggerGridContainerVariant: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.1,
    },
  },
};

// 4. Soft Card Pop-Up Variant (Opacity 0 -> 1, Scale 0.92 -> 1, Y 35px -> 0)
export const cardSoftPopVariant: Variants = {
  hidden: { opacity: 0, scale: 0.92, y: 35 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 16,
    },
  },
};

// 5. Featured Emphasis Card Pop-Up with Subtle Overshoot (Scale 1.02 -> 1)
export const featuredCardPopVariant: Variants = {
  hidden: { opacity: 0, scale: 0.90, y: 40 },
  visible: {
    opacity: 1,
    scale: [0.90, 1.02, 1],
    y: 0,
    transition: {
      duration: 0.65,
      ease: PREMIUM_EASING,
    },
  },
};

// 6. Directional Alternating Reveal (Left / Right)
export const slideFromLeftVariant: Variants = {
  hidden: { opacity: 0, x: -40, scale: 0.96 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      ease: PREMIUM_EASING,
    },
  },
};

export const slideFromRightVariant: Variants = {
  hidden: { opacity: 0, x: 40, scale: 0.96 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      ease: PREMIUM_EASING,
    },
  },
};

// 7. Large Image Soft Scale Reveal (Scale 1.05 -> 1 with Opacity Fade)
export const largeImageScaleRevealVariant: Variants = {
  hidden: { opacity: 0, scale: 1.05 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.75,
      ease: PREMIUM_EASING,
    },
  },
};

// 8. Admissions CTA Sequential Entrance Variant
export const ctaSequenceContainerVariant: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: PREMIUM_EASING,
      staggerChildren: 0.1,
    },
  },
};

export const ctaSequenceChildVariant: Variants = {
  hidden: { opacity: 0, scale: 0.94, y: 25 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 16,
    },
  },
};

// 9. Fade-Down Variant for Badges & Labels
export const fadeDownVariant: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: PREMIUM_EASING,
    },
  },
};

