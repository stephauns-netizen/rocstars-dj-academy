import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import SectionHead from '@/components/ui/SectionHead';
import Reveal from '@/components/ui/Reveal';
import { TESTIMONIALS } from '@/lib/data';

export default function Testimonials() {
  return (
    <Section id="testimonials" style={{ background: 'linear-gradient(180deg,#06060B,#0A0A14)' }}>
      <Container>
        <SectionHead
          eyebrow="Student Stories"
          title={<>From bedroom decks to <span className="gradient-text">paid bookings.</span></>}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.05}>
              <div className="p-8 border border-line rounded-lg bg-gradient-to-b from-[#0E0E18] to-[#08080F] flex flex-col gap-4.5 h-full">
                <p className="font-light text-[20px] leading-[1.45] text-[#EDEDF2] -tracking-[.005em]">
                  <span className="display text-violet text-[46px] leading-none align-[-6px] mr-1.5">&ldquo;</span>
                  {t.quote}
                </p>
                <div className="flex items-center gap-3.5 mt-auto pt-4">
                  <div className="w-[42px] h-[42px] rounded-full bg-grad grid place-items-center display text-lg text-white flex-shrink-0">
                    {t.initial}
                  </div>
                  <div>
                    <div className="font-semibold text-[14px] text-white -tracking-[.005em]">{t.name}</div>
                    <div className="text-[12px] text-text-mute">{t.role}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
