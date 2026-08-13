import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import { breadcrumbJsonLd, buildMetadata, JsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: { absolute: "Galeri IKAPEKSI Cianjur" },
  description:
    "Galeri foto kegiatan IKAPEKSI Cianjur — dokumentasi acara silaturahmi, pelatihan, dan pemberdayaan alumni pemagangan kerja asal Kabupaten Cianjur.",
  path: "/galeri",
});

export default function GaleriPage() {
  return (
    <section className="py-20">
      <JsonLd
        data={breadcrumbJsonLd({
          items: [
            { name: "Beranda", path: "/" },
            { name: "Galeri IKAPEKSI Cianjur", path: "/galeri" },
          ],
        })}
      />
      <Container>
        <SectionHeading
          as="h1"
          eyebrow="Galeri"
          title="Dokumentasi Kegiatan Alumni"
          description="Klik salah satu foto untuk melihat tampilan penuh."
        />
        <div className="mt-12">
          <GalleryGrid />
        </div>
      </Container>
    </section>
  );
}
