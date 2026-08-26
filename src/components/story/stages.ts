import type { CSSProperties } from "react";

/**
 * SAHNE ZAMAN CIZELGESI
 * ------------------------------------------------------------------
 * Tum animasyon, scroll progress degerine (0 → 1) deterministik olarak
 * baglidir. Kullanici yukari kaydirdiginda animasyon geri sarilir.
 */
export const STAGES = [
  { id: "giris",   from: 0.00, to: 0.08 },
  { id: "ev",      from: 0.08, to: 0.20 },
  // Tesisatin dosenmesi hikayenin merkezidir; en genis pencere burasi.
  { id: "borular", from: 0.20, to: 0.42 },
  { id: "akis",    from: 0.42, to: 0.54 },
  { id: "kacak",   from: 0.54, to: 0.65 },
  { id: "gider",   from: 0.65, to: 0.76 },
  { id: "kamera",  from: 0.76, to: 0.84 },
  { id: "onarim",  from: 0.84, to: 0.92 },
  { id: "final",   from: 0.92, to: 1.00 },
] as const;

export type StageId = (typeof STAGES)[number]["id"];

export function stageIndexFor(p: number) {
  for (let i = STAGES.length - 1; i >= 0; i--) {
    if (p >= STAGES[i].from) return i;
  }
  return 0;
}

/**
 * Bir ogenin yerel ilerlemesini (--lp) tanimlar.
 * CSS tarafinda: --lp: clamp(0, calc((var(--p) - var(--s)) * var(--d)), 1)
 *
 * Bolme islemi yerine onceden hesaplanmis carpan (--d) kullanilir; boylece
 * CSS calc() icinde degiskene bolme yapilmasi gerekmez.
 */
export function win(from: number, to: number): CSSProperties {
  const span = Math.max(to - from, 0.0001);
  return { "--s": from, "--d": 1 / span } as CSSProperties;
}

/** Belirip sonra kaybolan ogeler icin giris + cikis penceresi. */
export function window2(
  inFrom: number,
  inTo: number,
  outFrom: number,
  outTo: number,
): CSSProperties {
  const inSpan = Math.max(inTo - inFrom, 0.0001);
  const outSpan = Math.max(outTo - outFrom, 0.0001);
  return {
    "--s": inFrom,
    "--d": 1 / inSpan,
    "--s2": outFrom,
    "--d2": 1 / outSpan,
  } as CSSProperties;
}
