export function MarqueeStrip() {
  const items = [
    "INSOMNIA CHRONICLES",
    "YOU WEAR THE STORY",
    "CRIMSON COLLECTION",
    "MIRRORBALL ESSENTIALS",
    "GOLDEN LIKE DAYLIGHT", 
    "WRITERS GUILD",
    "OPENING NIGHT",
  ];
  const row = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-white/10 bg-black py-3">
      <div className="marquee-track flex whitespace-nowrap">
        {row.map((t, i) => (
          <span
            key={i}
            className="mx-8 text-[11px] tracked-tight text-white/80"
          >
            {t} <span className="mx-6 opacity-30">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
