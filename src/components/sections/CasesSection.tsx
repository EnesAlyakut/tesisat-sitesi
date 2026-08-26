import Link from "next/link";
import Image from "next/image";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import EmptyState from "@/components/ui/EmptyState";
import { PhoneButton } from "@/components/ui/CallToAction";
import { caseHref } from "@/lib/nav";
import { caseStudies, type CaseStudy } from "@/data/cases";
import { getDistrict } from "@/data/regions";
import { getService } from "@/data/services";

/**
 * Marsak Teknik Tesisat referans saha uygulamaları ve vaka çalışmaları.
 */
export default function CasesSection({
  items = caseStudies,
  limit,
  heading = "Yaptığımız İşler",
  lead = "Gerçekleştirdiğimiz çalışmalardan örnekler. Her kayıtta problem, kullanılan cihaz, uygulanan işlem ve sonuç ayrı ayrı belirtilir.",
}: {
  items?: CaseStudy[];
  limit?: number;
  heading?: string;
  lead?: string;
}) {
  const list = limit ? items.slice(0, limit) : items;

  return (
    <Section divider id="yaptigimiz-isler" eyebrow="Referanslar" title={heading} lead={lead}>
      {list.length === 0 ? (
        <EmptyState
          title="Çalışma kayıtları henüz yayınlanmadı"
          body="Bu alanda yalnızca gerçekten gerçekleştirdiğimiz işlere ait kayıtlar yayınlanır. Tamamlanan çalışmaların fotoğrafları ve detayları hazırlandıkça buraya eklenecektir."
          action={<PhoneButton size="md" label="Sorununuzu anlatın" />}
        />
      ) : (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {list.map((c, i) => (
            <Reveal key={c.slug} delay={i * 70}>
              <CaseCard item={c} />
            </Reveal>
          ))}
        </div>
      )}
    </Section>
  );
}

export function CaseCard({ item }: { item: CaseStudy }) {
  const district = getDistrict(item.district);
  const service = getService(item.service);
  const cover = item.images[0] ?? item.beforeAfter?.after;

  return (
    <article className="group flex h-full flex-col overflow-hidden card transition-colors hover:border-line">
      <div className="relative aspect-[16/10] overflow-hidden bg-canvas-200">
        {cover ? (
          <Image
            src={cover.src}
            alt={cover.alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div aria-hidden="true" className="blueprint-grid-fine h-full w-full" />
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="flex flex-wrap items-center gap-2 text-[0.7rem] font-semibold tracking-[0.12em] text-copper-600 uppercase">
          {district?.name}
          {service && (
            <>
              <span aria-hidden="true" className="text-ink-mute">
                •
              </span>
              {service.shortTitle}
            </>
          )}
        </p>

        <h3 className="mt-3 text-lg leading-snug text-ink">
          <Link href={caseHref(item.slug)} className="transition-colors hover:text-aqua-600">
            {item.title}
          </Link>
        </h3>

        <dl className="mt-4 flex-1 space-y-2 text-[0.86rem] leading-relaxed">
          <Row label="Problem" value={item.problem} />
          <Row label="Tespit" value={item.detection} />
          <Row label="Sonuç" value={item.result} />
        </dl>

        <time
          dateTime={item.date}
          className="mt-5 block text-xs text-ink-soft"
        >
          {new Date(item.date).toLocaleDateString("tr-TR", {
            year: "numeric",
            month: "long",
          })}
        </time>
      </div>
    </article>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2">
      <dt className="shrink-0 text-ink-soft">{label}:</dt>
      <dd className="text-ink-soft">{value}</dd>
    </div>
  );
}
