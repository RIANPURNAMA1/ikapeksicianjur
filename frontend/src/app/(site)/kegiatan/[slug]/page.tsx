import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/layout/Container";
import { apiFetch, ApiError } from "@/lib/api";
import {
  FALLBACK_KEGIATAN,
  findFallbackKegiatan,
  kegiatanExcerpt,
  kegiatanImage,
  type KegiatanCard,
} from "@/lib/kegiatan";
import { breadcrumbJsonLd, buildMetadata, JsonLd } from "@/lib/seo";

async function getKegiatan(slug: string): Promise<KegiatanCard | null> {
  try {
    const data = await apiFetch<{ kegiatan: KegiatanCard }>(
      `/api/kegiatan-publik/${slug}`
    );
    return data.kegiatan;
  } catch (err) {
    // Data yang memang tidak ada tetap 404; jika API sedang down, pakai cadangan.
    if (err instanceof ApiError && err.status === 404) return null;
    return findFallbackKegiatan(slug) ?? null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const kegiatan = await getKegiatan(slug);
  if (!kegiatan) {
    return buildMetadata({ title: "Kegiatan", path: "/kegiatan" });
  }

  return buildMetadata({
    title: kegiatan.judul,
    description: kegiatanExcerpt(kegiatan),
    path: `/kegiatan/${kegiatan.slug}`,
    image: kegiatanImage(kegiatan),
    type: "article",
    publishedTime: kegiatan.tanggal_iso ?? undefined,
  });
}

export default async function KegiatanDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const kegiatan = await getKegiatan(slug);
  if (!kegiatan) {
    notFound();
  }

  let related: KegiatanCard[] = [];
  try {
    const list = await apiFetch<{ kegiatan: KegiatanCard[] }>(
      "/api/kegiatan-publik?per_page=6"
    );
    related = list.kegiatan.filter((item) => item.id !== kegiatan.id).slice(0, 3);
  } catch {
    related = FALLBACK_KEGIATAN.filter((item) => item.slug !== kegiatan.slug).slice(0, 3);
  }

  return (
    <section className="py-20">
      <Container>
        <JsonLd
          data={breadcrumbJsonLd({
            items: [
              { name: "Beranda", path: "/" },
              { name: "Kegiatan", path: "/kegiatan" },
              { name: kegiatan.judul, path: `/kegiatan/${kegiatan.slug}` },
            ],
          })}
        />

        <Link
          href="/#kegiatan"
          className="btn-focus text-sm font-bold uppercase tracking-wide text-primary"
        >
          &larr; Kembali ke Beranda
        </Link>

        <article className="mt-8">
          <h1 className="max-w-3xl text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
            {kegiatan.judul}
          </h1>
          {(kegiatan.tanggal || kegiatan.lokasi) && (
            <p className="mt-3 text-sm font-semibold uppercase tracking-wide text-ink-muted">
              {[kegiatan.tanggal, kegiatan.lokasi].filter(Boolean).join(" · ")}
            </p>
          )}

          <div className="doc-card relative mt-8 aspect-[16/9] w-full overflow-hidden">
            <Image
              src={kegiatanImage(kegiatan)}
              alt={kegiatan.judul}
              fill
              priority
              sizes="(min-width: 1024px) 900px, 100vw"
              className="object-cover"
            />
          </div>

          <div
            className="prose-news mt-8 max-w-2xl text-base leading-relaxed text-ink-soft"
            dangerouslySetInnerHTML={{ __html: kegiatan.deskripsi }}
          />
        </article>

        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="text-xl font-extrabold text-ink">Kegiatan Lainnya</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <Link
                  key={item.id}
                  href={`/kegiatan/${item.slug}`}
                  className="doc-card group flex flex-col overflow-hidden transition-transform duration-200 hover:-translate-y-1"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-paper-warm">
                    <Image
                      src={kegiatanImage(item)}
                      alt={item.judul}
                      fill
                      sizes="(min-width: 1024px) 380px, 90vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    {(item.tanggal || item.lokasi) && (
                      <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
                        {[item.tanggal, item.lokasi].filter(Boolean).join(" · ")}
                      </p>
                    )}
                    <h3 className="mt-2 text-base font-bold leading-snug text-ink">
                      {item.judul}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-muted">
                      {kegiatanExcerpt(item)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
