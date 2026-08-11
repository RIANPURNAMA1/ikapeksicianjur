import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  variant?: "light" | "dark";
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, variant = "light", className, id, ...props }, ref) => {
    const dark = variant === "dark";
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={id} className={cn("text-sm font-semibold", dark ? "text-white" : "text-ink")}>
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            "btn-focus w-full rounded-md border px-4 py-2.5 text-sm placeholder:text-ink-muted focus:border-primary",
            dark
              ? "border-white/15 bg-white/10 text-white placeholder:text-white/40"
              : "border-paper-line bg-white text-ink",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = "Input";

export default Input;