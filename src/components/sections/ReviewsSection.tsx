import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import EmptyState from "@/components/ui/EmptyState";
import { LinkButton } from "@/components/ui/CallToAction";
import { reviews, aggregateRating } from "@/data/reviews";
import { site } from "@/lib/site";

/**
 * Marsak Teknik Tesisat müşteri değerlendirmeleri ve memnuniyet oranları.
 */
export default function ReviewsSection() {
  const rating = aggregateRating();

  return (
    <Section
      divider
      id="musteri-yorumlari"
      eyebrow="Müşteri Yorumları"
      title="Müşterilerimizin Deneyimleri"
      lead="İstanbul genelinde su kaçağı tespiti, tıkanıklık açma ve sıhhi tesisat onarımı sunduğumuz müşterilerimizin memnuniyet bildirimleri."
    >
      {reviews.length === 0 ? (
        <EmptyState
          title="Yorumlar yükleniyor"
          body="Müşteri değerlendirmelerimiz güncellenmektedir."
        />
      ) : (
        <>
          {rating && (
            <Reveal className="mb-8 flex flex-wrap items-center gap-4 rounded-2xl border border-line bg-canvas-50 p-4 sm:p-5">
              <div className="flex items-center gap-2">
                <span className="text-3xl sm:text-4xl font-extrabold text-ink">{rating.ratingValue}</span>
                <div className="flex text-amber-500">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <svg key={s} width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
                      <path d="m10 2 2.4 5 5.6.8-4 3.9 1 5.5-5-2.6-5 2.6 1-5.5-4-3.9L7.6 7z" />
                    </svg>
                  ))}
                </div>
              </div>
              <span className="text-xs sm:text-sm font-semibold text-ink-soft">
                Google & Doğrudan Servis Üzerinden {rating.reviewCount} Değerlendirme Ortalaması
              </span>
            </Reveal>
          )}

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((r, i) => (
              <Reveal key={r.id} delay={i * 60}>
                <blockquote className="flex h-full flex-col card p-6 sm:p-7 justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div
                        className="flex gap-0.5 text-amber-500"
                        aria-label={`5 üzerinden ${r.rating} puan`}
                      >
                        {Array.from({ length: 5 }).map((_, s) => (
                          <svg
                            key={s}
                            width="16"
                            height="16"
                            viewBox="0 0 20 20"
                            fill={s < r.rating ? "currentColor" : "none"}
                            stroke="currentColor"
                            strokeWidth="1.4"
                            aria-hidden="true"
                          >
                            <path d="m10 2 2.4 5 5.6.8-4 3.9 1 5.5-5-2.6-5 2.6 1-5.5-4-3.9L7.6 7z" />
                          </svg>
                        ))}
                      </div>

                      <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-0.5 text-[0.68rem] font-bold text-emerald-700">
                        ✓ Doğrulanmış
                      </span>
                    </div>

                    <p className="text-[0.92rem] leading-relaxed text-ink">
                      “{r.text}”
                    </p>
                  </div>

                  <footer className="mt-6 border-t border-line-soft pt-4">
                    <div className="flex items-center justify-between text-xs">
                      <div>
                        <strong className="block font-bold text-ink">{r.author}</strong>
                        <span className="text-ink-mute text-[0.72rem]">{r.location}</span>
                      </div>
                      <div className="text-right text-ink-soft text-[0.72rem]">
                        <span className="block font-semibold text-copper-700">{r.service}</span>
                        <time dateTime={r.date}>{new Date(r.date).toLocaleDateString("tr-TR")}</time>
                      </div>
                    </div>
                  </footer>
                </blockquote>
              </Reveal>
            ))}
          </div>
        </>
      )}
    </Section>
  );
}
