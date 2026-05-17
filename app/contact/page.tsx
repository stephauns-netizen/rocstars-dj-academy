'use client';

import { useState, useRef, useEffect } from 'react';
import type { FormEvent } from 'react';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';
import { SITE } from '@/lib/data';
import { submitContact } from '@/lib/forms';

export default function ContactPage() {
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
      await submitContact({
        fullName: String(fd.get('fullName') || ''),
        email: String(fd.get('email') || ''),
        phone: String(fd.get('phone') || ''),
        subject: String(fd.get('subject') || ''),
        message: String(fd.get('message') || ''),
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
              <span className="text-[11px] tracking-[.32em] uppercase text-text-mute font-semibold">Contact</span>
              <h1 className="display text-[clamp(56px,9vw,120px)] my-5 leading-none">
                Get in <span className="gradient-text">touch.</span>
              </h1>
              <p className="text-[clamp(16px,1.5vw,19px)] leading-relaxed text-[#C9C9D6]">
                Got a question, want a private lesson, or interested in corporate bookings? Drop us a
                message and we&apos;ll respond within 24 hours.
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section className="!pt-0">
        <Container>
          <div className="grid lg:grid-cols-[1.3fr_1fr] gap-10">
            <Reveal>
              <div className="p-8 md:p-10 border border-line rounded-lg bg-gradient-to-b from-[#0E0E18] to-[#08080F]">
                {submitted ? (
                  <div ref={successRef} className="text-center py-12">
                    <div className="display text-[42px] gradient-text mb-3">Message sent.</div>
                    <p className="text-text-mute">We&apos;ll be back to you within 24 hours.</p>
                  </div>
                ) : (
                  <form className="grid gap-5" onSubmit={onSubmit}>
                    <Field label="Full name">
                      <input required type="text" name="fullName" className={fieldCls} />
                    </Field>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <Field label="Email">
                        <input required type="email" name="email" className={fieldCls} />
                      </Field>
                      <Field label="Phone (optional)">
                        <input type="tel" name="phone" className={fieldCls} />
                      </Field>
                    </div>
                    <Field label="Subject">
                      <select required name="subject" defaultValue="" className={fieldCls}>
                        <option value="" disabled>Pick one</option>
                        <option>General inquiry</option>
                        <option>Private lesson booking</option>
                        <option>Corporate / group session</option>
                        <option>Press &amp; media</option>
                        <option>Partnerships</option>
                      </select>
                    </Field>
                    <Field label="Message">
                      <textarea required rows={5} name="message" className={fieldCls} />
                    </Field>

                    {status === 'error' && (
                      <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded px-4 py-3">
                        Couldn&apos;t send: {errorMsg}. Try again or message us on WhatsApp.
                      </div>
                    )}

                    <Button type="submit" className="self-start mt-2">
                      {status === 'sending' ? 'Sending…' : 'Send Message'}
                    </Button>
                  </form>
                )}
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="space-y-5">
                <Info label="Studio" value={SITE.location} />
                <Info label="Email" value={SITE.email} href={`mailto:${SITE.email}`} />
                <Info label="Phone" value={SITE.phone} href={`tel:${SITE.phone}`} />
                <Info label="WhatsApp" value="Message us instantly" href={SITE.whatsapp} />

                <div className="p-6 border border-line rounded-lg bg-[#0A0A12]">
                  <div className="text-[11px] tracking-[.22em] uppercase text-cyan font-bold mb-2">Studio hours</div>
                  <ul className="text-sm text-[#C9C9D6] grid gap-1.5 leading-relaxed">
                    <li>Mon – Fri: 12pm – 9pm</li>
                    <li>Saturday: 10am – 8pm</li>
                    <li>Sunday: Closed (showcase nights only)</li>
                  </ul>
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
  'w-full bg-[#06060B] border border-line-bright rounded px-4 py-3 text-white outline-none focus:border-violet/60 transition-colors';

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-2">
      <span className="text-[11px] tracking-[.22em] uppercase text-text-mute font-semibold">{label}</span>
      {children}
    </label>
  );
}

function Info({ label, value, href }: { label: string; value: string; href?: string }) {
  const inner = (
    <div className="p-6 border border-line rounded-lg bg-[#0A0A12] hover:border-violet/30 transition-colors">
      <div className="text-[11px] tracking-[.22em] uppercase text-cyan font-bold mb-2">{label}</div>
      <div className="text-white text-base">{value}</div>
    </div>
  );
  return href ? <a href={href}>{inner}</a> : inner;
}
