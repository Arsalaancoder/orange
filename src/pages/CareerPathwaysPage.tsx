import React from 'react';
import { PageShell } from '@/components/layout/PageShell';
import { ProgramCareerCardsSection } from '@/components/programs/ProgramCareerCardsSection';

export const CareerPathwaysPage: React.FC = () => {
  return (
    <PageShell title="Career Pathways" description="Discover career opportunities and employment sectors for Nursing and Paramedical graduates of Orange Group.">
      <ProgramCareerCardsSection
        eyebrow="PROFESSIONAL FUTURE"
        title="Employment Sectors & Career Scope"
        subtitle="Explore career opportunities and workplace environments available to graduates across nursing, medical laboratory technology, imaging, ophthalmic care, and allied health fields."
      />
    </PageShell>
  );
};

export default CareerPathwaysPage;
