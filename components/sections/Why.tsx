import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import SectionHead from '@/components/ui/SectionHead';
import Reveal from '@/components/ui/Reveal';
import { WHY } from '@/lib/data';

export default function Why() {
  return (
    <Section id="why">
      <Container>
        <SectionHead
          eyebrow="Why RocStars"
          title={<>This isn&apos;t a hobby club.<br /><span className="gradient-text">It&apos;s a career launchpad.</span></>}
          body={"Most DJ \"schools\" are one person with a controller in their living room. We're a working academy with industry-active faculty, real gear, partner venues, and a job-placement programme built into every course."}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {WHY.map((card, i) => (
            <Reveal key={card.num} delay={i * 0.06}>
              <div className="group relative p-8 border border-line rounded-lg bg-gradient-to-b from-[#0E0E16] to-[#0A0A11] transition-all hover:-translate-y-1.5 overflow-hidden h-full">
                <div className="display text-[36px] gradient-text leading-none">{card.num}</div>
                <h3 className="display text-2xl mt-4 mb-2.5 whitespace-pre-line">{card.title}</h3>
                <p className="text-text-mute text-sm leading-relaxed">{card.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
