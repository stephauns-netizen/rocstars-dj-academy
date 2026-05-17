import Image from 'next/image';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import SectionHead from '@/components/ui/SectionHead';
import Reveal from '@/components/ui/Reveal';
import Button from '@/components/ui/Button';
import { INSTRUCTORS } from '@/lib/data';

export default function Instructors() {
  return (
    <Section id="instructors">
      <Container>
        <SectionHead
          eyebrow="Faculty"
          title={<>Learn from DJs who <span className="gradient-text">work this weekend.</span></>}
          body="Twelve resident instructors. Every one of them currently plays out. The names on our roster are the same names on the line-ups at Aria, Zen, 51 Degrees, and every major Carnival fete in T&T."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {INSTRUCTORS.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.08}>
              <div className="group relative rounded-lg overflow-hidden border border-line bg-[#0A0A12] aspect-[4/5] cursor-pointer">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-[800ms] ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink/95 pointer-events-none" style={{backgroundImage:'linear-gradient(180deg,transparent 35%,rgba(6,6,11,.85) 90%,rgba(6,6,11,.95))'}} />
                <span className="absolute top-5 right-5 z-10 px-2.5 py-1.5 rounded-md text-[10px] tracking-[.16em] uppercase font-bold bg-cyan/[.12] text-cyan border border-cyan/30 backdrop-blur-md">
                  {p.badge}
                </span>
                <div className="absolute left-6 right-6 bottom-6 z-10">
                  <div className="text-[10px] tracking-[.3em] uppercase text-cyan mb-2 font-bold">{p.role}</div>
                  <h3 className="display text-[30px] mb-1 leading-none">{p.name}</h3>
                  <p className="text-[#C9C9D6] text-[13px] leading-[1.55] opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">{p.bio}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="text-center mt-12">
            <Button href="/about" variant="ghost">Meet the full faculty</Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
