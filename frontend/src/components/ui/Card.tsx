import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "article";
}

export default function Card({ children, className, as = "div" }: CardProps) {
  const Comp = as;
  return <Comp className={cn("doc-card flex flex-col overflow-hidden", className)}>{children}</Comp>;
}
