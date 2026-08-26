"use client";

import Image from "next/image";
import { useCallback, useId, useRef, useState } from "react";
import type { CaseImage } from "@/data/cases";

/**
 * Oncesi / sonrasi karsilastirma slideri.
 * Erisilebilirlik: deger bir <input type="range"> ile tasinir; klavye ve
 * ekran okuyucu destegi tarayicidan gelir.
 */
export default function BeforeAfter({
  before,
  after,
  label = "Öncesi ve sonrası karşılaştırması",
}: {
  before: CaseImage;
  after: CaseImage;
  label?: string;
}) {
  const [value, setValue] = useState(50);
  const wrapRef = useRef<HTMLDivElement>(null);
  const id = useId();

  const onPointer = useCallback((clientX: number) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setValue(Math.min(Math.max(pct, 0), 100));
  }, []);

  return (
    <figure className="w-full">
      <div
        ref={wrapRef}
        className="relative aspect-[4/3] w-full touch-pan-y overflow-hidden rounded-3xl border border-line select-none sm:aspect-[16/10]"
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          onPointer(e.clientX);
        }}
        onPointerMove={(e) => {
          if (e.buttons === 1) onPointer(e.clientX);
        }}
      >
        {/* Sonrasi — alt katman */}
        <Image
          src={after.src}
          alt={after.alt}
          width={after.width}
          height={after.height}
          className="absolute inset-0 h-full w-full object-cover"
          sizes="(max-width: 768px) 100vw, 60vw"
        />

        {/* Oncesi — ustte, genisligi slider ile kirpilir */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}
        >
          <Image
            src={before.src}
            alt={before.alt}
            width={before.width}
            height={before.height}
            className="h-full w-full object-cover"
            sizes="(max-width: 768px) 100vw, 60vw"
          />
        </div>

        {/* Ayirici cizgi */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 w-0.5 bg-white"
          style={{ left: `${value}%` }}
        >
          <span className="absolute top-1/2 left-1/2 grid size-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-white bg-navy-900 text-white">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 4 2 8l4 4M10 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>

        <span className="absolute top-4 left-4 rounded-full bg-navy-900/80 px-3 py-1.5 text-xs font-medium text-white">
          Öncesi
        </span>
        <span className="absolute top-4 right-4 rounded-full bg-navy-900/80 px-3 py-1.5 text-xs font-medium text-white">
          Sonrası
        </span>
      </div>

      <label htmlFor={id} className="sr-only">
        {label} — kaydırarak öncesi ve sonrası görüntüyü karşılaştırın
      </label>
      <input
        id={id}
        type="range"
        min={0}
        max={100}
        step={1}
        value={Math.round(value)}
        onChange={(e) => setValue(Number(e.target.value))}
        aria-valuetext={`Öncesi görüntü %${Math.round(value)} oranında görünür`}
        className="mt-4 w-full accent-[var(--color-aqua-400)]"
      />
    </figure>
  );
}
