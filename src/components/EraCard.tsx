import { Link } from "@tanstack/react-router";
import type { EraConfig } from "@/data/eraConfig";

export function EraCard({
  era,
  size = "tall",
}: {
  era: EraConfig;
  size?: "tall" | "wide";
}) {
  const aspect = size === "tall" ? "aspect-[3/4]" : "aspect-video";
  return (
    <Link
      to="/era/$slug"
      params={{ slug: era.slug }}
      className={`group relative shrink-0 overflow-hidden ${aspect} ${
        size === "tall" ? "w-70" : "w-full"
      }`}
      style={{ background: era.heroBg }}
    >
      <div className="noise-overlay" />
      <div
        className="absolute inset-0 transition-all duration-500 group-hover:scale-105"
        style={{ background: era.heroBg }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          boxShadow: `inset 0 0 0 2px ${era.primaryColor}, 0 0 40px ${era.glowColor}`,
        }}
      />

      <div className="absolute inset-x-0 bottom-0 z-10 p-5">
        <p
          className="text-[10px] tracked-tight"
          style={{ color: era.mutedColor, opacity: 0.9 }}
        >
          {era.mood}
        </p>
        <h3
          className="mt-1 font-display text-[32px] leading-none"
          style={{ color: era.textColor }}
        >
          {era.name}
        </h3>
        <p
          className="mt-2 font-script text-sm opacity-0 transition-opacity duration-300 group-hover:opacity-90"
          style={{ color: era.textColor }}
        >
          &ldquo;{era.tagline}&rdquo;
        </p>
      </div>
    </Link>
  );
}
