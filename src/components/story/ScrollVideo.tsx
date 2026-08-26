"use client";

import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";

/**
 * SCROLL ILE SARILAN VIDEO
 * ------------------------------------------------------------------
 * Video kendi kendine oynamaz. Kullanicinin scroll ilerlemesi (0 → 1)
 * dogrudan videonun zaman eksenine eslenir:
 *
 *   currentTime = progress × duration
 *
 * Asagi kaydirinca ileri, yukari kaydirinca geri sarar. Ses her zaman
 * kapalidir (muted) — hem istek boyle hem de tarayicilar sessiz olmayan
 * videoda programatik oynatmaya izin vermez.
 *
 * PERFORMANS NOTU
 * Tarayici, istenen ana ulasmak icin en yakin anahtar kareden itibaren
 * kod cozer. Bu videoda 10 saniyede yalnizca 4 anahtar kare var; bu yuzden
 * arama (seek) maliyetlidir. Asagidaki onlemler alindi:
 *   - Ayni anda yalnizca tek bir arama calisir (`seeking` bayragi).
 *   - Hedef ile mevcut zaman farki bir kareden kucukse arama yapilmaz.
 *   - Destekleniyorsa `fastSeek()` kullanilir (daha ucuz, kare hassasiyeti
 *     dusuk ama scroll icin yeterli).
 * Tam akici bir sarma icin video yogun anahtar kareyle yeniden
 * kodlanmalidir (bkz. README).
 */

export interface ScrollVideoHandle {
  /** 0 → 1 arasi ilerlemeyi videonun zaman eksenine esler. */
  seek: (progress: number) => void;
}

interface Props {
  src: string;
  /** Video yuklenemezse cagrilir; sahne SVG'ye duser. */
  onUnavailable?: () => void;
  className?: string;
}

const ScrollVideo = forwardRef<ScrollVideoHandle, Props>(function ScrollVideo(
  { src, onUnavailable, className = "" },
  ref,
) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const durationRef = useRef(0);
  const targetRef = useRef(0);
  const seekingRef = useRef(false);
  const [ready, setReady] = useState(false);

  /** Bekleyen hedefe ulasmaya calisir; arama bitince tekrar denenir. */
  const flush = useCallback(() => {
    const v = videoRef.current;
    const dur = durationRef.current;
    if (!v || !dur || seekingRef.current) return;

    const target = targetRef.current;
    // Bir kareden (24 fps) kucuk farklar icin arama yapma.
    if (Math.abs(v.currentTime - target) < 1 / 24) return;

    seekingRef.current = true;
    type FastSeekable = HTMLVideoElement & { fastSeek?: (t: number) => void };
    const fv = v as FastSeekable;
    if (typeof fv.fastSeek === "function") fv.fastSeek(target);
    else v.currentTime = target;
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      seek(progress) {
        const dur = durationRef.current;
        if (!dur) return;
        // Son karede takilmamak icin cok kucuk bir pay birakilir.
        targetRef.current = Math.min(Math.max(progress, 0), 0.999) * dur;
        flush();
      },
    }),
    [flush],
  );

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const onMeta = () => {
      durationRef.current = v.duration || 0;
      setReady(true);
      // iOS'ta arama yapabilmek icin kisa bir sessiz oynatma tetiklenir.
      const p = v.play();
      if (p && typeof p.then === "function") {
        p.then(() => v.pause()).catch(() => {
          /* Oynatma engellendi; arama yine de calisir. */
        });
      }
      flush();
    };
    const onSeeked = () => {
      seekingRef.current = false;
      flush();
    };
    const onError = () => {
      seekingRef.current = false;
      onUnavailable?.();
    };

    v.addEventListener("loadedmetadata", onMeta);
    v.addEventListener("seeked", onSeeked);
    v.addEventListener("error", onError);
    if (v.readyState >= 1) onMeta();

    return () => {
      v.removeEventListener("loadedmetadata", onMeta);
      v.removeEventListener("seeked", onSeeked);
      v.removeEventListener("error", onError);
    };
  }, [flush, onUnavailable]);

  return (
    <video
      ref={videoRef}
      src={src}
      // Ses her kosulda kapali; kullanici arayuzu yok.
      muted
      playsInline
      preload="auto"
      disablePictureInPicture
      controls={false}
      tabIndex={-1}
      aria-hidden="true"
      data-ready={ready}
      className={className}
    />
  );
});

export default ScrollVideo;
