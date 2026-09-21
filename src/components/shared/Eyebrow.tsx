import React from 'react';
import { cn } from '@/lib/utils';

interface EyebrowProps {
  children?: React.ReactNode;
  text?: string;
  className?: string;
  theme?: 'light' | 'dark' | 'purple';
  showDot?: boolean;
}

export const Eyebrow: React.FC<EyebrowProps> = ({
  children,
  text,
  className,
  theme = 'light',
  showDot = false
}) => {
  const content = children || text;

  const themeClasses = {
    light: 'bg-[#F26A21]/10 text-[#F26A21] border border-[#F26A21]/20',
    purple: 'bg-[#EBE2FF] text-[#7C3AED] border border-[#E1D4FF]',
    dark: 'bg-white/10 text-white border border-white/20'
  };

  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider shadow-2xs transition-all',
        themeClasses[theme],
        className
      )}
    >
      {showDot && (
        <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0" aria-hidden="true" />
      )}
      <span>{content}</span>
    </div>
  );
};

