import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Three identical copies of the ticker content ensure a seamless infinite loop.
 * The CSS animation shifts the track by -33.333% (one copy width), then
 * loops — creating the illusion of infinite horizontal scroll.
 * aria-hidden="true" on copies 2 & 3 so screen readers see the message once.
 */
const TickerContent: React.FC<{ hidden?: boolean }> = ({ hidden }) => (
  <span
    className="inline-flex items-center text-[#202426] text-[12px] sm:text-[13px] font-medium tracking-wide shrink-0"
    style={{ paddingRight: '5rem' }}
    aria-hidden={hidden || undefined}
  >
    {/* Admissions Open Pill Badge */}
    <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#F26A21] text-white font-bold text-[10.5px] uppercase tracking-wider shadow-2xs mr-3">
      <span>🎓 Admissions Open 2026–27</span>
    </span>

    {/* Apple Nursing Colleges from Image */}
    <span className="font-bold text-[#8B3A0F] font-serif-heading text-[13.5px] sm:text-[14.5px] tracking-wide mr-2">
      APPLE B.Sc NURSING &amp; APPLE SCHOOL OF NURSING
    </span>

    <span className="text-[#F26A21] mx-2 font-bold">&bull;</span>

    {/* Location from Image */}
    <span className="inline-flex items-center gap-1 text-[#344054] font-medium mr-2">
      <span>📍 Bandlaguda Cross Road, Mandal : Keesara</span>
    </span>

    <span className="text-[#F26A21] mx-2 font-bold">&bull;</span>

    {/* Phone Numbers from Image */}
    <span className="inline-flex items-center gap-1.5 mr-2">
      <span className="text-[#8B3A0F] font-semibold">📞 Helpline:</span>
      <a
        href="tel:9346410606"
        className="font-bold text-[#C4520E] hover:text-[#101820] hover:underline transition-colors"
        tabIndex={hidden ? -1 : undefined}
      >
        93464 10606
      </a>
      <span className="text-[#8B3A0F]/60">|</span>
      <a
        href="tel:9494352950"
        className="font-bold text-[#C4520E] hover:text-[#101820] hover:underline transition-colors"
        tabIndex={hidden ? -1 : undefined}
      >
        94943 52950
      </a>
    </span>

    <span className="text-[#F26A21] mx-2 font-bold">&bull;</span>

    {/* Official Email */}
    <span className="inline-flex items-center gap-1.5 mr-3">
      <span className="text-[#8B3A0F] font-semibold">✉️ Official Email:</span>
      <a
        href="mailto:info@orangecolleges.com"
        className="font-bold text-[#C4520E] hover:text-[#101820] hover:underline underline-offset-2 transition-colors font-mono text-[11.5px] sm:text-[12.5px]"
        tabIndex={hidden ? -1 : undefined}
      >
        info@orangecolleges.com
      </a>
    </span>

    <span className="text-[#F26A21] mx-2 font-bold">&bull;</span>

    {/* Programs */}
    <span className="text-[#485056] font-medium mr-3">
      B.Sc Nursing &bull; GNM &bull; DMLT &bull; Paramedical Programs
    </span>

    {/* Apply Now Button */}
    <Link
      to="/admissions"
      className="inline-flex items-center gap-1.5 font-bold px-3 py-1 rounded-full bg-[#C4520E] hover:bg-[#8B3A0F] text-white text-[11px] shadow-xs hover:shadow transition-all duration-200 uppercase tracking-wider shrink-0"
      aria-label={hidden ? undefined : 'Apply Now for Admissions 2026-27'}
      tabIndex={hidden ? -1 : undefined}
    >
      <span>Apply Now</span>
      <span>&rarr;</span>
    </Link>
  </span>
);

export const AdmissionsTicker: React.FC = () => {
  return (
    <div
      className="admissions-ticker w-full"
      style={{
        background: 'linear-gradient(90deg, #FEF0E6 0%, #FDE8D4 50%, #FEF0E6 100%)',
        borderBottom: '1px solid #F9C9A3',
        height: '42px',
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
            'linear-gradient(to right, #FEF0E6 0%, transparent 4%, transparent 96%, #FDE8D4 100%)',
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
