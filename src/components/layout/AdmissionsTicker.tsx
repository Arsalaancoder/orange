import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Three identical copies of the ticker content ensure a seamless loop.
 * The CSS animation shifts the track by -33.333% (one copy width), then
 * loops — creating the illusion of infinite horizontal scroll.
 * aria-hidden="true" on copies 2 & 3 so screen readers see the message once.
 */
const TickerContent: React.FC<{ hidden?: boolean }> = ({ hidden }) => (
  <span
    className="inline-flex items-center text-[#8B3A0F] text-[11.5px] sm:text-[12.5px] font-medium tracking-wide"
    style={{ paddingRight: '6rem' }}
    aria-hidden={hidden || undefined}
  >
    🎓&nbsp;Admissions Open for 2026–27&nbsp;&bull;&nbsp;B.Sc Nursing&nbsp;&bull;&nbsp;GNM&nbsp;&bull;&nbsp;DMLT&nbsp;&bull;&nbsp;Paramedical Programs&nbsp;&nbsp;
    <Link
      to="/admissions"
      className="font-semibold underline underline-offset-2 text-[#C4520E] hover:text-[#101820] transition-colors duration-200"
      aria-label={hidden ? undefined : 'Apply Now for Admissions 2026-27'}
      tabIndex={hidden ? -1 : undefined}
    >
      Apply Now
    </Link>
    &nbsp;&nbsp;&bull;&nbsp;&nbsp;
  </span>
);

export const AdmissionsTicker: React.FC = () => {
  return (
    <div
      className="admissions-ticker w-full"
      style={{
        background: 'linear-gradient(90deg, #FEF0E6 0%, #FDE8D4 50%, #FEF0E6 100%)',
        borderBottom: '1px solid #F9C9A3',
        height: '38px',
        /* clip instead of hidden so we don't create an unwanted scroll context */
        overflowX: 'clip',
        overflowY: 'hidden',
        position: 'relative',
      }}
      role="marquee"
      aria-label="Admissions announcement ticker"
    >
      {/* Soft gradient fade on left & right edges */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          pointerEvents: 'none',
          background:
            'linear-gradient(to right, #FEF0E6 0%, transparent 5%, transparent 95%, #FDE8D4 100%)',
        }}
      />

      {/* Scrolling track */}
      <div
        className="marquee-track"
        style={{
          display: 'flex',
          alignItems: 'center',
          height: '100%',
          whiteSpace: 'nowrap',
          willChange: 'transform',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <TickerContent />
        <TickerContent hidden />
        <TickerContent hidden />
      </div>
    </div>
  );
};
