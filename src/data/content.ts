import type { FaqItem, IconName } from "./types";

/** Ana sayfa guven seridi - yalnizca dogrulanabilir ifadeler. */
export const trustItems = [
  "7/24 Acil Servis",
  "Cihazla Kaçak Tespiti",
  "Kırmadan Müdahale Yaklaşımı",
  "Profesyonel Ekipman",
  "İstanbul Geneli 7/24 Servis",
  "Kameralı Gider Kontrolü",
  "İşlem Öncesi Bilgilendirme",
] as const;

export interface WhyItem {
  title: string;
  body: string;
  icon: IconName;
}

export const whyMarsak: WhyItem[] = [
  {
    title: "Önce Tespit",
    body: "Gereksiz kırım işleminden önce sorunun kaynağını cihazlarla belirlemeye çalışıyoruz. Açılacak alanı mümkün olduğunca küçük tutmayı hedefliyoruz.",
    icon: "thermal",
  },
  {
    title: "Profesyonel Ekipman",
    body: "Problemin türüne uygun modern tesisat ekipmanları kullanıyoruz. Her arızaya aynı yöntemle yaklaşmıyoruz.",
    icon: "camera",
  },
  {
    title: "Açık Bilgilendirme",
    body: "İşleme başlamadan önce yapılacak müdahale ve kapsamı hakkında bilgi veriyoruz. Onayınız olmadan kapsam dışına çıkmıyoruz.",
    icon: "leak",
  },
  {
    title: "Temiz İşçilik",
    body: "Müdahale edilen alanı mümkün olduğunca kontrollü ve temiz bırakıyoruz. Çalışma alanını toparlayarak teslim ediyoruz.",
    icon: "bath",
  },
  {
    title: "Son Kontrol",
    body: "İşlem tamamlandıktan sonra hattı yeniden kontrol ederek teslim ediyoruz. Sonucu birlikte görüyoruz.",
    icon: "drain",
  },
];

export interface ProcessStep {
  no: string;
  title: string;
  body: string;
}

export const processSteps: ProcessStep[] = [
  {
    no: "01",
    title: "Bildirim & Ön Değerlendirme",
    body: "Telefon veya WhatsApp üzerinden arızayı ilettiğinizde, nöbetçi ekibimiz gereken teknolojik cihaz hazırlığını yaparak hızla yola çıkar.",
  },
  {
    no: "02",
    title: "Cihazla Noktasal Teşhis",
    body: "Termal kamera, akustik zemin dinleme veya endoskopik kamera ile arızanın tam noktası kırmadan milimetrik olarak tespit edilir.",
  },
  {
    no: "03",
    title: "Müşteri Onayı & Müdahale",
    body: "Uygulanacak işlem kapsamı ve sabit maliyet tarafınıza net olarak sunulur; onayınız alındıktan sonra kontrollü onarıma başlanır.",
  },
  {
    no: "04",
    title: "Basınç Testi & Teslimat",
    body: "Tamirat sonrası hat basınç ve sızdırmazlık testinden geçirilir, çalışma alanı toparlanarak sistem firma güvencemizle teslim edilir.",
  },
];

/** Fiyatlandirmayi belirleyen faktorler. Sabit fiyat yayinlanmaz. */
export const pricingFactors = [
  {
    title: "Arızanın türü",
    body: "Damlayan bir musluk ile zemin altındaki bir kaçak aynı işçiliği gerektirmez.",
  },
  {
    title: "Problemin bulunduğu nokta",
    body: "Boruya erişimin kolay olduğu bir hat ile duvar veya zemin içindeki bir hat farklı çalışma süresi gerektirir.",
  },
  {
    title: "Kullanılacak cihaz",
    body: "Termal kamera, akustik dinleme veya boru içi kamera gibi cihazların devreye girmesi kapsamı değiştirir.",
  },
  {
    title: "İşçilik süresi",
    body: "Çalışmanın kaç saat sürdüğü ve kaç kişiyle yapıldığı doğrudan etkilidir.",
  },
  {
    title: "Boruya erişim zorluğu",
    body: "Kaplama türü, tesisatın derinliği ve çalışma alanının darlığı süreyi uzatabilir.",
  },
  {
    title: "Kullanılacak malzeme",
    body: "Değişecek boru, armatür veya yedek parçaların cinsi maliyeti belirler.",
  },
  {
    title: "Ek onarım ihtiyacı",
    body: "Müdahale sonrası sıva, fayans veya kaplama onarımı gerekip gerekmediği kapsama dahildir.",
  },
];

/** Genel SSS - ana sayfa ve SSS bolumleri icin. */
export const generalFaq: FaqItem[] = [
  {
    q: "Göktürk'te tesisatçı ne kadar sürede gelir?",
    a: "Ulaşım süresi konuma, trafiğe ve o andaki iş yoğunluğuna göre değişir. Sabit bir süre taahhüdü vermek yerine, aradığınızda o an için gerçekçi bir tahmini varış süresi paylaşıyoruz.",
  },
  {
    q: "Su kaçağı kırmadan bulunabilir mi?",
    a: "Kaçağın tespiti çoğu durumda kırım yapılmadan, cihaz desteğiyle gerçekleştirilebilir. Onarım aşamasında ise boruya ulaşmak için belirlenen noktada sınırlı bir açma işlemi gerekebilir. Amaç, açılan alanı olabildiğince küçük tutmaktır.",
  },
  {
    q: "Termal kamera bütün kaçakları tespit eder mi?",
    a: "Hayır. Termal kamera sıcaklık farkını görüntüler ve özellikle sıcak su ile ısıtma hatlarında etkilidir. Soğuk su hatlarında veya derin gömülü tesisatlarda tek başına yeterli olmayabilir; bu durumlarda akustik dinleme, basınç testi ve nem ölçümü birlikte kullanılır.",
  },
  {
    q: "Tıkanıklık açılırken boruya zarar gelir mi?",
    a: "Doğru cihaz ve uygun çalışma şekliyle risk azaltılır. Ancak boru zaten çatlamış ya da ileri derecede yıpranmışsa mevcut hasar işlem sırasında belirgin hale gelebilir. Şüpheli durumlarda önce kameralı görüntüleme öneriyoruz.",
  },
  {
    q: "Kameralı gider görüntüleme neden yapılır?",
    a: "Tıkanıklığın veya kokunun kaynağını tahmin etmek yerine görmek için yapılır. Özellikle tekrarlayan sorunlarda hatta yapısal bir problem olup olmadığını anlamanın en doğrudan yoludur.",
  },
  {
    q: "Su kaçağı tespitinden sonra onarım yapılıyor mu?",
    a: "Evet. Tespit sonrası onarım, boru yenileme ve hattın yeniden kontrol edilmesi işlemleri tarafımızdan yapılabilir. Onarımın kapsamı kaçağın konumuna ve borunun durumuna göre belirlenir.",
  },
  {
    q: "Gece tesisat hizmeti veriliyor mu?",
    a: "Acil durumlar için mesai saatleri dışında da ulaşabilirsiniz. Müdahale imkânı, o andaki iş yoğunluğuna ve arızanın türüne göre değerlendirilir.",
  },
  {
    q: "Tesisatçı fiyatları nasıl belirleniyor?",
    a: "Ücret; arızanın türüne, problemin bulunduğu noktaya, kullanılan cihaza, işçilik süresine ve gereken malzemeye göre belirlenir. Bu nedenle görmeden sabit fiyat vermiyoruz. Sorunu telefonda anlattığınızda kapsam hakkında bilgi verebiliriz.",
  },
];
