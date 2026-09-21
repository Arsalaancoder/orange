import React from 'react';
import { Link } from 'react-router-dom';
import { programsData } from '@/data/programs';
import { ArrowRight, Clock, GraduationCap, Sparkles } from 'lucide-react';

interface ProgramsMegaMenuProps {
  onClose: () => void;
}

export const ProgramsMegaMenu: React.FC<ProgramsMegaMenuProps> = ({ onClose }) => {
  const nursingPrograms = programsData.filter(p => p.category === 'Nursing');
  const paramedicalPrimary = programsData.filter(p => p.category === 'Paramedical' && ['dmlt', 'doa', 'dmit'].includes(p.id));
  const alliedOther = programsData.filter(p => p.category === 'Paramedical' && !['dmlt', 'doa', 'dmit'].includes(p.id));

  return (
    <div
      id="programs-mega-menu"
      className="absolute top-full left-0 w-full z-50 pt-2 animate-in fade-in-50 slide-in-from-top-2 duration-200"
      role="region"
      aria-label="Programs Mega Menu"
    >
      <div className="bg-white rounded-2xl border border-[#E3E6E5] shadow-2xl p-8 max-w-[1100px] mx-auto flex flex-col justify-between space-y-8">
        <div>
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#E3E6E5]">
            <span className="text-xs font-bold text-[#F26A21] uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Explore Programs
            </span>
            <span className="text-xs text-[#667085]">
              Degree & Diploma Offerings in Telangana
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Nursing Programs (Primary Prominence) */}
            <div className="space-y-4 md:col-span-1 border-r border-[#E3E6E5]/60 pr-4">
              <div className="flex items-center gap-2">
                <h4 className="text-xs font-extrabold text-[#202426] uppercase tracking-wider bg-[#F26A21]/10 text-[#F26A21] px-2.5 py-1 rounded-md">
                  Nursing Degrees
                </h4>
              </div>

              <ul className="space-y-3">
                {nursingPrograms.map((prog) => (
                  <li key={prog.id}>
                    <Link
                      to={`/programs/${prog.slug}`}
                      onClick={onClose}
                      className="group flex flex-col p-3 rounded-xl bg-[#FAFAF8] hover:bg-white border border-[#E3E6E5] hover:border-[#F26A21]/30 transition-all shadow-2xs hover:shadow-sm"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-[#F26A21]">
                          {prog.code}
                        </span>
                        {prog.duration && (
                          <span className="text-[10px] font-medium text-[#667085] flex items-center gap-1">
                            <Clock className="w-3 h-3 text-[#F26A21]" />
                            {prog.duration}
                          </span>
                        )}
                      </div>
                      <span className="text-sm font-bold text-[#202426] group-hover:text-[#F26A21] transition-colors mt-1">
                        {prog.fullTitle}
                      </span>
                      {prog.eligibility && (
                        <span className="text-[11px] text-[#667085] flex items-center gap-1 mt-1">
                          <GraduationCap className="w-3 h-3 shrink-0" />
                          <span>{prog.eligibility}</span>
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Paramedical Primary */}
            <div className="space-y-4 md:col-span-1 border-r border-[#E3E6E5]/60 pr-4">
              <h4 className="text-xs font-extrabold text-[#202426] uppercase tracking-wider bg-[#F3F4F4] px-2.5 py-1 rounded-md">
                Paramedical Diplomas
              </h4>

              <ul className="space-y-2.5">
                {paramedicalPrimary.map((prog) => (
                  <li key={prog.id}>
                    <Link
                      to={`/programs/${prog.slug}`}
                      onClick={onClose}
                      className="group flex flex-col p-2.5 rounded-xl hover:bg-[#FAFAF8] border border-transparent hover:border-[#E3E6E5] transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-[#F26A21]">
                          {prog.code}
                        </span>
                        {prog.duration && (
                          <span className="text-[10px] text-[#667085]">
                            {prog.duration}
                          </span>
                        )}
                      </div>
                      <span className="text-sm font-bold text-[#202426] group-hover:text-[#F26A21] transition-colors line-clamp-1 mt-0.5">
                        {prog.fullTitle}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Allied / Specialized Programs */}
            <div className="space-y-4 md:col-span-1">
              <h4 className="text-xs font-extrabold text-[#202426] uppercase tracking-wider bg-[#F3F4F4] px-2.5 py-1 rounded-md">
                Allied Technical Courses
              </h4>

              <ul className="space-y-1.5">
                {alliedOther.map((prog) => (
                  <li key={prog.id}>
                    <Link
                      to={`/programs/${prog.slug}`}
                      onClick={onClose}
                      className="group flex items-center justify-between p-2 rounded-lg hover:bg-[#FAFAF8] transition-colors"
                    >
                      <div>
                        <span className="text-xs font-mono font-bold text-[#202426] group-hover:text-[#F26A21]">
                          {prog.code}
                        </span>
                        <span className="text-[11px] text-[#667085] block line-clamp-1">
                          {prog.fullTitle}
                        </span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-[#667085] opacity-0 group-hover:opacity-100 group-hover:text-[#F26A21] transition-all shrink-0" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Mega Menu Bottom Bar */}
        <div className="pt-4 border-t border-[#E3E6E5] flex items-center justify-between">
          <span className="text-xs text-[#667085]">
            Admissions open for 2026–2027 academic session
          </span>
          <Link
            to="/programs"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F26A21] hover:text-[#D95412] uppercase tracking-wider transition-colors group"
          >
            <span>View All Programs</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};
