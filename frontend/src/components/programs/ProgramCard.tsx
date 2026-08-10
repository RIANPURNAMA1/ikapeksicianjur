import Link from "next/link";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import { Program } from "@/types/program";

export default function ProgramCard({ program }: { program: Program }) {
  return (
    <Card className="p-6 transition-transform duration-200 hover:-translate-y-1">
      <Badge tone="outline">{program.category}</Badge>
      <h3 className="mt-4 text-lg font-bold text-ink">{program.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-muted">{program.description}</p>
      <Link
        href={`/program#${program.slug}`}
        className="btn-focus mt-4 inline-block text-sm font-bold uppercase tracking-wide text-primary hover:text-primary-dark"
      >
        Detail Program &rarr;
      </Link>
    </Card>
  );
}
