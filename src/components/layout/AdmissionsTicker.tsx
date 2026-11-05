import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Two identical tracks with transform: translateX(-100%) ensure that 100% of
 * all text is fully displayed and continuously scrolled across the screen in
 * an infinitely seamless loop without any cutoff or premature reset.
 */
const TickerContent: React.FC<{ hidden?: boolean }> = ({ hidden }) => (
  <div
    className="inline-flex items-center text-[#202426] text-[12px] sm:text-[13px] font-medium tracking-wide shrink-0 pr-12"
    aria-hidden={hidden || undefined}
  >
    {/* Admissions Open Pill Badge */}
    <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#F26A21] text-white font-bold text-[10.5px] uppercase tracking-wider shadow-2xs mr-3">
      <span>🎓 Admissions Open 2026–27</span>
    </span>

    {/* Apple Nursing Institutions from Image */}
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

    {/* Programs */}
    <span className="text-[#485056] font-medium mr-3">
      B.Sc Nursing &bull; GNM &bull; DMLT &bull; Paramedical Programs
    </span>

    {/* Apply Now Button */}
    <Link
      to="/admissions"
      className="inline-flex items-center gap-1.5 font-bold px-3 py-0.5 rounded-full bg-[#C4520E] hover:bg-[#8B3A0F] text-white text-[11px] shadow-xs hover:shadow transition-all duration-200 uppercase tracking-wider shrink-0"
      aria-label={hidden ? undefined : 'Apply Now for Admissions 2026-27'}
      tabIndex={hidden ? -1 : undefined}
    >
      <span>Apply Now</span>
      <span>&rarr;</span>
    </Link>
  </div>
);

export const AdmissionsTicker: React.FC = () => {
  return (
    <div
      className="admissions-ticker w-full overflow-hidden flex relative"
      style={{
        background: 'linear-gradient(90deg, #FEF0E6 0%, #FDE8D4 50%, #FEF0E6 100%)',
        borderBottom: '1px solid #F9C9A3',
        height: '40px',
      }}
      role="marquee"
      aria-label="Admissions announcement ticker"
    >
      {/* Soft gradient fade on left & right edges */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            'linear-gradient(to right, #FEF0E6 0%, transparent 3%, transparent 97%, #FDE8D4 100%)',
        }}
      />

      {/* Two identical scrolling tracks that move continuously from 0% to -100% */}
      <div className="marquee-track flex shrink-0 items-center h-full">
        <TickerContent />
      </div>
      <div className="marquee-track flex shrink-0 items-center h-full" aria-hidden="true">
        <TickerContent hidden />
      </div>
    </div>
  );
};
