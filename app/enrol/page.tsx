'use client';

import { useState, useRef, useEffect } from 'react';
import type { FormEvent } from 'react';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';
import { useCourses } from '@/lib/content';
import { submitEnrolment } from '@/lib/forms';

export default function EnrolPage() {
  const COURSES = useCourses();
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === 'done' && successRef.current) {
      successRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [status]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setStatus('sending');
    try {
      await submitEnrolment({
        fullName: String(fd.get('fullName') || ''),
        email: String(fd.get('email') || ''),
        phone: String(fd.get('phone') || ''),
        course: String(fd.get('course') || ''),
        experience: String(fd.get('experience') || ''),
      });
      setStatus('done');
      form.reset();
    } catch (err) {
      console.error(err);
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.');
      setStatus('error');
    }
  };

  const submitted = status === 'done';

  return (
    <main>
      <Section className="pt-44">
        <Container>
          <Reveal>
            <div className="max-w-3xl">
              <span className="text-[11px] tracking-[.32em] uppercase text-text-mute font-semibold">Enrolment</span>
              <h1 className="display text-[clamp(56px,9vw,120px)] my-5 leading-none">
                Take your seat.<br /><span className="gradient-text">Cohorts fill fast.</span>
              </h1>
              <p className="text-[clamp(16px,1.5vw,19px)] leading-relaxed text-[#C9C9D6]">
                Fill the form and we&apos;ll be in touch within 24 hours with cohort dates, payment options, and
                next steps. No commitment to register interest.
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section className="!pt-0">
        <Container>
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10">
            <Reveal>
              <div className="p-8 md:p-10 border border-line rounded-lg bg-gradient-to-b from-[#0E0E18] to-[#08080F]">
                {submitted ? (
                  <div ref={successRef} className="text-center py-12">
                    <div className="display text-[42px] gradient-text mb-3">You&apos;re in.</div>
                    <p className="text-text-mute">
                      We&apos;ve got your details. An advisor will be in touch within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form className="grid gap-5" onSubmit={onSubmit}>
                    <h2 className="display text-3xl mb-1">Enrolment form</h2>
                    <p className="text-text-mute text-sm -mt-3">All fields required unless marked optional.</p>

                    <Field label="Full name">
                      <input required type="text" name="fullName" className={fieldCls} placeholder="Marcus Joseph" />
                    </Field>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <Field label="Email">
                        <input required type="email" name="email" className={fieldCls} placeholder="you@email.com" />
                      </Field>
                      <Field label="Phone / WhatsApp">
                        <input required type="tel" name="phone" className={fieldCls} placeholder="+1 868 ..." />
                      </Field>
                    </div>

                    <Field label="Which course?">
                      <select required name="course" defaultValue="" className={fieldCls}>
                        <option value="" disabled>Select a programme</option>
                        {COURSES.map((c) => (
                          <option key={c.slug} value={c.slug}>{c.title} — ${c.priceTTD.toLocaleString()} TTD</option>
                        ))}
                        <option value="unsure">Not sure yet — talk to an advisor</option>
                      </select>
                    </Field>

                    <Field label="Tell us a little about your DJ experience (optional)">
                      <textarea rows={4} name="experience" className={fieldCls} placeholder="None at all / I've been mixing for 6 months / I want to focus on..." />
                    </Field>

                    <div className="flex items-center gap-3 mt-1">
                      <input type="checkbox" required id="agree" className="accent-violet" />
                      <label htmlFor="agree" className="text-sm text-text-mute">
                        I agree to be contacted by RocStars about my enrolment.
                      </label>
                    </div>

                    {status === 'error' && (
                      <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded px-4 py-3">
                        Couldn&apos;t submit: {errorMsg}. Try again, or message us on WhatsApp.
                      </div>
                    )}

                    <Button type="submit" className="mt-2 self-start">
                      {status === 'sending' ? 'Submitting…' : 'Submit Enrolment'}
                    </Button>
                  </form>
                )}
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="space-y-5">
                <div className="p-6 border border-line rounded-lg bg-[#0A0A12]">
                  <div className="text-[11px] tracking-[.22em] uppercase text-cyan font-bold mb-2">What happens next</div>
                  <ol className="grid gap-2 text-sm text-[#C9C9D6] list-decimal pl-5 leading-relaxed">
                    <li>You submit this form.</li>
                    <li>An advisor reaches out within 24 hours with cohort dates and payment options.</li>
                    <li>Your seat is locked with a first-instalment payment.</li>
                    <li>You receive your welcome pack and pre-course Serato install guide.</li>
                  </ol>
                </div>

                <div className="p-6 border border-line rounded-lg bg-[#0A0A12]">
                  <div className="text-[11px] tracking-[.22em] uppercase text-cyan font-bold mb-2">Payment plans</div>
                  <p className="text-sm text-[#C9C9D6] leading-relaxed">
                    All courses offer a 2- or 3-instalment plan. First payment locks your seat. No fees,
                    no interest.
                  </p>
                </div>

                <div className="p-6 border border-line rounded-lg bg-[#0A0A12]">
                  <div className="text-[11px] tracking-[.22em] uppercase text-cyan font-bold mb-2">Prefer to talk?</div>
                  <p className="text-sm text-[#C9C9D6] leading-relaxed mb-3">
                    Message us on WhatsApp — we usually reply within an hour during business hours.
                  </p>
                  <Button href="https://wa.me/18680000000" variant="ghost" arrow={false}>WhatsApp Us</Button>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
    </main>
  );
}

const fieldCls =
  'w-full bg-[#06060B] border border-line-bright rounded px-4 py-3 text-white placeholder:text-text-faint outline-none focus:border-violet/60 transition-colors';

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-2">
      <span className="text-[11px] tracking-[.22em] uppercase text-text-mute font-semibold">{label}</span>
      {children}
    </label>
  );
}
