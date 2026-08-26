import type { Metadata } from "next";
import { notFound } from "next/navigation";

import PageHero from "@/components/ui/PageHero";
import Section from "@/components/ui/Section";
import ContentBlocks from "@/components/ui/ContentBlocks";
import LinkList from "@/components/ui/LinkList";
import Faq from "@/components/ui/Faq";
import Reveal from "@/components/ui/Reveal";
import { CtaPair } from "@/components/ui/CallToAction";
import EquipmentGrid from "@/components/sections/EquipmentGrid";
import ContactCta from "@/components/sections/ContactCta";
import ProcessTimeline from "@/components/sections/ProcessTimeline";
import JsonLd from "@/components/JsonLd";

import { getServiceBySlug, getServices } from "@/lib/services-server";
import { buildMetadata, crumbs } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, graph, serviceSchema } from "@/lib/schema";
import { serviceHref } from "@/lib/nav";

export async function generateStaticParams() {
  const allServices = await getServices();
  return allServices.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return {};

  return buildMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: serviceHref(service.slug),
  });
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [service, allServices] = await Promise.all([
    getServiceBySlug(slug),
    getServices(),
  ]);
  if (!service) notFound();

  const trail = crumbs(
    { name: "Hizmetlerimiz", href: "/hizmetler/" },
    { name: service.title, href: serviceHref(service.slug) },
  );

  const related = (service.related || [])
    .map((s) => allServices.find((item) => item.slug === s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema(trail),
          serviceSchema({
            name: service.title,
            description: service.metaDescription,
            path: serviceHref(service.slug),
          }),
          faqSchema(service.faq),
        )}
      />

      <PageHero
        crumbs={trail}
        eyebrow="Hizmetlerimiz"
        title={service.h1}
        lead={service.intro}
      >
        <CtaPair size="md" />
      </PageHero>

      <Section>
        <div className="grid gap-14 lg:grid-cols-[1fr_20rem] lg:gap-16">
          <div className="min-w-0">
            <ContentBlocks blocks={service.blocks} />

            {service.faq.length > 0 && (
              <Reveal as="section" className="mt-16">
                <h2 className="mb-6 text-2xl text-ink sm:text-3xl">
                  {service.title} hakkında sık sorulanlar
                </h2>
                <Faq items={service.faq} className="mx-0 max-w-none" />
              </Reveal>
            )}
          </div>

          {/* Yan sutun — iletisim ve ilgili hizmetler */}
          <aside className="space-y-10">
            <Reveal>
              <div className="sticky top-28 rounded-3xl border border-copper-300 bg-canvas-50 p-6">
                <h2 className="text-lg text-ink">Bu konuda destek alın</h2>
                <p className="mt-3 text-[0.9rem] leading-relaxed text-ink-soft">
                  Şikâyetinizi tarif ettiğinizde uygun yöntem ve kapsam hakkında
                  bilgi verebiliriz.
                </p>
                <CtaPair size="sm" className="mt-5" />
              </div>
            </Reveal>

            <LinkList
              title="İlgili hizmetler"
              columns={1}
              links={related.map((r) => ({
                href: serviceHref(r.slug),
                label: r.shortTitle,
                description: r.summary,
              }))}
            />
          </aside>
        </div>
      </Section>

      {service.equipment.length > 0 && (
        <EquipmentGrid
          slugs={service.equipment}
          title={`${service.title} için kullandığımız cihazlar`}
          lead="Bu hizmette devreye giren ekipmanlar ve hangi durumda kullanıldıkları."
        />
      )}

      <ProcessTimeline />

      <ContactCta
        title={`${service.title} için bize ulaşın`}
        body="Tesisat problemleriniz için 7/24 telefon veya WhatsApp üzerinden bize ulaşabilir, hızlı destek alabilirsiniz."
      />
    </>
  );
}
