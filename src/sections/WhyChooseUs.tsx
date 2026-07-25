import {
  Award,
  HeartHandshake,
  Sparkles,
  ShieldCheck,
  CalendarCheck,
  Truck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { SectionHeading, Reveal } from "@/components/ui";
import { WHY_ITEMS } from "@/lib/data";

const ICONS: Record<string, LucideIcon> = {
  award: Award,
  "heart-handshake": HeartHandshake,
  sparkles: Sparkles,
  shield: ShieldCheck,
  "calendar-check": CalendarCheck,
  truck: Truck,
};

export function WhyChooseUs() {
  const { t, isAr } = useLanguage();

  return (
    <section className="relative px-5 py-16">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow={t("why.eyebrow")}
          title={t("why.title")}
          subtitle={t("why.sub")}
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_ITEMS.map((w, i) => {
            const Icon = ICONS[w.icon] ?? Sparkles;
            return (
              <Reveal key={w.title} delay={i} className="h-full">
                <div className="card-bubble flex h-full items-start gap-4 p-6 transition-transform duration-300 hover:-translate-y-1.5">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-linear-to-br from-maroon to-maroon-dark text-white shadow-soft">
                    <Icon className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-700 text-ink">{isAr ? w.titleAr : w.title}</h3>
                    <p className="mt-1.5 font-body font-semibold text-ink/60">{isAr ? w.descAr : w.desc}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
