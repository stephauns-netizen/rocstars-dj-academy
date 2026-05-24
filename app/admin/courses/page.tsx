'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth, logout } from '@/lib/auth';
import { COURSES } from '@/lib/data';
import {
  fetchCourseOverrides,
  saveCourses,
  type CourseOverrides,
} from '@/lib/content';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

type Editable = {
  priceTTD: string;
  durationWeeks: string;
  schedule: string;
  seatsLabel: string;
  curriculum: string; // one bullet per line
};

function defaultsFor(slug: string): Editable {
  const c = COURSES.find((x) => x.slug === slug)!;
  return {
    priceTTD: String(c.priceTTD),
    durationWeeks: String(c.durationWeeks),
    schedule: c.schedule,
    seatsLabel: c.seatsLabel,
    curriculum: c.curriculum.join('\n'),
  };
}

export default function AdminCoursesPage() {
  const router = useRouter();
  const { user, isAdmin, loading } = useAuth();

  const [form, setForm] = useState<Record<string, Editable>>(() =>
    Object.fromEntries(COURSES.map((c) => [c.slug, defaultsFor(c.slug)])),
  );
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');

  useEffect(() => {
    if (!loading && !user) router.push('/admin/login');
  }, [loading, user, router]);

  // Prefill any saved overrides on top of the code defaults
  useEffect(() => {
    if (!isAdmin) return;
    (async () => {
      try {
        const ov = await fetchCourseOverrides();
        setForm((prev) => {
          const next = { ...prev };
          for (const c of COURSES) {
            const o = ov[c.slug];
            if (!o) continue;
            next[c.slug] = {
              priceTTD: o.priceTTD != null ? String(o.priceTTD) : prev[c.slug].priceTTD,
              durationWeeks:
                o.durationWeeks != null ? String(o.durationWeeks) : prev[c.slug].durationWeeks,
              schedule: o.schedule ?? prev[c.slug].schedule,
              seatsLabel: o.seatsLabel ?? prev[c.slug].seatsLabel,
              curriculum: o.curriculum?.length
                ? o.curriculum.join('\n')
                : prev[c.slug].curriculum,
            };
          }
          return next;
        });
      } catch {
        /* keep defaults */
      }
    })();
  }, [isAdmin]);

  const update = (slug: string, field: keyof Editable, value: string) =>
    setForm((prev) => ({ ...prev, [slug]: { ...prev[slug], [field]: value } }));

  const onSave = async () => {
    setSaving(true);
    setMsg('');
    setErr('');
    try {
      const overrides: CourseOverrides = {};
      for (const c of COURSES) {
        const e = form[c.slug];
        const price = Number(e.priceTTD);
        const weeks = Number(e.durationWeeks);
        if (!Number.isFinite(price) || price <= 0)
          throw new Error(`Enter a valid price for ${c.title}.`);
        if (!Number.isFinite(weeks) || weeks <= 0)
          throw new Error(`Enter a valid duration for ${c.title}.`);
        overrides[c.slug] = {
          priceTTD: Math.round(price),
          durationWeeks: Math.round(weeks),
          schedule: e.schedule.trim(),
          seatsLabel: e.seatsLabel.trim(),
          curriculum: e.curriculum
            .split('\n')
            .map((s) => s.trim())
            .filter(Boolean),
        };
      }
      await saveCourses(overrides);
      setMsg('Saved. Your live site will show the new details within a minute or two.');
    } catch (e) {
      setErr((e as Error)?.message || 'Could not save. Check your connection and try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await logout();
    } finally {
      router.push('/admin/login');
    }
  };

  if (loading)
    return (
      <main className="min-h-screen flex items-center justify-center text-text-mute">
        <div className="display text-3xl gradient-text">Loading…</div>
      </main>
    );
  if (!user) return null;
  if (!isAdmin)
    return (
      <main className="min-h-screen flex items-center justify-center text-center px-6 pt-32">
        <div className="max-w-md">
          <h1 className="display text-[clamp(36px,5vw,52px)] mb-3">Not authorised.</h1>
          <p className="text-text-mute mb-6 text-sm">
            You&apos;re signed in as <span className="text-white">{user.email}</span>, but this
            account isn&apos;t on the admin allow-list.
          </p>
          <button onClick={handleSignOut} className="text-sm text-violet hover:text-white">
            Sign out →
          </button>
        </div>
      </main>
    );

  return (
    <main className="pt-32 pb-24 min-h-screen">
      <Container>
        <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
          <div>
            <Link
              href="/admin"
              className="text-[11px] tracking-[.32em] uppercase text-text-mute font-semibold hover:text-white"
            >
              ← Admin
            </Link>
            <h1 className="display text-[clamp(40px,6vw,64px)] leading-none mt-2">
              Edit <span className="gradient-text">prices.</span>
            </h1>
            <p className="text-text-mute text-sm mt-3 max-w-xl">
              Update each course&apos;s price and details. Changes go live automatically — no
              re-publishing needed.
            </p>
          </div>
          <div className="flex gap-3 items-center">
            <Link
              href="/admin/media"
              className="text-sm text-text-mute hover:text-white transition-colors px-3 py-2"
            >
              Edit photos →
            </Link>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {COURSES.map((c) => {
            const e = form[c.slug];
            return (
              <div
                key={c.slug}
                className="p-6 border border-line rounded-lg bg-gradient-to-b from-[#0E0E18] to-[#08080F]"
              >
                <div className="text-[10px] tracking-[.24em] uppercase text-cyan font-bold mb-1">
                  {c.levelLabel}
                </div>
                <h2 className="display text-[26px] leading-none mb-5">{c.title}</h2>

                <FieldLabel>Price (TTD)</FieldLabel>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-text-mute">$</span>
                  <input
                    type="number"
                    min={0}
                    value={e.priceTTD}
                    onChange={(ev) => update(c.slug, 'priceTTD', ev.target.value)}
                    className={inputCls}
                  />
                </div>

                <FieldLabel>Duration (weeks)</FieldLabel>
                <input
                  type="number"
                  min={1}
                  value={e.durationWeeks}
                  onChange={(ev) => update(c.slug, 'durationWeeks', ev.target.value)}
                  className={`${inputCls} mb-4`}
                />

                <FieldLabel>Class days / schedule</FieldLabel>
                <input
                  type="text"
                  value={e.schedule}
                  onChange={(ev) => update(c.slug, 'schedule', ev.target.value)}
                  placeholder="e.g. Sat & Tue"
                  className={`${inputCls} mb-4`}
                />

                <FieldLabel>&quot;Seats left&quot; label</FieldLabel>
                <input
                  type="text"
                  value={e.seatsLabel}
                  onChange={(ev) => update(c.slug, 'seatsLabel', ev.target.value)}
                  placeholder="e.g. 12 seats left"
                  className={`${inputCls} mb-4`}
                />

                <FieldLabel>Curriculum (one point per line)</FieldLabel>
                <textarea
                  rows={8}
                  value={e.curriculum}
                  onChange={(ev) => update(c.slug, 'curriculum', ev.target.value)}
                  className={`${inputCls} leading-relaxed`}
                />
              </div>
            );
          })}
        </div>

        {err && (
          <div className="mt-6 text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded px-4 py-3">
            {err}
          </div>
        )}
        {msg && (
          <div className="mt-6 text-sm text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 rounded px-4 py-3">
            {msg}
          </div>
        )}

        <div className="mt-8 flex items-center gap-4">
          <Button onClick={onSave} arrow={false}>
            {saving ? 'Saving…' : 'Save changes'}
          </Button>
          <Link href="/admin" className="text-sm text-text-mute hover:text-white">
            Back to dashboard
          </Link>
        </div>
      </Container>
    </main>
  );
}

const inputCls =
  'w-full bg-[#06060B] border border-line-bright rounded px-3 py-2.5 text-white text-sm outline-none focus:border-violet/60 transition-colors';

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-[10px] tracking-[.22em] uppercase text-text-mute font-semibold mb-1.5">
      {children}
    </label>
  );
}
