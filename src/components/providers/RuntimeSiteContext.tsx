"use client";

import { createContext, useContext } from "react";
import type { CmsSiteSettings } from "@/lib/cms-types";

export const RuntimeSiteContext = createContext<CmsSiteSettings | null>(null);

export function useRuntimeSite() {
  const value = useContext(RuntimeSiteContext);
  if (!value) throw new Error("SiteRuntime sağlayıcısı bulunamadı.");
  return value;
}

export function runtimeTelHref(site: CmsSiteSettings) {
  return `tel:${site.phoneRaw}`;
}

export function runtimeWhatsappHref(site: CmsSiteSettings, message = site.whatsappMessage) {
  return `https://wa.me/${site.whatsappRaw}?text=${encodeURIComponent(message)}`;
}
