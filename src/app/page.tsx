import type { Metadata } from "next";

import HeroSlider from "@/components/sections/HeroSlider";
import TrustStrip from "@/components/sections/TrustStrip";
import ServiceCard from "@/components/sections/ServiceCard";
import WhyMarsak from "@/components/sections/WhyMarsak";
import ProcessTimeline from "@/components/sections/ProcessTimeline";
import EquipmentGrid from "@/components/sections/EquipmentGrid";
import ServiceAreas from "@/components/sections/ServiceAreas";
import CasesSection from "@/components/sections/CasesSection";
import PricingSection from "@/components/sections/PricingSection";
import ContactCta from "@/components/sections/ContactCta";
import VideoShowcase from "@/components/sections/VideoShowcase";

import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { LinkButton } from "@/components/ui/CallToAction";

import { getFeaturedServices } from "@/lib/services-server";
import { buildMetadata } from "@/lib/seo";
import { getCmsContent } from "@/lib/cms";

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getCmsContent();
  return buildMetadata({
    title: cms.seo.homeTitle,
    description: cms.seo.homeDescription,
    path: "/",
    noindex: !cms.seo.indexSite,
  });
}

export default async function HomePage() {
  const [cms, featured] = await Promise.all([
    getCmsContent(),
    getFeaturedServices(),
  ]);
  const visible = cms.homeSections;
  return (
    <>

      {/* 1 — Hizmet gorselleri ve ozet bilgiler */}
      <HeroSlider slides={cms.heroSlides} />

      {/* 2 — Guven gostergeleri */}
      {visible.trust && cms.trustItems.length > 0 && <TrustStrip items={cms.trustItems} />}

      {/* 3 — Sahadan otomatik oynatilan videolar */}
      <VideoShowcase />

      {/* 4 — Ana hizmetler */}
      {visible.services && <Section
        id="hizmetler"
        eyebrow="Hizmetlerimiz"
        title="Hangi konuda desteğe ihtiyacınız var?"
        lead="Problemin türüne göre farklı cihaz ve yöntemlerle çalışıyoruz. Aşağıdaki başlıklardan durumunuza en yakın olanı seçebilirsiniz."
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((service, i) => (
            <Reveal key={service.slug} delay={i * 60}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={120} className="mt-10">
          <LinkButton href="/hizmetler/" variant="outline" size="md">
            Tüm hizmetleri görün
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </LinkButton>
        </Reveal>
      </Section>}

      {/* 4 — Neden Marsak? */}
      {visible.whyMarsak && <WhyMarsak tone="alt" />}

      {/* 5 — Nasil calisiyoruz? */}
      {visible.process && <ProcessTimeline />}

      {/* 6 — Cihazlarimiz */}
      {visible.equipment && <EquipmentGrid tone="alt" />}

      {/* 7 — Hizmet bolgeleri */}
      {visible.serviceAreas && <ServiceAreas />}

      {/* 8 + 9 — Gercek yapilan isler / oncesi-sonrasi */}
      {visible.cases && <CasesSection limit={6} />}

      {/* 10 — Fiyatlar nasil belirlenir? */}
      {visible.pricing && <PricingSection tone="alt" />}

      {/* 11 — Guclu iletisim CTA */}
      {visible.contact && <ContactCta />}
    </>
  );
}
