"use client";

import { useId, useState } from "react";
import { services } from "@/data/services";
import { activeDistricts } from "@/data/regions";
import { runtimeWhatsappHref, useRuntimeSite } from "@/components/providers/RuntimeSiteContext";

/**
 * ILETISIM FORMU
 * ------------------------------------------------------------------
 * Backend hazir olana kadar form, girilen bilgileri duzenli bir metne
 * cevirip WhatsApp uzerinden gonderir. Boylece hicbir mesaj kaybolmaz.
 *
 * Sunucu tarafli bir uc nokta eklendiginde `submitTo` degeri
 * ayarlanarak dogrudan POST edilebilir.
 *
 * Erisilebilirlik: her alanin gorunur <label>'i, hata mesajlarinin
 * aria-describedby baglantisi ve dogrulama durumu bulunur.
 */

interface Errors {
  name?: string;
  phone?: string;
  message?: string;
}

export default function ContactForm() {
  const site = useRuntimeSite();
  const whatsappHref = runtimeWhatsappHref(site);
  const uid = useId();
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const field = (n: string) => `${uid}-${n}`;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const name = String(data.get("ad") ?? "").trim();
    const phone = String(data.get("telefon") ?? "").trim();
    const message = String(data.get("aciklama") ?? "").trim();
    const service = String(data.get("hizmet") ?? "");
    const region = String(data.get("bolge") ?? "");

    const next: Errors = {};
    if (name.length < 2) next.name = "Lütfen adınızı ve soyadınızı yazın.";
    // Turkiye formatlari: 05xx / +905xx / 5xx — bosluk ve ayirici serbest
    if (!/^(\+?9?0?)?[\s(]*5\d{2}[\s)]*\d{3}[\s-]*\d{2}[\s-]*\d{2}$/.test(phone)) {
      next.phone = "Lütfen geçerli bir cep telefonu numarası girin.";
    }
    if (message.length < 10) {
      next.message = "Sorunu birkaç cümleyle anlatırsanız daha doğru bilgi verebiliriz.";
    }

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const lines = [
      "Yeni tesisat talebi",
      `Ad Soyad: ${name}`,
      `Telefon: ${phone}`,
      service ? `Hizmet: ${service}` : null,
      region ? `Bölge: ${region}` : null,
      "",
      `Sorun: ${message}`,
    ].filter(Boolean);

    setSent(true);
    window.open(
      runtimeWhatsappHref(site, lines.join("\n")),
      "_blank",
      "noopener,noreferrer",
    );
  }

  const inputCls =
    "w-full rounded-2xl border border-line-strong bg-canvas-50 px-4 py-3.5 text-[0.95rem] text-ink placeholder:text-ink-mute transition-colors focus:border-line focus:outline-none";
  const labelCls = "mb-2 block text-sm font-medium text-ink";
  const errCls = "mt-1.5 text-sm text-alert-500";

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={field("ad")} className={labelCls}>
            Ad Soyad <span aria-hidden="true" className="text-alert-600">*</span>
          </label>
          <input
            id={field("ad")}
            name="ad"
            type="text"
            autoComplete="name"
            required
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? field("ad-err") : undefined}
            className={inputCls}
            placeholder="Adınız ve soyadınız"
          />
          {errors.name && (
            <p id={field("ad-err")} className={errCls} role="alert">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={field("tel")} className={labelCls}>
            Telefon <span aria-hidden="true" className="text-alert-600">*</span>
          </label>
          <input
            id={field("tel")}
            name="telefon"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={errors.phone ? field("tel-err") : undefined}
            className={inputCls}
            placeholder="05xx xxx xx xx"
          />
          {errors.phone && (
            <p id={field("tel-err")} className={errCls} role="alert">
              {errors.phone}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={field("hizmet")} className={labelCls}>
            Hizmet
          </label>
          <select id={field("hizmet")} name="hizmet" className={inputCls} defaultValue="">
            <option value="">Seçiniz (isteğe bağlı)</option>
            {services.map((s) => (
              <option key={s.slug} value={s.title}>
                {s.shortTitle}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor={field("bolge")} className={labelCls}>
            Bölge
          </label>
          <select id={field("bolge")} name="bolge" className={inputCls} defaultValue="">
            <option value="">Seçiniz (isteğe bağlı)</option>
            {activeDistricts.map((d) => (
              <option key={d.slug} value={d.name}>
                {d.name}
              </option>
            ))}
            <option value="Diğer">Diğer</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor={field("aciklama")} className={labelCls}>
          Sorunun açıklaması <span aria-hidden="true" className="text-alert-600">*</span>
        </label>
        <textarea
          id={field("aciklama")}
          name="aciklama"
          rows={5}
          required
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? field("acik-err") : field("acik-hint")}
          className={`${inputCls} resize-y`}
          placeholder="Örnek: Banyoda lavabo gideri yavaş akıyor, iki haftadır tekrarlıyor."
        />
        {errors.message ? (
          <p id={field("acik-err")} className={errCls} role="alert">
            {errors.message}
          </p>
        ) : (
          <p id={field("acik-hint")} className="mt-1.5 text-sm text-ink-soft">
            Ne zaman başladığı ve daha önce müdahale edilip edilmediği bilgisi işimizi
            kolaylaştırır.
          </p>
        )}
      </div>

      {/* Fotograf gonderimi WhatsApp uzerinden yapilir. */}
      <p className="rounded-2xl border border-line bg-canvas-100/40 px-4 py-3.5 text-sm leading-relaxed text-ink-mute">
        Sorunun fotoğrafını göndermek isterseniz{" "}
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="text-aqua-600 underline underline-offset-4 hover:text-aqua-600"
        >
          WhatsApp
        </a>{" "}
        üzerinden iletebilirsiniz. Görsel, sorunu uzaktan değerlendirmemize yardımcı olur.
      </p>

      <button
        type="submit"
        className="btn-flow inline-flex h-13 w-full items-center justify-center gap-2 rounded-full bg-copper-600 px-7 font-semibold text-white transition-colors hover:bg-copper-500 sm:w-auto"
      >
        Talebi Gönder
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Basari mesaji — vana acilma animasyonuyla belirir */}
      <p
        role="status"
        aria-live="polite"
        className={`flex items-center gap-3 text-sm transition-opacity duration-500 ${
          sent ? "text-ok-600 opacity-100" : "opacity-0"
        }`}
      >
        {sent && (
          <>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
              <path d="m8 12.4 2.7 2.6L16 9.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Talebiniz WhatsApp üzerinden iletilmek üzere hazırlandı. Pencere
            açılmadıysa doğrudan arayabilirsiniz.
          </>
        )}
      </p>
    </form>
  );
}
