import type { ContentBlock, FaqItem } from "./types";

export interface District {
  slug: string;
  name: string;
  /** Ust bolge - schema areaServed icin. */
  parent: string;
  /** Aktif hizmet veriliyor mu? Yayin listesini bu belirler. */
  active: boolean;
  /**
   * Mahalle listesi. Mahalle landing sayfalari otomatik uretilmez;
   * `page` alani doldurulan mahalleler icin ileride sayfa acilabilir.
   */
  neighborhoods: string[];
}

export const districts: District[] = [
  {
    slug: "gokturk",
    name: "Göktürk",
    parent: "Eyüpsultan, İstanbul",
    active: true,
    neighborhoods: ["Göktürk Merkez", "Mithatpaşa", "Kemerburgaz yolu çevresi"],
  },
  {
    slug: "arnavutkoy",
    name: "Arnavutköy",
    parent: "İstanbul",
    active: true,
    neighborhoods: [
      "Anadolu Mahallesi",
      "Bolluca",
      "Taşoluk",
      "Nenehatun",
      "Hadımköy",
      "Boğazköy",
      "Haraççı",
      "Karlıbayır",
      "Yavuz Selim",
    ],
  },
  // Isletme gercekten hizmet vermeye basladiginda `active: true` yapin.
  { slug: "kemerburgaz", name: "Kemerburgaz", parent: "Eyüpsultan, İstanbul", active: false, neighborhoods: [] },
  { slug: "eyupsultan", name: "Eyüpsultan", parent: "İstanbul", active: false, neighborhoods: [] },
  { slug: "basaksehir", name: "Başakşehir", parent: "İstanbul", active: false, neighborhoods: [] },
];

export const activeDistricts = districts.filter((d) => d.active);

export interface LocationPage {
  slug: string;
  district: string;
  /** Bolgenin ana sayfasi mi (hub), yoksa alt hizmet sayfasi mi? */
  isHub: boolean;
  title: string;
  navTitle: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  blocks: ContentBlock[];
  faq: FaqItem[];
  /** Bu sayfadan link verilecek hizmet slug'lari. */
  services: string[];
  /** Ayni kume icindeki diger bolge sayfalari. */
  siblings: string[];
}

export const locationPages: LocationPage[] = [
  /* ---------------------------------------------------------------- GÖKTÜRK */
  {
    slug: "gokturk-su-tesisatcisi",
    district: "gokturk",
    isHub: true,
    title: "Göktürk Su Tesisatçısı",
    navTitle: "Göktürk Su Tesisatçısı",
    metaTitle: "Göktürk Su Tesisatçısı | Marsak Teknik Tesisat",
    metaDescription:
      "Göktürk su tesisatçısı: kırmadan su kaçağı tespiti, tıkanıklık açma, kameralı gider görüntüleme ve 7/24 acil tesisat hizmetleri.",
    h1: "Göktürk Su Tesisatçısı",
    intro:
      "Göktürk ve çevresinde su tesisatı, kaçak tespiti ve gider tıkanıklığı problemlerinde cihaz destekli çözümler sunuyoruz. Bölgedeki villa ve site yapılarında sık karşılaşılan tesisat sorunlarını yakından biliyoruz.",
    blocks: [
      {
        heading: "Göktürk'te verdiğimiz tesisat hizmetleri",
        body: [
          "Konut, villa ve iş yerlerinde temiz su ve atık su hatlarının tamamında çalışıyoruz. Problemin türüne göre uygun cihazı seçerek müdahale ediyoruz.",
        ],
        bullets: [
          "Su kaçağı tespiti ve kırmadan kaçak tespiti",
          "Lavabo, tuvalet ve gider tıkanıklığı açma",
          "Robotla tıkanıklık açma ve kolon hattı temizliği",
          "Kameralı gider görüntüleme",
          "Su tesisatı tamiri ve boru yenileme",
          "Banyo ve mutfak tesisatı, armatür montajı",
          "7/24 acil tesisat müdahalesi",
        ],
      },
      {
        heading: "Göktürk'te sık karşılaştığımız tesisat sorunları",
        body: [
          "Göktürk büyük ölçüde müstakil villa ve site yapılaşmasından oluşur. Bu yapı tipi, apartman dairelerinden farklı tesisat sorunları getirir.",
          "Bahçeli yapılarda dış gider hatlarına ağaç kökü girişi, geniş metrekareli konutlarda uzun boru güzergâhları nedeniyle kaçak noktasının belirlenmesindeki zorluk ve yerden ısıtmalı zeminlerde kaplama koruma ihtiyacı öne çıkan başlıklardır.",
          "Bu nedenle Göktürk'teki çalışmalarımızda kırmadan tespit yaklaşımı ve kameralı hat kontrolü özellikle önem taşıyor.",
        ],
      },
      {
        heading: "Villa ve site tesisatlarında yaklaşımımız",
        body: [
          "Doğal taş, seramik ve parke gibi yenilenmesi zor kaplamaların bulunduğu yapılarda rastgele kırım yapmak ciddi ek maliyet doğurur.",
          "Bu tür yapılarda önce termal kamera, akustik dinleme ve nem ölçümüyle kaçağın konumunu daraltıyor, ardından belirlenen tek noktada kontrollü müdahale planlıyoruz.",
        ],
      },
      {
        heading: "Göktürk'te hizmet verdiğimiz alanlar",
        body: [
          "Göktürk merkez ve çevresindeki site, villa ve konut bölgelerinde çalışıyoruz. Konumunuzu telefonda paylaştığınızda ulaşım durumu hakkında bilgi verebiliriz.",
        ],
      },
    ],
    faq: [
      {
        q: "Göktürk'te acil tesisat hizmeti veriyor musunuz?",
        a: "Evet, acil tesisat problemleri için mesai saatleri dışında da ulaşabilirsiniz. Varış süresi konuma, trafiğe ve o andaki iş yoğunluğuna göre değişir.",
      },
      {
        q: "Villa bahçesindeki gider hattına müdahale ediliyor mu?",
        a: "Evet. Bahçe ve rögar hatlarında robot spiral ile temizlik yapılabilir. Kök girişi şüphesi varsa öncesinde kameralı görüntüleme öneriyoruz.",
      },
      {
        q: "Yerden ısıtmalı zeminde kaçak tespiti mümkün mü?",
        a: "Yerden ısıtma hatlarında termal kamera etkili bir yöntemdir, çünkü sıcaklık farkı belirgindir. Tespit kırım yapılmadan yürütülür; onarım için hedeflenen noktada sınırlı bir açma gerekebilir.",
      },
    ],
    services: [
      "su-kacagi-tespiti",
      "kirmadan-su-kacagi-tespiti",
      "tikaniklik-acma",
      "robotla-tikaniklik-acma",
      "kamerali-gider-goruntuleme",
      "su-tesisati-tamiri",
      "banyo-mutfak-tesisati",
      "acil-tesisatci",
    ],
    siblings: ["gokturk-su-kacagi-tespiti", "gokturk-tikaniklik-acma"],
  },
  {
    slug: "gokturk-su-kacagi-tespiti",
    district: "gokturk",
    isHub: false,
    title: "Göktürk Su Kaçağı Tespiti",
    navTitle: "Göktürk Su Kaçağı Tespiti",
    metaTitle: "Göktürk Su Kaçağı Tespiti | Kırmadan Tespit | Marsak Teknik",
    metaDescription:
      "Göktürk su kaçağı tespiti: termal kamera ve akustik dinleme ile kırmadan kaçak tespiti. Villa ve site tesisatlarında cihaz destekli çalışma.",
    h1: "Göktürk Su Kaçağı Tespiti",
    intro:
      "Göktürk'te su kaçağı şikâyetlerinde önceliğimiz, duvarı veya zemini rastgele açmadan kaçağın konumunu daraltmak. Bölgedeki yapıların kaplama kalitesi düşünüldüğünde bu yaklaşım hem zaman hem maliyet açısından belirleyici oluyor.",
    blocks: [
      {
        heading: "Hangi belirtilerde aramalısınız?",
        body: [
          "Aşağıdaki durumlardan biri varsa tesisat hattınızda kaçak olma ihtimali vardır.",
        ],
        bullets: [
          "Musluklar kapalıyken su sayacının dönmeye devam etmesi",
          "Kombi basıncının sürekli düşmesi",
          "Duvar, tavan veya süpürgelik dibinde nem lekesi ve kabarma",
          "Zeminde açıklanamayan sıcaklık farkı",
          "Su faturasında belirgin artış",
          "Bahçe veya garaj zemininde kurumayan ıslaklık",
        ],
      },
      {
        heading: "Göktürk'te kaçak tespitinde izlediğimiz yöntem",
        body: [
          "Tek bir cihaza bağlı kalmıyor, hattın durumuna göre yöntem seçiyoruz.",
        ],
        bullets: [
          "Basınç testi ile hatta kaçak olup olmadığının doğrulanması",
          "Termal kamera ile sıcaklık farklarının incelenmesi",
          "Akustik dinleme cihazı ile kaçak sesinin takip edilmesi",
          "Nem ölçüm cihazı ile ıslak alan sınırlarının belirlenmesi",
          "Tespit sonucunun ve önerilen müdahalenin paylaşılması",
        ],
      },
      {
        heading: "Neden Göktürk'te kırmadan tespit önemli?",
        body: [
          "Bölgedeki konutlarda genellikle doğal taş, büyük ebatlı seramik veya masif parke gibi yenilenmesi zor kaplamalar bulunur. Kaçağın yeri bilinmeden yapılan kırım işlemi, tesisat maliyetinin çok üzerinde bir kaplama yenileme masrafı doğurabilir.",
          "Bu nedenle Göktürk çalışmalarımızda önce ölçüm, sonra hedefli müdahale sırasını izliyoruz.",
        ],
      },
    ],
    faq: [
      {
        q: "Göktürk'te kaçak tespiti sonrası onarım da yapıyor musunuz?",
        a: "Evet. Tespit sonrası boru onarımı, hat yenileme ve kontrol işlemleri tarafımızdan yapılabilir. Kapsam, kaçağın konumuna göre belirlenir.",
      },
      {
        q: "Kombi basıncı düşüyor ama ıslaklık yok, kaçak olabilir mi?",
        a: "Evet. Kapalı devre ısıtma hattındaki kaçaklar zemin altında olduğu için yüzeyde her zaman ıslaklık oluşturmaz. Bu durumda basınç testi ve termal görüntüleme birlikte kullanılır.",
      },
    ],
    services: ["su-kacagi-tespiti", "kirmadan-su-kacagi-tespiti", "su-tesisati-tamiri", "petek-temizligi"],
    siblings: ["gokturk-su-tesisatcisi", "gokturk-tikaniklik-acma"],
  },
  {
    slug: "gokturk-tikaniklik-acma",
    district: "gokturk",
    isHub: false,
    title: "Göktürk Tıkanıklık Açma",
    navTitle: "Göktürk Tıkanıklık Açma",
    metaTitle: "Göktürk Tıkanıklık Açma | Lavabo ve Gider | Marsak Teknik",
    metaDescription:
      "Göktürk tıkanıklık açma: lavabo, tuvalet, mutfak ve bahçe gider hatlarında robot spiral ile müdahale, kameralı hat kontrolü.",
    h1: "Göktürk Tıkanıklık Açma",
    intro:
      "Göktürk'te lavabo, tuvalet, mutfak ve bahçe gider hatlarındaki tıkanıklıklara cihazlı müdahale ediyoruz. Tekrarlayan tıkanıklıklarda sorunun kaynağını görmek için kameralı kontrol öneriyoruz.",
    blocks: [
      {
        heading: "Müdahale ettiğimiz noktalar",
        body: [],
        bullets: [
          "Banyo lavabosu ve duş süzgeci tıkanıklığı",
          "Klozet ve tuvalet gideri tıkanıklığı",
          "Mutfak evyesi ve bulaşık makinesi gider hattı",
          "Yer süzgeçleri ve balkon giderleri",
          "Villa bahçe gider hatları ve rögar bağlantıları",
          "Site ve bina kolon (pimaş) hatları",
        ],
      },
      {
        heading: "Bahçeli yapılarda kök girişi",
        body: [
          "Göktürk'teki bahçeli konutlarda sık karşılaştığımız durumlardan biri, ağaç köklerinin gider hattı ek yerlerinden içeri girmesidir. Kökler zamanla boru kesitini kapatır ve tekrarlayan tıkanıklığa yol açar.",
          "Bu tür hatlarda yalnızca açma işlemi geçici çözüm olur. Kameralı görüntüleme ile kök girişinin konumu belirlendikten sonra kalıcı çözüm planlanmalıdır.",
        ],
      },
      {
        heading: "Kalıcı çözüm için",
        body: [
          "Aynı noktada tekrar eden tıkanıklık genellikle yapısal bir soruna işaret eder: boru eğiminin yetersiz olması, hatta çökme veya kırık bulunması gibi.",
          "Bu durumlarda hattın içini görmeden yapılan her müdahale tahmine dayalı kalır. Kameralı inceleme, sorunun gerçek nedenini ortaya koyar.",
        ],
      },
    ],
    faq: [
      {
        q: "Göktürk'te bahçe gider hattı temizliği yapılıyor mu?",
        a: "Evet. Bahçe ve rögar bağlantı hatlarında robot spiral ile temizlik yapılabilir. Kök girişi şüphesinde öncesinde kameralı görüntüleme öneriyoruz.",
      },
      {
        q: "Tıkanıklık kısa sürede tekrar ederse ne yapmalıyım?",
        a: "Tekrarlayan tıkanıklık yapısal bir soruna işaret edebilir. Kameralı gider görüntüleme ile hattın iç durumunun incelenmesi, kalıcı çözüm için gereklidir.",
      },
    ],
    services: ["tikaniklik-acma", "robotla-tikaniklik-acma", "kamerali-gider-goruntuleme", "pimas-gider-yikama"],
    siblings: ["gokturk-su-tesisatcisi", "gokturk-su-kacagi-tespiti"],
  },

  /* ------------------------------------------------------------- ARNAVUTKÖY */
  {
    slug: "arnavutkoy-su-tesisatcisi",
    district: "arnavutkoy",
    isHub: true,
    title: "Arnavutköy Su Tesisatçısı",
    navTitle: "Arnavutköy Su Tesisatçısı",
    metaTitle: "Arnavutköy Su Tesisatçısı | Marsak Teknik Tesisat",
    metaDescription:
      "Arnavutköy su tesisatçısı: su kaçağı tespiti, robotla tıkanıklık açma, kameralı gider görüntüleme ve 7/24 acil tesisat hizmetleri.",
    h1: "Arnavutköy Su Tesisatçısı",
    intro:
      "Arnavutköy ve mahallelerinde su tesisatı, kaçak tespiti ve tıkanıklık problemlerinde cihaz destekli hizmet veriyoruz. Bölgedeki farklı yapı tiplerine uygun yöntemlerle çalışıyoruz.",
    blocks: [
      {
        heading: "Arnavutköy'de verdiğimiz hizmetler",
        body: [
          "Konut, apartman ve iş yerlerinde temiz su ve atık su hatlarının tamamında çalışıyoruz.",
        ],
        bullets: [
          "Su kaçağı tespiti ve kırmadan kaçak tespiti",
          "Robotla tıkanıklık açma ve gider açma",
          "Kameralı gider görüntüleme",
          "Pimaş ve kolon hattı temizliği",
          "Su tesisatı tamiri ve boru yenileme",
          "Banyo ve mutfak tesisatı",
          "7/24 acil tesisat müdahalesi",
        ],
      },
      {
        heading: "Arnavutköy'de sık karşılaştığımız tesisat sorunları",
        body: [
          "Arnavutköy, yaşları birbirinden oldukça farklı yapıların bir arada bulunduğu bir bölge. Bu çeşitlilik tesisat sorunlarına da yansıyor.",
          "Eski yapılarda galvaniz boru korozyonu, düşük su basıncı ve nokta nokta delinme sık görülür. Yeni yapılan çok katlı binalarda ise kolon (pimaş) hatlarında yağ birikimi ve alt katlarda geri tepme şikâyetleri öne çıkar.",
          "Bu nedenle Arnavutköy'de çalışmaya başlamadan önce yapının yaşını ve tesisat tipini öğrenmeye önem veriyoruz.",
        ],
      },
      {
        heading: "Apartman ve site yönetimleri için",
        body: [
          "Kolon hattı tıkanıklıkları tek bir daireyi değil, bina genelini ilgilendirir. Alt katlarda geri tepme başladığında sorun genellikle ortak hattadır.",
          "Bina yönetimleri için hattın kameralı olarak incelenmesi ve mevcut duruma göre bir bakım planı konuşulması mümkündür.",
        ],
      },
      {
        heading: "Hizmet verdiğimiz mahalleler",
        body: [
          "Arnavutköy'ün farklı mahallelerinde çalışıyoruz. Konumunuzu telefonda paylaştığınızda ulaşım durumu hakkında bilgi verebiliriz.",
        ],
      },
    ],
    faq: [
      {
        q: "Arnavutköy'de hangi mahallelere geliyorsunuz?",
        a: "Arnavutköy genelinde çalışıyoruz. Konumunuzu paylaştığınızda o an için ulaşım durumu hakkında bilgi verebiliriz.",
      },
      {
        q: "Eski binalarda tesisat yenilemesi yapıyor musunuz?",
        a: "Evet. Galvaniz veya ömrünü tamamlamış hatlarda kısmi onarım yerine hat yenileme daha kalıcı sonuç verir. Mevcut durumu gördükten sonra hangi yaklaşımın uygun olduğunu belirtiyoruz.",
      },
      {
        q: "Apartman kolon hattı temizliği yapılıyor mu?",
        a: "Evet. Pimaş ve ana gider hatlarında robot spiral ile temizlik yapılabilir. Uygun durumlarda işlem sonrası kameralı kontrol öneriyoruz.",
      },
    ],
    services: [
      "su-kacagi-tespiti",
      "kirmadan-su-kacagi-tespiti",
      "tikaniklik-acma",
      "robotla-tikaniklik-acma",
      "kamerali-gider-goruntuleme",
      "pimas-gider-yikama",
      "su-tesisati-tamiri",
      "acil-tesisatci",
    ],
    siblings: ["arnavutkoy-su-kacagi-tespiti", "arnavutkoy-tikaniklik-acma"],
  },
  {
    slug: "arnavutkoy-su-kacagi-tespiti",
    district: "arnavutkoy",
    isHub: false,
    title: "Arnavutköy Su Kaçağı Tespiti",
    navTitle: "Arnavutköy Su Kaçağı Tespiti",
    metaTitle: "Arnavutköy Su Kaçağı Tespiti | Kırmadan | Marsak Teknik",
    metaDescription:
      "Arnavutköy su kaçağı tespiti: termal kamera, akustik dinleme ve basınç testi ile kırmadan kaçak tespiti ve sonrasında onarım.",
    h1: "Arnavutköy Su Kaçağı Tespiti",
    intro:
      "Arnavutköy'de su kaçağı şikâyetlerinde cihaz destekli tespit yapıyoruz. Amacımız, açılacak alanı mümkün olduğunca küçük tutarak doğru noktaya müdahale etmek.",
    blocks: [
      {
        heading: "Kaçak belirtileri",
        body: [],
        bullets: [
          "Musluklar kapalıyken su sayacının dönmesi",
          "Kombi basıncının sürekli düşmesi",
          "Duvarda nem lekesi, boya kabarması veya küf",
          "Fayans aralarında kalıcı ıslaklık",
          "Alt komşuda tavan lekesi oluşması",
          "Su faturasında açıklanamayan artış",
        ],
      },
      {
        heading: "Eski yapılarda kaçak tespiti",
        body: [
          "Arnavutköy'deki eski binalarda galvaniz boru kullanımı yaygındır. Bu borular iç yüzeyden korozyona uğrayarak zamanla nokta nokta delinir.",
          "Bu tür hatlarda tek bir kaçağın onarılması çoğu zaman kalıcı sonuç vermez; kısa süre sonra başka bir noktada arıza çıkabilir. Tespit çalışmasının ardından hattın genel durumunu da değerlendirerek, onarım mı yoksa yenileme mi gerektiğini açıkça belirtiyoruz.",
        ],
      },
      {
        heading: "Kullandığımız yöntemler",
        body: [],
        bullets: [
          "Basınç testi ile hatta kaçak olup olmadığının doğrulanması",
          "Termal kamera ile sıcaklık farkı incelemesi",
          "Akustik dinleme cihazı ile kaçak sesi takibi",
          "Nem ölçüm cihazı ile ıslak alan sınırının belirlenmesi",
        ],
      },
    ],
    faq: [
      {
        q: "Alt komşumun tavanı ıslanıyor, kaçak bizden mi?",
        a: "Her zaman değil. Su, tesisat güzergâhı ve döşeme boyunca ilerleyip beklenmedik bir noktadan görünür hale gelebilir. Kaynağın hangi daireye ait olduğu, ölçüm yapılmadan kesin olarak söylenemez.",
      },
      {
        q: "Tespit sonrası boru yenileme yapıyor musunuz?",
        a: "Evet. Hattın durumuna göre noktasal onarım veya hat yenileme yapılabilir. Hangisinin uygun olduğunu mevcut durumu gördükten sonra belirtiyoruz.",
      },
    ],
    services: ["su-kacagi-tespiti", "kirmadan-su-kacagi-tespiti", "su-tesisati-tamiri", "temiz-ve-pis-su-tesisati"],
    siblings: ["arnavutkoy-su-tesisatcisi", "arnavutkoy-tikaniklik-acma"],
  },
  {
    slug: "arnavutkoy-tikaniklik-acma",
    district: "arnavutkoy",
    isHub: false,
    title: "Arnavutköy Tıkanıklık Açma",
    navTitle: "Arnavutköy Tıkanıklık Açma",
    metaTitle: "Arnavutköy Tıkanıklık Açma | Robotla Gider Açma | Marsak Teknik",
    metaDescription:
      "Arnavutköy tıkanıklık açma: lavabo, tuvalet ve kolon hatlarında robot spiral ile müdahale, kameralı gider kontrolü.",
    h1: "Arnavutköy Tıkanıklık Açma",
    intro:
      "Arnavutköy'de lavabo, tuvalet ve gider hattı tıkanıklıklarına robot spiral ve uygun cihazlarla müdahale ediyoruz. Ortak kolon hatlarında bina geneline yönelik çalışma yapılabilir.",
    blocks: [
      {
        heading: "Müdahale ettiğimiz noktalar",
        body: [],
        bullets: [
          "Lavabo ve duş süzgeci tıkanıklığı",
          "Tuvalet ve klozet tıkanıklığı",
          "Mutfak evyesi ve makine gider hattı",
          "Yer süzgeçleri ve balkon giderleri",
          "Apartman kolon (pimaş) hatları",
          "Bina ana gider hattı ve rögar bağlantısı",
        ],
      },
      {
        heading: "Alt katlarda geri tepme oluyorsa",
        body: [
          "Çok katlı binalarda alt katlardaki giderlerden geri tepme başlıyorsa sorun genellikle tek bir dairede değil, ortak kolon hattındadır.",
          "Bu durumda yalnızca daire içindeki hatta müdahale etmek kalıcı çözüm sağlamaz. Kolon hattının uzunluğuna göre temizlik yapılması ve gerekirse kameralı kontrol edilmesi gerekir.",
        ],
      },
      {
        heading: "Tıkanıklığın nedenini de paylaşıyoruz",
        body: [
          "Açma işleminden sonra tıkanıklığın neden oluştuğu hakkında bilgi vermeye çalışıyoruz. Nedeni bilmek, aynı sorunun tekrar etmesini önlemenin en pratik yolu.",
        ],
      },
    ],
    faq: [
      {
        q: "Apartman kolon hattı için kimle görüşmeliyim?",
        a: "Kolon hattı ortak alandır ve genellikle bina yönetiminin sorumluluğundadır. Çalışma öncesinde yönetimin bilgilendirilmesi uygun olur.",
      },
      {
        q: "Kimyasal açıcı kullandım, yine de gelebilir misiniz?",
        a: "Evet, ancak lütfen bunu önceden belirtin. Hatta kimyasal bulunması çalışma sırasında ek önlem alınmasını gerektirir.",
      },
    ],
    services: ["tikaniklik-acma", "robotla-tikaniklik-acma", "pimas-gider-yikama", "kamerali-gider-goruntuleme"],
    siblings: ["arnavutkoy-su-tesisatcisi", "arnavutkoy-su-kacagi-tespiti"],
  },
];

export const getLocationPage = (slug: string) => locationPages.find((p) => p.slug === slug);
export const locationSlugs = locationPages.map((p) => p.slug);
export const hubPages = locationPages.filter((p) => p.isHub);
export const getDistrict = (slug: string) => districts.find((d) => d.slug === slug);
