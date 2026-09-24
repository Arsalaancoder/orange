import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface LogoProps {
  mode?: 'solid' | 'transparent';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Logo: React.FC<LogoProps> = ({ mode = 'solid', className, size = 'lg' }) => {
  const isTransparent = mode === 'transparent';

  const sizeClasses = {
    sm: 'h-10 sm:h-12',
    md: 'h-12 sm:h-14 md:h-16',
    lg: 'h-15 sm:h-18 md:h-20 lg:h-22',
    xl: 'h-20 sm:h-24 md:h-28'
  }[size];

  return (
    <Link
      to="/"
      className={cn(
        'inline-flex items-center group focus-visible:outline-none transition-all duration-300 shrink-0',
        className
      )}
      aria-label="Orange College of Paramedical - Home"
    >
      <div
        className={cn(
          'relative flex items-center shrink-0 p-0.5 transition-all duration-300',
          isTransparent ? 'drop-shadow-[0_2px_10px_rgba(255,255,255,0.4)]' : 'bg-transparent'
        )}
      >
        <img
          src="/logo.png"
          alt="Orange College of Paramedical Logo"
          className={cn(
            'w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]',
            sizeClasses
          )}
        />
      </div>
    </Link>
  );
};
