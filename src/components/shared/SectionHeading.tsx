import React from 'react';
import { cn } from '@/lib/utils';
import { Eyebrow } from './Eyebrow';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  theme?: 'light' | 'dark';
  titleAs?: 'h1' | 'h2' | 'h3';
  serifTitle?: boolean;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  theme = 'light',
  titleAs = 'h2',
  serifTitle = false,
  className
}) => {
  const Component = titleAs;

  const alignClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center mx-auto',
    right: 'text-right items-end ml-auto'
  };

  const isDark = theme === 'dark';

  return (
    <div className={cn('flex flex-col max-w-3xl mb-12 md:mb-16', alignClasses[align], className)}>
      {eyebrow && (
        <Eyebrow theme={theme} className="mb-3 md:mb-4">
          {eyebrow}
        </Eyebrow>
      )}

      <Component
        className={cn(
          'heading-section font-bold tracking-tight inline-flex flex-wrap items-baseline gap-2',
          serifTitle && 'font-serif-heading font-semibold italic',
          isDark ? 'text-white' : 'text-[#1F192F]'
        )}
      >
        <span>{title}</span>
        <span className="inline-flex text-[#8B5CF6] shrink-0 transform translate-y-[-0.1em]" aria-hidden="true">
          <svg className="w-6 h-6 md:w-8 md:h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
          </svg>
        </span>
      </Component>

      {subtitle && (
        <p
          className={cn(
            'mt-4 md:mt-5 text-base md:text-lg lg:text-xl font-normal leading-relaxed',
            isDark ? 'text-gray-300' : 'text-[#667085]'
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};
