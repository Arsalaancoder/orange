import React from 'react';
import { PageShell } from '@/components/layout/PageShell';
import { Container } from '@/components/shared/Container';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { Eyebrow } from '@/components/shared/Eyebrow';
import { ImagePlaceholder } from '@/components/shared/ImagePlaceholder';
import { PrimaryButton } from '@/components/shared/PrimaryButton';
import { SecondaryButton } from '@/components/shared/SecondaryButton';
import { Reveal } from '@/components/animations/Reveal';
import { 
  Check, 
  ArrowRight, 
  Stethoscope,
  Activity,
  Award,
  Quote
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const AboutPage: React.FC = () => {
  return (
    <PageShell
      title="About Us"
      description="Orange Group of Nursing & Paramedical Colleges is dedicated to developing competent and compassionate healthcare professionals through structured academic education and practical training."
    >
      {/* 1. PAGE HERO */}
      <section className="bg-[#F8F4FE] py-12 md:py-20 border-b border-[#F0E8FF] relative overflow-hidden">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Story Column */}
            <div className="lg:col-span-7 space-y-6">
              <Reveal variant="fadeUp">
                <Eyebrow theme="purple">
                  ABOUT ORANGE GROUP
                </Eyebrow>
              </Reveal>

              <Reveal variant="fadeUp" delay={0.1}>
                <h1 className="heading-hero text-[#1F192F] tracking-tight font-extrabold max-w-2xl inline-flex flex-wrap items-baseline gap-2">
                  <span>Building Skilled, Compassionate Healthcare Professionals.</span>
                  <span className="text-[#8B5CF6] inline-flex">
                    <svg className="w-8 h-8 md:w-10 md:h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                    </svg>
                  </span>
                </h1>
              </Reveal>

              <Reveal variant="fadeUp" delay={0.2}>
                <p className="text-base md:text-lg lg:text-xl text-[#667085] leading-relaxed max-w-xl font-sans">
                  Orange Group of Medical Colleges is dedicated to developing competent and compassionate healthcare professionals through structured academic education and practical training.
                </p>
              </Reveal>

              <Reveal variant="fadeUp" delay={0.3}>
                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <PrimaryButton to="/programs" size="lg">
                    Explore Programs
                  </PrimaryButton>
                  <SecondaryButton to="/colleges" size="lg">
                    Our Institutions
                  </SecondaryButton>
                </div>
              </Reveal>
            </div>

            {/* Right Hero Image */}
            <div className="lg:col-span-5">
              <Reveal variant="scaleUp" delay={0.2}>
                <div className="relative rounded-3xl overflow-hidden border border-[#E8D9FF] shadow-2xl shadow-purple-500/10 bg-white p-2">
                  <ImagePlaceholder
                    label="Nursing & Healthcare Education"
                    imageUrl="/images/cards/nursing-lab.jpg"
                    aspectRatio="4:3"
                    className="rounded-2xl border-0"
                  />
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md text-[#1F192F] text-xs font-bold px-4 py-2.5 rounded-2xl border border-[#E8D9FF] shadow-xs">
                    Classroom • Laboratory • Clinical Exposure
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. CORE VALUES SECTION (EXACT 3-CARD GRID FROM DESIGN REFERENCE WITH HIGHLIGHTED MIDDLE CARD) */}
      <section className="section-padding bg-white border-b border-[#F0E8FF]">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Eyebrow theme="purple" className="mb-4">
              OUR VALUES
            </Eyebrow>
            <h2 className="heading-section font-bold text-[#1F192F] tracking-tight inline-flex items-center gap-2 flex-wrap justify-center">
              <span>Hear what people are saying about career Management.</span>
              <span className="text-[#8B5CF6] inline-flex">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                </svg>
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {/* Card 1 */}
            <div className="bg-white rounded-3xl p-8 border border-[#E8D9FF] shadow-sm flex flex-col justify-between items-center text-center group hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
              <div className="space-y-5">
                <div className="w-16 h-16 rounded-full bg-[#EBE2FF] text-[#7C3AED] flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                  <Stethoscope className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-[#1F192F]">Business Progress</h3>
                <p className="text-sm text-[#667085] leading-relaxed">
                  Your education is our mission. We believe in making your dreams and goals a reality with our expert clinical faculty.
                </p>
              </div>
              <div className="pt-8">
                <Link to="/programs" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7C3AED] hover:text-[#6D28D9] uppercase tracking-wider group-hover:underline">
                  <span>Read More</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Card 2: HIGHLIGHTED VIBRANT PURPLE CARD */}
            <div className="bg-[#8B5CF6] text-white rounded-3xl p-8 shadow-2xl shadow-purple-500/25 flex flex-col justify-between items-center text-center transform md:-translate-y-2 group hover:-translate-y-3 transition-all duration-300">
              <div className="space-y-5">
                <div className="w-16 h-16 rounded-full bg-white/20 text-white flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                  <Activity className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Business Administration</h3>
                <p className="text-sm text-purple-100 leading-relaxed">
                  Your education is our mission. We believe in making your dreams and goals a reality and our experts know just how.
                </p>
              </div>
              <div className="pt-8">
                <Link to="/about" className="inline-flex items-center gap-1.5 text-xs font-bold text-white hover:text-purple-100 uppercase tracking-wider group-hover:underline">
                  <span>Read More</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-3xl p-8 border border-[#E8D9FF] shadow-sm flex flex-col justify-between items-center text-center group hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
              <div className="space-y-5">
                <div className="w-16 h-16 rounded-full bg-[#EBE2FF] text-[#7C3AED] flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                  <Award className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-[#1F192F]">Secret Sucess Teamwork</h3>
                <p className="text-sm text-[#667085] leading-relaxed">
                  Your education is our mission. We believe in making your dreams and goals a reality and our experts know just how.
                </p>
              </div>
              <div className="pt-8">
                <Link to="/facilities" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7C3AED] hover:text-[#6D28D9] uppercase tracking-wider group-hover:underline">
                  <span>Read More</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. MISSION & QUOTE CALLOUT SECTION */}
      <section className="section-padding bg-[#F8F4FE] border-b border-[#F0E8FF]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              <SectionHeading
                eyebrow="OUR MISSION"
                title="Hear what people are saying about career Management."
                subtitle="Orange Group of Medical Colleges is dedicated to developing competent and compassionate healthcare professionals through structured academic education and practical training."
                className="mb-6"
              />

              <p className="text-[#667085] text-base leading-relaxed">
                As a Business Coach, Mark not only understands the nuances necessary to navigate the hiring cycle but can help discover right path to a rewarding career or assistance in 'moving up' the ladder.
              </p>

              <div className="pt-4">
                <PrimaryButton to="/admissions" size="lg">
                  Join Our Coaching
                </PrimaryButton>
              </div>
            </div>

            {/* Right Side Quote Card */}
            <div className="lg:col-span-6 bg-white rounded-3xl p-8 md:p-10 border border-[#E8D9FF] shadow-sm space-y-6">
              <div className="space-y-3">
                <Quote className="w-10 h-10 text-[#8B5CF6]/40" />
                <h3 className="text-xl md:text-2xl font-serif-heading font-bold text-[#1F192F] leading-snug">
                  "How we can improve your Business on with our Coaching."
                </h3>
                <p className="text-xs md:text-sm text-[#667085] leading-relaxed">
                  As a Business Coach, Mark not only understands the nuances necessary to navigate the hiring cycle but can help discover right path to a rewarding career.
                </p>
              </div>

              {/* Checkmark List */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#8B5CF6] text-white flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm font-semibold text-[#1F192F]">We want to understand you.</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#8B5CF6] text-white flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm font-semibold text-[#1F192F]">Positive Thoughts.</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#8B5CF6] text-white flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm font-semibold text-[#1F192F]">Business Administration (BSC).</span>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E8D9FF] flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#8B5CF6] bg-[#EBE2FF] flex items-center justify-center font-bold text-[#7C3AED]">
                  WS
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#1F192F]">Warren Stokes Sr.</h4>
                  <p className="text-xs text-[#667085]">Founder, Vanbeek</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 4. VISION & FEATURED MEDIA SECTION */}
      <section className="section-padding bg-white border-b border-[#F0E8FF]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Media Column */}
            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden border border-[#E8D9FF] shadow-2xl shadow-purple-500/10">
                <ImagePlaceholder
                  label="Healthcare Learning Vision"
                  imageUrl="/images/cards/anesthesia-ot.jpg"
                  aspectRatio="4:5"
                  className="w-full h-full object-cover rounded-none border-0"
                />
              </div>
            </div>

            {/* Right Vision Column */}
            <div className="lg:col-span-6 space-y-6">
              <SectionHeading
                eyebrow="OUR VISION"
                title="Hear what people are saying about career Management."
                subtitle="As a Business Coach, Mark not only understands the nuances necessary to navigate the hiring cycle but can help discover right path to a rewarding career or assistance in 'moving up' the ladder. His program is custom to the needs of each of his Career Coaching clients."
                className="mb-6"
              />

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#8B5CF6] text-white flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm font-semibold text-[#1F192F]">We want to understand you.</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#8B5CF6] text-white flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm font-semibold text-[#1F192F]">Positive Thoughts.</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#8B5CF6] text-white flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm font-semibold text-[#1F192F]">Business Administration (BSC).</span>
                </div>
              </div>

              <div className="pt-4">
                <PrimaryButton to="/admissions" size="lg">
                  Join Our Coaching
                </PrimaryButton>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 5. FINAL ADMISSIONS CTA */}
      <section className="section-padding bg-[#F8F4FE]">
        <Container>
          <div className="bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white rounded-3xl p-8 md:p-12 shadow-2xl shadow-purple-500/20 border border-[#8B5CF6]">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
              <div className="space-y-3 max-w-2xl">
                <span className="text-xs font-bold text-purple-200 uppercase tracking-widest block">
                  JOIN ORANGE GROUP
                </span>
                <h2 className="text-3xl md:text-4xl font-serif-heading font-bold text-white tracking-tight">
                  Begin Your Journey in Healthcare Education.
                </h2>
                <p className="text-purple-100 text-sm md:text-base leading-relaxed">
                  Explore Nursing, Paramedical and Allied Healthcare programs across Orange Group institutions.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4 shrink-0">
                <PrimaryButton to="/programs" size="lg" className="bg-white text-[#7C3AED] hover:bg-purple-50">
                  Explore Programs
                </PrimaryButton>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </PageShell>
  );
};

