import type { Metadata } from "next";
import LegalPage, { LegalSection } from "../legal-content";
import { site } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Kullanım Koşulları",
  description: `${site.name} web sitesi kullanım koşulları, hak ve yükümlülükler.`,
  path: "/kullanim-kosullari/",
});

const sections: LegalSection[] = [
  {
    heading: "1. Genel Hükümler",
    paragraphs: [
      `Bu web sitesini (${site.url}) ziyaret ederek ve kullanarak aşağıdaki koşulları peşinen kabul etmiş sayılırsınız.`,
      `${site.name}, sitede yer alan tüm bilgileri, görsel ve içerikleri önceden bildirmeksizin değiştirme veya güncelleme hakkını saklı tutar.`,
    ],
  },
  {
    heading: "2. Hizmet Tanımı ve Bilgilendirme",
    paragraphs: [
      "Sitede yer alan hizmet açıklamaları, fiyat aralıkları ve süre tahminleri genel bilgilendirme amaçlıdır. Nihai hizmet kapsamı ve fiyat teklifi yerinde inceleme veya telefonla teyit sonrası netleşir.",
    ],
  },
  {
    heading: "3. Fikri Mülkiyet Hakları",
    paragraphs: [
      "Web sitesindeki tüm metinler, logolar, grafikler ve yazılımlar Marsak Teknik Tesisat'a aittir ve telif hakları mevzuatı ile korunmaktadır. İzinsiz kopyalanamaz, çoğaltılamaz veya ticari amaçla kullanılamaz.",
    ],
  },
  {
    heading: "4. Sorumluluk Sınırları",
    paragraphs: [
      "Web sitesinin kesintisiz veya hatasız çalışacağı garanti edilmez. Sitedeki bilgilerin kullanımından doğabilecek dolaylı veya dolaysız zararlardan site yönetimi sorumlu tutulamaz.",
    ],
  },
  {
    heading: "5. İletişim",
    paragraphs: [
      `Kullanım koşulları ile ilgili sorularınız için ${site.contact.email || "info@marsakteknik.com"} veya ${site.contact.phoneDisplay} üzerinden bize ulaşabilirsiniz.`,
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Kullanım Koşulları"
      path="/kullanim-kosullari/"
      lead="Web sitemizi kullanırken tabi olduğunuz kurallar ve yasal şartlar."
      sections={sections}
      updated="2026-08-25"
    />
  );
}
