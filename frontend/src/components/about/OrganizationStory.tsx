import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { SITE } from "@/lib/constants";

const milestones = [
  {
    value: String(SITE.foundedYear),
    label: "Tahun Berdiri",
    desc: "Berawal dari kumpulan kecil alumni Jepang yang pulang ke Cianjur.",
  },
  {
    value: "Belasan",
    label: "Anggota Awal",
    desc: "Sekelompok alumni yang bertekad saling berbagi pengalaman dan peluang.",
  },
  {
    value: "Ratusan",
    label: "Alumni Tergabung",
    desc: "Dari seluruh kecamatan di Kabupaten Cianjur dan terus bertumbuh.",
  },
];

export default function OrganizationStory() {
  return (
    <section className="bg-paper-warm py-20">
      <Container className="max-w-4xl">
        <SectionHeading eyebrow="Sejarah" title="Perjalanan IKAPEKSI Cianjur" />

        <div className="mt-8 grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-start">
          <div className="space-y-5 text-base leading-relaxed text-ink-muted">
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

          <div className="space-y-4">
            {milestones.map((m, idx) => (
              <div key={m.label} className="doc-card flex items-start gap-4 p-5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary-tint text-base font-extrabold text-primary">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="text-2xl font-extrabold leading-none text-ink">{m.value}</p>
                  <p className="mt-1 text-xs font-bold uppercase tracking-wide text-primary">{m.label}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

