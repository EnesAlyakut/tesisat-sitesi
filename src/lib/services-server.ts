import "server-only";

import { promises as fs } from "node:fs";
import path from "node:path";
import type { Service } from "@/data/types";
import { services as defaultServices } from "@/data/services";

const jsonPath = path.join(process.cwd(), "data", "services.json");

/**
 * Read services from `data/services.json` at runtime.
 * If the file doesn't exist, it seeds it from the static `defaultServices` array.
 */
export async function getServices(): Promise<Service[]> {
  try {
    const raw = await fs.readFile(jsonPath, "utf-8");
    return JSON.parse(raw) as Service[];
  } catch {
    await saveServices(defaultServices);
    return defaultServices;
  }
}

/**
 * Atomically write services to `data/services.json`.
 */
export async function saveServices(services: Service[]): Promise<void> {
  const tmpPath = `${jsonPath}.tmp`;
  await fs.mkdir(path.dirname(jsonPath), { recursive: true });
  await fs.writeFile(tmpPath, JSON.stringify(services, null, 2), "utf-8");
  await fs.rename(tmpPath, jsonPath);
}

/**
 * Get a single service by slug.
 */
export async function getServiceBySlug(slug: string): Promise<Service | undefined> {
  const all = await getServices();
  return all.find((s) => s.slug === slug);
}

/**
 * Get all featured services.
 */
export async function getFeaturedServices(): Promise<Service[]> {
  const all = await getServices();
  return all.filter((s) => s.featured);
}
