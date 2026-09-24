import React, { useEffect, useState } from 'react';
import { PageShell } from '@/components/layout/PageShell';
import { Container } from '@/components/shared/Container';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { api } from '@/services/api';
import type { NewsItem } from '@/services/api';
import { Newspaper, Calendar, ArrowRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { softPopUpVariant, staggeredContainerVariant } from '@/lib/motionVariants';

export const NewsPage: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    api.getNews().then((data) => {
      if (isMounted) {
        setNews(data);
        setLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <PageShell title="News & Announcements" description="Latest announcements, academic schedules, and institutional events from Orange Group.">
      <section className="section-padding bg-[#FAFAF8]">
        <Container>
          <SectionHeading
            eyebrow="Announcements"
            title="Institutional News & Updates"
            subtitle="Stay informed about campus events, academic circulars, and health awareness initiatives."
          />

          {loading ? (
            <div className="p-16 text-center">
              <Loader2 className="w-10 h-10 text-[#F26A21] animate-spin mx-auto mb-3" />
              <p className="text-sm font-medium text-[#667085]">Fetching official circulars...</p>
            </div>
          ) : news.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-[#E3E6E5] max-w-2xl mx-auto shadow-xs">
              <Newspaper className="w-10 h-10 text-[#F26A21] mx-auto mb-3" />
              <h3 className="text-lg font-bold text-[#202426] mb-2">No News Articles Published Yet</h3>
              <p className="text-sm text-[#667085] leading-relaxed">
                Official announcements and news updates will be published here dynamically from the Cloudflare CMS.
              </p>
            </div>
          ) : (
            <motion.div
              variants={staggeredContainerVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {news.map((item) => (
                <motion.div key={item.id} variants={softPopUpVariant}>
                  <div className="bg-white rounded-2xl border border-[#E3E6E5] shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between h-full group">
                    <div>
                      <div className="relative h-48 bg-slate-100 overflow-hidden">
                        <img
                          src={item.featured_image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3 bg-[#F26A21] text-white text-[11px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-md">
                          {item.category}
                        </div>
                      </div>

                      <div className="p-6 space-y-3">
                        <div className="flex items-center gap-2 text-xs text-[#667085] font-semibold">
                          <Calendar className="w-3.5 h-3.5 text-[#F26A21]" />
                          <span>{item.publish_date}</span>
                        </div>
                        <h3 className="text-lg font-bold text-[#202426] leading-snug group-hover:text-[#F26A21] transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-sm text-[#667085] leading-relaxed line-clamp-3">
                          {item.short_description}
                        </p>
                      </div>
                    </div>

                    <div className="px-6 pb-6 pt-2">
                      <Link
                        to={`/news/${item.slug}`}
                        className="inline-flex items-center gap-2 text-xs font-bold text-[#F26A21] group-hover:translate-x-1 transition-transform"
                      >
                        <span>Read Full Announcement</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </Container>
      </section>
    </PageShell>
  );
};
