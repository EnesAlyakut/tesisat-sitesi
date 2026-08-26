export interface CmsSiteSettings {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  phoneDisplay: string;
  phoneRaw: string;
  whatsappRaw: string;
  whatsappMessage: string;
  email: string;
  hoursLabel: string;
  serviceArea: string;
}

export interface CmsHeroSlide {
  image: string;
  alt: string;
  eyebrow: string;
  title: string;
  body: string;
  href: string;
  cta: string;
}

export interface CmsHomeSections {
  trust: boolean;
  services: boolean;
  whyMarsak: boolean;
  process: boolean;
  equipment: boolean;
  serviceAreas: boolean;
  cases: boolean;
  pricing: boolean;
  reviews: boolean;
  faq: boolean;
  contact: boolean;
}

export interface CmsSeoSettings {
  homeTitle: string;
  homeDescription: string;
  canonicalUrl: string;
  indexSite: boolean;
}

export interface CmsFaqItem {
  q: string;
  a: string;
}

export interface CmsContent {
  site: CmsSiteSettings;
  heroSlides: CmsHeroSlide[];
  homeSections: CmsHomeSections;
  trustItems: string[];
  faqItems: CmsFaqItem[];
  seo: CmsSeoSettings;
  updatedAt: string;
}
