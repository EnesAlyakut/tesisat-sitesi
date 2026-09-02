"use client";

import Link from "next/link";
import { runtimeTelHref, runtimeWhatsappHref, useRuntimeSite } from "@/components/providers/RuntimeSiteContext";
import { footerNav } from "@/lib/nav";

export default function Footer() {
  const site = useRuntimeSite();
  const telHref = runtimeTelHref(site);
  const whatsappHref = runtimeWhatsappHref(site);

  return (
    <footer className="relative bg-[#071322] text-white">
      {/* 1. Belirgin Üst Ayırıcı Şerit */}
      <div className="h-1.5 w-full bg-gradient-to-r from-copper-500 via-aqua-400 to-copper-500 shadow-md shadow-copper-500/20" />

      {/* 2. Üst Kurumsal Nitelik ve Güven Şeridi */}
      <div className="border-b border-white/[0.08] bg-[#050e1a]">
        <div className="container-x py-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center gap-3.5">
              <div className="grid size-11 shrink-0 place-items-center rounded-xl border border-copper-500/30 bg-copper-500/10 text-copper-400">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-bold text-white">Yetkili Teknik Servis</p>
                <p className="text-xs text-white/60">Garantili &amp; profesyonel işçilik</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="grid size-11 shrink-0 place-items-center rounded-xl border border-aqua-500/30 bg-aqua-500/10 text-aqua-400">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-bold text-white">7/24 Kesintisiz Hizmet</p>
                <p className="text-xs text-white/60">Acil durum mobil nöbetçi ekip</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="grid size-11 shrink-0 place-items-center rounded-xl border border-copper-500/30 bg-copper-500/10 text-copper-400">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-bold text-white">Teknolojik Cihazlar</p>
                <p className="text-xs text-white/60">Termal kamera &amp; robot spiral</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="grid size-11 shrink-0 place-items-center rounded-xl border border-aqua-500/30 bg-aqua-500/10 text-aqua-400">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-bold text-white">İstanbul Geneli</p>
                <p className="text-xs text-white/60">Tüm ilçe ve semtlere servis</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Ana Footer İçeriği (Dengeli 4 Sütunlu Grid) */}
      <div className="container-x py-16 lg:py-20">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* 1. Sütun: Kurumsal Marka, Logo & Açıklama (4 Kolon) */}
          <div className="lg:col-span-4">
            <Link href="/" className="group flex items-center gap-3.5" aria-label={`${site.name} ana sayfa`}>
              <FooterLogoMark />
              <div>
                <p className="text-xl font-black tracking-[0.16em] text-white">
                  {site.shortName}
                </p>
                <p className="text-[0.62rem] font-bold tracking-[0.26em] text-copper-400 uppercase">
                  {site.tagline}
                </p>
              </div>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/70">
              {site.description}
            </p>

            {/* İletişim Aksiyonları */}
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={telHref}
                className="inline-flex items-center gap-2.5 rounded-xl border border-white/15 bg-white/[0.06] px-4 py-2.5 text-xs font-bold text-white transition hover:border-copper-400 hover:bg-copper-600 hover:text-white"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>{site.phoneDisplay}</span>
              </a>

              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-xl border border-emerald-500/40 bg-emerald-950/40 px-4 py-2.5 text-xs font-bold text-emerald-300 transition hover:border-emerald-400 hover:bg-emerald-900/60 hover:text-white"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
                <span>WhatsApp İletişim</span>
              </a>
            </div>
          </div>

          {/* 2. Sütun: Hizmetlerimiz (3 Kolon) */}
          <div className="lg:col-span-3">
            <FooterColumn title="Hizmetlerimiz" links={footerNav.hizmetler} />
          </div>

          {/* 3. Sütun: Kurumsal (2 Kolon) */}
          <div className="lg:col-span-2">
            <FooterColumn title="Kurumsal" links={footerNav.kurumsal} />
          </div>

          {/* 4. Sütun: Yasal & Güvence (3 Kolon) */}
          <div className="lg:col-span-3">
            <FooterColumn title="Yasal &amp; Güvence" links={footerNav.yasal} />
          </div>
        </div>

        {/* 4. Alt Telif & Bilgi Şeridi */}
        <div className="mt-16 flex flex-col gap-4 border-t border-white/[0.08] pt-8 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © 2026 Telif Hakkı <strong className="font-bold text-white">©Lizart Dijital</strong> Saklıdır.
          </p>
          <p className="text-white/70">
            İstanbul Geneli Profesyonel Sıhhi Tesisat, Kırmadan Kaçak Tespiti &amp; Robotla Tıkanıklık Açma Servisi.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <nav aria-label={title}>
      <p className="mb-4 text-xs font-bold tracking-[0.2em] text-copper-300 uppercase">
        {title}
      </p>
      <ul className="space-y-3">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="text-sm font-medium text-white/70 transition-colors hover:text-copper-300"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function FooterLogoMark() {
  return (
    <div className="relative size-11 shrink-0 overflow-hidden rounded-xl shadow-lg transition-transform duration-200 group-hover:scale-105">
      <svg viewBox="0 0 512 512" className="size-full">
        <defs>
          <linearGradient id="ftrBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#060e1a"/>
            <stop offset="50%" stopColor="#0b1c30"/>
            <stop offset="100%" stopColor="#040a12"/>
          </linearGradient>
          <linearGradient id="ftrAq" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8"/>
            <stop offset="50%" stopColor="#0ea5e9"/>
            <stop offset="100%" stopColor="#0284c7"/>
          </linearGradient>
          <linearGradient id="ftrCop" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fb923c"/>
            <stop offset="40%" stopColor="#f97316"/>
            <stop offset="75%" stopColor="#ea580c"/>
            <stop offset="100%" stopColor="#9a3412"/>
          </linearGradient>
          <linearGradient id="ftrSil" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff"/>
            <stop offset="40%" stopColor="#f1f5f9"/>
            <stop offset="80%" stopColor="#cbd5e1"/>
            <stop offset="100%" stopColor="#64748b"/>
          </linearGradient>
          <linearGradient id="ftrBdr" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f97316"/>
            <stop offset="50%" stopColor="#38bdf8"/>
            <stop offset="100%" stopColor="#ea580c"/>
          </linearGradient>
        </defs>
        <rect width="512" height="512" rx="120" fill="url(#ftrBg)"/>
        <path d="M64 128 h384 M64 256 h384 M64 384 h384 M128 64 v384 M256 64 v384 M384 64 v384" stroke="#38bdf8" strokeWidth="1.5" strokeOpacity="0.08" strokeDasharray="4 8"/>
        <rect x="16" y="16" width="480" height="480" rx="106" fill="none" stroke="url(#ftrBdr)" strokeWidth="6" strokeOpacity="0.6"/>
        <g>
          <path d="M256 68 C256 68, 316 148, 316 198 C316 231, 289 258, 256 258 C223 258, 196 231, 196 198 C196 148, 256 68, 256 68 Z" fill="url(#ftrAq)"/>
          <ellipse cx="238" cy="186" rx="10" ry="20" transform="rotate(-30 238 186)" fill="#ffffff" opacity="0.55"/>
          <circle cx="256" cy="198" r="16" fill="none" stroke="#ffffff" strokeWidth="3" strokeOpacity="0.6"/>
          <circle cx="256" cy="198" r="6" fill="#ffffff" opacity="0.9"/>
          <rect x="96" y="180" width="56" height="236" rx="24" fill="url(#ftrSil)"/>
          <rect x="90" y="210" width="68" height="14" rx="7" fill="url(#ftrAq)" opacity="0.9"/>
          <rect x="90" y="370" width="68" height="14" rx="7" fill="url(#ftrAq)" opacity="0.9"/>
          <rect x="360" y="180" width="56" height="236" rx="24" fill="url(#ftrCop)"/>
          <rect x="354" y="210" width="68" height="14" rx="7" fill="#fbbf24" opacity="0.9"/>
          <rect x="354" y="370" width="68" height="14" rx="7" fill="#fbbf24" opacity="0.9"/>
          <path d="M136 198 L256 342 L216 376 L96 232 Z" fill="url(#ftrSil)"/>
          <path d="M376 198 L256 342 L296 376 L416 232 Z" fill="url(#ftrCop)"/>
          <circle cx="256" cy="342" r="38" fill="#060e1a" stroke="url(#ftrCop)" strokeWidth="12"/>
          <circle cx="256" cy="342" r="22" fill="url(#ftrAq)"/>
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
