import React from 'react';
import { Link } from 'react-router-dom';
import { collegesData } from '@/data/colleges';
import { ArrowRight, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

interface CollegesMegaMenuProps {
  onClose: () => void;
}

const dropdownVariant = {
  hidden: { opacity: 0, y: 8, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] as const } },
  exit: { opacity: 0, y: 6, scale: 0.98, transition: { duration: 0.15 } }
};

export const CollegesMegaMenu: React.FC<CollegesMegaMenuProps> = ({ onClose }) => {
  return (
    <motion.div
      id="colleges-mega-menu"
      variants={dropdownVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="absolute top-full left-1/2 -translate-x-1/2 w-full max-w-[920px] z-50 pt-3"
      role="region"
      aria-label="Colleges Mega Menu"
    >
      <div className="bg-white rounded-2xl border border-[#E5E2DC] shadow-xl p-5 max-h-[500px] flex flex-col justify-between overflow-hidden">
        {/* Clean 2-Column Institution Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 overflow-y-auto pr-1">
          {collegesData.map((college) => (
            <Link
              key={college.id}
              to={`/colleges/${college.slug}`}
              onClick={onClose}
              className="group relative bg-[#FAF8F5] hover:bg-white p-3 rounded-xl border border-[#E5E2DC]/60 hover:border-[#F26A21]/40 hover:shadow-md transition-all duration-200 flex items-center gap-3.5 overflow-hidden"
            >
              <span className="absolute bottom-0 left-0 h-[2.5px] w-0 bg-[#F26A21] transition-all duration-300 group-hover:w-full" />
              
              {/* Unique Small Thumbnail */}
              <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-[#F3F4F4] border border-[#E5E2DC]/80">
                <img
                  src={college.dropdownThumbnail}
                  alt={college.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Institution Info */}
              <div className="flex-1 min-w-0">
                <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-[#F26A21] block">
                  {college.category}
                </span>
                <h5 className="text-xs sm:text-sm font-bold text-[#202426] group-hover:text-[#F26A21] transition-colors truncate">
                  {college.name}
                </h5>
                <span className="text-[10px] font-sans text-[#667085] flex items-center gap-1 mt-0.5 truncate">
                  <MapPin className="w-2.5 h-2.5 text-[#667085] shrink-0" />
                  <span className="truncate">{college.locationGroup}</span>
                </span>
              </div>

              <ArrowRight className="w-4 h-4 text-[#667085] group-hover:text-[#F26A21] transition-all duration-200 transform group-hover:translate-x-1 shrink-0" />
            </Link>
          ))}
        </div>

        {/* Footer Action: Single clean link */}
        <div className="pt-3 mt-3 border-t border-[#E5E2DC] flex items-center justify-between text-xs">
          <span className="text-[#667085] font-sans">
            Medipally • Keesara • Nalgonda Campuses
          </span>
          <Link
            to="/colleges"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 font-bold text-[#F26A21] hover:text-[#D95412] uppercase tracking-wider transition-colors group"
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
