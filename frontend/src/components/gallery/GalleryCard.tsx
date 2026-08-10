import Image from "next/image";
import Badge from "@/components/ui/Badge";
import { GalleryPhoto } from "@/types/gallery";

interface GalleryCardProps {
  photo: GalleryPhoto;
  onClick: () => void;
}

export default function GalleryCard({ photo, onClick }: GalleryCardProps) {
  return (
    <button
      onClick={onClick}
      className="btn-focus doc-card group relative aspect-square w-full overflow-hidden text-left"
      aria-label={`Lihat foto ${photo.title}`}
    >
      <Image
        src={photo.image}
        alt={photo.title}
        fill
        sizes="(min-width: 1024px) 23vw, 45vw"
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 via-black/0 to-black/0 p-4 opacity-0 transition-opacity group-hover:opacity-100">
        <Badge tone="primary" className="w-fit">
          {photo.category}
        </Badge>
        <p className="mt-2 text-sm font-semibold text-white">{photo.title}</p>
      </div>
    </button>
  );
}
