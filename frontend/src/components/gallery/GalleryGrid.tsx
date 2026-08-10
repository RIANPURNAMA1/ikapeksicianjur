"use client";

import { useState } from "react";
import { galleryPhotos } from "@/data/gallery";
import GalleryCard from "./GalleryCard";
import GalleryLightbox from "./GalleryLightbox";

export default function GalleryGrid() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {galleryPhotos.map((photo, idx) => (
          <GalleryCard key={photo.id} photo={photo} onClick={() => setActiveIndex(idx)} />
        ))}
      </div>
      <GalleryLightbox
        photos={galleryPhotos}
        activeIndex={activeIndex}
        onClose={() => setActiveIndex(null)}
        onNavigate={setActiveIndex}
      />
    </>
  );
}
