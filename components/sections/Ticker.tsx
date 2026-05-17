import { TICKER } from '@/lib/data';

export default function Ticker() {
  const doubled = [...TICKER, ...TICKER];

  return (
    <div className="border-t border-b border-line py-4 overflow-hidden bg-[#08080F]">
      <div className="flex gap-14 whitespace-nowrap animate-ticker will-change-transform">
        {doubled.map((item, i) => (
          <div key={i} className="flex items-center gap-14 flex-shrink-0">
            <span
              className={[
                'display text-[22px]',
                item.accent ? 'text-violet [text-shadow:0_0_24px_rgba(168,85,247,.5)]' : 'text-[#454555]',
              ].join(' ')}
            >
              {item.t}
            </span>
            <svg width="8" height="8" viewBox="0 0 8 8" className="opacity-45 flex-shrink-0">
              <circle cx="4" cy="4" r="3" fill="#A855F7" />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
}
