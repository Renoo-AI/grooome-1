import { Link } from "react-router-dom";
import { MessageCircle, MapPin, Clock, BadgeCheck } from "lucide-react";
import { Logo } from "./Logo";

function InstagramGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
import { Paw } from "./PetMascot";
import { useLanguage } from "@/context/LanguageContext";
import {
  WHATSAPP_URL,
  INSTAGRAM_URL,
  TRADE_LICENSE,
} from "@/lib/data";

export function Footer() {
  const { t, isAr } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-16 overflow-hidden bg-maroon text-white">
      <div className="paw-pattern absolute inset-0 opacity-20" aria-hidden="true" />
      <Paw className="pointer-events-none absolute -right-6 top-10 h-40 w-40 fill-white/5" aria-hidden="true" />
      <Paw className="pointer-events-none absolute left-10 bottom-6 h-24 w-24 fill-white/5" style={{ transform: "rotate(20deg)" }} aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo onDark />
            <p className="mt-4 max-w-sm font-body text-white/80">
              {t("footer.tagline")}
            </p>
            <p dir="rtl" className="mt-2 max-w-sm font-body text-white/70">
              {t("footer.taglineAr")}
            </p>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn btn-secondary mt-5">
              <MessageCircle className="h-4 w-4" />
              {t("common.whatsapp")}
            </a>
          </div>

          <div>
            <h3 className="font-display text-lg font-700 text-aqua-soft">{t("footer.explore")}</h3>
            <ul className="mt-4 space-y-2.5 font-body font-semibold text-white/80">
              <li><Link to="/" className="transition-colors hover:text-honey">{t("nav.home")}</Link></li>
              <li><Link to="/services" className="transition-colors hover:text-honey">{t("nav.services")}</Link></li>
              <li><Link to="/booking" className="transition-colors hover:text-honey">{t("nav.book")}</Link></li>
              <li><Link to="/#gallery" className="transition-colors hover:text-honey">{t("nav.gallery")}</Link></li>
              <li><Link to="/#about" className="transition-colors hover:text-honey">{t("nav.about")}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg font-700 text-aqua-soft">{t("footer.contact")}</h3>
            <ul className="mt-4 space-y-3 font-body font-semibold text-white/80">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-honey" />
                <span>Doha, Qatar</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-honey" />
                <span>{t("footer.hours")}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 transition-colors hover:text-honey">
                  <InstagramGlyph className="h-4 w-4 text-honey" /> @groomme.qa
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-honey" />
                <span>{t("footer.license")}: {TRADE_LICENSE}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/15 pt-6 text-center text-sm text-white/70 sm:flex-row sm:text-start">
          <p>© {year} GroomMe Qatar — {t("footer.rights")}</p>
          <p className="flex items-center gap-1.5">{t("footer.madeWith")}</p>
        </div>
        {isAr && null}
      </div>
    </footer>
  );
}
