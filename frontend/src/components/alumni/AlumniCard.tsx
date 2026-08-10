import Image from "next/image";
import Link from "next/link";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { Alumni } from "@/types/alumni";

export default function AlumniCard({ alumni }: { alumni: Alumni }) {
  return (
    <Link href={`/alumni/${alumni.id}`} className="btn-focus block">
      <Card className="transition-transform duration-200 hover:-translate-y-1">
        <div className="relative aspect-square w-full overflow-hidden">
          <Image
            src={alumni.photo}
            alt={alumni.name}
            fill
            sizes="(min-width: 1024px) 260px, (min-width: 640px) 45vw, 90vw"
            className="object-cover"
          />
        </div>
        <div className="p-5">
          <Badge tone="outline">{alumni.field}</Badge>
          <h3 className="mt-3 text-base font-bold text-ink">{alumni.name}</h3>
          <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-ink-muted">
            {alumni.district} &middot; {alumni.year}
          </p>
        </div>
      </Card>
    </Link>
  );
}
