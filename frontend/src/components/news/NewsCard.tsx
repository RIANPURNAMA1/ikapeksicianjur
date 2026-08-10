import Image from "next/image";
import Link from "next/link";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { NewsArticle } from "@/types/news";
import { formatDate } from "@/lib/utils";

export default function NewsCard({ article }: { article: NewsArticle }) {
  return (
    <Link href={`/berita/${article.slug}`} className="btn-focus block">
      <Card className="h-full transition-transform duration-200 hover:-translate-y-1">
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <Image
            src={article.image}
            alt={article.title}
            fill
            sizes="(min-width: 1024px) 380px, 90vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-center gap-3">
            <Badge tone="outline">{article.category}</Badge>
            <span className="text-xs font-medium text-ink-muted">{formatDate(article.date)}</span>
          </div>
          <h3 className="mt-3 text-base font-bold leading-snug text-ink">{article.title}</h3>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-muted">{article.excerpt}</p>
        </div>
      </Card>
    </Link>
  );
}
