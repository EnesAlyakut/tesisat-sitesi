"use client";

import { useEffect, useRef, useState } from "react";

interface Options {
  /** Her karede cagrilir; React render tetiklemez. */
  onProgress: (p: number) => void;
  /**
   * Sahnenin sonunda bekleme payi (0–1).
   * Ornegin 0.18: animasyon scroll mesafesinin %82'sinde tamamlanir,
   * kalan %18 boyunca tamamlanmis sahne ekranda kalir; ardindan
   * bolum dogal olarak yukari kayar.
   */
  hold?: number;
  /** Sahne asamasi degistiginde cagrilir. */
  onStage?: (index: number) => void;
  stageIndexFor?: (p: number) => number;
  enabled: boolean;
}

/**
 * Sarmalayici elemanin scroll pozisyonundan 0 → 1 arasi ilerleme uretir.
 *
 * Performans notlari:
 *  - Olcum yalnizca rAF icinde yapilir (scroll handler'da layout okunmaz).
 *  - Deger React state'ine yazilmaz; DOM'a dogrudan CSS degiskeni olarak
 *    islenir. Boylece karede tek bir style yazimi olur, layout thrashing olmaz.
 */
export function useScrollProgress({
  onProgress,
  onStage,
  stageIndexFor,
  enabled,
  hold = 0,
}: Options) {
  const ref = useRef<HTMLDivElement>(null);
  const raf = useRef(0);
  const lastStage = useRef(-1);
  const lastP = useRef(-1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!enabled) {
      onProgress(1);
      onStage?.(0);
      return;
    }

    let running = false;

    const measure = () => {
      running = false;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // Sahne ekrana sabitlendigi surece kat edilen mesafe:
      const total = rect.height - vh;
      const raw = total <= 0 ? 0 : Math.min(Math.max(-rect.top / total, 0), 1);
      // Bekleme payi: animasyon erken biter, son kare bir sure ekranda kalir.
      const span = 1 - hold;
      const p = span <= 0 ? 1 : Math.min(raw / span, 1);

      if (Math.abs(p - lastP.current) > 0.0005) {
        lastP.current = p;
        onProgress(p);
      }

      if (stageIndexFor) {
        const s = stageIndexFor(p);
        if (s !== lastStage.current) {
          lastStage.current = s;
          onStage?.(s);
        }
      }
    };

    const schedule = () => {
      if (running) return;
      running = true;
      raf.current = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    window.addEventListener("orientationchange", schedule, { passive: true });

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("orientationchange", schedule);
    };
  }, [enabled, onProgress, onStage, stageIndexFor, hold]);

  return ref;
}

/**
 * Animasyonun tam surumunun calistirilip calistirilmayacagini belirler.
 * - prefers-reduced-motion: reduce  → sade surum
 * - dusuk cekirdek sayisi / az bellek → sade surum
 * - kaba isaretleyici + dar ekran     → mobil kompozisyon
 */
export function useMotionMode() {
  const [mode, setMode] = useState<{
    ready: boolean;
    reduced: boolean;
    mobile: boolean;
  }>({ ready: false, reduced: false, mobile: false });

  useEffect(() => {
    const mqReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqMobile = window.matchMedia("(max-width: 767px)");

    type NavigatorWithMemory = Navigator & { deviceMemory?: number };
    const nav = navigator as NavigatorWithMemory;
    const lowPower =
      (typeof nav.hardwareConcurrency === "number" && nav.hardwareConcurrency <= 4) ||
      (typeof nav.deviceMemory === "number" && nav.deviceMemory <= 4);

    const apply = () =>
      setMode({
        ready: true,
        reduced: mqReduced.matches || lowPower,
        mobile: mqMobile.matches,
      });

    apply();
    mqReduced.addEventListener("change", apply);
    mqMobile.addEventListener("change", apply);
    return () => {
      mqReduced.removeEventListener("change", apply);
      mqMobile.removeEventListener("change", apply);
    };
  }, []);

  return mode;
}
