import React from 'react';
import { PageShell } from '@/components/layout/PageShell';
import { Container } from '@/components/shared/Container';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { EnquiryForm } from '@/components/forms/EnquiryForm';
import { MapPin } from 'lucide-react';
import { useSiteContent } from '@/context/SiteContentContext';

export const ContactPage: React.FC = () => {
  const { content } = useSiteContent();
  const text = content.text;
  return (
    <PageShell title="Contact Us" description={text['contact.pageDescription']}>
      <section className="section-padding bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-6 space-y-8">
              <SectionHeading
                eyebrow={text['contact.eyebrow']}
                title={text['contact.title']}
                subtitle={text['contact.subtitle']}
              />

              <div className="space-y-4">
                <h3 className="text-lg font-bold text-[#202426]">{text['contact.campusesTitle']}</h3>
                {[1, 2, 3].map((n) => (
                  <div key={n} className="p-5 rounded-2xl bg-[#FAFAF8] border border-[#E3E6E5] flex items-start gap-3.5">
                    <MapPin className="w-5 h-5 text-[#F26A21] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-[#202426] text-base">{text[`contact.location.${n}.name`]}</h4>
                      <p className="text-sm text-[#667085] mt-0.5">{text[`contact.location.${n}.address`]}</p>
                    </div>
                  </div>
                ))}
                <div className="space-y-1 text-sm text-[#667085]">
                  <p>Main address: {text['contact.address']}</p>
                  <p>Admissions: <a className="font-semibold text-[#202426] hover:text-[#F26A21]" href={`tel:${text['contact.phonePrimary']}`}>{text['contact.phonePrimary']}</a>{text['contact.phoneSecondary'] && <> · <a className="font-semibold text-[#202426] hover:text-[#F26A21]" href={`tel:${text['contact.phoneSecondary']}`}>{text['contact.phoneSecondary']}</a></>}</p>
                  {text['contact.email'] && <p>Email: <a className="font-semibold text-[#202426] hover:text-[#F26A21]" href={`mailto:${text['contact.email']}`}>{text['contact.email']}</a></p>}
                </div>
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
