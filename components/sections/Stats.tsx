import Container from '@/components/ui/Container';
import Reveal from '@/components/ui/Reveal';
import { STATS } from '@/lib/data';

export default function Stats() {
  return (
    <section className="py-16">
      <Container>
        <Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 border border-line rounded-lg overflow-hidden bg-gradient-to-b from-[#0C0C15] to-[#08080F]">
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className={[
                  'p-9',
                  i < STATS.length - 1 ? 'md:border-r md:border-line' : '',
                  i % 2 === 0 ? 'border-r border-line md:border-r' : '',
                  i < 2 ? 'border-b border-line md:border-b-0' : '',
                ].join(' ')}
              >
                <div className="display text-[64px] gradient-text leading-none">{s.num}</div>
                <div className="mt-2.5 text-text-mute text-[11px] tracking-[.22em] uppercase font-semibold">{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
