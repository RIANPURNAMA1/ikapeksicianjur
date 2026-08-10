export interface NewsArticle {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  category: string;
  author: string;
  date: string;
  image: string;
  featured?: boolean;
}
