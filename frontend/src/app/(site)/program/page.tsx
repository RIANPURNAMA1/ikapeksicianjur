import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ProgramDetail from "@/components/programs/ProgramDetail";
import { programs } from "@/data/programs";
import { breadcrumbJsonLd, buildMetadata, JsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: { absolute: "Program IKAPEKSI Cianjur" },
  description:
    "Program IKAPEKSI Cianjur — pendataan dan pemberdayaan alumni, pembinaan calon pemagang Jepang, pengembangan UMKM binaan, pelatihan keterampilan, dan networking alumni pemagangan kerja.",
  path: "/program",
});

export default function ProgramPage() {
  return (
    <section className="py-20">
      <JsonLd
        data={breadcrumbJsonLd({
          items: [
            { name: "Beranda", path: "/" },
            { name: "Program IKAPEKSI Cianjur", path: "/program" },
          ],
        })}
      />
      <Container>
        <SectionHeading
          as="h1"
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
