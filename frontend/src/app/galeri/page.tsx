import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import GalleryGrid from "@/components/gallery/GalleryGrid";

export const metadata: Metadata = { title: "Galeri" };

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
