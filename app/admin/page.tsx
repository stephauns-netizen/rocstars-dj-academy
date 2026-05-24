'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, logout } from '@/lib/auth';
import {
  fetchSubmissions,
  updateStatus,
  type Submission,
  type CollectionType,
} from '@/lib/admin-queries';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import SubmissionsTable from '@/components/admin/SubmissionsTable';

export default function AdminDashboard() {
  const router = useRouter();
  const { user, isAdmin, loading } = useAuth();
  const [tab, setTab] = useState<CollectionType>('enrolments');
  const [items, setItems] = useState<Submission[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string>('');

  // Auth gate
  useEffect(() => {
    if (loading) return;
    if (!user) router.push('/admin/login');
  }, [loading, user, router]);

  // Load data when admin + tab changes
  const load = useCallback(async () => {
    if (!isAdmin) return;
    setRefreshing(true);
    setError('');
    try {
      const data = await fetchSubmissions(tab);
      setItems(data);
    } catch (err) {
      setError(
        (err as Error)?.message ||
          'Could not fetch submissions. Check Firestore rules.',
      );
    } finally {
      setRefreshing(false);
    }
  }, [isAdmin, tab]);

  useEffect(() => {
    load();
  }, [load]);

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await updateStatus(tab, id, status);
      setItems((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)));
    } catch (err) {
      alert('Failed to update status: ' + (err as Error)?.message);
    }
  };

  const handleSignOut = async () => {
    try {
      await logout();
    } finally {
      router.push('/admin/login');
    }
  };

  if (loading) return <CenterMsg>Loading…</CenterMsg>;
  if (!user) return null; // redirecting
  if (!isAdmin)
    return (
      <NotAuthorized
        email={user.email || ''}
        onSignOut={handleSignOut}
      />
    );

  const filtered =
    filter === 'all' ? items : items.filter((i) => i.status === filter);

  const exportCSV = () => {
    const headers =
      tab === 'enrolments'
        ? ['Date', 'Name', 'Email', 'Phone', 'Course', 'Experience', 'Status']
        : ['Date', 'Name', 'Email', 'Phone', 'Subject', 'Message', 'Status'];
    const rows = filtered.map((s) => {
      const d = s.createdAt?.toDate?.() ?? null;
      const dateStr = d ? d.toISOString() : '';
      if (tab === 'enrolments') {
        return [
          dateStr,
          s.fullName,
          s.email,
          s.phone || '',
          s.course || '',
          s.experience || '',
          s.status,
        ];
      }
      return [
        dateStr,
        s.fullName,
        s.email,
        s.phone || '',
        s.subject || '',
        s.message || '',
        s.status,
      ];
    });
    const csv =
      [headers, ...rows]
        .map((r) =>
          r.map((c) => `"${String(c ?? '').replace(/"/g, '""')}"`).join(','),
        )
        .join('\n') + '\n';
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${tab}-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="pt-32 pb-24 min-h-screen">
      <Container>
        {/* Header */}
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <span className="text-[11px] tracking-[.32em] uppercase text-text-mute font-semibold">
              Admin
            </span>
            <h1 className="display text-[clamp(40px,6vw,64px)] leading-none mt-1">
              Lead <span className="gradient-text">inbox.</span>
            </h1>
            <p className="text-text-mute text-sm mt-3">
              Signed in as <span className="text-white">{user.email}</span>
            </p>
          </div>
          <div className="flex gap-3 items-center flex-wrap">
            <Button href="/admin/courses" variant="ghost" arrow={false}>
              Edit prices
            </Button>
            <Button href="/admin/media" variant="ghost" arrow={false}>
              Edit photos
            </Button>
            <Button onClick={load} variant="ghost" arrow={false}>
              {refreshing ? 'Refreshing…' : 'Refresh'}
            </Button>
            <Button onClick={exportCSV} variant="ghost" arrow={false}>
              Export CSV
            </Button>
            <button
              onClick={handleSignOut}
              className="text-sm text-text-mute hover:text-white transition-colors px-3 py-2"
            >
              Sign out →
            </button>
          </div>
        </div>

        {/* Tabs + Filter */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-6 border-b border-line">
          <div className="flex gap-8">
            {(['enrolments', 'contacts'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={[
                  'pb-4 px-1 text-sm uppercase tracking-[.18em] font-semibold transition-colors border-b-2 -mb-px',
                  tab === t
                    ? 'text-white border-violet'
                    : 'text-text-mute border-transparent hover:text-white',
                ].join(' ')}
              >
                {t} {tab === t && `(${filtered.length})`}
              </button>
            ))}
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-[#0A0A12] border border-line-bright rounded-md px-3 py-2 text-xs uppercase tracking-[.16em] text-white outline-none focus:border-violet/60"
          >
            <option value="all">All statuses</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="enrolled">Enrolled</option>
            <option value="no_response">No response</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        {/* Body */}
        {error ? (
          <div className="text-center py-24">
            <div className="display text-2xl text-red-400 mb-2">Could not load.</div>
            <p className="text-text-mute text-sm max-w-md mx-auto">{error}</p>
          </div>
        ) : refreshing && items.length === 0 ? (
          <div className="text-center py-24 text-text-mute">Loading submissions…</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24 text-text-mute">
            No {tab}
            {filter !== 'all' ? ` with status “${filter.replace('_', ' ')}”` : ' yet'}.
          </div>
        ) : (
          <SubmissionsTable
            items={filtered}
            type={tab}
            onStatusChange={handleStatusChange}
          />
        )}
      </Container>
    </main>
  );
}

function CenterMsg({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen flex items-center justify-center text-text-mute">
      <div className="display text-3xl gradient-text">{children}</div>
    </main>
  );
}

function NotAuthorized({
  email,
  onSignOut,
}: {
  email: string;
  onSignOut: () => void;
}) {
  return (
    <main className="min-h-screen flex items-center justify-center text-center px-6 pt-32">
      <div className="max-w-md">
        <h1 className="display text-[clamp(36px,5vw,52px)] mb-3">Not authorised.</h1>
        <p className="text-text-mute mb-6 text-sm">
          You&apos;re signed in as <span className="text-white">{email}</span>, but this
          account isn&apos;t on the admin allow-list. Contact the site owner to be
          added.
        </p>
        <button
          onClick={onSignOut}
          className="text-sm text-violet hover:text-white transition-colors"
        >
          Sign out →
        </button>
      </div>
    </main>
  );
}
