import { SelectHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { SelectOption } from "@/types/common";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  placeholder?: string;
  variant?: "light" | "dark";
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, placeholder, variant = "light", className, id, ...props }, ref) => {
    const dark = variant === "dark";
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={id} className={cn("text-sm font-semibold", dark ? "text-white" : "text-ink")}>
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={id}
          className={cn(
            "btn-focus w-full rounded-md border px-4 py-2.5 text-sm focus:border-primary",
            dark
              ? "border-white/15 bg-white/10 text-white [&>option]:text-ink"
              : "border-paper-line bg-white text-ink",
            className
          )}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
);
Select.displayName = "Select";

export default Select;