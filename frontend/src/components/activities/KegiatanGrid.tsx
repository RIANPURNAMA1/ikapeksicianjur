import Image from "next/image";
import Link from "next/link";
import { kegiatanExcerpt, kegiatanImage, type KegiatanCard } from "@/lib/kegiatan";

export default function KegiatanGrid({ items }: { items: KegiatanCard[] }) {
  if (items.length === 0) {
    return (
      <div className="doc-card px-6 py-16 text-center">
        <p className="text-sm font-semibold text-ink-muted">
          Belum ada kegiatan yang dipublikasikan.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <Link
          key={item.id}
          href={`/kegiatan/${item.slug}`}
          className="doc-card group flex flex-col overflow-hidden transition-transform duration-200 hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          aria-label={`Lihat detail: ${item.judul}`}
        >
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-paper-warm">
            <Image
              src={kegiatanImage(item)}
              alt={item.judul}
              fill
              sizes="(min-width: 1024px) 380px, 90vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            />
          </div>
          <div className="flex flex-1 flex-col p-5">
            {(item.tanggal || item.lokasi) && (
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
                {[item.tanggal, item.lokasi].filter(Boolean).join(" · ")}
              </p>
            )}
            <h3 className="mt-3 text-base font-bold leading-snug text-ink">{item.judul}</h3>
            <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink-muted">
              {kegiatanExcerpt(item)}
            </p>
            <span className="mt-auto pt-4 text-xs font-bold uppercase tracking-wide text-primary">
              Lihat Detail
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
