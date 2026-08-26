export type IconName =
  | "leak" | "drain" | "camera" | "pipe" | "bath" | "emergency"
  | "robot" | "flush" | "toilet" | "faucet" | "radiator" | "thermal";

export interface FaqItem { q: string; a: string }

export interface ContentBlock { heading: string; body: string[]; bullets?: string[] }

export interface Service {
  slug: string;
  title: string;
  /** Menu ve kartlarda kullanilan kisa ad. */
  shortTitle: string;
  icon: IconName;
  /** Kart ve liste aciklamasi (1-2 cumle). */
  summary: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  /** Ana sayfadaki 6 vitrin hizmetinden biri mi? */
  featured: boolean;
  blocks: ContentBlock[];
  faq: FaqItem[];
  /** Ilgili hizmet slug'lari - internal linking icin. */
  related: string[];
  /** Bu hizmette kullanilan ekipman slug'lari. */
  equipment: string[];
}
