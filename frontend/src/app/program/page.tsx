import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ProgramDetail from "@/components/programs/ProgramDetail";
import { programs } from "@/data/programs";

export const metadata: Metadata = { title: "Program" };

export default function ProgramPage() {
  return (
    <section className="py-20">
      <Container>
        <SectionHeading
          eyebrow="Program Kami"
          title="Seluruh Program IKAPEKSI Cianjur"
          description="Delapan program utama yang kami jalankan untuk memberdayakan alumni dan masyarakat Cianjur."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {programs.map((program) => (
            <ProgramDetail key={program.id} program={program} />
          ))}
        </div>
      </Container>
    </section>
  );
}
