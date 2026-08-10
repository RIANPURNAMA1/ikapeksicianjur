import { SelectHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { SelectOption } from "@/types/common";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, placeholder, className, id, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={id} className="text-sm font-semibold text-ink">
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={id}
          className={cn(
            "btn-focus w-full rounded-md border border-paper-line bg-white px-4 py-2.5 text-sm text-ink focus:border-primary",
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
