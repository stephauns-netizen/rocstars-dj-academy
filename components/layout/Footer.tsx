import Link from 'next/link';
import Image from 'next/image';
import Container from '@/components/ui/Container';
import { SITE } from '@/lib/data';

const COLS = [
  {
    title: 'Pages',
    links: [
      { href: '/', label: 'Home' },
      { href: '/about', label: 'About' },
      { href: '/courses', label: 'Courses' },
      { href: '/gallery', label: 'Gallery' },
      { href: '/contact', label: 'Contact' },
    ],
  },
  {
    title: 'Programmes',
    links: [
      { href: '/courses#beginner', label: 'Beginner DJ Course' },
      { href: '/courses#intermediate', label: 'Intermediate DJ Course' },
      { href: '/courses#expert', label: 'Expert / Performance' },
      { href: '/enrol', label: 'Enrol Now' },
      { href: '/#faq', label: 'FAQ' },
    ],
  },
];

const Social = ({ name, children }: { name: string; children: React.ReactNode }) => (
  <a
    href="#"
    aria-label={name}
    className="w-9 h-9 rounded-full border border-line-bright grid place-items-center transition-all hover:bg-grad hover:border-transparent"
  >
    {children}
  </a>
);

export default function Footer() {
  return (
    <footer id="contact" className="pt-20 pb-10 border-t border-line bg-[#04040A]">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-1">
            <Image
              src={SITE.logo}
              alt={SITE.name}
              width={440}
              height={104}
              className="h-24 w-auto mb-4 logo-blend"
            />
            <p className="text-text-mute text-sm leading-relaxed max-w-xs">
              Trinidad &amp; Tobago&apos;s premium DJ academy. Industry-active faculty, real gear,
              and a structured pathway from beginner to club-ready performance — all on Serato DJ Pro.
            </p>
          </div>

          {COLS.map((c) => (
            <div key={c.title}>
              <h5 className="text-[11px] tracking-[.22em] uppercase text-white mb-4 font-bold">
                {c.title}
              </h5>
              <ul className="flex flex-col gap-3">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-text-mute text-sm hover:text-white transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h5 className="text-[11px] tracking-[.22em] uppercase text-white mb-4 font-bold">Contact</h5>
            <ul className="flex flex-col gap-3 text-sm">
              <li><a href={`mailto:${SITE.email}`} className="text-text-mute hover:text-white">{SITE.email}</a></li>
              <li><a href={`tel:${SITE.phone}`} className="text-text-mute hover:text-white">{SITE.phone}</a></li>
              <li><a href={SITE.whatsapp} className="text-text-mute hover:text-white">WhatsApp Us</a></li>
              <li className="text-text-mute">{SITE.location}</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-7 border-t border-line text-xs text-text-faint tracking-wide">
          <div>&copy; {new Date().getFullYear()} {SITE.name}. Made in Trinidad &amp; Tobago.</div>
          <div className="flex gap-3.5">
            <Social name="Instagram">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="#fff"><path d="M12 2.2c3.2 0 3.6 0 4.85.07a6.6 6.6 0 014.85 4.86c.07 1.25.08 1.65.08 4.87s0 3.62-.08 4.87a6.6 6.6 0 01-4.85 4.86c-1.25.07-1.65.08-4.85.08s-3.6 0-4.85-.08a6.6 6.6 0 01-4.85-4.86C2.27 15.62 2.27 15.22 2.27 12s0-3.62.08-4.87a6.6 6.6 0 014.85-4.86C8.4 2.2 8.8 2.2 12 2.2zm0 1.8c-3.16 0-3.53.01-4.77.07a4.8 4.8 0 00-3.53 3.53c-.06 1.25-.07 1.62-.07 4.77s.01 3.52.07 4.77a4.8 4.8 0 003.53 3.53c1.24.06 1.61.07 4.77.07s3.53-.01 4.77-.07a4.8 4.8 0 003.53-3.53c.06-1.25.07-1.62.07-4.77s-.01-3.52-.07-4.77a4.8 4.8 0 00-3.53-3.53c-1.24-.06-1.61-.07-4.77-.07zm0 3.06a4.94 4.94 0 110 9.88 4.94 4.94 0 010-9.88zm0 1.8a3.14 3.14 0 100 6.28 3.14 3.14 0 000-6.28zm5.16-2.13a1.16 1.16 0 11-2.32 0 1.16 1.16 0 012.32 0z"/></svg>
            </Social>
            <Social name="TikTok">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="#fff"><path d="M19.6 5.92c-1.55-.1-2.83-1.06-3.34-2.42-.16-.43-.25-.9-.26-1.5h-3v13.55c0 1.43-1.07 2.59-2.5 2.59-1.42 0-2.5-1.16-2.5-2.59 0-1.45 1.1-2.62 2.46-2.62.3 0 .58.05.84.15v-3.1a5.65 5.65 0 00-.84-.06 5.66 5.66 0 00-5.6 5.63A5.66 5.66 0 0010.5 21.4a5.66 5.66 0 005.6-5.63V9.86c1.05.71 2.3 1.13 3.5 1.13V7.95c.01-.65 0-1.3 0-2.03z"/></svg>
            </Social>
            <Social name="YouTube">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="#fff"><path d="M21.6 7.2a2.49 2.49 0 00-1.76-1.76C18.28 5 12 5 12 5s-6.28 0-7.84.44A2.49 2.49 0 002.4 7.2C2 8.76 2 12 2 12s0 3.24.4 4.8c.24.94.96 1.52 1.76 1.76C5.72 19 12 19 12 19s6.28 0 7.84-.44a2.49 2.49 0 001.76-1.76c.4-1.56.4-4.8.4-4.8s0-3.24-.4-4.8zM10 15V9l5.2 3-5.2 3z"/></svg>
            </Social>
            <Social name="WhatsApp">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="#fff"><path d="M20.5 3.5A9.5 9.5 0 003.4 17.2L2 22l4.9-1.3A9.5 9.5 0 1020.5 3.5zM12 20.3a8.3 8.3 0 01-4.2-1.1l-.3-.18-3 .8.8-2.9-.2-.32A8.3 8.3 0 1112 20.3zm4.7-6.2c-.26-.13-1.5-.74-1.74-.82-.23-.08-.4-.13-.57.13-.17.26-.66.82-.81 1-.15.17-.3.19-.55.06-.26-.13-1.07-.4-2.04-1.27-.76-.68-1.27-1.5-1.42-1.76-.15-.26-.02-.4.11-.53.12-.12.26-.3.4-.46.13-.16.17-.26.26-.43.09-.17.04-.32-.02-.46-.06-.13-.57-1.37-.78-1.88-.21-.5-.42-.43-.57-.43h-.49a.94.94 0 00-.68.32c-.23.26-.9.88-.9 2.14s.92 2.48 1.05 2.65c.13.17 1.82 2.78 4.41 3.9.62.27 1.1.43 1.48.55.62.2 1.18.17 1.62.1.5-.08 1.5-.61 1.71-1.2.21-.6.21-1.11.15-1.21-.06-.1-.23-.16-.49-.29z"/></svg>
            </Social>
          </div>
        </div>
      </Container>
    </footer>
  );
}
