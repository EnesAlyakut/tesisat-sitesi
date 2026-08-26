import "server-only";

import { promises as fs } from "node:fs";
import path from "node:path";
import type { CmsContent, CmsFaqItem, CmsHeroSlide, CmsHomeSections, CmsSeoSettings, CmsSiteSettings } from "./cms-types";

const contentPath = path.join(process.cwd(), "data", "admin-content.json");

const text = (value: unknown, max: number) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

function normalizeSite(value: unknown): CmsSiteSettings {
  const item = (value && typeof value === "object" ? value : {}) as Record<string, unknown>;
  return {
    name: text(item.name, 100),
    shortName: text(item.shortName, 30),
    tagline: text(item.tagline, 60),
    description: text(item.description, 500),
    phoneDisplay: text(item.phoneDisplay, 30),
    phoneRaw: text(item.phoneRaw, 25).replace(/[^+\d]/g, ""),
    whatsappRaw: text(item.whatsappRaw, 25).replace(/\D/g, ""),
    whatsappMessage: text(item.whatsappMessage, 500),
    email: text(item.email, 150),
    hoursLabel: text(item.hoursLabel, 100),
    serviceArea: text(item.serviceArea, 200),
  };
}

function normalizeSlide(value: unknown): CmsHeroSlide {
  const item = (value && typeof value === "object" ? value : {}) as Record<string, unknown>;
  const image = text(item.image, 500);
  const href = text(item.href, 500);
  return {
    image: image.startsWith("/") || image.startsWith("https://") ? image : "",
    alt: text(item.alt, 200),
    eyebrow: text(item.eyebrow, 100),
    title: text(item.title, 160),
    body: text(item.body, 600),
    href: href.startsWith("/") || href.startsWith("https://") ? href : "/",
    cta: text(item.cta, 100),
  };
}

function normalizeSections(value: unknown): CmsHomeSections {
  const item = (value && typeof value === "object" ? value : {}) as Record<string, unknown>;
  const flag = (key: keyof CmsHomeSections) => item[key] !== false;
  return {
    trust: flag("trust"), services: flag("services"), whyMarsak: flag("whyMarsak"),
    process: flag("process"), equipment: flag("equipment"), serviceAreas: flag("serviceAreas"),
    cases: flag("cases"), pricing: flag("pricing"), reviews: flag("reviews"),
    faq: flag("faq"), contact: flag("contact"),
  };
}

function normalizeFaq(value: unknown): CmsFaqItem[] {
  if (!Array.isArray(value)) return [];
  return value.slice(0, 30).map((entry) => {
    const item = (entry && typeof entry === "object" ? entry : {}) as Record<string, unknown>;
    return { q: text(item.q, 240), a: text(item.a, 1500) };
  }).filter((item) => item.q && item.a);
}

function normalizeSeo(value: unknown): CmsSeoSettings {
  const item = (value && typeof value === "object" ? value : {}) as Record<string, unknown>;
  const canonicalUrl = text(item.canonicalUrl, 300);
  return {
    homeTitle: text(item.homeTitle, 100),
    homeDescription: text(item.homeDescription, 300),
    canonicalUrl: /^https:\/\//.test(canonicalUrl) ? canonicalUrl.replace(/\/$/, "") : "https://www.marsakteknik.com",
    indexSite: item.indexSite !== false,
  };
}

export function normalizeCmsContent(value: unknown): CmsContent {
  const item = (value && typeof value === "object" ? value : {}) as Record<string, unknown>;
  const slides = Array.isArray(item.heroSlides)
    ? item.heroSlides.slice(0, 8).map(normalizeSlide).filter((slide) => slide.image && slide.title)
    : [];
  if (slides.length === 0) throw new Error("En az bir geçerli hero slaytı gereklidir.");
  const site = normalizeSite(item.site);
  if (!site.name || !site.phoneRaw || !site.whatsappRaw) {
    throw new Error("İşletme adı, telefon ve WhatsApp alanları zorunludur.");
  }
  const trustItems = Array.isArray(item.trustItems)
    ? item.trustItems.slice(0, 20).map((entry) => text(entry, 100)).filter(Boolean)
    : [];
  const faqItems = normalizeFaq(item.faqItems);
  const seo = normalizeSeo(item.seo);
  if (!seo.homeTitle || !seo.homeDescription) throw new Error("SEO başlığı ve açıklaması zorunludur.");
  return {
    site,
    heroSlides: slides,
    homeSections: normalizeSections(item.homeSections),
    trustItems,
    faqItems,
    seo,
    updatedAt: text(item.updatedAt, 40) || new Date().toISOString(),
  };
}

export async function getCmsContent(): Promise<CmsContent> {
  const raw = await fs.readFile(contentPath, "utf8");
  return normalizeCmsContent(JSON.parse(raw));
}

export async function saveCmsContent(value: unknown): Promise<CmsContent> {
  const content = { ...normalizeCmsContent(value), updatedAt: new Date().toISOString() };
  const tempPath = `${contentPath}.tmp`;
  await fs.writeFile(tempPath, `${JSON.stringify(content, null, 2)}\n`, "utf8");
  await fs.rename(tempPath, contentPath);
  return content;
}

// Page manager utilities
export async function listPages(): Promise<string[]> {
  const pagesDir = path.join(process.cwd(), 'data', 'pages');
  await fs.mkdir(pagesDir, { recursive: true });
  const files = await fs.readdir(pagesDir);
  return files.filter((f) => f.endsWith('.md')).map((f) => f.replace(/\.md$/, ''));
}

export async function readPage(slug: string): Promise<string> {
  const filePath = path.join(process.cwd(), 'data', 'pages', `${slug}.md`);
  return await fs.readFile(filePath, 'utf-8');
}

export async function writePage(slug: string, content: string): Promise<void> {
  const filePath = path.join(process.cwd(), 'data', 'pages', `${slug}.md`);
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, content, 'utf-8');
}

export async function deletePage(slug: string): Promise<void> {
  const filePath = path.join(process.cwd(), 'data', 'pages', `${slug}.md`);
  await fs.unlink(filePath);
}

export async function generatePlaceholder(slug: string): Promise<void> {
  const placeholder = `# ${slug}\n\nBu sayfa henüz oluşturulmadı. İçerik eklemek için yönetim panelini kullanın.`;
  await writePage(slug, placeholder);
}

export async function generateMissingPages(expectedSlugs: string[]): Promise<void> {
  const existing = await listPages();
  for (const slug of expectedSlugs) {
    if (!existing.includes(slug)) {
      await generatePlaceholder(slug);
    }
  }
}
