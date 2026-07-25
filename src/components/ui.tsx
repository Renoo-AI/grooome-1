import { motion, type Variants } from "framer-motion";
import { Star } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

// ---------- Reveal on scroll ----------
const variants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "span";
}) {
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      className={className}
      variants={variants}
      custom={delay}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
    >
      {children}
    </MotionTag>
  );
}

// ---------- Section heading ----------
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-start",
        className
      )}
    >
      {eyebrow && (
        <Reveal>
          <span className="eyebrow inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1.5 text-maroon shadow-soft">
            <span className="h-1.5 w-1.5 rounded-full bg-honey" />
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal delay={1}>
        <h2 className="mt-5 text-balance text-4xl font-700 leading-[1.05] text-ink sm:text-5xl">
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={2}>
          <p className="mt-4 text-lg font-semibold text-ink/60">{subtitle}</p>
        </Reveal>
      )}
    </div>
  );
}

// ---------- Stars ----------
export function Stars({ count = 5, className }: { count?: number; className?: string }) {
  return (
    <div className={cn("flex items-center gap-0.5", className)} aria-label={`${count} star rating`}>
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="h-5 w-5 fill-honey text-honey" strokeWidth={1.5} />
      ))}
    </div>
  );
}

// ---------- Pill ----------
export function Pill({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: "neutral" | "maroon" | "pine" | "honey";
  className?: string;
}) {
  const tones = {
    neutral: "bg-white/70 text-ink/70",
    maroon: "bg-maroon-soft text-maroon",
    pine: "bg-pine-soft text-pine",
    honey: "bg-honey/20 text-[#9a5b00]",
  };
  return <span className={cn("chip shadow-soft", tones[tone], className)}>{children}</span>;
}
