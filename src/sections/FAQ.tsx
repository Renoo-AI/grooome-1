import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, MessageCircleQuestion } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { SectionHeading, Reveal } from "@/components/ui";
import { FAQS } from "@/lib/data";

export function FAQ() {
  const { t, isAr } = useLanguage();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative px-5 py-16">
      <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <SectionHeading
            eyebrow={t("faq.eyebrow")}
            title={t("faq.title")}
            subtitle={t("faq.sub")}
            align="left"
          />
          <Reveal delay={1}>
            <div className="mt-6 hidden items-center gap-3 rounded-3xl bg-maroon p-5 text-white lg:flex">
              <MessageCircleQuestion className="h-8 w-8 text-honey" />
              <p className="font-body font-semibold text-white/85">
                Still have a question? Message us on WhatsApp — we reply fast. 🐾
              </p>
            </div>
          </Reveal>
        </div>

        <div className="flex flex-col gap-3">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i}>
                <div className="card-bubble overflow-hidden p-1.5">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 rounded-[1.6rem] px-5 py-4 text-start transition-colors hover:bg-maroon/5"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display text-lg font-600 text-ink">{isAr ? f.qAr : f.q}</span>
                    <span
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full bg-maroon-soft text-maroon transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      <Plus className="h-4 w-4" strokeWidth={3} />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-5 font-body font-semibold text-ink/65">{isAr ? f.aAr : f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
