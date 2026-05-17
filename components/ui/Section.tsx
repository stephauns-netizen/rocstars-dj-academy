import { cn } from '@/lib/cn';

export default function Section({
  children,
  id,
  className,
  style,
}: {
  children: React.ReactNode;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <section
      id={id}
      style={style}
      className={cn('relative py-24 md:py-[120px]', className)}
    >
      {children}
    </section>
  );
}
