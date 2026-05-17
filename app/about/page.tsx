import type { Metadata } from 'next';
import About from '@/components/sections/About';
import Instructors from '@/components/sections/Instructors';
import Stats from '@/components/sections/Stats';
import Equipment from '@/components/sections/Equipment';
import EnrolCTA from '@/components/sections/EnrolCTA';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Reveal from '@/components/ui/Reveal';
import { SITE } from '@/lib/data';

export const metadata: Metadata = {
  title: `About — ${SITE.name}`,
  description: "How RocStars DJ Academy was built — by working DJs, for the next wave of Trinidad & Tobago's music culture.",
};

export default function AboutPage() {
  return (
    <main>
      <Section className="pt-44">
        <Container>
          <Reveal>
            <div className="max-w-3xl">
              <span className="text-[11px] tracking-[.32em] uppercase text-text-mute font-semibold">About</span>
              <h1 className="display text-[clamp(56px,9vw,120px)] my-5 leading-none">
                Built by working DJs.<br /><span className="gradient-text">For the next wave.</span>
              </h1>
              <p className="text-[clamp(16px,1.5vw,19px)] leading-relaxed text-[#C9C9D6]">
                We started RocStars because serious DJ education didn&apos;t exist in Trinidad &amp; Tobago.
                What follows is the academy we wished existed when we first stepped behind the decks.
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>
      <About />
      <Stats />
      <Equipment />
      <Instructors />
      <EnrolCTA />
    </main>
  );
}
