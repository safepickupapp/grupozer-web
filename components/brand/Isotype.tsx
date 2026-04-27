interface IsotypeProps {
  variant?: "full" | "mono";
  color?: string;
  size?: number;
  className?: string;
}

export function Isotype({ variant = "full", color, size = 40, className = "" }: IsotypeProps) {
  if (size < 32) return null; // brand minimum

  // TODO: Replace with official SVG from founders
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      className={className}
      aria-hidden="true"
    >
      <rect
        width="40"
        height="40"
        rx="8"
        fill={variant === "mono" ? (color ?? "currentColor") : "#00205C"}
      />
      <text
        x="50%"
        y="54%"
        dominantBaseline="middle"
        textAnchor="middle"
        fill={variant === "mono" ? "#fff" : "#4197CB"}
        fontFamily="Manrope, sans-serif"
        fontWeight="800"
        fontSize="22"
      >
        Z
      </text>
    </svg>
  );
}
