import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";

export default function VisionMissionPreview() {
  return (
    <section className="bg-ink py-20 text-white">
      <Container className="grid gap-10 md:grid-cols-2">
        <div>
          <SectionHeading eyebrow="Visi" title="Alumni Cianjur yang Mandiri dan Berdaya Saing" className="[&_h2]:text-white" />
        </div>
        <div>
          <span className="stamp-label border-white/30 bg-white/10 text-white">Misi</span>
          <ul className="mt-5 space-y-3 text-sm leading-relaxed text-white/70">
            <li>1. Menghimpun dan mendata seluruh alumni pemagangan kerja se-Kabupaten Cianjur.</li>
            <li>2. Menyediakan pelatihan dan pendampingan bagi calon dan mantan peserta magang.</li>
            <li>3. Membuka akses kerja sama ekonomi dan lapangan kerja bagi alumni.</li>
            <li>4. Berkontribusi aktif dalam kegiatan sosial kemasyarakatan di Cianjur.</li>
          </ul>
        </div>
      </Container>
    </section>
  );
}
