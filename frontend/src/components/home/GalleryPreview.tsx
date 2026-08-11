import Image from "next/image";
import Link from "next/link";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import { galleryPhotos } from "@/data/gallery";

export default function GalleryPreview() {
  return (
    <section className="py-20">
      <Container>
        
        {/* Header Section: Judul di kiri, Tombol di kanan */}
        <div className="flex flex-wrap items-end justify-between gap-6">
          
          {/* Bagian Judul: Dibuat vertikal menurun (flex-col) */}
          <div className="flex flex-col gap-3">
            <span className="text-sm font-bold uppercase tracking-wider text-primary">
              Galeri
            </span>
            <h2 className="text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
              Momen Kegiatan Alumni
            </h2>
          </div>

        
          
        </div>

        {/* Content Section: Grid Foto Galeri */}
        <div className="mt-12 grid grid-cols-3 gap-3 sm:grid-cols-6">
          {galleryPhotos.slice(0, 6).map((photo) => (
            <Link
              key={photo.id}
              href="/galeri"
              className="btn-focus doc-card group relative aspect-square overflow-hidden rounded-xl"
            >
              <Image 
                src={photo.image} 
                alt={photo.title} 
                fill 
                sizes="(min-width: 640px) 16vw, 33vw" 
                className="object-cover transition-transform duration-500 group-hover:scale-110" 
              />
            </Link>
          ))}
        </div>
        
      </Container>
    </section>
  );
}