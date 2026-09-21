import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className }) => {
  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center text-xs md:text-sm text-[#667085]', className)}>
      <ol className="flex items-center space-x-2 flex-wrap">
        <li>
          <Link
            to="/"
            className="inline-flex items-center text-[#667085] hover:text-[#F26A21] transition-colors"
            title="Home"
          >
            <Home className="w-3.5 h-3.5" />
            <span className="sr-only">Home</span>
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center space-x-2">
              <ChevronRight className="w-3.5 h-3.5 text-[#A0A5A8] shrink-0" />
              {item.href && !isLast ? (
                <Link
                  to={item.href}
                  className="text-[#667085] hover:text-[#F26A21] font-medium transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="font-semibold text-[#202426]" aria-current={isLast ? 'page' : undefined}>
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
