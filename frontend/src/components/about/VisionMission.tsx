import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const missions = [
  {
    title: "Menghimpun",
    desc: "Menyatukan alumni, praktisi Jepang di Cianjur dalam satu rumah yang aktif.",
  },
  {
    title: "Membuka Jalan",
    desc: "Membuka akses warga Cianjur menuju program magang dan kerja ke Jepang lewat sosialisasi dan pendampingan.",
  },
  {
    title: "Menumbuhkan Usaha",
    desc: "Mendorong usaha alumni naik kelas lewat program ekonomi dan jejaring bisnis antaranggota.",
  },
  {
    title: "Bermitra untuk Cianjur",
    desc: "Bersinergi dengan Pemkab, Disnaker, dan dunia usaha untuk memajukan tenaga kerja dan ekonomi daerah.",
  },
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
              <li key={mission.title} className="flex gap-3 text-sm leading-relaxed text-ink-muted">
                <span className="font-bold text-primary">{String(idx + 1).padStart(2, "0")}</span>
                <span>
                  <span className="font-semibold text-ink">{mission.title}</span> — {mission.desc}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
