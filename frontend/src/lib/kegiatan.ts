import { resolveAssetUrl } from "@/lib/api";

export interface KegiatanCard {
  id: number;
  slug: string;
  judul: string;
  deskripsi: string;
  excerpt: string | null;
  gambar: string | null;
  lokasi: string | null;
  status?: "draft" | "terbit";
  tanggal: string | null;
  tanggal_iso: string | null;
  created_at?: string | null;
}

export function kegiatanImage(item: KegiatanCard): string {
  if (item.gambar) return resolveAssetUrl(item.gambar);
  return `https://picsum.photos/seed/kegiatan-${item.slug || item.id}/800/600`;
}

export function kegiatanExcerpt(item: KegiatanCard): string {
  return item.excerpt?.trim() || "Kegiatan IKAPEKSI Kabupaten Cianjur.";
}

const LEGACY_SLUGS: Record<string, string> = {
  "seleksi-magang-im-japan-kbb": "seleksi-magang-im-japan-kabupaten-bandung-barat",
  "rapat-kerja-daerah-ikapeksi-jabar": "rapat-kerja-daerah-ikapeksi-jawa-barat",
  "audiensi-disnakertrans-cianjur": "audiensi-bersama-disnakertrans-kabupaten-cianjur",
};

/**
 * Dipakai sebagai cadangan bila API belum dapat diakses, agar halaman tetap
 * tampil. Data utama tetap berasal dari database melalui admin.
 */
export const FALLBACK_KEGIATAN: KegiatanCard[] = [
  {
    id: -1,
    slug: "seleksi-magang-im-japan-kabupaten-bandung-barat",
    judul: "Seleksi Magang IM Japan Kabupaten Bandung Barat",
    deskripsi:
      "<p>Pengurus IKAPEKSI Cianjur ikut serta menjadi bagian panitia seleksi nasional IM Japan yang diselenggarakan oleh Disnaker Kabupaten Bandung Barat.</p>",
    excerpt:
      "Pengurus IKAPEKSI Cianjur ikut serta menjadi bagian panitia seleksi nasional IM Japan yang diselenggarakan oleh Disnaker Kabupaten Bandung Barat.",
    gambar: "https://picsum.photos/seed/kegiatan-seleksi/800/600",
    lokasi: "Kabupaten Bandung Barat",
    tanggal: null,
    tanggal_iso: null,
  },
  {
    id: -2,
    slug: "rapat-kerja-daerah-ikapeksi-jawa-barat",
    judul: "Rapat Kerja Daerah IKAPEKSI Jawa Barat",
    deskripsi:
      "<p>Pertemuan Rapat Kerja Daerah bersama DPD IKAPEKSI Jawa Barat untuk mengembangkan program kerja strategis dan potensi di Kabupaten Cianjur.</p>",
    excerpt:
      "Pertemuan Rapat Kerja Daerah bersama DPD IKAPEKSI Jawa Barat untuk mengembangkan program kerja strategis dan potensi di Kabupaten Cianjur.",
    gambar: "https://picsum.photos/seed/kegiatan-raker/800/600",
    lokasi: "Jawa Barat",
    tanggal: null,
    tanggal_iso: null,
  },
  {
    id: -3,
    slug: "audiensi-bersama-disnakertrans-kabupaten-cianjur",
    judul: "Audiensi bersama Disnakertrans Kabupaten Cianjur",
    deskripsi:
      "<p>Silaturahmi dan memperkenalkan DPC IKAPEKSI Kabupaten Cianjur sekaligus penyampaian program kerja.</p>",
    excerpt:
      "Silaturahmi dan memperkenalkan DPC IKAPEKSI Kabupaten Cianjur sekaligus penyampaian program kerja.",
    gambar: "https://picsum.photos/seed/kegiatan-audiensi/800/600",
    lokasi: "Kabupaten Cianjur",
    tanggal: null,
    tanggal_iso: null,
  },
];

/**
 * Cari data cadangan berdasarkan slug. Dipakai agar halaman detail tetap bisa
 * dibuka walau API sedang tidak dapat diakses.
 */
export function findFallbackKegiatan(slug: string): KegiatanCard | undefined {
  const normalized = LEGACY_SLUGS[slug] ?? slug;
  return FALLBACK_KEGIATAN.find((item) => item.slug === normalized);
}
