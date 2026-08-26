import type { Metadata } from "next";
import LegalPage from "../legal-content";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

const PATH = "/gizlilik-politikasi/";

export const metadata: Metadata = buildMetadata({
  title: "Gizlilik Politikası",
  description: `${site.name} gizlilik politikası: sitede toplanan bilgiler ve nasıl kullanıldığı.`,
  path: PATH,
});

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Gizlilik Politikası"
      path={PATH}
      updated="2026-08-25"
      lead="Bu sitede hangi bilgilerin toplandığını, bu bilgilerin ne amaçla kullanıldığını ve nasıl korunduğunu açıklar."
      sections={[
        {
          heading: "Toplanan bilgiler",
          paragraphs: [
            "Siteyi yalnızca gezinmek için kullandığınızda kimliğinizi belirleyen bir bilgi toplanmaz.",
            "Yalnızca iletişim formunu doldurduğunuzda veya bizimle telefon ya da WhatsApp üzerinden iletişime geçtiğinizde, tarafınızca paylaşılan bilgiler tarafımıza ulaşır.",
          ],
          bullets: [
            "Ad ve soyad",
            "Telefon numarası",
            "Hizmetin verileceği bölge",
            "Arıza açıklaması ve varsa paylaştığınız görseller",
          ],
        },
        {
          heading: "Bilgilerin kullanımı",
          paragraphs: [
            "Paylaştığınız bilgiler yalnızca talebinizin değerlendirilmesi, sizinle iletişim kurulması ve hizmetin yürütülmesi amacıyla kullanılır.",
            "Bilgileriniz pazarlama amacıyla üçüncü taraflara satılmaz, kiralanmaz veya devredilmez.",
          ],
        },
        {
          heading: "İletişim formu ve WhatsApp",
          paragraphs: [
            "Sitedeki iletişim formu, girdiğiniz bilgileri düzenli bir mesaj haline getirerek WhatsApp uygulaması üzerinden iletmenizi sağlar. Mesajın iletimi sırasında WhatsApp'ın kendi gizlilik koşulları geçerlidir.",
            "Bu nedenle paylaşmak istemediğiniz bilgileri forma yazmamanızı öneririz.",
          ],
        },
        {
          heading: "Ölçümleme ve analitik",
          paragraphs: [
            site.analytics.ga4MeasurementId
              ? "Sitede, ziyaretçi davranışlarını anonim olarak ölçmek amacıyla Google Analytics 4 kullanılmaktadır. Bu araç üzerinden kimliğinizi doğrudan belirleyen bir veri toplanmaz."
              : "Bu sitede şu anda herhangi bir analitik veya reklam takip aracı çalışmamaktadır. İleride bir ölçümleme aracı eklenmesi durumunda bu bölüm güncellenecektir.",
          ],
        },
        {
          heading: "Harita hizmeti",
          paragraphs: [
            "İletişim sayfasında hizmet bölgemizi göstermek için Google Haritalar gömülü olarak kullanılmaktadır. Harita yüklendiğinde tarayıcınız Google sunucularına istek gönderir ve bu sırada IP adresiniz Google tarafından işlenebilir.",
          ],
        },
        {
          heading: "Bilgi güvenliği",
          paragraphs: [
            "Site HTTPS üzerinden yayınlanır; tarayıcınız ile sunucu arasındaki iletişim şifrelenir.",
            "Tarafımıza ulaşan bilgiler yalnızca hizmetin yürütülmesi için gerekli kişilerce erişilebilir şekilde saklanır.",
          ],
        },
        {
          heading: "Değişiklikler",
          paragraphs: [
            "Bu politika zaman zaman güncellenebilir. Güncel sürüm her zaman bu sayfada yayınlanır ve sayfa sonunda son güncelleme tarihi belirtilir.",
          ],
        },
      ]}
    />
  );
}
