interface IsotypeProps {
  color?: string;
  size?: number;
  className?: string;
}

export function Isotype({ color, size = 40, className = "" }: IsotypeProps) {
  if (size < 24) return null; // brand minimum

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 456 456"
      className={className}
      style={{ color: color ?? undefined }}
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      <g transform="translate(0,456) scale(0.1,-0.1)" fill="currentColor" stroke="none">
        <path d="M356 4135 c-22 -11 -49 -33 -60 -48 l-21 -28 -5 -752 -5 -752 20 -45 20 -45 34 -22 34 -23 37 0 c52 0 104 24 129 59 l21 29 2 676 3 676 1525 1 1524 1 3 -9 c2 -5 -50 -58 -114 -118 -65 -60 -810 -800 -1655 -1644 l-1538 -1535 -16 -34 -16 -34 7 -35 c13 -71 84 -133 152 -133 l35 0 26 19 c15 11 830 823 1812 1805 l1784 1785 18 39 18 38 -20 45 c-26 58 -39 72 -75 87 l-31 13 -1804 2 -1805 2 -39 -20z" />
        <path d="M3905 2704 c-49 -36 -2177 -2172 -2190 -2198 -27 -53 -7 -116 55 -171 l22 -20 67 0 66 0 1091 1091 1090 1092 13 40 14 41 -17 36 c-20 41 -38 61 -78 88 l-27 17 -43 0 -43 -1 -20 -15z" />
        <path d="M3900 1261 c-40 -27 -720 -715 -741 -750 -31 -52 -17 -111 40 -165 l30 -29 48 -4 c75 -7 74 -8 458 376 l363 362 18 40 18 41 -12 19 c-7 10 -12 25 -12 32 0 17 -35 56 -72 80 l-27 17 -43 -1 -43 0 -25 -18z" />
      </g>
    </svg>
  );
}
