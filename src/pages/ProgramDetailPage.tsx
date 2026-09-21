import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { PageShell } from '@/components/layout/PageShell';
import { Container } from '@/components/shared/Container';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { PrimaryButton } from '@/components/shared/PrimaryButton';
import { SecondaryButton } from '@/components/shared/SecondaryButton';
import { ImagePlaceholder } from '@/components/shared/ImagePlaceholder';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { ProgramCard } from '@/components/programs/ProgramCard';
import { programsData } from '@/data/programs';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { Clock, GraduationCap, CheckCircle2, AlertCircle, BookOpen, HeartPulse, Building2 } from 'lucide-react';
import { Reveal } from '@/components/animations/Reveal';

export const ProgramDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  // Resolve program by slug (handle bsc-nursing & b-sc-nursing alias)
  const program = programsData.find(
    p => p.slug === slug || p.id === slug || (slug === 'b-sc-nursing' && p.id === 'bsc-nursing')
  );

  if (!program) {
    return <NotFoundPage />;
  }

  // Related programs (filter out current)
  const relatedPrograms = programsData
    .filter(p => p.id !== program.id && (p.category === program.category || p.isPrimary))
    .slice(0, 3);

  const isPrimary = program.isPrimary;
  const enquiryUrl = `/admissions?program=${program.slug}#enquiry`;

  return (
    <PageShell
      title={program.seoTitle}
      description={program.seoDescription}
      canonicalPath={`/programs/${program.slug}`}
    >
      {/* 1. PROGRAM HERO */}
      <section className="bg-gradient-to-b from-[#F3F4F4] via-[#FAFAF8] to-[#FAFAF8] pt-8 pb-16 md:pt-12 md:pb-24 border-b border-[#E3E6E5]">
        <Container>
          <Breadcrumb
            items={[
              { label: 'Programs', href: '/programs' },
              { label: program.code }
            ]}
            className="mb-6"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Hero Column */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
              <Reveal variant="fadeUp">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#F26A21]">
                  <span className="w-2 h-2 rounded-full bg-[#F26A21] shrink-0" aria-hidden="true" />
                  <span>{program.category.toUpperCase()} PROGRAM</span>
                </div>
              </Reveal>

              <Reveal variant="fadeUp" delay={0.1}>
                <h1 className="heading-hero text-[#202426] tracking-tight font-extrabold max-w-2xl">
                  {program.fullTitle}
                </h1>
              </Reveal>

              <Reveal variant="fadeUp" delay={0.2}>
                <p className="text-base md:text-lg lg:text-xl text-[#667085] leading-relaxed max-w-xl">
                  {program.overview}
                </p>
              </Reveal>

              <Reveal variant="fadeUp" delay={0.3}>
                <div className="flex flex-wrap gap-4 pt-2">
                  <PrimaryButton to={enquiryUrl} size="lg" showArrow>
                    Enquire About This Program
                  </PrimaryButton>
                  <SecondaryButton to="/admissions" size="lg">
                    Admissions Information
                  </SecondaryButton>
                </div>
              </Reveal>
            </div>

            {/* Right Hero Column: Program Image */}
            <div className="lg:col-span-5">
              <Reveal variant="scaleUp" delay={0.2}>
                <div className="relative rounded-2xl overflow-hidden shadow-xl border border-[#E3E6E5]">
                  <ImagePlaceholder
                    label={program.imageLabel}
                    imageUrl={program.imageUrl}
                    aspectRatio="4:3"
                    className="rounded-none border-0"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#101820]/80 via-[#101820]/30 to-transparent p-5 text-white">
                    <span className="text-xs font-bold text-[#F26A21] uppercase tracking-wider block">
                      {program.code} • {program.category}
                    </span>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. QUICK FACTS STRIP */}
      <section className="bg-white border-b border-[#E3E6E5] py-6">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-left divide-y md:divide-y-0 md:divide-x divide-[#E3E6E5]">
            <div className="space-y-1 md:pr-4">
              <span className="text-[11px] font-bold text-[#667085] uppercase tracking-widest block">
                DURATION
              </span>
              <span className="text-base md:text-lg font-bold text-[#202426] flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#F26A21]" />
                {program.duration || "Contact Admissions"}
              </span>
            </div>

            <div className="space-y-1 pt-4 md:pt-0 md:px-4">
              <span className="text-[11px] font-bold text-[#667085] uppercase tracking-widest block">
                ELIGIBILITY
              </span>
              <span className="text-base md:text-lg font-bold text-[#202426] flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-[#F26A21]" />
                {program.eligibility || "Contact Admissions"}
              </span>
            </div>

            <div className="space-y-1 pt-4 md:pt-0 md:px-4">
              <span className="text-[11px] font-bold text-[#667085] uppercase tracking-widest block">
                CATEGORY
              </span>
              <span className="text-base md:text-lg font-bold text-[#202426]">
                {program.category}
              </span>
            </div>

            <div className="space-y-1 pt-4 md:pt-0 md:pl-4">
              <span className="text-[11px] font-bold text-[#667085] uppercase tracking-widest block">
                ACADEMIC LEVEL
              </span>
              <span className="text-base md:text-lg font-bold text-[#202426]">
                {program.category === 'Nursing' && program.duration === '4 Years' ? 'Undergraduate Degree' : 'Professional Diploma'}
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. PRIMARY PROGRAM FULL DETAILS vs ALLIED PROGRAM TEMPLATE */}
      {isPrimary ? (
        <>
          {/* PROGRAM OVERVIEW */}
          <section className="section-padding bg-white border-b border-[#E3E6E5]">
            <Container size="default">
              <div className="max-w-4xl space-y-6">
                <SectionHeading
                  eyebrow="PROGRAM OVERVIEW"
                  title={`About ${program.fullTitle}`}
                  subtitle={program.overview}
                />
                <p className="text-base md:text-lg text-[#667085] leading-relaxed">
                  {program.description}
                </p>
                {program.trainingStatement && (
                  <p className="text-base text-[#202426] font-medium leading-relaxed p-5 rounded-2xl bg-[#FAFAF8] border border-[#E3E6E5]">
                    {program.trainingStatement}
                  </p>
                )}
              </div>
            </Container>
          </section>

          {/* AREAS OF LEARNING / TRAINING (EDITORIAL NUMBERED LIST) */}
          {(program.learningAreas || program.trainingAreas) && (
            <section className="section-padding bg-[#FAFAF8] border-b border-[#E3E6E5]">
              <Container>
                <SectionHeading
                  eyebrow={program.learningAreas ? "CURRICULUM HIGHLIGHTS" : "PRACTICAL SKILL AREAS"}
                  title={program.learningAreas ? "Areas of Learning" : "Areas of Training"}
                  subtitle="Key subjects and practical learning areas covered during the program."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  {(program.learningAreas || program.trainingAreas)?.map((area, index) => (
                    <div
                      key={index}
                      className="p-6 rounded-2xl bg-white border border-[#E3E6E5] flex items-start gap-5 hover:border-[#D0D4D3] transition-all"
                    >
                      <span className="text-2xl font-serif-heading font-bold text-[#F26A21] shrink-0">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <h4 className="text-base font-bold text-[#202426] mb-1">{area}</h4>
                        <p className="text-xs text-[#667085]">
                          Focused instruction and practical training in {area.toLowerCase()}.
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Container>
            </section>
          )}

          {/* LEARNING EXPERIENCE */}
          <section className="section-padding bg-white border-b border-[#E3E6E5]">
            <Container>
              <SectionHeading
                eyebrow="LEARNING EXPERIENCE"
                title="Academic & Practical Environment"
                subtitle="Combining classroom theory, laboratory skills, and practical clinical exposure."
              />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                <div className="p-8 rounded-2xl bg-[#FAFAF8] border border-[#E3E6E5] space-y-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-[#F26A21]/10 text-[#F26A21] flex items-center justify-center mb-2">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-[#202426]">Classroom Learning</h3>
                    <p className="text-xs text-[#667085] leading-relaxed">
                      Structured lectures in smart classrooms covering medical sciences and healthcare fundamentals.
                    </p>
                  </div>
                  <ImagePlaceholder label="Classroom Instruction" aspectRatio="16:9" />
                </div>

                <div className="p-8 rounded-2xl bg-[#FAFAF8] border border-[#E3E6E5] space-y-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-[#F26A21]/10 text-[#F26A21] flex items-center justify-center mb-2">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-[#202426]">Laboratory Training</h3>
                    <p className="text-xs text-[#667085] leading-relaxed">
                      Hands-on practice in dedicated nursing skills laboratories and diagnostic testing facilities.
                    </p>
                  </div>
                  <ImagePlaceholder label="Laboratory Skill Practice" aspectRatio="16:9" />
                </div>

                <div className="p-8 rounded-2xl bg-[#FAFAF8] border border-[#E3E6E5] space-y-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-[#F26A21]/10 text-[#F26A21] flex items-center justify-center mb-2">
                      <HeartPulse className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-[#202426]">Clinical Exposure</h3>
                    <p className="text-xs text-[#667085] leading-relaxed">
                      Practical exposure in appropriate healthcare environments, subject to institutional arrangements.
                    </p>
                  </div>
                  <ImagePlaceholder label="Clinical Exposure" aspectRatio="16:9" />
                </div>
              </div>
            </Container>
          </section>

          {/* CAREER OPPORTUNITIES */}
          {program.careerOpportunities && (
            <section className="section-padding bg-[#FAFAF8] border-b border-[#E3E6E5]">
              <Container>
                <div className="max-w-4xl">
                  <SectionHeading
                    eyebrow="CAREER OPPORTUNITIES"
                    title="Employment Sectors & Career Scope"
                    subtitle="Graduates are prepared for practical roles across diverse healthcare settings."
                  />
                  <p className="text-xs text-[#667085] italic mb-8">
                    Career pathways depend on qualification requirements, applicable professional regulations and individual opportunities.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {program.careerOpportunities.map((sector, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-white border border-[#E3E6E5] flex items-center gap-3 text-sm font-semibold text-[#202426]"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#F26A21] shrink-0" />
                        <span>{sector}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Container>
            </section>
          )}
        </>
      ) : (
        /* TEMPLATE FOR ALLIED / SECONDARY PROGRAMS (DANS, DMST, D-Dialysis, D-Cardio, DREST) */
        <section className="section-padding bg-white border-b border-[#E3E6E5]">
          <Container size="narrow">
            <div className="space-y-8">
              <SectionHeading
                eyebrow="ALLIED PARAMEDICAL PROGRAM"
                title={`Program Details: ${program.fullTitle}`}
                subtitle={program.overview}
              />

              <div className="p-6 rounded-2xl bg-[#FAFAF8] border border-[#E3E6E5] space-y-4">
                <div className="flex items-center gap-2 text-sm font-bold text-[#F26A21]">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>Regulatory & Availability Notice</span>
                </div>
                <p className="text-sm text-[#667085] leading-relaxed">
                  Course availability, duration, eligibility, intake, and recognition are subject to applicable regulatory and affiliating authorities. Please contact the admissions office for current details regarding this program.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-[#E3E6E5] space-y-4">
                <h3 className="text-lg font-bold text-[#202426]">Admissions Inquiry</h3>
                <p className="text-sm text-[#667085]">
                  Interested in {program.fullTitle}? Contact our admissions counselors to verify current eligibility and enrollment procedures.
                </p>
                <div className="pt-2">
                  <PrimaryButton to={enquiryUrl} showArrow>
                    Enquire About {program.code}
                  </PrimaryButton>
                </div>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* 4. ADMISSIONS GUIDANCE SECTION */}
      <section className="section-padding bg-white border-b border-[#E3E6E5]">
        <Container size="default">
          <div className="p-8 md:p-12 rounded-2xl bg-[#101820] text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="max-w-2xl space-y-3">
              <span className="text-xs font-bold text-[#F26A21] uppercase tracking-widest block">
                ADMISSIONS ASSISTANCE
              </span>
              <h3 className="text-2xl font-bold text-white">
                Interested in {program.code}?
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                {program.eligibility
                  ? `Admissions are open for eligible Intermediate (${program.eligibility}) students. Submit an enquiry for course guidance.`
                  : "Contact the admissions team for current eligibility and admission requirements."}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full md:w-auto">
              <PrimaryButton to={enquiryUrl} size="lg" showArrow>
                Enquire Now
              </PrimaryButton>
              <SecondaryButton
                to="/admissions"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-[#101820]"
              >
                View Admissions
              </SecondaryButton>
            </div>
          </div>
        </Container>
      </section>

      {/* 5. RELATED PROGRAMS */}
      {relatedPrograms.length > 0 && (
        <section className="section-padding bg-[#FAFAF8]">
          <Container>
            <div className="flex items-center justify-between mb-10">
              <div>
                <span className="text-xs font-bold text-[#F26A21] uppercase tracking-widest block mb-1">
                  EXPLORE FURTHER
                </span>
                <h3 className="heading-subsection text-[#202426]">Related Programs</h3>
              </div>
              <Link
                to="/programs"
                className="text-xs font-bold text-[#F26A21] hover:underline uppercase tracking-wider hidden sm:inline-flex items-center gap-1"
              >
                <span>View All Programs</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPrograms.map((relProg) => (
                <ProgramCard key={relProg.id} program={relProg} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </PageShell>
  );
};
