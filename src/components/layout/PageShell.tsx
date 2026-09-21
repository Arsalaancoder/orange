import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ScrollToTop } from './ScrollToTop';
import { SEO } from '@/components/shared/SEO';
import { AdmissionsCTA } from '@/components/shared/AdmissionsCTA';
import { FloatingSocialActions } from '@/components/shared/FloatingSocialActions';
import { ScrollProgress } from '@/components/shared/ScrollProgress';
import { motion, useReducedMotion } from 'framer-motion';

interface PageShellProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  canonicalPath?: string;
  showAdmissionsCTA?: boolean;
  navbarMode?: 'solid' | 'transparent';
}

export const PageShell: React.FC<PageShellProps> = ({
  children,
  title,
  description,
  canonicalPath = '',
  showAdmissionsCTA = true,
  navbarMode = 'solid'
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF8] text-[#202426]">
      <ScrollProgress />
      <SEO title={title} description={description} canonicalPath={canonicalPath} />
      <ScrollToTop />
      <Navbar initialMode={navbarMode} />

      <motion.main
        className="flex-1 w-full"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.main>

      {showAdmissionsCTA && <AdmissionsCTA />}
      <Footer />
      <FloatingSocialActions />
    </div>
  );
};
