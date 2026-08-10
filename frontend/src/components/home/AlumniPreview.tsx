import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import AlumniGrid from "@/components/alumni/AlumniGrid";
import { alumniList } from "@/data/alumni";

export default function AlumniPreview() {
  return (
    <section className="bg-white py-20">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Direktori Alumni" title="Wajah-Wajah Alumni Cianjur" />
          <Button href="/alumni" variant="outline">
            Jelajahi Direktori
          </Button>
        </div>
        <div className="mt-12">
          <AlumniGrid alumni={alumniList.slice(0, 8)} />
        </div>
      </Container>
    </section>
  );
}
