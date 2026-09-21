import React from 'react';
import { Container } from './Container';
import { PrimaryButton } from './PrimaryButton';
import { SecondaryButton } from './SecondaryButton';
import { Eyebrow } from './Eyebrow';
import { cn } from '@/lib/utils';

interface AdmissionsCTAProps {
  variant?: 'dark' | 'light';
  title?: string;
  subtitle?: string;
  className?: string;
}

export const AdmissionsCTA: React.FC<AdmissionsCTAProps> = ({
  variant = 'dark',
  title = "Ready to Begin Your Healthcare Journey?",
  subtitle = "Explore degree and diploma programs in Nursing and Paramedical Sciences across our Medipally, Keesara, and Nalgonda campuses.",
  className = ""
}) => {
  const isDark = variant === 'dark';

  return (
    <section
      id="enquiry-cta"
      className={cn(
        'py-20 md:py-28 relative overflow-hidden transition-colors border-t border-b border-[#E3E6E5]',
        isDark ? 'bg-[#101820] text-white border-white/10' : 'bg-white text-[#202426]',
        className
      )}
    >
      {/* Background visual accents */}
      {isDark ? (
        <>
          <div
            className="absolute top-0 right-0 w-96 h-96 bg-[#F26A21]/10 rounded-full blur-3xl pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-2xl pointer-events-none"
            aria-hidden="true"
          />
        </>
      ) : (
        <div
          className="absolute top-0 right-0 w-96 h-96 bg-[#F26A21]/5 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />
      )}

      <Container>
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 lg:gap-12">
          <div className="max-w-2xl">
            <Eyebrow theme={isDark ? 'dark' : 'light'} className="mb-4">
              Admissions Open 2026 – 2027
            </Eyebrow>
            <h2
              className={cn(
                'heading-subsection font-bold tracking-tight mb-4',
                isDark ? 'text-white' : 'text-[#202426]'
              )}
            >
              {title}
            </h2>
            <p
              className={cn(
                'text-base md:text-lg leading-relaxed',
                isDark ? 'text-gray-300' : 'text-[#667085]'
              )}
            >
              {subtitle}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full sm:w-auto">
            <PrimaryButton to="/admissions#enquiry" size="lg" showArrow fullWidth={false}>
              Enquire Now
            </PrimaryButton>
            <SecondaryButton
              to="/programs"
              size="lg"
              className={isDark ? 'border-white text-white hover:bg-white hover:text-[#101820]' : ''}
              fullWidth={false}
            >
              Explore Programs
            </SecondaryButton>
          </div>
        </div>
      </Container>
    </section>
  );
};
