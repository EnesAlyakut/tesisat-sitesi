import Link from "next/link";
import type { Crumb } from "@/lib/seo";

/** Gorunur breadcrumb. Schema ciktisi ayrica breadcrumbSchema() ile verilir. */
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Sayfa yolu" className="container-x pt-28 md:pt-32">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-semibold tracking-wider text-white/60 uppercase">
        {items.map((c, i) => {
          const last = i === items.length - 1;
          return (
            <li key={c.href} className="flex items-center gap-2">
              {i > 0 && (
                <span aria-hidden="true" className="text-white/40">
                  /
                </span>
              )}
              {last ? (
                <span aria-current="page" className="text-copper-300">
                  {c.name}
                </span>
              ) : (
                <Link href={c.href} className="transition-colors hover:text-white">
                  {c.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
