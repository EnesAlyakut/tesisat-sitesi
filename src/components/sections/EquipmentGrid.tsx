import Image from "next/image";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { equipment } from "@/data/equipment";

/**
 * Cihazlarimiz.
 * Fotograf alani, gercek Marsak ekipman gorselleri eklendiginde otomatik
 * olarak devreye girer; gorsel yoksa teknik cizim yer tutucusu gosterilir.
 * Isletmede bulunmayan cihazlar bu listede yer almamalidir.
 */
export default function EquipmentGrid({
  slugs,
  title = "Kullandığımız Cihazlar",
  lead = "Her arızaya aynı yöntemle yaklaşmıyoruz. Problemin türü, hangi cihazla çalışacağımızı belirler.",
  tone,
}: {
  /** Verilirse yalnizca bu cihazlar gosterilir. */
  slugs?: string[];
  title?: string;
  lead?: string;
  tone?: "base" | "alt";
}) {
  const list = slugs?.length
    ? equipment.filter((e) => slugs.includes(e.slug))
    : equipment;

  if (list.length === 0) return null;

  return (
    <Section tone={tone} divider eyebrow="Ekipmanlarımız" title={title} lead={lead}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((item, i) => (
          <Reveal key={item.slug} delay={i * 60}>
            <article className="flex h-full flex-col overflow-hidden card">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-canvas-200">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={`${item.name} — Marsak Teknik Tesisat`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                ) : (
                  <div
                    aria-hidden="true"
                    className="blueprint-grid-fine grid h-full w-full place-items-center"
                  >
                    <span className="text-[0.7rem] font-medium tracking-[0.18em] text-ink-soft uppercase">
                      Görsel eklenecek
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-base font-semibold text-ink">{item.name}</h3>

                <dl className="mt-4 space-y-3.5 text-[0.88rem] leading-relaxed">
                  <div>
                    <dt className="mb-1 text-[0.7rem] font-semibold tracking-[0.14em] text-copper-600 uppercase">
                      Ne işe yarar?
                    </dt>
                    <dd className="text-ink-soft">{item.purpose}</dd>
                  </div>
                  <div>
                    <dt className="mb-1 text-[0.7rem] font-semibold tracking-[0.14em] text-copper-600 uppercase">
                      Hangi durumda kullanılır?
                    </dt>
                    <dd className="text-ink-soft">{item.useCase}</dd>
                  </div>
                </dl>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
