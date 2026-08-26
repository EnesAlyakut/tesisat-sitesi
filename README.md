# Marsak Teknik Tesisat — Web Sitesi

Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 ile geliştirilmiş,
tamamen statik üretilen (SSG), yerel SEO odaklı kurumsal site.

**Tasarım dili:** aydınlık, ferah bir kâğıt zemin üzerinde teknik çizim /
mimari proje estetiği. Derin lacivert tipografi, su mavisi ve bakır vurgu.
Koyu lacivert bloklar yalnızca ritim ve odak için (kapanış CTA + footer)
kullanılır. Tüm metinler WCAG AA (4.5:1) kontrast eşiğini geçer.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # üretim derlemesi
npm start       # üretim sunucusu
```

## Yönetim paneli

Yönetim paneli `/admin/` adresindedir. Kullanıcı adı, şifre ve oturum imzalama
anahtarı `.env.local` içindeki `ADMIN_USERNAME`, `ADMIN_PASSWORD` ve
`ADMIN_SESSION_SECRET` değerleriyle yönetilir. Yayına almadan önce bu değerleri değiştirin; bu dosyayı kaynak
kontrolüne eklemeyin.

Panelde kontrol merkezi ve içerik sağlık özeti bulunur. İşletme/iletişim
bilgileri, ana sayfa slaytları ve görselleri, slayt sıralaması, ana sayfa
bölümlerinin görünürlüğü, güven şeridi ifadeleri, sık sorulan sorular ve ana
sayfa SEO ayarları yönetilebilir. Kaydedilmemiş değişiklik uyarısı ve `Ctrl+S`
kısayolu desteklenir. İçerik
`data/admin-content.json`, yüklenen görseller `public/uploads/` altında tutulur.
Bu nedenle üretim sunucusunun proje dizinine yazma izni olmalıdır. Salt-okunur
veya geçici dosya sistemli serverless ortamlarda kalıcı veritabanı/obje deposu
kullanılmalıdır.

---

## ⚠️ Yayına almadan önce yapılması gerekenler

Site, **doğrulanmamış hiçbir bilgiyi yayınlamayacak** şekilde kurgulandı.
Aşağıdaki alanlar doldurulmadan yayına alınmamalıdır.

### 1. `src/lib/site.ts` — merkezî ayar dosyası

Telefon, WhatsApp, adres ve çalışma saatleri **yalnızca burada** tanımlıdır.
Kodun hiçbir yerinde elle yazılmaz.

| Alan | Şu anki durum | Yapılacak |
|---|---|---|
| `contact.phoneDisplay` / `phoneRaw` | `0850 000 00 00` (placeholder) | Gerçek numara yazın |
| `contact.verified` | `false` | Numara doğrulanınca `true` yapın |
| `contact.whatsappRaw` | placeholder | Gerçek WhatsApp numarası (90 ile, + ve boşluksuz) |
| `url` | `https://www.marsakteknik.com` | Gerçek alan adınız |
| `address.*` | boş | Fiziksel adres varsa doldurup `hasPublicAddress: true` yapın |
| `analytics.ga4MeasurementId` | boş | GA4 kimliği (boşken hiçbir script yüklenmez) |
| `analytics.googleSiteVerification` | boş | Search Console doğrulama etiketi |
| `social.*` | boş | Instagram / Google İşletme bağlantıları |

> **Önemli:** `contact.verified` `false` olduğu sürece telefon numarası
> **structured data'ya yazılmaz**. Bu bilinçli bir tercihtir: Google'a
> doğrulanmamış bir numara bildirilmez. Numarayı doğruladıktan sonra
> mutlaka `true` yapın, aksi halde LocalBusiness şeması telefonsuz kalır.

### 2. Gerçek içerik girilecek alanlar

| Dosya | İçerik | Boşken ne oluyor? |
|---|---|---|
| `src/data/cases.ts` | Yapılan işler | "Henüz yayınlanmadı" durumu gösterilir |
| `src/data/reviews.ts` | Müşteri yorumları | Boş durum + schema'ya **AggregateRating eklenmez** |
| `src/data/equipment.ts` | Cihaz fotoğrafları (`image` alanı) | Teknik çizim yer tutucusu gösterilir |

**Uydurma yorum, puan, proje sayısı, sertifika veya garanti süresi
eklenmemelidir.** Veri dosyalarındaki şablonları kopyalayarak gerçek
kayıtları girin.

### 3. Yasal metinler

`src/app/(yasal)/` altındaki KVKK, gizlilik ve çerez metinleri genel
bilgilendirme amaçlıdır. Veri sorumlusu unvanı, adresi ve e-postası
eklenmeli, metinler hukuki kontrolden geçirilmelidir.

---

## Proje yapısı

```
src/
├── app/
│   ├── layout.tsx              Kök düzen, font, schema, GA4
│   ├── page.tsx                Ana sayfa
│   ├── globals.css             Tasarım sistemi (renk, tipografi, yardımcılar)
│   ├── story.css               Scroll animasyonunun tüm CSS'i
│   ├── opengraph-image.tsx     Varsayılan OG görseli (build'de PNG üretilir)
│   ├── robots.ts / sitemap.ts
│   ├── [bolge]/                Bölge SEO sayfaları (kök seviyede temiz URL)
│   ├── hizmetler/[slug]/       13 hizmet landing page
│   ├── blog/[slug]/            Blog + kategori sayfaları
│   ├── yaptigimiz-isler/[slug]/
│   └── (yasal)/                KVKK, gizlilik, çerez
├── components/
│   ├── story/                  ⭐ Scroll kontrollü ev + tesisat animasyonu
│   ├── sections/               Sayfa bölümleri
│   ├── ui/                     Yeniden kullanılabilir arayüz parçaları
│   ├── layout/                 Header, Footer, mobil iletişim çubuğu
│   └── icons/
├── data/                       Tüm içerik (hizmet, bölge, blog, cihaz...)
└── lib/                        site.ts (ayarlar), seo.ts, schema.ts, nav.ts
```

---

## Tasarım sistemi

Renk, tipografi ve yüzey tanımlarının tamamı `src/app/globals.css` içindeki
`@theme` bloğundadır. Bileşenlerde sabit renk yazılmaz.

| Rol | Token | Kullanım |
|---|---|---|
| Sayfa zemini | `canvas-100` | `#f8fafc` — ana zemin |
| Kart / yüzey | `canvas-50` | beyaz kartlar (`.card`) |
| Alternatif alan | `canvas-200` / `canvas-300` | görsel yer tutucu, ikincil bloklar |
| Metin | `ink` | `#0d1b2c` derin lacivert |
| Koyu blok | `navy-900` | kapanış CTA'sı ve footer |
| Su | `aqua-*` | akış, bağlantılar, vurgular |
| Bakır | `copper-*` | borular, eyebrow etiketleri, birincil buton |
| Çizgi | `line`, `line-strong` | kenarlıklar |

Ortak sınıflar: `.card` / `.card-hover` (yüzey + gölge + hover),
`.eyebrow` (bölüm üst etiketi), `.blueprint-grid` (açık zemin ızgarası),
`.blueprint-grid-dark` (koyu bloklarda), `.btn-flow` (butonda su geçişi).

**Kontrast:** metin opaklıkları WCAG AA eşiğine göre ayarlanmıştır. Yeni
metin eklerken `text-ink/72` (gövde), `text-ink/66` (ikincil) ve
`text-ink/62` (en soluk) sınırlarının altına inmeyin — daha düşük
opaklıklar 4.5:1 eşiğini geçemiyor.

Koyu bloklarda (`navy-900`) karşılıkları: `text-white`, `text-white/70`,
`text-white/65`; eyebrow için `.eyebrow.eyebrow-on-dark`.

---

## Ana sayfa sahnesi: video mu, çizim mi?

Sahne kaynağı `src/components/story/ScrollStory.tsx` içindeki tek bir
sabitle seçilir:

```ts
const SAHNE: "video" | "cizim" = "cizim";
```

| Değer | Ne olur? |
|---|---|
| `"cizim"` | **(aktif)** İki katlı villa kesiti + tesisat animasyonu |
| `"video"` | `public/video/marsak-tanitim.mp4` scroll ile sarılır |

### Sahne yerleşimi ve tempo

- **Ölçü:** masaüstünde sahne `lg:left-[26%] lg:right-[-1%]` alanını kaplar,
  panel `26rem` ile sınırlıdır. Ev ekranda **727×507 px** çizilir
  (ilk kompozisyona göre **%34 daha büyük**).
- **Sonda bekleme:** `useScrollProgress`'e verilen `hold: 0.18` sayesinde
  animasyon scroll mesafesinin **%82**'sinde tamamlanır; kalan **%18**
  boyunca bitmiş ev ekranda kalır, ardından bölüm doğal olarak yukarı kayar.
  Scroll mesafesi bunu telafi edecek şekilde `--scene-vh: 950` yapıldı
  (950 × 0.82 ≈ 780vh animasyon + ~170vh bekleme).
- **Geçişler:** panel açılış/kapanış payı `0.018`'e indirildi ve paneller
  0.008 birim bindirmeli çalışır — böylece geçiş anında ekranda metinsiz
  boşluk oluşmaz (0 → 1 aralığı 0.005 adımlarla tarandı, boşluk yok).

**Video moduna dair kurallar:**

- Video **kendi kendine oynamaz.** `currentTime = ilerleme × süre` ile
  scroll pozisyonuna bağlıdır; yukarı kaydırınca geri sarar.
- **Sesi her koşulda kapalıdır** (`muted`). Kontrol arayüzü yoktur,
  `playsInline` ile mobilde tam ekrana geçmez.
- Video yüklenemezse (`error` olayı) sahne **otomatik olarak SVG çizime
  düşer** — hero asla boş kalmaz.
- `prefers-reduced-motion: reduce` veya düşük performanslı cihazda video
  hiç kullanılmaz; sade çizim sürümü gösterilir.
- Metin panelleri video modunda her ekranda yarı saydam beyaz kart
  üzerinde durur; videonun koyu kareleri okunurluğu bozmaz. En kötü
  senaryoda (kartın arkasında tamamen siyah kare) kontrast: H1 15.2,
  gövde 6.5, eyebrow 4.9 — hepsi AA eşiğinin üzerinde.

### Videoyu değiştirmek

Yeni dosyayı `public/video/marsak-tanitim.mp4` olarak koymanız yeterli.

**Sarma akıcılığı anahtar kare (keyframe) sıklığına bağlıdır.** Mevcut
dosyada 10 saniyede yalnızca 4 anahtar kare var; ölçülen arama süresi
ortalama 21 ms, en kötü 48 ms (dosya tamamen önbelleğe alındığı için
kabul edilebilir). Kusursuz kare kare sarma isterseniz videoyu her kareyi
anahtar kare yapacak şekilde yeniden kodlayın:

```bash
ffmpeg -i kaynak.mp4 -an -vf "scale=1280:-2,fps=24" -c:v libx264 -preset slow -crf 24 -g 1 -pix_fmt yuv420p -movflags +faststart public/video/marsak-tanitim.mp4
```

`-g 1` her kareyi anahtar kare yapar, `-an` ses izini atar (zaten sessiz
oynatılıyor). Dosya birkaç kat büyür; 1280×720 / 10 sn için ~8–15 MB
beklenir. Uzun videolarda çözünürlüğü düşürmek gerekebilir.

Videonun teknik bilgisi: 1280×720, 24 fps, 10.0 sn, H.264 + AAC, 2.7 MB,
`moov` atomu `mdat`tan önce (faststart — aramaya uygun).

---

## Ana sayfa animasyonu nasıl çalışıyor?

`src/components/story/` — GSAP veya Three.js **kullanılmadı**; harici
animasyon bağımlılığı yok.

**Çalışma prensibi:**

1. `useScrollProgress` sarmalayıcının scroll pozisyonundan `0 → 1` arası
   deterministik bir ilerleme üretir (`requestAnimationFrame` içinde ölçülür).
2. Bu değer **her karede tek bir DOM yazımı** ile `--p` CSS değişkenine
   yazılır. React yeniden render edilmez.
3. SVG'deki her öge kendi zaman penceresini (`win()` / `window2()`) inline
   style ile alır; CSS bundan yerel ilerlemesini (`--lp`) hesaplar.
4. Animasyon yalnızca `transform`, `opacity` ve `stroke-dashoffset`
   üzerinden çalışır — layout'u etkileyen hiçbir özellik değişmez.

Böylece animasyon **scroll'un kontrolündedir**: yukarı kaydırınca geri sarar,
`progress 0.60` her zaman aynı kareyi gösterir. Video kullanılmaz.

**Aşamalar** (`stages.ts`):

| İlerleme | Sahne |
|---|---|
| 0.00–0.08 | Arazi ve doğal zemin + H1 ve CTA |
| 0.08–0.20 | **Evin inşası** — aşağıdaki alt sıraya bakın |
| 0.20–0.42 | **Tesisatın döşenmesi** — aşağıdaki alt sıraya bakın |
| 0.42–0.54 | Soğuk su (mavi) ve sıcak su (turuncu) akışı |
| 0.54–0.65 | Su kaçağı → termal tarama → kaçak noktası tespiti |
| 0.65–0.76 | Pis su kolonu, sifonlar, tıkanıklık → robot spiral |
| 0.76–0.84 | Boru içi kamera + cihaz ekranı |
| 0.84–0.92 | Onarım ve kontrol adımları |
| 0.92–1.00 | Kamera geri çekilir, sistem çalışır durumda |

Giriş paneli (H1 + CTA) ev çizilirken de ekranda kalır; böylece hikâyede
metinsiz boşluk oluşmaz ve CTA erken kaybolmaz.

**Evin inşa sırası (0.08 – 0.20)** — gerçek bir mimari kesit projesinin
sırasıyla aynıdır:

| İlerleme | Ne oluyor? |
|---|---|
| 0.04–0.09 | Doğal zemin kotu ve toprak taraması |
| 0.06–0.10 | Temel tabanı ve temel duvarları (beton taraması) |
| 0.08–0.11 | Blokaj (çakıl dolgu) |
| 0.09–0.13 | Zemin kat döşemesi |
| 0.11–0.15 | Dış duvarlar (çift çizgi kesit) |
| 0.13–0.16 | Kat döşemesi ve üst kat tavanı |
| 0.15–0.20 | Çatı makası, kiremit dokusu, mahya, baca |
| 0.19–0.23 | İç bölmeler ve tesisat şaftı |
| 0.20–0.23 | Merdiven (12 basamak, rıht/basış oranlı) |
| 0.21–0.24 | Doğramalar: 4 pencere, denizlik, kayıt |
| 0.21–0.26 | Donatım: duş, lavabo, klozet, evye, kombi, yatak |
| 0.24–0.27 | Kot işaretleri (±0.00 / +3.00 / mahya) |

**Tesisat döşeme sırası (0.20 – 0.42)** — gerçek bir konut tesisatının
montaj sırasıyla aynıdır:

| İlerleme | Ne oluyor? |
|---|---|
| 0.20–0.24 | Şebeke girişi: en kalın ana boru sokaktan eve giriyor |
| 0.23–0.26 | Su sayacı yerine oturuyor (ibresi dönüyor) |
| 0.25–0.27 | Ana kesme vanası takılıyor |
| 0.27–0.31 | Kolon: şaft içinde dikey hat yükseliyor |
| 0.30–0.33 | Kolektör (dağıtım manifoldu) |
| 0.32–0.36 | Soğuk su ana hattı kolektörden mutfağa uzanıyor |
| 0.34–0.39 | Armatür inişleri (duş, lavabo, klozet, evye) |
| 0.37–0.39 | Kombi soğuk su beslemesi |
| 0.39–0.41 | Sıcak su ana hattı kombiden geriye dönüyor |
| 0.40–0.43 | Sıcak su inişleri + dirsek bağlantıları |

Boru çapları gerçekteki gibi kademeli küçülür:
ana giriş **10px** → kolon **8px** → ana hat **6px** → iniş **4.25px**.
Soğuk inişler sıcak hattı kestiği noktada, teknik çizimlerdeki gibi
küçük **köprü yayı** ile geçer.

**Mobil:** ayrı ve daha sade bir SVG kompozisyonu (`HouseSceneMobile`),
ayrı ve kompakt bir geniş-alçak kesit (viewBox 400×348) kullanır; böylece
sahne ekranın üst bölgesinde kalır, metin paneli altı kullanır ve ikisi
hiçbir aşamada çakışmaz. Scroll mesafesi 780vh → 500vh.

**Animasyon üç durumda sade sürüme düşer ve içerik asla kaybolmaz:**

- `prefers-reduced-motion: reduce` (saf CSS ile, ilk boyamada)
- Düşük performanslı cihaz (≤4 çekirdek veya ≤4 GB bellek)
- JavaScript kapalı (`<noscript>` ile)

Sade sürümde sahne sabitlenmez; sekiz aşamanın tamamı normal akışta,
tam görünür şekilde listelenir. Tüm SEO metinleri her koşulda gerçek
HTML olarak DOM'da bulunur.

---

## SEO

- Her sayfada tek `<h1>`, doğru H2/H3 hiyerarşisi
- Benzersiz title + meta description, canonical URL, Open Graph, Twitter Card
- `robots.txt` ve `sitemap.xml` veriden otomatik üretilir
- Breadcrumb (görünür + `BreadcrumbList` schema)
- `Organization`, `Plumber`/`LocalBusiness`, `WebSite`, `Service`,
  `FAQPage`, `Article` structured data
- Topic cluster: bölge hub sayfaları ↔ alt sayfalar ↔ hizmet sayfaları
  karşılıklı iç link ile bağlı
- `trailingSlash: true` — tek URL sürümü
- 301 altyapısı `next.config.mjs` içindeki `redirects()` fonksiyonunda

**Bölge sayfaları** kök seviyede temiz URL alır:
`/gokturk-su-tesisatcisi/`, `/gokturk-su-kacagi-tespiti/`,
`/gokturk-tikaniklik-acma/` ve Arnavutköy karşılıkları.

Mahalle sayfaları **otomatik üretilmez**. `src/data/regions.ts` içindeki
`neighborhoods` listesi altyapıyı hazır tutar; gerçek içerik yazıldığında
sayfa açılabilir. Birbirinin kopyası mahalle sayfaları oluşturulmamalıdır.

Yeni bölge eklemek için `districts` içinde `active: true` yapın ve
`locationPages`'e gerçek içerikli bir kayıt ekleyin.

---

## İçerik ekleme

Tüm içerik `src/data/` altındaki TypeScript dosyalarında tutulur; tipler
zorunludur, eksik alan derlemede hata verir.

| Ne eklenecek? | Dosya |
|---|---|
| Yeni hizmet | `services.ts` → sayfa + sitemap + menü otomatik oluşur |
| Yeni bölge | `regions.ts` |
| Blog yazısı | `blog.ts` |
| Yapılan iş | `cases.ts` (öncesi/sonrası görsel desteği var) |
| Müşteri yorumu | `reviews.ts` |
| Cihaz | `equipment.ts` |

---

## İletişim formu

`src/components/sections/ContactForm.tsx` — backend hazır olana kadar form,
girilen bilgileri düzenli bir metne çevirip WhatsApp üzerinden gönderir;
hiçbir talep kaybolmaz. Sunucu tarafı bir uç nokta eklendiğinde form
doğrudan POST edecek şekilde uyarlanabilir.

---

## Erişilebilirlik

Klavye navigasyonu, görünür odak halkaları, "İçeriğe geç" bağlantısı,
ARIA etiketleri, semantik HTML, form label'ları, SSS için native
`<details>`/`<summary>`, `prefers-reduced-motion` desteği.
Animasyon hiçbir koşulda içeriği gizlemez.

---

## Performans

- Tüm sayfalar statik üretilir (SSG)
- Harici animasyon kütüphanesi yok
- Font: Inter, `display: swap`, yalnızca kullanılan 4 ağırlık,
  latin + latin-ext (Türkçe karakterler)
- Animasyonda karede tek DOM yazımı; layout thrashing yok
- Görsellerde AVIF/WebP, responsive `sizes`, `width`/`height` tanımlı (CLS)
- GA4 yalnızca kimlik girildiğinde yüklenir
