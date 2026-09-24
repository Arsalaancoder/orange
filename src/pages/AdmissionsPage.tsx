import React from 'react';
import { PageShell } from '@/components/layout/PageShell';
import { Container } from '@/components/shared/Container';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { EnquiryForm } from '@/components/forms/EnquiryForm';

export const AdmissionsPage: React.FC = () => {
  return (
    <PageShell title="Admissions 2026-2027" description="Admission process, eligibility guidelines, and inquiry assistance for Orange Group Nursing & Paramedical Colleges.">
      <section className="section-padding bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7 space-y-6">
              <SectionHeading
                eyebrow="Join Orange Group"
                title="Building Healthcare Careers Through Clinical Mastery"
                subtitle="Submit an admission enquiry or visit our campus admission offices at Chengicherla / Hyderabad, Nagaram / Hyderabad, or Nalgonda for detailed counseling."
              />

              <div className="p-6 rounded-2xl bg-[#FAFAF8] border border-[#E3E6E5] space-y-4">
                <h3 className="text-lg font-bold text-[#202426]">Key Admissions Guidelines</h3>
                <ul className="space-y-3 text-sm text-[#667085] list-disc pl-5">
                  <li><strong>B.Sc Nursing:</strong> Intermediate (BiPC) qualification required.</li>
                  <li><strong>GNM (General Nursing & Midwifery):</strong> Intermediate from any stream.</li>
                  <li><strong>Paramedical Diplomas (DMLT, DOA, DMIT, DANS, DMST, etc.):</strong> Applications open for eligible stream candidates.</li>
                </ul>
              </div>
            </div>

            <div className="lg:col-span-5">
              <EnquiryForm />
            </div>
          </div>
        </Container>
      </section>
    </PageShell>
  );
};
