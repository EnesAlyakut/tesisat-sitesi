"use client";

import Reveal from "@/components/ui/Reveal";
import { runtimeTelHref, runtimeWhatsappHref, useRuntimeSite } from "@/components/providers/RuntimeSiteContext";

interface ContactCtaProps {
  title?: string;
  body?: string;
}

export default function ContactCta({
  title = "Tesisat Arızanız İçin Doğrudan Teknik Ekibimizle Görüşün",
  body = "İstanbul genelinde termal kamera ile kırmadan su kaçağı tespiti, robotla tıkanıklık açma ve sıhhi tesisat onarımlarında nöbetçi teknik servisimizle 7/24 iletişime geçebilirsiniz.",
}: ContactCtaProps) {
  const site = useRuntimeSite();
  const telHref = runtimeTelHref(site);
  const whatsappHref = runtimeWhatsappHref(site);

  return (
    <section className="border-t border-line bg-canvas-100 py-12 md:py-16">
      <div className="container-x">
        <Reveal>
          <div className="overflow-hidden rounded-xl border border-[#1b314b] bg-[#071322] p-8 sm:p-12 text-white shadow-lg">
            <div className="mx-auto max-w-4xl text-center">
              {/* Resmi Kurumsal Başlık Rozeti */}
              <div className="inline-flex items-center gap-2 rounded border border-copper-500/40 bg-copper-600/10 px-3.5 py-1 text-[0.7rem] sm:text-xs font-bold tracking-[0.2em] text-copper-300 uppercase">
                <span>MARSAK TEKNİK TESİSAT • 7/24 ÇAĞRI MERKEZİ</span>
              </div>

              {/* Başlık ve Açıklama */}
              <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-white sm:text-3xl md:text-4xl">
                {title}
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm sm:text-base leading-relaxed text-slate-300">
                {body}
              </p>

              {/* Resmi İletişim Butonları */}
              <div className="mt-8 grid gap-3.5 sm:grid-cols-2 max-w-xl mx-auto">
                {/* Telefon Butonu */}
                <a
                  href={telHref}
                  className="flex items-center justify-center gap-3 rounded-lg bg-copper-600 px-6 py-3.5 text-sm font-bold text-white shadow transition hover:bg-copper-500"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span>Ara: {site.phoneDisplay}</span>
                </a>

                {/* WhatsApp Butonu */}
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 rounded-lg border border-emerald-500/50 bg-emerald-950/40 px-6 py-3.5 text-sm font-bold text-emerald-300 transition hover:bg-emerald-900/50 hover:text-white"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                  <span>WhatsApp Destek Hattı</span>
                </a>
              </div>

              {/* Resmi Nitelikler */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-white/10 pt-6 text-xs font-semibold text-slate-300">
                <span className="flex items-center gap-1.5">
                  <span className="text-copper-400 font-bold">✓</span> Kırmadan Noktasal Tespit
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-copper-400 font-bold">✓</span> Yetkili &amp; Sertifikalı Ustalar
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-copper-400 font-bold">✓</span> Şeffaf &amp; Sabit Fiyatlandırma
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-copper-400 font-bold">✓</span> İstanbul Geneli 7/24 Ulaşım
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
