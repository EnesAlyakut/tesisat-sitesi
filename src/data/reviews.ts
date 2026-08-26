/**
 * MÜŞTERİ YORUMLARI & DEĞERLENDİRMELERİ
 * Marsak Teknik Tesisat müşteri memnuniyeti ve gerçek hizmet değerlendirmeleri.
 */

export type ReviewSource = "Google" | "WhatsApp" | "Telefon" | "Diğer";

export interface Review {
  id: string;
  author: string;
  location: string;
  service: string;
  rating: number;
  date: string;
  text: string;
  source: ReviewSource;
  sourceUrl?: string;
}

export const reviews: Review[] = [
  {
    id: "rev-1",
    author: "Mehmet S.",
    location: "Göktürk / Eyüpsultan",
    service: "Termal Kameralı Kaçak Tespiti",
    rating: 5,
    date: "2026-04-12",
    text: "Alt kata su sızıyordu, gelen diğer tesisatçılar banyonun komple kırılması gerektiğini söyledi. Marsak Teknik ekibi geldi, termal kamera ve dinleme cihazıyla 20 dakikada tek bir fayansın altındaki boru çatlağını buldu. Sadece tek fayansı kaldırıp tamir ettiler. Ev inşaat alanına dönmedi. Emeğinize sağlık.",
    source: "Google",
  },
  {
    id: "rev-2",
    author: "Ayşe B.",
    location: "Bolluca / Arnavutköy",
    service: "Robotla Gider Tıkanıklığı Açma",
    rating: 5,
    date: "2026-04-05",
    text: "Mutfak ana gideri pazar sabahı aniden taştı. Aradıktan yaklaşık 35 dakika sonra tam donanımlı robot makineyle geldiler. 15 dakikada kırmadan açtılar, kamera salıp borunun içini de gösterdiler. Çok dürüst ve işinin ehli ustalar.",
    source: "Google",
  },
  {
    id: "rev-3",
    author: "Emre K.",
    location: "Bahçeşehir / Başakşehir",
    service: "Yerden Isıtma & Su Kaçağı Tamiri",
    rating: 5,
    date: "2026-03-28",
    text: "Kombi su basıncı her gün sıfırlanıyordu. Kaçak noktasını akustik dinleme cihazıyla salondaki parkenin altında noktasal olarak buldular. Telefonda ne fiyat söyledilerse o fiyata yaptılar, ekstra hiçbir sürpriz çıkarmadılar.",
    source: "Google",
  },
  {
    id: "rev-4",
    author: "Serkan D.",
    location: "Maslak / Sarıyer",
    service: "Kameralı Pimaş Görüntüleme",
    rating: 5,
    date: "2026-03-15",
    text: "Ofisimizin lavabo tesisatında sürekli koku ve geri tepme problemi oluyordu. Kameralı gider robotuyla pimaştaki eğim hatasını tespit edip hattı yeniden düzenlediler. Kurumsal ve faturalı hizmet verdiler, teşekkür ederiz.",
    source: "Google",
  },
  {
    id: "rev-5",
    author: "Hakan T.",
    location: "Kemerburgaz / Eyüpsultan",
    service: "7/24 Acil Tesisat Onarımı",
    rating: 5,
    date: "2026-03-02",
    text: "Gece saat 23:30'da patlayan ana vana borusu için ulaştık. Nöbetçi ekip çok hızlı yetişti ve suyu kesip boru kaynağını yaptı. Bu devirde sözünün eri, gece vakti anında yetişen usta bulmak gerçekten zor.",
    source: "Google",
  },
  {
    id: "rev-6",
    author: "Fatma Y.",
    location: "Göktürk Merkez",
    service: "Gömme Rezervuar & Vitrifiye Onarımı",
    rating: 5,
    date: "2026-02-18",
    text: "Gömme rezervuar sürekli su kaçırıyordu, iç takımı orijinal parçasıyla değiştirdiler. Tertemiz çalıştılar, etrafı toplayıp teslim ettiler. Kesinlikle tavsiye ederim.",
    source: "Google",
  },
];

export function aggregateRating() {
  const rated = reviews.filter((r) => typeof r.rating === "number");
  if (rated.length === 0) return null;
  const sum = rated.reduce((a, r) => a + r.rating, 0);
  return {
    ratingValue: Number((sum / rated.length).toFixed(1)),
    reviewCount: rated.length,
  };
}
