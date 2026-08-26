"use client";

import Link from "next/link";
import { runtimeTelHref, runtimeWhatsappHref, useRuntimeSite } from "@/components/providers/RuntimeSiteContext";

type Size = "sm" | "md" | "lg";

const sizeCls: Record<Size, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-5 text-[0.95rem]",
  lg: "h-14 px-7 text-base",
};

const base =
  "btn-flow inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-all duration-300";

export function PhoneButton({
  size = "md",
  label = "Hemen Ara",
  className = "",
  showNumber = false,
}: {
  size?: Size;
  label?: string;
  className?: string;
  showNumber?: boolean;
}) {
  const site = useRuntimeSite();
  const telHref = runtimeTelHref(site);
  return (
    <a
      href={telHref}
      data-cta="tel"
      aria-label={`Telefonla ara: ${site.phoneDisplay}`}
      className={`${base} ${sizeCls[size]} bg-copper-600 text-white shadow-[0_4px_16px_rgba(92,45,12,0.28)] hover:-translate-y-0.5 hover:bg-copper-500 hover:shadow-[0_8px_24px_rgba(92,45,12,0.35)] ${className}`}
    >
      <PhoneIcon />
      <span>{showNumber ? site.phoneDisplay : label}</span>
    </a>
  );
}

export function WhatsAppButton({
  size = "md",
  label = "WhatsApp'tan Yaz",
  className = "",
  onDark = false,
}: {
  size?: Size;
  label?: string;
  className?: string;
  /** Koyu zeminli bloklarda (CTA, footer) kontrasti korur. */
  onDark?: boolean;
}) {
  const site = useRuntimeSite();
  const whatsappHref = runtimeWhatsappHref(site);
  const skin = onDark
    ? "border border-white/25 bg-white/10 text-white hover:border-white/45 hover:bg-white/20"
    : "border border-line-strong bg-canvas-50 text-ink shadow-[0_1px_2px_rgba(13,27,44,0.04)] hover:border-aqua-400 hover:text-aqua-700 hover:shadow-[0_8px_22px_rgba(13,27,44,0.09)]";

  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      data-cta="whatsapp"
      aria-label="WhatsApp üzerinden mesaj gönder (yeni sekmede açılır)"
      className={`${base} ${sizeCls[size]} ${skin} hover:-translate-y-0.5 ${className}`}
    >
      <WhatsAppIcon />
      <span>{label}</span>
    </a>
  );
}

export function LinkButton({
  href,
  children,
  size = "md",
  variant = "outline",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  size?: Size;
  variant?: "solid" | "outline" | "ghost";
  className?: string;
}) {
  const variants = {
    solid:
      "bg-navy-900 text-white shadow-[0_6px_20px_rgba(13,27,44,0.2)] hover:-translate-y-0.5 hover:bg-navy-800",
    outline:
      "border border-line-strong bg-canvas-50 text-ink hover:-translate-y-0.5 hover:border-aqua-400 hover:text-aqua-700",
    ghost: "text-aqua-700 hover:text-aqua-600",
  };
  return (
    <Link href={href} className={`${base} ${sizeCls[size]} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}

export function CtaPair({
  size = "lg",
  className = "",
  onDark = false,
}: {
  size?: Size;
  className?: string;
  onDark?: boolean;
}) {
  return (
    <div className={`flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 ${className}`}>
      <PhoneButton size={size} className="w-full sm:w-auto text-center" />
      <WhatsAppButton size={size} onDark={onDark} className="w-full sm:w-auto text-center" />
    </div>
  );
}

function PhoneIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 6 6L16.5 12l4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4 6.2 2 2 0 0 1 6 4z"
        fill="currentColor"
      />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2m0 2a8 8 0 1 1-4.1 14.9l-.4-.2-2.6.7.7-2.5-.2-.4A8 8 0 0 1 12 4"
        fill="currentColor"
      />
      <path
        d="M8.9 7.6c.2 0 .4 0 .5.4l.7 1.6c0 .2 0 .3-.1.5l-.5.6c-.1.2-.2.3 0 .6a7 7 0 0 0 3.2 2.8c.3.1.4 0 .6-.1l.7-.8c.2-.2.3-.1.5 0l1.6.8c.2.1.3.2.3.4 0 .8-.6 1.5-1.4 1.6-1.6.2-4-1-5.6-3-1-1.3-1.5-2.5-1.5-3.5 0-.9.5-1.6 1-1.9z"
        fill="currentColor"
      />
    </svg>
  );
}
