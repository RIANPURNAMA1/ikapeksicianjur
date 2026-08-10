import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import ActivityGrid from "@/components/activities/ActivityGrid";
import { activities } from "@/data/activities";

export default function ActivityPreview() {
  return (
    <section className="py-20">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Kegiatan" title="Kegiatan Terbaru Kami" />
          <Button href="/kegiatan" variant="outline">
            Semua Kegiatan
          </Button>
        </div>
        <div className="mt-12">
          <ActivityGrid activities={activities.slice(0, 3)} />
        </div>
      </Container>
    </section>
  );
}
