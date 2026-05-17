import type { Metadata } from 'next';
import Pathway from '@/components/sections/Pathway';
import Courses from '@/components/sections/Courses';
import FAQ from '@/components/sections/FAQ';
import EnrolCTA from '@/components/sections/EnrolCTA';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Reveal from '@/components/ui/Reveal';
import { SITE } from '@/lib/data';

export const metadata: Metadata = {
  title: `Courses — ${SITE.name}`,
  description: "Beginner, Intermediate, and Expert DJ courses taught on Serato DJ Pro at our Port-of-Spain studio.",
};

export default function CoursesPage() {
  return (
    <main>
      <Section className="pt-44">
        <Container>
          <Reveal>
            <div className="max-w-3xl">
              <span className="text-[11px] tracking-[.32em] uppercase text-text-mute font-semibold">The Programmes</span>
              <h1 className="display text-[clamp(56px,9vw,120px)] my-5 leading-none">
                Three levels.<br /><span className="gradient-text">One clear path.</span>
              </h1>
              <p className="text-[clamp(16px,1.5vw,19px)] leading-relaxed text-[#C9C9D6]">
                A structured journey from your first beatmatch to a club-ready performance — taught on
                industry-standard Serato DJ Pro and the same gear you&apos;ll find in working clubs.
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>
      <Pathway />
      <Courses />
      <FAQ />
      <EnrolCTA />
    </main>
  );
}
