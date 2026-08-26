import type { Metadata } from "next";

import PageHero from "@/components/ui/PageHero";
import ReviewsSection from "@/components/sections/ReviewsSection";
import ContactCta from "@/components/sections/ContactCta";
import JsonLd from "@/components/JsonLd";

import { buildMetadata, crumbs } from "@/lib/seo";
import { breadcrumbSchema, graph } from "@/lib/schema";

const trail = crumbs({ name: "Müşteri Yorumları", href: "/musteri-yorumlari/" });

export const metadata: Metadata = buildMetadata({
  title: "Müşteri Yorumları & Değerlendirmeleri | Marsak Teknik Tesisat",
  description:
    "Marsak Teknik Tesisat müşteri memnuniyeti ve gerçek hizmet değerlendirmeleri. Su kaçağı tespiti ve tıkanıklık açma referanslarımız.",
  path: "/musteri-yorumlari/",
});

export default function ReviewsPage() {
  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(trail))} />

      <PageHero
        crumbs={trail}
        eyebrow="Gerçek Müşteri Deneyimleri"
        title="Müşteri Yorumları & Memnuniyet"
        lead="İstanbul genelinde gerçekleştirdiğimiz su kaçağı tespiti, tıkanıklık açma ve tesisat tamiratı hizmetlerimiz sonrası müşterilerimizin bıraktığı değerlendirmeler."
      />

      <ReviewsSection />

      <ContactCta
        title="Bizimle çalıştınız mı?"
        body="Değerlendirmenizi paylaşmak isterseniz telefon veya WhatsApp üzerinden bize ulaşabilirsiniz."
      />
    </>
  );
}
