import type { ReactNode } from "react";

/**
 * Liste boş olduğunda veya güncellenirken gösterilen durum bileşeni.
 */
export default function EmptyState({
  title,
  body,
  action,
}: {
  title: string;
  body: string;
  action?: ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-line bg-canvas-50 px-6 py-14 text-center">
      <div
        aria-hidden="true"
        className="mx-auto mb-6 grid size-14 place-items-center rounded-full border border-line-strong bg-canvas-50 text-aqua-700"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
          <path d="M3 9h7a2 2 0 0 1 2 2v3a2 2 0 0 0 2 2h7" />
          <path d="M3 6v6M21 13v6" />
        </svg>
      </div>
      <h3 className="text-xl text-ink">{title}</h3>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-soft">{body}</p>
      {action && <div className="mt-7 flex justify-center">{action}</div>}
    </div>
  );
}
