import React from 'react';
import { PageShell } from '@/components/layout/PageShell';
import { Container } from '@/components/shared/Container';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { ImagePlaceholder } from '@/components/shared/ImagePlaceholder';

export const ClinicalTrainingPage: React.FC = () => {
  return (
    <PageShell title="Clinical Training" description="Hands-on clinical exposure, hospital rotations, and practical skill development at Orange Group of Nursing & Paramedical Colleges.">
      <section className="section-padding bg-white">
        <Container>
          <SectionHeading
            eyebrow="Hands-On Healthcare Practice"
            title="Real-World Patient Care & Clinical Exposure"
            subtitle="Integrating classroom theory with bedside training, diagnostic lab operations, and hospital exposure."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ImagePlaceholder label="Clinical Training & Bedside Care" aspectRatio="16:9" />
            <ImagePlaceholder label="Nursing Skills Laboratory Practice" aspectRatio="16:9" />
          </div>
        </Container>
      </section>
    </PageShell>
  );
};
