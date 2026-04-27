interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`max-w-container mx-auto px-7 max-[720px]:px-5 ${className}`}>
      {children}
    </div>
  );
}
