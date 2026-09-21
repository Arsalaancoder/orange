import React from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  size?: 'default' | 'narrow' | 'wide' | 'full';
  maxW?: 'default' | 'narrow' | 'wide' | 'full';
  className?: string;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  size,
  maxW,
  className,
  ...props
}) => {
  const effectiveSize = size || maxW || 'default';

  const sizeClasses = {
    default: 'max-w-[1340px] px-5 md:px-8 lg:px-10',
    narrow: 'max-w-[840px] px-5 md:px-8',
    wide: 'max-w-[1440px] px-5 md:px-8 lg:px-12',
    full: 'w-full px-5 md:px-8 lg:px-12'
  };

  return (
    <div
      className={cn('mx-auto w-full', sizeClasses[effectiveSize], className)}
      {...props}
    >
      {children}
    </div>
  );
};
