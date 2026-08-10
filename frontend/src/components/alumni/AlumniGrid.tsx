import { Alumni } from "@/types/alumni";
import AlumniCard from "./AlumniCard";

export default function AlumniGrid({ alumni }: { alumni: Alumni[] }) {
  if (alumni.length === 0) {
    return (
      <div className="py-16 text-center text-ink-muted">
        <p className="text-sm">Tidak ada alumni yang cocok dengan pencarian atau filter Anda.</p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
      {alumni.map((item) => (
        <AlumniCard key={item.id} alumni={item} />
      ))}
    </div>
  );
}
