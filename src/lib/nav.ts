import { services } from "@/data/services";
import { locationPages, hubPages } from "@/data/regions";

export interface NavLink {
  href: string;
  label: string;
  children?: NavLink[];
}

export const serviceHref = (slug: string) => `/hizmetler/${slug}/`;
export const locationHref = (slug: string) => `/${slug}/`;
export const caseHref = (slug: string) => `/yaptigimiz-isler/${slug}/`;

export const mainNav: NavLink[] = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/hakkimizda/", label: "Hakkımızda" },
  {
    href: "/hizmetler/",
    label: "Hizmetlerimiz",
    children: services.map((s) => ({
      href: serviceHref(s.slug),
      label: s.shortTitle,
    })),
  },
  { href: "/iletisim/", label: "İletişim" },
];

/** Footer sutunlari. */
export const footerNav = {
  hizmetler: [
    "su-kacagi-tespiti",
    "tikaniklik-acma",
    "kamerali-gider-goruntuleme",
    "su-tesisati-tamiri",
    "acil-tesisatci",
  ].map((slug) => {
    const s = services.find((x) => x.slug === slug)!;
    return { href: serviceHref(s.slug), label: s.shortTitle };
  }),
  kurumsal: [
    { href: "/hakkimizda/", label: "Hakkımızda" },
    { href: "/iletisim/", label: "İletişim" },
  ],
  yasal: [
    { href: "/kvkk/", label: "KVKK Aydınlatma Metni" },
    { href: "/gizlilik-politikasi/", label: "Gizlilik Politikası" },
    { href: "/cerez-politikasi/", label: "Çerez Politikası" },
  ],
};
