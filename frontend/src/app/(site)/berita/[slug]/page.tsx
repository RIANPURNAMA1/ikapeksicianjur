import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Container from "@/components/layout/Container";
import NewsDetail from "@/components/news/NewsDetail";
import NewsCard from "@/components/news/NewsCard";
import { apiFetch, resolveAssetUrl } from "@/lib/api";
import { beritaToNewsArticle, type BeritaCard } from "@/lib/news";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  buildMetadata,
  JsonLd,
} from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const data = await apiFetch<{ berita: BeritaCard }>(`/api/berita-publik/${slug}`);
    const { berita } = data;
    return buildMetadata({
      title: berita.judul,
      description: berita.excerpt ?? berita.judul,
      path: `/berita/${berita.slug}`,
      image: berita.gambar ? resolveAssetUrl(berita.gambar) : undefined,
      type: "article",
      publishedTime: berita.tanggal_iso,
    });
  } catch {
    return buildMetadata({ title: "Berita", path: "/berita" });
  }
}

export default async function BeritaDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let article;
  try {
    const data = await apiFetch<{ berita: BeritaCard }>(`/api/berita-publik/${slug}`);
    article = beritaToNewsArticle(data.berita);
  } catch {
    notFound();
  }

  let related: ReturnType<typeof beritaToNewsArticle>[] = [];
  try {
    const list = await apiFetch<{ berita: BeritaCard[] }>("/api/berita-publik?per_page=6");
    related = list.berita
      .map(beritaToNewsArticle)
      .filter((a) => a.id !== article.id)
      .slice(0, 3);
  } catch {
    related = [];
  }

  return (
    <section className="py-20">
      <Container>
        <JsonLd
          data={articleJsonLd({
            headline: article.title,
            description: article.excerpt,
            url: `/berita/${article.slug}`,
            image: article.image,
            datePublished: article.date,
            dateModified: article.date,
            author: article.author,
          })}
        />
        <JsonLd
          data={breadcrumbJsonLd({
            items: [
              { name: "Beranda", path: "/" },
              { name: "Berita", path: "/berita" },
              { name: article.title, path: `/berita/${article.slug}` },
            ],
          })}
        />

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
