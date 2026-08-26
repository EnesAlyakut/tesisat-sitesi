import type { Metadata } from "next";
import LegalPage from "../legal-content";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

const PATH = "/kvkk/";

export const metadata: Metadata = buildMetadata({
  title: "KVKK Aydınlatma Metni",
  description: `${site.name} kişisel verilerin işlenmesine ilişkin aydınlatma metni.`,
  path: PATH,
});

export default function KvkkPage() {
  return (
    <LegalPage
      title="KVKK Aydınlatma Metni"
      path={PATH}
      updated="2026-08-25"
      lead="6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında, tarafımıza ilettiğiniz kişisel verilerin nasıl işlendiğine ilişkin bilgilendirmedir."
      sections={[
        {
          heading: "Veri sorumlusu",
          paragraphs: [
            `Kişisel verileriniz, veri sorumlusu sıfatıyla ${site.legalName} tarafından aşağıda açıklanan kapsamda işlenmektedir.`,
            "Veri sorumlusuna ait açık unvan, adres ve e-posta bilgileri, işletme kayıtlarının tamamlanmasının ardından bu bölümde yayınlanacaktır.",
          ],
        },
        {
          heading: "İşlenen kişisel veriler",
          paragraphs: [
            "Hizmet talebiniz kapsamında yalnızca işin yürütülmesi için gerekli olan veriler işlenir:",
          ],
          bullets: [
            "Kimlik bilgisi: ad ve soyad",
            "İletişim bilgisi: telefon numarası ve varsa e-posta adresi",
            "Konum bilgisi: hizmetin verileceği adres veya bölge",
            "Talep bilgisi: arıza açıklaması ve tarafınızca paylaşılan görseller",
          ],
        },
        {
          heading: "İşleme amaçları",
          paragraphs: ["Kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:"],
          bullets: [
            "Hizmet talebinizin alınması ve değerlendirilmesi",
            "Sizinle iletişim kurulması ve randevu planlanması",
            "Hizmetin yerine getirilmesi ve sonrasında gerekli bilgilendirmelerin yapılması",
            "Yasal yükümlülüklerin (fatura, kayıt saklama vb.) yerine getirilmesi",
          ],
        },
        {
          heading: "Hukuki sebep",
          paragraphs: [
            "Verileriniz; sözleşmenin kurulması veya ifasıyla doğrudan ilgili olması, veri sorumlusunun hukuki yükümlülüğünü yerine getirmesi ve meşru menfaati hukuki sebeplerine dayalı olarak, KVKK'nın 5. maddesi kapsamında işlenmektedir.",
          ],
        },
        {
          heading: "Aktarım",
          paragraphs: [
            "Kişisel verileriniz, hizmetin yürütülmesi için zorunlu haller ve yasal olarak yetkili kamu kurum ve kuruluşlarına yapılan bildirimler dışında üçüncü kişilerle paylaşılmaz. Pazarlama amacıyla üçüncü taraflara aktarım yapılmaz.",
          ],
        },
        {
          heading: "Saklama süresi",
          paragraphs: [
            "Verileriniz, işlendikleri amaç için gerekli olan süre boyunca ve ilgili mevzuatta öngörülen zorunlu saklama süreleri kadar muhafaza edilir. Sürenin sona ermesinin ardından silinir, yok edilir veya anonim hale getirilir.",
          ],
        },
        {
          heading: "Haklarınız",
          paragraphs: [
            "KVKK'nın 11. maddesi uyarınca aşağıdaki haklara sahipsiniz:",
          ],
          bullets: [
            "Kişisel verilerinizin işlenip işlenmediğini öğrenme",
            "İşlenmişse buna ilişkin bilgi talep etme",
            "İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme",
            "Eksik veya yanlış işlenmişse düzeltilmesini isteme",
            "Şartların oluşması halinde silinmesini veya yok edilmesini isteme",
            "İşlemenin hukuka aykırı olması nedeniyle zarara uğramanız halinde zararın giderilmesini talep etme",
          ],
        },
        {
          heading: "Başvuru",
          paragraphs: [
            "Haklarınıza ilişkin taleplerinizi, sitede yayınlanan iletişim kanalları üzerinden tarafımıza iletebilirsiniz. Başvurunuz, talebin niteliğine göre en kısa sürede ve her hâlükârda mevzuatta öngörülen süre içinde sonuçlandırılır.",
          ],
        },
      ]}
    />
  );
}
