import React from 'react';
import { Link } from 'react-router-dom';
import type { College } from '@/data/colleges';
import { ArrowRight, MapPin, Building2, ShieldCheck, GraduationCap, Stethoscope } from 'lucide-react';
import { motion } from 'framer-motion';
import { cardSoftPopVariant } from '@/components/animations/motionVariants';

interface CollegeCardProps {
  college: College;
  index?: number;
  className?: string;
}

export const CollegeCard: React.FC<CollegeCardProps> = ({ college, className = '' }) => {
  const isNursing = college.category.includes('Nursing');
  const isDegree = college.category.includes('College');

  const getBadgeLabel = () => {
    if (college.category === 'Nursing College') return 'NURSING DEGREE';
    if (college.category === 'Nursing School') return 'GNM DIPLOMA';
    return 'PARAMEDICAL';
  };

  const Icon = isNursing ? (isDegree ? GraduationCap : Stethoscope) : Building2;

  return (
    <motion.article
      variants={cardSoftPopVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className={`group bg-white rounded-2xl border border-[#E3E6E5] overflow-hidden flex flex-col justify-between h-full transition-all duration-300 hover:border-[#F26A21]/50 hover:shadow-xl hover:-translate-y-1.5 relative ${className}`}
    >
      {/* Expanding Orange Accent Line at Bottom */}
      <span className="absolute bottom-0 left-0 h-[3px] w-0 bg-[#F26A21] transition-all duration-300 group-hover:w-full z-10" />

      <div>
        {/* Top Image Banner */}
        <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-[#F3F4F4]">
          <img
            src={college.heroImage || college.campusLifeImage}
            alt={college.name}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

          {/* Top Floating Badge */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
            <span className="px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-white/95 text-[#202426] backdrop-blur-xs shadow-xs border border-white/20">
              {getBadgeLabel()}
            </span>

            {college.registrationNumber && (
              <span className="font-mono text-[10px] font-semibold bg-[#101820]/90 text-white px-2 py-0.5 rounded border border-white/10 backdrop-blur-xs">
                Reg: {college.registrationNumber}
              </span>
            )}
          </div>

          {/* Location Overlay on Image */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-xs text-white/90 font-medium">
            <MapPin className="w-3.5 h-3.5 text-[#F26A21] shrink-0" />
            <span className="drop-shadow-xs">{college.locationGroup}</span>
          </div>
        </div>

        {/* Content Details */}
        <div className="p-6 space-y-4">
          <div className="space-y-1.5">
            <h3 className="text-xl font-bold font-serif-heading text-[#202426] group-hover:text-[#F26A21] transition-colors leading-tight">
              <Link to={`/colleges/${college.slug}`} className="focus:outline-none hover:underline">
                {college.name}
              </Link>
            </h3>
            <div className="flex items-center gap-1.5 text-xs text-[#667085] pt-0.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#F26A21] shrink-0" />
              <span className="truncate">{college.sponsor}</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-[#485056] leading-relaxed line-clamp-2 font-sans">
            {college.shortDescription}
          </p>
        </div>
      </div>

      {/* Footer Action */}
      <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-[#F3F4F4]">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#667085]">
          <Icon className="w-3.5 h-3.5 text-[#F26A21]" />
          <span>{college.category}</span>
        </div>

        <Link
          to={`/colleges/${college.slug}`}
          className="inline-flex items-center gap-2 text-xs font-bold text-[#F26A21] group-hover:text-[#D95412] transition-colors uppercase tracking-wider"
        >
          <span>Explore Institution</span>
          <span className="w-7 h-7 rounded-full bg-[#F26A21]/10 group-hover:bg-[#F26A21] text-[#F26A21] group-hover:text-white flex items-center justify-center transition-all duration-300 shrink-0">
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </span>
        </Link>
      </div>
    </motion.article>
  );
};

