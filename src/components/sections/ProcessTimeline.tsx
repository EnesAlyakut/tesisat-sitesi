import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { processSteps } from "@/data/content";

export default function ProcessTimeline() {
  return (
    <Section
      divider
      id="nasil-calisiyoruz"
      eyebrow="MÜHENDİSLİK DİSİPLİNİ"
      title="4 Adımda Şeffaf ve Kontrollü Çalışma Süreci"
      lead="Tesisat arızalarında gereksiz kırma dökme ve zaman kaybını önlemek için baştan sona planlı ve mühendislik standartlarına uygun ilerliyoruz."
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, i) => (
            <Reveal key={step.no} delay={i * 70}>
              <div className="group relative flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-copper-400 hover:shadow-md">
                <div>
                  {/* Üst Sıra Numarası ve İlerleme Hattı */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
                    <span className="grid size-11 place-items-center rounded-xl bg-copper-100 border border-copper-200 font-extrabold text-copper-800 text-base shadow-xs group-hover:bg-copper-600 group-hover:text-white transition-colors">
                      {step.no}
                    </span>
                    <span className="text-[0.68rem] font-bold uppercase tracking-wider text-slate-400">
                      Adım {i + 1}/4
                    </span>
                  </div>

                  {/* Başlık ve Açıklama */}
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-copper-700 transition-colors">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-slate-700 font-normal">
                    {step.body}
                  </p>
                </div>

                {/* Alt Durum Çizgisi */}
                <div className="mt-6 pt-3 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-copper-700">
                  <span className="size-1.5 rounded-full bg-copper-600" />
                  <span>Standart Prosedür</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
