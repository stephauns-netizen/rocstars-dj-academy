import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import SectionHead from '@/components/ui/SectionHead';
import Reveal from '@/components/ui/Reveal';
import { PATHWAY } from '@/lib/data';

export default function Pathway() {
  return (
    <Section id="pathway">
      <Container>
        <SectionHead
          eyebrow="The Pathway"
          title={<>Beginner. Intermediate.<br /><span className="gradient-text">Expert.</span></>}
          body="A structured three-stage journey designed to take you from your first beatmatch to a club-ready performance. Each level builds on the last — no skipped steps, no guess-work."
        />
        <div className="grid lg:grid-cols-3 gap-5 lg:gap-6 relative">
          {PATHWAY.map((step, i) => (
            <Reveal key={step.step} delay={i * 0.08}>
              <div className="relative p-9 px-8 pb-8 border border-line rounded-lg bg-gradient-to-b from-[#0F0F1A] to-[#08080F] flex flex-col gap-3.5 overflow-hidden hover:-translate-y-1 hover:border-violet/30 transition-all duration-300">
                <span className={['absolute top-0 left-0 right-0 h-[3px] bg-grad origin-left transition-transform duration-500', i === 0 ? 'scale-x-[.25]' : i === 1 ? 'scale-x-[.6]' : 'scale-x-100'].join(' ')} />
                <div className="display text-sm tracking-[.36em] text-cyan">{step.step}</div>
                <h3 className="display text-[32px]">{step.level}</h3>
                <p className="text-[14.5px] text-[#C9C9D6] leading-relaxed">{step.goal}</p>
                <div className="mt-2 pt-3.5 border-t border-line text-[12.5px] text-text-mute leading-[1.5]">
                  <b className="block text-[10px] tracking-[.24em] uppercase text-cyan mb-1.5 font-bold">You walk out able to</b>
                  {step.endState}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
