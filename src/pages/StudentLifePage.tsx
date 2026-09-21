import React from 'react';
import { PageShell } from '@/components/layout/PageShell';
import { Container } from '@/components/shared/Container';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { studentLifeData } from '@/data/studentLife';
import { StudentLifeCarousel } from '@/components/student-life/StudentLifeCarousel';

export const StudentLifePage: React.FC = () => {
  return (
    <PageShell title="Student Life" description="Explore seminars, health camps, workshops, and community outreach at Orange Group Nursing & Paramedical Colleges.">
      <section className="section-padding bg-white">
        <Container>
          <SectionHeading
            eyebrow="Beyond the Classroom"
            title="Holistic Professional Growth"
            subtitle="Engaging student activities including clinical workshops, seminars, health awareness drives, and academic competitions."
          />

          {/* 3D Coverflow Fan Arc Carousel */}
          <StudentLifeCarousel activities={studentLifeData} />
        </Container>
      </section>
    </PageShell>
  );
};
