import type { Metadata } from "next";
import BeritaBrowser from "@/components/news/BeritaBrowser";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Berita",
  description:
    "Berita dan informasi terbaru IKAPEKSI DPC Cianjur — kabar alumni, pengumuman, kegiatan, dan informasi program pemagangan kerja.",
  path: "/berita",
});

export default function BeritaPage() {
  return <BeritaBrowser />;
}
