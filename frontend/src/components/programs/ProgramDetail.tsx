import Badge from "@/components/ui/Badge";
import { Program } from "@/types/program";

export default function ProgramDetail({ program }: { program: Program }) {
  return (
    <div id={program.slug} className="doc-card scroll-mt-28 p-8">
      <div className="flex flex-wrap items-center gap-3">
        <Badge>{program.category}</Badge>
        <span className="text-xs font-semibold uppercase tracking-wider text-ink-muted">{program.duration}</span>
      </div>
      <h3 className="mt-4 text-2xl font-extrabold text-ink">{program.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-ink-muted">{program.longDescription}</p>
      <p className="mt-4 text-xs font-bold uppercase tracking-wider text-primary">Lokasi: {program.location}</p>
      <ul className="mt-4 space-y-2">
        {program.benefits.map((benefit) => (
          <li key={benefit} className="flex items-start gap-2 text-sm text-ink-soft">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            {benefit}
          </li>
        ))}
      </ul>
    </div>
  );
}
