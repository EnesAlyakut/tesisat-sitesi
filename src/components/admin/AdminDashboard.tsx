"use client";

import { ChangeEvent, useEffect, useState } from "react";
import type { CmsContent, CmsHeroSlide, CmsSiteSettings } from "@/lib/cms-types";

type Tab = "dashboard" | "site" | "hero" | "sections" | "trust" | "system";

const sectionInfo: Partial<Record<keyof CmsContent["homeSections"], { title: string; text: string }>> = {
  trust: { title: "Güven Şeridi", text: "Hero altındaki kayan özellik bandı" },
  services: { title: "Hizmet Kartları", text: "Öne çıkan hizmet blokları" },
  whyMarsak: { title: "Neden Marsak", text: "Çalışma prensipleri ve kurumsal avantajlar" },
  process: { title: "Çalışma Süreci", text: "4 adımlı profesyonel müdahale akışı" },
  equipment: { title: "Teknolojik Ekipmanlar", text: "Kullanılan profesyonel cihaz kartları" },
  pricing: { title: "Fiyatlandırma", text: "Fiyatı belirleyen unsurlar ve şeffaf tarife" },
  contact: { title: "İletişim Çağrısı (CTA)", text: "Sayfa sonundaki acil arama ve WhatsApp alanı" },
};

const navGroups: Array<{ label: string; items: Array<{ key: Tab; label: string; icon: string }> }> = [
  { label: "GENEL", items: [
    { key: "dashboard", label: "Kontrol Merkezi", icon: "grid" },
    { key: "site", label: "İşletme Bilgileri", icon: "building" },
  ]},
  { label: "ANA SAYFA", items: [
    { key: "hero", label: "Hero Slaytları", icon: "image" },
    { key: "sections", label: "Bölüm Yönetimi", icon: "layout" },
    { key: "trust", label: "Güven Şeridi", icon: "badge" },
  ]},
  { label: "SİSTEM", items: [
    { key: "system", label: "Sistem Durumu", icon: "settings" },
  ]},
];

export default function AdminDashboard({ initialContent }: { initialContent: CmsContent }) {
  const [content, setContent] = useState(initialContent);
  const [savedSnapshot, setSavedSnapshot] = useState(JSON.stringify(initialContent));
  const [tab, setTab] = useState<Tab>("dashboard");
  const [status, setStatus] = useState<{ kind: "ok" | "error"; text: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const dirty = JSON.stringify(content) !== savedSnapshot;
  const sectionKeys = Object.keys(sectionInfo) as Array<keyof typeof sectionInfo>;
  const visibleCount = sectionKeys.filter((k) => content.homeSections[k as keyof CmsContent["homeSections"]]).length;
  const totalSections = sectionKeys.length;

  useEffect(() => {
    const beforeUnload = (event: BeforeUnloadEvent) => { if (dirty) event.preventDefault(); };
    const shortcut = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "s") { event.preventDefault(); void save(); }
    };
    window.addEventListener("beforeunload", beforeUnload);
    window.addEventListener("keydown", shortcut);
    return () => { window.removeEventListener("beforeunload", beforeUnload); window.removeEventListener("keydown", shortcut); };
  });

  const updateSite = (key: keyof CmsSiteSettings, value: string) =>
    setContent((current) => ({ ...current, site: { ...current.site, [key]: value } }));
  const updateSlide = (index: number, key: keyof CmsHeroSlide, value: string) =>
    setContent((current) => ({ ...current, heroSlides: current.heroSlides.map((slide, i) => i === index ? { ...slide, [key]: value } : slide) }));

  function move<T>(items: T[], index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= items.length) return items;
    const next = [...items]; [next[index], next[target]] = [next[target], next[index]]; return next;
  }

  async function upload(index: number, event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]; if (!file) return;
    setStatus(null);
    const form = new FormData(); form.append("file", file);
    const response = await fetch("/api/admin/upload/", { method: "POST", body: form });
    const result = await response.json();
    if (!response.ok) { setStatus({ kind: "error", text: result.error || "Görsel yüklenemedi." }); return; }
    updateSlide(index, "image", result.path);
    setStatus({ kind: "ok", text: "Görsel yüklendi; yayınlamak için değişiklikleri kaydedin." });
  }

  async function save() {
    if (busy) return;
    setBusy(true); setStatus(null);
    const response = await fetch("/api/admin/content/", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(content) });
    const result = await response.json(); setBusy(false);
    if (!response.ok) { setStatus({ kind: "error", text: result.error || "Değişiklikler kaydedilemedi." }); return; }
    setContent(result.content); setSavedSnapshot(JSON.stringify(result.content));
    setStatus({ kind: "ok", text: "Tüm değişiklikler siteye yayınlandı." });
  }

  async function logout() { await fetch("/api/admin/logout/", { method: "POST" }); window.location.href = "/admin/login/"; }
  function openTab(next: Tab) { setTab(next); setSidebarOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }

  return (
    <main className="min-h-screen bg-[#edf2f8] text-ink pb-24 lg:pb-12">
      {/* 1. Üst Yönetim Başlığı (Header) */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#071322] text-white shadow-xl backdrop-blur-xl">
        <div className="mx-auto flex h-16 sm:h-20 max-w-[1600px] items-center justify-between gap-2 px-3 sm:px-8">
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            <button
              onClick={() => setSidebarOpen((v) => !v)}
              aria-label="Menüyü aç"
              className="grid size-9 sm:size-10 place-items-center rounded-xl border border-white/15 bg-white/10 text-white transition hover:bg-white/20 lg:hidden"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6"/>
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>

            <div className="relative size-8 sm:size-10 shrink-0 overflow-hidden rounded-xl shadow-md">
              <svg viewBox="0 0 512 512" className="size-full">
                <defs>
                  <linearGradient id="admHdrBg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#060e1a"/>
                    <stop offset="50%" stopColor="#0b1c30"/>
                    <stop offset="100%" stopColor="#040a12"/>
                  </linearGradient>
                  <linearGradient id="admHdrAq" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#38bdf8"/>
                    <stop offset="50%" stopColor="#0ea5e9"/>
                    <stop offset="100%" stopColor="#0284c7"/>
                  </linearGradient>
                  <linearGradient id="admHdrCop" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fb923c"/>
                    <stop offset="40%" stopColor="#f97316"/>
                    <stop offset="75%" stopColor="#ea580c"/>
                    <stop offset="100%" stopColor="#9a3412"/>
                  </linearGradient>
                  <linearGradient id="admHdrSil" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff"/>
                    <stop offset="40%" stopColor="#f1f5f9"/>
                    <stop offset="80%" stopColor="#cbd5e1"/>
                    <stop offset="100%" stopColor="#64748b"/>
                  </linearGradient>
                  <linearGradient id="admHdrBdr" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f97316"/>
                    <stop offset="50%" stopColor="#38bdf8"/>
                    <stop offset="100%" stopColor="#ea580c"/>
                  </linearGradient>
                </defs>
                <rect width="512" height="512" rx="120" fill="url(#admHdrBg)"/>
                <path d="M64 128 h384 M64 256 h384 M64 384 h384 M128 64 v384 M256 64 v384 M384 64 v384" stroke="#38bdf8" strokeWidth="1.5" strokeOpacity="0.08" strokeDasharray="4 8"/>
                <rect x="16" y="16" width="480" height="480" rx="106" fill="none" stroke="url(#admHdrBdr)" strokeWidth="6" strokeOpacity="0.6"/>
                <g>
                  <path d="M256 68 C256 68, 316 148, 316 198 C316 231, 289 258, 256 258 C223 258, 196 231, 196 198 C196 148, 256 68, 256 68 Z" fill="url(#admHdrAq)"/>
                  <ellipse cx="238" cy="186" rx="10" ry="20" transform="rotate(-30 238 186)" fill="#ffffff" opacity="0.55"/>
                  <circle cx="256" cy="198" r="16" fill="none" stroke="#ffffff" strokeWidth="3" strokeOpacity="0.6"/>
                  <circle cx="256" cy="198" r="6" fill="#ffffff" opacity="0.9"/>
                  <rect x="96" y="180" width="56" height="236" rx="24" fill="url(#admHdrSil)"/>
                  <rect x="90" y="210" width="68" height="14" rx="7" fill="url(#admHdrAq)" opacity="0.9"/>
                  <rect x="90" y="370" width="68" height="14" rx="7" fill="url(#admHdrAq)" opacity="0.9"/>
                  <rect x="360" y="180" width="56" height="236" rx="24" fill="url(#admHdrCop)"/>
                  <rect x="354" y="210" width="68" height="14" rx="7" fill="#fbbf24" opacity="0.9"/>
                  <rect x="354" y="370" width="68" height="14" rx="7" fill="#fbbf24" opacity="0.9"/>
                  <path d="M136 198 L256 342 L216 376 L96 232 Z" fill="url(#admHdrSil)"/>
                  <path d="M376 198 L256 342 L296 376 L416 232 Z" fill="url(#admHdrCop)"/>
                  <circle cx="256" cy="342" r="38" fill="#060e1a" stroke="url(#admHdrCop)" strokeWidth="12"/>
                  <circle cx="256" cy="342" r="22" fill="url(#admHdrAq)"/>
                  <circle cx="256" cy="342" r="10" fill="#ffffff" opacity="0.85"/>
                  <circle cx="256" cy="310" r="3.5" fill="#fde047"/>
                  <circle cx="256" cy="374" r="3.5" fill="#fde047"/>
                  <circle cx="224" cy="342" r="3.5" fill="#fde047"/>
                  <circle cx="288" cy="342" r="3.5" fill="#fde047"/>
                </g>
              </svg>
            </div>

            <div>
              <p className="text-[0.58rem] sm:text-[0.62rem] font-bold tracking-[0.24em] text-copper-400 uppercase">
                MARSAK TEKNİK
              </p>
              <h1 className="text-sm sm:text-lg font-bold tracking-wide text-white truncate max-w-[130px] sm:max-w-none">
                Yönetim Paneli
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-3">
            <span className={`hidden items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold md:flex ${dirty ? "bg-amber-500/20 text-amber-300 border border-amber-500/30" : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"}`}>
              <span className={`size-2 rounded-full ${dirty ? "bg-amber-400 animate-pulse" : "bg-emerald-400"}`} />
              {dirty ? "Kaydedilmedi" : "Yayında"}
            </span>

            <a
              href="/"
              target="_blank"
              className="rounded-xl border border-white/15 bg-white/5 px-2.5 sm:px-4 py-1.5 sm:py-2 text-[0.75rem] sm:text-xs font-bold text-white transition hover:border-copper-400 hover:bg-copper-600 hover:text-white"
            >
              <span className="hidden sm:inline">Siteyi Gör </span>↗
            </a>

            <button
              onClick={logout}
              className="rounded-xl border border-red-500/30 bg-red-500/10 px-2.5 sm:px-4 py-1.5 sm:py-2 text-[0.75rem] sm:text-xs font-bold text-red-300 transition hover:bg-red-600 hover:text-white"
            >
              Çıkış
            </button>
          </div>
        </div>
      </header>

      {/* 2. Ana Panel Izgarası */}
      <div className="mx-auto grid max-w-[1600px] gap-6 sm:gap-8 px-3 sm:px-8 py-5 sm:py-8 lg:grid-cols-[280px_minmax(0,1fr)]">
        {sidebarOpen && (
          <button
            aria-label="Menüyü kapat"
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-[#071322]/80 backdrop-blur-sm lg:hidden transition-opacity"
          />
        )}

        {/* Sol Menü (Sidebar Drawer) */}
        <aside className={`fixed inset-y-0 left-0 z-50 flex w-[280px] sm:w-[300px] flex-col overflow-y-auto border-r border-white/10 bg-[#071322] p-5 text-white shadow-2xl transition-transform duration-300 lg:sticky lg:top-28 lg:z-0 lg:h-[calc(100vh-8.5rem)] lg:w-auto lg:translate-x-0 lg:rounded-3xl lg:border lg:shadow-md ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="mb-6 flex items-center justify-between px-2 lg:hidden">
            <strong className="text-sm font-bold text-copper-300 uppercase tracking-wider">Yönetim Menüsü</strong>
            <button onClick={() => setSidebarOpen(false)} aria-label="Kapat" className="grid size-9 place-items-center rounded-xl bg-white/10 text-lg text-white hover:bg-white/20">✕</button>
          </div>

          <div className="space-y-6">
            {navGroups.map((group) => (
              <div key={group.label}>
                <p className="mb-2.5 px-3 text-[0.65rem] font-bold tracking-[0.2em] text-copper-400 uppercase">
                  {group.label}
                </p>
                <div className="space-y-1">
                  {group.items.map((item) => (
                    <button
                      key={item.key}
                      onClick={() => openTab(item.key)}
                      className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-left text-sm font-semibold transition-all ${
                        tab === item.key
                          ? "bg-copper-600 text-white shadow-lg shadow-copper-900/40"
                          : "text-white/75 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <NavIcon name={item.icon} />
                      <span>{item.label}</span>
                      {item.key === "hero" && <Count value={content.heroSlides.length} active={tab === item.key} />}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-auto pt-6">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
              <p className="text-[0.68rem] font-bold tracking-wider text-copper-300 uppercase">
                MARSAK TEKNİK CMS
              </p>
              <p className="mt-1 text-xs text-white/60">Sürüm 2.4 • Mobil Uyumlu</p>
            </div>
          </div>
        </aside>

        {/* Sağ İçerik Alanı */}
        <section className="min-w-0">
          {tab === "dashboard" && <Dashboard content={content} visibleCount={visibleCount} totalSections={totalSections} openTab={openTab} />}
          {tab === "site" && <SiteEditor content={content} updateSite={updateSite} />}
          {tab === "hero" && <HeroEditor content={content} setContent={setContent} updateSlide={updateSlide} upload={upload} move={move} />}
          {tab === "sections" && <SectionsEditor content={content} setContent={setContent} />}
          {tab === "trust" && <TrustEditor content={content} setContent={setContent} move={move} />}
          {tab === "system" && <SystemPanel content={content} visibleCount={visibleCount} totalSections={totalSections} />}

          {/* Sabit Kaydetme Çubuğu */}
          <div className="sticky bottom-3 sm:bottom-4 z-30 mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 rounded-2xl border border-line bg-white/95 p-3.5 sm:p-4 shadow-xl backdrop-blur-xl">
            <div className="min-w-0">
              {status ? (
                <p role="status" className={`text-xs sm:text-sm font-bold truncate ${status.kind === "ok" ? "text-green-700" : "text-red-700"}`}>
                  {status.kind === "ok" ? "✓ " : "! "}
                  {status.text}
                </p>
              ) : (
                <p className="text-[0.72rem] sm:text-xs font-medium text-ink-mute">
                  {dirty ? "Kaydedilmemiş değişiklikler var." : "Tüm değişiklikler güncel."}
                </p>
              )}
            </div>
            <button
              onClick={() => void save()}
              disabled={busy || !dirty}
              className="w-full sm:w-auto rounded-xl bg-copper-600 px-6 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-copper-500 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {busy ? "Kaydediliyor…" : dirty ? "Değişiklikleri Yayınla" : "Değişiklik Yok"}
            </button>
          </div>
        </section>
      </div>
      <AdminStyles />
    </main>
  );
}

/* KONTROL MERKEZİ (DASHBOARD) */
function Dashboard({ content, visibleCount, totalSections, openTab }: { content: CmsContent; visibleCount: number; totalSections: number; openTab: (tab: Tab) => void }) {
  const updated = new Intl.DateTimeFormat("tr-TR", { dateStyle: "medium", timeStyle: "short" }).format(new Date(content.updatedAt));

  return (
    <div className="space-y-8">
      {/* 1. Üst Kurumsal Canlı Durum Kartı */}
      <div className="relative overflow-hidden rounded-3xl border border-[#1a3350] bg-gradient-to-br from-[#071322] via-[#0b1d33] to-[#071322] p-7 text-white shadow-xl sm:p-9">
        <div aria-hidden="true" className="blueprint-grid-dark pointer-events-none absolute inset-0 opacity-25" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 size-80 rounded-full bg-copper-500/10 blur-3xl" />

        <div className="relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-copper-400/30 bg-copper-500/15 px-3.5 py-1 text-xs font-bold tracking-wider text-copper-300 uppercase">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-green-500" />
              </span>
              Canlı Sistem Durumu
            </span>

            <span className="text-xs text-white/60">
              Son Güncelleme: <strong className="text-white">{updated}</strong>
            </span>
          </div>

          <h2 className="mt-4 text-2xl font-extrabold text-white sm:text-3xl">
            {content.site.name}
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/75">
            {content.site.description}
          </p>

          {/* 3 Canlı Bilgi Kutusu */}
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
              <p className="text-[0.65rem] font-bold tracking-wider text-copper-300 uppercase">İletişim Numarası</p>
              <p className="mt-1 text-base font-bold text-white">{content.site.phoneDisplay}</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
              <p className="text-[0.65rem] font-bold tracking-wider text-copper-300 uppercase">Çalışma Modu</p>
              <p className="mt-1 text-base font-bold text-emerald-300">{content.site.hoursLabel}</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
              <p className="text-[0.65rem] font-bold tracking-wider text-copper-300 uppercase">Hizmet Kapsamı</p>
              <p className="mt-1 truncate text-base font-bold text-white">{content.site.serviceArea}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Metrik Kartları */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="admin-card p-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold tracking-wider text-ink-mute uppercase">Aktif Bölümler</span>
            <span className="grid size-9 place-items-center rounded-xl bg-blue-50 text-blue-700">📊</span>
          </div>
          <strong className="mt-3 block text-3xl font-extrabold text-ink">{visibleCount}/{totalSections}</strong>
          <p className="mt-1 text-xs text-ink-soft">{totalSections - visibleCount} bölüm gizli</p>
        </div>

        <div className="admin-card p-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold tracking-wider text-ink-mute uppercase">Hero Slaytları</span>
            <span className="grid size-9 place-items-center rounded-xl bg-amber-50 text-amber-700">🖼️</span>
          </div>
          <strong className="mt-3 block text-3xl font-extrabold text-ink">{content.heroSlides.length}</strong>
          <p className="mt-1 text-xs text-ink-soft">Ana sayfa manşetleri</p>
        </div>

        <div className="admin-card p-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold tracking-wider text-ink-mute uppercase">Güven Şeridi</span>
            <span className="grid size-9 place-items-center rounded-xl bg-green-50 text-green-700">🛡️</span>
          </div>
          <strong className="mt-3 block text-3xl font-extrabold text-ink">{content.trustItems.length}</strong>
          <p className="mt-1 text-xs text-ink-soft">Kayan bilgi maddesi</p>
        </div>

        <div className="admin-card p-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold tracking-wider text-ink-mute uppercase">Sistem Güvenliği</span>
            <span className="grid size-9 place-items-center rounded-xl bg-purple-50 text-purple-700">🔒</span>
          </div>
          <strong className="mt-3 block text-3xl font-extrabold text-ink">Aktif</strong>
          <p className="mt-1 text-xs text-ink-soft">JSON depolama devrede</p>
        </div>
      </div>

      {/* 3. Hızlı Yönetim Kartları */}
      <div className="admin-card p-7 sm:p-8">
        <PanelTitle
          title="Hızlı Yönetim İşlemleri"
          text="Sık kullanılan yönetim alanlarına tek tıkla ulaşarak güncellemelerinizi gerçekleştirin."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <button
            onClick={() => openTab("hero")}
            className="group flex flex-col justify-between rounded-2xl border border-line bg-canvas-50 p-5 text-left transition-all duration-200 hover:-translate-y-1 hover:border-copper-400 hover:bg-white hover:shadow-lg"
          >
            <div>
              <span className="grid size-11 place-items-center rounded-xl bg-white text-copper-600 shadow-sm transition group-hover:bg-copper-600 group-hover:text-white">
                <NavIcon name="image" />
              </span>
              <h3 className="mt-4 text-base font-bold text-ink">Hero Slaytları</h3>
              <p className="mt-1 text-xs leading-relaxed text-ink-soft">
                Ana sayfa manşet görsellerini, başlıkları ve buton linklerini düzenleyin.
              </p>
            </div>
            <span className="mt-4 block text-xs font-bold text-copper-600 group-hover:underline">
              Slaytları Düzenle →
            </span>
          </button>

          <button
            onClick={() => openTab("site")}
            className="group flex flex-col justify-between rounded-2xl border border-line bg-canvas-50 p-5 text-left transition-all duration-200 hover:-translate-y-1 hover:border-copper-400 hover:bg-white hover:shadow-lg"
          >
            <div>
              <span className="grid size-11 place-items-center rounded-xl bg-white text-copper-600 shadow-sm transition group-hover:bg-copper-600 group-hover:text-white">
                <NavIcon name="building" />
              </span>
              <h3 className="mt-4 text-base font-bold text-ink">İşletme Bilgileri</h3>
              <p className="mt-1 text-xs leading-relaxed text-ink-soft">
                Telefon, WhatsApp, çalışma saatleri ve firma tanıtım metinlerini güncelleyin.
              </p>
            </div>
            <span className="mt-4 block text-xs font-bold text-copper-600 group-hover:underline">
              Bilgileri Güncelle →
            </span>
          </button>

          <button
            onClick={() => openTab("sections")}
            className="group flex flex-col justify-between rounded-2xl border border-line bg-canvas-50 p-5 text-left transition-all duration-200 hover:-translate-y-1 hover:border-copper-400 hover:bg-white hover:shadow-lg"
          >
            <div>
              <span className="grid size-11 place-items-center rounded-xl bg-white text-copper-600 shadow-sm transition group-hover:bg-copper-600 group-hover:text-white">
                <NavIcon name="layout" />
              </span>
              <h3 className="mt-4 text-base font-bold text-ink">Bölüm Yönetimi</h3>
              <p className="mt-1 text-xs leading-relaxed text-ink-soft">
                Ana sayfadaki bölümleri silmeden yayından kaldırın veya tekrar görünür yapın.
              </p>
            </div>
            <span className="mt-4 block text-xs font-bold text-copper-600 group-hover:underline">
              Bölümleri Yönet →
            </span>
          </button>

          <button
            onClick={() => openTab("trust")}
            className="group flex flex-col justify-between rounded-2xl border border-line bg-canvas-50 p-5 text-left transition-all duration-200 hover:-translate-y-1 hover:border-copper-400 hover:bg-white hover:shadow-lg"
          >
            <div>
              <span className="grid size-11 place-items-center rounded-xl bg-white text-copper-600 shadow-sm transition group-hover:bg-copper-600 group-hover:text-white">
                <NavIcon name="badge" />
              </span>
              <h3 className="mt-4 text-base font-bold text-ink">Güven Şeridi</h3>
              <p className="mt-1 text-xs leading-relaxed text-ink-soft">
                Hero altındaki kayan bantta yer alan kısa özellikleri ve güvenceleri yönetin.
              </p>
            </div>
            <span className="mt-4 block text-xs font-bold text-copper-600 group-hover:underline">
              Şeridi Yönet →
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* İŞLETME BİLGİLERİ EDİTÖRÜ */
function SiteEditor({ content, updateSite }: { content: CmsContent; updateSite: (key: keyof CmsSiteSettings, value: string) => void }) {
  return (
    <div className="space-y-6">
      <PageHead kicker="SİTE AYARLARI" title="İşletme Bilgileri" text="Marka, iletişim ve hizmet bilgileri sitenin tüm ortak alanlarında anında güncellenir." />
      <EditorCard title="Marka Kimliği" text="Logo yanında ve sayfa altlarında kullanılan temel marka metinleri.">
        <div className="admin-form-grid">
          <Field label="İşletme Adı" value={content.site.name} onChange={(v)=>updateSite("name",v)} />
          <Field label="Kısa Marka Adı" value={content.site.shortName} onChange={(v)=>updateSite("shortName",v)} max={30} />
          <Field label="Alt Marka Yazısı" value={content.site.tagline} onChange={(v)=>updateSite("tagline",v)} max={60} />
          <Field label="İşletme Açıklaması" value={content.site.description} onChange={(v)=>updateSite("description",v)} textarea wide max={500} />
        </div>
      </EditorCard>

      <EditorCard title="İletişim Kanalları" text="Butonlar, mobil iletişim çubuğu ve iletişim sayfasında kullanılan bilgiler.">
        <div className="admin-form-grid">
          <Field label="Görünen Telefon" value={content.site.phoneDisplay} onChange={(v)=>updateSite("phoneDisplay",v)} hint="Örnek: 0536 463 82 84" />
          <Field label="Arama Numarası" value={content.site.phoneRaw} onChange={(v)=>updateSite("phoneRaw",v)} hint="+905364638284" />
          <Field label="WhatsApp Numarası" value={content.site.whatsappRaw} onChange={(v)=>updateSite("whatsappRaw",v)} hint="905364638284" />
          <Field label="E-Posta Adresi" value={content.site.email} onChange={(v)=>updateSite("email",v)} type="email" />
          <Field label="Varsayılan WhatsApp Mesajı" value={content.site.whatsappMessage} onChange={(v)=>updateSite("whatsappMessage",v)} textarea wide max={500} />
        </div>
      </EditorCard>

      <EditorCard title="Çalışma ve Hizmet Kapsamı" text="Müşterilere gösterilen servis saatleri ve hizmet alanı.">
        <div className="admin-form-grid">
          <Field label="Çalışma Saatleri" value={content.site.hoursLabel} onChange={(v)=>updateSite("hoursLabel",v)} />
          <Field label="Hizmet Alanı" value={content.site.serviceArea} onChange={(v)=>updateSite("serviceArea",v)} />
        </div>
      </EditorCard>
    </div>
  );
}

/* HERO SLAYT EDİTÖRÜ */
function HeroEditor({ content, setContent, updateSlide, upload, move }: { content: CmsContent; setContent: React.Dispatch<React.SetStateAction<CmsContent>>; updateSlide: (i:number,k:keyof CmsHeroSlide,v:string)=>void; upload:(i:number,e:ChangeEvent<HTMLInputElement>)=>void; move:<T>(a:T[],i:number,d:-1|1)=>T[] }) {
  const add = () => setContent((c)=>({...c,heroSlides:[...c.heroSlides,{image:"/images/hero/kacak-tespiti.png",alt:"",eyebrow:"Yeni Hizmet",title:"Yeni Slayt Başlığı",body:"Slayt açıklamasını buraya yazın.",href:"/hizmetler/",cta:"Hizmeti İncele"}]}));
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <PageHead kicker="ANA SAYFA" title="Hero Slaytları" text="Görselleri, metinleri, buton bağlantılarını ve gösterim sırasını yönetin." />
        <button onClick={add} disabled={content.heroSlides.length>=8} className="admin-primary">+ Yeni Slayt Ekle</button>
      </div>

      {content.heroSlides.map((slide,index)=>(
        <div key={index} className="admin-card overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-canvas-100 px-6 py-4">
            <div className="flex items-center gap-3">
              <span className="grid size-8 place-items-center rounded-lg bg-navy-900 text-sm font-bold text-white">{index+1}</span>
              <div>
                <h3 className="font-bold text-ink">{slide.title || "Başlıksız Slayt"}</h3>
                <p className="text-xs text-ink-mute">Sıra {index+1} • {slide.image}</p>
              </div>
            </div>
            <div className="flex gap-1.5">
              <MiniButton disabled={index===0} onClick={()=>setContent((c)=>({...c,heroSlides:move(c.heroSlides,index,-1)}))}>↑ Yukarı</MiniButton>
              <MiniButton disabled={index===content.heroSlides.length-1} onClick={()=>setContent((c)=>({...c,heroSlides:move(c.heroSlides,index,1)}))}>↓ Aşağı</MiniButton>
              <MiniButton onClick={()=>setContent((c)=>({...c,heroSlides:[...c.heroSlides.slice(0,index+1),{...slide,title:`${slide.title} (Kopya)`},...c.heroSlides.slice(index+1)]}))}>Kopyala</MiniButton>
              <MiniButton danger disabled={content.heroSlides.length===1} onClick={()=>setContent((c)=>({...c,heroSlides:c.heroSlides.filter((_,i)=>i!==index)}))}>Sil</MiniButton>
            </div>
          </div>

          <div className="grid gap-6 p-6 xl:grid-cols-[360px_1fr]">
            <div>
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-navy-900" style={{backgroundImage:`linear-gradient(90deg,rgba(7,18,31,.9),rgba(7,18,31,.2)),url(${slide.image})`,backgroundSize:"cover",backgroundPosition:"center"}}>
                <div className="absolute inset-x-5 bottom-5 text-white">
                  <p className="text-[.6rem] font-bold tracking-widest text-copper-300">{slide.eyebrow}</p>
                  <p className="mt-2 text-lg font-bold leading-tight">{slide.title}</p>
                </div>
              </div>
              <label className="mt-3 flex cursor-pointer items-center justify-center rounded-xl border border-dashed border-aqua-400 bg-aqua-50 px-4 py-3 text-sm font-bold text-aqua-700 hover:bg-aqua-100">
                Görsel Değiştir
                <input type="file" accept="image/jpeg,image/png,image/webp" onChange={(e)=>upload(index,e)} className="sr-only" />
              </label>
              <p className="mt-2 text-center text-[.68rem] text-ink-mute">JPG, PNG veya WebP • En fazla 6 MB</p>
            </div>

            <div className="admin-form-grid">
              <Field label="Üst Etiket" value={slide.eyebrow} onChange={(v)=>updateSlide(index,"eyebrow",v)} max={100} />
              <Field label="Buton Yazısı" value={slide.cta} onChange={(v)=>updateSlide(index,"cta",v)} max={100} />
              <Field label="Ana Başlık" value={slide.title} onChange={(v)=>updateSlide(index,"title",v)} max={160} wide />
              <Field label="Açıklama Metni" value={slide.body} onChange={(v)=>updateSlide(index,"body",v)} textarea max={600} wide />
              <Field label="Buton Bağlantısı" value={slide.href} onChange={(v)=>updateSlide(index,"href",v)} />
              <Field label="Görsel Yolu" value={slide.image} onChange={(v)=>updateSlide(index,"image",v)} />
              <Field label="Görsel Alt Metni (SEO)" value={slide.alt} onChange={(v)=>updateSlide(index,"alt",v)} max={200} wide hint="Görselin içeriğini erişilebilir biçimde açıklayın." />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* BÖLÜM YÖNETİMİ */
function SectionsEditor({ content, setContent }: { content:CmsContent; setContent:React.Dispatch<React.SetStateAction<CmsContent>> }) {
  return (
    <div className="space-y-6">
      <PageHead kicker="ANA SAYFA" title="Bölüm Yönetimi" text="Ana sayfada yer alan bölümleri silmeden yayından kaldırabilir veya tekrar görünür yapabilirsiniz." />
      <div className="grid gap-4 md:grid-cols-2">
        {(Object.keys(sectionInfo) as Array<keyof CmsContent["homeSections"]>).map((key)=>{
          const active = content.homeSections[key];
          const info = sectionInfo[key]!;
          return (
            <label key={key} className={`group cursor-pointer rounded-2xl border p-5 transition-all ${active?"border-aqua-300 bg-white shadow-sm":"border-dashed border-line-strong bg-slate-100 opacity-75"}`}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2.5">
                    <h3 className="font-bold text-ink">{info.title}</h3>
                    <span className={`rounded-full px-2.5 py-0.5 text-[.65rem] font-bold ${active?"bg-emerald-50 text-emerald-700":"bg-slate-200 text-slate-600"}`}>
                      {active ? "YAYINDA" : "GİZLİ"}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-ink-soft">{info.text}</p>
                </div>
                <span className={`relative mt-1 h-7 w-12 shrink-0 rounded-full transition ${active?"bg-copper-600":"bg-slate-300"}`}>
                  <input type="checkbox" className="sr-only" checked={active} onChange={(e)=>setContent((c)=>({...c,homeSections:{...c.homeSections,[key]:e.target.checked}}))} />
                  <span className={`absolute top-1 size-5 rounded-full bg-white shadow transition-all ${active?"left-6":"left-1"}`} />
                </span>
              </div>
            </label>
          );
        })}
      </div>
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
        <strong>Bilgi:</strong> Bir bölümü gizlemek içeriğini silmez. Tekrar açtığınızda kaldığı yerden yayınlanır.
      </div>
    </div>
  );
}

/* GÜVEN ŞERİDİ EDİTÖRÜ */
function TrustEditor({ content,setContent,move }:{content:CmsContent;setContent:React.Dispatch<React.SetStateAction<CmsContent>>;move:<T>(a:T[],i:number,d:-1|1)=>T[]}) {
  const add = () => setContent((c)=>({...c,trustItems:[...c.trustItems,"Yeni Özellik"]}));
  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <PageHead kicker="ANA SAYFA" title="Güven Şeridi" text="Hero altındaki kayan bilgi bandında gösterilen kısa özellikleri ve güvenceleri yönetin."/>
        <button onClick={add} disabled={content.trustItems.length>=20} className="admin-primary">+ Yeni İfade Ekle</button>
      </div>

      <div className="admin-card p-6">
        <div className="mb-6 overflow-hidden rounded-xl border border-line bg-canvas-100 py-4">
          <div className="flex w-max items-center">
            {content.trustItems.map((item,i)=>(
              <span key={i} className="flex items-center gap-3 px-5 text-xs font-bold tracking-wider text-ink-soft uppercase">
                <span className="size-1.5 rounded-full bg-copper-500"/>
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {content.trustItems.map((item,index)=>(
            <div key={index} className="flex items-center gap-2.5 rounded-xl border border-line p-3">
              <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-canvas-200 text-xs font-bold">{index+1}</span>
              <input value={item} maxLength={100} onChange={(e)=>setContent((c)=>({...c,trustItems:c.trustItems.map((v,i)=>i===index?e.target.value:v)}))} className="admin-input"/>
              <MiniButton disabled={index===0} onClick={()=>setContent((c)=>({...c,trustItems:move(c.trustItems,index,-1)}))}>↑</MiniButton>
              <MiniButton disabled={index===content.trustItems.length-1} onClick={()=>setContent((c)=>({...c,trustItems:move(c.trustItems,index,1)}))}>↓</MiniButton>
              <MiniButton danger onClick={()=>setContent((c)=>({...c,trustItems:c.trustItems.filter((_,i)=>i!==index)}))}>Sil</MiniButton>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* SİSTEM DURUMU */
function SystemPanel({content, visibleCount, totalSections}:{content:CmsContent; visibleCount: number; totalSections: number}) {
  return (
    <div className="space-y-6">
      <PageHead kicker="SİSTEM" title="Sistem Durumu" text="Yönetim panelinin teknik çalışma, güvenlik ve depolama özeti."/>
      <div className="grid gap-4 md:grid-cols-2">
        <SystemCard title="Kimlik Doğrulama" status="Aktif" lines={["Kullanıcı adı + şifre koruması","HTTP-only imzalı güvenli oturum","8 saat oturum süresi","Hatalı giriş hız sınırlaması"]}/>
        <SystemCard title="İçerik Depolama" status="Aktif" lines={["Dosya tabanlı JSON kayıt","Atomik kayıt işlemi (veri kaybı önleme)","Sunucu tarafı doğrulama",`Son kayıt: ${new Date(content.updatedAt).toLocaleString("tr-TR")}`]}/>
        <SystemCard title="Güvenlik Başlıkları" status="Aktif" lines={["Admin noindex/nofollow etiketi","X-Frame-Options: DENY","SameSite strict cookie","Origin/CSRF kontrolü"]}/><SystemCard title="Yayın Modeli" status="Dinamik" lines={["Değişiklikler anında yansır","Yeniden derleme gerekmez","Sunucuda yazma izni devrede","Görseller public/uploads altında"]}/>
      </div>
      <div className="admin-card p-6">
        <h3 className="text-lg font-bold text-ink">Veri Özeti</h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <InfoCell label="Slayt Sayısı" value={String(content.heroSlides.length)}/>
          <InfoCell label="Güven İfadeleri" value={String(content.trustItems.length)}/>
          <InfoCell label="Aktif Bölümler" value={`${visibleCount}/${totalSections}`}/>
        </div>
      </div>
    </div>
  );
}

/* YARDIMCI BİLEŞENLER */
function PageHead({kicker,title,text}:{kicker:string;title:string;text:string}) {
  return (
    <div>
      <p className="admin-kicker">{kicker}</p>
      <h2 className="admin-heading">{title}</h2>
      <p className="admin-lead">{text}</p>
    </div>
  );
}

function PanelTitle({title,text}:{title:string;text:string}) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-bold text-ink">{title}</h3>
      <p className="mt-1 text-sm text-ink-soft">{text}</p>
    </div>
  );
}

function EditorCard({title,text,children}:{title:string;text:string;children:React.ReactNode}) {
  return (
    <section className="admin-card p-6 sm:p-7">
      <PanelTitle title={title} text={text}/>
      {children}
    </section>
  );
}

function Field({label,value,onChange,textarea=false,wide=false,type="text",max,hint}:{label:string;value:string;onChange:(v:string)=>void;textarea?:boolean;wide?:boolean;type?:string;max?:number;hint?:string}) {
  return (
    <label className={wide?"md:col-span-2":""}>
      <span className="admin-label">{label}</span>
      {textarea?(
        <textarea rows={4} value={value} maxLength={max} onChange={(e)=>onChange(e.target.value)} className="admin-input resize-y"/>
      ):(
        <input type={type} value={value} maxLength={max} onChange={(e)=>onChange(e.target.value)} className="admin-input"/>
      )}
      {(hint||max)&&(
        <span className="mt-1.5 flex justify-between text-[.68rem] text-ink-mute">
          <span>{hint}</span>
          {max&&<span>{value.length}/{max}</span>}
        </span>
      )}
    </label>
  );
}

function MiniButton({children,onClick,disabled=false,danger=false}:{children:React.ReactNode;onClick:()=>void;disabled?:boolean;danger?:boolean}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`rounded-lg border px-3 py-1.5 text-xs font-bold transition disabled:opacity-30 ${
        danger?"border-red-200 text-red-700 hover:bg-red-50":"border-line-strong text-ink-soft hover:bg-canvas-200"
      }`}
    >
      {children}
    </button>
  );
}

function Count({value,active}:{value:number;active:boolean}) {
  return (
    <span className={`ml-auto rounded-full px-2 py-0.5 text-[.65rem] font-bold ${
      active?"bg-white/20 text-white":"bg-white/10 text-white/70"
    }`}>
      {value}
    </span>
  );
}

function InfoCell({label,value}:{label:string;value:string}) {
  return (
    <div className="rounded-xl border border-line bg-canvas-50 p-4">
      <p className="text-[.65rem] font-bold tracking-wider text-ink-mute uppercase">{label}</p>
      <p className="mt-1 text-sm font-bold text-ink">{value||"—"}</p>
    </div>
  );
}

function SystemCard({title,status,lines}:{title:string;status:string;lines:string[]}) {
  return (
    <div className="admin-card p-6">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-ink">{title}</h3>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-[.65rem] font-bold text-emerald-700">
          ● {status}
        </span>
      </div>
      <ul className="mt-4 space-y-2.5">
        {lines.map((line)=>(
          <li key={line} className="flex items-center gap-2.5 text-sm text-ink-soft">
            <span className="text-emerald-600 font-bold">✓</span>
            <span>{line}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function NavIcon({name}:{name:string}) {
  const paths:Record<string,string>={
    grid:"M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z",
    building:"M5 21V5l7-3 7 3v16M9 8h.01M15 8h.01M9 12h.01M15 12h.01M9 16h.01M15 16h.01",
    image:"M3 5h18v14H3zM3 15l5-5 4 4 3-3 6 6M16 9h.01",
    layout:"M3 4h18v16H3zM3 10h18M9 10v10",
    badge:"m12 3 2.3 4.7 5.2.8-3.8 3.7.9 5.2-4.6-2.4-4.6 2.4.9-5.2-3.8-3.7 5.2-.8z",
    settings:"M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21h-4v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3v-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.5V3h4v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1h.1v4h-.1a1.7 1.7 0 0 0-1.5 1z"
  };
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={paths[name]}/>
    </svg>
  );
}

function AdminStyles(){
  return (
    <style jsx global>{`
      .admin-card {
        border: 1px solid #d8e1ec;
        border-radius: 1.5rem;
        background: #ffffff;
        box-shadow: 0 4px 20px rgba(13, 27, 44, 0.04);
      }
      .admin-kicker {
        font-size: 0.65rem;
        font-weight: 800;
        letter-spacing: 0.18em;
        color: var(--color-copper-600);
      }
      .admin-heading {
        margin-top: 0.25rem;
        font-size: clamp(1.65rem, 3vw, 2.25rem);
        font-weight: 800;
        line-height: 1.15;
        color: var(--color-ink);
      }
      .admin-lead {
        margin-top: 0.55rem;
        max-width: 48rem;
        font-size: 0.92rem;
        line-height: 1.6;
        color: var(--color-ink-soft);
      }
      .admin-form-grid {
        display: grid;
        gap: 1.25rem;
      }
      @media (min-width: 768px) {
        .admin-form-grid {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
      }
      .admin-input {
        width: 100%;
        border: 1px solid var(--color-line-strong);
        border-radius: 0.85rem;
        background: #ffffff;
        padding: 0.85rem 1rem;
        color: var(--color-ink);
        font-size: 0.92rem;
        outline: none;
        transition: 0.2s;
      }
      .admin-input:focus {
        border-color: var(--color-copper-500);
        box-shadow: 0 0 0 3px rgba(184, 85, 39, 0.12);
      }
      .admin-label {
        display: block;
        margin-bottom: 0.45rem;
        font-size: 0.8rem;
        font-weight: 700;
        color: var(--color-ink);
      }
      .admin-primary {
        flex-shrink: 0;
        border-radius: 0.85rem;
        background: var(--color-copper-600);
        padding: 0.75rem 1.25rem;
        font-size: 0.82rem;
        font-weight: 700;
        color: #ffffff;
        box-shadow: 0 2px 8px rgba(184, 85, 39, 0.25);
        transition: 0.2s;
      }
      .admin-primary:hover {
        background: var(--color-copper-500);
        box-shadow: 0 4px 12px rgba(184, 85, 39, 0.35);
      }
      .admin-primary:disabled {
        opacity: 0.4;
      }
    `}</style>
  );
}
