import type { Metadata } from "next";
import Link from "next/link";

import PageHero from "@/components/ui/PageHero";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import ServiceCard from "@/components/sections/ServiceCard";
import ContactCta from "@/components/sections/ContactCta";
import EquipmentGrid from "@/components/sections/EquipmentGrid";
import JsonLd from "@/components/JsonLd";

import { getServices } from "@/lib/services-server";
import { buildMetadata, crumbs } from "@/lib/seo";
import { breadcrumbSchema, graph } from "@/lib/schema";

const trail = crumbs({ name: "Hizmetlerimiz", href: "/hizmetler/" });

export const metadata: Metadata = buildMetadata({
  title: "Tesisat Hizmetlerimiz | Kırmadan Su Kaçağı & Tıkanıklık Açma",
  description:
    "İstanbul genelinde 7/24 profesyonel su kaçağı tespiti, robot makinelerle tıkanıklık açma, kameralı gider görüntüleme, su tesisatı tamiri ve acil tesisatçı hizmetleri.",
  path: "/hizmetler/",
});

export default async function ServicesIndexPage() {
  const services = await getServices();
  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(trail))} />

      <PageHero
        crumbs={trail}
        eyebrow="Garantili & Cihaz Destekli Çözümler"
        title="Profesyonel Tesisat Hizmetlerimiz"
        lead="Temiz su, pis su ve kalorifer ısıtma hatlarında son teknoloji tespit ve açma cihazlarımızla çalışıyoruz. Kırmadan, noktasal ve garantili hizmet sağlıyoruz."
      />

      <Section>
        {/* SEO Açıklama Alanı */}
        <div className="mb-12 rounded-3xl border border-line bg-canvas-50 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-ink sm:text-2xl">
            Teknolojik Ekipmanlarla Kırmadan Profesyonel Müdahale
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft sm:text-base">
            Marsak Teknik Tesisat olarak İstanbul genelinde tüm konut, iş yeri, fabrika ve sitelere 7/24 hizmet veriyoruz.
            Eski usul tahminle kırma dökmeye son vererek; <Link href="/hizmetler/su-kacagi-tespiti/" className="font-bold text-copper-600 underline">su kaçağı tespiti</Link>, <Link href="/hizmetler/tikaniklik-acma/" className="font-bold text-copper-600 underline">robotla tıkanıklık açma</Link> ve <Link href="/hizmetler/kamerali-gider-goruntuleme/" className="font-bold text-copper-600 underline">kameralı gider görüntüleme</Link> işlemlerini milimetrik hassasiyetle tamamlıyoruz. Kurumsal çalışma prensiplerimizi incelemek için <Link href="/hakkimizda/" className="font-bold text-copper-600 underline">Hakkımızda</Link> sayfamızı ziyaret edebilir veya hemen <Link href="/iletisim/" className="font-bold text-copper-600 underline">İletişim</Link> sayfamızdan nöbetçi ustalarımıza ulaşabilirsiniz.
          </p>
        </div>

        {/* Hizmet Kartları Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.slug} delay={(i % 3) * 60}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
      </Section>

      <EquipmentGrid />

      <ContactCta
        title="Hangi hizmete ihtiyacınız olduğundan emin değil misiniz?"
        body="Şikâyetinizi bize tarif edin; hangi yöntemin ve cihazın uygun olduğunu ücretsiz değerlendirerek en doğru çözümü sunalım."
      />
    </>
  );
}
