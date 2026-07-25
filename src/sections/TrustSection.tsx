import { Heart, Award, Star, Leaf } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Reveal } from "@/components/ui";
import { TRUST_STATS } from "@/lib/data";

const ICONS: LucideIcon[] = [Heart, Award, Star, Leaf];
const TONES = ["bg-maroon-soft text-maroon", "bg-honey/20 text-[#9a5b00]", "bg-pine-soft text-pine", "bg-aqua-soft text-aqua-deep"];

export function TrustSection() {
  const { t, isAr } = useLanguage();
  return (
    <section className="relative px-5 py-10">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-6 text-center">
          <p className="font-display text-lg font-700 text-ink/70">{t("trust.heading")}</p>
          <p className="mx-auto mt-1 max-w-xl font-semibold text-ink/50">{t("trust.sub")}</p>
        </Reveal>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {TRUST_STATS.map((s, i) => {
            const Icon = ICONS[i];
            return (
              <Reveal key={s.label} delay={i}>
                <div className="card-bubble flex h-full flex-col items-center gap-2 p-5 text-center transition-transform duration-300 hover:-translate-y-1.5">
                  <span className={`grid h-12 w-12 place-items-center rounded-2xl ${TONES[i]} shadow-soft`}>
                    <Icon className="h-6 w-6" />
                  </span>
                  <p className="font-display text-2xl font-700 text-ink">{s.value}</p>
                  <p className="text-sm font-bold text-ink/55">
                    {isAr ? s.labelAr : s.label}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
