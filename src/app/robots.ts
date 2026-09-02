import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Arama sonucu, admin paneli ve API rotaları indekslenmez.
        // _next dosyalari engellenmez; arama motorlari sayfayi CSS/JS ile render edebilmelidir.
        disallow: ["/admin/", "/admin", "/api/"],
      },
    ],
    sitemap: `${absoluteUrl("/")}sitemap.xml`,
    host: absoluteUrl("/").replace(/\/$/, ""),
  };
}
