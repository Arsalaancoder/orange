import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface LogoProps {
  mode?: 'solid' | 'transparent';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ mode = 'solid', className }) => {
  const isTransparent = mode === 'transparent';

  return (
    <Link
      to="/"
      className={cn(
        'inline-flex items-center gap-3 group focus-visible:outline-none transition-all duration-300 shrink-0',
        className
      )}
      aria-label="Orange Group of Nursing & Paramedical Colleges - Home"
    >
      {/* Brand Icon Mark (Replaceable with SVG / Image later) */}
      <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-[#F26A21] flex items-center justify-center text-white font-extrabold text-lg md:text-xl shadow-2xs group-hover:bg-[#D95412] transition-colors shrink-0">
        O
      </div>

      {/* Text Brand Identity with refined proportions */}
      <div className="flex flex-col text-left leading-tight">
        <span
          className={cn(
            'text-xs md:text-[13px] font-extrabold uppercase tracking-[0.16em] leading-none transition-colors duration-300',
            isTransparent ? 'text-white' : 'text-[#F26A21]'
          )}
        >
          ORANGE GROUP
        </span>
        <span
          className={cn(
            'text-[10px] md:text-[11px] font-semibold tracking-normal mt-0.5 whitespace-nowrap transition-colors duration-300',
            isTransparent ? 'text-gray-300' : 'text-[#667085]'
          )}
        >
          Nursing & Paramedical Colleges
        </span>
      </div>
    </Link>
  );
};
