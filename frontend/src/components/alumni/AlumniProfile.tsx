import Image from "next/image";
import Badge from "@/components/ui/Badge";
import { Alumni } from "@/types/alumni";

export default function AlumniProfile({ alumni }: { alumni: Alumni }) {
  return (
    <div className="grid gap-10 md:grid-cols-[300px_1fr]">
      <div className="doc-card relative aspect-square w-full overflow-hidden">
        <Image src={alumni.photo} alt={alumni.name} fill sizes="300px" className="object-cover" />
      </div>
      <div>
        <Badge tone="outline">{alumni.field}</Badge>
        <h1 className="mt-4 text-3xl font-extrabold text-ink">{alumni.name}</h1>
        <p className="mt-1 text-sm font-semibold text-primary">{alumni.program}</p>
        <dl className="mt-6 grid grid-cols-2 gap-4 text-sm sm:grid-cols-3">
          <div>
            <dt className="font-semibold uppercase tracking-wide text-ink-muted text-xs">Tahun</dt>
            <dd className="mt-1 font-medium text-ink">{alumni.year}</dd>
          </div>
          <div>
            <dt className="font-semibold uppercase tracking-wide text-ink-muted text-xs">Kecamatan</dt>
            <dd className="mt-1 font-medium text-ink">{alumni.district}</dd>
          </div>
          <div>
            <dt className="font-semibold uppercase tracking-wide text-ink-muted text-xs">Perusahaan</dt>
            <dd className="mt-1 font-medium text-ink">{alumni.company}</dd>
          </div>
        </dl>
        <p className="mt-6 text-sm leading-relaxed text-ink-soft">{alumni.bio}</p>
      </div>
    </div>
  );
}
