/**
 * Guven seridi — yatay kayan sade teknik bilgi bandi.
 * Yalnizca dogrulanabilir ifadeler yer alir; sayi/puan/garanti iddiasi yoktur.
 * Hareket CSS animasyonu ile yapilir; reduced-motion'da durur (globals.css).
 */
export default function TrustStrip({ items }: { items: string[] }) {
  return (
    <section
      aria-label="Öne çıkan hizmet özellikleri"
      className="relative overflow-hidden border-y border-line-strong bg-canvas-50 py-4"
    >
      {/* Kenar yumusatma */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-canvas-100 to-transparent sm:w-28"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-canvas-100 to-transparent sm:w-28"
      />

      <div className="flex w-max animate-[marquee-x_38s_linear_infinite] motion-reduce:animate-none">
        {/* Kesintisiz dongu icin liste iki kez basilir. Kopya ekran okuyucudan gizlenir. */}
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            className="flex items-center"
            aria-hidden={copy === 1 ? true : undefined}
          >
            {items.map((item) => (
              <li key={item} className="flex items-center gap-3 px-5 sm:px-7">
                <span aria-hidden="true" className="size-1.5 rounded-full bg-copper-400" />
                <span className="text-[0.8rem] font-medium tracking-[0.1em] whitespace-nowrap text-ink-soft uppercase sm:text-sm">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
