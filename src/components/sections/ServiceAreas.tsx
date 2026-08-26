import Link from "next/link";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { activeDistricts, hubPages, locationPages } from "@/data/regions";
import { locationHref } from "@/lib/nav";

/**
 * Hizmet bolgeleri.
 * Yalnizca `active: true` isaretli bolgeler yayinlanir; hizmet verilmeyen
 * bolgeler icin sayfa olusturulmaz.
 */
export default function ServiceAreas() {
  return (
    <Section
      divider
      id="hizmet-bolgeleri"
      eyebrow="Hizmet bölgelerimiz"
      title="Göktürk ve Arnavutköy'de hizmet veriyoruz"
      lead="Öncelikli çalışma alanlarımız Göktürk ve Arnavutköy. Konumunuzu paylaştığınızda ulaşım durumu hakkında bilgi verebiliriz."
    >
      <div className="grid gap-5 lg:grid-cols-2">
        {hubPages.map((hub, i) => {
          const district = activeDistricts.find((d) => d.slug === hub.district);
          const subPages = locationPages.filter(
            (p) => p.district === hub.district && !p.isHub,
          );

          return (
            <Reveal key={hub.slug} delay={i * 90}>
              <article className="group relative h-full overflow-hidden card p-8">
                {/* Harita estetiginde zemin */}
                <div
                  aria-hidden="true"
                  className="blueprint-grid pointer-events-none absolute inset-0 opacity-50"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-10 -top-10 size-48 rounded-full bg-[radial-gradient(circle,rgba(43,142,222,0.16),transparent_70%)]"
                />

                <div className="relative">
                  <p className="eyebrow mb-3">
                    <span aria-hidden="true" className="size-1.5 rounded-full bg-ok-400" />
                    Aktif hizmet bölgesi
                  </p>

                  <h3 className="text-2xl text-ink sm:text-3xl">
                    <Link
                      href={locationHref(hub.slug)}
                      className="transition-colors hover:text-aqua-600"
                    >
                      {hub.title}
                    </Link>
                  </h3>

                  <p className="mt-3 max-w-md text-[0.94rem] leading-relaxed text-ink-soft">
                    {hub.intro}
                  </p>

                  {district && district.neighborhoods.length > 0 && (
                    <>
                      <p className="mt-6 text-[0.7rem] font-semibold tracking-[0.14em] text-copper-600 uppercase">
                        Çalıştığımız alanlar
                      </p>
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {district.neighborhoods.map((n) => (
                          <li
                            key={n}
                            className="chip px-3 py-1.5 text-xs"
                          >
                            {n}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}

                  <ul className="mt-7 flex flex-wrap gap-2">
                    {subPages.map((p) => (
                      <li key={p.slug}>
                        <Link
                          href={locationHref(p.slug)}
                          className="chip gap-1.5 text-[0.84rem] transition-colors hover:border-aqua-400 hover:bg-aqua-50 hover:text-aqua-700"
                        >
                          {p.navTitle}
                          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
