import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Galeri",
  description:
    "Galeri foto kegiatan IKAPEKSI DPC Cianjur — dokumentasi acara silaturahmi, pelatihan, dan pemberdayaan alumni pemagangan kerja.",
  path: "/galeri",
});

export default function GaleriPage() {
  return (
    <section className="py-20">
      <Container>
        <SectionHeading
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
