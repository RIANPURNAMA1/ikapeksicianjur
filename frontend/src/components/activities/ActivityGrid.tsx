import { Activity } from "@/types/activity";
import ActivityCard from "./ActivityCard";

export default function ActivityGrid({ activities }: { activities: Activity[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {activities.map((activity) => (
        <ActivityCard key={activity.id} activity={activity} />
      ))}
    </div>
  );
}
