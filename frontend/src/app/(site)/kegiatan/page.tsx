import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import KegiatanGrid from "@/components/activities/KegiatanGrid";
import { apiFetch } from "@/lib/api";
import { FALLBACK_KEGIATAN, type KegiatanCard } from "@/lib/kegiatan";
import { breadcrumbJsonLd, buildMetadata, JsonLd } from "@/lib/seo";

// Konten kegiatan dikelola dari admin, jadi halaman selalu mengambil data terbaru.
export const dynamic = "force-dynamic";

export const metadata: Metadata = buildMetadata({
  title: { absolute: "Kegiatan IKAPEKSI Cianjur" },
  description:
    "Kegiatan dan acara IKAPEKSI Cianjur — silaturahmi alumni, pelatihan keterampilan, pembinaan UMKM, bakti sosial, dan program pemberdayaan alumni pemagangan kerja Jepang.",
  path: "/kegiatan",
});

export default async function KegiatanPage() {
  let items: KegiatanCard[] = FALLBACK_KEGIATAN;

  try {
    const data = await apiFetch<{ kegiatan: KegiatanCard[] }>(
      "/api/kegiatan-publik?per_page=50"
    );
    items = data.kegiatan;
  } catch {
    // Tampilkan data cadangan bila API belum dapat diakses.
  }

  return (
    <section className="py-20">
      <JsonLd
        data={breadcrumbJsonLd({
          items: [
            { name: "Beranda", path: "/" },
            { name: "Kegiatan IKAPEKSI Cianjur", path: "/kegiatan" },
          ],
        })}
      />
      <Container>
        <SectionHeading
          as="h1"
          eyebrow="Kegiatan"
          title="Seluruh Kegiatan IKAPEKSI Cianjur"
          description="Rangkaian kegiatan sosial, pelatihan, dan silaturahmi yang telah dan akan diselenggarakan."
        />
        <div className="mt-12">
          <KegiatanGrid items={items} />
        </div>
      </Container>
    </section>
  );
}
