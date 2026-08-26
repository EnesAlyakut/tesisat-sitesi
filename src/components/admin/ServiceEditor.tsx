"use client";

import { useState } from "react";
import type { Service } from "@/data/types";

/* ------------------------------------------------------------------ */
/*  Icon options — mirrors the IconName type from @/data/types         */
/* ------------------------------------------------------------------ */
const ICON_OPTIONS = [
  "leak", "drain", "camera", "pipe", "bath", "emergency",
  "robot", "flush", "toilet", "faucet", "radiator", "thermal",
] as const;

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */
function blankService(): Service {
  return {
    slug: "",
    title: "",
    shortTitle: "",
    icon: "pipe",
    summary: "",
    metaTitle: "",
    metaDescription: "",
    h1: "",
    intro: "",
    featured: false,
    blocks: [],
    faq: [],
    related: [],
    equipment: [],
  };
}

function move<T>(items: T[], index: number, direction: -1 | 1): T[] {
  const target = index + direction;
  if (target < 0 || target >= items.length) return items;
  const next = [...items];
  [next[index], next[target]] = [next[target], next[index]];
  return next;
}

/* ------------------------------------------------------------------ */
/*  Inline sub-components (same patterns as AdminDashboard)            */
/* ------------------------------------------------------------------ */
function PageHead({ kicker, title, text }: { kicker: string; title: string; text: string }) {
  return (
    <div>
      <p className="admin-kicker">{kicker}</p>
      <h2 className="admin-heading">{title}</h2>
      <p className="admin-lead">{text}</p>
    </div>
  );
}

function EditorCard({ title, text, children }: { title: string; text: string; children: React.ReactNode }) {
  return (
    <section className="admin-card p-5 sm:p-6">
      <div className="mb-5">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="mt-1 text-sm text-ink-soft">{text}</p>
      </div>
      {children}
    </section>
  );
}

function Field({
  label, value, onChange, textarea = false, wide = false, type = "text", max, hint,
}: {
  label: string; value: string; onChange: (v: string) => void;
  textarea?: boolean; wide?: boolean; type?: string; max?: number; hint?: string;
}) {
  return (
    <label className={wide ? "md:col-span-2" : ""}>
      <span className="admin-label">{label}</span>
      {textarea ? (
        <textarea rows={4} value={value} maxLength={max} onChange={(e) => onChange(e.target.value)} className="admin-input resize-y" />
      ) : (
        <input type={type} value={value} maxLength={max} onChange={(e) => onChange(e.target.value)} className="admin-input" />
      )}
      {(hint || max) && (
        <span className="mt-1.5 flex justify-between text-[.68rem] text-ink-mute">
          <span>{hint}</span>
          {max && <span>{value.length}/{max}</span>}
        </span>
      )}
    </label>
  );
}

function MiniButton({
  children, onClick, disabled = false, danger = false,
}: {
  children: React.ReactNode; onClick: () => void; disabled?: boolean; danger?: boolean;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition disabled:opacity-30 ${
        danger
          ? "border-red-200 text-red-700 hover:bg-red-50"
          : "border-line-strong text-ink-soft hover:bg-canvas-200"
      }`}
    >
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */
export default function ServiceEditor({ initialServices }: { initialServices: Service[] }) {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [draft, setDraft] = useState<Service | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [status, setStatus] = useState<{ kind: "ok" | "error"; text: string } | null>(null);
  const [busy, setBusy] = useState(false);

  /* ---- CRUD helpers ---- */
  function startEdit(svc: Service) {
    setEditingSlug(svc.slug);
    setDraft(JSON.parse(JSON.stringify(svc)));
    setIsNew(false);
    setStatus(null);
  }

  function startAdd() {
    const blank = blankService();
    setDraft(blank);
    setEditingSlug("__new__");
    setIsNew(true);
    setStatus(null);
  }

  function cancelEdit() {
    setEditingSlug(null);
    setDraft(null);
    setIsNew(false);
  }

  async function handleSave() {
    if (!draft || busy) return;
    setBusy(true);
    setStatus(null);

    try {
      if (isNew) {
        /* POST new service */
        const res = await fetch("/api/admin/services/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(draft),
        });
        const result = await res.json();
        if (!res.ok) { setStatus({ kind: "error", text: result.error || "Hizmet eklenemedi." }); return; }
        setServices((prev) => [...prev, draft]);
        setStatus({ kind: "ok", text: "Yeni hizmet eklendi." });
      } else {
        /* PUT full array with updated service */
        const updated = services.map((s) => (s.slug === editingSlug ? draft : s));
        const res = await fetch("/api/admin/services/", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updated),
        });
        const result = await res.json();
        if (!res.ok) { setStatus({ kind: "error", text: result.error || "Değişiklikler kaydedilemedi." }); return; }
        setServices(updated);
        setStatus({ kind: "ok", text: "Hizmet güncellendi." });
      }
      cancelEdit();
    } catch {
      setStatus({ kind: "error", text: "Ağ hatası oluştu." });
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete(slug: string) {
    if (busy || !confirm("Bu hizmeti silmek istediğinize emin misiniz?")) return;
    setBusy(true);
    setStatus(null);

    try {
      const res = await fetch("/api/admin/services/", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      });
      const result = await res.json();
      if (!res.ok) { setStatus({ kind: "error", text: result.error || "Hizmet silinemedi." }); setBusy(false); return; }
      setServices((prev) => prev.filter((s) => s.slug !== slug));
      if (editingSlug === slug) cancelEdit();
      setStatus({ kind: "ok", text: "Hizmet silindi." });
    } catch {
      setStatus({ kind: "error", text: "Ağ hatası oluştu." });
    } finally {
      setBusy(false);
    }
  }

  async function handleReorder(newServices: Service[]) {
    setServices(newServices);
    setBusy(true);
    setStatus(null);

    try {
      const res = await fetch("/api/admin/services/", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newServices),
      });
      const result = await res.json();
      if (!res.ok) { setStatus({ kind: "error", text: result.error || "Sıralama kaydedilemedi." }); return; }
      setStatus({ kind: "ok", text: "Sıralama güncellendi." });
    } catch {
      setStatus({ kind: "error", text: "Ağ hatası oluştu." });
    } finally {
      setBusy(false);
    }
  }

  /* ---- Draft updaters ---- */
  function ud<K extends keyof Service>(key: K, value: Service[K]) {
    setDraft((prev) => (prev ? { ...prev, [key]: value } : prev));
  }

  function updateBlock(bi: number, key: keyof Service["blocks"][number], value: unknown) {
    if (!draft) return;
    const blocks = draft.blocks.map((b, i) => (i === bi ? { ...b, [key]: value } : b));
    ud("blocks", blocks);
  }

  function updateFaq(fi: number, key: "q" | "a", value: string) {
    if (!draft) return;
    const faq = draft.faq.map((f, i) => (i === fi ? { ...f, [key]: value } : f));
    ud("faq", faq);
  }

  /* ================================================================ */
  /*  RENDER                                                           */
  /* ================================================================ */
  return (
    <div className="space-y-6">
      {/* ---- Page header ---- */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <PageHead
          kicker="HİZMET YÖNETİMİ"
          title="Hizmetler"
          text="Tüm hizmetleri ekleyin, düzenleyin, sıralayın veya kaldırın."
        />
        <button onClick={startAdd} className="admin-primary">+ Yeni Hizmet</button>
      </div>

      {/* ---- Status bar ---- */}
      {status && (
        <div className={`rounded-2xl border p-4 text-sm font-semibold ${
          status.kind === "ok"
            ? "border-green-200 bg-green-50 text-green-700"
            : "border-red-200 bg-red-50 text-red-700"
        }`}>
          {status.kind === "ok" ? "✓ " : "! "}{status.text}
        </div>
      )}

      {/* ---- NEW service inline editor ---- */}
      {isNew && draft && (
        <ServiceForm
          draft={draft}
          ud={ud}
          updateBlock={updateBlock}
          updateFaq={updateFaq}
          onSave={handleSave}
          onCancel={cancelEdit}
          busy={busy}
          isNew
        />
      )}

      {/* ---- Service cards list ---- */}
      {services.map((svc, index) => (
        <div key={svc.slug}>
          {/* Card */}
          <div className="admin-card overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-canvas-100 px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="grid size-8 place-items-center rounded-lg bg-navy-900 text-sm font-bold text-white">
                  {index + 1}
                </span>
                <div>
                  <h3 className="font-semibold">{svc.title || "Başlıksız hizmet"}</h3>
                  <p className="text-xs text-ink-mute">
                    {svc.shortTitle} • {svc.icon} • {svc.slug}
                  </p>
                </div>
                {svc.featured && (
                  <span className="rounded-full bg-copper-50 px-2.5 py-0.5 text-[.62rem] font-bold text-copper-600 uppercase">
                    ÖNE ÇIKAN
                  </span>
                )}
              </div>

              <div className="flex gap-1">
                <MiniButton disabled={index === 0} onClick={() => handleReorder(move(services, index, -1))}>↑</MiniButton>
                <MiniButton disabled={index === services.length - 1} onClick={() => handleReorder(move(services, index, 1))}>↓</MiniButton>
                <MiniButton onClick={() => startEdit(svc)}>Düzenle</MiniButton>
                <MiniButton danger onClick={() => handleDelete(svc.slug)}>Sil</MiniButton>
              </div>
            </div>

            {/* Summary row */}
            <div className="px-5 py-4">
              <p className="text-sm text-ink-soft">{svc.summary || "Açıklama girilmemiş."}</p>
            </div>
          </div>

          {/* Inline editor (shown when editing this service) */}
          {editingSlug === svc.slug && draft && (
            <div className="mt-4">
              <ServiceForm
                draft={draft}
                ud={ud}
                updateBlock={updateBlock}
                updateFaq={updateFaq}
                onSave={handleSave}
                onCancel={cancelEdit}
                busy={busy}
                isNew={false}
              />
            </div>
          )}
        </div>
      ))}

      {services.length === 0 && !isNew && (
        <div className="admin-card p-10 text-center">
          <p className="text-ink-mute">Henüz hizmet eklenmemiş.</p>
          <button onClick={startAdd} className="admin-primary mt-4">+ Yeni Hizmet</button>
        </div>
      )}
    </div>
  );
}

/* ================================================================== */
/*  ServiceForm – Inline editor for a single service                   */
/* ================================================================== */
function ServiceForm({
  draft,
  ud,
  updateBlock,
  updateFaq,
  onSave,
  onCancel,
  busy,
  isNew,
}: {
  draft: Service;
  ud: <K extends keyof Service>(key: K, value: Service[K]) => void;
  updateBlock: (bi: number, key: keyof Service["blocks"][number], value: unknown) => void;
  updateFaq: (fi: number, key: "q" | "a", value: string) => void;
  onSave: () => void;
  onCancel: () => void;
  busy: boolean;
  isNew: boolean;
}) {
  return (
    <div className="space-y-5">
      {/* ---------- BASIC INFO ---------- */}
      <EditorCard title="Temel Bilgiler" text="Hizmetin kimlik ve tanıtım alanları.">
        <div className="admin-form-grid">
          <Field label="Slug" value={draft.slug} onChange={(v) => ud("slug", v)} hint="URL-dostu benzersiz tanımlayıcı" />
          <Field label="Başlık" value={draft.title} onChange={(v) => ud("title", v)} max={200} />
          <Field label="Kısa başlık" value={draft.shortTitle} onChange={(v) => ud("shortTitle", v)} max={60} />

          {/* Icon dropdown */}
          <label>
            <span className="admin-label">İkon</span>
            <select
              value={draft.icon}
              onChange={(e) => ud("icon", e.target.value as Service["icon"])}
              className="admin-input"
            >
              {ICON_OPTIONS.map((ic) => (
                <option key={ic} value={ic}>{ic}</option>
              ))}
            </select>
          </label>

          <Field label="Özet" value={draft.summary} onChange={(v) => ud("summary", v)} textarea wide max={500} />

          {/* Featured checkbox */}
          <label className="flex items-center justify-between rounded-xl border border-line p-4 md:col-span-2">
            <div>
              <strong className="text-sm">Öne çıkan hizmet</strong>
              <p className="mt-1 text-xs text-ink-soft">Ana sayfadaki vitrin kartlarında görünür.</p>
            </div>
            <input
              type="checkbox"
              checked={draft.featured}
              onChange={(e) => ud("featured", e.target.checked)}
              className="size-5 accent-copper-600"
            />
          </label>
        </div>
      </EditorCard>

      {/* ---------- SEO ---------- */}
      <EditorCard title="SEO Bilgileri" text="Arama motoru başlığı, açıklaması ve sayfa içi başlıklar.">
        <div className="admin-form-grid">
          <Field label="Meta başlık" value={draft.metaTitle} onChange={(v) => ud("metaTitle", v)} max={100} hint={`${draft.metaTitle.length} karakter`} />
          <Field label="H1 başlık" value={draft.h1} onChange={(v) => ud("h1", v)} max={200} />
          <Field label="Meta açıklaması" value={draft.metaDescription} onChange={(v) => ud("metaDescription", v)} textarea wide max={300} hint={`${draft.metaDescription.length} karakter`} />
          <Field label="Giriş paragrafı" value={draft.intro} onChange={(v) => ud("intro", v)} textarea wide max={2000} />
        </div>
      </EditorCard>

      {/* ---------- CONTENT BLOCKS ---------- */}
      <EditorCard title="İçerik Blokları" text="Hizmet sayfasındaki başlık + paragraf + madde grupları.">
        <div className="space-y-4">
          {draft.blocks.map((block, bi) => (
            <div key={bi} className="rounded-2xl border border-line p-4">
              <div className="mb-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="grid size-7 place-items-center rounded-lg bg-canvas-200 text-xs font-bold">{bi + 1}</span>
                  <span className="text-xs font-semibold text-ink-mute">BLOK</span>
                </div>
                <div className="flex gap-1">
                  <MiniButton disabled={bi === 0} onClick={() => ud("blocks", move(draft.blocks, bi, -1))}>↑</MiniButton>
                  <MiniButton disabled={bi === draft.blocks.length - 1} onClick={() => ud("blocks", move(draft.blocks, bi, 1))}>↓</MiniButton>
                  <MiniButton danger onClick={() => ud("blocks", draft.blocks.filter((_, i) => i !== bi))}>Sil</MiniButton>
                </div>
              </div>

              <div className="space-y-3">
                <Field label="Başlık" value={block.heading} onChange={(v) => updateBlock(bi, "heading", v)} />

                {/* Body paragraphs */}
                <div>
                  <span className="admin-label">Paragraflar</span>
                  {block.body.map((para, pi) => (
                    <div key={pi} className="mb-2 flex items-start gap-2">
                      <textarea
                        rows={2}
                        value={para}
                        onChange={(e) => {
                          const newBody = [...block.body];
                          newBody[pi] = e.target.value;
                          updateBlock(bi, "body", newBody);
                        }}
                        className="admin-input resize-y"
                      />
                      <MiniButton danger onClick={() => updateBlock(bi, "body", block.body.filter((_, i) => i !== pi))}>×</MiniButton>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => updateBlock(bi, "body", [...block.body, ""])}
                    className="mt-1 text-xs font-semibold text-aqua-700 hover:text-aqua-600"
                  >
                    + Paragraf ekle
                  </button>
                </div>

                {/* Bullets (optional) */}
                <div>
                  <span className="admin-label">Madde işaretleri (opsiyonel)</span>
                  {(block.bullets ?? []).map((bullet, bui) => (
                    <div key={bui} className="mb-2 flex items-center gap-2">
                      <input
                        value={bullet}
                        onChange={(e) => {
                          const newBullets = [...(block.bullets ?? [])];
                          newBullets[bui] = e.target.value;
                          updateBlock(bi, "bullets", newBullets);
                        }}
                        className="admin-input"
                      />
                      <MiniButton danger onClick={() => updateBlock(bi, "bullets", (block.bullets ?? []).filter((_, i) => i !== bui))}>×</MiniButton>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => updateBlock(bi, "bullets", [...(block.bullets ?? []), ""])}
                    className="mt-1 text-xs font-semibold text-aqua-700 hover:text-aqua-600"
                  >
                    + Madde ekle
                  </button>
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={() => ud("blocks", [...draft.blocks, { heading: "", body: [""], bullets: [] }])}
            className="admin-primary"
          >
            + Blok Ekle
          </button>
        </div>
      </EditorCard>

      {/* ---------- FAQ ---------- */}
      <EditorCard title="Sık Sorulan Sorular" text="Bu hizmete özel SSS maddeleri.">
        <div className="space-y-4">
          {draft.faq.map((item, fi) => (
            <div key={fi} className="rounded-2xl border border-line p-4">
              <div className="mb-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="grid size-7 place-items-center rounded-full bg-aqua-50 text-xs font-bold text-aqua-700">{fi + 1}</span>
                  <span className="text-xs font-semibold text-ink-mute">SSS</span>
                </div>
                <div className="flex gap-1">
                  <MiniButton disabled={fi === 0} onClick={() => ud("faq", move(draft.faq, fi, -1))}>↑</MiniButton>
                  <MiniButton disabled={fi === draft.faq.length - 1} onClick={() => ud("faq", move(draft.faq, fi, 1))}>↓</MiniButton>
                  <MiniButton danger onClick={() => ud("faq", draft.faq.filter((_, i) => i !== fi))}>Sil</MiniButton>
                </div>
              </div>
              <div className="space-y-3">
                <Field label="Soru" value={item.q} onChange={(v) => updateFaq(fi, "q", v)} max={240} />
                <Field label="Yanıt" value={item.a} onChange={(v) => updateFaq(fi, "a", v)} textarea max={1500} />
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={() => ud("faq", [...draft.faq, { q: "", a: "" }])}
            className="admin-primary"
          >
            + Soru Ekle
          </button>
        </div>
      </EditorCard>

      {/* ---------- RELATED & EQUIPMENT ---------- */}
      <EditorCard title="İlişkili Veriler" text="İlgili hizmet ve ekipman slug'larını virgülle ayırarak girin.">
        <div className="admin-form-grid">
          <Field
            label="İlgili hizmetler"
            value={draft.related.join(", ")}
            onChange={(v) => ud("related", v.split(",").map((s) => s.trim()).filter(Boolean))}
            hint="Virgülle ayırın: su-kacagi, tikaniklik"
            wide
          />
          <Field
            label="Ekipmanlar"
            value={draft.equipment.join(", ")}
            onChange={(v) => ud("equipment", v.split(",").map((s) => s.trim()).filter(Boolean))}
            hint="Virgülle ayırın: termal-kamera, dinleme-cihazi"
            wide
          />
        </div>
      </EditorCard>

      {/* ---------- ACTION BAR ---------- */}
      <div className="sticky bottom-4 z-30 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#d8e1ec] bg-white/95 p-4 shadow-[0_12px_40px_rgba(13,27,44,.14)] backdrop-blur-xl">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-full border border-line-strong px-5 py-2.5 text-sm font-semibold text-ink-soft hover:bg-canvas-200"
        >
          İptal
        </button>
        <button
          type="button"
          onClick={onSave}
          disabled={busy || !draft.slug || !draft.title}
          className="rounded-full bg-copper-600 px-6 py-3 text-sm font-bold text-white shadow-md transition hover:bg-copper-500 disabled:cursor-not-allowed disabled:opacity-45"
        >
          {busy ? "Kaydediliyor…" : isNew ? "Hizmeti Ekle" : "Değişiklikleri Kaydet"}
        </button>
      </div>
    </div>
  );
}
