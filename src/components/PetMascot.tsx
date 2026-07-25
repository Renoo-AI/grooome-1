import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

type Variant = "dog" | "cat";

interface MascotProps {
  variant: Variant;
  className?: string;
  breathing?: boolean;
  /** delay before the blink/wag loops start (seconds) */
  delay?: number;
}

/** Cute cartoonic mascot pet built from SVG primitives. */
export function Mascot({ variant, className, breathing = true, delay = 0 }: MascotProps) {
  return (
    <motion.div
      className={cn("relative", className)}
      aria-hidden="true"
      animate={breathing ? { scale: [1, 1.03, 1] } : undefined}
      transition={breathing ? { duration: 3.4, repeat: Infinity, ease: "easeInOut", delay } : undefined}
    >
      {variant === "dog" ? <Dog /> : <Cat />}
    </motion.div>
  );
}

function Dog() {
  return (
    <svg viewBox="0 0 240 240" className="h-full w-full overflow-visible" fill="none">
      {/* Ears */}
      <motion.g
        style={{ transformBox: "fill-box", transformOrigin: "70% 20%" }}
        animate={{ rotate: [0, -3, 0, 2, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <ellipse cx="58" cy="78" rx="30" ry="46" fill="#C9893F" transform="rotate(-18 58 78)" />
        <ellipse cx="52" cy="72" rx="14" ry="26" fill="#E0A458" transform="rotate(-18 52 72)" />
      </motion.g>
      <motion.g
        style={{ transformBox: "fill-box", transformOrigin: "30% 20%" }}
        animate={{ rotate: [0, 2, 0, -3, 0] }}
        transition={{ duration: 5.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <ellipse cx="182" cy="78" rx="30" ry="46" fill="#C9893F" transform="rotate(18 182 78)" />
        <ellipse cx="188" cy="72" rx="14" ry="26" fill="#E0A458" transform="rotate(18 188 72)" />
      </motion.g>

      {/* Head */}
      <ellipse cx="120" cy="124" rx="80" ry="74" fill="#F0C576" />
      <ellipse cx="120" cy="150" rx="46" ry="40" fill="#FBEDD3" />

      {/* Cheeks */}
      <circle cx="70" cy="146" r="12" fill="#F6A0BE" opacity="0.65" />
      <circle cx="170" cy="146" r="12" fill="#F6A0BE" opacity="0.65" />

      {/* Eyes */}
      <g className="animate-blink" style={{ transformBox: "fill-box", transformOrigin: "center" }}>
        <ellipse cx="92" cy="118" rx="13" ry="16" fill="#2A1D16" />
        <ellipse cx="148" cy="118" rx="13" ry="16" fill="#2A1D16" />
        <circle cx="96" cy="112" r="4.5" fill="#fff" />
        <circle cx="152" cy="112" r="4.5" fill="#fff" />
      </g>

      {/* Nose */}
      <ellipse cx="120" cy="140" rx="11" ry="8" fill="#3A2720" />
      {/* Smile + tongue */}
      <path d="M120 150 q-10 16 -24 10" stroke="#3A2720" strokeWidth="3.4" strokeLinecap="round" fill="none" />
      <path d="M120 150 q10 16 24 10" stroke="#3A2720" strokeWidth="3.4" strokeLinecap="round" fill="none" />
      <path d="M114 158 q6 16 12 0 z" fill="#F472A8" />

      {/* Little bandana */}
      <path d="M86 196 q34 26 68 0 l-8 16 q-26 12 -52 0 z" fill="#8A1538" />
      <circle cx="120" cy="206" r="6" fill="#fff" opacity="0.85" />

      {/* Paws peeking */}
      <ellipse cx="84" cy="222" rx="16" ry="12" fill="#F0C576" />
      <ellipse cx="156" cy="222" rx="16" ry="12" fill="#F0C576" />
    </svg>
  );
}

function Cat() {
  return (
    <svg viewBox="0 0 240 240" className="h-full w-full overflow-visible" fill="none">
      {/* Ears */}
      <path d="M58 96 L46 36 L96 70 Z" fill="#F29553" />
      <path d="M182 96 L194 36 L144 70 Z" fill="#F29553" />
      <path d="M64 90 L57 56 L84 74 Z" fill="#F7B6C8" />
      <path d="M176 90 L183 56 L156 74 Z" fill="#F7B6C8" />

      {/* Head */}
      <ellipse cx="120" cy="128" rx="78" ry="72" fill="#F6A869" />
      <ellipse cx="120" cy="158" rx="44" ry="34" fill="#FCE3CB" />

      {/* Tabby forehead stripes */}
      <path d="M104 70 q6 18 0 28" stroke="#D9823B" strokeWidth="6" strokeLinecap="round" fill="none" />
      <path d="M120 66 q0 20 0 30" stroke="#D9823B" strokeWidth="6" strokeLinecap="round" fill="none" />
      <path d="M136 70 q-6 18 0 28" stroke="#D9823B" strokeWidth="6" strokeLinecap="round" fill="none" />

      {/* Cheeks */}
      <circle cx="74" cy="150" r="11" fill="#F6A0BE" opacity="0.6" />
      <circle cx="166" cy="150" r="11" fill="#F6A0BE" opacity="0.6" />

      {/* Eyes (green) */}
      <g className="animate-blink" style={{ transformBox: "fill-box", transformOrigin: "center" }}>
        <ellipse cx="94" cy="124" rx="13" ry="16" fill="#1F6B33" />
        <ellipse cx="146" cy="124" rx="13" ry="16" fill="#1F6B33" />
        <ellipse cx="94" cy="124" rx="4" ry="13" fill="#11240F" />
        <ellipse cx="146" cy="124" rx="4" ry="13" fill="#11240F" />
        <circle cx="98" cy="118" r="3.5" fill="#fff" />
        <circle cx="150" cy="118" r="3.5" fill="#fff" />
      </g>

      {/* Nose */}
      <path d="M112 150 L128 150 L120 160 Z" fill="#E0587E" />
      {/* Mouth */}
      <path d="M120 160 v6" stroke="#7A3A2A" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M120 166 q-8 6 -14 2" stroke="#7A3A2A" strokeWidth="2.6" strokeLinecap="round" fill="none" />
      <path d="M120 166 q8 6 14 2" stroke="#7A3A2A" strokeWidth="2.6" strokeLinecap="round" fill="none" />

      {/* Whiskers */}
      <g stroke="#fff" strokeWidth="2.6" strokeLinecap="round" opacity="0.95">
        <path d="M64 150 h26" />
        <path d="M64 160 h26" />
        <path d="M150 150 h26" />
        <path d="M150 160 h26" />
      </g>
    </svg>
  );
}

/** A single decorative paw print. */
export function Paw({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 64 64" className={className} style={style} aria-hidden="true">
      <ellipse cx="32" cy="40" rx="13" ry="11" />
      <ellipse cx="14" cy="26" rx="6" ry="8" />
      <ellipse cx="26" cy="16" rx="6" ry="8" />
      <ellipse cx="38" cy="16" rx="6" ry="8" />
      <ellipse cx="50" cy="26" rx="6" ry="8" />
    </svg>
  );
}
