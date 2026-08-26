import type { Metadata } from "next";
import { notFound } from "next/navigation";

import PageHero from "@/components/ui/PageHero";
import Section from "@/components/ui/Section";
import ContentBlocks from "@/components/ui/ContentBlocks";
import LinkList from "@/components/ui/LinkList";
import Faq from "@/components/ui/Faq";
import Reveal from "@/components/ui/Reveal";
import { CtaPair } from "@/components/ui/CallToAction";
import ProcessTimeline from "@/components/sections/ProcessTimeline";
import EquipmentGrid from "@/components/sections/EquipmentGrid";
import CasesSection from "@/components/sections/CasesSection";
import PricingSection from "@/components/sections/PricingSection";
import ContactCta from "@/components/sections/ContactCta";
import JsonLd from "@/components/JsonLd";

import { getDistrict, getLocationPage, locationPages } from "@/data/regions";
import { getService } from "@/data/services";
import { casesByDistrict } from "@/data/cases";
import { buildMetadata, crumbs } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, graph, serviceSchema } from "@/lib/schema";
import { locationHref, serviceHref } from "@/lib/nav";

/**
 * BOLGE SEO SAYFALARI
 * ------------------------------------------------------------------
 * Kok seviyesinde temiz URL uretir:
 *   /gokturk-su-tesisatcisi/
 *   /gokturk-su-kacagi-tespiti/
 *   /gokturk-tikaniklik-acma/
 *   /arnavutkoy-su-tesisatcisi/  ... vb.
 *
 * `dynamicParams = false` sayesinde yalnizca tanimli bolge sayfalari
 * uretilir; diger tum kok yollar 404 doner. Statik rotalar (/hizmetler,
 * /iletisim ...) Next.js'te dinamik segmentten once eslesir.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return locationPages.map((p) => ({ bolge: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ bolge: string }>;
}): Promise<Metadata> {
  const { bolge } = await params;
  const page = getLocationPage(bolge);
  if (!page) return {};

  return buildMetadata({
    title: page.metaTitle,
    description: page.metaDescription,
    path: locationHref(page.slug),
  });
}

export default async function LocationPage({
  params,
}: {
  params: Promise<{ bolge: string }>;
}) {
  const { bolge } = await params;
  const page = getLocationPage(bolge);
  if (!page) notFound();

  const district = getDistrict(page.district);

  const trail = crumbs(
    { name: "Hizmet Bölgelerimiz", href: "/hizmet-bolgelerimiz/" },
    ...(page.isHub
      ? []
      : [
          {
            name: district?.name ?? page.title,
            href: locationHref(
              locationPages.find((p) => p.district === page.district && p.isHub)!.slug,
            ),
          },
        ]),
    { name: page.title, href: locationHref(page.slug) },
  );

  const serviceLinks = page.services
    .map((s) => getService(s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s))
    .map((s) => ({
      href: serviceHref(s.slug),
      label: s.shortTitle,
      description: s.summary,
    }));

  /* Ayni kume icindeki diger bolge sayfalari — karsilikli ic linkleme */
  const siblingLinks = page.siblings
    .map((s) => getLocationPage(s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s))
    .map((s) => ({ href: locationHref(s.slug), label: s.title }));

  const equipmentSlugs = Array.from(
    new Set(
      page.services.flatMap((s) => getService(s)?.equipment ?? []),
    ),
  );

  const cases = casesByDistrict(page.district);

  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema(trail),
          serviceSchema({
            name: page.title,
            description: page.metaDescription,
            path: locationHref(page.slug),
          }),
          faqSchema(page.faq),
        )}
      />

      <PageHero
        crumbs={trail}
        eyebrow={`${district?.name ?? ""} — ${district?.parent ?? ""}`}
        title={page.h1}
        lead={page.intro}
      >
        <CtaPair size="md" />
      </PageHero>

      <Section>
        <div className="grid gap-14 lg:grid-cols-[1fr_20rem] lg:gap-16">
          <div className="min-w-0">
            <ContentBlocks blocks={page.blocks} />

            {/* Mahalle listesi — yalnizca hub sayfada */}
            {page.isHub && district && district.neighborhoods.length > 0 && (
              <Reveal as="section" className="mt-14">
                <h2 className="text-2xl text-ink sm:text-3xl">
                  {district.name}&apos;de çalıştığımız alanlar
                </h2>
                <ul className="mt-6 flex flex-wrap gap-2.5">
                  {district.neighborhoods.map((n) => (
                    <li
                      key={n}
                      className="chip"
                    >
                      {n}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-sm leading-relaxed text-ink-soft">
                  Listede yer almayan bir konumdaysanız da arayabilirsiniz; ulaşım
                  durumu hakkında bilgi verebiliriz.
                </p>
              </Reveal>
            )}

            {page.faq.length > 0 && (
              <Reveal as="section" className="mt-16">
                <h2 className="mb-6 text-2xl text-ink sm:text-3xl">
                  {page.title} hakkında sık sorulanlar
                </h2>
                <Faq items={page.faq} className="mx-0 max-w-none" />
              </Reveal>
            )}
          </div>

          <aside className="space-y-10">
            <Reveal>
              <div className="sticky top-28 rounded-3xl border border-copper-300 bg-canvas-50 p-6">
                <h2 className="text-lg text-ink">
                  {district?.name} için hemen ulaşın
                </h2>
                <p className="mt-3 text-[0.9rem] leading-relaxed text-ink-soft">
                  Konumunuzu ve şikâyetinizi paylaştığınızda ulaşım durumu ve
                  kapsam hakkında bilgi verebiliriz.
                </p>
                <CtaPair size="sm" className="mt-5" />
              </div>
            </Reveal>

            <LinkList title="Bu bölgedeki diğer sayfalar" columns={1} links={siblingLinks} />
          </aside>
        </div>
      </Section>

      <Section
        divider
        eyebrow="Hizmetler"
        title={`${district?.name}'de verdiğimiz hizmetler`}
        lead="Aşağıdaki hizmetlerin tamamı bu bölgede sunulmaktadır."
      >
        <LinkList title="Hizmet başlıkları" columns={3} links={serviceLinks} />
      </Section>

      {equipmentSlugs.length > 0 && (
        <EquipmentGrid
          slugs={equipmentSlugs}
          title="Bu bölgede kullandığımız cihazlar"
          lead="Problemin türüne göre devreye giren ekipmanlar."
        />
      )}

      <ProcessTimeline />

      <CasesSection
        items={cases}
        limit={3}
        heading={`${district?.name} çalışmalarımız`}
        lead={`${district?.name} ve çevresinde gerçekleştirdiğimiz işlerden örnekler.`}
      />

      <PricingSection />

      <ContactCta
        title={`${page.title} için bize ulaşın`}
        body={`${district?.name} ve çevresinde tesisat problemleriniz için telefon veya WhatsApp üzerinden bilgi alabilirsiniz.`}
      />
    </>
  );
}
