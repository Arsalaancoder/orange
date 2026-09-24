import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PageShell } from '@/components/layout/PageShell';
import { Container } from '@/components/shared/Container';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { Eyebrow } from '@/components/shared/Eyebrow';
import { PrimaryButton } from '@/components/shared/PrimaryButton';
import { SecondaryButton } from '@/components/shared/SecondaryButton';
import { ImagePlaceholder } from '@/components/shared/ImagePlaceholder';
import { CollegeCard } from '@/components/colleges/CollegeCard';
import { SwissGradientCarousel } from '@/components/programs/SwissGradientCarousel';
import { StaggerContainer, StaggerItem } from '@/components/animations/Stagger';
import { Reveal } from '@/components/animations/Reveal';
import {
  headingSoftPopVariant,
  cardSoftPopVariant,
  featuredCardPopVariant,
  staggerGridContainerVariant,
  largeImageScaleRevealVariant,
  fadeDownVariant,
  DEFAULT_VIEWPORT,
} from '@/components/animations/motionVariants';

import { HeroCarousel } from '@/components/home/HeroCarousel';
import { FaqSection } from '@/components/ui/habit-faq-scroller';
import { collegesData } from '@/data/colleges';
import { programsData } from '@/data/programs';
import { whyChooseUsData } from '@/data/whyChooseUs';
import { scrollingAdmissionFaqData } from '@/data/faqs';

import { 
  GraduationCap, 
  BookOpen, 
  HeartPulse, 
  Check, 
  UserCheck, 
  ArrowRight,
  Quote,
  Stethoscope,
  Activity,
  Award
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const HomePage: React.FC = () => {
  const [programFilter, setProgramFilter] = useState<'All' | 'Nursing' | 'Paramedical'>('All');

  const filteredPrograms = programFilter === 'All'
    ? programsData.slice(0, 6)
    : programsData.filter(p => p.category === programFilter).slice(0, 6);

  const featuredColleges = collegesData;

  return (
    <PageShell
      title="Home"
      description="Orange Group of Nursing & Paramedical Colleges. Empowering Healthcare Professionals. Building a Healthier Future. Offering B.Sc Nursing, GNM, and Paramedical Diplomas across Chengicherla / Hyderabad, Nagaram / Hyderabad, and Nalgonda."
    >
      {/* 1. HERO CAROUSEL */}
      <HeroCarousel />

      {/* 2. ABOUT OVERVIEW SECTION */}
      <section className="section-padding bg-white border-b border-[#F0E8FF] relative overflow-hidden">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Content Column */}
            <Reveal variant="fadeUp" className="lg:col-span-6 space-y-6">
              <SectionHeading
                eyebrow="ABOUT ORANGE GROUP"
                title="Hear what leaders say about Healthcare Training."
                subtitle="Orange Group of Medical Colleges is dedicated to developing competent and compassionate healthcare professionals through structured academic education and practical training."
                className="mb-6"
              />

              <p className="text-[#667085] text-base leading-relaxed">
                As a premier healthcare educational group, our institutions blend classroom theory, state-of-the-art laboratory practice, clinical hospital rotations, and continuous career mentorship to guide every student toward a rewarding medical career.
              </p>

              {/* 4 Feature Badges */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-[#F8F4FE] border border-[#E8D9FF] flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#EBE2FF] text-[#7C3AED] flex items-center justify-center shrink-0">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-[#1F192F]">Academic Learning</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#F8F4FE] border border-[#E8D9FF] flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#EBE2FF] text-[#7C3AED] flex items-center justify-center shrink-0">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-[#1F192F]">Practical Training</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#F8F4FE] border border-[#E8D9FF] flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#EBE2FF] text-[#7C3AED] flex items-center justify-center shrink-0">
                    <HeartPulse className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-[#1F192F]">Clinical Exposure</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#F8F4FE] border border-[#E8D9FF] flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#EBE2FF] text-[#7C3AED] flex items-center justify-center shrink-0">
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-[#1F192F]">Faculty Mentoring</span>
                </div>
              </div>

              <div className="pt-4">
                <PrimaryButton to="/about" size="lg">
                  View Our Services
                </PrimaryButton>
              </div>
            </Reveal>

            {/* Right Media Frame */}
            <motion.div
              variants={largeImageScaleRevealVariant}
              initial="hidden"
              whileInView="visible"
              viewport={DEFAULT_VIEWPORT}
              className="lg:col-span-6"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-purple-500/10 border border-[#E8D9FF] group">
                <ImagePlaceholder
                  label="Nursing & Practical Training"
                  imageUrl="/images/cards/nursing-lab.jpg"
                  aspectRatio="4:3"
                  className="w-full h-full object-cover rounded-none border-0 transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* 3. CORE VALUES SECTION */}
      <section className="section-padding bg-[#F8F4FE] border-b border-[#F0E8FF] relative overflow-hidden">
        {/* Subtle Decorative Sparkle Background */}
        <div className="absolute top-8 right-8 text-[#8B5CF6]/20 pointer-events-none z-0">
          <svg className="w-24 h-24" viewBox="0 0 100 100" fill="none">
            <path d="M50 0L54 46L100 50L54 54L50 100L46 54L0 50L46 46L50 0Z" fill="currentColor"/>
          </svg>
        </div>

        <Container className="relative z-10">
          <motion.div
            variants={headingSoftPopVariant}
            initial="hidden"
            whileInView="visible"
            viewport={DEFAULT_VIEWPORT}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <Eyebrow theme="purple" className="mb-4">
              OUR VALUES
            </Eyebrow>
            <h2 className="heading-section font-bold text-[#1F192F] tracking-tight inline-flex items-center gap-2 flex-wrap justify-center">
              <span>Hear what people are saying about Orange Group.</span>
              <span className="text-[#8B5CF6] inline-flex">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                </svg>
              </span>
            </h2>
          </motion.div>

          {/* 3-Column Staggered Grid */}
          <motion.div
            variants={staggerGridContainerVariant}
            initial="hidden"
            whileInView="visible"
            viewport={DEFAULT_VIEWPORT}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch"
          >
            {/* Card 1: White Card */}
            <motion.div
              variants={cardSoftPopVariant}
              className="bg-white rounded-3xl p-8 border border-[#E8D9FF] shadow-sm flex flex-col justify-between items-center text-center group hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
            >
              <div className="space-y-5">
                <div className="w-16 h-16 rounded-full bg-[#EBE2FF] text-[#7C3AED] flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                  <Stethoscope className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-[#1F192F]">Academic Progress</h3>
                <p className="text-sm text-[#667085] leading-relaxed">
                  Our structured nursing and paramedical syllabus helps students navigate their academic goals with confidence and diagnostic precision.
                </p>
              </div>
              <div className="pt-8">
                <Link to="/programs" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7C3AED] hover:text-[#6D28D9] uppercase tracking-wider group-hover:underline">
                  <span>Read More</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>

            {/* Card 2: VIBRANT PURPLE HIGHLIGHTED CARD WITH OVERSHOOT POP */}
            <motion.div
              variants={featuredCardPopVariant}
              className="bg-[#8B5CF6] text-white rounded-3xl p-8 shadow-2xl shadow-purple-500/25 flex flex-col justify-between items-center text-center transform md:-translate-y-2 group hover:-translate-y-3 transition-all duration-300"
            >
              <div className="space-y-5">
                <div className="w-16 h-16 rounded-full bg-white/20 text-white flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                  <Activity className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Healthcare Administration</h3>
                <p className="text-sm text-purple-100 leading-relaxed">
                  Your education is our mission. We believe in making your dreams of a medical career a reality with top clinical faculty and labs.
                </p>
              </div>
              <div className="pt-8">
                <Link to="/about" className="inline-flex items-center gap-1.5 text-xs font-bold text-white hover:text-purple-100 uppercase tracking-wider group-hover:underline">
                  <span>Read More</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>

            {/* Card 3: White Card */}
            <motion.div
              variants={cardSoftPopVariant}
              className="bg-white rounded-3xl p-8 border border-[#E8D9FF] shadow-sm flex flex-col justify-between items-center text-center group hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
            >
              <div className="space-y-5">
                <div className="w-16 h-16 rounded-full bg-[#EBE2FF] text-[#7C3AED] flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                  <Award className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-[#1F192F]">Secret Success Teamwork</h3>
                <p className="text-sm text-[#667085] leading-relaxed">
                  Collaborative clinical learning, interdisciplinary workshops, and patient care simulations foster strong teamwork skills.
                </p>
              </div>
              <div className="pt-8">
                <Link to="/facilities" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7C3AED] hover:text-[#6D28D9] uppercase tracking-wider group-hover:underline">
                  <span>Read More</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* 4. MISSION & QUOTE SECTION */}
      <section className="section-padding bg-white border-b border-[#F0E8FF]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <Reveal variant="fadeUp" className="lg:col-span-6 space-y-6">
              <SectionHeading
                eyebrow="OUR MISSION"
                title="Hear what leaders say about career Management."
                subtitle="As an accredited group of medical colleges, Orange Group understands the nuances necessary to navigate healthcare education and build rewarding hospital careers."
                className="mb-6"
              />

              <p className="text-[#667085] text-base leading-relaxed">
                We empower students from diverse backgrounds with affordable, high-quality nursing and paramedical education, combining rigorous academic study with compassionate bedside manner.
              </p>

              <div className="pt-4">
                <PrimaryButton to="/admissions" size="lg">
                  Join Our Coaching
                </PrimaryButton>
              </div>
            </Reveal>

            {/* Right Quote Callout Box */}
            <motion.div
              variants={cardSoftPopVariant}
              initial="hidden"
              whileInView="visible"
              viewport={DEFAULT_VIEWPORT}
              className="lg:col-span-6 bg-[#F8F4FE] rounded-3xl p-8 md:p-10 border border-[#E8D9FF] shadow-xs space-y-6"
            >
              <div className="space-y-3">
                <Quote className="w-10 h-10 text-[#8B5CF6]/40" />
                <h3 className="text-xl md:text-2xl font-serif-heading font-bold text-[#1F192F] leading-snug">
                  "How we can improve your Healthcare Skills with our dedicated clinical coaching."
                </h3>
                <p className="text-xs md:text-sm text-[#667085] leading-relaxed">
                  Our structured clinical mentoring helps students master complex medical procedures, laboratory diagnostics, and empathetic patient care.
                </p>
              </div>

              {/* Checkmark Bullet List */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#8B5CF6] text-white flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm font-semibold text-[#1F192F]">We want to understand your career goals.</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#8B5CF6] text-white flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm font-semibold text-[#1F192F]">Positive clinical mindset & ethics.</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#8B5CF6] text-white flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm font-semibold text-[#1F192F]">Accredited B.Sc Nursing & Diploma (BSc/GNM/DMLT).</span>
                </div>
              </div>

              {/* Author Badge */}
              <div className="pt-4 border-t border-[#E8D9FF] flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#8B5CF6] bg-[#EBE2FF] flex items-center justify-center font-bold text-[#7C3AED]">
                  OG
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#1F192F]">Dr. Orange Group Director</h4>
                  <p className="text-xs text-[#667085]">Founder & Academic Chairman</p>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* 5. VISION & PROGRAM ACADEMICS EXPLORER */}
      <section className="section-padding bg-[#F8F4FE] border-b border-[#F0E8FF] relative overflow-hidden">
        {/* Subtle Corner Sparkle Decor */}
        <div className="absolute top-6 right-6 text-[#8B5CF6]/20 pointer-events-none">
          <svg className="w-20 h-20" viewBox="0 0 100 100" fill="none">
            <path d="M50 0L54 46L100 50L54 54L50 100L46 54L0 50L46 46L50 0Z" fill="currentColor"/>
          </svg>
        </div>

        <Container className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-16">
            {/* Left Column: Tall Featured Image */}
            <motion.div
              variants={largeImageScaleRevealVariant}
              initial="hidden"
              whileInView="visible"
              viewport={DEFAULT_VIEWPORT}
              className="lg:col-span-6"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-purple-500/10 border border-[#E8D9FF]">
                <ImagePlaceholder
                  label="Healthcare Training Setup"
                  imageUrl="/images/cards/anesthesia-ot.jpg"
                  aspectRatio="4:5"
                  className="w-full h-full object-cover rounded-none border-0"
                />
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full border border-[#E8D9FF] shadow-xs">
                  <span className="text-xs font-bold text-[#7C3AED]">State-of-the-Art Labs</span>
                </div>
              </div>
            </motion.div>

            {/* Right Content */}
            <Reveal variant="fadeUp" className="lg:col-span-6 space-y-6">
              <SectionHeading
                eyebrow="OUR VISION"
                title="Hear what people are saying about career Management."
                subtitle="Our vision is to build a benchmark institution for healthcare and medical education across Telangana."
                className="mb-6"
              />

              <p className="text-[#667085] text-base leading-relaxed">
                As a leading medical coaching institution, our faculty ensures that students master both diagnostic science and compassionate care through hands-on practical learning.
              </p>

              {/* Checkmark List */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#8B5CF6] text-white flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm font-semibold text-[#1F192F]">We want to understand your learning path.</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#8B5CF6] text-white flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm font-semibold text-[#1F192F]">Positive Thoughts & Continuous Improvement.</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#8B5CF6] text-white flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm font-semibold text-[#1F192F]">Comprehensive Nursing & Paramedical Programs.</span>
                </div>
              </div>

              <div className="pt-4">
                <PrimaryButton to="/programs" size="lg">
                  Join Our Coaching
                </PrimaryButton>
              </div>
            </Reveal>
          </div>

          {/* Academic Programs Filter Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pt-8 border-t border-[#E8D9FF]">
            <SectionHeading
              eyebrow="ACADEMIC PROGRAMS"
              title="Nursing & Paramedical Education"
              subtitle="Career-oriented degree and diploma programs designed to build clinical and diagnostic skills."
              className="mb-0 max-w-2xl"
            />

            {/* Program Filter Buttons */}
            <motion.div
              variants={fadeDownVariant}
              initial="hidden"
              whileInView="visible"
              viewport={DEFAULT_VIEWPORT}
              className="flex items-center gap-2 p-1.5 bg-white rounded-2xl border border-[#E8D9FF] shrink-0 self-start md:self-auto shadow-sm"
            >
              {(['All', 'Nursing', 'Paramedical'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setProgramFilter(cat)}
                  className={`px-4 py-2 text-xs font-bold rounded-xl uppercase tracking-wider transition-all cursor-pointer ${
                    programFilter === cat
                      ? 'bg-[#8B5CF6] text-white shadow-sm'
                      : 'text-[#667085] hover:text-[#1F192F]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </motion.div>
          </div>

          {/* Swiss Gradients Radial Arc Carousel */}
          <Reveal variant="scaleUp">
            <SwissGradientCarousel programs={filteredPrograms} />
          </Reveal>

          <div className="mt-8 text-center">
            <SecondaryButton to="/programs" size="lg">
              View All Academic Programs
            </SecondaryButton>
          </div>
        </Container>
      </section>

      {/* 6. OUR COLLEGES SECTION */}
      <section className="section-padding bg-white border-b border-[#F0E8FF]">
        <Container>
          <Reveal variant="fadeUp" className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <SectionHeading
              eyebrow="OUR INSTITUTIONS"
              title="8 Colleges & Schools Across Telangana"
              subtitle="Nursing colleges, nursing schools and paramedical colleges located in Chengicherla / Hyderabad, Nagaram / Hyderabad and Nalgonda."
              className="mb-0 max-w-2xl"
            />
            <SecondaryButton to="/colleges" className="shrink-0 self-start md:self-auto">
              Explore All Institutions
            </SecondaryButton>
          </Reveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredColleges.map((college, idx) => (
              <StaggerItem key={college.id}>
                <CollegeCard college={college} index={idx} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      {/* 7. WHY CHOOSE ORANGE GROUP (INSTITUTIONAL PILLARS) */}
      <section className="section-padding bg-[#F8F4FE] border-b border-[#F0E8FF]">
        <Container>
          <Reveal variant="fadeUp">
            <SectionHeading
              eyebrow="INSTITUTIONAL PILLARS"
              title="Why Study at Orange Group?"
              subtitle="Seven core educational commitments driving academic focus, practical training, and student support."
            />
          </Reveal>

          <motion.div
            variants={staggerGridContainerVariant}
            initial="hidden"
            whileInView="visible"
            viewport={DEFAULT_VIEWPORT}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {whyChooseUsData.map((pillar) => (
              <motion.div
                key={pillar.id}
                variants={cardSoftPopVariant}
                className="group p-6 rounded-3xl bg-white border border-[#E8D9FF] flex flex-col justify-between transition-all duration-300 hover:border-[#8B5CF6] hover:-translate-y-1.5 hover:shadow-xl hover:shadow-purple-500/10"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#EBE2FF] text-[#7C3AED] flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
                    <Check className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-[#1F192F] group-hover:text-[#7C3AED] transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-[#667085] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* 8. FAQ SCROLLER SECTION */}
      <section className="section-padding bg-[#F8F4FE] border-t border-[#F0E8FF] overflow-hidden">
        <Container>
          <Reveal variant="fadeUp">
            <SectionHeading
              eyebrow="FREQUENTLY ASKED QUESTIONS"
              title="Common Admission & Course Queries"
              subtitle="Find answers to common questions about our nursing and paramedical programs."
              align="center"
            />
          </Reveal>

          <div className="mt-8">
            <FaqSection data={scrollingAdmissionFaqData} />
          </div>
        </Container>
      </section>
    </PageShell>
  );
};
