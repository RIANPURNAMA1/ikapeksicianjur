"use client";

import { useMemo, useState } from "react";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Pagination from "@/components/ui/Pagination";
import NewsGrid from "@/components/news/NewsGrid";
import { newsArticles } from "@/data/news";

const PAGE_SIZE = 6;

export default function BeritaPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);

  const categoryOptions = useMemo(
    () => Array.from(new Set(newsArticles.map((a) => a.category))).map((c) => ({ label: c, value: c })),
    []
  );

  const filtered = useMemo(() => {
    return newsArticles.filter((article) => {
      const matchesQuery =
        !query.trim() ||
        article.title.toLowerCase().includes(query.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = !category || article.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [query, category]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function handlePageChange(next: number) {
    setPage(next);
  }

  return (
    <section className="py-20">
      <Container>
        <SectionHeading eyebrow="Berita" title="Kabar dan Informasi Terbaru" />
        <div className="mt-10 grid gap-4 sm:grid-cols-[2fr_1fr]">
          <Input
            id="news-search"
            placeholder="Cari berita..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            aria-label="Cari berita"
          />
          <Select
            placeholder="Semua Kategori"
            options={categoryOptions}
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(1);
            }}
            aria-label="Filter kategori berita"
          />
        </div>
        <div className="mt-10">
          <NewsGrid articles={paged} />
        </div>
        <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />
      </Container>
    </section>
  );
}
