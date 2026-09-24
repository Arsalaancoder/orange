import React from 'react';
import { PageShell } from '@/components/layout/PageShell';
import { Container } from '@/components/shared/Container';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { PrimaryButton } from '@/components/shared/PrimaryButton';
import { SecondaryButton } from '@/components/shared/SecondaryButton';
import { ImagePlaceholder } from '@/components/shared/ImagePlaceholder';
import { programsData } from '@/data/programs';
import { ProgramCard } from '@/components/programs/ProgramCard';
import { Reveal } from '@/components/animations/Reveal';
import { StaggerContainer, StaggerItem } from '@/components/animations/Stagger';
import { ArrowRight, AlertCircle, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProgramCareerCardsSection } from '@/components/programs/ProgramCareerCardsSection';

export const ProgramsPage: React.FC = () => {
  const primaryPrograms = programsData.filter(p => p.isPrimary);
  const secondaryPrograms = programsData.filter(p => !p.isPrimary);

  return (
    <PageShell
      title="Academic Programs"
      description="Explore professional education in Nursing, Paramedical Sciences and Allied Healthcare through academic learning, practical training and skill development at Orange Group."
      canonicalPath="/programs"
    >
      {/* 1. HERO SECTION */}
      <section className="bg-gradient-to-b from-[#F3F4F4] via-[#FAFAF8] to-[#FAFAF8] pt-8 pb-16 md:pt-14 md:pb-24 border-b border-[#E3E6E5]">
        <Container>
          <Breadcrumb items={[{ label: 'Academic Programs' }]} className="mb-6" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
              <Reveal variant="fadeUp">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#F26A21]">
                  <span className="w-2 h-2 rounded-full bg-[#F26A21] shrink-0" aria-hidden="true" />
                  <span>ACADEMIC PROGRAMS</span>
                </div>
              </Reveal>

              <Reveal variant="fadeUp" delay={0.1}>
                <h1 className="heading-hero text-[#202426] tracking-tight font-extrabold max-w-2xl">
                  Build Your Future <span className="text-[#202426] block mt-1">in <span className="text-[#F26A21]">Healthcare.</span></span>
                </h1>
              </Reveal>

              <Reveal variant="fadeUp" delay={0.2}>
                <p className="text-base md:text-lg lg:text-xl text-[#667085] leading-relaxed max-w-xl">
                  Explore professional education in Nursing, Paramedical Sciences and Allied Healthcare through academic learning, practical training and skill development.
                </p>
              </Reveal>

              <Reveal variant="fadeUp" delay={0.3}>
                <div className="flex flex-wrap gap-4 pt-2">
                  <PrimaryButton to="/admissions" size="lg" showArrow>
                    Admissions Information
                  </PrimaryButton>
                  <SecondaryButton to="/admissions#enquiry" size="lg">
                    Enquire Now
                  </SecondaryButton>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-5">
              <Reveal variant="scaleUp" delay={0.2}>
                <ImagePlaceholder
                  label="Nursing & Paramedical Education"
                  aspectRatio="4:3"
                  className="shadow-xl"
                />
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. PRIMARY CATALOG */}
      <section className="section-padding bg-white border-b border-[#E3E6E5]">
        <Container>
          <div className="mb-12">
            <SectionHeading
              eyebrow="Curriculum Catalog"
              title="Primary Healthcare Programs"
              subtitle="Explore degree and diploma offerings focused on classroom instruction, laboratory practice, and clinical training."
              className="mb-0 max-w-2xl"
            />
          </div>

          {/* Primary Program Cards Grid */}
          {primaryPrograms.length > 0 && (
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {primaryPrograms.map((program) => (
                <StaggerItem key={program.id}>
                  <ProgramCard program={program} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          )}

          {/* 3. OTHER PARAMEDICAL & ALLIED HEALTHCARE PROGRAMS SECTION */}
          <div className="mt-20 pt-16 border-t border-[#E3E6E5]">
              <div className="mb-10">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#F26A21] mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>ALLIED TECHNICAL OFFERINGS</span>
                </div>
                <h2 className="heading-subsection text-[#202426] mb-3">
                  Other Paramedical & Allied Healthcare Programs
                </h2>
                <p className="text-sm md:text-base text-[#667085] max-w-3xl leading-relaxed">
                  Specialized allied health technology programs offered or planned by Orange Group institutions.
                </p>

                {/* Regulatory Disclaimer Notice */}
                <div className="mt-4 p-4 rounded-xl bg-[#FAFAF8] border border-[#E3E6E5] flex items-start gap-3 max-w-3xl">
                  <AlertCircle className="w-4 h-4 text-[#F26A21] shrink-0 mt-0.5" />
                  <p className="text-xs text-[#667085] leading-relaxed">
                    Course availability, duration, eligibility, intake, and recognition are subject to applicable regulatory and affiliating authorities. Please contact the admissions office for current details.
                  </p>
                </div>
              </div>

              {/* Allied Programs Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {secondaryPrograms.map((program) => (
                  <div
                    key={program.id}
                    className="p-6 rounded-3xl bg-white border border-[#E5E2DC] flex flex-col justify-between hover:border-[#F26A21]/40 transition-all hover:shadow-lg group relative overflow-hidden"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-extrabold text-[#F26A21] bg-[#FFF7F2] border border-[#FDE3D7] px-3 py-1 rounded-full shadow-2xs">
                          {program.code}
                        </span>
                        
                        {/* Top-Right Circular Action Button */}
                        <Link
                          to={`/programs/${program.slug}`}
                          className="w-8 h-8 rounded-full bg-[#F3F4F4] text-[#202426] group-hover:bg-[#F26A21] group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-2xs"
                          aria-label={`View details for ${program.fullTitle}`}
                        >
                          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                        </Link>
                      </div>

                      <h3 className="text-lg font-bold font-serif-heading text-[#1E293B] group-hover:text-[#F26A21] transition-colors leading-snug pt-1">
                        <Link to={`/programs/${program.slug}`}>
                          {program.fullTitle}
                        </Link>
                      </h3>

                      <p className="text-xs text-[#64748B] leading-relaxed line-clamp-2 font-sans">
                        {program.overview}
                      </p>
                    </div>

                    <div className="pt-4 mt-5 border-t border-[#F1F3F4] flex items-center justify-between">
                      <span className="text-[11px] font-mono bg-[#F4FBF7] text-[#16A34A] border border-[#E1F5EA] px-2.5 py-0.5 rounded-md font-bold uppercase tracking-wider">
                        {program.duration || '2 Years'}
                      </span>
                      <Link
                        to={`/admissions?program=${program.slug}#enquiry`}
                        className="text-xs font-bold text-[#F26A21] hover:text-[#D95412] uppercase tracking-wider inline-flex items-center gap-1 group/btn"
                      >
                        <span>Enquire</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
        </Container>
      </section>

      {/* 4. PROGRAM & CAREER OPPORTUNITY SECTION */}
      <ProgramCareerCardsSection />
    </PageShell>
  );
};
