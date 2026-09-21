export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  summary: string;
  content: string;
  imageLabel: string;
}

// Left empty until verified content is provided by the client
export const newsData: NewsArticle[] = [];
