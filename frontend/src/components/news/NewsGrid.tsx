import { NewsArticle } from "@/types/news";
import NewsCard from "./NewsCard";

export default function NewsGrid({ articles }: { articles: NewsArticle[] }) {
  if (articles.length === 0) {
    return (
      <div className="py-16 text-center text-ink-muted">
        <p className="text-sm">Tidak ada berita yang cocok dengan pencarian atau filter Anda.</p>
      </div>
    );
  }
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <NewsCard key={article.id} article={article} />
      ))}
    </div>
  );
}
