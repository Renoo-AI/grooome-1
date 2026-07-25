import { Link } from "react-router-dom";
import { ArrowRight, Check, Scissors, Dog, Cat, Sparkles, Info, CalendarHeart } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Reveal, Pill } from "@/components/ui";
import { SceneDeco } from "@/components/Decor";
import {
  PACKAGES,
  SIZE_TIERS,
  ADDONS,
  packagePrice,
  type GroomPackage,
} from "@/lib/data";

export default function ServicesPage() {
  const { t, isAr } = useLanguage();
  const dogBasic = PACKAGES.find((p) => p.id === "dog_basic") as GroomPackage;
  const dogFull = PACKAGES.find((p) => p.id === "dog_full") as GroomPackage;
  const catPackages = PACKAGES.filter((p) => p.petType === "cat");

  return (
    <div className="px-5 pb-8 pt-6">
      {/* header */}
      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <span className="eyebrow inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1.5 text-maroon shadow-soft">
            <span className="h-1.5 w-1.5 rounded-full bg-honey" />
            {t("pricing.eyebrow")}
          </span>
        </Reveal>
        <Reveal delay={1}>
          <h1 className="mt-5 text-balance font-display text-4xl font-700 leading-[1.05] text-ink sm:text-5xl">
            {t("pricing.title")}
          </h1>
        </Reveal>
        <Reveal delay={2}>
          <p className="mx-auto mt-4 max-w-2xl text-lg font-semibold text-ink/60">{t("pricing.sub")}</p>
        </Reveal>
        <Reveal delay={3}>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <Pill tone="maroon"><Dog className="h-4 w-4" /> {t("pricing.dogBasic")} & {t("pricing.dogFull")}</Pill>
            <Pill tone="pine"><Cat className="h-4 w-4" /> {t("pricing.cat")}</Pill>
            <Pill tone="honey"><Sparkles className="h-4 w-4" /> {t("pricing.addons")}</Pill>
          </div>
        </Reveal>
      </div>

      {/* Dog packages */}
      <section id="pricing" className="relative mx-auto mt-14 max-w-6xl scroll-mt-24">
        <SceneDeco density="light" />
        <Reveal>
          <h2 className="mb-6 flex items-center gap-2 font-display text-2xl font-700 text-ink">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-maroon text-white"><Dog className="h-5 w-5" /></span>
            {t("pricing.dogBasic")} & {t("pricing.dogFull")}
          </h2>
        </Reveal>
        <div className="grid gap-5 lg:grid-cols-2">
          <PackageTierCard pkg={dogBasic} isAr={isAr} t={t} />
          <PackageTierCard pkg={dogFull} isAr={isAr} t={t} highlight />
        </div>
      </section>

      {/* Cat packages */}
      <section className="relative mx-auto mt-16 max-w-6xl">
        <Reveal>
          <h2 className="mb-6 flex items-center gap-2 font-display text-2xl font-700 text-ink">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-pine text-white"><Cat className="h-5 w-5" /></span>
            {t("pricing.cat")}
          </h2>
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2">
          {catPackages.map((pkg, i) => (
            <Reveal key={pkg.id} delay={i}>
              <FlatPackageCard pkg={pkg} isAr={isAr} t={t} highlight={pkg.popular} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Add-ons */}
      <section className="relative mx-auto mt-16 max-w-6xl">
        <Reveal>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <h2 className="flex items-center gap-2 font-display text-2xl font-700 text-ink">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-honey text-white"><Sparkles className="h-5 w-5" /></span>
              {t("pricing.addons")}
              <span dir="rtl" className="font-display text-base font-600 text-pine">الإضافات</span>
            </h2>
            <Link to="/booking" className="btn btn-secondary text-sm">
              <CalendarHeart className="h-4 w-4" />
              {t("nav.book")}
            </Link>
          </div>
        </Reveal>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {ADDONS.map((a, i) => (
            <Reveal key={a.id} delay={i % 4}>
              <div className="card-bubble flex h-full flex-col justify-between p-4 transition-transform duration-300 hover:-translate-y-1">
                <div>
                  <p className="font-display text-base font-700 leading-snug text-ink">{isAr ? a.nameAr : a.name}</p>
                  <p className="mt-0.5 text-xs font-bold uppercase tracking-wide text-ink/40">{a.category === "haircut" ? "Haircut" : "Care"}</p>
                </div>
                <p className="mt-3 font-display text-xl font-700 text-maroon">{a.price} <span className="text-sm">{t("common.qar")}</span></p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* note + cta */}
      <section className="mx-auto mt-12 max-w-3xl">
        <Reveal>
          <div className="card-bubble flex flex-col items-start gap-3 p-6 sm:flex-row sm:items-center">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-aqua-soft text-aqua-deep"><Info className="h-5 w-5" /></span>
            <p className="flex-1 font-body font-semibold text-ink/65">{t("pricing.note")}</p>
            <Link to="/booking" className="btn btn-primary whitespace-nowrap">
              {t("common.bookNow")}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

// ---------- Dog size-tier table card ----------
function PackageTierCard({
  pkg,
  isAr,
  t,
  highlight,
}: {
  pkg: GroomPackage;
  isAr: boolean;
  t: (k: string) => string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`card-bubble relative flex h-full flex-col p-6 ${
        highlight ? "ring-2 ring-maroon" : ""
      }`}
    >
      {highlight && (
        <span className="absolute -top-3 left-6 rounded-full bg-maroon px-3 py-1 text-xs font-bold text-white shadow-soft">
          {t("common.popular")}
        </span>
      )}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-display text-xl font-700 text-ink">{isAr ? pkg.nameAr : pkg.name}</h3>
          <p dir="rtl" className="text-sm font-bold text-pine">{pkg.arabicTag}</p>
        </div>
        <Scissors className="h-6 w-6 text-maroon/60" />
      </div>
      <p className="mt-2 font-body text-sm font-semibold text-ink/55">{isAr ? pkg.descAr : pkg.desc}</p>

      <div className="mt-4 overflow-hidden rounded-2xl border border-ink/8">
        <div className="grid grid-cols-[1.2fr_1fr_auto] bg-maroon/5 px-4 py-2 text-xs font-bold uppercase tracking-wide text-ink/45">
          <span>{t("pricing.size")}</span>
          <span>{t("pricing.weight")}</span>
          <span className="text-end">{t("pricing.price")}</span>
        </div>
        {SIZE_TIERS.map((tier, i) => {
          const price = packagePrice(pkg, tier.id);
          return (
            <Link
              key={tier.id}
              to="/booking"
              className={`grid grid-cols-[1.2fr_1fr_auto] items-center px-4 py-2.5 text-sm transition-colors hover:bg-maroon/5 ${
                i % 2 ? "bg-white/40" : ""
              }`}
            >
              <span className="font-display font-700 text-ink">{isAr ? tier.labelAr : tier.label}</span>
              <span className="font-semibold text-ink/55">{isAr ? tier.weightAr : tier.weight}</span>
              <span className="text-end font-display font-700 text-maroon">{price} {t("common.qar")}</span>
            </Link>
          );
        })}
      </div>

      <ul className="mt-4 grid grid-cols-2 gap-1.5">
        {(isAr ? pkg.featuresAr : pkg.features).map((f) => (
          <li key={f} className="flex items-center gap-1.5 text-xs font-bold text-ink/60">
            <Check className="h-3.5 w-3.5 text-pine" strokeWidth={3} /> {f}
          </li>
        ))}
      </ul>

      <Link to="/booking" className={`btn mt-5 w-full ${highlight ? "btn-primary" : "btn-secondary"}`}>
        {t("pricing.book")}
        <ArrowRight className="h-4 w-4 rtl:rotate-180" />
      </Link>
    </div>
  );
}

// ---------- Flat cat package card ----------
function FlatPackageCard({
  pkg,
  isAr,
  t,
  highlight,
}: {
  pkg: GroomPackage;
  isAr: boolean;
  t: (k: string) => string;
  highlight?: boolean;
}) {
  return (
    <div className={`card-bubble relative flex h-full flex-col p-6 ${highlight ? "ring-2 ring-maroon" : ""}`}>
      {highlight && (
        <span className="absolute -top-3 left-6 rounded-full bg-maroon px-3 py-1 text-xs font-bold text-white shadow-soft">
          {t("common.popular")}
        </span>
      )}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-display text-xl font-700 text-ink">{isAr ? pkg.nameAr : pkg.name}</h3>
          <p dir="rtl" className="text-sm font-bold text-pine">{pkg.arabicTag}</p>
        </div>
        <Cat className="h-6 w-6 text-pine/60" />
      </div>
      <p className="mt-2 font-body text-sm font-semibold text-ink/55">{isAr ? pkg.descAr : pkg.desc}</p>

      <div className="mt-4 flex items-end justify-between rounded-2xl bg-pine-soft px-4 py-3">
        <span className="font-display text-sm font-700 text-pine">{t("common.from")}</span>
        <span className="font-display text-3xl font-700 text-pine">{pkg.price} <span className="text-base">{t("common.qar")}</span></span>
      </div>

      <ul className="mt-4 grid grid-cols-2 gap-1.5">
        {(isAr ? pkg.featuresAr : pkg.features).map((f) => (
          <li key={f} className="flex items-center gap-1.5 text-xs font-bold text-ink/60">
            <Check className="h-3.5 w-3.5 text-pine" strokeWidth={3} /> {f}
          </li>
        ))}
      </ul>

      <Link to="/booking" className={`btn mt-5 w-full ${highlight ? "btn-primary" : "btn-secondary"}`}>
        {t("pricing.book")}
        <ArrowRight className="h-4 w-4 rtl:rotate-180" />
      </Link>
    </div>
  );
}
