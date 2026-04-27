import { type ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "accent" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
}

const variants = {
  primary:   "bg-navy text-white hover:bg-navy-90 active:bg-navy-80",
  secondary: "border border-navy text-navy hover:bg-navy hover:text-white",
  accent:    "bg-sky text-white hover:bg-sky/90",
  ghost:     "text-navy hover:text-sky",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export function Button({ variant = "primary", size = "md", icon, children, className = "", ...props }: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 font-semibold rounded-sm transition-all duration-[250ms] ease-brand-out ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
      {icon && <span className="w-4 h-4">{icon}</span>}
    </button>
  );
}
