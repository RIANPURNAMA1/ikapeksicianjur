import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ label, className, id, ...props }, ref) => {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-semibold text-ink">
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={id}
        className={cn(
          "btn-focus w-full rounded-md border border-paper-line bg-white px-4 py-2.5 text-sm text-ink placeholder:text-ink-muted focus:border-primary",
          className
        )}
        {...props}
      />
    </div>
  );
});
Input.displayName = "Input";

export default Input;
