import React, { useState } from 'react';
import { PageShell } from '@/components/layout/PageShell';
import { Container } from '@/components/shared/Container';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { faqsData } from '@/data/faqs';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const FAQPage: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(faqsData[0]?.id || null);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <PageShell title="Frequently Asked Questions" description="Find answers to common questions regarding admissions, programs, facilities, and campus locations at Orange Group.">
      <section className="section-padding bg-white">
        <Container size="narrow">
          <SectionHeading
            eyebrow="Help & Guidance"
            title="Common Questions Answered"
            subtitle="Find key information on nursing degrees, paramedical diplomas, campus locations, and admission procedures."
            align="center"
          />

          <div className="space-y-4">
            {faqsData.map(faq => {
              const isOpen = openId === faq.id;
              return (
                <div key={faq.id} className="rounded-2xl border border-[#E3E6E5] bg-[#FAFAF8] overflow-hidden transition-all">
                  <button
                    onClick={() => toggle(faq.id)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-base md:text-lg text-[#202426] hover:text-[#F26A21] transition-colors cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 text-[#F26A21] shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 text-sm md:text-base text-[#667085] leading-relaxed border-t border-[#E3E6E5] pt-4">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Container>
      </section>
    </PageShell>
  );
};
