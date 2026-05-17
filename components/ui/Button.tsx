import Link from 'next/link';
import { cn } from '@/lib/cn';

type Props = {
  children: React.ReactNode;
  href?: string;
  variant?: 'primary' | 'ghost';
  className?: string;
  arrow?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit';
};

export default function Button({
  children,
  href,
  variant = 'primary',
  className,
  arrow = true,
  onClick,
  type = 'button',
}: Props) {
  const base =
    'group inline-flex items-center gap-2.5 px-5 py-3.5 rounded-full font-bold text-[13px] tracking-[.15em] uppercase whitespace-nowrap transition-all duration-200 will-change-transform';
  const variants = {
    primary:
      'text-white bg-grad shadow-[0_10px_30px_rgba(0,102,255,.25)] hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(168,85,247,.45)]',
    ghost:
      'text-white border border-line-bright bg-white/[.02] hover:border-violet/60 hover:bg-violet/[.08]',
  };

  const inner = (
    <>
      {children}
      {arrow && (
        <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
          →
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={cn(base, variants[variant], className)}>
        {inner}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={cn(base, variants[variant], className)}>
      {inner}
    </button>
  );
}
