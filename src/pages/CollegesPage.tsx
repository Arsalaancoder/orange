import React, { useState } from 'react';
import { PageShell } from '@/components/layout/PageShell';
import { Container } from '@/components/shared/Container';
import { Eyebrow } from '@/components/shared/Eyebrow';
import { SecondaryButton } from '@/components/shared/SecondaryButton';
import { SEO } from '@/components/shared/SEO';
import { collegesData, type LocationGroup } from '@/data/colleges';
import { CollegeCard } from '@/components/colleges/CollegeCard';
import { MapPin, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  headingSoftPopVariant,
  textRevealVariant,
  staggerGridContainerVariant,
  largeImageScaleRevealVariant
} from '@/components/animations/motionVariants';

const LOCATION_FILTERS: Array<{ id: string; label: string; group: LocationGroup | 'ALL' }> = [
  { id: 'all', label: 'ALL INSTITUTIONS', group: 'ALL' },
  { id: 'medipally', label: 'MEDIPALLY', group: 'Medipally' },
  { id: 'keesara', label: 'KEESARA / NAGARAM', group: 'Keesara / Nagaram' },
  { id: 'nalgonda', label: 'NALGONDA', group: 'Nalgonda' }
];

export const CollegesPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<LocationGroup | 'ALL'>('ALL');

  const filteredColleges = activeFilter === 'ALL'
    ? collegesData
    : collegesData.filter(c => c.locationGroup === activeFilter);

  const scrollToGrid = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('institutions-grid');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <PageShell>
      <SEO
        title="Our Institutions | Orange Group"
        description="Orange Group brings together Nursing Colleges, Nursing Schools and Paramedical Colleges across Medipally, Keesara/Nagaram and Nalgonda."
      />

      {/* 1. EDITORIAL HERO SECTION */}
      <section className="relative py-16 md:py-24 bg-white border-b border-[#E3E6E5] overflow-hidden">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Content Column */}
            <motion.div
              variants={headingSoftPopVariant}
              initial="hidden"
              animate="visible"
              className="lg:col-span-7 space-y-6"
            >
              <div className="flex items-center gap-2">
                <Eyebrow text="OUR INSTITUTIONS" />
                <span className="hidden sm:inline-block w-8 h-[1px] bg-[#F26A21]" />
                <span className="text-xs font-mono text-[#F26A21] font-bold uppercase tracking-wider">
                  8 Colleges & Schools
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif-heading font-bold text-[#202426] tracking-tight leading-[1.12]">
                Healthcare Education<br />
                <span className="italic font-serif text-[#F26A21]">Across Multiple Campuses</span>
              </h1>

              <motion.p
                variants={textRevealVariant}
                initial="hidden"
                animate="visible"
                className="text-lg md:text-xl text-[#485056] leading-relaxed max-w-2xl font-sans"
              >
                Orange Group brings together Nursing Colleges, Nursing Schools and Paramedical Colleges operating across Medipally, Keesara/Nagaram and Nalgonda in Telangana.
              </motion.p>

              {/* Stat Highlights */}
              <div className="grid grid-cols-3 gap-4 pt-2 border-t border-[#E3E6E5]">
                <div>
                  <span className="block text-2xl font-bold font-serif-heading text-[#202426]">8</span>
                  <span className="text-xs text-[#667085] uppercase tracking-wider font-semibold">Institutions</span>
                </div>
                <div>
                  <span className="block text-2xl font-bold font-serif-heading text-[#202426]">3</span>
                  <span className="text-xs text-[#667085] uppercase tracking-wider font-semibold">Key Campuses</span>
                </div>
                <div>
                  <span className="block text-2xl font-bold font-serif-heading text-[#202426]">Nursing & Paramedical</span>
                  <span className="text-xs text-[#667085] uppercase tracking-wider font-semibold">Disciplines</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <a
                  href="#institutions-grid"
                  onClick={scrollToGrid}
                  className="inline-flex items-center gap-2 bg-[#F26A21] hover:bg-[#D95412] text-white px-7 py-3.5 rounded-xl text-sm font-bold tracking-wide transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
                >
                  <span>Explore Institutions</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <SecondaryButton to="/admissions" className="rounded-xl">
                  Admissions Information
                </SecondaryButton>
              </div>
            </motion.div>

            {/* Right Hero Visual: Authentic Campus Editorial Image */}
            <motion.div
              variants={largeImageScaleRevealVariant}
              initial="hidden"
              animate="visible"
              className="lg:col-span-5 relative"
            >
              <div className="relative rounded-3xl overflow-hidden border border-[#E3E6E5] shadow-2xl bg-[#FAFAF8] p-2">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                  <img
                    src="/images/hero/hero-slide-1.jpg"
                    alt="Orange Group Institutions Campus"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  {/* Floating Overlay Badge */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-white/20 shadow-lg space-y-1">
                    <span className="text-[10px] font-bold font-mono text-[#F26A21] uppercase tracking-wider block">
                      TELANGANA HEALTHCARE GROUP
                    </span>
                    <p className="text-xs font-bold text-[#202426]">
                      Comprehensive Nursing & Allied Paramedical Education
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* 2. INTRODUCTION SECTION */}
      <section className="py-16 md:py-20 bg-[#FAFAF8] border-b border-[#E3E6E5]">
        <Container maxW="narrow">
          <motion.div
            variants={headingSoftPopVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="text-center space-y-6"
          >
            <Eyebrow text="ORANGE GROUP VISION" />
            
            <h2 className="text-3xl md:text-4xl font-serif-heading font-bold text-[#202426] leading-tight">
              Multiple Institutions.<br />One Dedicated Commitment to Healthcare Education.
            </h2>

            <div className="space-y-4 text-base md:text-lg text-[#485056] leading-relaxed font-sans max-w-3xl mx-auto">
              <p>
                Orange Group of Medical Colleges is dedicated to developing competent and compassionate healthcare professionals through structured academic education, practical lab skills, and clinical exposure.
              </p>
              <p>
                Our academic environment across all institutions combines classroom instruction, state-of-the-art laboratory practice, bedside clinical training, skill development, and professional mentoring.
              </p>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* 3 & 4. INSTITUTION DIRECTORY & FILTER */}
      <section id="institutions-grid" className="py-16 md:py-24 bg-white border-b border-[#E3E6E5]">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 pb-8 border-b border-[#E3E6E5]">
            <div className="space-y-2">
              <Eyebrow text="INSTITUTION DIRECTORY" />
              <h2 className="text-3xl font-serif-heading font-bold text-[#202426]">
                Explore Our Colleges & Schools
              </h2>
            </div>

            {/* Location Filter Bar */}
            <div
              className="flex flex-wrap items-center gap-2"
              role="tablist"
              aria-label="Filter institutions by location"
            >
              {LOCATION_FILTERS.map(filter => {
                const isActive = activeFilter === filter.group;
                return (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.group)}
                    role="tab"
                    aria-selected={isActive}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border cursor-pointer ${
                      isActive
                        ? 'bg-[#101820] text-white border-[#101820] shadow-sm'
                        : 'bg-[#FAFAF8] text-[#485056] border-[#E3E6E5] hover:border-[#F26A21] hover:text-[#F26A21]'
                    }`}
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Staggered Grid of Colleges */}
          <motion.div
            variants={staggerGridContainerVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
          >
            {filteredColleges.map((college, idx) => (
              <CollegeCard key={college.id} college={college} index={idx} />
            ))}
          </motion.div>
        </Container>
      </section>

      {/* 5. LOCATIONS OVERVIEW */}
      <section className="py-16 md:py-24 bg-[#FAFAF8] border-b border-[#E3E6E5]">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <Eyebrow text="OUR CAMPUS LOCATIONS" />
              <h2 className="text-3xl font-serif-heading font-bold text-[#202426]">
                Healthcare Education Across Key Campuses
              </h2>
            </div>

            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white border border-[#E3E6E5] text-xs font-mono font-bold text-[#F26A21] uppercase tracking-wider shrink-0 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 mr-1.5" /> 3 Strategic Locations
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Panel 1: MEDIPALLY */}
            <div className="bg-white p-8 rounded-2xl border border-[#E3E6E5] shadow-xs hover:border-[#F26A21]/40 transition-all flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#F26A21]/10 text-[#F26A21] flex items-center justify-center">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-serif-heading font-bold text-[#202426]">
                  MEDIPALLY
                </h3>
                <p className="text-xs text-[#667085] font-mono uppercase tracking-wider">
                  Chenigacherla, Medchal District
                </p>
              </div>

              <div className="pt-4 border-t border-[#E3E6E5] space-y-3">
                <span className="text-[11px] font-bold text-[#202426] uppercase tracking-wider block">
                  Institutions in Medipally:
                </span>
                <ul className="space-y-2.5 text-sm text-[#485056] font-medium">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#F26A21] shrink-0" />
                    <Link to="/colleges/orange-college-of-nursing" className="hover:text-[#F26A21]">
                      Orange College of Nursing
                    </Link>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#F26A21] shrink-0" />
                    <Link to="/colleges/orange-school-of-nursing" className="hover:text-[#F26A21]">
                      Orange School of Nursing
                    </Link>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#F26A21] shrink-0" />
                    <Link to="/colleges/sindoora-school-of-nursing" className="hover:text-[#F26A21]">
                      Sindoora School of Nursing
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Panel 2: KEESARA / NAGARAM */}
            <div className="bg-white p-8 rounded-2xl border border-[#E3E6E5] shadow-xs hover:border-[#F26A21]/40 transition-all flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#F26A21]/10 text-[#F26A21] flex items-center justify-center">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-serif-heading font-bold text-[#202426]">
                  KEESARA / NAGARAM
                </h3>
                <p className="text-xs text-[#667085] font-mono uppercase tracking-wider">
                  Nagaram Panchayat, Medchal District
                </p>
              </div>

              <div className="pt-4 border-t border-[#E3E6E5] space-y-3">
                <span className="text-[11px] font-bold text-[#202426] uppercase tracking-wider block">
                  Institutions in Keesara / Nagaram:
                </span>
                <ul className="space-y-2.5 text-sm text-[#485056] font-medium">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#F26A21] shrink-0" />
                    <Link to="/colleges/apple-college-of-nursing" className="hover:text-[#F26A21]">
                      Apple College of Nursing
                    </Link>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#F26A21] shrink-0" />
                    <Link to="/colleges/apple-school-of-nursing" className="hover:text-[#F26A21]">
                      Apple School of Nursing
                    </Link>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#F26A21] shrink-0" />
                    <Link to="/colleges/jawan-paramedical-college" className="hover:text-[#F26A21]">
                      Jawan Paramedical College
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Panel 3: NALGONDA */}
            <div className="bg-white p-8 rounded-2xl border border-[#E3E6E5] shadow-xs hover:border-[#F26A21]/40 transition-all flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#F26A21]/10 text-[#F26A21] flex items-center justify-center">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-serif-heading font-bold text-[#202426]">
                  NALGONDA
                </h3>
                <p className="text-xs text-[#667085] font-mono uppercase tracking-wider">
                  Hyderabad Road, Nalgonda
                </p>
              </div>

              <div className="pt-4 border-t border-[#E3E6E5] space-y-3">
                <span className="text-[11px] font-bold text-[#202426] uppercase tracking-wider block">
                  Institutions in Nalgonda:
                </span>
                <ul className="space-y-2.5 text-sm text-[#485056] font-medium">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#F26A21] shrink-0" />
                    <Link to="/colleges/vennela-school-of-nursing" className="hover:text-[#F26A21]">
                      Vennela School of Nursing
                    </Link>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#F26A21] shrink-0" />
                    <Link to="/colleges/siddhartha-paramedical-colleges" className="hover:text-[#F26A21]">
                      Siddhartha Paramedical Colleges
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ADMISSIONS CTA BANNER */}
      <section className="py-16 bg-[#101820] text-white relative overflow-hidden">
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
            <div className="space-y-2 max-w-2xl text-center md:text-left">
              <span className="text-xs font-mono font-bold text-[#F26A21] uppercase tracking-widest">
                ADMISSIONS OPEN 2026–2027
              </span>
              <h2 className="text-3xl font-serif-heading font-bold text-white">
                Begin Your Healthcare Academic Journey
              </h2>
              <p className="text-sm text-[#A0A5A8] leading-relaxed">
                Contact our central admissions team for institution-specific guidance, eligibility criteria, and application details across all 8 colleges.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 shrink-0">
              <Link
                to="/admissions"
                className="inline-flex items-center gap-2 bg-[#F26A21] hover:bg-[#D95412] text-white px-7 py-3.5 rounded-xl text-sm font-bold tracking-wide transition-all shadow-md hover:shadow-lg"
              >
                <span>Admissions Guidance</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </PageShell>
  );
};

export default CollegesPage;


