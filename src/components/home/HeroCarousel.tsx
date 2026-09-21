import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface HeroSlide {
  id: number;
  eyebrow: string;
  heading: React.ReactNode;
  supportingText: string;
  motto?: string;
  imageUrl?: string;
  imageLabel: string;
  imageSublabel: string;
  imageBgClass: string;
  buttons: Array<{
    label: string;
    href: string;
    variant: 'primary' | 'secondary';
  }>;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    eyebrow: 'ORANGE GROUP • NURSING & PARAMEDICAL COLLEGES',
    heading: (
      <>
        Empowering Healthcare Professionals.{' '}
        <span className="block text-[#F26A21] mt-1 font-serif italic font-normal">
          Building a Healthier Future.
        </span>
      </>
    ),
    supportingText:
      'Professional education in Nursing, Paramedical Sciences and Allied Healthcare through academic learning, practical training and professional development.',
    motto: 'LEARN. • PRACTICE. • SERVE.',
    imageUrl: '/images/hero/hero-slide-1.jpg',
    imageLabel: 'Clinical & Healthcare Training',
    imageSublabel: 'Modern Medical Technology Environment',
    imageBgClass: 'from-[#1A2632] via-[#101820] to-[#0A0F14]',
    buttons: [
      { label: 'Explore Programs', href: '/programs', variant: 'primary' },
      { label: 'Admissions Open', href: '/admissions#enquiry', variant: 'secondary' }
    ]
  },
  {
    id: 2,
    eyebrow: 'PRACTICAL LEARNING & CLASSROOM TRAINING',
    heading: (
      <>
        Learn Through{' '}
        <span className="text-[#F26A21] font-serif italic font-normal">
          Hands-On Experience.
        </span>
      </>
    ),
    supportingText:
      'Develop practical healthcare skills through modern classroom instruction, digital learning, training and clinical exposure.',
    imageUrl: '/images/hero/hero-slide-2.jpg',
    imageLabel: 'Medical Classroom & Digital Learning',
    imageSublabel: 'Interactive Instruction Facilities',
    imageBgClass: 'from-[#1B2A38] via-[#121D27] to-[#0B131B]',
    buttons: [
      { label: 'Explore Our Facilities', href: '/facilities', variant: 'primary' }
    ]
  },
  {
    id: 3,
    eyebrow: 'HEALTHCARE EDUCATION & MENTORSHIP',
    heading: (
      <>
        Knowledge. Skills.{' '}
        <span className="text-[#F26A21] font-serif italic font-normal">
          Compassion.
        </span>
      </>
    ),
    supportingText:
      'Education designed to build academic understanding, practical ability, professional discipline and student mentorship.',
    imageUrl: '/images/hero/hero-slide-3.jpg',
    imageLabel: 'Interactive Student Mentorship',
    imageSublabel: 'Textbook & Lab Skill Development',
    imageBgClass: 'from-[#222E3A] via-[#141C24] to-[#0C1218]',
    buttons: [
      { label: 'Why Orange Group?', href: '/about', variant: 'primary' },
      { label: 'View Programs', href: '/programs', variant: 'secondary' }
    ]
  }
];

const AUTOPLAY_DURATION_MS = 6000;

export const HeroCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  const currentSlide = HERO_SLIDES[currentIndex];

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  // Smooth Automatic Slide Carousel
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, AUTOPLAY_DURATION_MS);

    return () => clearInterval(timer);
  }, [handleNext]);

  return (
    <section
      role="region"
      aria-label="Homepage Hero Carousel"
      className="relative w-full bg-[#101820] text-white overflow-hidden flex flex-col justify-center py-16 md:py-24 lg:py-28 min-h-[580px] md:min-h-[660px]"
    >
      {/* BACKGROUND SLIDE IMAGES / OVERLAYS */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0.1 : 0.8, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            {/* Real Background Image with Slow Ken Burns Effect */}
            {currentSlide.imageUrl ? (
              <motion.div
                initial={shouldReduceMotion ? undefined : { scale: 1.08 }}
                animate={shouldReduceMotion ? undefined : { scale: 1.0 }}
                transition={{ duration: 6, ease: 'easeOut' }}
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${currentSlide.imageUrl})` }}
              />
            ) : (
              <div className={cn('absolute inset-0 bg-gradient-to-br', currentSlide.imageBgClass)} />
            )}

            {/* Premium Dark Gradient Readability Overlay */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-[#101820]/95 via-[#101820]/80 to-[#101820]/35"
              aria-hidden="true"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* EDITORIAL CONTENT AREA - Fully padded and cleanly centered */}
      <div className="relative z-10 w-full max-w-[1340px] mx-auto px-6 md:px-10 lg:px-16 my-auto">
        <div className="max-w-xl md:max-w-2xl lg:max-w-[720px] space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.id}
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 15 }}
              animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="space-y-6"
            >
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2.5 text-xs md:text-sm font-bold uppercase tracking-widest text-[#F26A21]">
                <span className="w-2 h-2 rounded-full bg-[#F26A21] shrink-0" aria-hidden="true" />
                <span>{currentSlide.eyebrow}</span>
              </div>

              {/* Editorial Heading */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif-heading font-extrabold text-white tracking-tight leading-[1.12]">
                {currentSlide.heading}
              </h1>

              {/* Supporting Text */}
              <p className="text-base md:text-lg text-gray-300 leading-relaxed font-sans max-w-xl">
                {currentSlide.supportingText}
              </p>

              {/* Slide 1 Motto Phrase */}
              {currentSlide.motto && (
                <div className="inline-flex items-center gap-3 text-xs md:text-sm font-bold uppercase tracking-widest text-white bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg border border-white/15">
                  <span>LEARN.</span>
                  <span className="text-[#F26A21]">•</span>
                  <span>PRACTICE.</span>
                  <span className="text-[#F26A21]">•</span>
                  <span>SERVE.</span>
                </div>
              )}

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                {currentSlide.buttons.map((btn, i) => (
                  <Link
                    key={i}
                    to={btn.href}
                    className={cn(
                      'inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-sm font-bold tracking-wide transition-all duration-200 cursor-pointer shadow-xs',
                      btn.variant === 'primary'
                        ? 'bg-[#F26A21] hover:bg-[#D95412] text-white'
                        : 'bg-white/10 hover:bg-white/20 text-white border border-white/25 backdrop-blur-xs'
                    )}
                  >
                    <span>{btn.label}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;
