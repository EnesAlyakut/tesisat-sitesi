"use client";

import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { runtimeTelHref, runtimeWhatsappHref, useRuntimeSite } from "@/components/providers/RuntimeSiteContext";
import { pricingFactors } from "@/data/content";

export default function PricingSection({ tone }: { tone?: "base" | "alt" }) {
  const site = useRuntimeSite();
  const telHref = runtimeTelHref(site);
  const whatsappHref = runtimeWhatsappHref(site);

  return (
    <Section
      tone={tone}
      divider
      id="fiyatlandirma"
      eyebrow="Şeffaf Fiyatlandırma Politikamız"
      title="Tesisat Fiyatları Nasıl Belirlenir?"
      lead="Aynı şikâyetin arkasında çok farklı tesisat arızaları bulunabilir. Bu yüzden görmeden yanıltıcı sabit fiyat vermek yerine, ücreti belirleyen faktörleri şeffaf şekilde açıklıyoruz."
    >
      <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-12 items-start">
        {/* Sol Taraf: Faktörler Listesi (Yüksek Kontrastlı & Okunabilir) */}
        <ol className="space-y-4">
          {pricingFactors.map((f, i) => (
            <Reveal key={f.title} delay={i * 45} as="li">
              <div className="flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-4 sm:p-5 shadow-xs transition hover:border-copper-400">
                <span
                  aria-hidden="true"
                  className="grid size-9 shrink-0 place-items-center rounded-lg border border-slate-300 bg-slate-100 font-bold text-copper-700 text-sm"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">{f.title}</h3>
                  <p className="mt-1 text-sm sm:text-[0.95rem] leading-relaxed text-slate-700">
                    {f.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>

        {/* Sağ Taraf: Danışma & Fiyat Bilgisi Kartı */}
        <Reveal delay={100} className="sticky top-28">
          <div className="rounded-2xl border-2 border-copper-400/50 bg-white p-6 sm:p-8 shadow-md">
            <span className="text-[0.7rem] font-extrabold uppercase tracking-widest text-copper-600">
              Ücretsiz Ön Bilgilendirme
            </span>
            <h3 className="mt-2 text-xl sm:text-2xl font-extrabold text-slate-900">
              Sorununuzu Anlatın, Net Bilgi Alın
            </h3>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-700">
              Şikâyetinizi telefonda veya WhatsApp üzerinden tarif ettiğinizde, yapılması muhtemel işlemin kapsamı ve tahmini bütçe hakkında ön bilgi veriyoruz.
            </p>
            <p className="mt-2 text-sm sm:text-base leading-relaxed text-slate-700">
              Kesin ücret, arıza cihazla yerinde tespit edilip netleştikten sonra <strong>sizin onayınızla</strong> sabitlenir.
            </p>

            {/* İletişim Aksiyon Butonları (Tam Genişlik & Kesintisiz) */}
            <div className="mt-6 flex flex-col gap-3">
              <a
                href={telHref}
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-copper-600 px-6 py-3.5 text-sm font-bold text-white shadow transition hover:bg-copper-500"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 6 6L16.5 12l4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4 6.2 2 2 0 0 1 6 4z" />
                </svg>
                <span>Hemen Bilgi Al: {site.phoneDisplay}</span>
              </a>

              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-3 rounded-xl border border-emerald-600 bg-emerald-50 px-6 py-3.5 text-sm font-bold text-emerald-800 transition hover:bg-emerald-100"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2m0 2a8 8 0 1 1-4.1 14.9l-.4-.2-2.6.7.7-2.5-.2-.4A8 8 0 0 1 12 4" />
                  <path d="M8.9 7.6c.2 0 .4 0 .5.4l.7 1.6c0 .2 0 .3-.1.5l-.5.6c-.1.2-.2.3 0 .6a7 7 0 0 0 3.2 2.8c.3.1.4 0 .6-.1l.7-.8c.2-.2.3-.1.5 0l1.6.8c.2.1.3.2.3.4 0 .8-.6 1.5-1.4 1.6-1.6.2-4-1-5.6-3-1-1.3-1.5-2.5-1.5-3.5 0-.9.5-1.6 1-1.9z" />
                </svg>
                <span>WhatsApp&apos;tan Fotoğraf / Soru İletin</span>
              </a>
            </div>

            <p className="mt-6 border-t border-slate-200 pt-4 text-xs leading-relaxed text-slate-600 font-medium">
              ✓ Telefonda verilen bilgiler tahmini kapsam içindir. İşleme başlanmadan önce uygulanacak müdahale ve ücret üzerinde mutlaka mutabık kalınır.
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
