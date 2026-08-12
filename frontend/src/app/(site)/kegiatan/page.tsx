import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ActivityGrid from "@/components/activities/ActivityGrid";
import { activities } from "@/data/activities";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Kegiatan",
  description:
    "Kegiatan dan acara IKAPEKSI Cianjur — silaturahmi alumni, pelatihan keterampilan, pembinaan UMKM, dan program pemberdayaan alumni pemagangan Jepang.",
  path: "/kegiatan",
});

export default function KegiatanPage() {
  return (
    <section className="py-20">
      <Container>
        <SectionHeading
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
