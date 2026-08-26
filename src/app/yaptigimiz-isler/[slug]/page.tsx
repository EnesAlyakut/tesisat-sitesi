import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import PageHero from "@/components/ui/PageHero";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import LinkList from "@/components/ui/LinkList";
import BeforeAfter from "@/components/sections/BeforeAfter";
import ContactCta from "@/components/sections/ContactCta";
import JsonLd from "@/components/JsonLd";

import { caseStudies, getCase } from "@/data/cases";
import { getDistrict, locationPages } from "@/data/regions";
import { getService } from "@/data/services";
import { getEquipment } from "@/data/equipment";
import { buildMetadata, crumbs } from "@/lib/seo";
import { breadcrumbSchema, graph } from "@/lib/schema";
import { caseHref, locationHref, serviceHref } from "@/lib/nav";

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getCase(slug);
  if (!item) return {};

  return buildMetadata({
    title: item.title,
    description: `${item.problem} ${item.result}`.slice(0, 155),
    path: caseHref(item.slug),
    image: item.images[0]?.src,
    type: "article",
    publishedTime: item.date,
  });
}

export default async function CaseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getCase(slug);
  if (!item) notFound();

  const district = getDistrict(item.district);
  const service = getService(item.service);

  const trail = crumbs(
    { name: "Yaptığımız İşler", href: "/yaptigimiz-isler/" },
    { name: item.title, href: caseHref(item.slug) },
  );

  const regionPage = locationPages.find((p) => p.district === item.district && p.isHub);

  const rows: [string, string][] = [
    ["Problem", item.problem],
    ["Tespit", item.detection],
    ["Uygulama", item.work],
    ["Sonuç", item.result],
  ];

  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(trail))} />

      <PageHero
        crumbs={trail}
        eyebrow={`${district?.name ?? ""}${service ? ` — ${service.shortTitle}` : ""}`}
        title={item.title}
        lead={item.problem}
      />

      <Section>
        <div className="grid gap-14 lg:grid-cols-[1fr_18rem] lg:gap-16">
          <div className="min-w-0 space-y-12">
            {item.beforeAfter && (
              <Reveal as="section">
                <h2 className="mb-6 text-2xl text-ink sm:text-3xl">Öncesi / Sonrası</h2>
                <BeforeAfter
                  before={item.beforeAfter.before}
                  after={item.beforeAfter.after}
                  label={`${item.title} öncesi ve sonrası`}
                />
              </Reveal>
            )}

            <Reveal as="section">
              <h2 className="mb-6 text-2xl text-ink sm:text-3xl">Çalışma detayı</h2>
              <dl className="divide-y divide-line-strong border-y border-line">
                {rows.map(([label, value]) => (
                  <div key={label} className="grid gap-1 py-5 sm:grid-cols-[8rem_1fr] sm:gap-6">
                    <dt className="text-sm font-medium text-copper-600">{label}</dt>
                    <dd className="text-[0.97rem] leading-relaxed text-ink-soft">{value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            {item.images.length > 0 && (
              <Reveal as="section">
                <h2 className="mb-6 text-2xl text-ink sm:text-3xl">Çalışmadan kareler</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {item.images.map((img) => (
                    <Image
                      key={img.src}
                      src={img.src}
                      alt={img.alt}
                      width={img.width}
                      height={img.height}
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="w-full rounded-2xl border border-line object-cover"
                    />
                  ))}
                </div>
              </Reveal>
            )}
          </div>

          <aside className="space-y-10">
            {item.equipment.length > 0 && (
              <Reveal>
                <h2 className="mb-4 text-xs font-semibold tracking-[0.16em] text-copper-600 uppercase">
                  Kullanılan cihazlar
                </h2>
                <ul className="space-y-2">
                  {item.equipment.map((e) => {
                    const eq = getEquipment(e);
                    return eq ? (
                      <li
                        key={e}
                        className="rounded-2xl border border-line-strong bg-canvas-50 px-4 py-3 text-sm text-ink-soft shadow-[0_1px_2px_rgba(11,23,38,0.04)]"
                      >
                        {eq.name}
                      </li>
                    ) : null;
                  })}
                </ul>
              </Reveal>
            )}

            <LinkList
              title="İlgili sayfalar"
              columns={1}
              links={[
                ...(service
                  ? [{ href: serviceHref(service.slug), label: service.title }]
                  : []),
                ...(regionPage
                  ? [{ href: locationHref(regionPage.slug), label: regionPage.title }]
                  : []),
              ]}
            />
          </aside>
        </div>
      </Section>

      <ContactCta />
    </>
  );
}
