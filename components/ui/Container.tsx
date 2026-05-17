import { cn } from '@/lib/cn';

export default function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('max-w-container mx-auto px-6', className)}>{children}</div>
  );
}
