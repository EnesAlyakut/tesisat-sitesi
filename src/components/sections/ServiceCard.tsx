import Image from "next/image";
import Link from "next/link";
import type { Service } from "@/data/types";
import ServiceIcon from "@/components/icons/ServiceIcon";
import { serviceHref } from "@/lib/nav";

const serviceImageMap: Record<string, string> = {
  "su-kacagi-tespiti": "/images/services/su-kacagi-tespiti.webp",
  "tikaniklik-acma": "/images/services/tikaniklik-acma.webp",
  "kamerali-gider-goruntuleme": "/images/services/kamerali-gider-goruntuleme.webp",
  "su-tesisati-tamiri": "/images/services/su-tesisati-tamiri.webp",
  "banyo-mutfak-tesisati": "/images/services/banyo-mutfak-tesisati.webp",
  "acil-tesisatci": "/images/services/acil-tesisatci.webp",
  "kirmadan-su-kacagi-tespiti": "/images/services/su-kacagi-tespiti.webp",
  "robotla-tikaniklik-acma": "/images/services/tikaniklik-acma.webp",
  "pimas-gider-yikama": "/images/services/kamerali-gider-goruntuleme.webp",
  "temiz-ve-pis-su-tesisati": "/images/services/su-tesisati-tamiri.webp",
  "klozet-rezervuar-tamiri": "/images/services/banyo-mutfak-tesisati.webp",
  "musluk-batarya-degisimi": "/images/services/banyo-mutfak-tesisati.webp",
  "petek-temizligi": "/images/services/su-tesisati-tamiri.webp",
};

/**
 * Modern, görsel destekli hizmet kartı.
 * Hover durumunda görsel yakınlaşır, ikon ve yönlendirme butonu canlanır.
 */
export default function ServiceCard({ service }: { service: Service }) {
  const imageSrc = serviceImageMap[service.slug] || "/images/services/su-kacagi-tespiti.webp";

  return (
    <Link
      href={serviceHref(service.slug)}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-copper-300 hover:shadow-[0_16px_36px_rgba(13,27,44,.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper-500"
    >
      {/* Üst Görsel Alanı */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-navy-900">
        <Image
          src={imageSrc}
          alt={service.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-navy-900/60 via-navy-900/10 to-transparent"
        />

        {/* İkon Rozeti */}
        <span
          aria-hidden="true"
          className="absolute bottom-3 left-4 flex size-11 items-center justify-center rounded-xl bg-white/95 text-copper-600 shadow-md backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:bg-copper-600 group-hover:text-white"
        >
          <ServiceIcon name={service.icon} size={22} />
        </span>
      </div>

      {/* İçerik Alanı */}
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 transition-colors duration-200 group-hover:text-copper-600">
          {service.shortTitle}
        </h3>

        <p className="mt-2.5 flex-1 text-sm leading-relaxed text-slate-700 font-normal">
          {service.summary}
        </p>

        {/* Alt Buton / Aksiyon */}
        <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-4">
          <span className="text-xs font-bold tracking-wider text-copper-700 uppercase">
            Detaylı Bilgi & Fiyat →
          </span>
          <span className="grid size-8 place-items-center rounded-full bg-slate-100 text-copper-700 transition-all duration-300 group-hover:translate-x-1 group-hover:bg-copper-600 group-hover:text-white">
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
