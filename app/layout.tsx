import type { Metadata } from 'next';
import './globals.css';
import Nav from '@/components/layout/Nav';
import Footer from '@/components/layout/Footer';
import WhatsAppFab from '@/components/layout/WhatsAppFab';
import { SITE } from '@/lib/data';

export const metadata: Metadata = {
  title: `${SITE.name} — ${SITE.tagline}`,
  description:
    "Trinidad & Tobago's premium DJ academy. Learn to DJ on Serato — from your first beatmatch to club-ready performance. Beginner, Intermediate, and Expert programmes.",
  themeColor: '#06060B',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans bg-ink text-text">
        <Nav />
        {children}
        <Footer />
        <WhatsAppFab />
      </body>
    </html>
  );
}
