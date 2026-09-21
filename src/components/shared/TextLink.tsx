import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

interface TextLinkProps {
  children: React.ReactNode;
  to?: string;
  href?: string;
  theme?: 'light' | 'dark' | 'orange';
  showArrow?: boolean;
  className?: string;
}

export const TextLink: React.FC<TextLinkProps> = ({
  children,
  to,
  href,
  theme = 'orange',
  showArrow = true,
  className
}) => {
  const themeClasses = {
    orange: 'text-[#F26A21] hover:text-[#D95412]',
    light: 'text-[#202426] hover:text-[#F26A21]',
    dark: 'text-white hover:text-[#F26A21]'
  };

  const baseClasses = cn(
    'inline-flex items-center gap-1.5 font-semibold text-sm md:text-base transition-colors duration-200 group cursor-pointer underline-offset-4 hover:underline',
    themeClasses[theme],
    className
  );

  const content = (
    <>
      <span>{children}</span>
      {showArrow && (
        <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 shrink-0" />
      )}
    </>
  );

  if (to) {
    return <Link to={to} className={baseClasses}>{content}</Link>;
  }

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={baseClasses}>
        {content}
      </a>
    );
  }

  return <span className={baseClasses}>{content}</span>;
};
