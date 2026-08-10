import Image from "next/image";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import { NewsArticle } from "@/types/news";
import { formatDate } from "@/lib/utils";

export default function FeaturedNews({ article }: { article: NewsArticle }) {
  return (
    <Link href={`/berita/${article.slug}`} className="btn-focus group block">
      <div className="doc-card grid overflow-hidden md:grid-cols-2">
        <div className="relative aspect-[16/10] w-full md:aspect-auto">
          <Image src={article.image} alt={article.title} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
        </div>
        <div className="flex flex-col justify-center p-8">
          <Badge>Berita Utama</Badge>
          <h2 className="mt-4 text-2xl font-extrabold leading-tight text-ink group-hover:text-primary sm:text-3xl">
            {article.title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-muted">{article.excerpt}</p>
          <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-ink-muted">
            {article.author} &middot; {formatDate(article.date)}
          </p>
        </div>
      </div>
    </Link>
  );
}
