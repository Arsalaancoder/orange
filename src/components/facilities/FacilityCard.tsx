import React from 'react';
import type { Facility } from '@/data/facilities';
import { ImagePlaceholder } from '@/components/shared/ImagePlaceholder';

interface FacilityCardProps {
  facility: Facility;
}

export const FacilityCard: React.FC<FacilityCardProps> = ({ facility }) => {
  return (
    <article className="group bg-white rounded-3xl border border-[#E8D9FF] overflow-hidden flex flex-col h-full transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 hover:border-[#8B5CF6] hover:-translate-y-1">
      <div className="relative overflow-hidden">
        <ImagePlaceholder
          label={facility.imageLabel}
          imageUrl={facility.imageUrl}
          aspectRatio="4:3"
          className="rounded-none border-0 border-b border-[#E8D9FF] group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 bg-white/95 backdrop-blur-md text-[#7C3AED] text-[10px] font-bold rounded-full border border-[#E8D9FF] shadow-2xs uppercase tracking-wider">
            {facility.category}
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-lg md:text-xl font-bold text-[#1F192F] mb-2.5 group-hover:text-[#7C3AED] transition-colors">
          {facility.title}
        </h3>

        <p className="text-xs md:text-sm text-[#667085] leading-relaxed">
          {facility.description}
        </p>
      </div>
    </article>
  );
};
