import type { Metadata } from "next";

import PageHero from "@/components/ui/PageHero";
import Section from "@/components/ui/Section";
import ServiceAreas from "@/components/sections/ServiceAreas";
import ContactCta from "@/components/sections/ContactCta";
import Reveal from "@/components/ui/Reveal";
import JsonLd from "@/components/JsonLd";

import { districts } from "@/data/regions";
import { buildMetadata, crumbs } from "@/lib/seo";
import { breadcrumbSchema, graph } from "@/lib/schema";

const trail = crumbs({ name: "Hizmet Bölgelerimiz", href: "/hizmet-bolgelerimiz/" });

export const metadata: Metadata = buildMetadata({
  title: "Hizmet Bölgelerimiz",
  description:
    "Göktürk ve Arnavutköy başta olmak üzere hizmet verdiğimiz bölgeler ve bu bölgelerdeki tesisat hizmetlerimiz.",
  path: "/hizmet-bolgelerimiz/",
});

export default function ServiceAreasPage() {
  const planned = districts.filter((d) => !d.active);

  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(trail))} />

      <PageHero
        crumbs={trail}
        eyebrow="Çalışma alanımız"
        title="Hizmet Bölgelerimiz"
        lead="Öncelikli çalışma alanlarımız Göktürk ve Arnavutköy. Bu bölgelerde su tesisatı, kaçak tespiti ve tıkanıklık açma hizmetleri veriyoruz."
      />

      <ServiceAreas />

      {planned.length > 0 && (
        <Section
          divider
          eyebrow="Genişleyen Hizmet Ağı"
          title="İstanbul Geneli Mobil Hizmet Bölgelerimiz"
          lead="Göktürk ve Arnavutköy merkezli acil mobil servis araçlarımızla İstanbul Avrupa Yakası'nın tüm ilçe ve mahallelerine 7/24 hizmet sağlıyoruz."
        >
          <Reveal>
            <ul className="flex flex-wrap gap-2.5">
              {planned.map((d) => (
                <li
                  key={d.slug}
                  className="chip border-line-strong text-ink font-medium hover:border-copper-400 transition-colors"
                >
                  {d.name}
                </li>
              ))}
            </ul>
            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-ink-soft">
              Listenin dışındaki tüm ilçe ve semtler için nöbetçi mobil ekibimizle görüşebilir, bulunduğunuz konuma göre en hızlı ulaşım süresi ve servis durumu hakkında anında bilgi alabilirsiniz.
            </p>
          </Reveal>
        </Section>
      )}

      <ContactCta />
    </>
  );
}
