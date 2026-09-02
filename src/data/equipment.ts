/**
 * EKIPMAN LISTESI
 * Sadece isletmede gercekten bulunan cihazlar listelenmelidir.
 * Bulunmayan bir cihaz varmis gibi gosterilmemeli, ilgili kayit silinmelidir.
 */
export interface Equipment {
  slug: string;
  name: string;
  /** Ne ise yarar? */
  purpose: string;
  /** Hangi durumda kullanilir? */
  useCase: string;
  /** Cihazin gercek fotografi eklendiginde doldurun (public/ altinda). */
  image?: string;
}

export const equipment: Equipment[] = [
  {
    slug: "termal-kamera",
    name: "Termal Kamera",
    image: "/images/equipment/termal-kamera.webp",
    purpose:
      "Yüzeydeki sıcaklık farklarını görüntüye dönüştürerek, tesisattan sızan sıcak veya soğuk suyun oluşturduğu izleri görünür kılar.",
    useCase:
      "Sıcak su ve ısıtma hattı kaçaklarında, yerden ısıtmalı zeminlerde ve duvarda nem lekesi olup kaynağı belirsiz olan durumlarda kullanılır.",
  },
  {
    slug: "akustik-dinleme",
    name: "Akustik Dinleme Cihazı",
    image: "/images/equipment/akustik-dinleme.webp",
    purpose:
      "Basınçlı borudan sızan suyun çıkardığı sesi yükselterek, kaçağın hangi noktada olduğunu ses şiddeti üzerinden daraltmayı sağlar.",
    useCase:
      "Basınç altındaki temiz su hatlarında, özellikle zemin ve duvar içine gömülü borularda kaçak noktasının belirlenmesinde kullanılır.",
  },
  {
    slug: "boru-ici-kamera",
    name: "Boru İçi Kamera",
    image: "/images/equipment/boru-ici-kamera.webp",
    purpose:
      "Esnek kablo üzerindeki su geçirmez kamerayla gider hattının içini gerçek zamanlı olarak görüntüler.",
    useCase:
      "Tekrarlayan tıkanıklıklarda, koku şikâyetlerinde ve boruda çatlak, çökme ya da kök girişi şüphesi olan hatlarda kullanılır.",
  },
  {
    slug: "robot-spiral",
    name: "Robot Spiral",
    image: "/images/equipment/robot-spiral.webp",
    purpose:
      "Motor gücüyle dönen esnek tel ve uç başlıkları sayesinde hat içindeki sert birikintileri parçalayarak akışı açar.",
    useCase:
      "Elle açılamayan tıkanıklıklarda, bina kolon (pimaş) hatlarında ve uzun mesafeli bahçe gider hatlarında kullanılır.",
  },
  {
    slug: "basinc-test-pompasi",
    name: "Basınç Test Pompası",
    image: "/images/equipment/basinc-test-pompasi.webp",
    purpose:
      "Tesisat hattını belirli bir basınca çıkararak basıncın sabit kalıp kalmadığını ölçer; hatta kaçak olup olmadığını gösterir.",
    useCase:
      "Yeni yapılan tesisatın kapatılmadan önce kontrolünde ve mevcut hatta kaçak olup olmadığının doğrulanmasında kullanılır.",
  },
  {
    slug: "nem-olcum",
    name: "Nem Ölçüm Cihazı",
    image: "/images/equipment/nem-olcum.webp",
    purpose:
      "Duvar, zemin ve sıva içindeki nem oranını ölçerek ıslak alanın sınırlarını ve yoğunlaştığı bölgeyi belirler.",
    useCase:
      "Kaçak tespitinde ıslaklığın yayılım yönünü anlamak ve onarım sonrası kuruma durumunu takip etmek için kullanılır.",
  },
];

export const getEquipment = (slug: string) => equipment.find((e) => e.slug === slug);
