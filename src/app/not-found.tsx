import Link from "next/link";
import type { Metadata } from "next";

import { CtaPair, LinkButton } from "@/components/ui/CallToAction";
import { featuredServices } from "@/data/services";
import { hubPages } from "@/data/regions";
import { locationHref, serviceHref } from "@/lib/nav";

export const metadata: Metadata = {
  title: "Sayfa bulunamadı",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="relative flex min-h-[80svh] items-center overflow-hidden py-24">
      <div aria-hidden="true" className="blueprint-grid pointer-events-none absolute inset-0" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(43,142,222,0.14),transparent_62%)]"
      />

      <div className="container-x relative">
        <div className="max-w-2xl">
          {/* Kopmus boru — 404 gorseli */}
          <svg
            aria-hidden="true"
            width="180"
            height="60"
            viewBox="0 0 180 60"
            fill="none"
            className="mb-10"
          >
            <path d="M0 30h62" stroke="var(--color-copper-500)" strokeWidth="7" strokeLinecap="round" />
            <path d="M118 30h62" stroke="var(--color-copper-500)" strokeWidth="7" strokeLinecap="round" />
            <circle cx="70" cy="38" r="3.5" fill="var(--color-aqua-400)" className="animate-[drip_1.8s_ease-in_infinite]" />
            <circle cx="82" cy="41" r="2.5" fill="var(--color-aqua-400)" className="animate-[drip_1.8s_ease-in_infinite_0.6s]" />
            <path d="M62 22v16M118 22v16" stroke="var(--color-copper-400)" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.6" />
          </svg>

          <p className="eyebrow mb-5">
            <span aria-hidden="true" className="h-px w-6 bg-copper-400" />
            404 — Hat kopuk
          </p>

          <h1 className="text-[2.1rem] leading-[1.1] sm:text-5xl">
            Aradığınız sayfayı bulamadık
          </h1>

          <p className="mt-5 text-base leading-relaxed text-ink-soft">
            Bağlantı değişmiş veya sayfa kaldırılmış olabilir. Aşağıdaki
            başlıklardan devam edebilir ya da doğrudan bize ulaşabilirsiniz.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <LinkButton href="/" variant="solid" size="md">
              Ana sayfaya dön
            </LinkButton>
            <LinkButton href="/hizmetler/" variant="outline" size="md">
              Tüm hizmetler
            </LinkButton>
          </div>

          <CtaPair size="md" className="mt-6" />

          <div className="mt-14 grid gap-8 sm:grid-cols-2">
            <nav aria-label="Öne çıkan hizmetler">
              <h2 className="mb-4 text-xs font-semibold tracking-[0.16em] text-copper-600 uppercase">
                Öne çıkan hizmetler
              </h2>
              <ul className="space-y-2.5">
                {featuredServices.slice(0, 5).map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={serviceHref(s.slug)}
                      className="text-sm text-ink-soft transition-colors hover:text-aqua-600"
                    >
                      {s.shortTitle}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Hizmet bölgeleri">
              <h2 className="mb-4 text-xs font-semibold tracking-[0.16em] text-copper-600 uppercase">
                Hizmet bölgeleri
              </h2>
              <ul className="space-y-2.5">
                {hubPages.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={locationHref(p.slug)}
                      className="text-sm text-ink-soft transition-colors hover:text-aqua-600"
                    >
                      {p.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
