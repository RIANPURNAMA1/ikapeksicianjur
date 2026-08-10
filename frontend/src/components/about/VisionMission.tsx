import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const missions = [
  "Menghimpun dan mendata seluruh alumni pemagangan kerja se-Kabupaten Cianjur.",
  "Menyediakan pelatihan dan pendampingan bagi calon dan mantan peserta magang.",
  "Membuka akses kerja sama ekonomi dan lapangan kerja bagi alumni.",
  "Berkontribusi aktif dalam kegiatan sosial kemasyarakatan di Cianjur.",
];

export default function VisionMission() {
  return (
    <section className="bg-white py-20">
      <Container className="grid gap-12 md:grid-cols-2">
        <div>
          <SectionHeading eyebrow="Visi" title="Alumni Cianjur yang Mandiri dan Berdaya Saing" />
        </div>
        <div>
          <span className="stamp-label">Misi</span>
          <ul className="mt-5 space-y-3">
            {missions.map((mission, idx) => (
              <li key={mission} className="flex gap-3 text-sm leading-relaxed text-ink-muted">
                <span className="font-bold text-primary">{String(idx + 1).padStart(2, "0")}</span>
                {mission}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
