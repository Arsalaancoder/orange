import React from 'react';
import { PageShell } from '@/components/layout/PageShell';
import { Container } from '@/components/shared/Container';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { ImagePlaceholder } from '@/components/shared/ImagePlaceholder';

export const GalleryPage: React.FC = () => {
  const placeholders = [
    { label: "Medipally Nursing Campus", ratio: "4:3" },
    { label: "Keesara Paramedical Labs", ratio: "16:9" },
    { label: "Nalgonda Clinical Demonstration Room", ratio: "4:3" },
    { label: "Smart Classroom Lecture Session", ratio: "16:9" },
    { label: "Nursing Skill Laboratory Manikins", ratio: "4:3" },
    { label: "Medical Diagnostics & Pathology Lab", ratio: "16:9" },
  ] as const;

  return (
    <PageShell title="Campus Gallery" description="Photo gallery showcasing campus infrastructure, laboratories, and clinical training at Orange Group.">
      <section className="section-padding bg-white">
        <Container>
          <SectionHeading
            eyebrow="Visual Tour"
            title="Campuses & Practical Facilities"
            subtitle="Explore our nursing skill labs, paramedical practical setups, and modern lecture halls."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {placeholders.map((item, idx) => (
              <ImagePlaceholder key={idx} label={item.label} aspectRatio={item.ratio} />
            ))}
          </div>
        </Container>
      </section>
    </PageShell>
  );
};
