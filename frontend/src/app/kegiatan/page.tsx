import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ActivityGrid from "@/components/activities/ActivityGrid";
import { activities } from "@/data/activities";

export const metadata: Metadata = { title: "Kegiatan" };

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
