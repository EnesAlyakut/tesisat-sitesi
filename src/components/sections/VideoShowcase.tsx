"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const VIDEOS = [
  {
    src: "/video/marsak-saha-1.mp4",
    duration: "00:17",
    eyebrow: "Cihazla ön kontrol",
    title: "Sorunun kaynağını doğru noktada arıyoruz",
    description:
      "Müdahaleye başlamadan önce tesisat hattını ve problemli alanı kontrol ediyoruz. Amaç, gereksiz kırma işlemini azaltmak ve uygulanacak yöntemi doğru belirlemek.",
    points: ["Kontrollü saha incelemesi", "Uygun cihaz ve yöntem seçimi", "İşlem öncesi açık bilgilendirme"],
  },
  {
    src: "/video/marsak-saha-2.mp4",
    duration: "00:11",
    eyebrow: "Profesyonel müdahale",
    title: "Probleme uygun ekipmanla çalışıyoruz",
    description:
      "Tıkanıklık, kaçak veya tesisat arızasının türüne göre farklı cihazlar kullanıyoruz. Her soruna aynı yöntemle yaklaşmak yerine hattın durumuna uygun işlem uyguluyoruz.",
    points: ["Robot spiral ve kamera desteği", "Tesisata uygun çalışma başlığı", "Temiz ve kontrollü işçilik"],
  },
  {
    src: "/video/marsak-saha-3.mp4",
    duration: "00:26",
    eyebrow: "Kontrol ve teslim",
    title: "İşlem sonrasında sistemi yeniden test ediyoruz",
    description:
      "Uygulama tamamlandıktan sonra hattın çalışmasını kontrol ediyor, sonucu müşterimizle birlikte değerlendiriyor ve çalışma alanını toparlayarak teslim ediyoruz.",
    points: ["Hat ve akış kontrolü", "Sonuç hakkında bilgilendirme", "Düzenli çalışma alanı teslimi"],
  },
] as const;

export default function VideoShowcase() {
  const [active, setActive] = useState(0);
  const [muted, setMuted] = useState(true);
  const [canPlay, setCanPlay] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const current = VIDEOS[active];

  const show = useCallback((index: number) => {
    setActive((index + VIDEOS.length) % VIDEOS.length);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (!("IntersectionObserver" in window)) {
      setCanPlay(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCanPlay(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px", threshold: 0.2 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!canPlay || !video || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    void video.play().catch(() => {
      // Otomatik oynatma engellenirse kullanıcı standart kontrollerden başlatabilir.
    });
  }, [active, canPlay]);

  return (
    <section
      ref={sectionRef}
      id="saha-videolari"
      aria-labelledby="saha-videolari-baslik"
      className="relative overflow-hidden border-y border-line bg-[linear-gradient(180deg,#f8fafc_0%,#eef3f7_100%)] py-20 md:py-28"
    >
      <div aria-hidden="true" className="blueprint-grid-fine pointer-events-none absolute inset-0 opacity-25" />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-aqua-500/50 to-transparent" />

      <div className="container-x relative">
        <div className="mb-10 grid gap-5 border-l-2 border-copper-500 pl-5 md:mb-14 md:grid-cols-[minmax(0,0.9fr)_minmax(320px,0.6fr)] md:items-end md:pl-7">
          <div>
          <p className="eyebrow mb-4">
            Uygulama kayıtları
          </p>
          <h2 id="saha-videolari-baslik" className="text-3xl leading-[1.14] sm:text-4xl md:text-[2.9rem]">
            Sahadaki çalışma standardımız
          </h2>
          </div>
          <p className="mt-5 text-[1.02rem] leading-relaxed text-ink-soft md:text-[1.12rem]">
            Gerçek uygulama görüntüleri; ön kontrolden müdahaleye, son kontrolden teslim aşamasına kadar çalışma yaklaşımımızı gösterir. Kayıtlar sırayla ve kesintisiz oynatılır.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-line-strong/70 bg-white shadow-deep lg:grid lg:grid-cols-[minmax(340px,0.78fr)_minmax(0,1.22fr)]">
          <div className="bg-navy-900 p-5 text-white sm:p-7 lg:border-r lg:border-white/10">
            <div className="mb-5 flex items-center justify-between gap-4 border-b border-white/15 pb-4">
              <div>
                <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-copper-300">Marsak Teknik Tesisat</p>
                <p className="mt-1 text-sm font-semibold text-white/90">Saha uygulama kaydı</p>
              </div>
              <span className="border border-white/20 bg-white/[0.06] px-3 py-2 text-xs font-bold tracking-widest text-white/90">
                0{active + 1} / 0{VIDEOS.length}
              </span>
            </div>

            <div className="mx-auto w-full max-w-[390px]">
              <div className="relative aspect-[9/16] overflow-hidden rounded-lg border border-white/20 bg-navy-800 shadow-[0_18px_50px_rgba(0,0,0,0.35)]">
                <video
                  key={current.src}
                  ref={videoRef}
                  className="size-full bg-navy-800 object-cover"
                  autoPlay={canPlay}
                  muted={muted}
                  playsInline
                  preload={canPlay ? "auto" : "none"}
                  controls
                  aria-label={`${active + 1}. saha videosu: ${current.title}`}
                  onVolumeChange={(event) => setMuted(event.currentTarget.muted)}
                  onEnded={() => show(active + 1)}
                >
                  <source src={current.src} type="video/mp4" />
                  Tarayıcınız video oynatmayı desteklemiyor.
                </video>
              </div>

              <div className="mt-5 grid grid-cols-2 border-y border-white/15 py-3 text-xs">
                <div className="border-r border-white/15 pr-4">
                  <span className="block uppercase tracking-widest text-white/45">Gösterim</span>
                  <strong className="mt-1 block font-semibold text-white/90">Otomatik sıralı</strong>
                </div>
                <div className="pl-4">
                  <span className="block uppercase tracking-widest text-white/45">Kayıt süresi</span>
                  <strong className="mt-1 block font-semibold text-white/90">{current.duration}</strong>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-9 lg:p-12">
            <div className="grid h-full content-between gap-10">
              <div key={current.src}>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-extrabold tracking-widest text-copper-600">0{active + 1}</span>
                  <span aria-hidden="true" className="h-px w-10 bg-copper-500" />
                  <p className="text-xs font-bold uppercase tracking-[0.17em] text-ink-mute">{current.eyebrow}</p>
                </div>
                <h3 className="mt-5 max-w-2xl text-2xl leading-tight text-ink sm:text-3xl lg:text-[2.15rem]">{current.title}</h3>
                <p className="mt-5 max-w-2xl leading-7 text-ink-soft">{current.description}</p>

                <ul className="mt-8 grid border-y border-line py-2" aria-label="Uygulama özellikleri">
                  {current.points.map((point) => (
                    <li key={point} className="flex items-center gap-3 border-b border-line-soft py-3 text-sm font-semibold text-ink-soft last:border-0 sm:text-base">
                      <span aria-hidden="true" className="grid size-6 shrink-0 place-items-center border border-aqua-300 bg-aqua-50 text-aqua-700">
                        <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                          <path d="m3 7 2.5 2.5L11 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="mb-3 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-ink-mute">Uygulama aşamaları</p>
                <div className="grid overflow-hidden border border-line-strong bg-canvas-50" role="tablist" aria-label="Saha videoları">
                {VIDEOS.map((video, index) => (
                  <button
                    key={video.src}
                    type="button"
                    role="tab"
                    aria-selected={index === active}
                    aria-label={`${index + 1}. videoyu oynat: ${video.title}`}
                    onClick={() => show(index)}
                    className={`group flex items-center gap-4 border-b border-line px-4 py-4 text-left transition-colors last:border-0 sm:px-5 ${
                      index === active
                        ? "bg-navy-900 text-white"
                        : "bg-white hover:bg-canvas-200"
                    }`}
                  >
                    <span className={`grid size-9 shrink-0 place-items-center border text-sm font-extrabold ${
                      index === active ? "border-copper-400 bg-copper-600 text-white" : "border-line-strong bg-canvas-100 text-navy-900"
                    }`}>
                      0{index + 1}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className={`block text-xs font-bold uppercase tracking-wider ${index === active ? "text-copper-300" : "text-ink-mute"}`}>{video.eyebrow}</span>
                      <span className={`mt-0.5 block truncate font-semibold ${index === active ? "text-white" : "text-ink"}`}>{video.title}</span>
                    </span>
                    <svg className={`shrink-0 transition-transform ${index === active ? "translate-x-1 text-copper-300" : "text-ink-mute group-hover:translate-x-1"}`} width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                      <path d="m7 4 5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
