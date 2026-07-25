import { Quote } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { SectionHeading, Reveal, Stars } from "@/components/ui";
import { TESTIMONIALS } from "@/lib/data";

export function Testimonials() {
  const { t, isAr } = useLanguage();

  return (
    <section className="relative overflow-hidden px-5 py-16">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow={t("testi.eyebrow")}
          title={t("testi.title")}
          subtitle={t("testi.sub")}
        />

        {/* coming-soon banner */}
        <Reveal className="mt-10">
          <div className="card-bubble mx-auto flex max-w-2xl flex-col items-center gap-3 p-6 text-center">
            <Stars />
            <p className="font-display text-lg font-700 text-ink">{t("testi.comingSoon")}</p>
            <div className="flex items-center gap-4 opacity-90 text-5xl select-none">
              <span className="animate-bounce">🐶</span>
              <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>🐱</span>
            </div>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TESTIMONIALS.map((rev, i) => (
            <Reveal key={i} delay={i} className="h-full">
              <div className="card-bubble flex h-full flex-col p-5">
                <Quote className="h-7 w-7 text-honey" />
                <Stars className="mt-2" />
                <p className="mt-3 flex-1 font-body text-sm font-semibold text-ink/40">
                  “…”
                </p>
                <div className="mt-4 flex items-center gap-3 border-t border-ink/5 pt-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-maroon-soft font-display text-sm font-700 text-maroon">
                    {rev.initials}
                  </span>
                  <div className="leading-tight">
                    <p className="font-display text-sm font-700 text-ink">{rev.name}</p>
                    <p className="text-xs font-bold text-ink/45">{isAr ? rev.petAr : rev.pet}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
