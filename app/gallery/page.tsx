import type { Metadata } from 'next';
import Gallery from '@/components/sections/Gallery';
import EnrolCTA from '@/components/sections/EnrolCTA';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Reveal from '@/components/ui/Reveal';
import { SITE } from '@/lib/data';

export const metadata: Metadata = {
  title: `Gallery — ${SITE.name}`,
  description: "Inside the academy — studio sessions, showcase nights, and cohort moments at RocStars DJ Academy.",
};

export default function GalleryPage() {
  return (
    <main>
      <Section className="pt-44">
        <Container>
          <Reveal>
            <div className="max-w-3xl">
              <span className="text-[11px] tracking-[.32em] uppercase text-text-mute font-semibold">Gallery</span>
              <h1 className="display text-[clamp(56px,9vw,120px)] my-5 leading-none">
                Inside the <span className="gradient-text">academy.</span>
              </h1>
              <p className="text-[clamp(16px,1.5vw,19px)] leading-relaxed text-[#C9C9D6]">
                Studio sessions. Showcase nights. Cohort moments. The rooms, the gear, and the energy
                that makes RocStars.
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>
      <Gallery />
      <EnrolCTA />
    </main>
  );
}
