"use client";

import { useCallback, useRef, useState } from "react";
import { HouseSceneDesktop } from "./HouseScene";
import HouseSceneMobile from "./HouseSceneMobile";
import ScrollVideo, { type ScrollVideoHandle } from "./ScrollVideo";
import { STAGES, stageIndexFor, window2, type StageId } from "./stages";
import { useMotionMode, useScrollProgress } from "./useScrollProgress";
import { CtaPair, LinkButton } from "@/components/ui/CallToAction";
import { serviceHref } from "@/lib/nav";

/**
 * ANA SAYFA HIKAYE BOLUMU
 * ------------------------------------------------------------------
 * Sahne scroll boyunca ekrana sabitlenir (sticky) ve ilerleme degeri
 * dogrudan `--p` CSS degiskenine yazilir. Video kullanilmaz; animasyon
 * tamamen kullanicinin scroll pozisyonuna baglidir ve geri sarilabilir.
 *
 * Performans: her karede yalnizca TEK bir style yazimi yapilir, React
 * yeniden render edilmez. Asama degisiminde (9 kez) kucuk bir state
 * guncellemesi olur; bu da yalnizca panellerin etkilesim durumunu ayarlar.
 *
 * Erisilebilirlik: butun panel metinleri gercek HTML olarak DOM'da bulunur.
 * Azaltilmis hareket tercihinde veya dusuk performansli cihazlarda sahne
 * sabitlenmez, asamalar normal akista tam gorunur sekilde listelenir.
 */

interface Panel {
  stage: StageId;
  eyebrow: string;
  title: string;
  body: string;
  /** Ilk panel sayfanin tek H1'ini tasir. */
  heading?: "h1" | "h2";
  cta?: { href: string; label: string } | "pair";
  checks?: string[];
}

const panels: Panel[] = [
  {
    stage: "giris",
    eyebrow: "Göktürk & Arnavutköy",
    title: "Göktürk ve Arnavutköy Su Tesisatçısı",
    body: "Su kaçağı tespiti, tıkanıklık açma ve sıhhi tesisat sorunlarında cihaz destekli profesyonel çözümler.",
    heading: "h1",
    cta: "pair",
  },
  {
    stage: "borular",
    eyebrow: "Aşama 01 — Tesisat",
    title: "Şebekeden Armatüre, Baştan Sona",
    body: "Ana giriş, su sayacı, kesme vanası, kolon ve kolektör: tesisat doğru sırayla ve doğru çapla döşendiğinde yıllarca sorun çıkarmaz.",
    cta: { href: serviceHref("su-tesisati-tamiri"), label: "Su Tesisatı Hizmetlerini İncele" },
  },
  {
    stage: "akis",
    eyebrow: "Aşama 02 — Akış",
    title: "Soğuk Hat, Kombi, Sıcak Hat",
    body: "Su şebekeden girer, kolektörden dağılır; bir kol kombiye gider ve sıcak hat olarak geri döner. Her noktada basınç ve sızdırmazlık kontrol edilir.",
    cta: { href: serviceHref("temiz-ve-pis-su-tesisati"), label: "Temiz & Pis Su Tesisatı" },
  },
  {
    stage: "kacak",
    eyebrow: "Aşama 03 — Tespit",
    title: "Kırmadan Su Kaçağı Tespiti",
    body: "Termal kamera, akustik dinleme ve profesyonel cihazlarla arızanın kaynağını gereksiz kırma işlemi yapmadan belirlemeye odaklanıyoruz.",
    cta: { href: serviceHref("kirmadan-su-kacagi-tespiti"), label: "Su Kaçağı Tespitini İncele" },
  },
  {
    stage: "gider",
    eyebrow: "Aşama 04 — Müdahale",
    title: "Robotla Tıkanıklık Açma",
    body: "Lavabo, tuvalet ve gider tıkanıklıklarına profesyonel cihazlarla müdahale ediyoruz.",
    cta: { href: serviceHref("robotla-tikaniklik-acma"), label: "Tıkanıklık Açma Hizmetini İncele" },
  },
  {
    stage: "kamera",
    eyebrow: "Aşama 05 — Kontrol",
    title: "Borunun İçini Görmeden Karar Vermiyoruz",
    body: "Kameralı gider görüntüleme ile hattın iç durumunu inceleyerek problemin kaynağını belirliyoruz.",
    cta: { href: serviceHref("kamerali-gider-goruntuleme"), label: "Kameralı Gider Görüntüleme" },
  },
  {
    stage: "onarim",
    eyebrow: "Aşama 06 — Onarım",
    title: "Sistem Yeniden Çalışır Hale Gelir",
    body: "Problemli nokta giderildikten sonra hat yeniden kontrol edilir ve çalışma alanı toparlanarak teslim edilir.",
    checks: ["Tespit edildi", "Müdahale edildi", "Kontrol edildi", "Teslim edildi"],
  },
  {
    stage: "final",
    eyebrow: "Marsak Teknik Tesisat",
    title: "Sorunu Bulalım. Doğru Noktaya Müdahale Edelim.",
    body: "Göktürk ve Arnavutköy'de su tesisatı, kaçak tespiti ve tıkanıklık problemleri için Marsak Teknik Tesisat ile iletişime geçin.",
    cta: "pair",
  },
];

/** Panelin belirme/kaybolma penceresi, ait oldugu asamadan turetilir. */
function panelWindow(stage: StageId) {
  const i = STAGES.findIndex((s) => s.id === stage);
  const cur = STAGES[i];
  const span = cur.to - cur.from;
  /* Kisa ve kararli gecis: paneller birbirine karismadan net degisir. */
  const fadeIn = Math.min(0.018, span * 0.16);
  const fadeOut = Math.min(0.018, span * 0.16);
  const isFirst = i === 0;
  const isLast = i === STAGES.length - 1;

  /*
   * "ev" asamasinin kendi paneli yoktur; ev cizilirken ekranda metin
   * kalmasi icin giris paneli (H1 + CTA) o asamanin sonuna kadar durur.
   * Boylece hem hikaye kesintiye ugramaz hem de CTA erken kaybolmaz.
   */
  const outAt = isFirst ? STAGES[1].to : cur.to;

  return window2(
    // Ilk panel sayfa acilir acilmaz tam gorunur olmalidir; bu yuzden
    // giris penceresi p=0'dan once tamamlanir.
    // Diger paneller bir onceki tam kapanmadan hemen once acilir ki
    // gecis aninda ekranda bosluk olusmasin.
    isFirst ? -0.02 : cur.from - 0.008,
    isFirst ? -0.01 : cur.from + fadeIn - 0.008,
    // Son panel sahne sonuna kadar acik kalir
    isLast ? 1.5 : outAt - fadeOut,
    isLast ? 1.6 : outAt,
  );
}

/**
 * Sahne kaynagi.
 *  "video" → public/video/marsak-tanitim.mp4 scroll ile sarilir
 *  "cizim" → SVG ev + tesisat kompozisyonu
 * Video yuklenemezse otomatik olarak cizime dusulur.
 */
const SAHNE: "video" | "cizim" = "cizim";
const VIDEO_SRC = "/video/marsak-tanitim.mp4";

export default function ScrollStory() {
  const { reduced } = useMotionMode();
  const [activeStage, setActiveStage] = useState(0);
  const [videoFailed, setVideoFailed] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<ScrollVideoHandle>(null);

  const onProgress = useCallback((p: number) => {
    rootRef.current?.style.setProperty("--p", String(p));
    // Videonun zaman ekseni de ayni ilerlemeye baglidir.
    videoRef.current?.seek(p);
  }, []);

  const onStage = useCallback((i: number) => setActiveStage(i), []);
  const onVideoUnavailable = useCallback(() => setVideoFailed(true), []);

  const animated = !reduced;
  /* Azaltilmis harekette video sarilmaz; sade cizim surumu gosterilir. */
  const useVideo = SAHNE === "video" && animated && !videoFailed;

  const scrollRef = useScrollProgress({
    onProgress,
    onStage,
    stageIndexFor,
    enabled: animated,
    /* Animasyon scroll mesafesinin %82'sinde biter; kalan %18 boyunca
       tamamlanmis ev ekranda kalir, ardindan bolum yukari kayar. */
    hold: 0.18,
  });

  return (
    <div
      ref={(node) => {
        rootRef.current = node;
        scrollRef.current = node;
      }}
      className="story blueprint-grid relative bg-canvas-100"
      data-mode={animated ? "animated" : "static"}
      data-scene={useVideo ? "video" : "cizim"}
    >
      {/*
        JavaScript devre disiysa scroll ilerlemesi hesaplanamaz; bu durumda
        sahne sabitlenmez ve tum asamalar normal akista tam gorunur olur.
        Icerik hicbir kosulda kaybolmaz.
      */}
      <noscript>
        <style>{`
          .story { --p: 1 !important; height: auto !important; }
          .story .story-pin {
            position: static; height: auto; min-height: 0;
            padding-block: 3rem 1rem;
          }
          .story .story-svg { max-height: 60svh; }
          .story .story-copy {
            position: static; display: block;
            padding-bottom: 0; pointer-events: auto;
          }
          .story .story-panel {
            visibility: visible; pointer-events: auto;
            opacity: 1; transform: none;
            max-width: 42rem; margin-block: 2.75rem;
          }
          .story .story-progress { display: none; }
        `}</style>
      </noscript>

      {/* Zemin isik efekti */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_55%_40%,rgba(74,163,230,0.10),transparent_60%)]"
      />

      <div className="story-pin">
        <div className="container-x relative flex h-full w-full items-center">
          {/* --------------------------------------------------- sahne */}
          <div className="story-scene absolute inset-0 grid place-items-center lg:left-[26%] lg:right-[-1%]">
            {useVideo ? (
              <figure className="story-video-frame">
                <ScrollVideo
                  ref={videoRef}
                  src={VIDEO_SRC}
                  onUnavailable={onVideoUnavailable}
                  className="story-video"
                />
                {/* Acik tema tipografisinin okunurlugunu koruyan yumusak perde */}
                <span aria-hidden="true" className="story-video-scrim" />
              </figure>
            ) : (
              <>
                <div className="hidden h-full w-full md:block">
                  <HouseSceneDesktop />
                </div>
                <div className="h-full w-full md:hidden">
                  <HouseSceneMobile />
                </div>
              </>
            )}
          </div>

          {/* -------------------------------------------------- metinler */}
          <div className="story-copy px-5 md:px-8">
            {panels.map((panel, i) => {
              const stageIdx = STAGES.findIndex((s) => s.id === panel.stage);
              const isActive = !animated || stageIdx === activeStage;
              const Heading = panel.heading ?? "h2";

              return (
                <div
                  key={panel.stage}
                  className="story-panel"
                  style={panelWindow(panel.stage)}
                  data-active={isActive}
                >
                  <div className="story-panel-card">
                    <p className="eyebrow mb-2.5 sm:mb-4">
                      <span aria-hidden="true" className="h-px w-6 bg-copper-400" />
                      {panel.eyebrow}
                    </p>

                    <Heading className="text-[1.5rem] leading-[1.15] sm:text-4xl lg:text-[2.7rem]">
                      {panel.title}
                    </Heading>

                    <p className="mt-2.5 max-w-lg text-[0.88rem] leading-snug text-ink-soft sm:mt-4 sm:text-lg sm:leading-relaxed">
                      {panel.body}
                    </p>

                    {panel.checks && (
                      <ul className="mt-4 grid gap-2 sm:mt-6 sm:gap-2.5 sm:grid-cols-2">
                        {panel.checks.map((c, ci) => (
                          <li
                            key={c}
                            className="flex items-center gap-2.5 text-sm text-ink"
                            style={{ transitionDelay: `${ci * 90}ms` }}
                          >
                            <span
                              aria-hidden="true"
                              className="grid size-5 shrink-0 place-items-center rounded-full bg-ok-500/12 text-ok-600"
                            >
                              <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                                <path d="m2 6.4 2.6 2.6L10 3.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </span>
                            {c}
                          </li>
                        ))}
                      </ul>
                    )}

                    {panel.cta === "pair" ? (
                      <CtaPair size={i === 0 ? "lg" : "md"} className="mt-5 sm:mt-7" />
                    ) : panel.cta ? (
                      <LinkButton href={panel.cta.href} className="mt-5 sm:mt-7" size="md">
                        {panel.cta.label}
                        <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </LinkButton>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Scroll ipucu — yalnizca ilk asamada */}
          {animated && activeStage === 0 && (
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-5 hidden justify-center lg:flex"
            >
              <span className="flex items-center gap-2 text-[0.7rem] font-medium tracking-[0.22em] text-ink-soft uppercase">
                Kaydırın
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="animate-bounce">
                  <path d="M6 1v10M2.5 7.5 6 11l3.5-3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
              </span>
            </div>
          )}
        </div>

        {animated && <div aria-hidden="true" className="story-progress" />}
      </div>
    </div>
  );
}
