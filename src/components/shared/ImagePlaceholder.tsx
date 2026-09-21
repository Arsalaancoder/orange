import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Image as ImageIcon } from 'lucide-react';

interface ImagePlaceholderProps {
  label: string;
  imageUrl?: string;
  aspectRatio?: '16:9' | '4:3' | '3:2' | '4:5' | '3:4' | '1:1' | 'auto';
  className?: string;
  sublabel?: string;
}

export const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({
  label,
  imageUrl,
  aspectRatio = '16:9',
  className,
  sublabel
}) => {
  const [imgError, setImgError] = useState(false);

  const aspectClasses = {
    '16:9': 'aspect-[16/9]',
    '4:3': 'aspect-[4/3]',
    '3:2': 'aspect-[3/2]',
    '4:5': 'aspect-[4/5]',
    '3:4': 'aspect-[3/4]',
    '1:1': 'aspect-square',
    'auto': 'h-full min-h-[240px]'
  };

  if (imageUrl && !imgError) {
    return (
      <div
        className={cn(
          'relative w-full overflow-hidden rounded-2xl bg-[#101820] border border-[#E3E6E5] group transition-all duration-300 hover:border-[#D0D4D3]',
          aspectClasses[aspectRatio],
          className
        )}
      >
        <img
          src={imageUrl}
          alt={label}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        'relative w-full overflow-hidden rounded-2xl bg-gradient-to-br from-[#F3F4F4] via-[#EAECEB] to-[#E3E6E5] border border-[#E3E6E5] flex flex-col items-center justify-center p-6 text-center transition-all duration-300 group hover:border-[#D0D4D3]',
        aspectClasses[aspectRatio],
        className
      )}
    >
      {/* Subtle decorative background pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#101820_1px,transparent_1px)] [background-size:20px_20px]" 
        aria-hidden="true" 
      />

      <div className="relative z-10 flex flex-col items-center max-w-xs transition-transform duration-300 group-hover:scale-102">
        <div className="w-12 h-12 rounded-xl bg-white/90 backdrop-blur-xs border border-white shadow-2xs flex items-center justify-center text-[#667085] mb-3 group-hover:text-[#F26A21] group-hover:border-[#F26A21]/20 transition-colors">
          <ImageIcon className="w-6 h-6 stroke-[1.5]" />
        </div>
        <p className="text-sm md:text-base font-semibold text-[#202426] tracking-tight leading-snug">
          {label}
        </p>
        {sublabel && (
          <span className="text-[11px] font-medium text-[#667085] uppercase tracking-wider mt-1 block">
            {sublabel}
          </span>
        )}
      </div>
    </div>
  );
};

