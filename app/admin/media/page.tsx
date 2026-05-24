'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth, logout } from '@/lib/auth';
import { IMAGES, MEDIA_SLOTS, AVAILABLE_IMAGES } from '@/lib/data';
import { fetchMediaOverrides, saveMedia, type ImageMap } from '@/lib/content';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

export default function AdminMediaPage() {
  const router = useRouter();
  const { user, isAdmin, loading } = useAuth();

  // slot key -> chosen image path (start from code defaults)
  const [selected, setSelected] = useState<ImageMap>(() => {
    const init: ImageMap = {};
    for (const s of MEDIA_SLOTS) init[s.key] = (IMAGES as ImageMap)[s.key];
    return init;
  });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');

  useEffect(() => {
    if (!loading && !user) router.push('/admin/login');
  }, [loading, user, router]);

  useEffect(() => {
    if (!isAdmin) return;
    (async () => {
      try {
        const ov = await fetchMediaOverrides();
        setSelected((prev) => {
          const next = { ...prev };
          for (const s of MEDIA_SLOTS) {
            const v = ov[s.key];
            if (typeof v === 'string' && v.trim()) next[s.key] = v;
          }
          return next;
        });
      } catch {
        /* keep defaults */
      }
    })();
  }, [isAdmin]);

  const groups = useMemo(() => {
    const order: string[] = [];
    for (const s of MEDIA_SLOTS) if (!order.includes(s.group)) order.push(s.group);
    return order.map((g) => ({ group: g, slots: MEDIA_SLOTS.filter((s) => s.group === g) }));
  }, []);

  const pick = (slotKey: string, path: string) =>
    setSelected((prev) => ({ ...prev, [slotKey]: path }));

  const onSave = async () => {
    setSaving(true);
    setMsg('');
    setErr('');
    try {
      await saveMedia(selected);
      setMsg('Saved. Your live site will show the new photos within a minute or two.');
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
              Edit <span className="gradient-text">photos.</span>
            </h1>
            <p className="text-text-mute text-sm mt-3 max-w-xl">
              For each spot on the site, click the photo you want from your library. Changes go
              live automatically.
            </p>
          </div>
          <Link
            href="/admin/courses"
            className="text-sm text-text-mute hover:text-white transition-colors px-3 py-2"
          >
            Edit prices →
          </Link>
        </div>

        {groups.map(({ group, slots }) => (
          <section key={group} className="mb-12">
            <h2 className="text-[11px] tracking-[.28em] uppercase text-cyan font-bold mb-5 border-b border-line pb-3">
              {group}
            </h2>
            <div className="grid gap-6">
              {slots.map((slot) => (
                <div
                  key={slot.key}
                  className="p-5 border border-line rounded-lg bg-gradient-to-b from-[#0E0E18] to-[#08080F]"
                >
                  <div className="flex items-center justify-between gap-4 mb-4 flex-wrap">
                    <div className="text-sm text-white font-semibold">{slot.label}</div>
                    <div className="text-[11px] text-text-mute">
                      {labelForPath(selected[slot.key])}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                    {AVAILABLE_IMAGES.map((img) => {
                      const active = selected[slot.key] === img.path;
                      return (
                        <button
                          key={img.path}
                          type="button"
                          onClick={() => pick(slot.key, img.path)}
                          title={img.label}
                          className={[
                            'relative aspect-square rounded-md overflow-hidden border-2 transition-all',
                            active
                              ? 'border-violet shadow-[0_0_0_3px_rgba(168,85,247,.25)]'
                              : 'border-line hover:border-line-bright',
                          ].join(' ')}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={img.path}
                            alt={img.label}
                            className="w-full h-full object-cover"
                          />
                          {active && (
                            <span className="absolute top-1 right-1 w-5 h-5 rounded-full bg-violet grid place-items-center text-white text-xs">
                              ✓
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

        {err && (
          <div className="mt-2 mb-6 text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded px-4 py-3">
            {err}
          </div>
        )}
        {msg && (
          <div className="mt-2 mb-6 text-sm text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 rounded px-4 py-3">
            {msg}
          </div>
        )}

        <div className="flex items-center gap-4">
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

function labelForPath(path?: string): string {
  const found = AVAILABLE_IMAGES.find((i) => i.path === path);
  return found ? found.label : 'Custom / default';
}
