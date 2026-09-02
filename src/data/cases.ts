/**
 * YAPILAN İŞLER VE VAKA ANALİZLERİ
 * Marsak Teknik Tesisat tarafından sahada başarıyla tamamlanan referans işler.
 */

export interface CaseImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface CaseStudy {
  slug: string;
  title: string;
  district: string;
  service: string;
  date: string;
  problem: string;
  detection: string;
  work: string;
  result: string;
  equipment: string[];
  images: CaseImage[];
  beforeAfter?: { before: CaseImage; after: CaseImage };
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "gokturk-villa-termal-kacak-tespiti",
    title: "Göktürk – Müstakil Villa Yerden Isıtma Kaçak Tespiti & Onarımı",
    district: "gokturk",
    service: "su-kacagi-tespiti",
    date: "2026-04-10",
    problem: "Kombi bar basıncının her gün 0.5 bara düşmesi ve alt kat tavanında bölgesel sararma oluşması.",
    detection: "FLIR termal kamera ve elektro-akustik dinleme detektörü ile şap altındaki PPRC sıcak su borusu tarandı. Kaçak noktası 15 cm hassasiyetle belirlendi.",
    work: "Yalnızca kaçağın bulunduğu tek bir seramik kaldırılarak boru çatlağına ulaşıldı. Oksijen bariyerli yeni boru parçası elektro-füzyon manşon ile kaynatıldı.",
    result: "Sistem 8 bar test basıncına tabi tutularak sızdırmazlık onaylandı ve seramik alanı kapatılarak ev sahibine teslim edildi.",
    equipment: ["termal-kamera", "akustik-dinleme", "test-pompasi"],
    images: [
      { src: "/images/services/su-kacagi-tespiti.webp", alt: "Göktürk termal kamera ile su kaçağı tespiti", width: 1376, height: 768 }
    ],
  },
  {
    slug: "arnavutkoy-pimas-robotla-tikaniklik-acma",
    title: "Arnavutköy – Daire Ana Kolon Pimaş Tıkanıklığı Açma & Kamera İncelemesi",
    district: "arnavutkoy",
    service: "tikaniklik-acma",
    date: "2026-04-02",
    problem: "Bina ana kolon giderinde geri basma, mutfak ve banyo pimaşlarından atık su taşması.",
    detection: "HD endoskopik kanal görüntüleme kamerası ile pimaş içine girildi. 12. metrede inşaat harcı ve yağ tabakası kaynaklı tam tıkanıklık tespit edildi.",
    work: "Rothenberger robot spiral açma makinesi ve özel kesici uçlarla pimaş cidarına zarar vermeden kireç ve harç kalıntıları temizlendi.",
    result: "İşlem sonrası kamera ile tüm hat görüntülendi, pimaşın %100 açık olduğu raporlandı ve koku önleyici çekvalf kontrolü yapıldı.",
    equipment: ["robot-spiral", "boru-kamerasi"],
    images: [
      { src: "/images/services/tikaniklik-acma.webp", alt: "Arnavutköy robotla pimaş tıkanıklığı açma", width: 1376, height: 768 }
    ],
  },
  {
    slug: "kemerburgaz-banyo-su-sizintisi-onarimi",
    title: "Kemerburgaz – Kırmadan Akustik Dinleme ile Temiz Su Kaçağı Tamiri",
    district: "gokturk",
    service: "kirmadan-su-kacagi-tespiti",
    date: "2026-03-22",
    problem: "Daire su faturasının aşırı yüksek gelmesi ve sayaç vanası kapalıyken bile sayaç çarkının dönmesi.",
    detection: "Şebeke hattına hidrostatik basınç testi uygulandı, ardından akustik zemin mikrofonu ile banyo tesisat kolektörü arkasındaki dirsekte kaçak sesi doğrulandı.",
    work: "Banyo dolabı arkasındaki dar alanda noktasal müdahale yapılarak deforme olmuş pirinç rekor yenisiyle değiştirildi.",
    result: "Sayaç dönüşü durdu, basınç 4.5 barda sabitlendi ve su sızıntısı tamamen giderildi.",
    equipment: ["akustik-dinleme", "test-pompasi"],
    images: [
      { src: "/images/services/kamerali-gider-goruntuleme.webp", alt: "Kemerburgaz akustik dinleme cihazıyla kaçak tespiti", width: 1376, height: 768 }
    ],
  },
  {
    slug: "basaksehir-kamerali-gider-goruntuleme",
    title: "Başakşehir – Site Dairesi Pimaş Çökmesi & Kameralı Endoskopik Teşhis",
    district: "arnavutkoy",
    service: "kamerali-gider-goruntuleme",
    date: "2026-03-14",
    problem: "Sürekli tekrarlayan tuvalet tıkanması ve banyodan gelen ağır kanalizasyon kokusu.",
    detection: "30 metre kablolu renkli boru kamerasıyla yapılan görüntülemede, bina çıkışındaki 110'luk pimaş borusunun zemin oturması sebebiyle ters eğime düştüğü ve çatladığı belirlendi.",
    work: "Problemli 2 metrelik hat dış bahçe zemininden noktasal olarak açılarak 150'lik dayanıklı SN4 koruge boru ile yenilendi.",
    result: "Kamera ile kontrol edilerek suyun akış debisi test edildi, sorun kalıcı olarak çözüldü.",
    equipment: ["boru-kamerasi", "robot-spiral"],
    images: [
      { src: "/images/services/su-tesisati-tamiri.webp", alt: "Başakşehir kameralı gider görüntüleme çalışması", width: 1376, height: 768 }
    ],
  },
];

export const getCase = (slug: string) => caseStudies.find((c) => c.slug === slug);
export const casesByDistrict = (district: string) =>
  caseStudies.filter((c) => c.district === district);
export const casesByService = (service: string) =>
  caseStudies.filter((c) => c.service === service);
