import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

interface DarkButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  to?: string;
  href?: string;
  showArrow?: boolean;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
}

export const DarkButton: React.FC<DarkButtonProps> = ({
  children,
  to,
  href,
  showArrow = false,
  size = 'md',
  fullWidth = false,
  className,
  disabled,
  ...props
}) => {
  const sizeClasses = {
    sm: 'px-4 py-2 text-xs font-semibold rounded-lg gap-1.5',
    md: 'px-6 py-3 text-sm font-semibold rounded-lg gap-2',
    lg: 'px-8 py-4 text-base font-bold rounded-xl gap-2.5'
  };

  const baseClasses = cn(
    'inline-flex items-center justify-center bg-white text-[#101820] font-semibold transition-all duration-300 ease-out hover:bg-gray-100 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#101820] disabled:opacity-50 disabled:pointer-events-none group cursor-pointer shadow-sm',
    sizeClasses[size],
    fullWidth && 'w-full',
    className
  );

  const content = (
    <>
      <span>{children}</span>
      {showArrow && (
        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
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
