import React from 'react';
import { Container } from '@/components/shared/Container';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { careerPathsData, type CareerPathGroup, type WorkplaceOpportunity } from '@/data/careerPaths';
import {
  GraduationCap, Stethoscope, Microscope, Eye, Scan,
  Building2, Home, Users, Activity, Globe, HeartPulse, Heart,
  ShieldCheck, FlaskConical, TestTube, Droplet, Glasses, FileText, Monitor
} from 'lucide-react';
import { motion } from 'framer-motion';

const HEADER_ICONS: Record<string, React.ElementType> = {
  "B.Sc Nursing": GraduationCap,
  "GNM": Stethoscope,
  "DMLT": Microscope,
  "DOA": Eye,
  "DMIT": Scan
};

const WORKPLACE_ICONS: Record<string, React.ElementType> = {
  Building2, Home, Users, Activity, Globe, HeartPulse, GraduationCap, Heart,
  Stethoscope, ShieldCheck, FlaskConical, TestTube, Droplet, Microscope,
  Eye, Glasses, Scan, FileText, Monitor
};

interface ProgramCareerCardsSectionProps {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  className?: string;
}

export const ProgramCareerCardsSection: React.FC<ProgramCareerCardsSectionProps> = ({
  eyebrow = "CAREER OPPORTUNITIES",
  title = "Employment Sectors & Career Scope",
  subtitle = "Explore career opportunities and workplace environments available to graduates across nursing, medical laboratory technology, imaging, ophthalmic care, and allied health fields.",
  className = ""
}) => {
  // Separate into 2 columns matching reference image:
  // Column 1: B.Sc Nursing, DMLT
  // Column 2: GNM, DOA, DMIT
  const leftColumnCards = careerPathsData.filter(c => c.id === 'bsc-nursing' || c.id === 'dmlt');
  const rightColumnCards = careerPathsData.filter(c => c.id === 'gnm' || c.id === 'doa' || c.id === 'dmit');

  const renderCard = (cp: CareerPathGroup) => {
    const HeaderIcon = HEADER_ICONS[cp.programCode] || GraduationCap;

    return (
      <motion.div
        key={cp.id}
        initial={{ opacity: 0, scale: 0.96, y: 28 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ y: -4 }}
        className={`rounded-[2rem] border ${cp.borderColor} ${cp.bgColor} p-6 sm:p-8 lg:p-9 shadow-xs hover:shadow-md transition-all duration-300 relative overflow-hidden group flex flex-col justify-between`}
      >
        {/* Top Header & Healthcare Visual Row */}
        <div>
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 sm:gap-6 pb-6">
            
            {/* Upper Left Info */}
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-3.5">
                <div className={`w-13 h-13 sm:w-14 sm:h-14 rounded-full ${cp.headerIconBg} ${cp.headerIconColor} flex items-center justify-center shrink-0 shadow-2xs border border-white/60 group-hover:scale-105 transition-transform duration-300`}>
                  <HeaderIcon className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold font-sans text-[#202426] tracking-tight">
                    {cp.programCode}
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-[#485056] font-sans">
                    {cp.programTitle}
                  </p>
                </div>
              </div>

              {/* Colored Accent Line */}
              <div
                className="h-1 w-10 sm:w-12 rounded-full my-3"
                style={{ backgroundColor: cp.accentColor }}
              />

              {/* Short Supporting Line */}
              <p className="text-xs sm:text-sm text-[#667085] leading-relaxed font-sans max-w-md">
                {cp.tagline}
              </p>
            </div>

            {/* Upper Right Healthcare Visual Image + Handwritten Overlay */}
            <div className="w-full sm:w-auto self-end sm:self-start shrink-0">
              <div className="relative rounded-2xl overflow-hidden shadow-2xs border border-white/80 aspect-[16/10] w-full sm:w-44 lg:w-48 bg-white group-hover:shadow-sm transition-all duration-300">
                <img
                  src={cp.imageUrl}
                  alt={cp.programTitle}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                
                {/* Overlay Handwritten Callout Text */}
                <div className="absolute bottom-2 left-2 right-2 text-right">
                  <span className="inline-block text-[10px] sm:text-[11px] font-serif italic text-white/95 font-medium tracking-wide leading-tight px-2 py-0.5 bg-black/40 backdrop-blur-md rounded-md shadow-2xs">
                    {cp.calloutText}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Internal Mini-Cards Grid */}
          {cp.layoutVariant === 'vertical-grid' ? (
            /* Vertical Stack Mini Cards (B.Sc Nursing, GNM, DMLT) */
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                visible: { transition: { staggerChildren: 0.05 } }
              }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-black/5"
            >
              {cp.opportunities.map((opp: WorkplaceOpportunity, idx: number) => {
                const IconComp = WORKPLACE_ICONS[opp.iconName] || Building2;

                return (
                  <motion.div
                    key={idx}
                    variants={{
                      hidden: { opacity: 0, y: 15, scale: 0.95 },
                      visible: { opacity: 1, y: 0, scale: 1 }
                    }}
                    whileHover={{ y: -2 }}
                    className="bg-white/95 backdrop-blur-xs rounded-2xl border border-white/90 p-3.5 sm:p-4 shadow-2xs hover:shadow-sm flex flex-col items-center justify-center text-center transition-all duration-200 group/mini min-h-[96px]"
                  >
                    <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full ${opp.iconBg} ${opp.iconColor} flex items-center justify-center mx-auto mb-2 shrink-0 group-hover/mini:scale-105 transition-transform duration-200`}>
                      <IconComp className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <span className="text-xs font-bold text-[#202426] text-center leading-snug tracking-tight font-sans">
                      {opp.label}
                    </span>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            /* Horizontal Pill Mini Cards (DOA, DMIT) */
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                visible: { transition: { staggerChildren: 0.05 } }
              }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-black/5"
            >
              {cp.opportunities.map((opp: WorkplaceOpportunity, idx: number) => {
                const IconComp = WORKPLACE_ICONS[opp.iconName] || Building2;

                return (
                  <motion.div
                    key={idx}
                    variants={{
                      hidden: { opacity: 0, y: 15, scale: 0.95 },
                      visible: { opacity: 1, y: 0, scale: 1 }
                    }}
                    whileHover={{ y: -2 }}
                    className="bg-white/95 backdrop-blur-xs rounded-2xl border border-white/90 p-3 sm:p-3.5 shadow-2xs hover:shadow-sm flex items-center gap-3 transition-all duration-200 group/mini min-h-[52px]"
                  >
                    <div className={`w-8 h-8 rounded-full ${opp.iconBg} ${opp.iconColor} flex items-center justify-center shrink-0 group-hover/mini:scale-105 transition-transform duration-200`}>
                      <IconComp className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-[#202426] leading-snug tracking-tight font-sans">
                      {opp.label}
                    </span>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <section className={`py-12 lg:py-20 bg-[#FAF8F5] border-b border-[#E5E2DC] ${className}`}>
      <Container>
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          subtitle={subtitle}
        />

        {/* 2-Column Desktop Grid matching reference layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 lg:gap-8 items-start mt-10">
          
          {/* Column 1: B.Sc Nursing & DMLT */}
          <div className="flex flex-col gap-7 lg:gap-8">
            {leftColumnCards.map(renderCard)}
          </div>

          {/* Column 2: GNM, DOA, & DMIT */}
          <div className="flex flex-col gap-7 lg:gap-8">
            {rightColumnCards.map(renderCard)}
          </div>

        </div>
      </Container>
    </section>
  );
};

export default ProgramCareerCardsSection;
