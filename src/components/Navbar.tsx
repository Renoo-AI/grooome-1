import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Globe, CalendarHeart } from "lucide-react";
import { Logo } from "./Logo";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/utils/cn";

const NAV = [
  { key: "nav.home", to: "/" },
  { key: "nav.services", to: "/services" },
  { key: "nav.pricing", to: "/services#pricing" },
  { key: "nav.gallery", to: "/#gallery" },
  { key: "nav.about", to: "/#about" },
  { key: "nav.contact", to: "/#contact" },
];

export function Navbar() {
  const { t, toggle, isAr } = useLanguage();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location]);

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-5">
      <nav
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-[1.6rem] px-3 py-2.5 transition-all duration-300 sm:px-4",
          scrolled ? "glass shadow-soft" : "bg-white/40"
        )}
      >
        <Link to="/" aria-label="GroomMe Qatar home" className="shrink-0">
          <Logo />
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <li key={item.key}>
              <Link
                to={item.to}
                className="rounded-full px-3.5 py-2 font-display text-[0.97rem] font-600 text-ink/70 transition-colors hover:bg-maroon/10 hover:text-maroon"
              >
                {t(item.key)}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            className="inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-2 font-display text-sm font-600 text-ink shadow-soft transition-transform hover:scale-105"
            aria-label="Toggle language"
          >
            <Globe className="h-4 w-4 text-pine" />
            {isAr ? "EN" : "ع"}
          </button>

          <Link to="/booking" className="btn btn-primary hidden h-11 px-5 py-0 text-sm sm:inline-flex">
            <CalendarHeart className="h-4 w-4" />
            {t("nav.book")}
          </Link>

          <button
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-maroon text-white shadow-soft lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="mx-auto mt-2 max-w-6xl overflow-hidden rounded-[1.6rem] glass p-3 shadow-bubble lg:hidden"
          >
            <ul className="grid gap-1">
              {NAV.map((item) => (
                <li key={item.key}>
                  <Link
                    to={item.to}
                    className="flex items-center justify-between rounded-2xl px-4 py-3 font-display text-lg font-600 text-ink/80 hover:bg-maroon/10 hover:text-maroon"
                  >
                    {t(item.key)}
                    <span className="text-maroon/40">→</span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link to="/booking" className="btn btn-primary mt-2 w-full">
              <CalendarHeart className="h-5 w-5" />
              {t("nav.book")}
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
