import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

interface SecondaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  to?: string;
  href?: string;
  showArrow?: boolean;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
}

export const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  children,
  to,
  href,
  showArrow = true,
  size = 'md',
  fullWidth = false,
  className,
  disabled,
  ...props
}) => {
  const sizeClasses = {
    sm: 'px-5 py-2.5 text-xs font-semibold gap-2.5',
    md: 'px-6 py-3 text-sm font-bold gap-3',
    lg: 'px-8 py-4 text-base font-bold gap-4'
  };

  const circleSizes = {
    sm: 'w-5 h-5 text-[10px]',
    md: 'w-6 h-6 text-xs',
    lg: 'w-7 h-7 text-sm'
  };

  const baseClasses = cn(
    'inline-flex items-center justify-center bg-[#F3F4F4] border border-[#E3E6E5] text-[#202426] hover:bg-[#202426] hover:text-white hover:border-[#202426] font-semibold rounded-full shadow-2xs transition-all duration-300 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F26A21] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none group cursor-pointer',
    sizeClasses[size],
    fullWidth && 'w-full',
    className
  );

  const content = (
    <>
      <span className="tracking-wide">{children}</span>
      {showArrow && (
        <span className={cn('rounded-full bg-[#E3E6E5] group-hover:bg-white/20 text-[#202426] group-hover:text-white flex items-center justify-center transition-all duration-300 shrink-0', circleSizes[size])}>
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
        </span>
      )}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={baseClasses}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={baseClasses}>
        {content}
      </a>
    );
  }

  return (
    <button disabled={disabled} className={baseClasses} {...props}>
      {content}
    </button>
  );
};

