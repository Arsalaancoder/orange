import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { PageShell } from '@/components/layout/PageShell';
import { Container } from '@/components/shared/Container';
import { newsData } from '@/data/news';
import { ArrowLeft } from 'lucide-react';
import { PrimaryButton } from '@/components/shared/PrimaryButton';

export const NewsDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = newsData.find(n => n.slug === slug);

  if (!article) {
    return (
      <PageShell title="Article Not Found">
        <Container className="py-24 text-center">
          <h1 className="text-3xl font-bold text-[#202426] mb-4">Article Not Found</h1>
          <p className="text-[#667085] mb-8">The requested news update does not exist.</p>
          <PrimaryButton to="/news" showArrow>View All News</PrimaryButton>
        </Container>
      </PageShell>
    );
  }

  return (
    <PageShell title={article.title}>
      <section className="section-padding bg-white">
        <Container size="narrow">
          <div className="space-y-6">
            <p className="text-[#667085] leading-relaxed">{article.content}</p>
            <Link to="/news" className="inline-flex items-center gap-2 text-sm font-semibold text-[#F26A21]">
              <ArrowLeft className="w-4 h-4" /> Back to News
            </Link>
          </div>
        </Container>
      </section>
    </PageShell>
  );
};
