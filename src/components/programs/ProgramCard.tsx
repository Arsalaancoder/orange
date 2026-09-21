import React from 'react';
import { Link } from 'react-router-dom';
import type { Program } from '@/data/programs';
import { ImagePlaceholder } from '@/components/shared/ImagePlaceholder';
import { Clock, GraduationCap, ArrowRight, AlertCircle } from 'lucide-react';

interface ProgramCardProps {
  program: Program;
  index?: number;
  rotate?: string;
  tagLabel?: string;
}

const EXACT_ROTATIONS = [
  'md:-rotate-[7deg] md:translate-y-3 z-10',
  'md:-rotate-[3deg] md:-translate-y-2 z-20',
  'md:rotate-[1deg] md:translate-y-1 z-30',
  'md:rotate-[5deg] md:-translate-y-2 z-20',
  'md:-rotate-[3deg] md:translate-y-3 z-10',
  'md:rotate-[7deg] md:translate-y-5 z-0'
];

const TAG_STYLES = [
  'bg-[#FACC15] text-[#713F12] border-[#EAB308]', // Yellow Pill ("tokyo trip" style from reference image)
  'bg-[#EBE2FF] text-[#7C3AED] border-[#D8C4FF]',
  'bg-[#FCE7F3] text-[#9D174D] border-[#FBCFE8]',
  'bg-[#DCFCE7] text-[#166534] border-[#BBF7D0]',
  'bg-white/95 text-[#334155] border-[#E2E8F0] backdrop-blur-md', // Light Pill ("fav meal" style from reference image)
  'bg-[#FFEDD5] text-[#9A3412] border-[#FED7AA]'
];

const DEFAULT_TAGS: Record<string, string> = {
  DMLT: 'Pathology & Lab',
  Nursing: 'tokyo trip',
  GNM: 'General Nursing',
  DOA: 'Eye Care Tech',
  DMIT: 'fav meal',
  DANS: 'OT & Anesthesia'
};

export const ProgramCard: React.FC<ProgramCardProps> = ({ program, index = 0, rotate, tagLabel }) => {
  const courseNumber = index !== undefined ? String(index + 1).padStart(2, '0') : null;
  const rotationClass = rotate || EXACT_ROTATIONS[index % EXACT_ROTATIONS.length];
  const tagStyle = TAG_STYLES[index % TAG_STYLES.length];
  const floatingTag = tagLabel || (index === 0 ? 'tokyo trip' : index === 4 ? 'fav meal' : DEFAULT_TAGS[program.code] || program.category);

  return (
    <article 
      className={`group relative bg-white rounded-3xl border border-[#E9E1F7] p-2.5 flex flex-col h-full transition-all duration-300 ease-out transform ${rotationClass} hover:rotate-0 hover:scale-[1.06] hover:z-50 hover:shadow-2xl hover:shadow-purple-500/25 hover:border-[#8B5CF6]`}
    >
      {/* Floating Pill Tag Above Top Edge (Exact Reference Screenshot Design) */}
      <div className={`absolute -top-3.5 left-6 ${tagStyle} text-[11px] font-extrabold tracking-wide uppercase px-3.5 py-1 rounded-full shadow-md border z-30 transition-transform duration-300 group-hover:scale-105 group-hover:-translate-y-0.5`}>
        {floatingTag}
      </div>

      {/* Card Image Frame (Polaroid / Photo Card Style) */}
      <div className="relative overflow-hidden aspect-[16/10] bg-[#101820] rounded-2xl">
        <ImagePlaceholder
          label={program.imageLabel}
          imageUrl={program.imageUrl}
          aspectRatio="auto"
          className="rounded-none border-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Category Label */}
        <div className="absolute bottom-3 left-3 bg-[#8B5CF6] text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full shadow-md z-10">
          {program.category}
        </div>

        {/* Course Number (e.g. 01, 02, 03) */}
        {courseNumber && (
          <div className="absolute top-3 right-3 font-serif-heading font-bold text-lg md:text-xl text-white/90 bg-black/40 backdrop-blur-xs px-2.5 py-0.5 rounded-lg border border-white/20 group-hover:text-[#8B5CF6] group-hover:border-[#8B5CF6]/50 transition-colors z-10">
            {courseNumber}
          </div>
        )}
      </div>

      {/* Card Body (Typography strictly preserved) */}
      <div className="p-5 md:p-6 flex flex-col flex-1">
        {/* Code & Duration */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-xs font-mono font-bold text-[#7C3AED] uppercase tracking-wider">
            {program.code}
          </span>
          {program.duration && (
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#7C3AED] bg-[#F5EFFE] border border-[#E8D9FF] px-3 py-0.5 rounded-full">
              <Clock className="w-3 h-3 text-[#8B5CF6]" />
              {program.duration}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-lg md:text-xl font-bold text-[#1F192F] group-hover:text-[#7C3AED] transition-colors mb-3 leading-snug">
          <Link to={`/programs/${program.slug}`}>
            {program.fullTitle}
          </Link>
        </h3>

        {/* Overview */}
        <p className="text-sm text-[#667085] line-clamp-3 mb-6 flex-1 leading-relaxed">
          {program.overview}
        </p>

        {/* Footer */}
        <div className="pt-4 border-t border-[#F0E8FF] space-y-3 mt-auto">
          {/* Eligibility */}
          {program.eligibility && (
            <div className="flex items-center gap-2 text-xs font-medium text-[#667085]">
              <GraduationCap className="w-3.5 h-3.5 text-[#8B5CF6] shrink-0" />
              <span>Eligibility: <strong className="text-[#1F192F] font-semibold">{program.eligibility}</strong></span>
            </div>
          )}

          {/* Regulatory Notice */}
          {program.isSubjectToApproval && (
            <div className="p-2.5 bg-[#F5EFFE] rounded-xl border border-[#E8D9FF] flex items-start gap-2 text-[11px] text-[#667085] leading-snug">
              <AlertCircle className="w-3.5 h-3.5 text-[#8B5CF6] shrink-0 mt-0.5" />
              <span>Course availability, duration, and recognition subject to regulatory approval.</span>
            </div>
          )}

          {/* CTA Link */}
          <div className="pt-2 flex justify-end">
            <Link
              to={`/programs/${program.slug}`}
              className="inline-flex items-center gap-2 text-xs font-bold text-[#7C3AED] group-hover:text-[#6D28D9] uppercase tracking-wider transition-colors"
            >
              <span>Explore Program</span>
              <span className="w-6 h-6 rounded-full bg-[#EBE2FF] group-hover:bg-[#7C3AED] text-[#7C3AED] group-hover:text-white flex items-center justify-center transition-all duration-300">
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};

