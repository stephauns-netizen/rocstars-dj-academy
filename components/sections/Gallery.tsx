'use client';

import Image from 'next/image';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import SectionHead from '@/components/ui/SectionHead';
import Reveal from '@/components/ui/Reveal';
import { GALLERY_SLOTS } from '@/lib/data';
import { useImages } from '@/lib/content';

export default function Gallery() {
  const images = useImages();
  return (
    <Section id="gallery" style={{ background: 'linear-gradient(180deg,#06060B,#08080F)' }}>
      <Container>
        <SectionHead
          eyebrow="The Vibe"
          title={<>Inside the <span className="gradient-text">academy.</span></>}
          body="Studio sessions. Showcase nights. Cohort moments. A look at the rooms, the gear, and the energy that makes RocStars."
        />
        <Reveal>
          <div className="grid md:grid-cols-3 grid-rows-2 gap-3.5 md:h-[560px]">
            {GALLERY_SLOTS.map((g, i) => (
              <div
                key={i}
                className={[
                  'group relative rounded-lg overflow-hidden border border-line bg-[#0A0A14] h-60 md:h-auto',
                  g.size === 'wide' ? 'md:row-span-2 md:col-span-1' : '',
                ].join(' ')}
              >
                <Image
                  src={images[g.key]}
                  alt={g.cap}
                  fill
                  sizes="(max-width:768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-[800ms] ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg,transparent 60%,rgba(6,6,11,.85))' }} />
                <span className="absolute left-5 bottom-4 z-10 text-white text-[13px] tracking-[.14em] uppercase font-semibold">
                  {g.cap}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
