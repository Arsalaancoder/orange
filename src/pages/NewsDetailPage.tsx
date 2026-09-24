import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PageShell } from '@/components/layout/PageShell';
import { Container } from '@/components/shared/Container';
import { api } from '@/services/api';
import type { NewsItem } from '@/services/api';
import { ArrowLeft, Calendar, Tag, Newspaper, Loader2 } from 'lucide-react';
import { PrimaryButton } from '@/components/shared/PrimaryButton';

export const NewsDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      api.getNewsBySlug(slug).then((data) => {
        setArticle(data);
        setLoading(false);
      });
    }
  }, [slug]);

  if (loading) {
    return (
      <PageShell title="Loading News Article...">
        <Container className="py-24 text-center">
          <Loader2 className="w-10 h-10 text-[#F26A21] animate-spin mx-auto mb-3" />
          <p className="text-sm font-medium text-[#667085]">Retrieving announcement details...</p>
        </Container>
      </PageShell>
    );
  }

  if (!article) {
    return (
      <PageShell title="Article Not Found">
        <Container className="py-24 text-center">
          <Newspaper className="w-12 h-12 text-[#667085] mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-[#202426] mb-4">Article Not Found</h1>
          <p className="text-[#667085] mb-8">The requested news circular does not exist or has been archived.</p>
          <PrimaryButton to="/news" showArrow>View All News</PrimaryButton>
        </Container>
      </PageShell>
    );
  }

  return (
    <PageShell title={article.title} description={article.short_description}>
      <section className="section-padding bg-white">
        <Container size="narrow">
          <div className="space-y-8">
            <Link to="/news" className="inline-flex items-center gap-2 text-xs font-bold text-[#F26A21] hover:underline">
              <ArrowLeft className="w-4 h-4" /> Back to News & Announcements
            </Link>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="bg-orange-100 text-[#F26A21] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5" />
                  {article.category}
                </span>
                <span className="text-xs text-[#667085] font-semibold flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {article.publish_date}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#202426] tracking-tight leading-tight">
                {article.title}
              </h1>
            </div>

            {article.featured_image && (
              <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-100 max-h-[450px]">
                <img src={article.featured_image} alt={article.title} className="w-full h-full object-cover" />
              </div>
            )}

            <div className="prose prose-slate max-w-none text-[#475467] leading-relaxed space-y-4 font-normal text-base">
              <p className="font-semibold text-[#202426] text-lg leading-relaxed">{article.short_description}</p>
              <div className="whitespace-pre-line pt-4 border-t border-slate-100">{article.full_content}</div>
            </div>
          </div>
        </Container>
      </section>
    </PageShell>
  );
};
