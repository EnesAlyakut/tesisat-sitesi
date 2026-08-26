"use client";

import { runtimeTelHref, runtimeWhatsappHref, useRuntimeSite } from "@/components/providers/RuntimeSiteContext";

/**
 * Mobilde ekranin altinda sabit duran iletisim cubugu.
 * body'ye globals.css icinde padding-bottom verildigi icin icerigi kapatmaz.
 * Safe-area destegi env(safe-area-inset-bottom) ile saglanir.
 */
export default function MobileContactBar() {
  const site = useRuntimeSite();
  const telHref = runtimeTelHref(site);
  const whatsappHref = runtimeWhatsappHref(site);
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-canvas-50/95 shadow-[0_-4px_20px_rgba(13,27,44,0.08)] backdrop-blur-lg lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div className="grid h-16 grid-cols-2 divide-x divide-line">
        <a
          href={telHref}
          data-cta="tel-mobile"
          aria-label={`Telefonla ara: ${site.phoneDisplay}`}
          className="flex items-center justify-center gap-2.5 font-semibold text-copper-700 active:bg-canvas-200"
        >
          <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 6 6L16.5 12l4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4 6.2 2 2 0 0 1 6 4z" />
          </svg>
          Ara
        </a>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          data-cta="whatsapp-mobile"
          aria-label="WhatsApp üzerinden mesaj gönder (yeni sekmede açılır)"
          className="flex items-center justify-center gap-2.5 font-semibold text-aqua-700 active:bg-canvas-200"
        >
          <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2m0 2a8 8 0 1 1-4.1 14.9l-.4-.2-2.6.7.7-2.5-.2-.4A8 8 0 0 1 12 4" />
            <path d="M8.9 7.6c.2 0 .4 0 .5.4l.7 1.6c0 .2 0 .3-.1.5l-.5.6c-.1.2-.2.3 0 .6a7 7 0 0 0 3.2 2.8c.3.1.4 0 .6-.1l.7-.8c.2-.2.3-.1.5 0l1.6.8c.2.1.3.2.3.4 0 .8-.6 1.5-1.4 1.6-1.6.2-4-1-5.6-3-1-1.3-1.5-2.5-1.5-3.5 0-.9.5-1.6 1-1.9z" />
          </svg>
          WhatsApp
        </a>
      </div>
    </div>
  );
}
