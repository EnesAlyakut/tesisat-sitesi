import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import JsonLd from "@/components/JsonLd";
import { site } from "@/lib/site";
import { absoluteUrl } from "@/lib/seo";
import { graph, localBusinessSchema, organizationSchema, websiteSchema } from "@/lib/schema";
import { getCmsContent } from "@/lib/cms";
import SiteRuntime from "@/components/providers/SiteRuntime";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  manifest: "/manifest.webmanifest",
  title: {
    default: `${site.name} | İstanbul 7/24 Su Tesisatçısı`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: absoluteUrl("/") },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon.ico", sizes: "48x48" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: site.url,
    siteName: site.name,
    title: site.name,
    description: site.description,
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: site.name,
      },
    ],
  },
  formatDetection: { telephone: true, address: false, email: false },
  ...(site.analytics.googleSiteVerification
    ? { verification: { google: site.analytics.googleSiteVerification } }
    : {}),
};

export const viewport: Viewport = {
  themeColor: "#071322",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cms = await getCmsContent();
  return (
    <html lang="tr" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body>
        <JsonLd
          data={graph(organizationSchema(), localBusinessSchema(), websiteSchema())}
        />

        <SiteRuntime settings={cms.site}>{children}</SiteRuntime>
      </body>
    </html>
  );
}
