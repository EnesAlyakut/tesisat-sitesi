import type { ReactNode } from "react";
import Breadcrumbs from "./Breadcrumbs";
import Reveal from "./Reveal";
import type { Crumb } from "@/lib/seo";

/** İç sayfaların resmi kurumsal üst bölümü. */
export default function PageHero({
  eyebrow,
  title,
  lead,
  crumbs,
  children,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  crumbs: Crumb[];
  children?: ReactNode;
}) {
  return (
    <div className="relative border-b border-[#182d46] bg-[#071322] pb-12 pt-4 text-white md:pb-16">
      <div className="relative z-10">
        <Breadcrumbs items={crumbs} />

        <div className="container-x pt-6 md:pt-8">
          <Reveal className="mx-auto max-w-4xl text-center">
            {eyebrow && (
              <div className="inline-flex items-center gap-2 rounded-md border border-copper-500/40 bg-copper-600/10 px-3.5 py-1 text-[0.7rem] sm:text-xs font-bold tracking-[0.2em] text-copper-300 uppercase">
                <span>{eyebrow}</span>
              </div>
            )}

            <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl lg:leading-[1.15]">
              {title}
            </h1>

            {lead && (
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base md:text-lg">
                {lead}
              </p>
            )}

            {/* Resmi Standart Bilgi Şeridi */}
            <div className="mt-8 grid gap-3 sm:grid-cols-3 max-w-3xl mx-auto">
              <div className="flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs font-semibold text-slate-200">
                <span className="text-copper-400 font-bold">✓</span>
                <span>Yetkili &amp; Sertifikalı Ustalar</span>
              </div>
              <div className="flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs font-semibold text-slate-200">
                <span className="text-copper-400 font-bold">✓</span>
                <span>İSKİ &amp; TSE Standartlarında Malzeme</span>
              </div>
              <div className="flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs font-semibold text-slate-200">
                <span className="text-copper-400 font-bold">✓</span>
                <span>İstanbul Geneli 7/24 Servis</span>
              </div>
            </div>

            {children && <div className="mt-8 flex justify-center">{children}</div>}
          </Reveal>
        </div>
      </div>
    </div>
  );
}
