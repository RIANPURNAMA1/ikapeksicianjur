import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ContainerSize = "narrow" | "default" | "wide";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: ContainerSize;
}

/*
  Lebar maksimum + margin kiri/kanan standar website:
  - HP     : 16px
  - Tablet : 24px
  - Laptop : 32px, lalu 48px di layar besar
  - Konten dibatasi 1280px dan otomatis di tengah
*/
const sizeStyles: Record<ContainerSize, string> = {
  narrow: "max-w-4xl",
  default: "max-w-7xl",
  wide: "max-w-[1400px]",
};

export default function Container({
  children,
  className,
  size = "default",
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-12",
        sizeStyles[size],
        className
      )}
    >
      {children}
    </div>
  );
}