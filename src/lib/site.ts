/**
 * MERKEZI ISLETME AYARLARI
 * ------------------------------------------------------------------
 * Telefon, WhatsApp, adres, calisma saatleri ve SEO varsayilanlari
 * SADECE burada tanimlanir. Kod icinde hicbir yere elle yazilmaz.
 *
 * TODO (isletme sahibi): asagida `verified: false` olarak isaretli
 * alanlar dogrulanmamis placeholder degerlerdir. Gercek bilgilerle
 * degistirilmeden yayina alinmamalidir.
 */

export const site = {
  name: "Marsak Teknik Tesisat",
  shortName: "MARSAK",
  tagline: "TEKNİK TESİSAT",
  legalName: "Marsak Teknik Tesisat",
  description:
    "İstanbul genelinde tüm ilçe ve mahallelere 7/24 profesyonel su tesisatı, kırmadan su kaçağı tespiti, robotla tıkanıklık açma ve kameralı gider görüntüleme hizmetleri.",

  /** Yayina almadan once kendi domaininizle degistirin. */
  url: "https://www.marsaktesisat.com",

  contact: {
    phoneDisplay: "0536 463 82 84",
    phoneRaw: "+905364638284",
    verified: true,
    whatsappRaw: "905364638284",
    whatsappMessage:
      "Merhaba, tesisat konusunda bilgi almak istiyorum.",
    email: "musayilmaz581907@gmail.com",
  },

  hours: {
    /** 7/24 acil servis veriliyorsa true birakin. */
    emergency247: true,
    label: "7/24 Acil Servis",
    /** Schema.org openingHours formatinda. */
    schema: ["Mo-Su 00:00-23:59"],
  },

  address: {
    /** TODO: Gercek acik adres girilmeden schema'ya adres eklenmez. */
    streetAddress: "",
    locality: "İstanbul",
    region: "İstanbul",
    postalCode: "",
    country: "TR",
    /** Fiziksel magaza yoksa false; sadece hizmet bolgesi gosterilir. */
    hasPublicAddress: false,
    geo: { lat: 41.0082, lng: 28.9784 },
    mapsEmbedQuery: "İstanbul, Türkiye",
  },

  social: {
    instagram: "",
    facebook: "",
    googleBusiness: "",
  },

  analytics: {
    /** GA4 olcum kimligi. Bos birakilirsa script hic yuklenmez. */
    ga4MeasurementId: "",
    /** Google Search Console dogrulama etiketi. */
    googleSiteVerification: "",
  },
} as const;

export const telHref = `tel:${site.contact.phoneRaw}`;
export const whatsappHref = `https://wa.me/${site.contact.whatsappRaw}?text=${encodeURIComponent(
  site.contact.whatsappMessage,
)}`;
