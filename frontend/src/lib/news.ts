import { resolveAssetUrl } from "@/lib/api";
import type { NewsArticle } from "@/types/news";

export interface BeritaCard {
  id: number;
  slug: string;
  judul: string;
  kategori: string | null;
  isi: string;
  excerpt: string | null;
  gambar: string | null;
  tanggal: string;
  tanggal_iso: string;
}

export function beritaToNewsArticle(b: BeritaCard): NewsArticle {
  return {
    id: b.id,
    slug: b.slug,
    title: b.judul,
    excerpt: b.excerpt || b.judul,
    content: [b.isi],
    category: b.kategori ?? "Umum",
    author: "IKAPEKSI Cianjur",
    date: b.tanggal_iso,
    image: b.gambar ? resolveAssetUrl(b.gambar) : `https://picsum.photos/seed/ikapeksi-news-${b.id}/900/600`,
  };
}
