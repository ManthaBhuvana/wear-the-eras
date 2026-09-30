import { useMemo } from "react";
import type { ParticleType } from "@/data/eraConfig";

interface Props {
  type: ParticleType;
  color: string;
  count?: number;
}
const lightColors = [
  "#ffffff",
  "#fef08a",
  "#fde68a",
  "#7dd3fc",
  "#bae6fd",
];

export function ParticleCanvas({ type, color, count }: Props) {
  const particles = useMemo(() => {
    const n = count ?? defaultCount(type);
    return Array.from({ length: n }, (_, i) => ({
      i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 2 + Math.random() * 4,
      delay: Math.random() * 6,
      duration: 4 + Math.random() * 8,
      drift: -40 + Math.random() * 80,
      rotate: Math.random() * 360,
      opacity: 0.3 + Math.random() * 0.7,
    }));
  }, [type, count]);

  if (type === "none") return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {type === "stars" &&
        particles.map((p) => (
          <span
            key={p.i}
            className="absolute rounded-full"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: p.size,
              height: p.size,
              background: color,
              animation: `twinkle ${p.duration}s ease-in-out ${p.delay}s infinite`,
              boxShadow: `0 0 ${p.size * 2}px ${color}`,
            }}
          />
        ))}

      {type === "sparkles" &&
        particles.map((p) => (
          <svg
            key={p.i}
            className="absolute"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: p.size * 4,
              height: p.size * 4,
              animation: `twinkle ${p.duration}s ease-in-out ${p.delay}s infinite`,
            }}
            viewBox="0 0 24 24"
            fill={color}
          >
            <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" />
          </svg>
        ))}

      {type === "leaves" &&
        particles.map((p) => (
          <span
            key={p.i}
            className="absolute"
            style={{
              left: `${p.left}%`,
              top: `-5%`,
              width: 8,
              height: 14,
              background: color,
              borderRadius: "60% 0 60% 0",
              opacity: p.opacity,
              ["--drift" as never]: `${p.drift}px`,
              animation: `fall ${p.duration + 6}s linear ${p.delay}s infinite`,
              transform: `rotate(${p.rotate}deg)`,
            }}
          />
        ))}

      {type === "snowflakes" &&
        particles.map((p) => (
          <span
            key={p.i}
            className="absolute rounded-full"
            style={{
              left: `${p.left}%`,
              top: `-5%`,
              width: p.size,
              height: p.size,
              background: color,
              ["--drift" as never]: `${p.drift}px`,
              animation: `fall ${p.duration + 8}s linear ${p.delay}s infinite`,
            }}
          />
        ))}

      {type === "petals" &&
        particles.map((p) => (
          <span
            key={p.i}
            className="absolute"
            style={{
              left: `${p.left}%`,
              top: `-5%`,
              width: 10,
              height: 6,
              background: color,
              borderRadius: "50%",
              opacity: p.opacity,
              ["--drift" as never]: `${p.drift}px`,
              animation: `fall ${p.duration + 6}s linear ${p.delay}s infinite`,
              transform: `rotate(${p.rotate}deg)`,
            }}
          />
        ))}

      {type === "hearts" &&
  particles.map((p) => (
    <svg
      key={p.i}
      className="absolute"
      style={{
  left: `${p.left}%`,
  bottom: 0,
  width: 36,
  height: 36,

  opacity: 0.9,

  filter: "drop-shadow(0 0 8px rgba(255,255,255,0.5))",

  animation: `floatUp ${p.duration + 6}s linear ${p.delay}s infinite`,
}}
      viewBox="0 0 24 24"
      fill={color}
    >
      <path d="M12 21s-7-4.35-7-10a4.5 4.5 0 0 1 8-2.85A4.5 4.5 0 0 1 19 11c0 5.65-7 10-7 10z" />
    </svg>
  ))}
      {type === "fog" &&
        Array.from({ length: 6 }).map((_, i) => (
          <span
            key={i}
            className="absolute"
            style={{
              left: `${-10 + i * 18}%`,
              top: `${10 + i * 12}%`,
              width: "60vw",
              height: "30vh",
              borderRadius: "50%",
              background: `radial-gradient(circle, ${color}55 0%, transparent 70%)`,
              filter: "blur(60px)",
              animation: `fog ${20 + i * 4}s ease-in-out ${i}s infinite`,
            }}
          />
        ))}

      {type === "glitch" &&
        Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className="absolute left-0 right-0 h-px"
            style={{
              background: color,
              animation: `glitchScan ${3 + i * 0.7}s linear ${i * 1.5}s infinite`,
            }}
          />
        ))}

      {type === "confetti" &&
  particles.map((p) => (
    <span
      key={p.i}
      className="absolute"
      style={{
        left: `${p.left}%`,
        top: `-10vh`,
        width: 6,
        height: 10,
        background: color,
        opacity: p.opacity,
        animation: `confetti ${p.duration + 4}s linear ${p.delay}s infinite`,
        transform: `rotate(${p.rotate}deg)`,
            }}
          />
        ))}
        
    </div>
  );
}

function defaultCount(type: ParticleType) {
  switch (type) {
    case "stars":
      return 150;
    case "sparkles":
      return 100;
    case "leaves":
      return 80;
    case "hearts":
      return 150;
    case "fog":
      return 50;
    case "snowflakes":
      return 100;
    case "petals":
      return 70;
    case "confetti":
      return 80;
    default:
      return 0;
  }
}
