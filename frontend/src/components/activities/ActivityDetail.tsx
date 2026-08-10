import Image from "next/image";
import Badge from "@/components/ui/Badge";
import { Activity } from "@/types/activity";
import { formatDate } from "@/lib/utils";

export default function ActivityDetail({ activity }: { activity: Activity }) {
  return (
    <div className="doc-card overflow-hidden">
      <div className="relative aspect-[16/9] w-full">
        <Image src={activity.image} alt={activity.title} fill sizes="(min-width: 1024px) 700px, 100vw" className="object-cover" />
      </div>
      <div className="p-8">
        <Badge tone="outline">{activity.category}</Badge>
        <h3 className="mt-4 text-xl font-extrabold text-ink">{activity.title}</h3>
        <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-ink-muted">
          {formatDate(activity.date)} &middot; {activity.location}
        </p>
        <p className="mt-4 text-sm leading-relaxed text-ink-muted">{activity.longDescription}</p>
      </div>
    </div>
  );
}
