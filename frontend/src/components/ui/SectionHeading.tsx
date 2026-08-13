import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2";
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  as = "h2",
}: SectionHeadingProps) {
  const Heading = as;
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <span className="stamp-label mb-4">{eyebrow}</span>}
      <Heading className="section-heading-underline pb-3 text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
        {title}
      </Heading>
      {description && <p className="mt-5 text-base leading-relaxed text-ink-muted">{description}</p>}
    </div>
  );
}
