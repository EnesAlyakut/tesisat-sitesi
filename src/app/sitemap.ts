import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";
import { services } from "@/data/services";
import { locationPages } from "@/data/regions";
import { caseStudies } from "@/data/cases";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = ([
    { url: absoluteUrl("/"), changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/hizmetler/"), changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/hizmet-bolgelerimiz/"), changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/hakkimizda/"), changeFrequency: "yearly", priority: 0.6 },
    { url: absoluteUrl("/yaptigimiz-isler/"), changeFrequency: "weekly", priority: 0.7 },
    { url: absoluteUrl("/musteri-yorumlari/"), changeFrequency: "monthly", priority: 0.5 },
    { url: absoluteUrl("/iletisim/"), changeFrequency: "yearly", priority: 0.8 },
    { url: absoluteUrl("/kvkk/"), changeFrequency: "yearly", priority: 0.2 },
    { url: absoluteUrl("/kvkk-aydinlatma-metni/"), changeFrequency: "yearly", priority: 0.2 },
    { url: absoluteUrl("/gizlilik-politikasi/"), changeFrequency: "yearly", priority: 0.2 },
    { url: absoluteUrl("/cerez-politikasi/"), changeFrequency: "yearly", priority: 0.2 },
    { url: absoluteUrl("/kullanim-kosullari/"), changeFrequency: "yearly", priority: 0.2 },
  ] as const).map((p) => ({ ...p, lastModified: now }));

  const servicePages: MetadataRoute.Sitemap = services.map((s) => ({
    url: absoluteUrl(`/hizmetler/${s.slug}/`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  /* Bolge sayfalari yerel SEO icin en yuksek onceliklidir. */
  const regionPages: MetadataRoute.Sitemap = locationPages.map((p) => ({
    url: absoluteUrl(`/${p.slug}/`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: p.isHub ? 0.95 : 0.9,
  }));

  const casePages: MetadataRoute.Sitemap = caseStudies.map((c) => ({
    url: absoluteUrl(`/yaptigimiz-isler/${c.slug}/`),
    lastModified: new Date(c.date),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [
    ...staticPages,
    ...regionPages,
    ...servicePages,
    ...casePages,
  ];
}
