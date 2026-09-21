import React from 'react';

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface FaqRow {
  id: string;
  speed: string;
  direction: 'left' | 'right';
  faqItems: FaqItem[];
}

export interface FaqData {
  mainTitle?: string;
  mainSubtitle?: string;
  rows: FaqRow[];
}

/**
 * FaqCard
 * Reusable card for a single FAQ item.
 */
export const FaqCard: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  return (
    <div className="flex flex-col items-start gap-3 p-6 bg-white rounded-2xl border border-[#E8D9FF] shadow-md hover:shadow-xl hover:border-[#8B5CF6] transition-all duration-300 w-80 sm:w-96 flex-shrink-0 faq-card group">
      <div className="flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6] shrink-0 group-hover:scale-125 transition-transform" />
        <h3 className="text-base sm:text-lg font-bold text-[#1F192F] faq-title leading-snug">{question}</h3>
      </div>
      <p className="text-xs sm:text-sm text-[#667085] faq-answer leading-relaxed">{answer}</p>
    </div>
  );
};

/**
 * HorizontalScroller
 * Wraps children and creates a seamless horizontal looping animation.
 */
export const HorizontalScroller: React.FC<{
  children: React.ReactNode;
  speed?: string;
  direction?: 'left' | 'right';
}> = ({ children, speed = '40s', direction = 'left' }) => {
  const animationClass =
    direction === 'right' ? 'animate-scroll-horizontal-reverse' : 'animate-scroll-horizontal';

  // Inline style to set the CSS custom property for scroll duration.
  const style = { '--scroll-duration': speed } as React.CSSProperties;

  return (
    <div className="w-full overflow-hidden group relative scroller-mask py-2">
      <div className={`flex ${animationClass}`} style={style}>
        <div className="flex items-stretch justify-center flex-shrink-0 gap-6 px-3">
          {children}
        </div>
        {/* duplicate for seamless loop */}
        <div className="flex items-stretch justify-center flex-shrink-0 gap-6 px-3" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
};

/**
 * FaqSection
 * Assembles title, subtitle, and multiple horizontal rows.
 */
export const FaqSection: React.FC<{ data: FaqData }> = ({ data }) => {
  return (
    <div className="relative flex flex-col items-center gap-8 py-6 w-full max-w-7xl mx-auto overflow-hidden">
      {data.mainTitle && (
        <div className="flex flex-col items-center gap-3 text-center z-10 max-w-2xl px-4">
          <h2
            className="text-3xl sm:text-4xl font-bold text-[#1F192F] leading-tight"
            style={{ opacity: 0, animation: 'fadeInUp 0.7s ease-out 0.2s forwards' }}
          >
            {data.mainTitle}
          </h2>
          {data.mainSubtitle && (
            <p
              className="text-sm sm:text-base text-[#667085]"
              style={{ opacity: 0, animation: 'fadeInUp 0.7s ease-out 0.4s forwards' }}
            >
              {data.mainSubtitle}
            </p>
          )}
        </div>
      )}

      <div className="flex flex-col gap-6 z-10 w-full">
        {data.rows.map((row) => (
          <HorizontalScroller key={row.id} speed={row.speed} direction={row.direction}>
            {row.faqItems.map((item) => (
              <FaqCard key={item.id} question={item.question} answer={item.answer} />
            ))}
          </HorizontalScroller>
        ))}
      </div>
    </div>
  );
};

export default FaqSection;
