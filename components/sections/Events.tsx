import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import SectionHead from '@/components/ui/SectionHead';
import Reveal from '@/components/ui/Reveal';
import { EVENTS } from '@/lib/data';

export default function Events() {
  return (
    <Section id="events">
      <Container>
        <SectionHead
          eyebrow="Upcoming"
          title={<>Open classes &amp; <span className="gradient-text">showcase nights.</span></>}
          body="Visit the studio. Sit in on a class. Catch a showcase. Open events are free — bring a friend."
        />
        <Reveal>
          <div className="grid border border-line rounded-lg overflow-hidden bg-[#0A0A12]">
            {EVENTS.map((e, i) => (
              <a
                key={e.title}
                href="#"
                className={[
                  'group grid grid-cols-1 md:grid-cols-[120px_1fr_auto] gap-3.5 md:gap-6 items-center',
                  'py-6 px-7 cursor-pointer transition-colors',
                  'hover:bg-gradient-to-r hover:from-violet/[.08] hover:to-transparent',
                  i < EVENTS.length - 1 ? 'border-b border-line' : '',
                ].join(' ')}
              >
                <div className="display text-[30px] text-white leading-none">
                  {e.day}
                  <span className="block text-[11px] tracking-[.3em] text-cyan mt-1 font-sans font-semibold uppercase">{e.month}</span>
                </div>
                <div>
                  <h4 className="display text-[22px] leading-none mb-1.5">{e.title}</h4>
                  <p className="text-text-mute text-[13px]">{e.blurb}</p>
                </div>
                <span className="text-[11px] tracking-[.22em] uppercase font-bold text-white border border-line-bright px-4 py-2.5 rounded-full transition-all group-hover:bg-grad group-hover:border-transparent justify-self-start md:justify-self-end">
                  {e.cta} →
                </span>
              </a>
            ))}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
