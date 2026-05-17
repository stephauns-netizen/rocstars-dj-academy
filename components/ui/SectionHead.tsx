import Reveal from '@/components/ui/Reveal';

export default function SectionHead({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: React.ReactNode;
  body?: string;
}) {
  return (
    <Reveal>
      <div className="max-w-3xl mx-auto text-center mb-16">
        <span className="inline-block text-[11px] tracking-[.32em] uppercase text-text-mute font-semibold mb-4">
          {eyebrow}
        </span>
        <h2 className="display text-[clamp(40px,5.5vw,72px)] leading-none mb-4">
          {title}
        </h2>
        {body && <p className="text-text-mute text-[17px] leading-relaxed">{body}</p>}
      </div>
    </Reveal>
  );
}
