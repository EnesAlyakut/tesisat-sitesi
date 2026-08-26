import type { Metadata } from "next";

import PageHero from "@/components/ui/PageHero";
import CasesSection from "@/components/sections/CasesSection";
import ContactCta from "@/components/sections/ContactCta";
import JsonLd from "@/components/JsonLd";

import { buildMetadata, crumbs } from "@/lib/seo";
import { breadcrumbSchema, graph } from "@/lib/schema";

const trail = crumbs({ name: "Yaptığımız İşler", href: "/yaptigimiz-isler/" });

export const metadata: Metadata = buildMetadata({
  title: "Yaptığımız İşler & Referans Çalışmalarımız | Marsak Teknik Tesisat",
  description:
    "İstanbul genelinde gerçekleştirdiğimiz termal kameralı su kaçağı tespiti, robotla tıkanıklık açma ve sıhhi tesisat projelerimiz.",
  path: "/yaptigimiz-isler/",
});

export default function CasesPage() {
  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(trail))} />

      <PageHero
        crumbs={trail}
        eyebrow="Saha Çalışmalarımız & Referanslar"
        title="Yaptığımız İşler ve Uygulamalar"
        lead="Ev ve iş yerlerinde en son teknoloji cihazlarla gerçekleştirdiğimiz su kaçağı tespiti, kanal açma ve tesisat yenileme çalışmalarımızdan örnekler."
      />

      <CasesSection
        heading="Tamamlanan Saha Uygulamaları"
        lead="Her projede tespit yöntemi, kullanılan cihaz ve kalıcı çözüm süreci adım adım uygulanmıştır."
      />

      <ContactCta />
    </>
  );
}
