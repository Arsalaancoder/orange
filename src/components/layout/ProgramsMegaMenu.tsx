import React from 'react';
import { Link } from 'react-router-dom';
import { programsData } from '@/data/programs';
import {
  GraduationCap, Stethoscope, Microscope, Activity, ArrowRight,
  ShieldCheck, Clock
} from 'lucide-react';
import { motion } from 'framer-motion';

interface ProgramsMegaMenuProps {
  onClose: () => void;
}

const dropdownVariant = {
  hidden: { opacity: 0, y: 6, scale: 0.99 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] as const } },
  exit: { opacity: 0, y: 4, scale: 0.99, transition: { duration: 0.15 } }
};

export const ProgramsMegaMenu: React.FC<ProgramsMegaMenuProps> = ({ onClose }) => {
  const nursingDegrees = programsData.filter(p => p.slug === 'bsc-nursing');
  const nursingDiplomas = programsData.filter(p => p.slug === 'gnm');
  const paramedicalPrimary = programsData.filter(p => p.category === 'Paramedical' && ['dmlt', 'doa', 'dmit'].includes(p.slug));
  const alliedOther = programsData.filter(p => p.category === 'Paramedical' && !['dmlt', 'doa', 'dmit'].includes(p.slug));

  return (
    <motion.div
      id="programs-mega-menu"
      variants={dropdownVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="mx-auto w-full max-w-[1240px] pt-2 pointer-events-auto max-h-[calc(100vh-120px)] overflow-y-auto"
      role="region"
      aria-label="Programs Mega Menu"
    >
      <div className="bg-white rounded-2xl border border-[#E5E2DC] shadow-2xl p-7 lg:p-8 flex flex-col justify-between overflow-hidden">
        
        {/* 4-Column Reference Layout Inspired by MailerLite Reference */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-6 border-b border-[#E5E2DC]">
          
          {/* Column 1: Nursing Degrees */}
          <div className="space-y-4">
            <div className="flex items-center gap-1.5 pb-2 border-b border-[#E5E2DC]/80 text-[#667085]">
              <GraduationCap className="w-4 h-4 text-[#F26A21]" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#202426]">
                NURSING DEGREES
              </span>
            </div>

            <div className="space-y-3.5">
              {nursingDegrees.map((prog) => (
                <Link
                  key={prog.id}
                  to={`/programs/${prog.slug}`}
                  onClick={onClose}
                  className="group block p-2.5 -mx-2.5 rounded-xl hover:bg-[#FAF8F5] transition-colors duration-150"
                >
                  <div className="flex items-center justify-between">
                    <h5 className="text-sm font-bold text-[#202426] group-hover:text-[#F26A21] transition-colors">
                      {prog.fullTitle}
                    </h5>
                    <span className="text-[9px] font-mono font-bold uppercase px-1.5 py-0.5 rounded bg-[#F26A21]/10 text-[#F26A21]">
                      {prog.code}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-[11px] text-[#667085] font-mono">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-[#F26A21]" /> {prog.duration}</span>
                    <span>•</span>
                    <span>Inter (BiPC)</span>
                  </div>
                  <p className="text-xs text-[#667085] leading-relaxed mt-1 font-sans line-clamp-2">
                    {prog.overview}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* Column 2: Nursing Diplomas */}
          <div className="space-y-4">
            <div className="flex items-center gap-1.5 pb-2 border-b border-[#E5E2DC]/80 text-[#667085]">
              <Stethoscope className="w-4 h-4 text-[#EA580C]" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#202426]">
                NURSING DIPLOMAS
              </span>
            </div>

            <div className="space-y-3.5">
              {nursingDiplomas.map((prog) => (
                <Link
                  key={prog.id}
                  to={`/programs/${prog.slug}`}
                  onClick={onClose}
                  className="group block p-2.5 -mx-2.5 rounded-xl hover:bg-[#FAF8F5] transition-colors duration-150"
                >
                  <div className="flex items-center justify-between">
                    <h5 className="text-sm font-bold text-[#202426] group-hover:text-[#F26A21] transition-colors">
                      {prog.fullTitle}
                    </h5>
                    <span className="text-[9px] font-mono font-bold uppercase px-1.5 py-0.5 rounded bg-[#EA580C]/10 text-[#EA580C]">
                      {prog.code}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-[11px] text-[#667085] font-mono">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-[#EA580C]" /> {prog.duration}</span>
                    <span>•</span>
                    <span>Inter Any Group</span>
                  </div>
                  <p className="text-xs text-[#667085] leading-relaxed mt-1 font-sans line-clamp-2">
                    {prog.overview}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* Column 3: Paramedical Diplomas */}
          <div className="space-y-4">
            <div className="flex items-center gap-1.5 pb-2 border-b border-[#E5E2DC]/80 text-[#667085]">
              <Microscope className="w-4 h-4 text-[#0D9488]" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#202426]">
                PARAMEDICAL DIPLOMAS
              </span>
            </div>

            <div className="space-y-3">
              {paramedicalPrimary.map((prog) => (
                <Link
                  key={prog.id}
                  to={`/programs/${prog.slug}`}
                  onClick={onClose}
                  className="group block p-2 -mx-2 rounded-xl hover:bg-[#FAF8F5] transition-colors duration-150"
                >
                  <div className="flex items-center justify-between">
                    <h5 className="text-xs sm:text-sm font-bold text-[#202426] group-hover:text-[#F26A21] transition-colors line-clamp-1">
                      {prog.fullTitle}
                    </h5>
                    <span className="text-[9px] font-mono font-bold uppercase px-1 py-0.2 rounded bg-[#0D9488]/10 text-[#0D9488] shrink-0 ml-1">
                      {prog.code}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#667085] leading-snug mt-0.5 font-sans line-clamp-1">
                    {prog.overview}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* Column 4: Allied Technical Courses */}
          <div className="space-y-4">
            <div className="flex items-center gap-1.5 pb-2 border-b border-[#E5E2DC]/80 text-[#667085]">
              <Activity className="w-4 h-4 text-[#2563EB]" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#202426]">
                ALLIED TECHNICAL
              </span>
            </div>

            <div className="space-y-2">
              {alliedOther.map((prog) => (
                <Link
                  key={prog.id}
                  to={`/programs/${prog.slug}`}
                  onClick={onClose}
                  className="group block p-2 -mx-2 rounded-xl hover:bg-[#FAF8F5] transition-colors duration-150"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#202426] group-hover:text-[#F26A21] transition-colors truncate">
                      {prog.fullTitle}
                    </span>
                    <span className="text-[9px] font-mono text-[#667085] shrink-0 ml-1">
                      {prog.code}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-4 flex items-center justify-between text-xs font-sans">
          <div className="flex items-center gap-2 text-[#667085]">
            <ShieldCheck className="w-4 h-4 text-[#F26A21]" />
            <span>Admissions open for 2026–2027 academic session</span>
          </div>

          <Link
            to="/programs"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 font-bold text-[#F26A21] hover:text-[#D95412] uppercase tracking-wider transition-colors group"
          >
            <span>View All Programs</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

      </div>
    </motion.div>
  );
};

export default ProgramsMegaMenu;
