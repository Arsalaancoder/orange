import React from 'react';
import { Link } from 'react-router-dom';
import { collegesData } from '@/data/colleges';
import {
  GraduationCap, Stethoscope, Building2, MapPin, ArrowRight,
  ShieldCheck, PhoneCall
} from 'lucide-react';
import { motion } from 'framer-motion';

interface CollegesMegaMenuProps {
  onClose: () => void;
}

const dropdownVariant = {
  hidden: { opacity: 0, y: 6, scale: 0.99 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] as const } },
  exit: { opacity: 0, y: 4, scale: 0.15 }
};

export const CollegesMegaMenu: React.FC<CollegesMegaMenuProps> = ({ onClose }) => {
  const nursingColleges = collegesData.filter(c => c.category === 'Nursing College');
  const nursingSchools = collegesData.filter(c => c.category === 'Nursing School');
  const paramedicalColleges = collegesData.filter(c => c.category === 'Paramedical College');

  return (
    <motion.div
      id="colleges-mega-menu"
      variants={dropdownVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="mx-auto w-full max-w-[1240px] pt-2 pointer-events-auto max-h-[calc(100vh-120px)] overflow-y-auto"
      role="region"
      aria-label="Colleges Mega Menu"
    >
      <div className="bg-white rounded-2xl border border-[#E5E2DC] shadow-2xl p-7 lg:p-8 flex flex-col justify-between overflow-hidden">
        
        {/* 4-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-6 border-b border-[#E5E2DC]">
          
          {/* Column 1: Nursing Colleges (Degree) */}
          <div className="space-y-4">
            <div className="flex items-center gap-1.5 pb-2 border-b border-[#E5E2DC]/80 text-[#667085]">
              <GraduationCap className="w-4 h-4 text-[#F26A21]" />
              <span className="text-[11px] font-mono font-extrabold uppercase tracking-wider text-[#202426]">
                NURSING COLLEGES
              </span>
            </div>

            <div className="space-y-3.5">
              {nursingColleges.map((college) => (
                <Link
                  key={college.id}
                  to={`/colleges/${college.slug}`}
                  onClick={onClose}
                  className="group block p-2.5 -mx-2.5 rounded-xl hover:bg-[#FAF8F5] transition-colors duration-150"
                >
                  <div className="flex items-center justify-between gap-1">
                    <h5 className="text-sm font-extrabold text-[#202426] group-hover:text-[#F26A21] transition-colors">
                      {college.name}
                    </h5>
                    <span className="text-[9px] font-mono font-extrabold uppercase px-1.5 py-0.5 rounded bg-[#F26A21]/10 text-[#F26A21] shrink-0">
                      B.Sc. Degree
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-[#485056] leading-relaxed mt-1 font-sans line-clamp-2">
                    {college.shortDescription}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* Column 2: Nursing Schools (GNM Diploma) */}
          <div className="space-y-4">
            <div className="flex items-center gap-1.5 pb-2 border-b border-[#E5E2DC]/80 text-[#667085]">
              <Stethoscope className="w-4 h-4 text-[#EA580C]" />
              <span className="text-[11px] font-mono font-extrabold uppercase tracking-wider text-[#202426]">
                NURSING SCHOOLS
              </span>
            </div>

            <div className="space-y-3">
              {nursingSchools.map((college) => {
                const locLabel = college.locationGroup.includes('Chengicherla')
                  ? 'Chengicherla'
                  : college.locationGroup.includes('Nagaram')
                  ? 'Nagaram'
                  : 'Nalgonda';
                return (
                  <Link
                    key={college.id}
                    to={`/colleges/${college.slug}`}
                    onClick={onClose}
                    className="group block p-2 -mx-2 rounded-xl hover:bg-[#FAF8F5] transition-colors duration-150"
                  >
                    <div className="flex items-center justify-between gap-1">
                      <h5 className="text-xs sm:text-sm font-extrabold text-[#202426] group-hover:text-[#F26A21] transition-colors truncate">
                        {college.name}
                      </h5>
                      <span className="text-[9px] font-mono font-extrabold uppercase px-1.5 py-0.5 rounded bg-[#EA580C]/10 text-[#EA580C] shrink-0">
                        {locLabel}
                      </span>
                    </div>
                    <p className="text-[11px] font-semibold text-[#485056] leading-snug mt-0.5 font-sans line-clamp-2">
                      {college.shortDescription}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Column 3: Paramedical Colleges */}
          <div className="space-y-4">
            <div className="flex items-center gap-1.5 pb-2 border-b border-[#E5E2DC]/80 text-[#667085]">
              <Building2 className="w-4 h-4 text-[#0D9488]" />
              <span className="text-[11px] font-mono font-extrabold uppercase tracking-wider text-[#202426]">
                PARAMEDICAL COLLEGES
              </span>
            </div>

            <div className="space-y-3.5">
              {paramedicalColleges.map((college) => (
                <Link
                  key={college.id}
                  to={`/colleges/${college.slug}`}
                  onClick={onClose}
                  className="group block p-2.5 -mx-2.5 rounded-xl hover:bg-[#FAF8F5] transition-colors duration-150"
                >
                  <div className="flex items-center justify-between gap-1">
                    <h5 className="text-sm font-extrabold text-[#202426] group-hover:text-[#F26A21] transition-colors">
                      {college.name}
                    </h5>
                    <span className="text-[9px] font-mono font-extrabold uppercase px-1.5 py-0.5 rounded bg-[#0D9488]/10 text-[#0D9488] shrink-0">
                      Diploma
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-[#485056] leading-relaxed mt-1 font-sans line-clamp-2">
                    {college.shortDescription}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* Column 4: Campus Locations & Guidance */}
          <div className="space-y-4">
            <div className="flex items-center gap-1.5 pb-2 border-b border-[#E5E2DC]/80 text-[#667085]">
              <MapPin className="w-4 h-4 text-[#2563EB]" />
              <span className="text-[11px] font-mono font-extrabold uppercase tracking-wider text-[#202426]">
                CAMPUSES & GUIDANCE
              </span>
            </div>

            <div className="space-y-3">
              <Link
                to="/colleges"
                onClick={onClose}
                className="group block p-2 -mx-2 rounded-xl hover:bg-[#FAF8F5] transition-colors duration-150"
              >
                <h5 className="text-xs sm:text-sm font-extrabold text-[#202426] group-hover:text-[#F26A21] transition-colors">
                  Chengicherla / Hyderabad Campus
                </h5>
                <p className="text-[11px] font-semibold text-[#485056] leading-snug mt-0.5 font-sans">
                  Orange Nursing College & School • Chengicherla
                </p>
              </Link>

              <Link
                to="/colleges"
                onClick={onClose}
                className="group block p-2 -mx-2 rounded-xl hover:bg-[#FAF8F5] transition-colors duration-150"
              >
                <h5 className="text-xs sm:text-sm font-extrabold text-[#202426] group-hover:text-[#F26A21] transition-colors">
                  Nagaram / Hyderabad Campus
                </h5>
                <p className="text-[11px] font-semibold text-[#485056] leading-snug mt-0.5 font-sans">
                  Apple Nursing & Jawan Paramedical • Nagaram
                </p>
              </Link>

              <Link
                to="/colleges?filter=Nalgonda"
                onClick={onClose}
                className="group block p-2 -mx-2 rounded-xl hover:bg-[#FAF8F5] transition-colors duration-150"
              >
                <h5 className="text-xs sm:text-sm font-extrabold text-[#202426] group-hover:text-[#F26A21] transition-colors">
                  Nalgonda Campus
                </h5>
                <p className="text-[11px] font-semibold text-[#485056] leading-snug mt-0.5 font-sans">
                  Vennela & Siddhartha Institutions • Hyd Road
                </p>
              </Link>

              <Link
                to="/admissions#enquiry"
                onClick={onClose}
                className="group block p-2.5 -mx-2.5 rounded-xl bg-[#FFF2EB] border border-[#FDE6D8] hover:bg-[#FFE8DC] transition-colors duration-150 mt-2"
              >
                <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#D95412]">
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Admissions Helpline</span>
                </div>
                <p className="text-[11px] font-semibold text-[#485056] leading-snug mt-0.5 font-sans">
                  Contact admission team for eligibility & seat availability.
                </p>
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-4 flex items-center justify-between text-xs font-sans">
          <div className="flex items-center gap-2 text-[#485056] font-semibold">
            <ShieldCheck className="w-4 h-4 text-[#F26A21]" />
            <span>State Approved & Registered Institutions Across Telangana State</span>
          </div>

          <Link
            to="/colleges"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 font-extrabold text-[#F26A21] hover:text-[#D95412] uppercase tracking-wider transition-colors group"
          >
            <span>View All Institutions</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

      </div>
    </motion.div>
  );
};

export default CollegesMegaMenu;
