"use client";

import Image from "next/image";
import Modal from "@/components/ui/Modal";
import { GalleryPhoto } from "@/types/gallery";
import { formatDate } from "@/lib/utils";

interface GalleryLightboxProps {
  photos: GalleryPhoto[];
  activeIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function GalleryLightbox({ photos, activeIndex, onClose, onNavigate }: GalleryLightboxProps) {
  const open = activeIndex !== null;
  const photo = activeIndex !== null ? photos[activeIndex] : null;

  return (
    <Modal open={open} onClose={onClose} ariaLabel="Galeri foto">
      {photo && (
        <div className="doc-card overflow-hidden bg-white">
          <div className="relative aspect-[4/3] w-full">
            <Image src={photo.image} alt={photo.title} fill sizes="700px" className="object-cover" />
          </div>
          <div className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm font-bold text-ink">{photo.title}</p>
              <p className="text-xs font-medium text-ink-muted">
                {photo.category} &middot; {formatDate(photo.date)}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => activeIndex !== null && onNavigate((activeIndex - 1 + photos.length) % photos.length)}
                className="btn-focus rounded-md border border-paper-line px-3 py-2 text-sm font-bold text-ink hover:bg-primary-tint"
                aria-label="Foto sebelumnya"
              >
                &larr;
              </button>
              <button
                onClick={() => activeIndex !== null && onNavigate((activeIndex + 1) % photos.length)}
                className="btn-focus rounded-md border border-paper-line px-3 py-2 text-sm font-bold text-ink hover:bg-primary-tint"
                aria-label="Foto berikutnya"
              >
                &rarr;
              </button>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}
