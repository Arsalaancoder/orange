import React from 'react';
import { PageShell } from '@/components/layout/PageShell';
import { Container } from '@/components/shared/Container';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { careerPathsData } from '@/data/careerPaths';
import { CheckCircle2, Briefcase } from 'lucide-react';

export const CareerPathwaysPage: React.FC = () => {
  return (
    <PageShell title="Career Pathways" description="Discover career opportunities and employment sectors for Nursing and Paramedical graduates of Orange Group.">
      <section className="section-padding bg-white">
        <Container>
          <SectionHeading
            eyebrow="Professional Future"
            title="Employment Sectors & Career Scope"
            subtitle="Explore career opportunities available to graduates across nursing, medical laboratory technology, imaging, ophthalmic care, and allied health fields."
          />

          <div className="space-y-8">
            {careerPathsData.map((cp, i) => (
              <div key={i} className="p-8 rounded-2xl bg-[#FAFAF8] border border-[#E3E6E5]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#F26A21]/10 text-[#F26A21] flex items-center justify-center">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-[#F26A21] uppercase tracking-wider">{cp.programCode}</span>
                    <h3 className="text-xl font-bold text-[#202426]">{cp.programTitle}</h3>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
                  {cp.opportunities.map((opp, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-[#E3E6E5] text-sm font-medium text-[#202426]">
                      <CheckCircle2 className="w-4 h-4 text-[#F26A21] shrink-0" />
                      <span>{opp}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </PageShell>
  );
};
