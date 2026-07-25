import { Link } from "react-router-dom";
import { CalendarHeart, MessageCircle, PawPrint } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Reveal } from "@/components/ui";
import { WHATSAPP_URL } from "@/lib/data";

export function FinalCTA() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="relative scroll-mt-24 px-5 py-16">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.6rem] bg-linear-to-br from-maroon via-maroon to-maroon-dark px-6 py-14 text-center shadow-pop sm:px-12">
            {/* decorative */}
            <div className="paw-pattern absolute inset-0 opacity-20" aria-hidden="true" />
            <PawPrint className="pointer-events-none absolute -left-4 -top-4 h-28 w-28 rotate-12 fill-white/10" aria-hidden="true" />
            <PawPrint className="pointer-events-none absolute -right-4 bottom-0 h-32 w-32 -rotate-12 fill-white/10" aria-hidden="true" />

            <div className="relative">
              <div className="mb-6 flex justify-center text-6xl select-none">
                <span className="animate-float">🐶</span>
              </div>
              <h2 className="text-balance font-display text-4xl font-700 leading-tight text-white sm:text-5xl">
                {t("cta.title")}
              </h2>
              <p className="mx-auto mt-4 max-w-xl font-body text-lg font-semibold text-white/80">
                {t("cta.sub")}
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link to="/booking" className="btn bg-white text-maroon text-base hover:scale-105">
                  <CalendarHeart className="h-5 w-5" />
                  {t("cta.button")}
                </Link>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn border-2 border-white/40 text-white text-base hover:bg-white/10"
                >
                  <MessageCircle className="h-5 w-5" />
                  {t("common.whatsapp")}
                </a>
              </div>
              <p className="mt-4 text-sm font-semibold text-white/60">{t("cta.or")}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
