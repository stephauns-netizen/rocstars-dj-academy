'use client';

import { useState } from 'react';
import type { Submission, CollectionType } from '@/lib/admin-queries';

const STATUS_OPTIONS = ['new', 'contacted', 'enrolled', 'no_response', 'closed'];

const STATUS_COLORS: Record<string, string> = {
  new: 'bg-cyan/15 text-cyan border-cyan/30',
  contacted: 'bg-violet/15 text-violet border-violet/30',
  enrolled: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  no_response: 'bg-orange-500/15 text-orange-400 border-orange-500/30',
  closed: 'bg-zinc-500/15 text-zinc-400 border-zinc-500/30',
};

export default function SubmissionsTable({
  items,
  type,
  onStatusChange,
}: {
  items: Submission[];
  type: CollectionType;
  onStatusChange: (id: string, status: string) => Promise<void>;
}) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="border border-line rounded-lg overflow-hidden bg-[#0A0A12]">
      {/* desktop header */}
      <div className="hidden md:grid grid-cols-[110px_1.4fr_1fr_1fr_140px_30px] gap-4 px-5 py-3 border-b border-line text-[10px] tracking-[.22em] uppercase font-bold text-text-mute">
        <span>Date</span>
        <span>Name / Email</span>
        <span>Phone</span>
        <span>{type === 'enrolments' ? 'Course' : 'Subject'}</span>
        <span>Status</span>
        <span></span>
      </div>

      {items.map((item) => (
        <SubmissionRow
          key={item.id}
          item={item}
          type={type}
          expanded={expanded === item.id}
          onToggle={() => setExpanded(expanded === item.id ? null : item.id)}
          onStatusChange={(s) => onStatusChange(item.id, s)}
        />
      ))}
    </div>
  );
}

function SubmissionRow({
  item,
  type,
  expanded,
  onToggle,
  onStatusChange,
}: {
  item: Submission;
  type: CollectionType;
  expanded: boolean;
  onToggle: () => void;
  onStatusChange: (status: string) => Promise<void>;
}) {
  const date = item.createdAt?.toDate?.() ?? null;
  const dateStr = date
    ? date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })
    : '—';
  const timeStr = date
    ? date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
    : '';
  const statusColor = STATUS_COLORS[item.status] || STATUS_COLORS.new;

  return (
    <>
      <div
        onClick={onToggle}
        className="grid grid-cols-1 md:grid-cols-[110px_1.4fr_1fr_1fr_140px_30px] gap-2 md:gap-4 px-5 py-4 border-b border-line cursor-pointer hover:bg-white/[.02] transition-colors items-start md:items-center text-sm"
      >
        <div className="text-text-mute">
          <span className="md:hidden text-[10px] tracking-[.22em] uppercase text-text-faint mr-2">Date:</span>
          <span>{dateStr}</span>
          <span className="text-xs text-text-faint ml-2">{timeStr}</span>
        </div>
        <div>
          <div className="text-white font-semibold">{item.fullName}</div>
          <a
            href={`mailto:${item.email}`}
            onClick={(e) => e.stopPropagation()}
            className="text-xs text-text-mute hover:text-cyan transition-colors"
          >
            {item.email}
          </a>
        </div>
        <div className="text-text-mute">
          {item.phone ? (
            <a
              href={`tel:${item.phone}`}
              onClick={(e) => e.stopPropagation()}
              className="hover:text-white transition-colors"
            >
              {item.phone}
            </a>
          ) : (
            '—'
          )}
        </div>
        <div className="text-text-mute capitalize">
          {type === 'enrolments' ? item.course || '—' : item.subject || '—'}
        </div>
        <div onClick={(e) => e.stopPropagation()}>
          <select
            value={item.status}
            onChange={(e) => onStatusChange(e.target.value)}
            className={[
              'text-[10px] tracking-[.16em] uppercase font-bold px-2.5 py-1.5 rounded-md border outline-none cursor-pointer w-full',
              statusColor,
            ].join(' ')}
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s} className="bg-ink text-white">
                {s.replace('_', ' ')}
              </option>
            ))}
          </select>
        </div>
        <div className="text-text-mute text-xs justify-self-end">{expanded ? '▲' : '▼'}</div>
      </div>

      {expanded && (
        <div className="bg-[#08080F] border-b border-line px-5 py-5 grid gap-4 text-sm">
          {type === 'enrolments' ? (
            <DetailRow label="Experience / Notes" value={item.experience || '— (none provided)'} />
          ) : (
            <DetailRow label="Message" value={item.message || '—'} />
          )}
          <div className="flex gap-2 flex-wrap text-[11px] tracking-[.18em] uppercase text-text-faint">
            <span>ID: {item.id}</span>
            <span>·</span>
            <span>Source: {item.source || 'website'}</span>
            {date && (
              <>
                <span>·</span>
                <span>Submitted: {date.toLocaleString()}</span>
              </>
            )}
          </div>
          <div className="flex gap-2 flex-wrap mt-1">
            <ActionLink href={`mailto:${item.email}`}>Email reply</ActionLink>
            {item.phone && (
              <>
                <ActionLink href={`tel:${item.phone}`}>Call</ActionLink>
                <ActionLink href={`https://wa.me/${item.phone.replace(/[^\d]/g, '')}`} external>
                  WhatsApp
                </ActionLink>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] tracking-[.22em] uppercase text-text-mute font-bold mb-1.5">
        {label}
      </div>
      <div className="text-[#D4D4DD] whitespace-pre-line leading-relaxed">{value}</div>
    </div>
  );
}

function ActionLink({
  href,
  external,
  children,
}: {
  href: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      className="text-xs px-3 py-1.5 rounded-full border border-line-bright text-white hover:bg-grad hover:border-transparent transition-all"
    >
      {children}
    </a>
  );
}
