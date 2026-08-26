import type { FaqItem } from "@/data/types";
import Reveal from "./Reveal";

/**
 * Native <details>/<summary> kullanir: klavye navigasyonu ve ekran okuyucu
 * destegi tarayici tarafindan saglanir, ek JS gerekmez.
 */
export default function Faq({
  items,
  className = "",
}: {
  items: FaqItem[];
  className?: string;
}) {
  if (items.length === 0) return null;

  return (
    <div className={`mx-auto max-w-3xl ${className}`}>
      {items.map((item, i) => (
        <Reveal key={item.q} delay={i * 40}>
          <details className="group border-b border-line-strong [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-left font-medium text-ink transition-colors hover:text-aqua-600">
              <span className="text-[1.05rem] leading-snug">{item.q}</span>
              <span
                aria-hidden="true"
                className="mt-1 grid size-6 shrink-0 place-items-center rounded-full border border-line-strong bg-canvas-50 text-aqua-700 transition-transform duration-300 group-open:rotate-45"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </span>
            </summary>
            <div className="pb-6 pr-10 text-[0.97rem] leading-relaxed text-ink-soft">
              {item.a}
            </div>
          </details>
        </Reveal>
      ))}
    </div>
  );
}
