import type { Metadata } from "next";
import BeritaBrowser from "@/components/news/BeritaBrowser";
import { breadcrumbJsonLd, buildMetadata, JsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: { absolute: "Berita IKAPEKSI Cianjur" },
  description:
    "Berita dan informasi terbaru IKAPEKSI Cianjur — kabar alumni, pengumuman, kegiatan, dan informasi program pemagangan kerja luar negeri asal Kabupaten Cianjur.",
  path: "/berita",
});

export default function BeritaPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd({
          items: [
            { name: "Beranda", path: "/" },
            { name: "Berita IKAPEKSI Cianjur", path: "/berita" },
          ],
        })}
      />
      <BeritaBrowser />
    </>
  );
}
