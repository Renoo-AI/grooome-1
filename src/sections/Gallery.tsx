import { Camera } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { SectionHeading, Reveal } from "@/components/ui";
import g1 from "@/assets/g1.jpg";
import g2 from "@/assets/g2.jpg";
import g3 from "@/assets/g3.jpg";
import g4 from "@/assets/g4.jpg";
import g5 from "@/assets/g5.jpg";

const ITEMS = [
  { src: g1, tag: "gallery.after", ratio: "aspect-[4/5]" },
  { src: g2, tag: "gallery.happy", ratio: "aspect-square" },
  { src: g3, tag: "gallery.before", ratio: "aspect-[4/5]" },
  { src: g4, tag: "gallery.happy", ratio: "aspect-square" },
  { src: g5, tag: "gallery.after", ratio: "aspect-[4/5]" },
];

export function Gallery() {
  const { t } = useLanguage();

  return (
    <section id="gallery" className="relative scroll-mt-24 px-5 py-16">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow={t("gallery.eyebrow")}
          title={t("gallery.title")}
          subtitle={t("gallery.sub")}
        />

        <div className="mt-12 columns-2 gap-4 sm:columns-3">
          {ITEMS.map((item, i) => (
            <Reveal key={i} delay={i % 3} className="mb-4 break-inside-avoid">
              <figure className="group relative overflow-hidden rounded-3xl border-4 border-white shadow-bubble">
                <img
                  src={item.src}
                  alt={`${t(item.tag)} — GroomMe Qatar gallery`}
                  className={`${item.ratio} w-full object-cover transition-transform duration-500 group-hover:scale-110`}
                  loading="lazy"
                  decoding="async"
                  width={480}
                  height={600}
                />
                <div className="absolute inset-0 bg-linear-to-t from-maroon/55 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <figcaption className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-maroon shadow-soft">
                  <Camera className="h-3.5 w-3.5" />
                  {t(item.tag)}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
