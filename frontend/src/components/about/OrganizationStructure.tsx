import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const structure = [
  { role: "Ketua Umum", name: "Ahmad Fauzi" },
  { role: "Wakil Ketua", name: "Deden Supriatna" },
  { role: "Sekretaris", name: "Neng Sri Wahyuni" },
  { role: "Bendahara", name: "Lilis Suryani" },
  { role: "Divisi Pelatihan", name: "Rina Marlina" },
  { role: "Divisi Kemitraan", name: "Rudi Hartono" },
];

export default function OrganizationStructure() {
  return (
    <section className="bg-white py-20">
      <Container>
        <SectionHeading eyebrow="Struktur Organisasi" title="Pengurus IKAPEKSI Cianjur" align="center" className="mx-auto" />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {structure.map((person) => (
            <div key={person.role} className="doc-card flex items-center gap-4 p-5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-tint text-sm font-bold text-primary">
                {person.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
              </span>
              <div>
                <p className="text-sm font-bold text-ink">{person.name}</p>
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{person.role}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
