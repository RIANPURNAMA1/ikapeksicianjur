import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { SITE } from "@/lib/constants";

export default function OrganizationStory() {
  return (
    <section className="py-20">
      <Container className="max-w-3xl">
        <SectionHeading eyebrow="Sejarah" title="Perjalanan IKAPEKSI Cianjur" />
        <div className="mt-6 space-y-4 text-base leading-relaxed text-ink-muted">
          <p>
            {SITE.name} berawal dari kumpulan kecil alumni pemagangan kerja Jepang yang pulang ke Cianjur pada
            tahun {SITE.foundedYear}. Merasa perlunya wadah untuk saling berbagi pengalaman dan peluang, sekelompok
            alumni memutuskan membentuk organisasi resmi.
          </p>
          <p>
            Dari hanya belasan anggota, IKAPEKSI Cianjur kini telah berkembang menjadi organisasi yang menghimpun
            ratusan alumni dari seluruh kecamatan di Kabupaten Cianjur, dengan berbagai program pemberdayaan yang
            terus bertumbuh setiap tahunnya.
          </p>
        </div>
      </Container>
    </section>
  );
}
