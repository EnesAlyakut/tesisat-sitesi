import type { Metadata } from "next";

import PageHero from "@/components/ui/PageHero";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import JsonLd from "@/components/JsonLd";

import { site } from "@/lib/site";
import { getCmsContent } from "@/lib/cms";
import { buildMetadata, crumbs } from "@/lib/seo";
import { breadcrumbSchema, graph } from "@/lib/schema";

const trail = crumbs({ name: "İletişim", href: "/iletisim/" });

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getCmsContent();
  return buildMetadata({
    title: "İletişim & 7/24 Acil Servis",
    description: `${cms.site.name} resmi iletişim kanalları. İstanbul genelinde 7/24 su tesisatı, kırmadan su kaçağı tespiti ve robotla tıkanıklık açma acil telefon ve WhatsApp hattı.`,
    path: "/iletisim/",
  });
}

export default async function ContactPage() {
  const cms = await getCmsContent();
  const info = cms.site;
  const telHref = `tel:${info.phoneRaw}`;
  const whatsappHref = `https://wa.me/${info.whatsappRaw}?text=${encodeURIComponent(
    info.whatsappMessage || "Merhaba, tesisat konusunda bilgi almak istiyorum."
  )}`;

  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(trail))} />

      {/* 1. Üst Kurumsal Hero Başlık Alanı */}
      <PageHero
        crumbs={trail}
        eyebrow="7/24 Kesintisiz Usta & Mobil Ekip"
        title="İletişim & Acil Servis"
        lead="İstanbul genelinde su kaçağı tespiti, tıkanıklık açma ve tüm sıhhi tesisat arızalarınızda telefon veya WhatsApp üzerinden doğrudan ustalarımıza ulaşabilirsiniz."
      />

      {/* 2. Ana İletişim Kanalları ve Bilgi Alanı */}
      <Section className="bg-canvas-100">
        <div className="mx-auto max-w-5xl space-y-12">
          {/* 2 Ana Kart - Simetrik & Güçlü Görünüm */}
          <div className="grid gap-8 md:grid-cols-2">
            {/* Telefon Kartı */}
            <Reveal delay={0}>
              <div className="flex h-full flex-col justify-between rounded-3xl border border-line bg-white p-8 shadow-xl shadow-slate-200/50 transition-all duration-300 hover:-translate-y-1.5 hover:border-copper-400 hover:shadow-2xl sm:p-10">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="grid size-16 place-items-center rounded-2xl bg-copper-50 text-copper-600 shadow-inner">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-copper-50 px-3.5 py-1 text-xs font-bold text-copper-700">
                      <span className="size-2 rounded-full bg-copper-500" />
                      7/24 Kesintisiz Hat
                    </span>
                  </div>

                  <span className="mt-6 block text-xs font-bold tracking-wider text-copper-600 uppercase">
                    Telefonla Hemen Arayın
                  </span>
                  <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
                    {info.phoneDisplay}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                    Acil su patlağı, kaçak, sızıntı ve tıkanıklık durumlarında anında ustamızla doğrudan görüşerek servis kaydı oluşturabilirsiniz.
                  </p>

                  <div className="mt-5 flex items-center gap-2 text-xs font-medium text-ink-mute">
                    <span>⚡ Ortalama 30–45 dk içinde mobil ekip yönlendirmesi</span>
                  </div>
                </div>

                <a
                  href={telHref}
                  className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-copper-600 px-6 py-4 text-base font-bold text-white shadow-lg shadow-copper-600/25 transition-all hover:bg-copper-500 hover:shadow-xl hover:shadow-copper-600/35"
                >
                  <span>Hemen Ara (7/24)</span>
                  <span>→</span>
                </a>
              </div>
            </Reveal>

            {/* WhatsApp Kartı */}
            <Reveal delay={60}>
              <div className="flex h-full flex-col justify-between rounded-3xl border border-line bg-white p-8 shadow-xl shadow-slate-200/50 transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-400 hover:shadow-2xl sm:p-10">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="grid size-16 place-items-center rounded-2xl bg-emerald-50 text-emerald-600 shadow-inner">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                      </svg>
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3.5 py-1 text-xs font-bold text-emerald-700">
                      <span className="size-2 rounded-full bg-emerald-500" />
                      Çevrim İçi Canlı Destek
                    </span>
                  </div>

                  <span className="mt-6 block text-xs font-bold tracking-wider text-emerald-600 uppercase">
                    WhatsApp Canlı Destek Hattı
                  </span>
                  <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
                    {info.phoneDisplay}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                    Arızanın fotoğrafını, kısa videosunu veya konumunuzu WhatsApp üzerinden göndererek hızlı arıza tespiti ve net fiyat teklifi alın.
                  </p>

                  <div className="mt-5 flex items-center gap-2 text-xs font-medium text-ink-mute">
                    <span>💬 Fotoğraf veya konum göndererek anında tespit</span>
                  </div>
                </div>

                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-6 py-4 text-base font-bold text-white shadow-lg shadow-emerald-600/25 transition-all hover:bg-[#1EBE5D] hover:shadow-xl hover:shadow-emerald-600/35"
                >
                  <span>WhatsApp&apos;tan Yazın</span>
                  <span>↗</span>
                </a>
              </div>
            </Reveal>
          </div>

          {/* 3. Kurumsal Hizmet Kapsamı ve Süreç Detayları */}
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Hizmet Kapsamı */}
            <Reveal delay={120}>
              <div className="h-full rounded-3xl border border-line bg-white p-8 shadow-sm sm:p-9">
                <div className="flex items-center gap-3">
                  <span className="grid size-9 place-items-center rounded-xl bg-copper-100 text-sm font-bold text-copper-700">
                    ✓
                  </span>
                  <h3 className="text-xl font-bold text-ink">Hizmet Kapsamımız</h3>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                  İstanbul genelinde tüm ilçe ve mahallelere <strong>7/24 kesintisiz</strong> profesyonel sıhhi tesisat, cihazla kırmadan su kaçağı tespiti ve robotla tıkanıklık açma hizmeti sunuyoruz.
                </p>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2.5 rounded-xl border border-line bg-canvas-50 p-3.5 text-xs font-semibold text-ink">
                    <span className="text-copper-600">✓</span> İstanbul Geneli Tüm İlçeler
                  </div>
                  <div className="flex items-center gap-2.5 rounded-xl border border-line bg-canvas-50 p-3.5 text-xs font-semibold text-ink">
                    <span className="text-copper-600">✓</span> 7/24 Acil Müdahale
                  </div>
                  <div className="flex items-center gap-2.5 rounded-xl border border-line bg-canvas-50 p-3.5 text-xs font-semibold text-ink">
                    <span className="text-copper-600">✓</span> Hızlı Mobil Usta Ağı
                  </div>
                  <div className="flex items-center gap-2.5 rounded-xl border border-line bg-canvas-50 p-3.5 text-xs font-semibold text-ink">
                    <span className="text-copper-600">✓</span> Kırmadan Noktasal Çözüm
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Çalışma İlkelerimiz */}
            <Reveal delay={160}>
              <div className="h-full rounded-3xl border border-line bg-white p-8 shadow-sm sm:p-9">
                <div className="flex items-center gap-3">
                  <span className="grid size-9 place-items-center rounded-xl bg-aqua-100 text-sm font-bold text-aqua-700">
                    i
                  </span>
                  <h3 className="text-xl font-bold text-ink">Kurumsal Çalışma İlkelerimiz</h3>
                </div>
                <div className="mt-5 space-y-4">
                  <div className="flex gap-3">
                    <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-canvas-200 text-xs font-bold text-ink">1</span>
                    <div>
                      <strong className="text-sm font-semibold text-ink">Önce Tespit, Sonra Müdahale</strong>
                      <p className="mt-0.5 text-xs text-ink-soft">Gereksiz kırma ve masrafların önüne geçmek için önce teknolojik cihazlarla arıza yeri netleştirilir.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-canvas-200 text-xs font-bold text-ink">2</span>
                    <div>
                      <strong className="text-sm font-semibold text-ink">Şeffaf &amp; Sabit Fiyatlandırma</strong>
                      <p className="mt-0.5 text-xs text-ink-soft">İşlem öncesinde arıza ve maliyet detayları açıkça paylaşılır; sürpriz ek ücret çıkarılmaz.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-canvas-200 text-xs font-bold text-ink">3</span>
                    <div>
                      <strong className="text-sm font-semibold text-ink">Test &amp; Garantili Teslimat</strong>
                      <p className="mt-0.5 text-xs text-ink-soft">Onarım tamamlandıktan sonra hatlar basınç testine tabi tutularak kusursuz şekilde teslim edilir.</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* 4. Harita Alanı */}
          <Reveal delay={200}>
            <div className="overflow-hidden rounded-3xl border border-line bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-line px-6 py-4">
                <h3 className="text-sm font-bold text-ink">Hizmet Kapsamı &amp; Merkez Haritası</h3>
                <span className="text-xs font-semibold text-ink-mute">İstanbul, Türkiye</span>
              </div>
              <iframe
                title="Marsak Teknik Tesisat hizmet bölgesi haritası"
                src={`https://www.google.com/maps?q=${encodeURIComponent(
                  site.address.mapsEmbedQuery,
                )}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                width={640}
                height={340}
                className="h-80 w-full border-0 sm:h-96"
              />
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
