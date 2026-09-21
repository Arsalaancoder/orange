import React from 'react';
import { PageShell } from '@/components/layout/PageShell';
import { Container } from '@/components/shared/Container';
import { PrimaryButton } from '@/components/shared/PrimaryButton';
import { SecondaryButton } from '@/components/shared/SecondaryButton';

export const NotFoundPage: React.FC = () => {
  return (
    <PageShell title="Page Not Found (404)" showAdmissionsCTA={false}>
      <section className="py-24 md:py-36 bg-white">
        <Container size="narrow" className="text-center">
          <span className="text-6xl md:text-8xl font-black text-[#F26A21] font-mono tracking-tight block mb-4">
            404
          </span>
          <h1 className="heading-subsection text-[#202426] mb-4">
            Page Not Found
          </h1>
          <p className="text-base md:text-lg text-[#667085] leading-relaxed mb-8 max-w-md mx-auto">
            The page you are looking for may have been moved, renamed, or is currently under architectural development.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <PrimaryButton to="/" size="md" showArrow>
              Return to Home
            </PrimaryButton>
            <SecondaryButton to="/programs" size="md">
              Browse Programs
            </SecondaryButton>
          </div>
        </Container>
      </section>
    </PageShell>
  );
};
