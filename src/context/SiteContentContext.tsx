import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { api } from '@/services/api';
import { mergeSiteContent, type SiteContentDocument } from '@/data/siteContent';

interface SiteContentContextValue {
  content: SiteContentDocument;
  loading: boolean;
  refresh: () => Promise<void>;
}

const SiteContentContext = createContext<SiteContentContextValue | null>(null);

export function SiteContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState(mergeSiteContent(null));
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    try {
      const saved = await api.getSiteContent();
      setContent(mergeSiteContent(saved));
    } catch {
      // Public pages remain available using their existing content if the API is offline.
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { void refresh(); }, []);
  const value = useMemo(() => ({ content, loading, refresh }), [content, loading]);
  return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>;
}

export function useSiteContent() {
  const value = useContext(SiteContentContext);
  if (!value) throw new Error('useSiteContent must be used inside SiteContentProvider');
  return value;
}
