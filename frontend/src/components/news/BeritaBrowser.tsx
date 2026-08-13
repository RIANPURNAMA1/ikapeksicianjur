"use client";

import { useCallback, useEffect, useState } from "react";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Pagination from "@/components/ui/Pagination";
import NewsGrid from "@/components/news/NewsGrid";
import { apiFetch } from "@/lib/api";
import { beritaToNewsArticle, type BeritaCard } from "@/lib/news";
import type { NewsArticle } from "@/types/news";

const PAGE_SIZE = 6;

interface Meta {
  current_page: number;
  last_page: number;
  total: number;
}

export default function BeritaBrowser() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [categories, setCategories] = useState<{ label: string; value: string }[]>([]);
  const [meta, setMeta] = useState<Meta | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
      setPage(1);
    }, 400);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    setPage(1);
  }, [category]);

  const loadBerita = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        per_page: String(PAGE_SIZE),
        page: String(page),
      });
      if (debouncedQuery.trim()) params.set("search", debouncedQuery.trim());
      if (category) params.set("kategori", category);

      const data = await apiFetch<{
        berita: BeritaCard[];
        meta: Meta;
        kategori_list: { kategori: string; total: number }[];
      }>(`/api/berita-publik?${params.toString()}`);

      setArticles(data.berita.map(beritaToNewsArticle));
      setMeta(data.meta);
      setCategories(data.kategori_list.map((k) => ({ label: k.kategori, value: k.kategori })));
      setError("");
    } catch {
      setError("Berita sedang tidak dapat dimuat. Silakan coba lagi nanti.");
    } finally {
      setLoading(false);
    }
  }, [debouncedQuery, category, page]);

  useEffect(() => {
    void loadBerita();
  }, [loadBerita]);

  return (
    <section className="py-20">
      <Container>
        <SectionHeading as="h1" eyebrow="Berita" title="Kabar dan Informasi Terbaru" />
        <div className="mt-10 grid gap-4 sm:grid-cols-[2fr_1fr]">
          <Input
            id="news-search"
            placeholder="Cari berita..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Cari berita"
          />
          <Select
            placeholder="Semua Kategori"
            options={categories}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            aria-label="Filter kategori berita"
          />
        </div>

        <div className="mt-10">
          {error ? (
            <div className="rounded-lg border border-paper-line bg-white px-6 py-12 text-center text-sm text-ink-muted">
              {error}
            </div>
          ) : loading && page === 1 && articles.length === 0 ? (
            <div className="flex justify-center py-16">
              <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
          ) : (
            <NewsGrid articles={articles} />
          )}
        </div>

        {meta && (
          <Pagination page={meta.current_page} totalPages={meta.last_page} onPageChange={setPage} />
        )}
      </Container>
    </section>
  );
}
