import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const reasons = [
  { title: "Jejaring Terverifikasi", desc: "Direktori alumni resmi lintas kecamatan, memudahkan koordinasi dan kolaborasi." },
  { title: "Jalur Aman & Resmi", desc: "Edukasi dan pendampingan agar calon peserta magang terhindar dari praktik calo." },
  { title: "Pemberdayaan Berkelanjutan", desc: "Pendampingan wirausaha dan job matching bagi alumni yang telah kembali." },
  { title: "Kepedulian Sosial", desc: "Kegiatan bakti sosial rutin untuk masyarakat Cianjur dari alumni untuk alumni." },
];

export default function WhyIkapeksi() {
  return (
    <section className="bg-white py-20">
      <Container>
        <SectionHeading eyebrow="Mengapa IKAPEKSI" title="Alasan Alumni Memilih Bergabung" align="center" className="mx-auto" />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason, idx) => (
            <div key={reason.title} className="doc-card p-6">
              <span className="text-xs font-bold text-primary">{String(idx + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 text-lg font-bold text-ink">{reason.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{reason.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
