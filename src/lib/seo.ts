import type { Metadata } from "next";
import { site } from "./site";

/** Basindaki/sonundaki slash'lari normalize ederek mutlak URL uretir. */
export function absoluteUrl(path = "/") {
  const clean = `/${path}`.replace(/\/+/g, "/");
  const withSlash = clean.endsWith("/") ? clean : `${clean}/`;
  return `${site.url}${withSlash === "//" ? "/" : withSlash}`;
}

interface BuildMetaArgs {
  title: string;
  description: string;
  /** Site koku "/" ile baslayan yol. */
  path: string;
  /** OG gorseli — verilmezse dinamik varsayilan kullanilir. */
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  noindex?: boolean;
}

export function buildMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  publishedTime,
  modifiedTime,
  noindex,
}: BuildMetaArgs): Metadata {
  const url = absoluteUrl(path);
  // Gorsel verilmezse Next.js dosya konvansiyonu (opengraph-image) devreye girer.
  const og = image
    ? { images: [{ url: image, width: 1200, height: 630, alt: title }] }
    : {};

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noindex
      ? { index: false, follow: false }
      : { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: site.name,
      locale: "tr_TR",
      ...og,
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}

export interface Crumb {
  name: string;
  href: string;
}

/** Ana Sayfa her zaman ilk halka olarak eklenir. */
export function crumbs(...rest: Crumb[]): Crumb[] {
  return [{ name: "Ana Sayfa", href: "/" }, ...rest];
}
