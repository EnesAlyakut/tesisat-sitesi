import Link from "next/link";
import Reveal from "./Reveal";

export interface ListLink {
  href: string;
  label: string;
  description?: string;
}

/** Ic linkleme bloklari — ilgili hizmetler, bolgeler, yazilar. */
export default function LinkList({
  title,
  links,
  columns = 2,
  className = "",
}: {
  title: string;
  links: ListLink[];
  columns?: 1 | 2 | 3;
  className?: string;
}) {
  if (links.length === 0) return null;

  const cols = {
    1: "",
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
  }[columns];

  return (
    <Reveal as="section" className={className}>
      <h2 className="mb-6 text-xs font-semibold tracking-[0.16em] text-copper-600 uppercase">
        {title}
      </h2>
      <ul className={`grid gap-3 ${cols}`}>
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="group flex h-full items-start gap-3 rounded-2xl border border-line bg-canvas-50 p-4 transition-colors hover:border-line hover:bg-canvas-50"
            >
              <span
                aria-hidden="true"
                className="mt-1 text-aqua-500 transition-transform duration-300 group-hover:translate-x-0.5"
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span>
                <span className="block text-[0.95rem] font-medium text-ink transition-colors group-hover:text-ink">
                  {l.label}
                </span>
                {l.description && (
                  <span className="mt-1 block text-[0.85rem] leading-relaxed text-ink-mute">
                    {l.description}
                  </span>
                )}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
