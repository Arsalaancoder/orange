import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { collegesData } from '@/data/colleges';
import { programsData } from '@/data/programs';
import { siteConfig } from '@/config/site';
import { PrimaryButton } from '@/components/shared/PrimaryButton';
import { Logo } from './Logo';
import { X, ChevronDown, Phone, MapPin, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  // Prevent background scroll when mobile menu is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const toggleSection = (label: string) => {
    setExpandedSection(expandedSection === label ? null : label);
  };

  const nursingColleges = collegesData.filter(c => c.category.includes('Nursing'));
  const paramedicalColleges = collegesData.filter(c => c.category.includes('Paramedical'));

  const nursingPrograms = programsData.filter(p => p.category === 'Nursing');
  const paramedicalPrimary = programsData.filter(p => p.category === 'Paramedical' && ['dmlt', 'doa', 'dmit'].includes(p.id));
  const alliedOther = programsData.filter(p => p.category === 'Paramedical' && !['dmlt', 'doa', 'dmit'].includes(p.id));

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#101820]/70 backdrop-blur-xs z-50 lg:hidden"
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="fixed inset-y-0 right-0 w-full max-w-md bg-white z-50 lg:hidden flex flex-col shadow-2xl overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
          >
            {/* Header */}
            <div className="p-5 border-b border-[#E3E6E5] flex items-center justify-between shrink-0 bg-[#FAFAF8]">
              <Logo mode="solid" />
              <button
                onClick={onClose}
                className="w-11 h-11 rounded-xl border border-[#E3E6E5] bg-white flex items-center justify-center text-[#202426] hover:bg-[#F3F4F4] transition-colors cursor-pointer"
                aria-label="Close navigation menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Navigation Body */}
            <div className="p-6 flex-1 overflow-y-auto space-y-2">
              {/* Direct Links */}
              <Link
                to="/about"
                onClick={onClose}
                className={`block py-3 px-3 text-base font-bold rounded-xl border-b border-[#F3F4F4] transition-colors ${
                  location.pathname === '/about' ? 'text-[#F26A21] bg-[#F26A21]/5' : 'text-[#202426] hover:text-[#F26A21]'
                }`}
              >
                About Us
              </Link>

              {/* Colleges Accordion */}
              <div className="border-b border-[#F3F4F4] py-1">
                <button
                  onClick={() => toggleSection('Colleges')}
                  className="w-full py-3 px-3 flex items-center justify-between text-base font-bold text-[#202426] hover:text-[#F26A21] transition-colors cursor-pointer"
                  aria-expanded={expandedSection === 'Colleges'}
                >
                  <span>Colleges & Schools</span>
                  <ChevronDown className={`w-4 h-4 text-[#667085] transition-transform duration-200 ${expandedSection === 'Colleges' ? 'rotate-180 text-[#F26A21]' : ''}`} />
                </button>

                <AnimatePresence>
                  {expandedSection === 'Colleges' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden pl-4 pr-2 pb-3 space-y-4 border-l-2 border-[#F26A21] my-2"
                    >
                      <div className="space-y-1.5">
                        <span className="text-[11px] font-extrabold text-[#F26A21] uppercase tracking-wider block mb-1">
                          Nursing Institutions
                        </span>
                        {nursingColleges.map((c) => (
                          <Link
                            key={c.id}
                            to={`/colleges/${c.slug}`}
                            onClick={onClose}
                            className="block py-2 px-2.5 text-sm font-medium text-[#667085] hover:text-[#F26A21] hover:bg-[#FAFAF8] rounded-lg transition-colors"
                          >
                            {c.name}
                          </Link>
                        ))}
                      </div>

                      <div className="space-y-1.5 pt-2 border-t border-[#E3E6E5]">
                        <span className="text-[11px] font-extrabold text-[#F26A21] uppercase tracking-wider block mb-1">
                          Paramedical Colleges
                        </span>
                        {paramedicalColleges.map((c) => (
                          <Link
                            key={c.id}
                            to={`/colleges/${c.slug}`}
                            onClick={onClose}
                            className="block py-2 px-2.5 text-sm font-medium text-[#667085] hover:text-[#F26A21] hover:bg-[#FAFAF8] rounded-lg transition-colors"
                          >
                            {c.name}
                          </Link>
                        ))}
                      </div>

                      <Link
                        to="/colleges"
                        onClick={onClose}
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#F26A21] hover:underline uppercase tracking-wider pt-2"
                      >
                        <span>View All Institutions</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Programs Accordion */}
              <div className="border-b border-[#F3F4F4] py-1">
                <button
                  onClick={() => toggleSection('Programs')}
                  className="w-full py-3 px-3 flex items-center justify-between text-base font-bold text-[#202426] hover:text-[#F26A21] transition-colors cursor-pointer"
                  aria-expanded={expandedSection === 'Programs'}
                >
                  <span>Academic Programs</span>
                  <ChevronDown className={`w-4 h-4 text-[#667085] transition-transform duration-200 ${expandedSection === 'Programs' ? 'rotate-180 text-[#F26A21]' : ''}`} />
                </button>

                <AnimatePresence>
                  {expandedSection === 'Programs' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden pl-4 pr-2 pb-3 space-y-4 border-l-2 border-[#F26A21] my-2"
                    >
                      <div className="space-y-1.5">
                        <span className="text-[11px] font-extrabold text-[#F26A21] uppercase tracking-wider block mb-1">
                          Nursing Degrees & Diplomas
                        </span>
                        {nursingPrograms.map((p) => (
                          <Link
                            key={p.id}
                            to={`/programs/${p.slug}`}
                            onClick={onClose}
                            className="block py-2 px-2.5 text-sm font-medium text-[#667085] hover:text-[#F26A21] hover:bg-[#FAFAF8] rounded-lg transition-colors"
                          >
                            {p.code} – {p.fullTitle}
                          </Link>
                        ))}
                      </div>

                      <div className="space-y-1.5 pt-2 border-t border-[#E3E6E5]">
                        <span className="text-[11px] font-extrabold text-[#F26A21] uppercase tracking-wider block mb-1">
                          Paramedical Diplomas
                        </span>
                        {paramedicalPrimary.map((p) => (
                          <Link
                            key={p.id}
                            to={`/programs/${p.slug}`}
                            onClick={onClose}
                            className="block py-2 px-2.5 text-sm font-medium text-[#667085] hover:text-[#F26A21] hover:bg-[#FAFAF8] rounded-lg transition-colors"
                          >
                            {p.code} – {p.fullTitle}
                          </Link>
                        ))}
                      </div>

                      <div className="space-y-1.5 pt-2 border-t border-[#E3E6E5]">
                        <span className="text-[11px] font-extrabold text-[#F26A21] uppercase tracking-wider block mb-1">
                          Other Technical Offerings
                        </span>
                        {alliedOther.map((p) => (
                          <Link
                            key={p.id}
                            to={`/programs/${p.slug}`}
                            onClick={onClose}
                            className="block py-2 px-2.5 text-sm font-medium text-[#667085] hover:text-[#F26A21] hover:bg-[#FAFAF8] rounded-lg transition-colors"
                          >
                            {p.code} – {p.fullTitle}
                          </Link>
                        ))}
                      </div>

                      <Link
                        to="/programs"
                        onClick={onClose}
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#F26A21] hover:underline uppercase tracking-wider pt-2"
                      >
                        <span>View All Programs</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Direct Links */}
              <Link
                to="/admissions"
                onClick={onClose}
                className={`block py-3 px-3 text-base font-bold rounded-xl border-b border-[#F3F4F4] transition-colors ${
                  location.pathname === '/admissions' ? 'text-[#F26A21] bg-[#F26A21]/5' : 'text-[#202426] hover:text-[#F26A21]'
                }`}
              >
                Admissions 2026–27
              </Link>

              <Link
                to="/facilities"
                onClick={onClose}
                className={`block py-3 px-3 text-base font-bold rounded-xl border-b border-[#F3F4F4] transition-colors ${
                  location.pathname === '/facilities' ? 'text-[#F26A21] bg-[#F26A21]/5' : 'text-[#202426] hover:text-[#F26A21]'
                }`}
              >
                Facilities
              </Link>

              <Link
                to="/student-life"
                onClick={onClose}
                className={`block py-3 px-3 text-base font-bold rounded-xl border-b border-[#F3F4F4] transition-colors ${
                  location.pathname === '/student-life' ? 'text-[#F26A21] bg-[#F26A21]/5' : 'text-[#202426] hover:text-[#F26A21]'
                }`}
              >
                Student Life
              </Link>

              <Link
                to="/gallery"
                onClick={onClose}
                className={`block py-3 px-3 text-base font-bold rounded-xl border-b border-[#F3F4F4] transition-colors ${
                  location.pathname === '/gallery' ? 'text-[#F26A21] bg-[#F26A21]/5' : 'text-[#202426] hover:text-[#F26A21]'
                }`}
              >
                Campus Gallery
              </Link>

              {/* More Accordion */}
              <div className="border-b border-[#F3F4F4] py-1">
                <button
                  onClick={() => toggleSection('More')}
                  className="w-full py-3 px-3 flex items-center justify-between text-base font-bold text-[#202426] hover:text-[#F26A21] transition-colors cursor-pointer"
                  aria-expanded={expandedSection === 'More'}
                >
                  <span>More Institutional Links</span>
                  <ChevronDown className={`w-4 h-4 text-[#667085] transition-transform duration-200 ${expandedSection === 'More' ? 'rotate-180 text-[#F26A21]' : ''}`} />
                </button>

                <AnimatePresence>
                  {expandedSection === 'More' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden pl-4 pr-2 pb-3 space-y-2 border-l-2 border-[#F26A21] my-2"
                    >
                      {[
                        { label: 'Faculty', href: '/faculty' },
                        { label: 'Clinical Training', href: '/clinical-training' },
                        { label: 'Career Pathways', href: '/career-pathways' },
                        { label: 'News & Events', href: '/news' },
                        { label: 'FAQ', href: '/faq' },
                        { label: 'Contact Us', href: '/contact' }
                      ].map((item) => (
                        <Link
                          key={item.href}
                          to={item.href}
                          onClick={onClose}
                          className="block py-2 px-2 text-sm font-medium text-[#667085] hover:text-[#F26A21] transition-colors"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Bottom Actions & Contact Info */}
            <div className="p-6 border-t border-[#E3E6E5] bg-[#FAFAF8] shrink-0 space-y-4">
              <div className="space-y-2 text-xs text-[#667085]">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#F26A21] shrink-0" />
                  <span>Campuses: Chengicherla / Hyderabad | Nagaram / Hyderabad | Nalgonda</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#F26A21] shrink-0" />
                  <span>Admissions: {siteConfig.contact.primaryPhone}</span>
                </div>
              </div>

              <PrimaryButton to="/admissions#enquiry" size="md" fullWidth showArrow onClick={onClose}>
                Enquire Now
              </PrimaryButton>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
