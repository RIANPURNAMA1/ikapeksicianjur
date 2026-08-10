import Image from "next/image";
import Link from "next/link";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { galleryPhotos } from "@/data/gallery";

export default function GalleryPreview() {
  return (
    <section className="py-20">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Galeri" title="Momen Kegiatan Alumni" />
          <Button href="/galeri" variant="outline">
            Lihat Semua Foto
          </Button>
        </div>
        <div className="mt-12 grid grid-cols-3 gap-3 sm:grid-cols-6">
          {galleryPhotos.slice(0, 6).map((photo) => (
            <Link
              key={photo.id}
              href="/galeri"
              className="btn-focus doc-card relative aspect-square overflow-hidden"
            >
              <Image src={photo.image} alt={photo.title} fill sizes="200px" className="object-cover transition-transform duration-300 hover:scale-105" />
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
