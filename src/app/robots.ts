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
        disallow: ["/admin/", "/admin", "/api/", "/_next/"],
      },
    ],
    sitemap: `${absoluteUrl("/")}sitemap.xml`,
    host: absoluteUrl("/").replace(/\/$/, ""),
  };
}
