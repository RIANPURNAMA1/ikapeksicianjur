import Image from "next/image";
import Badge from "@/components/ui/Badge";
import { NewsArticle } from "@/types/news";
import { formatDate } from "@/lib/utils";

export default function NewsDetail({ article }: { article: NewsArticle }) {
  return (
    <article>
      <Badge>{article.category}</Badge>
      <h1 className="mt-4 text-3xl font-extrabold leading-tight text-ink sm:text-4xl">{article.title}</h1>
      <p className="mt-3 text-sm font-semibold uppercase tracking-wide text-ink-muted">
        {article.author} &middot; {formatDate(article.date)}
      </p>
      <div className="doc-card relative mt-8 aspect-[16/9] w-full overflow-hidden">
        <Image src={article.image} alt={article.title} fill sizes="(min-width: 1024px) 900px, 100vw" className="object-cover" />
      </div>
      <div
        className="prose-news mt-8 max-w-2xl text-base leading-relaxed text-ink-soft"
        dangerouslySetInnerHTML={{ __html: article.content.join("\n") }}
      />
    </article>
  );
}
