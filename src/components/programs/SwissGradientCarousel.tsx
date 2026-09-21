import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Program } from '@/data/programs';
import { ArrowRight, ChevronLeft, ChevronRight, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

interface SwissGradientCarouselProps {
  programs: Program[];
}

const GRADIENTS = [
  'from-[#121325] via-[#2A0612] to-[#B0001A]', // Card 01 - Crimson Dark Ink
  'from-[#82C3CB] via-[#3590A0] to-[#00497B]', // Card 02 - Cyan Ocean
  'from-[#F5A34A] via-[#D82000] to-[#400202]', // Card 03 - Vivid Orange Burgundy
  'from-[#701030] via-[#C00040] to-[#FF2050]', // Card 04 - Magenta Fiery Red
  'from-[#3A1408] via-[#751A10] to-[#E52830]', // Card 05 - Sand Burgundy
  'from-[#D93010] via-[#A00010] to-[#400008]'  // Card 06 - Fiery Crimson
];

const MONO_SPECS: Record<string, string[]> = {
  DMLT: ['INTER BIPC / MPC', 'GOVT APPROVED', 'PATHOLOGY LABS'],
  Nursing: ['INTER BIPC 10+2', 'GOVT & INC RECOG', 'MULTISPECIALTY'],
  GNM: ['INTER ANY GROUP', '3 YEAR DIPLOMA', 'CLINICAL CARE'],
  DOA: ['INTER BIPC / MPC', '2 YEAR DIPLOMA', 'EYE HOSPITALS'],
  DMIT: ['INTER BIPC / MPC', '2 YEAR DIPLOMA', 'MRI & CT LABS'],
  DANS: ['INTER BIPC / MPC', '2 YEAR DIPLOMA', 'OT & ICU UNITS']
};

export const SwissGradientCarousel: React.FC<SwissGradientCarouselProps> = ({ programs }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % programs.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + programs.length) % programs.length);
  };

  return (
    <div className="relative py-12 md:py-16 overflow-hidden">
      {/* Top Header Badge */}
      <div className="text-center mb-8 flex items-center justify-center gap-2">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#8B5CF6] flex items-center gap-1.5 bg-[#EBE2FF] px-3.5 py-1 rounded-full border border-[#D8C4FF]">
          <span className="text-[#8B5CF6] font-extrabold">+</span> Swiss Gradients Carousel
        </span>
      </div>

      {/* Radial Fan Carousel Canvas Container */}
      <div className="relative min-h-[520px] md:min-h-[580px] flex items-center justify-center max-w-7xl mx-auto px-4">
        <div className="relative w-full flex justify-center items-center">
          {programs.map((program, index) => {
            // Calculate distance relative to activeIndex for radial arc curve
            const total = programs.length;
            let offset = index - activeIndex;
            
            // Adjust offset for circular wrapping
            if (offset > Math.floor(total / 2)) offset -= total;
            if (offset < -Math.floor(total / 2)) offset += total;

            const isActive = offset === 0;

            // Compute radial fan rotation angle and translation offsets (Swiss Gradients Arc Spread)
            const rotationAngle = offset * 14; // e.g. -28deg, -14deg, 0deg, 14deg, 28deg
            const translateX = offset * 210;   // horizontal spreading
            const translateY = Math.abs(offset) * 22 - (isActive ? 15 : 0); // vertical arch curve
            const scale = isActive ? 1.05 : Math.max(0.82, 1 - Math.abs(offset) * 0.08);
            const zIndex = 30 - Math.abs(offset) * 5;
            const opacity = Math.abs(offset) > 2 ? 0.35 : 1;

            const gradientBg = GRADIENTS[index % GRADIENTS.length];
            const courseNum = String(index + 1).padStart(2, '0');
            const specs = MONO_SPECS[program.code] || ['ACADEMIC COURSE', 'TELANGANA CAMPUS', 'CLINICAL TRAINING'];

            return (
              <motion.div
                key={program.id}
                onClick={() => setActiveIndex(index)}
                initial={false}
                animate={{
                  x: translateX,
                  y: translateY,
                  rotate: rotationAngle,
                  scale: scale,
                  zIndex: zIndex,
                  opacity: opacity
                }}
                transition={{
                  type: 'spring',
                  stiffness: 260,
                  damping: 24
                }}
                className="absolute w-[290px] sm:w-[320px] md:w-[350px] cursor-pointer"
                style={{ originY: 0.8 }}
              >
                {/* Swiss Gradient Card with Full-Fill Program Photo */}
                <div
                  className={`rounded-[2.2rem] p-5 md:p-6 text-white shadow-2xl transition-shadow duration-300 border border-white/20 flex flex-col justify-between h-[510px] md:h-[540px] relative overflow-hidden group ${
                    isActive ? 'shadow-purple-500/40 ring-2 ring-white/50' : 'hover:brightness-110'
                  }`}
                >
                  {/* Full-Card Image Layer (Image Fills the Entire Card - Bright & Vivid) */}
                  {program.imageUrl ? (
                    <div className="absolute inset-0 z-0 overflow-hidden">
                      <img
                        src={program.imageUrl}
                        alt={program.fullTitle}
                        className="w-full h-full object-cover object-center brightness-[1.18] saturate-[1.1] contrast-[1.04] group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      {/* Vibrant Swiss Gradient Accent Tint */}
                      <div className={`absolute inset-0 bg-gradient-to-b ${gradientBg} opacity-30 mix-blend-overlay pointer-events-none`} />
                      {/* Subtle Bottom-To-Top Gradient Tint for Text Legibility without darkening photo */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10 pointer-events-none" />
                    </div>
                  ) : (
                    <div className={`absolute inset-0 bg-gradient-to-b ${gradientBg} z-0`} />
                  )}

                  {/* Top Bar: Vertical Text Left + Big Number Right */}
                  <div className="flex items-start justify-between relative z-10">
                    <div className="flex items-center gap-2">
                      <span className="[writing-mode:vertical-lr] rotate-180 uppercase text-[9px] font-mono tracking-widest text-white/90 font-semibold select-none drop-shadow-sm">
                        ORANGE PARAMEDICAL ™
                      </span>
                    </div>
                    <div className="font-mono text-3xl md:text-4xl font-extrabold text-white tracking-tighter drop-shadow-md">
                      {courseNum}
                    </div>
                  </div>

                  {/* Content: Title, Category Badge, Overview */}
                  <div className="space-y-3 relative z-10 my-auto">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] font-bold border border-white/30 shadow-sm">
                      <GraduationCap className="w-3.5 h-3.5" />
                      {program.category}
                    </span>

                    <h3 className="text-xl md:text-2xl font-bold text-white leading-snug tracking-tight drop-shadow-md">
                      {program.fullTitle}
                    </h3>

                    <p className="text-xs text-white/90 line-clamp-3 leading-relaxed font-sans drop-shadow-sm">
                      {program.overview}
                    </p>
                  </div>

                  {/* Bottom Divider & Mono Code Text Block */}
                  <div className="pt-3.5 border-t border-white/30 relative z-10 flex items-end justify-between backdrop-blur-[2px]">
                    <div className="space-y-0.5 font-mono text-[9.5px] text-white/90 font-medium leading-tight tracking-wider uppercase drop-shadow-sm">
                      {specs.map((line, i) => (
                        <div key={i}>{line}</div>
                      ))}
                    </div>

                    <Link
                      to={`/programs/${program.slug}`}
                      onClick={(e) => e.stopPropagation()}
                      className="w-10 h-10 rounded-full bg-white text-[#101820] flex items-center justify-center shadow-lg hover:scale-110 hover:bg-purple-100 transition-all duration-300 shrink-0"
                      title="Explore Program"
                    >
                      <ArrowRight className="w-4 h-4 text-[#101820]" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Carousel Navigation Controls */}
      <div className="flex items-center justify-center gap-6 mt-6 relative z-40">
        <button
          onClick={handlePrev}
          className="w-12 h-12 rounded-full bg-white text-[#1F192F] border border-[#E8D9FF] flex items-center justify-center shadow-md hover:bg-[#8B5CF6] hover:text-white transition-all cursor-pointer hover:scale-110"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Carousel Indicators */}
        <div className="flex items-center gap-2">
          {programs.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-2.5 rounded-full transition-all cursor-pointer ${
                activeIndex === idx
                  ? 'w-8 bg-[#8B5CF6]'
                  : 'w-2.5 bg-[#D8C4FF] hover:bg-[#8B5CF6]/50'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="w-12 h-12 rounded-full bg-white text-[#1F192F] border border-[#E8D9FF] flex items-center justify-center shadow-md hover:bg-[#8B5CF6] hover:text-white transition-all cursor-pointer hover:scale-110"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
