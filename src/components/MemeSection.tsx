import { Link } from "@tanstack/react-router";
import { memes, type MemeItem } from "@/data/memes";
import { eraMap, shortEraName } from "@/data/eraConfig";

/**
 * "The Meme Department" / "After Hours" — a dedicated slot for era memes,
 * relatable posts and short-form branded content.
 *
 * This is intentionally data-driven: populate `src/data/memes.ts` whenever
 * real content exists and this section fills itself in — no structural or
 * page changes required. Until then it renders a minimal "coming soon" state.
 */
export function MemeSection() {
  return (
    <section id="memes" className="bg-background px-6 py-20 text-foreground md:px-10 scroll-mt-24">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <p className="text-[11px] tracked-tight text-muted-foreground uppercase">
            After Hours
          </p>
          <h2 className="mt-2 font-display text-3xl md:text-4xl">
            The Meme Department
          </h2>
          <p className="mt-4 text-sm text-muted-foreground">
            Era memes, relatable posts and after-hours content.
          </p>
        </div>

        {memes.length === 0 ? (
          <div className="mt-10 flex flex-col items-center">
            <span className="inline-block border border-taupe px-5 py-2 text-[11px] tracked-tight text-muted-foreground uppercase">
              Coming Soon
            </span>
          </div>
        ) : (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {memes.map((meme) => (
              <MemeCard key={meme.id} meme={meme} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function MemeCard({ meme }: { meme: MemeItem }) {
  const era = meme.era ? eraMap[meme.era] : undefined;

  return (
    <div className="group">
      <p
        className="mb-3 text-[11px] tracked-tight uppercase"
        style={{ color: era?.primaryColor ?? "var(--wte-burgundy)" }}
      >
        {era ? shortEraName(era.name) : "Wear The Eras"}
      </p>

      <div
        className="relative aspect-square overflow-hidden"
        style={{ background: era?.cardGradient ?? "var(--wte-taupe)" }}
      >
        <div className="noise-overlay" />
        {meme.imageUrl ? (
          <img
            src={meme.imageUrl}
            alt={meme.caption}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center p-6 text-center font-script text-xl"
            style={{ color: era?.textColor ?? "var(--wte-charcoal)" }}
          >
            {meme.mediaLabel ?? "[ Meme ]"}
          </div>
        )}
      </div>

      <p className="mt-3 text-sm text-foreground">{meme.caption}</p>

      {era && (
        <Link
          to="/era/$slug"
          params={{ slug: era.slug }}
          className="mt-3 inline-block text-[11px] tracked-tight uppercase underline decoration-1 underline-offset-4 opacity-70 transition-opacity hover:opacity-100"
        >
          Shop {shortEraName(era.name)}
        </Link>
      )}
    </div>
  );
}
