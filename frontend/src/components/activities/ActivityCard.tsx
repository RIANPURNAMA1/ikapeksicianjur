import Image from "next/image";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { Activity } from "@/types/activity";
import { formatDate } from "@/lib/utils";

export default function ActivityCard({ activity }: { activity: Activity }) {
  return (
    <Card className="transition-transform duration-200 hover:-translate-y-1">
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image src={activity.image} alt={activity.title} fill sizes="(min-width: 1024px) 380px, 90vw" className="object-cover" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-3">
          <Badge tone="outline">{activity.category}</Badge>
          <span className="text-xs font-medium text-ink-muted">{formatDate(activity.date)}</span>
        </div>
        <h3 className="mt-3 text-base font-bold leading-snug text-ink">{activity.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">{activity.description}</p>
        <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-primary">
          {activity.location} &middot; {activity.participants} peserta
        </p>
      </div>
    </Card>
  );
}
