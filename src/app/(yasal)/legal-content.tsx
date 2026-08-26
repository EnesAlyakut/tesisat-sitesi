import PageHero from "@/components/ui/PageHero";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import JsonLd from "@/components/JsonLd";
import { crumbs } from "@/lib/seo";
import { breadcrumbSchema, graph } from "@/lib/schema";

export interface LegalSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

/**
 * Yasal sayfalarin ortak duzeni.
 * NOT: Metinler genel bilgilendirme amaclidir. Yayina almadan once
 * isletme bilgileriyle (veri sorumlusu unvani, adres, e-posta) tamamlanmali
 * ve hukuki kontrolden gecirilmelidir.
 */
export default function LegalPage({
  title,
  path,
  lead,
  sections,
  updated,
}: {
  title: string;
  path: string;
  lead: string;
  sections: LegalSection[];
  updated: string;
}) {
  const trail = crumbs({ name: title, href: path });

  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(trail))} />

      <PageHero crumbs={trail} eyebrow="Yasal" title={title} lead={lead} />

      <Section>
        <div className="mx-auto max-w-3xl space-y-12">
          {sections.map((s, i) => (
            <Reveal key={s.heading} delay={i * 30} as="section">
              <h2 className="text-xl text-ink sm:text-2xl">{s.heading}</h2>

              {s.paragraphs.map((p) => (
                <p key={p} className="mt-4 text-[0.97rem] leading-[1.75] text-ink-soft">
                  {p}
                </p>
              ))}

              {s.bullets && (
                <ul className="mt-5 space-y-2.5">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex gap-3.5 text-[0.94rem] leading-relaxed text-ink-soft">
                      <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-copper-400" />
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </Reveal>
          ))}

          <Reveal>
            <p className="border-t border-line-strong pt-6 text-sm text-ink-soft">
              Son güncelleme:{" "}
              <time dateTime={updated}>
                {new Date(updated).toLocaleDateString("tr-TR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
            </p>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
