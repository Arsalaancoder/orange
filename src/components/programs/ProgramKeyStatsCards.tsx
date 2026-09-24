import React from 'react';
import type { Program } from '@/data/programs';
import { Calendar, GraduationCap, HeartPulse, BookOpen, ChevronRight } from 'lucide-react';

interface ProgramKeyStatsCardsProps {
  program: Program;
  className?: string;
}

export const ProgramKeyStatsCards: React.FC<ProgramKeyStatsCardsProps> = ({ program, className = '' }) => {
  const isDegree = program.category === 'Nursing' && program.duration === '4 Years';

  const cards = [
    {
      id: 'duration',
      subtitle: 'DURATION',
      title: program.duration || '3 Years',
      description: 'A focused and comprehensive program to build your nursing career.',
      icon: Calendar,
      bgColor: 'bg-[#FFF8F5]',
      borderColor: 'border-[#FDEEE7]',
      hoverBorderColor: 'hover:border-[#F26A21]/40',
      iconBg: 'bg-[#FFEADF]',
      iconColor: 'text-[#F26A21]',
      btnBg: 'bg-[#FFF0E8]',
      btnText: 'text-[#F26A21]',
      btnHover: 'group-hover:bg-[#F26A21] group-hover:text-white',
    },
    {
      id: 'eligibility',
      subtitle: 'ELIGIBILITY',
      title: program.eligibility || 'Inter Any Group',
      description: 'Open to all intermediate students, any group.',
      icon: GraduationCap,
      bgColor: 'bg-[#F4FBF7]',
      borderColor: 'border-[#E1F5EA]',
      hoverBorderColor: 'hover:border-[#16A34A]/40',
      iconBg: 'bg-[#DDF5E8]',
      iconColor: 'text-[#16A34A]',
      btnBg: 'bg-[#E8F8F0]',
      btnText: 'text-[#16A34A]',
      btnHover: 'group-hover:bg-[#16A34A] group-hover:text-white',
    },
    {
      id: 'category',
      subtitle: 'CATEGORY',
      title: program.category,
      description: program.category === 'Nursing'
        ? 'Be a part of a noble profession dedicated to care and service.'
        : 'Specialized diagnostic technology supporting modern healthcare.',
      icon: HeartPulse,
      bgColor: 'bg-[#F5F8FF]',
      borderColor: 'border-[#E2ECFF]',
      hoverBorderColor: 'hover:border-[#2563EB]/40',
      iconBg: 'bg-[#DBE7FE]',
      iconColor: 'text-[#2563EB]',
      btnBg: 'bg-[#EBF2FF]',
      btnText: 'text-[#2563EB]',
      btnHover: 'group-hover:bg-[#2563EB] group-hover:text-white',
    },
    {
      id: 'level',
      subtitle: 'ACADEMIC LEVEL',
      title: isDegree ? 'Undergraduate Degree' : 'Professional Diploma',
      description: isDegree
        ? 'Gain industry-relevant skills with a recognized degree.'
        : 'Gain industry-relevant skills with a recognized diploma.',
      icon: BookOpen,
      bgColor: 'bg-[#FAFAFF]',
      borderColor: 'border-[#EEE7FF]',
      hoverBorderColor: 'hover:border-[#7C3AED]/40',
      iconBg: 'bg-[#ECE5FF]',
      iconColor: 'text-[#7C3AED]',
      btnBg: 'bg-[#F3EFFF]',
      btnText: 'text-[#7C3AED]',
      btnHover: 'group-hover:bg-[#7C3AED] group-hover:text-white',
    },
  ];

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 ${className}`}>
      {cards.map((card) => {
        const IconComponent = card.icon;
        return (
          <div
            key={card.id}
            className={`group relative p-6 sm:p-7 rounded-3xl ${card.bgColor} border ${card.borderColor} ${card.hoverBorderColor} shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden min-h-[210px]`}
          >
            {/* Top Row: Circular Icon & Top-Right Arrow Action */}
            <div className="flex items-center justify-between mb-5">
              <div className={`w-12 h-12 rounded-2xl ${card.iconBg} ${card.iconColor} flex items-center justify-center shadow-2xs border border-white/50`}>
                <IconComponent className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div className={`w-8 h-8 rounded-full ${card.btnBg} ${card.btnText} ${card.btnHover} flex items-center justify-center transition-all duration-300 shadow-2xs cursor-pointer`}>
                <ChevronRight className="w-4 h-4 stroke-[2.5]" />
              </div>
            </div>

            {/* Subtitle, Main Title, Description */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono font-extrabold uppercase tracking-widest text-[#7C8893] block">
                {card.subtitle}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-serif-heading text-[#1E293B] leading-tight">
                {card.title}
              </h3>
              <p className="text-xs text-[#64748B] leading-relaxed pt-1 font-sans">
                {card.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProgramKeyStatsCards;
