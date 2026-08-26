import type { Metadata } from "next";
import LegalPage from "../legal-content";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

const PATH = "/cerez-politikasi/";

export const metadata: Metadata = buildMetadata({
  title: "Çerez Politikası",
  description: `${site.name} çerez politikası: sitede kullanılan çerezler ve tarayıcı ayarları.`,
  path: PATH,
});

export default function CookiePage() {
  return (
    <LegalPage
      title="Çerez Politikası"
      path={PATH}
      updated="2026-08-25"
      lead="Bu sitede hangi çerezlerin kullanıldığını ve bunları nasıl yönetebileceğinizi açıklar."
      sections={[
        {
          heading: "Çerez nedir?",
          paragraphs: [
            "Çerez, ziyaret ettiğiniz sitelerin tarayıcınıza kaydettiği küçük metin dosyalarıdır. Sitenin çalışması, tercihlerinizin hatırlanması veya ziyaretçi davranışlarının ölçülmesi gibi amaçlarla kullanılır.",
          ],
        },
        {
          heading: "Bu sitede kullanılan çerezler",
          paragraphs: [
            site.analytics.ga4MeasurementId
              ? "Sitede, ziyaretçi davranışlarını anonim olarak ölçmek amacıyla Google Analytics 4 çerezleri kullanılmaktadır. Bu çerezler kimliğinizi doğrudan belirlemez."
              : "Bu site şu anda zorunlu olmayan hiçbir çerez kullanmamaktadır. Reklam, profilleme veya üçüncü taraf takip çerezi bulunmamaktadır.",
            "İletişim sayfasındaki gömülü Google Haritalar bileşeni, yüklendiğinde Google tarafından çerez yerleştirilmesine yol açabilir. Haritayı görüntülemediğiniz sürece bu istek oluşmaz.",
          ],
        },
        {
          heading: "Çerezleri yönetme",
          paragraphs: [
            "Tarayıcınızın ayarlarından çerezleri silebilir veya engelleyebilirsiniz. Aşağıdaki adımlar çoğu tarayıcıda benzerdir:",
          ],
          bullets: [
            "Tarayıcı ayarlarını açın",
            "Gizlilik ve güvenlik bölümüne gidin",
            "Çerezler ve site verileri seçeneğini bulun",
            "Mevcut verileri silin veya çerez tercihlerinizi güncelleyin",
          ],
        },
        {
          heading: "Değişiklikler",
          paragraphs: [
            "Sitede yeni bir ölçümleme veya üçüncü taraf hizmet kullanılmaya başlandığında bu politika güncellenir ve sayfa sonundaki tarih yenilenir.",
          ],
        },
      ]}
    />
  );
}
