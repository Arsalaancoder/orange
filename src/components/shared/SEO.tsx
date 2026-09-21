import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { formatPageTitle } from '@/lib/utils';

interface SEOProps {
  title?: string;
  description?: string;
  canonicalPath?: string;
  ogType?: string;
  ogImage?: string;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description = "Official website of Orange Group of Nursing & Paramedical Colleges. Empowering Healthcare Professionals. Building a Healthier Future.",
  canonicalPath = "",
  ogType = "website",
  ogImage = "/og-image.jpg"
}) => {
  const fullTitle = formatPageTitle(title);
  const siteUrl = "https://orangeparamedical.edu.in";
  const canonicalUrl = `${siteUrl}${canonicalPath}`;

  useEffect(() => {
    document.title = fullTitle;
  }, [fullTitle]);

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={`${siteUrl}${ogImage}`} />
      <meta property="og:site_name" content="Orange Group of Nursing & Paramedical Colleges" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}${ogImage}`} />
    </Helmet>
  );
};
