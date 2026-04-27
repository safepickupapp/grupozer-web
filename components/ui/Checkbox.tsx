import { forwardRef, type InputHTMLAttributes } from "react";

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: React.ReactNode;
  error?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, className = "", ...props }, ref) => (
    <div className="flex flex-col gap-1">
      <label className={`flex items-start gap-3 cursor-pointer ${className}`}>
        <input
          ref={ref}
          type="checkbox"
          className="mt-1 w-[18px] h-[18px] accent-navy rounded-sm border-gray-20"
          {...props}
        />
        <span className="text-sm text-gray leading-relaxed">{label}</span>
      </label>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
);
Checkbox.displayName = "Checkbox";
