import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const values = [
  { title: "Kekeluargaan", desc: "Menjaga hubungan erat antar-alumni layaknya keluarga besar." },
  { title: "Integritas", desc: "Menjunjung kejujuran dalam setiap kegiatan dan informasi yang disampaikan." },
  { title: "Pemberdayaan", desc: "Mendorong setiap alumni untuk terus berkembang dan mandiri." },
  { title: "Kepedulian", desc: "Aktif memberi manfaat bagi masyarakat sekitar di Cianjur." },
];

export default function OrganizationValues() {
  return (
    <section className="py-20">
      <Container>
        <SectionHeading eyebrow="Nilai Organisasi" title="Nilai yang Kami Pegang" align="center" className="mx-auto" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => (
            <div key={value.title} className="doc-card p-6 text-center">
              <h3 className="text-lg font-bold text-ink">{value.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{value.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
