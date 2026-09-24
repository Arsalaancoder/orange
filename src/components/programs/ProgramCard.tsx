import React from 'react';
import { Link } from 'react-router-dom';
import type { Program } from '@/data/programs';
import { ArrowRight, GraduationCap, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { cardSoftPopVariant } from '@/components/animations/motionVariants';

interface ProgramCardProps {
  program: Program;
  index?: number;
  className?: string;
}

export const ProgramCard: React.FC<ProgramCardProps> = ({ program, className = '' }) => {
  const isNursing = program.category === 'Nursing';
  const isDegree = isNursing && program.duration === '4 Years';

  return (
    <motion.article
      variants={cardSoftPopVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className={`group bg-white rounded-3xl border border-[#E5E2DC] shadow-xs hover:shadow-xl hover:border-[#F26A21]/40 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between h-full overflow-hidden relative ${className}`}
    >
      <div>
        {/* Top Image Banner */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#FAF8F5]">
          <img
            src={program.imageUrl || "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80"}
            alt={program.fullTitle}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

          {/* Code Badge Top Left */}
          <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full text-[11px] font-mono font-extrabold uppercase tracking-wider bg-white/95 text-[#202426] shadow-xs border border-white/40">
            {program.code}
          </span>

          {/* Top Right Arrow Button (Matching User Reference Design) */}
          <Link
            to={`/programs/${program.slug}`}
            className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white/90 text-[#202426] group-hover:bg-[#F26A21] group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-md backdrop-blur-xs"
            aria-label={`View details for ${program.fullTitle}`}
          >
            <ChevronRight className="w-4 h-4 stroke-[2.5]" />
          </Link>

          {/* Floating Pill Badges Bottom Left */}
          <div className="absolute bottom-3 left-3 flex items-center gap-2">
            {program.duration && (
              <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider bg-[#FFF7F2] text-[#F26A21] border border-[#FDE3D7] shadow-2xs">
                {program.duration}
              </span>
            )}
            <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider bg-[#F4FBF7] text-[#16A34A] border border-[#E1F5EA] shadow-2xs">
              {isDegree ? 'Undergraduate Degree' : 'Diploma'}
            </span>
          </div>
        </div>

        {/* Card Content Body */}
        <div className="p-6 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#F26A21]">
              {program.category.toUpperCase()} PROGRAM
            </span>
          </div>

          <h3 className="text-xl font-bold font-serif-heading text-[#1E293B] group-hover:text-[#F26A21] transition-colors leading-snug">
            <Link to={`/programs/${program.slug}`} className="focus:outline-none hover:underline">
              {program.fullTitle}
            </Link>
          </h3>

          <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed line-clamp-2 font-sans">
            {program.overview}
          </p>
        </div>
      </div>

      {/* Card Footer */}
      <div className="px-6 pb-6 pt-3 border-t border-[#F1F3F4] flex items-center justify-between text-xs font-sans">
        {program.eligibility ? (
          <span className="text-[11px] text-[#64748B] flex items-center gap-1.5 truncate pr-2">
            <GraduationCap className="w-3.5 h-3.5 text-[#16A34A] shrink-0" />
            <span className="truncate">{program.eligibility}</span>
          </span>
        ) : (
          <span className="text-[11px] text-[#64748B] font-mono">Degree / Diploma</span>
        )}

        <Link
          to={`/programs/${program.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F26A21] group-hover:text-[#D95412] uppercase tracking-wider transition-colors shrink-0"
        >
          <span>Explore</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.article>
  );
};

export default ProgramCard;
