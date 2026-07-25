import { Check } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { SectionHeading, Reveal } from "@/components/ui";
import { SceneDeco } from "@/components/Decor";
import aboutImg from "@/assets/about.jpg";

export function AboutSection() {
  const { t } = useLanguage();
  const bullets = [
    t("about.bullet1"),
    t("about.bullet2"),
    t("about.bullet3"),
    t("about.bullet4"),
  ];

  return (
    <section id="about" className="relative scroll-mt-24 overflow-hidden px-5 py-16">
      <SceneDeco density="light" />
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
        <Reveal className="order-2 lg:order-1">
          <div className="relative mx-auto max-w-md">
            <div className="absolute -inset-3 -z-10 rounded-[2.6rem] bg-linear-to-br from-maroon/15 to-aqua-deep/25 blur-xl" />
            <div className="overflow-hidden rounded-[2.4rem] border-4 border-white shadow-bubble">
              <img
                src={aboutImg}
                alt="A friendly GroomMe groomer gently pampering a fluffy pet"
                className="aspect-[5/4] w-full object-cover"
                loading="lazy"
                decoding="async"
                width={640}
                height={512}
              />
            </div>
            <div className="absolute -bottom-5 -right-3 rounded-2xl bg-white px-4 py-3 shadow-bubble sm:-right-5">
              <p className="font-display text-2xl font-700 text-maroon">10+ yrs</p>
              <p className="text-xs font-bold text-ink/55">of loving pets</p>
            </div>
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <SectionHeading
            eyebrow={t("about.eyebrow")}
            title={t("about.title")}
            align="left"
          />
          <Reveal delay={1}>
            <p className="mt-4 max-w-xl text-lg font-semibold text-ink/65">{t("about.body")}</p>
          </Reveal>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {bullets.map((b, i) => (
              <Reveal key={b} delay={i + 2} as="li">
                <div className="flex items-start gap-3 rounded-2xl bg-white/70 p-3 shadow-soft">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-pine text-white">
                    <Check className="h-4 w-4" strokeWidth={3} />
                  </span>
                  <span className="font-body font-700 text-ink/80">{b}</span>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
