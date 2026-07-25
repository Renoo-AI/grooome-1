import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { WHATSAPP_URL } from "@/lib/data";

export function FloatingWhatsApp() {
  const { t } = useLanguage();
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 480);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
          className="fixed bottom-5 z-50 ltr:right-5 rtl:left-5"
        >
          <div className="relative flex flex-col items-end gap-3">
            <AnimatePresence>
              {open && (
                <motion.a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.9 }}
                  className="card-bubble flex items-center gap-3 px-4 py-3"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-2xl bg-pine text-white">
                    <MessageCircle className="h-5 w-5" />
                  </span>
                  <span className="pe-1 font-display font-700 text-ink">
                    {t("cta.or")}
                    <span className="block text-xs font-bold text-ink/50">@groomme.qa</span>
                  </span>
                </motion.a>
              )}
            </AnimatePresence>

            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={t("common.whatsapp")}
              className="group relative grid place-items-center rounded-full bg-pine text-white shadow-pop"
              style={{ height: 60, width: 60 }}
            >
              <span className="absolute inset-0 animate-ping rounded-full bg-pine/40" />
              {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-7 w-7" />}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
