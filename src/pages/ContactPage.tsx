import React from 'react';
import { PageShell } from '@/components/layout/PageShell';
import { Container } from '@/components/shared/Container';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { EnquiryForm } from '@/components/forms/EnquiryForm';
import { footerNavigation } from '@/data/navigation';
import { MapPin } from 'lucide-react';

export const ContactPage: React.FC = () => {
  return (
    <PageShell title="Contact Us" description="Get in touch with the admissions team and campus offices of Orange Group of Nursing & Paramedical Colleges.">
      <section className="section-padding bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-6 space-y-8">
              <SectionHeading
                eyebrow="Admissions & Campus Offices"
                title="We Are Here to Assist You"
                subtitle="Reach out to our admissions team for course guidance, application assistance, or campus visits."
              />

              <div className="space-y-4">
                <h3 className="text-lg font-bold text-[#202426]">Campus Locations</h3>
                {footerNavigation.locations.map((loc, i) => (
                  <div key={i} className="p-5 rounded-2xl bg-[#FAFAF8] border border-[#E3E6E5] flex items-start gap-3.5">
                    <MapPin className="w-5 h-5 text-[#F26A21] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-[#202426] text-base">{loc.name}</h4>
                      <p className="text-sm text-[#667085] mt-0.5">{loc.address}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <EnquiryForm />
            </div>
          </div>
        </Container>
      </section>
    </PageShell>
  );
};
