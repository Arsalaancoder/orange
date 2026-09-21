import React from 'react';
import { PageShell } from '@/components/layout/PageShell';
import { Container } from '@/components/shared/Container';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { facultyData } from '@/data/faculty';
import { UserCheck } from 'lucide-react';

export const FacultyPage: React.FC = () => {
  return (
    <PageShell title="Academic Faculty" description="Meet the experienced educators and clinical instructors at Orange Group of Nursing & Paramedical Colleges.">
      <section className="section-padding bg-white">
        <Container>
          <SectionHeading
            eyebrow="Academic Leadership"
            title="Experienced Healthcare Educators"
            subtitle="Dedicated faculty members bringing clinical expertise, academic rigor, and mentorship to every classroom and lab session."
          />

          {facultyData.length === 0 ? (
            <div className="p-12 text-center bg-[#FAFAF8] rounded-2xl border border-[#E3E6E5] max-w-2xl mx-auto">
              <UserCheck className="w-10 h-10 text-[#F26A21] mx-auto mb-3" />
              <h3 className="text-lg font-bold text-[#202426] mb-2">Faculty Directory Verification in Progress</h3>
              <p className="text-sm text-[#667085] leading-relaxed">
                The institutional faculty profiles and department listings will be updated following client verification prior to site launch.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Future verified faculty list map */}
            </div>
          )}
        </Container>
      </section>
    </PageShell>
  );
};
