'use client';

import { useState } from 'react';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import Reveal from '@/components/ui/Reveal';
import Button from '@/components/ui/Button';
import { IMAGES } from '@/lib/data';

export default function EnrolCTA() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <Section id="enrol-cta">
      <Container>
        <Reveal>
          <div
            className="relative rounded-xl overflow-hidden py-24 px-8 md:px-16 text-center isolate"
            style={{ backgroundImage: `url(${IMAGES.festival})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
            <div
              className="absolute inset-0 -z-[1]"
              style={{
                background:
                  'linear-gradient(180deg,rgba(6,6,11,.72),rgba(6,6,11,.85)),' +
                  'radial-gradient(600px 300px at 50% 100%,rgba(168,85,247,.3),transparent 65%)',
              }}
            />
            <h2 className="display text-[clamp(40px,6.5vw,84px)] mb-4">
              Your first set<br /><span className="gradient-text">starts here.</span>
            </h2>
            <p className="text-[17px] text-[#C9C9D6] max-w-xl mx-auto mb-8 leading-relaxed">
              Drop your email. We&apos;ll send you the cohort calendar, free Serato intro material, and an
              invite to the next Open House.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="flex gap-2.5 max-w-xl mx-auto bg-white/[.04] border border-line-bright rounded-full p-1.5 backdrop-blur-md"
            >
              <input
                type="email"
                required
                placeholder="your@email.com"
                aria-label="Email"
                className="flex-1 bg-transparent border-none outline-none text-white px-4 py-2.5 text-sm"
              />
              <Button type="submit">{submitted ? "You're in. Check your inbox." : 'Enrol Now'}</Button>
            </form>
            <div className="text-[11px] tracking-[.22em] uppercase text-text-faint mt-6">
              No spam · Unsubscribe anytime · Cohorts fill fast
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
