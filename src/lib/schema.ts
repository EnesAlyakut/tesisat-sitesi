import { site } from "./site";
import { absoluteUrl, type Crumb } from "./seo";
import { activeDistricts } from "@/data/regions";
import { aggregateRating, reviews } from "@/data/reviews";

/**
 * STRUCTURED DATA
 * ------------------------------------------------------------------
 * KURAL: Kullaniciya gorunmeyen veya dogrulanmamis hicbir bilgi
 * schema'ya yazilmaz. Bu nedenle:
 *  - telefon yalnizca site.contact.verified === true iken,
 *  - adres yalnizca gercek acik adres girildiginde,
 *  - AggregateRating yalnizca gercek yorum varsa
 * cikti dahil edilir.
 */

const ORG_ID = `${site.url}/#kurulus`;
const BUSINESS_ID = `${site.url}/#isletme`;

export function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: site.name,
    legalName: site.legalName,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/logo.png"),
    image: absoluteUrl("/logo.png"),
    description: site.description,
    ...(site.contact.verified ? { telephone: site.contact.phoneRaw } : {}),
    ...(Object.values(site.social).some(Boolean)
      ? { sameAs: Object.values(site.social).filter(Boolean) }
      : {}),
  };
}

/** Plumber, LocalBusiness'in alt turudur; ikisi birlikte belirtilir. */
export function localBusinessSchema() {
  const rating = aggregateRating();

  return {
    "@type": ["Plumber", "LocalBusiness"],
    "@id": BUSINESS_ID,
    name: site.name,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/logo.png"),
    image: absoluteUrl("/logo.png"),
    description: site.description,
    parentOrganization: { "@id": ORG_ID },
    priceRange: "₺₺",
    currenciesAccepted: "TRY",
    paymentAccepted: "Nakit, Kredi Kartı, Havale/EFT",
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.address.geo.lat,
      longitude: site.address.geo.lng,
    },
    ...(site.contact.verified ? { telephone: site.contact.phoneRaw } : {}),
    ...(site.address.hasPublicAddress && site.address.streetAddress
      ? {
          address: {
            "@type": "PostalAddress",
            streetAddress: site.address.streetAddress,
            addressLocality: site.address.locality,
            addressRegion: site.address.region,
            postalCode: site.address.postalCode,
            addressCountry: site.address.country,
          },
        }
      : {
          address: {
            "@type": "PostalAddress",
            addressLocality: "İstanbul",
            addressRegion: "İstanbul",
            addressCountry: "TR",
          },
        }),
    areaServed: activeDistricts.map((d) => ({
      "@type": "AdministrativeArea",
      name: `${d.name}, ${d.parent}`,
    })),
    openingHoursSpecification: site.hours.emergency247
      ? [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday", "Tuesday", "Wednesday", "Thursday",
              "Friday", "Saturday", "Sunday",
            ],
            opens: "00:00",
            closes: "23:59",
          },
        ]
      : undefined,
    ...(rating
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: rating.ratingValue,
            reviewCount: rating.reviewCount,
          },
          review: reviews.slice(0, 5).map((r) => ({
            "@type": "Review",
            author: { "@type": "Person", name: r.author },
            datePublished: r.date,
            reviewBody: r.text,
            ...(r.rating
              ? {
                  reviewRating: {
                    "@type": "Rating",
                    ratingValue: r.rating,
                    bestRating: 5,
                  },
                }
              : {}),
          })),
        }
      : {}),
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": `${site.url}/#site`,
    url: absoluteUrl("/"),
    name: site.name,
    inLanguage: "tr-TR",
    publisher: { "@id": ORG_ID },
  };
}

export function breadcrumbSchema(items: Crumb[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.href),
    })),
  };
}

export function serviceSchema(args: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@type": "Service",
    name: args.name,
    description: args.description,
    url: absoluteUrl(args.path),
    serviceType: args.name,
    provider: { "@id": BUSINESS_ID },
    areaServed: activeDistricts.map((d) => ({
      "@type": "AdministrativeArea",
      name: `${d.name}, ${d.parent}`,
    })),
  };
}

export function faqSchema(items: { q: string; a: string }[]) {
  if (items.length === 0) return null;
  return {
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function articleSchema(args: {
  title: string;
  description: string;
  path: string;
  published: string;
  modified: string;
  image?: string;
}) {
  return {
    "@type": "Article",
    headline: args.title,
    description: args.description,
    url: absoluteUrl(args.path),
    datePublished: args.published,
    dateModified: args.modified,
    inLanguage: "tr-TR",
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    mainEntityOfPage: absoluteUrl(args.path),
    ...(args.image ? { image: absoluteUrl(args.image) } : {}),
  };
}

/** Birden fazla schema nesnesini tek @graph icinde birlestirir. */
export function graph(...nodes: (object | null | undefined)[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes.filter(Boolean),
  };
}
