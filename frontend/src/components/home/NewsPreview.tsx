import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import FeaturedNews from "@/components/news/FeaturedNews";
import NewsCard from "@/components/news/NewsCard";
import { apiFetch } from "@/lib/api";
import { beritaToNewsArticle, type BeritaCard } from "@/lib/news";

export default async function NewsPreview() {
  let featured: ReturnType<typeof beritaToNewsArticle> | null = null;
  let rest: ReturnType<typeof beritaToNewsArticle>[] = [];
  try {
    const data = await apiFetch<{ berita: BeritaCard[] }>("/api/berita-publik?per_page=3");
    const [first, ...others] = data.berita.map(beritaToNewsArticle);
    featured = first;
    rest = others.slice(0, 2);
  } catch {
    featured = null;
    rest = [];
  }

  if (!featured) return null;

  return (
    <section className="bg-white py-20">
      <Container>

        {/* Header Section: Judul dan Tombol */}
        <div className="flex flex-wrap items-end justify-between gap-6">

          {/* Bagian Judul: Dibuat vertikal menurun */}
          <div className="flex flex-col gap-3">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-primary px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-white">
              Berita
            </span>
            <h2 className="text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
              Kabar Terbaru IKAPEKSI
            </h2>
          </div>

          <Button href="/berita" variant="outline">
            Semua Berita
          </Button>

        </div>

        {/* Content Section: Grid Berita */}
        <div className="mt-12 grid gap-6 lg:grid-cols-2">

          {/* Berita Utama (Kiri pada layar besar) */}
          <FeaturedNews article={featured} />

          {/* List Berita Lainnya (Kanan pada layar besar) */}
          <div className="grid gap-6">
            {rest.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>

        </div>

      </Container>
    </section>
  );
}
