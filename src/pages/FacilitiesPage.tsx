import React from 'react';
import { PageShell } from '@/components/layout/PageShell';
import { Container } from '@/components/shared/Container';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { facilitiesData } from '@/data/facilities';
import { FacilityCard } from '@/components/facilities/FacilityCard';

export const FacilitiesPage: React.FC = () => {
  return (
    <PageShell title="Campus Facilities" description="Explore nursing skill labs, medical laboratories, smart classrooms, and digital libraries across Orange Group institutions.">
      <section className="section-padding bg-white">
        <Container>
          <SectionHeading
            eyebrow="Modern Practical Learning Environment"
            title="Equipped for Excellence"
            subtitle="Explore our practical laboratories, smart lecture halls, digital learning resources, and clinical simulation setups."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilitiesData.map(facility => (
              <FacilityCard key={facility.id} facility={facility} />
            ))}
          </div>
        </Container>
      </section>
    </PageShell>
  );
};
