import { cn } from "@/utils/cn";

interface LogoProps {
  className?: string;
  variant?: "full" | "mark";
  /** wordmark color theme */
  onDark?: boolean;
}

/**
 * GroomMe logo lockup. Brand mark = a friendly paw inside a rounded maroon tile,
 * paired with the "GroomMe" wordmark and a "QATAR" micro-tag.
 */
export function Logo({ className, variant = "full", onDark = false }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5 select-none", className)}>
      <span className="relative inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-maroon shadow-[0_10px_22px_-8px_rgba(138,21,56,0.7)]">
        <svg viewBox="0 0 64 64" className="h-7 w-7" fill="#fff" aria-hidden="true">
          <ellipse cx="32" cy="41" rx="13" ry="11" />
          <ellipse cx="13" cy="27" rx="6" ry="8" />
          <ellipse cx="25" cy="16" rx="6" ry="8" />
          <ellipse cx="39" cy="16" rx="6" ry="8" />
          <ellipse cx="51" cy="27" rx="6" ry="8" />
        </svg>
        <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-honey ring-2 ring-white" />
      </span>
      {variant === "full" && (
        <span className="flex flex-col leading-none">
          <span
            className={cn(
              "font-display text-[1.35rem] font-700 tracking-tight",
              onDark ? "text-white" : "text-ink"
            )}
          >
            Groom<span className="text-maroon">Me</span>
          </span>
          <span
            className={cn(
              "text-[0.6rem] font-extrabold uppercase tracking-[0.34em]",
              onDark ? "text-aqua-soft" : "text-pine"
            )}
          >
            Qatar
          </span>
        </span>
      )}
    </span>
  );
}
