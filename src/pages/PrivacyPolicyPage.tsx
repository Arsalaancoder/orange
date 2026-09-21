import React from 'react';
import { PageShell } from '@/components/layout/PageShell';
import { Container } from '@/components/shared/Container';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <PageShell title="Privacy Policy" showAdmissionsCTA={false}>
      <section className="section-padding bg-white">
        <Container size="narrow">
          <div className="prose prose-slate max-w-none space-y-6 text-[#667085] leading-relaxed">
            <p className="text-sm font-semibold text-[#F26A21]">Last Updated: September 2026</p>

            <h2 className="text-xl font-bold text-[#202426]">1. Data Collection & Student Enquiries</h2>
            <p>
              Orange Group of Nursing & Paramedical Colleges respects student privacy. Any information submitted via our admission enquiry forms (including name, telephone number, email address, and program preferences) is strictly utilized for educational counseling, application assistance, and institutional communications.
            </p>

            <h2 className="text-xl font-bold text-[#202426]">2. Information Security</h2>
            <p>
              We maintain technical safeguards to protect your personal details from unauthorized access or disclosure. We do not sell or rent prospective student data to third-party marketing entities.
            </p>

            <h2 className="text-xl font-bold text-[#202426]">3. Contact & Consent</h2>
            <p>
              By submitting an admission enquiry, prospective students consent to receive telephone calls, WhatsApp messages, or emails regarding course eligibility, fee structures, and admission procedures.
            </p>
          </div>
        </Container>
      </section>
    </PageShell>
  );
};
