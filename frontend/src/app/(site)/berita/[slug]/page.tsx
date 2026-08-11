import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Container from "@/components/layout/Container";
import NewsDetail from "@/components/news/NewsDetail";
import NewsCard from "@/components/news/NewsCard";
import { newsArticles } from "@/data/news";

export function generateStaticParams() {
  return newsArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = newsArticles.find((a) => a.slug === slug);
  return { title: article ? article.title : "Berita" };
}

export default async function BeritaDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = newsArticles.find((a) => a.slug === slug);
  if (!article) notFound();

  const related = newsArticles.filter((a) => a.id !== article.id).slice(0, 3);

  return (
    <section className="py-20">
      <Container>
        <Link href="/berita" className="btn-focus text-sm font-bold uppercase tracking-wide text-primary">
          &larr; Kembali ke Berita
        </Link>
        <div className="mt-8">
          <NewsDetail article={article} />
        </div>

        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="text-xl font-extrabold text-ink">Berita Lainnya</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <NewsCard key={item.id} article={item} />
              ))}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
