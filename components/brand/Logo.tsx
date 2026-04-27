import Link from "next/link";
import { Wordmark } from "./Wordmark";
import { Isotype } from "./Isotype";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  reverse?: boolean;
  locale?: string;
  className?: string;
}

const isoSizeMap = { sm: 32, md: 36, lg: 40 };

export function Logo({ size = "lg", reverse = false, locale = "es", className = "" }: LogoProps) {
  return (
    <Link href={`/${locale}`} className={`inline-flex items-center gap-3 ${className}`}>
      <Isotype size={isoSizeMap[size]} variant={reverse ? "mono" : "full"} color={reverse ? "#fff" : undefined} />
      <Wordmark size={size} reverse={reverse} />
    </Link>
  );
}
