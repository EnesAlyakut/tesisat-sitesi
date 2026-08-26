"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { mainNav } from "@/lib/nav";
import { useRuntimeSite } from "@/components/providers/RuntimeSiteContext";
import { PhoneButton } from "@/components/ui/CallToAction";

export default function Header() {
  const site = useRuntimeSite();
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);

  /* Sayfa degisince menuyu kapat. */
  useEffect(() => {
    setOpen(false);
    setOpenGroup(null);
  }, [pathname]);

  /* Menu acikken arka plan kaymasin + Esc ile kapansin. */
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href.replace(/\/$/, ""));

  return (
    <>
      <a
        href="#icerik"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-copper-600 focus:px-5 focus:py-3 focus:font-semibold focus:text-white"
      >
        İçeriğe geç
      </a>

      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#071322]/95 shadow-[0_4px_24px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-all duration-300">
        <div className="container-x flex h-20 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3.5" aria-label={`${site.name} ana sayfa`}>
            <LogoMark />
            <span className="flex flex-col leading-none">
              <span className="text-xl font-black tracking-[0.16em] text-white">
                {site.shortName}
              </span>
              <span className="mt-1 text-[0.62rem] font-bold tracking-[0.26em] text-copper-400 uppercase">
                {site.tagline}
              </span>
            </span>
          </Link>

          {/* Masaustu navigasyon */}
          <nav aria-label="Ana menü" className="hidden lg:block">
            <ul className="flex items-center gap-1.5">
              {mainNav.map((item) => (
                <li key={item.href} className="group relative">
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                      isActive(item.href)
                        ? "bg-copper-600 text-white shadow-md shadow-copper-600/30"
                        : "text-white/85 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.children && (
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                        <path d="M2.5 4.5 6 8l3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    )}
                  </Link>

                  {item.children && (
                    <div className="invisible absolute left-0 top-full w-72 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                      <ul className="max-h-[70vh] overflow-y-auto rounded-2xl border border-white/15 bg-[#0a1c30] p-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl">
                        {item.children.map((c) => (
                          <li key={c.href}>
                            <Link
                              href={c.href}
                              className="block rounded-xl px-4 py-2.5 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                            >
                              {c.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Aksiyon Butonu & Mobil Menü Butonu */}
          <div className="flex items-center gap-3">
            <PhoneButton size="sm" label="7/24 Hemen Ara" className="hidden sm:inline-flex" />

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobil-menu"
              aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
              className="grid size-11 place-items-center rounded-xl border border-white/20 bg-white/10 text-white transition hover:bg-white/20 lg:hidden"
            >
              <span className="relative block h-3.5 w-5">
                <span
                  className={`absolute inset-x-0 top-0 h-0.5 rounded bg-current transition-transform duration-300 ${
                    open ? "translate-y-[6px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute inset-x-0 top-[6px] h-0.5 rounded bg-current transition-opacity duration-200 ${
                    open ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`absolute inset-x-0 top-[12px] h-0.5 rounded bg-current transition-transform duration-300 ${
                    open ? "-translate-y-[6px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobil menu */}
      <div
        id="mobil-menu"
        ref={panelRef}
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-20 z-40 overflow-y-auto border-t border-white/10 bg-[#071322] text-white lg:hidden"
      >
        <nav aria-label="Mobil menü" className="container-x py-6">
          <ul className="space-y-1">
            {mainNav.map((item) => (
              <li key={item.href} className="border-b border-white/10">
                <div className="flex items-center">
                  <Link
                    href={item.href}
                    className={`flex-1 py-4 text-lg font-semibold ${
                      isActive(item.href) ? "text-copper-400" : "text-white"
                    }`}
                    aria-current={isActive(item.href) ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <button
                      type="button"
                      onClick={() =>
                        setOpenGroup((g) => (g === item.href ? null : item.href))
                      }
                      aria-expanded={openGroup === item.href}
                      aria-label={`${item.label} alt menüsünü ${
                        openGroup === item.href ? "kapat" : "aç"
                      }`}
                      className="grid size-11 place-items-center rounded-xl text-copper-400"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 12 12"
                        fill="none"
                        className={`transition-transform duration-300 ${
                          openGroup === item.href ? "rotate-180" : ""
                        }`}
                        aria-hidden="true"
                      >
                        <path d="M2.5 4.5 6 8l3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </button>
                  )}
                </div>

                {item.children && openGroup === item.href && (
                  <ul className="mb-4 space-y-1 border-l-2 border-copper-500 pl-4">
                    {item.children.map((c) => (
                      <li key={c.href}>
                        <Link
                          href={c.href}
                          className="block py-2.5 text-base font-medium text-white/75 hover:text-white"
                        >
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}

function LogoMark() {
  return (
    <div className="relative size-10 shrink-0 overflow-hidden rounded-xl shadow-md transition-transform duration-200 group-hover:scale-105">
      <svg viewBox="0 0 512 512" className="size-full">
        <defs>
          <linearGradient id="hdrBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#060e1a"/>
            <stop offset="50%" stopColor="#0b1c30"/>
            <stop offset="100%" stopColor="#040a12"/>
          </linearGradient>
          <linearGradient id="hdrAq" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8"/>
            <stop offset="50%" stopColor="#0ea5e9"/>
            <stop offset="100%" stopColor="#0284c7"/>
          </linearGradient>
          <linearGradient id="hdrCop" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fb923c"/>
            <stop offset="40%" stopColor="#f97316"/>
            <stop offset="75%" stopColor="#ea580c"/>
            <stop offset="100%" stopColor="#9a3412"/>
          </linearGradient>
          <linearGradient id="hdrSil" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff"/>
            <stop offset="40%" stopColor="#f1f5f9"/>
            <stop offset="80%" stopColor="#cbd5e1"/>
            <stop offset="100%" stopColor="#64748b"/>
          </linearGradient>
          <linearGradient id="hdrBdr" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f97316"/>
            <stop offset="50%" stopColor="#38bdf8"/>
            <stop offset="100%" stopColor="#ea580c"/>
          </linearGradient>
        </defs>
        <rect width="512" height="512" rx="120" fill="url(#hdrBg)"/>
        <path d="M64 128 h384 M64 256 h384 M64 384 h384 M128 64 v384 M256 64 v384 M384 64 v384" stroke="#38bdf8" strokeWidth="1.5" strokeOpacity="0.08" strokeDasharray="4 8"/>
        <rect x="16" y="16" width="480" height="480" rx="106" fill="none" stroke="url(#hdrBdr)" strokeWidth="6" strokeOpacity="0.6"/>
        <g>
          <path d="M256 68 C256 68, 316 148, 316 198 C316 231, 289 258, 256 258 C223 258, 196 231, 196 198 C196 148, 256 68, 256 68 Z" fill="url(#hdrAq)"/>
          <ellipse cx="238" cy="186" rx="10" ry="20" transform="rotate(-30 238 186)" fill="#ffffff" opacity="0.55"/>
          <circle cx="256" cy="198" r="16" fill="none" stroke="#ffffff" strokeWidth="3" strokeOpacity="0.6"/>
          <circle cx="256" cy="198" r="6" fill="#ffffff" opacity="0.9"/>
          <rect x="96" y="180" width="56" height="236" rx="24" fill="url(#hdrSil)"/>
          <rect x="90" y="210" width="68" height="14" rx="7" fill="url(#hdrAq)" opacity="0.9"/>
          <rect x="90" y="370" width="68" height="14" rx="7" fill="url(#hdrAq)" opacity="0.9"/>
          <rect x="360" y="180" width="56" height="236" rx="24" fill="url(#hdrCop)"/>
          <rect x="354" y="210" width="68" height="14" rx="7" fill="#fbbf24" opacity="0.9"/>
          <rect x="354" y="370" width="68" height="14" rx="7" fill="#fbbf24" opacity="0.9"/>
          <path d="M136 198 L256 342 L216 376 L96 232 Z" fill="url(#hdrSil)"/>
          <path d="M376 198 L256 342 L296 376 L416 232 Z" fill="url(#hdrCop)"/>
          <circle cx="256" cy="342" r="38" fill="#060e1a" stroke="url(#hdrCop)" strokeWidth="12"/>
          <circle cx="256" cy="342" r="22" fill="url(#hdrAq)"/>
          <circle cx="256" cy="342" r="10" fill="#ffffff" opacity="0.85"/>
          <circle cx="256" cy="310" r="3.5" fill="#fde047"/>
          <circle cx="256" cy="374" r="3.5" fill="#fde047"/>
          <circle cx="224" cy="342" r="3.5" fill="#fde047"/>
          <circle cx="288" cy="342" r="3.5" fill="#fde047"/>
        </g>
      </svg>
    </div>
  );
}
