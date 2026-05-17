import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import SectionHead from '@/components/ui/SectionHead';
import Reveal from '@/components/ui/Reveal';
import Button from '@/components/ui/Button';
import { COURSES } from '@/lib/data';

export default function Courses() {
  return (
    <Section id="courses" style={{ background: 'linear-gradient(180deg,#06060B,#08080F)' }}>
      <Container>
        <SectionHead
          eyebrow="The Programmes"
          title={<>Three levels.<br /><span className="gradient-text">One clear path.</span></>}
          body="Beginner to Expert. Every course taught in-person at our Port-of-Spain studio, using industry-standard Serato DJ Pro and the same gear you'll find in working clubs."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {COURSES.map((c, i) => (
            <Reveal key={c.slug} delay={i * 0.08}>
              <article
                id={c.slug}
                className={[
                  'group relative p-8 pb-7 border rounded-lg bg-gradient-to-b from-[#0E0E18] to-[#08080F]',
                  'flex flex-col gap-[18px] overflow-hidden transition-all duration-300',
                  'hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(168,85,247,.15)] hover:border-violet/30',
                  c.popular ? 'border-violet/40 shadow-[0_24px_60px_rgba(168,85,247,.18)]' : 'border-line',
                ].join(' ')}
              >
                <span className="absolute top-0 left-0 right-0 h-1 bg-grad scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />

                <div className="flex gap-2 flex-wrap">
                  <span className="px-2.5 py-1.5 rounded-md text-[10px] tracking-[.18em] uppercase font-bold border border-violet/35 bg-gradient-to-r from-cyan/[.16] to-violet/[.16] text-[#E2E2EE]">
                    {c.levelLabel}
                  </span>
                  <span className="px-2.5 py-1.5 rounded-md text-[10px] tracking-[.18em] uppercase font-bold bg-white/[.06] border border-line text-white">
                    {c.badge}
                  </span>
                </div>

                <h3 className="display text-[34px] leading-none">{c.title}</h3>
                <p className="text-[#C9C9D6] text-[14.5px] leading-relaxed">{c.blurb}</p>

                <div>
                  <div className="text-[10px] tracking-[.24em] uppercase text-cyan font-bold mb-2">You&apos;ll learn</div>
                  <ul className="grid gap-1.5">
                    {c.curriculum.map((line) => (
                      <li key={line} className="relative pl-5 text-[13.5px] leading-[1.45] text-[#C9C9D6]">
                        <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-grad shadow-[0_0_8px_rgba(168,85,247,.5)]" />
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-3.5 flex-wrap text-[12px] tracking-[.12em] uppercase font-semibold text-text-mute">
                  <span><b className="text-white">{c.durationWeeks} wks</b></span>
                  <span><b className="text-white">{c.perWeek}</b>×/week</span>
                  <span><b className="text-white">{c.schedule}</b></span>
                </div>

                <div className="flex items-baseline gap-2 text-white">
                  <span className="text-[11px] tracking-[.2em] uppercase text-text-mute">From</span>
                  <span className="display text-[36px]">${c.priceTTD.toLocaleString()}</span>
                  <span className="text-[13px] text-text-mute font-semibold">TTD</span>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-line">
                  <Button href="/enrol" variant="ghost" className="!px-0 !py-0 !border-0 !bg-transparent !text-white">
                    Enrol
                  </Button>
                  <span
                    className={[
                      'px-2.5 py-1.5 rounded-md text-[10px] tracking-[.18em] uppercase font-bold',
                      c.popular
                        ? 'bg-grad border-transparent text-white'
                        : 'bg-white/[.06] border border-line text-white',
                    ].join(' ')}
                  >
                    {c.seatsLabel}
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="text-center mt-12">
            <Button href="/enrol" variant="ghost">Talk to an Advisor</Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
