import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ActivityGrid from "@/components/activities/ActivityGrid";
import { activities } from "@/data/activities";
import { breadcrumbJsonLd, buildMetadata, JsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: { absolute: "Kegiatan IKAPEKSI Cianjur" },
  description:
    "Kegiatan dan acara IKAPEKSI Cianjur — silaturahmi alumni, pelatihan keterampilan, pembinaan UMKM, bakti sosial, dan program pemberdayaan alumni pemagangan kerja Jepang.",
  path: "/kegiatan",
});

export default function KegiatanPage() {
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
          <ActivityGrid activities={activities} />
        </div>
      </Container>
    </section>
  );
}
