import { Link } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import { CalendarHeart, PawPrint, ShieldCheck, Star, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Mascot } from "@/components/PetMascot";
import { SceneDeco } from "@/components/Decor";
import heroImg from "@/assets/hero.jpg";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden px-5 pt-8 pb-16 sm:pt-12">
      <SceneDeco />
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-6">
        {/* ---- Copy ---- */}
        <motion.div variants={container} initial="hidden" animate="show" className="relative z-10 text-center lg:text-start">
          <motion.span
            variants={item}
            className="eyebrow inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-maroon shadow-soft"
          >
            <PawPrint className="h-4 w-4" />
            {t("hero.badge")}
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-5 text-balance text-5xl font-700 leading-[1.02] text-ink sm:text-6xl xl:text-7xl"
          >
            {t("hero.title1")} <span className="relative whitespace-nowrap text-maroon">
              {t("hero.title2")}
              <svg viewBox="0 0 300 18" className="absolute -bottom-2 left-0 h-3 w-full text-honey" preserveAspectRatio="none">
                <path d="M3 12 C 80 3, 220 3, 297 10" stroke="currentColor" strokeWidth="6" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </motion.h1>

          <motion.p variants={item} className="mx-auto mt-6 max-w-xl text-lg font-semibold text-ink/65 lg:mx-0">
            {t("hero.subtitle")}
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <Link to="/booking" className="btn btn-primary text-base">
              <CalendarHeart className="h-5 w-5" />
              {t("common.bookNow")}
            </Link>
            <Link to="/services" className="btn btn-secondary text-base">
              {t("common.viewServices")}
            </Link>
          </motion.div>

          <motion.div variants={item} className="mt-9 flex items-center justify-center gap-5 lg:justify-start">
            <div className="flex -space-x-3">
              {["#F0C576", "#F6A869", "#FBE5EB", "#DDF0E5"].map((c, i) => (
                <span
                  key={i}
                  className="grid h-10 w-10 place-items-center rounded-full border-2 border-white text-lg shadow-soft"
                  style={{ background: c }}
                >
                  {["🐶", "🐱", "🦴", "🐾"][i]}
                </span>
              ))}
            </div>
            <div className="text-start">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-honey text-honey" />
                ))}
              </div>
              <p className="text-sm font-bold text-ink/60">{t("hero.trust.title")}</p>
            </div>
          </motion.div>
        </motion.div>

        {/* ---- Visual ---- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          {/* halo */}
          <div className="absolute inset-6 -z-10 rounded-[3rem] bg-linear-to-br from-aqua-deep/40 to-pine/20 blur-2xl" />

          <div className="relative overflow-hidden rounded-[2.6rem] border-4 border-white shadow-bubble">
            <img
              src={heroImg}
              alt="A happy, freshly groomed dog and cat from GroomMe Qatar"
              className="aspect-[4/5] w-full object-cover sm:aspect-square"
              loading="eager"
              decoding="async"
              width={720}
              height={720}
            />
            <div className="absolute inset-0 bg-linear-to-t from-maroon/15 to-transparent" />
          </div>

          {/* floating cards */}
          <motion.div
            className="absolute -left-3 top-10 flex items-center gap-2 rounded-2xl bg-white px-3 py-2.5 shadow-bubble sm:-left-6"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-pine-soft text-pine">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <div className="leading-tight">
              <p className="font-display text-sm font-700 text-ink">100% Safe</p>
              <p className="text-xs font-bold text-ink/50">Pet-loving care</p>
            </div>
          </motion.div>

          <motion.div
            className="absolute -right-2 bottom-12 flex items-center gap-2 rounded-2xl bg-white px-3 py-2.5 shadow-bubble sm:-right-5"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-maroon-soft text-maroon">
              <Sparkles className="h-5 w-5" />
            </span>
            <div className="leading-tight">
              <p className="font-display text-sm font-700 text-ink">4.9 ★ Rating</p>
              <p className="text-xs font-bold text-ink/50">8,500+ happy pets</p>
            </div>
          </motion.div>

          {/* little mascot peeking */}
          <Mascot
            variant="cat"
            className="absolute -bottom-6 -left-4 hidden h-24 w-24 drop-shadow-xl sm:block"
            delay={0.4}
          />
        </motion.div>
      </div>
    </section>
  );
}
