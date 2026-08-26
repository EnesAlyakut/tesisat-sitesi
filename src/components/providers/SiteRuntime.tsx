"use client";

import { usePathname } from "next/navigation";
import type { CmsSiteSettings } from "@/lib/cms-types";
import { RuntimeSiteContext } from "./RuntimeSiteContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileContactBar from "@/components/layout/MobileContactBar";

export default function SiteRuntime({ settings, children }: { settings: CmsSiteSettings; children: React.ReactNode }) {
  const pathname = usePathname();
  const admin = pathname.startsWith("/admin");
  return (
    <RuntimeSiteContext.Provider value={settings}>
      {admin ? children : <><Header /><main id="icerik">{children}</main><Footer /><MobileContactBar /></>}
    </RuntimeSiteContext.Provider>
  );
}
