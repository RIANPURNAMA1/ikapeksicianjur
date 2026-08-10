import { Program } from "@/types/program";
import ProgramCard from "./ProgramCard";

export default function ProgramGrid({ programs }: { programs: Program[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {programs.map((program) => (
        <ProgramCard key={program.id} program={program} />
      ))}
    </div>
  );
}
