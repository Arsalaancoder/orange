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
  ExternalLink, Building2, Award, Users, HeartHandshake, Lightbulb, Clock
} from 'lucide-react';
import { motion, useScroll, useSpring } from 'framer-motion';
import {
  cardSoftPopVariant,
  staggerGridContainerVariant,
  slideFromLeftVariant,
  slideFromRightVariant
} from '@/components/animations/motionVariants';

export const CollegeDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const college = collegesData.find(c => c.slug === slug);

  // Scroll Progress setup
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  if (!college) {
    return (
      <PageShell>
        <SEO title="Institution Not Found | Orange Group" description="Requested institution not found." />
        <Container className="py-24 text-center space-y-6 bg-[#FAF8F5]">
          <h1 className="text-4xl font-serif-heading font-bold text-[#202426]">
            Institution Not Found
          </h1>
          <p className="text-[#667085] max-w-md mx-auto text-base font-sans">
            The requested institution page does not exist or has been updated in our catalog.
          </p>
          <div>
            <Link
              to="/colleges"
              className="inline-flex items-center gap-2 bg-[#202426] hover:bg-[#F26A21] text-white px-7 py-3.5 rounded-full text-sm font-bold shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all"
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

  // Category specific flags for tailored layout structure
  const isDegreeNursing = college.category === 'Nursing College';
  const isGNMSchool = college.category === 'Nursing School';
  const isParamedical = college.category === 'Paramedical College';

  // Component renderers for modular sequence variation
  const renderHeroSection = () => (
    <section className="relative pt-8 pb-14 lg:pt-12 lg:pb-20 border-b border-[#E5E2DC] overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Content Column (60% width) */}
          <motion.div
            variants={slideFromLeftVariant}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 space-y-6"
          >
            {/* Monogram Badge + Pill Eyebrow */}
            <div className="flex flex-wrap items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center font-mono font-extrabold text-sm border shadow-2xs"
                style={{ backgroundColor: theme.lightBg, color: theme.primary, borderColor: `${theme.primary}30` }}
              >
                {college.logoMonogram}
              </div>
              <span className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider border bg-white text-[#202426] border-[#E5E2DC]">
                {theme.badgeLabel}
              </span>
            </div>

            {/* Main Heading (54–62px) */}
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-serif-heading font-bold text-[#202426] leading-[1.08] tracking-tight">
              {college.name}
            </h1>

            {/* Tagline / Intro */}
            <p className="text-base sm:text-lg text-[#485056] leading-relaxed line-clamp-2 font-sans max-w-2xl font-medium">
              {college.heroTagline}
            </p>

            {/* Sponsor & Location Metadata */}
            <div className="text-xs sm:text-sm text-[#667085] space-y-2 font-medium pt-1">
              <div className="flex items-center gap-2 text-[#202426]">
                <ShieldCheck className="w-4 h-4 shrink-0 text-[#F26A21]" />
                <span>Sponsored by <strong>{college.sponsor}</strong></span>
              </div>
              <div className="flex items-start gap-2 text-[#667085]">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-[#F26A21]" />
                <span>{college.address}</span>
              </div>
            </div>

            {/* Hero Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to={admissionsUrl}
                className="inline-flex items-center gap-2.5 text-white px-7 py-3.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98] bg-[#202426] hover:bg-[#F26A21]"
              >
                <span>Admission Information</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <SecondaryButton to={enquiryUrl} size="md" className="rounded-full border-[#E5E2DC] bg-white text-[#202426] hover:bg-[#F3F4F4]">
                Enquire Now
              </SecondaryButton>
            </div>
          </motion.div>

          {/* Right Column (40% width): 1 Clean Realistic Photograph */}
          <motion.div
            variants={slideFromRightVariant}
            initial="hidden"
            animate="visible"
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-[22px] overflow-hidden border border-[#E5E2DC] shadow-md bg-white">
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <img
                  src={college.heroImage}
                  alt={college.name}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                />
              </div>
            </div>
          </motion.div>

        </div>
      </Container>
    </section>
  );

  const renderPastelStrip = () => (
    <section className="py-12 bg-[#FAF8F5] border-b border-[#E5E2DC]">
      <Container>
        <motion.div
          variants={staggerGridContainerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {/* Card 1: INSTITUTION */}
          <motion.div
            variants={cardSoftPopVariant}
            className="relative p-6 sm:p-7 rounded-3xl bg-[#FFF7F2] border border-[#FDE3D7] shadow-2xs flex flex-col justify-between overflow-hidden group hover:shadow-md transition-all min-h-[220px]"
          >
            <div className="relative z-10 space-y-3.5">
              <div className="w-13 h-13 rounded-full bg-[#FFEADF] text-[#F26A21] flex items-center justify-center shadow-2xs border border-[#FCD2BD]">
                <Building2 className="w-6 h-6 text-[#F26A21]" />
              </div>

              <div className="h-0.5 w-8 bg-[#F26A21] rounded-full" />

              <div className="space-y-1">
                <span className="text-[10px] font-mono font-extrabold uppercase tracking-widest block text-[#806B61]">
                  INSTITUTION
                </span>
                <h4 className="text-xl font-extrabold font-serif-heading text-[#202426]">
                  {college.category}
                </h4>
                <p className="text-xs text-[#667085] leading-relaxed font-sans pt-1 max-w-[85%]">
                  Quality nursing education for a healthier tomorrow.
                </p>
              </div>
            </div>

            {/* Bottom Right Wave Graphic & Hand-sketched School Building SVG Watermark */}
            <div className="absolute -bottom-4 -right-4 text-[#F26A21]/20 pointer-events-none z-0">
              <svg className="w-40 h-40" viewBox="0 0 140 140" fill="none">
                <path d="M140 40C100 40 70 70 70 140H140V40Z" fill="currentColor" fillOpacity="0.12" />
                <path d="M50 115H95V65L72.5 45L50 65V115Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M72.5 45V30M72.5 30L85 34L72.5 38" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="72.5" cy="68" r="7" stroke="currentColor" strokeWidth="2"/>
                <path d="M63 115V88H82V115" stroke="currentColor" strokeWidth="2"/>
                <path d="M30 115H115" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </div>
          </motion.div>

          {/* Card 2: SPONSOR */}
          <motion.div
            variants={cardSoftPopVariant}
            className="relative p-6 sm:p-7 rounded-3xl bg-[#F0FDF4] border border-[#DCFCE7] shadow-2xs flex flex-col justify-between overflow-hidden group hover:shadow-md transition-all min-h-[220px]"
          >
            <div className="relative z-10 space-y-3.5">
              <div className="w-13 h-13 rounded-full bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center shadow-2xs border border-[#BBF7D0]">
                <ShieldCheck className="w-6 h-6 text-[#16A34A]" />
              </div>

              <div className="h-0.5 w-8 bg-[#16A34A] rounded-full" />

              <div className="space-y-1">
                <span className="text-[10px] font-mono font-extrabold uppercase tracking-widest block text-[#52735C]">
                  SPONSOR
                </span>
                <h4 className="text-xl font-extrabold font-serif-heading text-[#202426] leading-tight" title={college.sponsor}>
                  {college.sponsor}
                </h4>
                <p className="text-xs text-[#667085] leading-relaxed font-sans pt-1 max-w-[85%]">
                  Empowering education for a brighter future.
                </p>
              </div>
            </div>

            {/* Bottom Right Wave Graphic & Hand-sketched Sprout SVG Watermark */}
            <div className="absolute -bottom-4 -right-4 text-[#16A34A]/20 pointer-events-none z-0">
              <svg className="w-40 h-40" viewBox="0 0 140 140" fill="none">
                <path d="M140 35C95 35 65 68 65 140H140V35Z" fill="currentColor" fillOpacity="0.12" />
                <path d="M70 115V68" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                <path d="M70 75C52 58 35 64 28 82C43 90 60 84 70 75Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" fill="currentColor" fillOpacity="0.2"/>
                <path d="M70 68C88 50 105 56 112 74C97 82 80 76 70 68Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" fill="currentColor" fillOpacity="0.2"/>
                <path d="M70 56C60 42 70 24 70 24C70 24 80 42 70 56Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" fill="currentColor" fillOpacity="0.2"/>
              </svg>
            </div>
          </motion.div>

          {/* Card 3: CAMPUS */}
          <motion.div
            variants={cardSoftPopVariant}
            className="relative p-6 sm:p-7 rounded-3xl bg-[#F0F7FF] border border-[#D0E5FF] shadow-2xs flex flex-col justify-between overflow-hidden group hover:shadow-md transition-all min-h-[220px]"
          >
            <div className="relative z-10 space-y-3.5">
              <div className="w-13 h-13 rounded-full bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center shadow-2xs border border-[#BAE6FD]">
                <MapPin className="w-6 h-6 text-[#0284C7]" />
              </div>

              <div className="h-0.5 w-8 bg-[#0284C7] rounded-full" />

              <div className="space-y-1">
                <span className="text-[10px] font-mono font-extrabold uppercase tracking-widest block text-[#556D84]">
                  CAMPUS
                </span>
                <h4 className="text-xl font-extrabold font-serif-heading text-[#202426]">
                  {college.locationGroup}
                </h4>
                <p className="text-xs text-[#667085] leading-relaxed font-sans pt-1 max-w-[85%]">
                  Our campus in a vibrant learning community.
                </p>
              </div>
            </div>

            {/* Bottom Right Wave Graphic & Hand-sketched Map Location SVG Watermark */}
            <div className="absolute -bottom-4 -right-4 text-[#0284C7]/20 pointer-events-none z-0">
              <svg className="w-40 h-40" viewBox="0 0 140 140" fill="none">
                <path d="M140 30C90 30 60 65 60 140H140V30Z" fill="currentColor" fillOpacity="0.12" />
                <path d="M85 62C85 46 72 32 56 32C40 32 27 46 27 62C27 82 56 108 56 108C56 108 85 82 85 62Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="56" cy="58" r="8" stroke="currentColor" strokeWidth="2.5"/>
                <path d="M15 120C40 102 75 125 105 108" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray="5 5"/>
              </svg>
            </div>
          </motion.div>

          {/* Card 4: REGISTRATION */}
          <motion.div
            variants={cardSoftPopVariant}
            className="relative p-6 sm:p-7 rounded-3xl bg-[#FAF5FF] border border-[#E9D5FF] shadow-2xs flex flex-col justify-between overflow-hidden group hover:shadow-md transition-all min-h-[220px]"
          >
            <div className="relative z-10 space-y-3.5">
              <div className="w-13 h-13 rounded-full bg-[#F3E8FF] text-[#9333EA] flex items-center justify-center shadow-2xs border border-[#E9D5FF]">
                <Award className="w-6 h-6 text-[#9333EA]" />
              </div>

              <div className="h-0.5 w-8 bg-[#9333EA] rounded-full" />

              <div className="space-y-1">
                <span className="text-[10px] font-mono font-extrabold uppercase tracking-widest block text-[#6E5A84]">
                  REGISTRATION
                </span>
                <h4 className="text-xl font-extrabold font-serif-heading text-[#202426]">
                  {college.registrationNumber ? `Reg. ${college.registrationNumber}` : 'State Approved'}
                </h4>
                <p className="text-xs text-[#667085] leading-relaxed font-sans pt-1 max-w-[85%]">
                  Officially registered and recognized.
                </p>
              </div>
            </div>

            {/* Bottom Right Wave Graphic & Hand-sketched Certificate Seal SVG Watermark */}
            <div className="absolute -bottom-4 -right-4 text-[#9333EA]/20 pointer-events-none z-0">
              <svg className="w-40 h-40" viewBox="0 0 140 140" fill="none">
                <path d="M140 35C95 35 65 65 65 140H140V35Z" fill="currentColor" fillOpacity="0.12" />
                <rect x="40" y="28" width="62" height="78" rx="8" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                <line x1="52" y1="42" x2="86" y2="42" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                <line x1="52" y1="52" x2="80" y2="52" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <line x1="52" y1="62" x2="74" y2="62" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="82" cy="85" r="11" stroke="currentColor" strokeWidth="2.5" fill="currentColor" fillOpacity="0.2"/>
                <path d="M76 94L73 110L82 103L91 110L88 94" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
              </svg>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );

  const renderAboutSection = () => (
    <section className="py-16 lg:py-20 border-b border-[#E5E2DC] bg-[#FAF8F5]">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          <motion.div
            variants={slideFromLeftVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-7 space-y-5"
          >
            <span className="text-xs font-mono font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-[#E5E2DC] inline-block bg-white text-[#202426]">
              ABOUT THE INSTITUTION
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-serif-heading font-bold text-[#202426] leading-tight">
              {college.aboutHeading}
            </h2>

            <div className="space-y-3 text-base text-[#485056] leading-relaxed font-sans">
              {college.aboutParagraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
              {college.aboutHighlights.map((hl, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl bg-white border border-[#E5E2DC] shadow-2xs space-y-1.5"
                >
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-[#FAF8F5] border border-[#E5E2DC]">
                    <CheckCircle2 className="w-4 h-4 text-[#F26A21]" />
                  </div>
                  <span className="text-xs font-bold text-[#202426] block leading-snug">{hl}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={slideFromRightVariant}
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
            </div>
          </motion.div>

        </div>
      </Container>
    </section>
  );

  const renderProgramsSection = () => (
    <section className="py-16 lg:py-20 bg-white border-b border-[#E5E2DC]">
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-[#E5E2DC] gap-4">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider block mb-1 text-[#F26A21]">
              OFFERED COURSES
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-serif-heading font-bold text-[#202426]">
              Explore Programs at This Institution
            </h2>
          </div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider bg-[#FAF8F5] text-[#202426] px-3.5 py-1.5 rounded-full border border-[#E5E2DC]">
            {institutionPrograms.length} Course{institutionPrograms.length > 1 ? 's' : ''} Available
          </span>
        </div>

        <motion.div
          variants={staggerGridContainerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
        >
          {institutionPrograms.map((prog) => (
            <motion.article
              key={prog.id}
              variants={cardSoftPopVariant}
              className="group bg-[#FAF8F5] rounded-[22px] border border-[#E5E2DC] p-6 lg:p-7 flex flex-col justify-between hover:-translate-y-1 hover:shadow-md hover:border-[#E5E2DC] transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border bg-white text-[#202426] border-[#E5E2DC]"
                  >
                    {prog.code}
                  </span>
                  {prog.duration && (
                    <span className="text-xs font-mono font-semibold text-[#667085] flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#667085]" />
                      <span>{prog.duration}</span>
                    </span>
                  )}
                </div>

                <h3 className="text-2xl font-serif-heading font-bold text-[#202426] leading-tight group-hover:text-[#F26A21] transition-colors">
                  {prog.fullTitle}
                </h3>

                {prog.eligibility && (
                  <div className="inline-block px-3 py-1 rounded-lg bg-white border border-[#E5E2DC] text-xs font-mono font-semibold text-[#202426]">
                    Eligibility: {prog.eligibility}
                  </div>
                )}

                <p className="text-sm text-[#485056] leading-relaxed font-sans line-clamp-3">
                  {prog.overview}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#E5E2DC] flex items-center justify-between text-xs">
                <span className="font-mono text-[#667085]">Degree / Diploma</span>
                <Link
                  to={`/programs/${prog.slug}`}
                  className="inline-flex items-center gap-1.5 font-bold uppercase tracking-wider transition-colors text-[#202426] group-hover:text-[#F26A21] group-hover:translate-x-1 duration-200"
                >
                  <span>Explore Program</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </Container>
    </section>
  );

  const renderLearningSection = () => (
    <section className="py-16 lg:py-20 bg-white border-b border-[#E5E2DC]">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          <motion.div
            variants={slideFromLeftVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-[22px] overflow-hidden border border-[#E5E2DC] shadow-sm aspect-[4/3] bg-white">
              <img
                src={college.campusLifeImage}
                alt={college.learningSectionTitle}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.03]"
              />
            </div>
          </motion.div>

          <motion.div
            variants={slideFromRightVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-7 space-y-6"
          >
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider block mb-1 text-[#F26A21]">
                LEARNING METHODOLOGY
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-serif-heading font-bold text-[#202426]">
                {college.learningSectionTitle}
              </h2>
              <p className="text-sm text-[#667085] leading-relaxed pt-1.5 font-sans">
                {college.learningSectionSubtitle}
              </p>
            </div>

            {/* Alternating Pastel Blocks for Learning Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {college.learningHighlights.map((block, idx) => {
                const pastelStyles = [
                  "bg-[#EDF6EE] border-[#D8EBD9]",
                  "bg-[#EAF2FC] border-[#D3E4F9]",
                  "bg-[#FFF2EB] border-[#FDE6D8]",
                  "bg-[#F4EEFA] border-[#E5D7F5]"
                ];
                const blockStyle = pastelStyles[idx % pastelStyles.length];
                return (
                  <div key={idx} className={`p-5 rounded-[18px] border space-y-1.5 ${blockStyle}`}>
                    <h3 className="text-sm font-bold text-[#202426]">{block.title}</h3>
                    <p className="text-xs text-[#667085] leading-relaxed font-sans">
                      {block.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </motion.div>

        </div>
      </Container>
    </section>
  );

  const renderGallerySection = () => (
    college.gallery && college.gallery.length > 0 ? (
      <section className="py-16 lg:py-20 bg-white border-b border-[#E5E2DC]">
        <Container>
          <div className="mb-10 pb-4 border-b border-[#E5E2DC] flex items-end justify-between">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider block mb-1 text-[#F26A21]">
                CAMPUS GALLERY
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-serif-heading font-bold text-[#202426]">
                Campus Infrastructure & Skill Labs
              </h2>
            </div>
          </div>

          <motion.div
            variants={staggerGridContainerVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {college.gallery.map((item, idx) => (
              <motion.div
                key={idx}
                variants={cardSoftPopVariant}
                className="group relative rounded-2xl overflow-hidden border border-[#E5E2DC] shadow-xs bg-[#FAF8F5] aspect-[4/3]"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent flex flex-col justify-end p-5 text-white">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#F26A21] block">
                    {item.category}
                  </span>
                  <h4 className="text-base font-bold text-white leading-snug">
                    {item.title}
                  </h4>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>
    ) : null
  );

  const renderDevelopmentSection = () => (
    <section className="py-16 lg:py-20 bg-[#FAF8F5] border-b border-[#E5E2DC]">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-wider block text-[#F26A21]">
            STUDENT DEVELOPMENT
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif-heading font-bold text-[#202426]">
            {college.developmentHeading}
          </h2>
        </div>

        <motion.div
          variants={staggerGridContainerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {college.developmentHighlights.map((item, idx) => {
            const bgClasses = [
              "bg-[#FFF2EB] border-[#FDE6D8]",
              "bg-[#EDF6EE] border-[#D8EBD9]",
              "bg-[#EAF2FC] border-[#D3E4F9]",
              "bg-[#F4EEFA] border-[#E5D7F5]",
              "bg-[#FAF5E8] border-[#F3E8CE]",
              "bg-white border-[#E5E2DC]"
            ];
            const bgStyle = bgClasses[idx % bgClasses.length];
            return (
              <motion.div key={idx} variants={cardSoftPopVariant} className={`p-6 rounded-[20px] border space-y-2 ${bgStyle}`}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white text-[#202426] font-mono text-xs font-bold shadow-2xs border border-[#E5E2DC]">
                  {String(idx + 1).padStart(2, '0')}
                </div>
                <h3 className="text-base font-bold text-[#202426]">{item.title}</h3>
                <p className="text-xs text-[#667085] leading-relaxed font-sans">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );

  const renderBeyondAcademicsSection = () => (
    <section className="py-16 lg:py-20 bg-white border-b border-[#E5E2DC]">
      <Container>
        <div className="mb-10 pb-4 border-b border-[#E5E2DC]">
          <span className="text-xs font-mono font-bold uppercase tracking-wider block mb-1 text-[#F26A21]">
            CAMPUS ACTIVITIES
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-serif-heading font-bold text-[#202426]">
            Beyond Academics
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-6 rounded-[20px] bg-[#FAF8F5] border border-[#E5E2DC] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-[#E5E2DC] flex items-center justify-center text-[#202426]">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#202426]">Seminars & Talks</h3>
            <p className="text-xs text-[#667085] leading-relaxed font-sans">
              Academic discussions and guest lectures conducted by health specialists.
            </p>
          </div>

          <div className="p-6 rounded-[20px] bg-[#FAF8F5] border border-[#E5E2DC] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-[#E5E2DC] flex items-center justify-center text-[#202426]">
              <Lightbulb className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#202426]">Skill Workshops</h3>
            <p className="text-xs text-[#667085] leading-relaxed font-sans">
              Focused practical workshops supporting communication and care procedures.
            </p>
          </div>

          <div className="p-6 rounded-[20px] bg-[#FAF8F5] border border-[#E5E2DC] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-[#E5E2DC] flex items-center justify-center text-[#202426]">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#202426]">Health Outreach</h3>
            <p className="text-xs text-[#667085] leading-relaxed font-sans">
              Student-led health awareness initiatives and poster presentations.
            </p>
          </div>

          <div className="p-6 rounded-[20px] bg-[#FAF8F5] border border-[#E5E2DC] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-[#E5E2DC] flex items-center justify-center text-[#202426]">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#202426]">Student Life</h3>
            <p className="text-xs text-[#667085] leading-relaxed font-sans">
              Institutional events promoting teamwork, leadership, and campus community.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );

  const renderCTASection = () => (
    <section className="py-16 lg:py-20 bg-[#FAF8F5] border-b border-[#E5E2DC]">
      <Container>
        <div className="p-8 lg:p-12 rounded-[28px] bg-white border border-[#E5E2DC] shadow-sm space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-[#E5E2DC]">
            <div className="space-y-3 max-w-2xl">
              <span className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider border inline-block bg-[#FAF8F5] text-[#202426] border-[#E5E2DC]">
                ADMISSIONS 2026–2027
              </span>

              <h3 className="text-3xl sm:text-4xl lg:text-[40px] font-serif-heading font-bold text-[#202426] leading-tight">
                {college.ctaHeading}
              </h3>

              <p className="text-sm sm:text-base text-[#485056] font-sans leading-relaxed">
                {college.ctaDescription}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3.5 shrink-0">
              <Link
                to={admissionsUrl}
                className="inline-flex items-center gap-2 text-white px-7 py-3.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all shadow-sm hover:scale-[1.02] active:scale-[0.98] bg-[#202426] hover:bg-[#F26A21]"
              >
                <span>Admission Information</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <SecondaryButton to={enquiryUrl} size="md" className="rounded-full border-[#E5E2DC] bg-[#FAF8F5] text-[#202426] hover:bg-[#F3F4F4]">
                Enquire Now
              </SecondaryButton>
            </div>
          </div>

          <div className="p-5 rounded-[18px] bg-[#FAF8F5] border border-[#E5E2DC] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-0.5">
              <h4 className="text-sm font-bold text-[#202426]">Need Admission Guidance?</h4>
              <p className="text-xs text-[#667085] font-sans">
                Contact our admissions team for course details, eligibility criteria, and fee structure guidance.
              </p>
            </div>
            <Link
              to={enquiryUrl}
              className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider shrink-0 text-[#202426] hover:text-[#F26A21]"
            >
              <span>Contact Team →</span>
            </Link>
          </div>

        </div>
      </Container>
    </section>
  );

  const renderLocationSection = () => (
    <section className="py-16 lg:py-20 bg-white border-b border-[#E5E2DC]">
      <Container>
        <div className="mb-10 pb-4 border-b border-[#E5E2DC]">
          <span className="text-xs font-mono font-bold uppercase tracking-wider block mb-1 text-[#F26A21]">
            LOCATION & CONTACT
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-serif-heading font-bold text-[#202426]">
            Visit {college.name}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          
          <div className="lg:col-span-6 bg-[#FAF8F5] p-3.5 rounded-2xl border border-[#E5E2DC] shadow-2xs">
            <div className="relative w-full h-[280px] rounded-2xl overflow-hidden bg-[#F3F4F4]">
              <iframe
                title={`${college.name} Map Location`}
                src={`https://maps.google.com/maps?q=${encodeURIComponent(college.address)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                className="w-full h-full border-0"
                loading="lazy"
              />
            </div>
          </div>

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
                  <ShieldCheck className="w-4 h-4 shrink-0 text-[#F26A21]" />
                  <span><strong>Sponsoring Society:</strong> {college.sponsor}</span>
                </div>
                {college.contactPhone && (
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 shrink-0 text-[#F26A21]" />
                    <span><strong>Admissions Helpline:</strong> {college.contactPhone}</span>
                  </div>
                )}
                {college.contactEmail && (
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 shrink-0 text-[#F26A21]" />
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

              <SecondaryButton to={enquiryUrl} size="md" className="rounded-full border-[#E5E2DC] bg-[#FAF8F5]">
                Contact Admissions
              </SecondaryButton>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );

  return (
    <PageShell>
      <SEO
        title={`${college.name} | Orange Group`}
        description={college.seoDescription}
      />

      {/* Top Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3.5px] z-50 origin-left bg-[#F26A21]"
        style={{ scaleX }}
      />

      <div className="bg-[#FAF8F5] text-[#202426] font-sans min-h-screen">
        
        {/* HERO + PASTEL STRIP (COMMON ANCHORS) */}
        {renderHeroSection()}
        {renderPastelStrip()}

        {/* ALTERNATING SECTION COMPOSITION BY INSTITUTION CATEGORY */}
        {isDegreeNursing && (
          <>
            {renderAboutSection()}
            {renderProgramsSection()}
            {renderLearningSection()}
            {renderDevelopmentSection()}
            {renderBeyondAcademicsSection()}
            {renderGallerySection()}
          </>
        )}

        {isGNMSchool && (
          <>
            {renderProgramsSection()}
            {renderLearningSection()}
            {renderAboutSection()}
            {renderDevelopmentSection()}
            {renderBeyondAcademicsSection()}
            {renderGallerySection()}
          </>
        )}

        {isParamedical && (
          <>
            {renderProgramsSection()}
            {renderLearningSection()}
            {renderAboutSection()}
            {renderDevelopmentSection()}
            {renderBeyondAcademicsSection()}
            {renderGallerySection()}
          </>
        )}

        {/* ADMISSIONS CTA + LOCATION + DIRECTORY */}
        {renderCTASection()}
        {renderLocationSection()}

        {relatedColleges.length > 0 && (
          <section className="py-14 lg:py-16 bg-[#FAF8F5]">
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
