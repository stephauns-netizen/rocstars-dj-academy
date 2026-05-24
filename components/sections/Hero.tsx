'use client';

import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { useImages } from '@/lib/content';

export default function Hero() {
  const images = useImages();
  return (
    <header
      id="top"
      className="relative min-h-screen pt-36 pb-24 overflow-hidden isolate"
      style={{
        backgroundImage: `url(${images.heroBooth})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div
        className="absolute inset-0 -z-[1]"
        style={{
          background:
            'linear-gradient(180deg,rgba(6,6,11,.55) 0%,rgba(6,6,11,.45) 35%,rgba(6,6,11,.92) 90%,#06060B 100%),' +
            'radial-gradient(900px 500px at 80% 30%,rgba(168,85,247,.30),transparent 60%),' +
            'radial-gradient(900px 500px at 0% 80%,rgba(0,102,255,.25),transparent 60%)',
        }}
      />

      <Container>
        <div className="relative max-w-[880px]">
          <span className="inline-flex items-center gap-2.5 px-3.5 py-2 border border-line-bright rounded-full bg-white/[.02] text-[11px] tracking-[.32em] uppercase text-[#D6D6E0] font-semibold">
            <span className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
            Trinidad &amp; Tobago&apos;s Premium DJ Academy · Powered by Serato
          </span>
          <h1 className="display text-[clamp(56px,9vw,128px)] my-5">
            Master the<br />
            <span className="gradient-text block">art of DJing.</span>
          </h1>
          <p className="text-[clamp(16px,1.5vw,19px)] leading-relaxed text-[#C9C9D6] max-w-[620px] mb-9">
            Learn to DJ on Serato — the industry-standard software used by the world&apos;s biggest DJs.
            Beginner, Intermediate and Expert programmes that take you from your first beatmatch to
            club-ready performance.
          </p>
          <div className="flex gap-3.5 flex-wrap">
            <Button href="/courses">Browse Courses</Button>
            <Button href="/enrol" variant="ghost" arrow={false}>Enrol Now</Button>
          </div>

          <div className="mt-16 flex items-center gap-8 flex-wrap text-xs tracking-[.18em] uppercase text-text-mute">
            <div className="flex items-baseline gap-2 text-white">
              <b className="display text-[26px]">247</b>
              <span className="text-text-mute">Students Trained</span>
            </div>
            <span className="w-1.5 h-1.5 rounded-full bg-line-bright" />
            <div className="flex items-baseline gap-2 text-white">
              <b className="display text-[26px]">12</b>
              <span className="text-text-mute">Resident Instructors</span>
            </div>
            <span className="w-1.5 h-1.5 rounded-full bg-line-bright" />
            <div className="flex items-baseline gap-2 text-white">
              <b className="display text-[26px]">94%</b>
              <span className="text-text-mute">Job-Placement Rate</span>
            </div>
          </div>
        </div>
      </Container>

      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5 text-[10px] tracking-[.4em] uppercase text-text-mute">
        <span>Scroll</span>
        <span className="w-px h-12 origin-top animate-scrollLine" style={{ background: 'linear-gradient(180deg,transparent,#A855F7)' }} />
      </div>
    </header>
  );
}
