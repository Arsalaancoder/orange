import React from 'react';
import { Link } from 'react-router-dom';

const TICKER_TEXT = (
  <>
    🎓 Admissions Open for 2026–27&nbsp;&bull;&nbsp;B.Sc Nursing&nbsp;&bull;&nbsp;GNM&nbsp;&bull;&nbsp;DMLT&nbsp;&bull;&nbsp;Paramedical Programs&nbsp;&nbsp;
    <Link
      to="/admissions"
      className="inline-font-bold underline underline-offset-2 text-[#C4520E] hover:text-[#101820] transition-colors duration-200 font-semibold"
      aria-label="Apply Now for Admissions 2026-27"
    >
      Apply Now
    </Link>
    &nbsp;&nbsp;&bull;&nbsp;&nbsp;
  </>
);

export const AdmissionsTicker: React.FC = () => {
  return (
    <div
      className="admissions-ticker w-full overflow-hidden"
      style={{
        background: 'linear-gradient(90deg, #FEF0E6 0%, #FDE8D4 50%, #FEF0E6 100%)',
        borderBottom: '1px solid #F9C9A3',
        height: '38px',
      }}
      role="marquee"
      aria-label="Admissions announcement ticker"
    >
      {/* Viewport mask for fade edges */}
      <div
        className="relative h-full flex items-center"
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)',
        }}
      >
        {/* Scrolling track — duplicated content for seamless loop */}
        <div
          className="marquee-track flex items-center shrink-0 whitespace-nowrap"
          style={{
            willChange: 'transform',
          }}
        >
          {/* Copy 1 */}
          <span className="inline-flex items-center gap-0 text-[#8B3A0F] text-[12px] sm:text-[13px] font-medium tracking-wide pr-16">
            {TICKER_TEXT}
          </span>
          {/* Copy 2 — seamless repeat */}
          <span
            className="inline-flex items-center gap-0 text-[#8B3A0F] text-[12px] sm:text-[13px] font-medium tracking-wide pr-16"
            aria-hidden="true"
          >
            {TICKER_TEXT}
          </span>
          {/* Copy 3 — extra buffer for very wide screens */}
          <span
            className="inline-flex items-center gap-0 text-[#8B3A0F] text-[12px] sm:text-[13px] font-medium tracking-wide pr-16"
            aria-hidden="true"
          >
            {TICKER_TEXT}
          </span>
        </div>
      </div>
    </div>
  );
};
