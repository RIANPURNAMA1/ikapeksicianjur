import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import FeaturedNews from "@/components/news/FeaturedNews";
import NewsCard from "@/components/news/NewsCard";
import { newsArticles } from "@/data/news";

export default function NewsPreview() {
  const featured = newsArticles.find((a) => a.featured) ?? newsArticles[0];
  const rest = newsArticles.filter((a) => a.id !== featured.id).slice(0, 2);

  return (
    <section className="bg-white py-20">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Berita" title="Kabar Terbaru IKAPEKSI" />
          <Button href="/berita" variant="outline">
            Semua Berita
          </Button>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <FeaturedNews article={featured} />
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
