import React from 'react';
import { PageShell } from '@/components/layout/PageShell';
import { Container } from '@/components/shared/Container';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { newsData } from '@/data/news';
import { Newspaper } from 'lucide-react';

export const NewsPage: React.FC = () => {
  return (
    <PageShell title="News & Announcements" description="Latest announcements, academic schedules, and institutional events from Orange Group.">
      <section className="section-padding bg-white">
        <Container>
          <SectionHeading
            eyebrow="Announcements"
            title="Institutional News & Updates"
            subtitle="Stay informed about campus events, academic circulars, and health awareness initiatives."
          />

          {newsData.length === 0 ? (
            <div className="p-12 text-center bg-[#FAFAF8] rounded-2xl border border-[#E3E6E5] max-w-2xl mx-auto">
              <Newspaper className="w-10 h-10 text-[#F26A21] mx-auto mb-3" />
              <h3 className="text-lg font-bold text-[#202426] mb-2">No News Articles Published Yet</h3>
              <p className="text-sm text-[#667085] leading-relaxed">
                Official announcements and news updates will be published here upon client confirmation.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Future news cards */}
            </div>
          )}
        </Container>
      </section>
    </PageShell>
  );
};
