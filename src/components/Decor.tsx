import { Paw } from "./PetMascot";
import { cn } from "@/utils/cn";

/** Scattered, slowly drifting paw prints + bubbles for atmosphere. */
export function SceneDeco({
  className,
  density = "normal",
}: {
  className?: string;
  density?: "normal" | "light";
}) {
  const paws = density === "light" ? 4 : 6;
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden="true">
      {PAW_DATA.slice(0, paws).map((p, i) => (
        <Paw
          key={i}
          className="absolute fill-maroon/[0.07]"
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            animation: `drift ${p.dur}s ease-in-out ${p.delay}s infinite`,
            transform: `rotate(${p.rot}deg)`,
          }}
        />
      ))}
      {BUBBLE_DATA.map((b, i) => (
        <span
          key={`b-${i}`}
          className="absolute rounded-full bg-white/40"
          style={{
            top: b.top,
            left: b.left,
            width: b.size,
            height: b.size,
            animation: `float ${b.dur}s ease-in-out ${b.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

const PAW_DATA = [
  { top: "8%", left: "6%", size: 54, rot: -18, dur: 16, delay: 0 },
  { top: "22%", left: "88%", size: 42, rot: 24, dur: 18, delay: 1.2 },
  { top: "70%", left: "4%", size: 48, rot: 12, dur: 20, delay: 0.6 },
  { top: "82%", left: "90%", size: 60, rot: -10, dur: 17, delay: 2 },
  { top: "44%", left: "94%", size: 36, rot: 30, dur: 22, delay: 1.5 },
  { top: "55%", left: "2%", size: 38, rot: -24, dur: 19, delay: 0.9 },
];

const BUBBLE_DATA = [
  { top: "16%", left: "18%", size: 18, dur: 7, delay: 0.4 },
  { top: "60%", left: "78%", size: 26, dur: 9, delay: 1 },
  { top: "38%", left: "50%", size: 12, dur: 6, delay: 1.8 },
  { top: "78%", left: "30%", size: 22, dur: 8, delay: 0.2 },
];
