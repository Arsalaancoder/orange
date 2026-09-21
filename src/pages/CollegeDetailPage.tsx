import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { PageShell } from '@/components/layout/PageShell';
import { Container } from '@/components/shared/Container';
import { SecondaryButton } from '@/components/shared/SecondaryButton';
import { SEO } from '@/components/shared/SEO';
import { collegesData } from '@/data/colleges';
import { programsData, type Program } from '@/data/programs';
import { CollegeCard } from '@/components/colleges/CollegeCard';
import {
  MapPin, ShieldCheck, ArrowRight, CheckCircle2, Phone, Mail,
  ExternalLink, Building2, BookOpen, Layers
} from 'lucide-react';
import { motion } from 'framer-motion';

// Refined, low-bounce spring and ease animation variants
const sectionHeadingVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } }
};

const cardPopVariant = {
  hidden: { opacity: 0, scale: 0.94, y: 28 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } }
};

const slideLeftVariant = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } }
};

const slideRightVariant = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } }
};

const FACILITY_ICONS = [BookOpen, Layers, Building2];

export const CollegeDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const college = collegesData.find(c => c.slug === slug);

  if (!college) {
    return (
      <PageShell>
        <SEO title="Institution Not Found | Orange Group" description="Requested institution not found." />
        <Container className="py-24 text-center space-y-6 bg-[#F4F1EA]">
          <h1 className="text-4xl font-serif-heading font-bold text-[#202426]">
            Institution Not Found
          </h1>
          <p className="text-[#667085] max-w-md mx-auto text-base">
            The requested institution page does not exist or has been updated in our catalog.
          </p>
          <div>
            <Link
              to="/colleges"
              className="inline-flex items-center gap-2 bg-[#F26A21] text-white px-7 py-3.5 rounded-full text-sm font-bold shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <span>View All Institutions</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Container>
      </PageShell>
    );
  }

  // Programs offered at this institution
  const institutionPrograms: Program[] = programsData.filter(p => college.programs.includes(p.slug));

  // Related institutions (for bottom directory)
  const relatedColleges = collegesData
    .filter(c => c.id !== college.id)
    .sort((a) => (a.locationGroup === college.locationGroup ? -1 : 1))
    .slice(0, 2);

  const enquiryUrl = `/admissions?college=${college.slug}#enquiry`;
  const admissionsUrl = `/admissions?college=${college.slug}`;
  const theme = college.accentTheme;

  return (
    <PageShell>
      <SEO
        title={`${college.name} | Orange Group`}
        description={college.seoDescription}
      />

      <div className="bg-[#FAF8F5] text-[#202426] font-sans min-h-screen">
        {/* SECTION 1: HERO (CLEAN SPLIT HERO ON WARM OFF-WHITE) */}
        <section className="relative py-12 lg:py-16 border-b border-[#E5E2DC] overflow-hidden">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Content Column (~55% width) */}
              <motion.div
                variants={slideLeftVariant}
                initial="hidden"
                animate="visible"
                className="lg:col-span-7 space-y-5"
              >
                {/* Category & Location Eyebrows */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider border ${theme.badgeBg}`}>
                    {theme.badgeLabel}
                  </span>
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#667085] bg-white px-3 py-1 rounded-full border border-[#E5E2DC]">
                    {college.locationGroup} Campus
                  </span>
                </div>

                {/* Institution Title Heading */}
                <h1 className="text-4xl sm:text-5xl lg:text-[58px] font-serif-heading font-bold text-[#202426] leading-[1.08] tracking-tight">
                  {college.name}
                </h1>

                {/* Short Introduction (Max 2 lines) */}
                <p className="text-base sm:text-lg text-[#485056] leading-relaxed line-clamp-2 font-sans">
                  {college.shortDescription}
                </p>

                {/* Sponsor & Location Details */}
                <div className="text-xs sm:text-sm text-[#667085] space-y-1.5 font-medium pt-1">
                  <div className="flex items-center gap-2 text-[#202426]">
                    <ShieldCheck className="w-4 h-4 shrink-0" style={{ color: theme.primary }} />
                    <span>Sponsored by <strong>{college.sponsor}</strong> {college.registrationNumber && `(Reg. No. ${college.registrationNumber})`}</span>
                  </div>
                  <div className="flex items-start gap-2 text-[#667085]">
                    <MapPin className="w-4 h-4 shrink-0 mt-0.5" style={{ color: theme.primary }} />
                    <span>{college.address}</span>
                  </div>
                </div>

                {/* Hero Pill CTAs */}
                <div className="flex flex-wrap items-center gap-3.5 pt-3">
                  <Link
                    to={admissionsUrl}
                    className="inline-flex items-center gap-2 text-white px-7 py-3.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
                    style={{ backgroundColor: theme.primary }}
                  >
                    <span>Admission Information</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <SecondaryButton to={enquiryUrl} size="md" className="rounded-full border-[#E5E2DC] bg-white text-[#202426] hover:bg-[#F3F4F4]">
                    Enquire Now
                  </SecondaryButton>
                </div>
              </motion.div>

              {/* Right Column (~45% width): 1 Strong Hero Image */}
              <motion.div
                variants={slideRightVariant}
                initial="hidden"
                animate="visible"
                className="lg:col-span-5 relative"
              >
                {/* Subtle Organic Background Accent */}
                <div
                  className="absolute -right-4 -top-4 w-[110%] h-[110%] rounded-[36px] opacity-15 pointer-events-none blur-xl"
                  style={{ backgroundColor: theme.primary }}
                />

                <div className="relative rounded-[24px] overflow-hidden border border-[#E5E2DC] shadow-md bg-white">
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <img
                      src={college.heroImage}
                      alt={college.name}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent pointer-events-none" />

                    {/* Small Translucent Floating Caption */}
                    <div className="absolute bottom-4 left-4 z-10 bg-[#101820]/80 backdrop-blur-md text-white px-3.5 py-2 rounded-xl border border-white/15 shadow-sm space-y-0.5">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider block" style={{ color: theme.primary }}>
                        {college.locationGroup.toUpperCase()} CAMPUS
                      </span>
                      <span className="text-xs font-sans font-semibold text-white/95 block">
                        Clinical Learning Environment
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </Container>
        </section>

        {/* SECTION 2: INSTITUTION INFORMATION STRIP (DARK CHARCOAL BANNER) */}
        <section className="bg-[#101820] text-white py-5 border-y border-[#202426]">
          <Container>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              <div className="border-r border-white/10 pr-3 last:border-r-0">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider block mb-0.5" style={{ color: theme.primary }}>
                  TYPE
                </span>
                <span className="font-bold text-white truncate block">{college.category}</span>
              </div>

              <div className="border-r border-white/10 pr-3 last:border-r-0">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider block mb-0.5" style={{ color: theme.primary }}>
                  SPONSOR
                </span>
                <span className="font-bold text-white truncate block">{college.sponsor}</span>
              </div>

              <div className="border-r border-white/10 pr-3 last:border-r-0">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider block mb-0.5" style={{ color: theme.primary }}>
                  REGISTRATION
                </span>
                <span className="font-bold text-white font-mono truncate block">
                  {college.registrationNumber ? `Reg: ${college.registrationNumber}` : 'Approved State Reg'}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider block mb-0.5" style={{ color: theme.primary }}>
                  LOCATION
                </span>
                <span className="font-bold text-white truncate block">{college.locationGroup}, Telangana</span>
              </div>
            </div>
          </Container>
        </section>

        {/* SECTION 3: ABOUT INSTITUTION */}
        <section className="py-16 lg:py-20 border-b border-[#E5E2DC] bg-[#FAF8F5]">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              {/* Left Content Column (~53%) */}
              <motion.div
                variants={sectionHeadingVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="lg:col-span-7 space-y-5"
              >
                <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-[#E5E2DC] inline-block bg-white" style={{ color: theme.primary }}>
                  ABOUT INSTITUTION
                </span>

                <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-serif-heading font-bold text-[#202426] leading-tight">
                  About {college.name}
                </h2>

                <div className="space-y-3.5 text-base text-[#485056] leading-relaxed font-sans">
                  {college.aboutParagraphs.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>

                {/* 3 Compact Minimal Highlight Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-3">
                  {college.aboutHighlights.map((hl, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-2xl bg-white border border-[#E5E2DC] shadow-2xs space-y-1.5"
                    >
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-[#FAF8F5] border border-[#E5E2DC]">
                        <CheckCircle2 className="w-4 h-4" style={{ color: theme.primary }} />
                      </div>
                      <span className="text-xs font-bold text-[#202426] block leading-snug">{hl}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Right Single About Image (~47%) */}
              <motion.div
                variants={cardPopVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="lg:col-span-5 relative"
              >
                <div className="relative rounded-2xl overflow-hidden border border-[#E5E2DC] shadow-sm aspect-[4/3] bg-white">
                  <img
                    src={college.aboutImage}
                    alt={`About ${college.name}`}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md text-white text-[11px] font-mono px-3 py-1 rounded-md border border-white/10 uppercase tracking-wider">
                    Academic Environment • {college.locationGroup}
                  </div>
                </div>
              </motion.div>
            </div>
          </Container>
        </section>

        {/* SECTION 4: PROGRAMS OFFERED (COURSE-SPECIFIC CARDS ON WHITE) */}
        <section className="py-16 lg:py-20 bg-white border-b border-[#E5E2DC]">
          <Container>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-[#E5E2DC] gap-4">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider block mb-1" style={{ color: theme.primary }}>
                  PROGRAMS OFFERED
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-serif-heading font-bold text-[#202426]">
                  Courses at This Institution
                </h2>
              </div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider bg-[#FAF8F5] px-3.5 py-1.5 rounded-full border border-[#E5E2DC]">
                {institutionPrograms.length} Course{institutionPrograms.length > 1 ? 's' : ''} Available
              </span>
            </div>

            {/* Desktop 2-Column Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {institutionPrograms.map((prog) => (
                <motion.article
                  key={prog.id}
                  variants={cardPopVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  className="group bg-[#FAF8F5] rounded-2xl border border-[#E5E2DC] overflow-hidden flex flex-col justify-between hover:-translate-y-1 hover:shadow-md transition-all duration-300"
                >
                  <div>
                    {/* Image Header with Category & Duration Badges */}
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#F3F4F4]">
                      <img
                        src={prog.imageUrl || "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80"}
                        alt={prog.fullTitle}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                      {/* Micro Badge top-left */}
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-mono font-extrabold uppercase tracking-wider bg-white/95 text-[#202426] shadow-xs">
                        {prog.category.toUpperCase()}
                      </span>

                      {/* Duration Badge top-right */}
                      {prog.duration && (
                        <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-mono font-extrabold uppercase tracking-wider bg-black/80 text-white backdrop-blur-xs">
                          {prog.duration}
                        </span>
                      )}

                      <div className="absolute bottom-3 left-4 right-4 text-white">
                        <span className="text-[11px] font-mono tracking-wider font-semibold text-white/90 uppercase block mb-0.5">
                          {prog.code}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-bold font-serif-heading leading-tight group-hover:underline">
                          {prog.fullTitle}
                        </h3>
                      </div>
                    </div>

                    {/* Content Body */}
                    <div className="p-5 space-y-2 text-sm">
                      {prog.eligibility && (
                        <span className="inline-block px-3 py-1 rounded-full bg-white border border-[#E5E2DC] text-[11px] font-mono font-bold text-[#202426]">
                          Eligibility: {prog.eligibility}
                        </span>
                      )}
                      <p className="text-[#485056] leading-relaxed line-clamp-2 pt-1 font-sans">
                        {prog.overview}
                      </p>
                    </div>
                  </div>

                  {/* Card Action Footer */}
                  <div className="px-5 py-3.5 border-t border-[#E5E2DC] bg-white flex items-center justify-between text-xs">
                    <span className="font-mono text-[#667085]">{prog.code} Program</span>
                    <Link
                      to={`/programs/${prog.slug}`}
                      className="inline-flex items-center gap-1.5 font-bold uppercase tracking-wider transition-colors group-hover:translate-x-1 duration-200"
                      style={{ color: theme.primary }}
                    >
                      <span>Explore Program</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          </Container>
        </section>

        {/* SECTION 5: PRACTICAL FACILITIES (1 FEATURED IMAGE + CLEAN TEXT CONTENT BLOCKS) */}
        <section className="py-16 lg:py-20 bg-[#FAF8F5] border-b border-[#E5E2DC]">
          <Container>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider block mb-1" style={{ color: theme.primary }}>
                  PRACTICAL FACILITIES
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-serif-heading font-bold text-[#202426]">
                  Learning & Practical Facilities
                </h2>
              </div>
              <Link
                to="/facilities"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider hover:translate-x-1 transition-transform"
                style={{ color: theme.primary }}
              >
                <span>View All Facilities →</span>
              </Link>
            </div>

            {/* Asymmetric Layout: 1 Lead Featured Image Card (7 cols) + 3 Elegant Icon/Text Content Blocks (5 cols) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* 1 Single Featured Facility Image Card */}
              {college.facilities[0] && (
                <motion.div
                  variants={cardPopVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  className="md:col-span-7 relative rounded-2xl overflow-hidden border border-[#E5E2DC] bg-[#101820] min-h-[340px] flex flex-col justify-end group shadow-sm hover:shadow-md transition-shadow"
                >
                  <img
                    src={college.facilities[0].imageUrl}
                    alt={college.facilities[0].title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-85"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />
                  <div className="relative p-6 lg:p-8 z-10 text-white space-y-2">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider block" style={{ color: theme.primary }}>
                      {college.facilities[0].category}
                    </span>
                    <h3 className="text-2xl lg:text-3xl font-bold font-serif-heading text-white">
                      {college.facilities[0].title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed line-clamp-2 max-w-xl font-sans">
                      {college.facilities[0].description}
                    </p>
                  </div>
                </motion.div>
              )}

              {/* 3 Supporting Facility Cards (Clean Icon/Text Blocks) */}
              <div className="md:col-span-5 grid grid-cols-1 gap-4">
                {college.facilities.slice(1, 4).map((fac, i) => {
                  const IconComp = FACILITY_ICONS[i % FACILITY_ICONS.length];
                  return (
                    <motion.div
                      key={fac.id}
                      variants={cardPopVariant}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.2 }}
                      className="group relative rounded-2xl bg-white p-5 border border-[#E5E2DC] shadow-2xs hover:shadow-sm hover:border-[#E5E2DC] transition-all flex items-start gap-4"
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-[#E5E2DC]"
                        style={{ backgroundColor: theme.lightBg }}
                      >
                        <IconComp className="w-5 h-5" style={{ color: theme.primary }} />
                      </div>

                      <div className="space-y-1 flex-1 min-w-0">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider block" style={{ color: theme.primary }}>
                          {fac.category}
                        </span>
                        <h4 className="text-base font-bold text-[#202426] truncate">
                          {fac.title}
                        </h4>
                        <p className="text-xs text-[#667085] leading-relaxed line-clamp-2 font-sans">
                          {fac.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </Container>
        </section>

        {/* SECTION 6: ADMISSIONS CTA (SOPHISTICATED BANNER) */}
        <section className="py-16 lg:py-20 bg-[#FAF8F5] border-b border-[#E5E2DC]">
          <Container>
            <div className="p-8 lg:p-12 rounded-3xl bg-[#101820] text-white border border-[#202426] shadow-md flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-3 text-center md:text-left max-w-2xl">
                <span className="text-xs font-mono font-bold uppercase tracking-wider px-3.5 py-1 rounded-full inline-block bg-white/10 text-white border border-white/15">
                  ADMISSIONS 2026–2027
                </span>

                <h3 className="text-3xl sm:text-4xl lg:text-[42px] font-serif-heading font-bold text-white leading-tight">
                  Begin Your Healthcare Education Journey
                </h3>

                <p className="text-sm sm:text-base text-gray-300 font-sans leading-relaxed">
                  Contact our admissions guidance counselors for institution-specific inquiries, course eligibility, and seat availability.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3.5 shrink-0">
                <Link
                  to={admissionsUrl}
                  className="inline-flex items-center gap-2 text-white px-7 py-3.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all shadow-sm hover:scale-[1.02] active:scale-[0.98]"
                  style={{ backgroundColor: theme.primary }}
                >
                  <span>Admission Information</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <SecondaryButton to={enquiryUrl} size="md" className="rounded-full border-white/20 text-white hover:bg-white/10">
                  Enquire Now
                </SecondaryButton>
              </div>
            </div>
          </Container>
        </section>

        {/* SECTION 7: LOCATION & CONTACT (MAP & DETAILS) */}
        <section className="py-16 lg:py-20 bg-[#FAF8F5] border-b border-[#E5E2DC]">
          <Container>
            <div className="mb-10 pb-4 border-b border-[#E5E2DC]">
              <span className="text-xs font-mono font-bold uppercase tracking-wider block mb-1" style={{ color: theme.primary }}>
                LOCATION & CONTACT
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-serif-heading font-bold text-[#202426]">
                Visit {college.name}
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
              {/* Left Interactive Map Card */}
              <div className="lg:col-span-6 bg-white p-3.5 rounded-2xl border border-[#E5E2DC] flex flex-col justify-between shadow-2xs">
                <div className="relative w-full h-[280px] rounded-2xl overflow-hidden bg-[#F3F4F4]">
                  <iframe
                    title={`${college.name} Map Location`}
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(college.address)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                    className="w-full h-full border-0"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Right Contact Details */}
              <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold font-serif-heading text-[#202426]">
                      {college.name}
                    </h3>
                    <p className="text-sm text-[#485056] leading-relaxed pt-1.5 font-sans">
                      {college.address}
                    </p>
                  </div>

                  <div className="space-y-2.5 text-xs sm:text-sm text-[#485056] pt-4 border-t border-[#E5E2DC]">
                    <div className="flex items-center gap-2.5">
                      <ShieldCheck className="w-4 h-4 shrink-0" style={{ color: theme.primary }} />
                      <span><strong>Sponsoring Society:</strong> {college.sponsor}</span>
                    </div>
                    {college.contactPhone && (
                      <div className="flex items-center gap-2.5">
                        <Phone className="w-4 h-4 shrink-0" style={{ color: theme.primary }} />
                        <span><strong>Admissions Helpline:</strong> {college.contactPhone}</span>
                      </div>
                    )}
                    {college.contactEmail && (
                      <div className="flex items-center gap-2.5">
                        <Mail className="w-4 h-4 shrink-0" style={{ color: theme.primary }} />
                        <span><strong>Official Email:</strong> {college.contactEmail}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3.5 pt-2">
                  <a
                    href={college.mapUrl || `https://maps.google.com/?q=${encodeURIComponent(college.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#202426] hover:bg-[#F26A21] text-white px-6 py-3 rounded-full text-xs font-bold transition-colors shadow-2xs"
                  >
                    <span>Get Directions</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <SecondaryButton to={enquiryUrl} size="md" className="rounded-full border-[#E5E2DC] bg-white">
                    Contact Admissions
                  </SecondaryButton>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* SECTION 8: OTHER INSTITUTIONS DIRECTORY */}
        {relatedColleges.length > 0 && (
          <section className="py-14 lg:py-16 bg-white">
            <Container>
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#E5E2DC]">
                <h3 className="text-xl font-serif-heading font-bold text-[#202426]">
                  OTHER ORANGE GROUP INSTITUTIONS
                </h3>
                <Link to="/colleges" className="text-xs font-bold text-[#F26A21] uppercase tracking-wider hover:underline">
                  View All Colleges →
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedColleges.map((rel, idx) => (
                  <CollegeCard key={rel.id} college={rel} index={idx} />
                ))}
              </div>
            </Container>
          </section>
        )}
      </div>
    </PageShell>
  );
};

export default CollegeDetailPage;
