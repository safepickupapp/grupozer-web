import { forwardRef, type TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = "", ...props }, ref) => (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold uppercase tracking-wider text-gray">
        {label}
      </label>
      <textarea
        ref={ref}
        className={`border-[1.5px] border-gray-20 rounded-sm px-4 py-3.5 text-base text-ink placeholder:text-gray-60 focus:border-sky focus:ring-[4px] focus:ring-sky/15 outline-none transition-all min-h-[140px] resize-y ${error ? "border-red-400" : ""} ${className}`}
        {...props}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
);
Textarea.displayName = "Textarea";
