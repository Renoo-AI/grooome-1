import { Link } from "react-router-dom";
import { Compass, Home, CalendarHeart, RefreshCw } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { SceneDeco } from "@/components/Decor";

export default function NotFound() {
  const { isAr, t } = useLanguage();

  return (
    <div className="relative flex min-h-[75vh] items-center justify-center px-5 py-12">
      <SceneDeco density="light" />

      <div className="card-bubble relative z-10 w-full max-w-lg p-8 text-center sm:p-10">
        {/* Creative Radar Scanner Visual (Simple CSS) */}
        <div className="relative mx-auto mb-8 flex h-28 w-28 items-center justify-center">
          <div className="absolute inset-0 animate-ping rounded-full bg-maroon/10 duration-1000" />
          <div className="absolute inset-2 animate-pulse rounded-full bg-maroon/20 duration-1000" />
          <div className="absolute inset-4 rounded-full bg-maroon/5 border-2 border-dashed border-maroon/30" />
          <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-maroon text-white shadow-pop">
            <Compass className="h-8 w-8 animate-[spin_10s_linear_infinite]" />
          </div>
        </div>

        <span className="eyebrow inline-flex items-center gap-1.5 rounded-full bg-maroon-soft px-4 py-1 text-sm font-bold text-maroon shadow-soft">
          404 {isAr ? "خطأ" : "Error"}
        </span>

        <h1 className="mt-5 font-display text-3xl font-700 text-ink sm:text-4xl">
          {isAr ? "خارج الحدود!" : "Out of Bounds!"}
        </h1>

        <p className="mt-4 font-semibold leading-relaxed text-ink/60">
          {isAr
            ? "يبدو أن هذه الصفحة قد أفلتت من المقود وركضت بعيداً. دعنا نُعيدك إلى المسار الصحيح!"
            : "It seems this page ran off the leash and chased a ball right out of the yard. Let's get you back home!"}
        </p>

        {/* Dynamic Scanning Status Indicator */}
        <div className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white/70 px-4 py-2 text-xs font-bold text-ink/50 border border-ink/5 shadow-soft">
          <RefreshCw className="h-3.5 w-3.5 animate-spin text-pine" />
          {isAr ? "نظام التتبع: ٠ نتائج تم العثور عليها" : "Tracking system: 0 pages found"}
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link to="/" className="btn btn-primary">
            <Home className="h-4 w-4" />
            {isAr ? "العودة للرئيسية" : "Go Home"}
          </Link>
          <Link to="/booking" className="btn btn-secondary">
            <CalendarHeart className="h-4 w-4" />
            {t("nav.book")}
          </Link>
        </div>
      </div>
    </div>
  );
}
