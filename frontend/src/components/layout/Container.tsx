import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export default function Container({
  children,
  className,
  size = "default",
}: {
  children: ReactNode;
  className?: string;
  size?: "default" | "wide";
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 sm:px-8",
        size === "wide"
          ? "max-w-[1600px] lg:px-12"
          : "max-w-7xl",
        className
      )}
    >
      {children}
    </div>
  );
}
