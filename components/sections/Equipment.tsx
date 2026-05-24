'use client';

import Image from 'next/image';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import Reveal from '@/components/ui/Reveal';
import Button from '@/components/ui/Button';
import { useImages } from '@/lib/content';

const FEATURES = [
  '3× Pioneer CDJ-3000 setups, DJM-900NXS2 mixers',
  'Technics SL-1210MK7 turntables for vinyl training',
  'Funktion-One studio monitor system, live-club calibrated',
  'Open practice access — six days, no booking required for enrolled students',
  'In-studio session recording for every showcase set',
];

export default function Equipment() {
  const images = useImages();
  return (
    <Section style={{ background: '#070710' }}>
      <Container>
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <Reveal>
            <div className="relative rounded-xl overflow-hidden border border-line">
              <Image
                src={images.equipment}
                alt="Pioneer DJ Equipment"
                width={2400}
                height={1792}
                className="w-full h-auto block"
              />
              <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(135deg,transparent 40%,rgba(168,85,247,.18))' }} />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <span className="text-[11px] tracking-[.32em] uppercase text-text-mute font-semibold">The Studio</span>
              <h2 className="display text-[clamp(36px,4.5vw,60px)] mt-3.5 mb-5.5">
                Learn on the rig <span className="gradient-text">you&apos;ll actually play on.</span>
              </h2>
              <p className="text-[17px] text-[#C9C9D6] leading-relaxed mb-4 max-w-lg">
                Three full Pioneer DJ stations. A live booth wired into a club-grade Funktion-One stack.
                A treated tracking room for production. Two private practice rooms open six days a week.
              </p>
              <ul className="grid gap-3.5 my-6 max-w-lg">
                {FEATURES.map((f) => (
                  <li key={f} className="flex items-start gap-3.5 text-[14.5px] text-[#D4D4DD] leading-[1.5]">
                    <span className="flex-shrink-0 w-[18px] h-[18px] rounded-full bg-grad shadow-[0_0_16px_rgba(168,85,247,.4)] mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button href="/contact">Book a Studio Tour</Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
