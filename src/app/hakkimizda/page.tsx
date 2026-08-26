import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import PageHero from "@/components/ui/PageHero";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { CtaPair } from "@/components/ui/CallToAction";
import ContactCta from "@/components/sections/ContactCta";
import JsonLd from "@/components/JsonLd";

import { site } from "@/lib/site";
import { buildMetadata, crumbs } from "@/lib/seo";
import { breadcrumbSchema, graph } from "@/lib/schema";

const trail = crumbs({ name: "Hakkımızda", href: "/hakkimizda/" });

export const metadata: Metadata = buildMetadata({
  title: "Kurumsal Profil & Hakkımızda | Marsak Teknik Tesisat",
  description: `${site.name} kurumsal şirket profili. İstanbul genelinde termal kamera ile kırmadan su kaçağı tespiti, robotla tıkanıklık açma ve yetkili sıhhi tesisat mühendisliği çözümleri.`,
  path: "/hakkimizda/",
});

/* 4 Ana Kurumsal Uzmanlık */
const coreExpertise = [
  {
    title: "Kırmadan Cihazla Su Kaçağı Tespiti",
    href: "/hizmetler/su-kacagi-tespiti/",
    image: "/images/services/su-kacagi-tespiti.jpg",
    desc: "FLIR termal kamera ve elektro-akustik zemin dinleme cihazlarıyla boru patlaklarını tek bir seramik altında noktasal olarak tespit ediyoruz.",
    badge: "Termal & Akustik",
  },
  {
    title: "Robot Makinelerle Tıkanıklık Açma",
    href: "/hizmetler/tikaniklik-acma/",
    image: "/images/services/tikaniklik-acma.jpg",
    desc: "Rothenberger çelik helezon robot spiral makinelerle lavabo, tuvalet, ana kolon ve pimaş hatlarını kırmadan açıyoruz.",
    badge: "Robot Spiral",
  },
  {
    title: "HD Kameralı Gider & Kanal Görüntüleme",
    href: "/hizmetler/kamerali-gider-goruntuleme/",
    image: "/images/services/kamerali-gider-goruntuleme.jpg",
    desc: "Boru içi çatlak, çökme, ters eğim ve yabancı cisimleri yüksek çözünürlüklü endoskopik kanal kameralarıyla raporluyoruz.",
    badge: "HD Endoskopi",
  },
  {
    title: "Sıhhi Tesisat Onarımı & Kolektör Yenileme",
    href: "/hizmetler/su-tesisati-tamiri/",
    image: "/images/services/su-tesisati-tamiri.jpg",
    desc: "PPRC, kompozit, bakır ve galvaniz hatlarda sızdırmaz elektro-füzyon kaynak ve İSKİ standartlarında garantili montaj.",
    badge: "Garantili Malzeme",
  },
];

/* 4 Temel Kurumsal Kalite İlkesi */
const qualityPrinciples = [
  {
    icon: "🎯",
    title: "Ölçüm Odaklı Noktasal Teşhis",
    body: "Tesisat arızalarında tahminle veya rastgele kırım yaparak değil; termal, akustik ve basınç ölçüm cihazlarıyla milimetrik tespit yaparak çalışıyoruz.",
  },
  {
    icon: "📋",
    title: "Şeffaf Bilgilendirme & Sabit Tarife",
    body: "Arızanın kaynağı belirlendikten sonra uygulanacak yöntem ve net maliyet müşterimizle paylaşılır. Onay alınmadan kapsam dışı işlem yapılmaz.",
  },
  {
    icon: "🛠️",
    title: "İSKİ Standartlarında Kaliteli İşçilik",
    body: "Kullanılan tüm boru, ek parça, vana ve sızdırmazlık elemanları TSE belgeli orijinal ürünlerden seçilir; yapılan işçilik firma garantimiz altındadır.",
  },
  {
    icon: "⚡",
    title: "7/24 Kesintisiz Mobil Nöbetçi Ekip",
    body: "İstanbul genelindeki tam donanımlı mobil servis araçlarımızla acil su baskını, patlak boru ve tıkanıklık vakalarına ortalama 30-45 dakikada ulaşıyoruz.",
  },
];

/* İstanbul Avrupa Yakası 25 İlçe */
const avrupaYakasiIlceler = [
  { name: "Arnavutköy", note: "Merkez, Hadımköy, Bolluca, Haraççı" },
  { name: "Avcılar", note: "Ambarlı, Cihangir, Denizköşkler, Firuzköy" },
  { name: "Bağcılar", note: "Güneşli, Mahmutbey, Yüzyıl, Fevzi Çakmak" },
  { name: "Bahçelievler", note: "Yenibosna, Şirinevler, Yayla, Siyavuşpaşa" },
  { name: "Bakırköy", note: "Ataköy, Florya, Yeşilköy, Yeşilyurt, Kartaltepe" },
  { name: "Başakşehir", note: "Bahçeşehir, İkitelli, Kayaşehir, Güvercintepe" },
  { name: "Bayrampaşa", note: "Yıldırım, Kocatepe, Muratpaşa, Kartaltepe" },
  { name: "Beşiktaş", note: "Levent, Etiler, Bebek, Ortaköy, Gayrettepe" },
  { name: "Beylikdüzü", note: "Beykent, Yakuplu, Gürpınar, Kavaklı" },
  { name: "Beyoğlu", note: "Taksim, Cihangir, Karaköy, Kasımpaşa, Galata" },
  { name: "Büyükçekmece", note: "Mimaroba, Sinanoba, Kumburgaz, Tepekent" },
  { name: "Çatalca", note: "Merkez, Ferhatpaşa, Kaleiçi ve çevre köyler" },
  { name: "Esenler", note: "Dörtyol, Menderes, Birlik, Turgutreis" },
  { name: "Esenyurt", note: "Kıraç, Mehterçeşme, Saadetdere, Yeşilkent" },
  { name: "Eyüpsultan", note: "Göktürk, Kemerburgaz, Alibeyköy, Rami" },
  { name: "Fatih", note: "Aksaray, Fındıkzade, Topkapı, Balat, Çapa" },
  { name: "Gaziosmanpaşa", note: "Küçükköy, Yıldıztabya, Mevlana, Barbaros" },
  { name: "Güngören", note: "Merter, Haznedar, Tozkoparan, Güneştepe" },
  { name: "Kâğıthane", note: "Seyrantepe, Çeliktepe, Gültepe, Hamidiye" },
  { name: "Küçükçekmece", note: "Halkalı, Atakent, Sefaköy, Cennet, İnönü" },
  { name: "Sarıyer", note: "Maslak, Tarabya, İstinye, Zekeriyaköy, Yeniköy" },
  { name: "Silivri", note: "Merkez, Selimpaşa, Değirmenköy, Gümüşyaka" },
  { name: "Sultangazi", note: "Cebeci, Habibler, Gazi Mahallesi, Uğur Mumcu" },
  { name: "Şişli", note: "Mecidiyeköy, Nişantaşı, Bomonti, Fulya, Teşvikiye" },
  { name: "Zeytinburnu", note: "Merkezefendi, Kazlıçeşme, Çırpıcı, Telsiz" },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(trail))} />

      {/* 1. Resmi Kurumsal Hero Başlığı */}
      <PageHero
        crumbs={trail}
        eyebrow="Marsak Teknik Tesisat"
        title="Kurumsal Profil & Hizmet Standartlarımız"
        lead="Sıhhi tesisat mühendisliği, termal kamera ile kırmadan su kaçağı tespiti ve robotik kanal açma alanında modern teknolojilerle İstanbul genelinde 7/24 hizmet veriyoruz."
      >
        <CtaPair size="md" />
      </PageHero>

      {/* 2. Şirket Tanıtımı & Kurumsal Yaklaşım */}
      <Section className="bg-white">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <Reveal as="div" className="lg:col-span-7">
              <span className="text-xs font-bold tracking-[0.2em] text-copper-600 uppercase">
                ŞİRKET PROFİLİ & VİZYON
              </span>
              <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl lg:text-4xl">
                Modern Cihazlar ve Ustalıkla Güvenilir Tesisat Çözümleri
              </h2>
              <p className="mt-5 text-base leading-relaxed text-ink-soft">
                <strong>Marsak Teknik Tesisat</strong>, sıhhi tesisat sektöründe geleneksel ve yıkıcı yöntemlerin yerine teknolojik, noktasal ve koruyucu çözümler sunmak amacıyla kurulmuştur.
              </p>
              <p className="mt-4 text-base leading-relaxed text-ink-soft">
                Yapılarda meydana gelen su sızıntıları, gizli kaçaklar ve ana gider tıkanıklıkları; doğru teşhis edilmediğinde yüksek maliyetli tadilatlara ve yapısal hasarlara yol açar. Firmamız, bünyesindeki yüksek hassasiyetli <strong>termal görüntüleme kameraları</strong>, <strong>elektro-akustik zemin dinleme dedektörleri</strong> ve <strong>endoskopik boru kameraları</strong> ile arızanın kaynağını milimetrik olarak belirler ve en küçük alanda kalıcı çözüme kavuşturur.
              </p>
            </Reveal>

            <Reveal as="div" className="lg:col-span-5" delay={80}>
              <div className="rounded-2xl border border-line bg-canvas-50 p-6 sm:p-8 shadow-sm">
                <h3 className="text-lg font-bold text-ink border-b border-line pb-3">
                  Kurumsal Bilgi Özeti
                </h3>
                <dl className="mt-5 space-y-4 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-ink-mute font-medium">Ticari Unvan:</dt>
                    <dd className="font-bold text-ink">Marsak Teknik Tesisat</dd>
                  </div>
                  <div className="flex justify-between border-t border-line-soft pt-3">
                    <dt className="text-ink-mute font-medium">Faaliyet Alanı:</dt>
                    <dd className="font-bold text-ink">Sıhhi Tesisat & Kaçak Tespiti</dd>
                  </div>
                  <div className="flex justify-between border-t border-line-soft pt-3">
                    <dt className="text-ink-mute font-medium">Hizmet Kapsamı:</dt>
                    <dd className="font-bold text-ink">İstanbul Geneli 25 İlçe</dd>
                  </div>
                  <div className="flex justify-between border-t border-line-soft pt-3">
                    <dt className="text-ink-mute font-medium">Çalışma Rejimi:</dt>
                    <dd className="font-bold text-emerald-700">7/24 Kesintisiz Acil Servis</dd>
                  </div>
                  <div className="flex justify-between border-t border-line-soft pt-3">
                    <dt className="text-ink-mute font-medium">Ulaşım Süresi:</dt>
                    <dd className="font-bold text-copper-700">Ortalama 30 – 45 Dakika</dd>
                  </div>
                </dl>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* 3. Dört Temel Uzmanlık Alanımız */}
      <Section className="bg-canvas-100" divider>
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <span className="text-xs font-bold tracking-[0.2em] text-copper-600 uppercase">
                FAALİYET ALANLARIMIZ
              </span>
              <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl lg:text-4xl">
                Uzmanlık ve Hizmet Alanlarımız
              </h2>
            </div>
            <Link
              href="/hizmetler/"
              className="inline-flex items-center gap-1.5 rounded-xl border border-line-strong bg-white px-4 py-2 text-xs font-bold text-ink transition hover:border-copper-400 hover:text-copper-700 shadow-sm"
            >
              <span>Tüm Hizmet Listesi</span>
              <span>→</span>
            </Link>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {coreExpertise.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex flex-col sm:flex-row overflow-hidden rounded-2xl border border-line bg-white shadow-sm transition-all duration-300 hover:border-copper-400 hover:shadow-md"
              >
                <div className="relative h-48 sm:h-auto sm:w-2/5 shrink-0 bg-slate-900">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute bottom-2 left-2 rounded-md bg-black/70 px-2 py-0.5 text-[0.68rem] font-bold text-white backdrop-blur-sm">
                    {item.badge}
                  </span>
                </div>

                <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
                  <div>
                    <h3 className="text-base font-bold text-ink group-hover:text-copper-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm leading-relaxed text-ink-soft">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-line-soft pt-3 text-xs font-bold text-copper-600">
                    <span>Hizmet Detayı →</span>
                    <span className="text-ink-mute font-normal text-[0.72rem]">7/24 Mobil Servis</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Section>

      {/* 4. Kalite İlkelerimiz & Hizmet Standartlarımız */}
      <Section className="bg-white" divider>
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <span className="text-xs font-bold tracking-[0.2em] text-copper-600 uppercase">
              KALİTE POLİTİKAMIZ
            </span>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl lg:text-4xl">
              Hizmet ve Çalışma Standartlarımız
            </h2>
            <p className="mt-3 text-sm sm:text-base text-ink-soft leading-relaxed">
              Her tesisat müdahalesinde müşteri memnuniyetini, yapı güvenliğini ve uzun ömürlü sızdırmazlığı esas alan ilkelerimiz:
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {qualityPrinciples.map((q, i) => (
              <Reveal key={q.title} delay={i * 60}>
                <div className="h-full rounded-2xl border border-line bg-canvas-50 p-6 transition-all hover:border-copper-400 hover:bg-white hover:shadow-md">
                  <span className="grid size-11 place-items-center rounded-xl bg-white border border-line text-lg shadow-sm">
                    {q.icon}
                  </span>
                  <h3 className="mt-4 text-base font-bold text-ink">{q.title}</h3>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-ink-soft">
                    {q.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* 5. İstanbul Avrupa Yakası 25 İlçe Kapsamı */}
      <Section className="bg-canvas-100" divider>
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <span className="text-xs font-bold tracking-[0.2em] text-copper-600 uppercase">
                SERVİS AĞI
              </span>
              <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl lg:text-4xl">
                İstanbul Avrupa Yakası 25 İlçe Tam Kapsam
              </h2>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-emerald-50 px-4 py-1.5 text-xs font-bold text-emerald-800">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              Mobil Nöbetçi Ekipler Aktif
            </span>
          </div>

          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-ink-soft sm:text-base">
            Tam donanımlı mobil servis araçlarımızla tüm ilçelere ortalama <strong>30–45 dakika</strong> içinde ulaşıyoruz. Acil müdahale ve randevu talepleriniz için 7/24 çağrı hattımızdan bize ulaşabilirsiniz.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {avrupaYakasiIlceler.map((ilce) => (
              <div
                key={ilce.name}
                className="rounded-xl border border-line bg-white p-3.5 transition hover:border-copper-300 hover:shadow-sm"
              >
                <strong className="block text-sm font-bold text-ink">{ilce.name}</strong>
                <p className="mt-1 text-[0.72rem] leading-snug text-ink-mute">{ilce.note}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 6. Kurumsal İletişim & Randevu Çağrısı */}
      <ContactCta
        title="Tesisat Probleminiz İçin Kurumsal Destek Alın"
        body="Noktasal kaçak tespiti, tıkanıklık açma ve sıhhi tesisat tamiratı için nöbetçi ustalarımızla 7/24 doğrudan iletişime geçebilirsiniz."
      />
    </>
  );
}
