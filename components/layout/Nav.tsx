'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { SITE } from '@/lib/data';
import Button from '@/components/ui/Button';

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/courses', label: 'Courses' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav
        className={[
          'fixed top-0 left-0 right-0 z-[100] flex items-center justify-between',
          'backdrop-blur-xl backdrop-saturate-150 transition-all duration-300',
          scrolled
            ? 'bg-ink/80 border-b border-line py-3 px-5 md:px-8'
            : 'bg-ink/50 py-4 px-5 md:px-8',
        ].join(' ')}
      >
        <Link href="/" className="flex items-center gap-3">
          <Image
            src={SITE.logo}
            alt={SITE.name}
            width={360}
            height={88}
            priority
            className="h-20 md:h-[88px] w-auto logo-blend"
          />
        </Link>

        <div className="hidden lg:flex gap-8 items-center">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[13px] text-text-mute font-medium tracking-wider hover:text-white transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:block">
          <Button href="/enrol">Enrol Now</Button>
        </div>

        <button
          aria-label="Menu"
          onClick={() => setOpen(!open)}
          className="lg:hidden border border-line-bright rounded-[10px] p-2 text-white"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="fixed inset-0 top-[68px] z-[99] bg-ink/95 backdrop-blur-xl lg:hidden">
          <div className="flex flex-col gap-2 px-6 py-8">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="display text-3xl py-3 text-white border-b border-line"
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-6">
              <Button href="/enrol" className="w-full justify-center">
                Enrol Now
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
