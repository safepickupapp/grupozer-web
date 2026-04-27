interface WordmarkProps {
  size?: "sm" | "md" | "lg" | "xl";
  reverse?: boolean;
  className?: string;
}

const sizeMap = { sm: "text-lg", md: "text-[22px]", lg: "text-[28px]", xl: "text-[40px]" };

export function Wordmark({ size = "lg", reverse = false, className = "" }: WordmarkProps) {
  return (
    <span className={`inline-flex tracking-[-0.02em] leading-none ${sizeMap[size]} ${className}`}>
      <span className={`font-extralight ${reverse ? "text-white/[0.78]" : "text-gray"}`}>
        grupo
      </span>
      <span className={`font-extrabold ${reverse ? "text-white" : "text-navy"}`}>
        zer
      </span>
    </span>
  );
}
