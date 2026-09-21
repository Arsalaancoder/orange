import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface RevealProps {
  children: React.ReactNode;
  variant?: 'fadeUp' | 'fadeIn' | 'scaleUp' | 'slideRight';
  delay?: number;
  duration?: number;
  className?: string;
  amount?: number;
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  variant = 'fadeUp',
  delay = 0,
  duration = 0.5,
  className = '',
  amount = 0.2
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const variantsMap = {
    fadeUp: {
      hidden: { opacity: 0, y: 24 },
      visible: { opacity: 1, y: 0 }
    },
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 }
    },
    scaleUp: {
      hidden: { opacity: 0, scale: 0.96 },
      visible: { opacity: 1, scale: 1 }
    },
    slideRight: {
      hidden: { opacity: 0, x: -24 },
      visible: { opacity: 1, x: 0 }
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1] // Custom refined cubic bezier
      }}
      variants={variantsMap[variant]}
      className={className}
    >
      {children}
    </motion.div>
  );
};
