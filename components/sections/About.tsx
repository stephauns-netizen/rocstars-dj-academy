import Image from 'next/image';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import Reveal from '@/components/ui/Reveal';
import { IMAGES } from '@/lib/data';

export default function About() {
  return (
    <Section id="about" style={{ background: 'linear-gradient(180deg,#08080F,#06060B)' }}>
      <Container>
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <Reveal>
            <div className="relative rounded-xl overflow-hidden border border-line aspect-[4/5] bg-[#0A0A14]">
              <Image
                src={IMAGES.about}
                alt="A RocStars DJ working a live set"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg,transparent 40%,rgba(168,85,247,.18))' }} />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <span className="text-[11px] tracking-[.32em] uppercase text-text-mute font-semibold">About RocStars</span>
              <h2 className="display text-[clamp(36px,4.5vw,60px)] mt-3.5 mb-5.5">
                Built by working DJs.<br /><span className="gradient-text">For the next wave.</span>
              </h2>
              <p className="text-base text-[#C9C9D6] leading-[1.7] mb-3.5 max-w-lg">
                RocStars DJ Academy was founded on one simple idea: serious DJ education didn&apos;t exist in
                Trinidad &amp; Tobago. We set out to change that — to build the kind of academy a young
                aspiring DJ could walk into and leave career-ready.
              </p>
              <p className="text-base text-[#C9C9D6] leading-[1.7] mb-3.5 max-w-lg">
                We teach on Serato DJ Pro because it&apos;s what working DJs actually use. We teach in-person
                because that&apos;s how craft is passed down. And we structure everything around one outcome:{' '}
                <strong className="text-white">putting you in the booth.</strong>
              </p>
              <div className="grid grid-cols-3 gap-3.5 mt-7 max-w-lg">
                <div className="p-4 border border-line rounded bg-[#0A0A12]">
                  <b className="display block text-[32px] gradient-text leading-none">2024</b>
                  <span className="text-[10px] tracking-[.22em] uppercase text-text-mute mt-1.5 block font-semibold">Established</span>
                </div>
                <div className="p-4 border border-line rounded bg-[#0A0A12]">
                  <b className="display block text-[32px] gradient-text leading-none">Serato</b>
                  <span className="text-[10px] tracking-[.22em] uppercase text-text-mute mt-1.5 block font-semibold">Official Curriculum</span>
                </div>
                <div className="p-4 border border-line rounded bg-[#0A0A12]">
                  <b className="display block text-[32px] gradient-text leading-none">T&amp;T</b>
                  <span className="text-[10px] tracking-[.22em] uppercase text-text-mute mt-1.5 block font-semibold">Caribbean Roots</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
