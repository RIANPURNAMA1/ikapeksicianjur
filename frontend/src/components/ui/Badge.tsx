import { cn } from "@/lib/utils";

interface BadgeProps {
  children: string;
  tone?: "primary" | "ink" | "outline";
  className?: string;
}

const toneStyles = {
  primary: "bg-primary text-white",
  ink: "bg-ink text-white",
  outline: "border border-primary text-primary bg-white",
};

export default function Badge({ children, tone = "primary", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-block rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider",
        toneStyles[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
