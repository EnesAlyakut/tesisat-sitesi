"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

import { LinkButton, WhatsAppButton } from "@/components/ui/CallToAction";
import type { CmsHeroSlide } from "@/lib/cms-types";

const AUTOPLAY_MS = 6000;

export default function HeroSlider({ slides }: { slides: CmsHeroSlide[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const show = useCallback((index: number) => {
    setActive((index + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, AUTOPLAY_MS);

    return () => window.clearInterval(timer);
  }, [paused]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Marsak Teknik Tesisat hizmetleri"
      className="relative isolate min-h-[680px] overflow-hidden bg-navy-900 text-white lg:min-h-[740px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
      }}
    >
      {slides.map((slide, index) => (
        <div
          key={slide.image}
          aria-hidden={index !== active}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out motion-reduce:transition-none ${
            index === active ? "z-0 opacity-100" : "pointer-events-none -z-10 opacity-0"
          }`}
        >
          <Image
            src={slide.image}
            alt={index === active ? slide.alt : ""}
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-cover object-[68%_center] lg:object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,18,31,0.97)_0%,rgba(7,18,31,0.88)_35%,rgba(7,18,31,0.46)_62%,rgba(7,18,31,0.12)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(7,18,31,0.72)_0%,transparent_45%)] lg:hidden" />
        </div>
      ))}

      <div className="container-x relative z-10 flex min-h-[560px] sm:min-h-[680px] items-center py-16 sm:py-20 lg:min-h-[740px] lg:py-24">
        <div className="grid w-full max-w-2xl pb-20 sm:pb-16 pt-4 sm:pt-8">
          {slides.map((slide, index) => {
            const Heading = index === 0 ? "h1" : "h2";

            return (
              <div
                key={slide.title}
                aria-hidden={index !== active}
                className={`col-start-1 row-start-1 transition-all duration-700 motion-reduce:transition-none ${
                  index === active
                    ? "visible translate-y-0 opacity-100"
                    : "pointer-events-none invisible translate-y-3 opacity-0"
                }`}
              >
                <p className="eyebrow mb-3 sm:mb-5 text-copper-300 text-xs sm:text-sm">
                  <span aria-hidden="true" className="h-px w-5 sm:w-7 bg-copper-400" />
                  {slide.eyebrow}
                </p>
                <Heading className="max-w-xl text-[1.85rem] leading-[1.12] sm:text-[2.6rem] sm:leading-[1.1] lg:text-[3.8rem] font-extrabold text-white">
                  {slide.title}
                </Heading>
                <p className="mt-3 sm:mt-6 max-w-xl text-sm sm:text-base leading-relaxed text-white/80 sm:text-lg">
                  {slide.body}
                </p>

                <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <LinkButton href={slide.href} size="md" className="w-full sm:w-auto justify-center text-center">
                    {slide.cta}
                    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </LinkButton>
                  <WhatsAppButton size="md" onDark className="w-full sm:w-auto justify-center text-center" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="container-x absolute inset-x-0 bottom-7 z-20 flex items-center justify-between gap-5">
        <div className="flex items-center gap-2" role="tablist" aria-label="Hero görselleri">
          {slides.map((slide, index) => (
            <button
              key={slide.title}
              type="button"
              role="tab"
              aria-selected={index === active}
              aria-label={`${index + 1}. görsel: ${slide.title}`}
              onClick={() => show(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === active ? "w-10 bg-copper-400" : "w-5 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Önceki görsel"
            onClick={() => show(active - 1)}
            className="grid size-11 place-items-center rounded-full border border-white/30 bg-navy-900/35 text-white backdrop-blur-sm transition hover:border-white/60 hover:bg-navy-900/65"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="m11 4-5 5 5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Sonraki görsel"
            onClick={() => show(active + 1)}
            className="grid size-11 place-items-center rounded-full border border-white/30 bg-navy-900/35 text-white backdrop-blur-sm transition hover:border-white/60 hover:bg-navy-900/65"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="m7 4 5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
