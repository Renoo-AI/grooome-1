import { Link } from "react-router-dom";
import { Dog, Cat, Scissors, Sparkles, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { SectionHeading, Reveal } from "@/components/ui";
import { HOME_SERVICES, type ServiceCardItem } from "@/lib/data";

const ICONS: Record<string, LucideIcon> = { dog: Dog, cat: Cat, scissors: Scissors, sparkles: Sparkles };
const TONES: Record<string, string> = {
  aqua: "from-aqua-deep to-aqua",
  maroon: "from-maroon to-maroon-dark",
  pine: "from-pine to-pine-dark",
  honey: "from-honey to-[#e08a00]",
};

export function ServicesSection() {
  const { t, isAr } = useLanguage();

  return (
    <section id="services-preview" className="relative scroll-mt-24 px-5 py-16">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow={t("services.eyebrow")}
          title={t("services.title")}
          subtitle={t("services.sub")}
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {HOME_SERVICES.map((s, i) => (
            <ServiceCard key={s.title} s={s} index={i} isAr={isAr} t={t} />
          ))}
        </div>

        <Reveal className="mt-10 text-center">
          <Link to="/services" className="btn btn-secondary">
            {t("services.cta")}
            <ArrowRight className="h-4 w-4 rtl:rotate-180" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function ServiceCard({
  s,
  index,
  isAr,
  t,
}: {
  s: ServiceCardItem;
  index: number;
  isAr: boolean;
  t: (k: string) => string;
}) {
  const Icon = ICONS[s.icon] ?? Sparkles;
  return (
    <Reveal delay={index} className="h-full">
      <div className="card-bubble group flex h-full flex-col p-6 transition-transform duration-300 hover:-translate-y-2">
        <span
          className={`grid h-14 w-14 place-items-center rounded-2xl bg-linear-to-br ${TONES[s.accent]} text-white shadow-soft transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6`}
        >
          <Icon className="h-7 w-7" />
        </span>
        <h3 className="mt-5 font-display text-xl font-700 text-ink">{isAr ? s.titleAr : s.title}</h3>
        <p className="mt-2 flex-1 font-body font-semibold text-ink/60">{isAr ? s.descAr : s.desc}</p>
        <div className="mt-5 flex items-end justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-ink/40">{t("common.from")}</p>
            <p className="font-display text-2xl font-700 text-maroon">
              {s.from} <span className="text-base">{t("common.qar")}</span>
            </p>
          </div>
          <Link
            to="/booking"
            className="grid h-11 w-11 place-items-center rounded-full bg-maroon text-white shadow-soft transition-transform hover:scale-110"
            aria-label={`${t("common.bookNow")}: ${s.title}`}
          >
            <ArrowRight className="h-5 w-5 rtl:rotate-180" />
          </Link>
        </div>
      </div>
    </Reveal>
  );
}
