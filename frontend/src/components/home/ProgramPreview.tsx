import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import ProgramGrid from "@/components/programs/ProgramGrid";
import { programs } from "@/data/programs";

export default function ProgramPreview() {
  return (
    <section className="py-20">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Program Kami" title="Program Unggulan IKAPEKSI Cianjur" />
          <Button href="/program" variant="outline">
            Lihat Semua Program
          </Button>
        </div>
        <div className="mt-12">
          <ProgramGrid programs={programs.slice(0, 3)} />
        </div>
      </Container>
    </section>
  );
}
