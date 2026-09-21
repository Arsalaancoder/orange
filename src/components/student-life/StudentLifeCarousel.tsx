import React, { useState } from 'react';
import type { StudentLifeActivity } from '@/data/studentLife';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface StudentLifeCarouselProps {
  activities: StudentLifeActivity[];
}

export const StudentLifeCarousel: React.FC<StudentLifeCarouselProps> = ({ activities }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % activities.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + activities.length) % activities.length);
  };

  const activeActivity = activities[activeIndex];

  return (
    <div className="relative py-8 md:py-12 bg-gradient-to-b from-[#FAFAF8] via-white to-[#FAFAF8] rounded-3xl border border-[#E3E6E5] overflow-hidden my-6">
      {/* Top Header Eyebrow Title */}
      <div className="text-center mb-6">
        <h3 className="text-2xl md:text-3xl font-extrabold text-[#1F192F] tracking-tight">
          {activeActivity.title}
        </h3>
        <p className="text-xs md:text-sm font-bold uppercase tracking-widest text-[#8B5CF6] mt-1">
          {activeActivity.category} • Student Life Spotlight
        </p>
      </div>

      {/* Fan Coverflow Carousel Canvas */}
      <div className="relative min-h-[380px] sm:min-h-[440px] md:min-h-[480px] flex items-center justify-center max-w-6xl mx-auto px-4">
        {/* Left Arrow Button */}
        <button
          onClick={handlePrev}
          className="absolute left-2 sm:left-6 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#F26A21] hover:bg-[#d85814] text-white flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-purple-500"
          aria-label="Previous Activity"
        >
          <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
        </button>

        {/* Right Arrow Button */}
        <button
          onClick={handleNext}
          className="absolute right-2 sm:right-6 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#F26A21] hover:bg-[#d85814] text-white flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-purple-500"
          aria-label="Next Activity"
        >
          <ChevronRight className="w-6 h-6 stroke-[2.5]" />
        </button>

        {/* Cards Stack */}
        <div className="relative w-full flex justify-center items-center h-[340px] sm:h-[400px] md:h-[430px]">
          {activities.map((act, index) => {
            const total = activities.length;
            let offset = index - activeIndex;

            if (offset > Math.floor(total / 2)) offset -= total;
            if (offset < -Math.floor(total / 2)) offset += total;

            const absOffset = Math.abs(offset);
            const isVisible = absOffset <= 2;

            if (!isVisible) return null;

            // Compute coverflow 3D transforms
            const isActive = offset === 0;
            const xPos = offset * 180; // horizontal separation
            const zIndex = 30 - absOffset * 10;
            const scale = isActive ? 1.05 : absOffset === 1 ? 0.85 : 0.7;
            const opacity = isActive ? 1 : absOffset === 1 ? 0.65 : 0.35;
            const rotateY = offset * -12; // 3D angle tilt
            const blur = isActive ? 'none' : 'grayscale(15%)';

            return (
              <motion.div
                key={act.id}
                onClick={() => setActiveIndex(index)}
                initial={false}
                animate={{
                  x: xPos,
                  scale: scale,
                  opacity: opacity,
                  rotateY: rotateY,
                  zIndex: zIndex,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 260,
                  damping: 26,
                }}
                className={`absolute top-0 w-[260px] sm:w-[320px] md:w-[360px] h-[340px] sm:h-[400px] md:h-[430px] rounded-3xl overflow-hidden cursor-pointer shadow-2xl border ${
                  isActive ? 'border-[#8B5CF6] ring-4 ring-[#8B5CF6]/20' : 'border-gray-200'
                }`}
                style={{
                  filter: blur,
                  transformStyle: 'preserve-3d',
                }}
              >
                <div className="relative w-full h-full bg-gray-900">
                  {act.imageUrl ? (
                    <img
                      src={act.imageUrl}
                      alt={act.title}
                      className="w-full h-full object-cover object-center"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-purple-900 to-indigo-900 flex items-center justify-center p-6 text-white text-center font-bold">
                      {act.title}
                    </div>
                  )}

                  {/* Gradient Overlay for text contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-5 md:p-6 text-white">
                    <span className="inline-block px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-[#8B5CF6] text-white w-fit mb-2 shadow-md">
                      {act.category}
                    </span>
                    <h4 className="text-lg sm:text-xl font-extrabold text-white leading-tight mb-1">
                      {act.title}
                    </h4>
                    <p className="text-xs text-gray-200 line-clamp-2 leading-relaxed">
                      {act.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bottom Subtitle Caption & Pagination Dots */}
      <div className="text-center mt-6 space-y-3">
        <div className="inline-flex items-center justify-center gap-1.5">
          {activities.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === activeIndex
                  ? 'w-8 bg-[#8B5CF6]'
                  : 'w-2.5 bg-gray-300 hover:bg-purple-300'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
        <p className="text-xs font-semibold text-[#667085] uppercase tracking-wider">
          {activeActivity.description}
        </p>
      </div>
    </div>
  );
};
