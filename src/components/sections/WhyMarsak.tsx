"use client";

import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import ServiceIcon from "@/components/icons/ServiceIcon";
import { whyMarsak } from "@/data/content";
import { useRuntimeSite } from "@/components/providers/RuntimeSiteContext";

export default function WhyMarsak({ tone }: { tone?: "base" | "alt" }) {
  const site = useRuntimeSite();

  return (
    <Section
      tone={tone}
      divider
      eyebrow="HİZMET KALİTESİ & PRENSİPLER"
      title={`Neden ${site.name}?`}
      lead="Tesisat işinde fark, kullanılan cihazların kalitesi ve ustanın mühendislik yaklaşımında ortaya çıkar. Doğru tespit, kalıcı çözümün temelidir."
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {whyMarsak.map((item, i) => (
          <Reveal
            key={item.title}
            delay={i * 60}
            className={i === 0 ? "md:col-span-2 lg:col-span-1" : ""}
          >
            <article className="group flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-white p-7 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-copper-400 hover:shadow-md">
              <div>
                <span className="mb-5 grid size-12 place-items-center rounded-xl bg-copper-100 border border-copper-200 text-copper-800 transition-colors group-hover:bg-copper-600 group-hover:text-white">
                  <ServiceIcon name={item.icon} size={22} />
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-copper-700 transition-colors">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm sm:text-[0.95rem] leading-relaxed text-slate-700 font-normal">
                  {item.body}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-copper-700">
                <span className="text-copper-600 font-bold">✓</span>
                <span>Firma Güvencemiz Altında</span>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={120}>
        <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
          <div className="flex items-center gap-3.5">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-copper-100 font-bold text-copper-800 text-base">
              ✓
            </span>
            <p className="text-sm sm:text-base leading-relaxed text-slate-800 font-medium">
              Tüm tespit ve tamirat işlemlerimizde <strong>İSKİ ve sıhhi tesisat kalite standartlarına</strong> tam uyum sağlıyoruz. Müşteri onayı alınmadan hiçbir kırma veya ekstra işlem başlatılmaz.
            </p>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
