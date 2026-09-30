import { createFileRoute } from "@tanstack/react-router";
import { eras } from "@/data/eraConfig";
import { EraCard } from "@/components/EraCard";

export const Route = createFileRoute("/eras")({
  head: () => ({
    meta: [
      { title: "Era Archive — Wear The Eras" },
      {
        name: "description",
        content:
          "Browse every Wear The Eras collection — twelve eras, twelve colour worlds. Find the one that's yours.",
      },
    ],
  }),
  component: EraArchivePage,
});

function EraArchivePage() {
  return (
    // The archive itself stays on the main site's neutral ivory/charcoal
    // identity — only a specific era page (era.$slug) switches palettes.
    <div className="bg-background text-foreground">
      <section className="px-6 pb-10 pt-32 md:px-10 md:pt-40">
        <div className="mx-auto max-w-7xl">
          <p className="text-[11px] tracked-tight text-muted-foreground uppercase">
            Era Archive
          </p>
          <h1 className="mt-2 font-display text-4xl md:text-6xl">
            Every Era Has a Look.
          </h1>
          <p className="mt-4 max-w-xl text-[15px] text-muted-foreground">
            Twelve eras, twelve colour worlds. Hover to preview a mood, click
            to step inside — the page transforms to match the one you pick.
          </p>
        </div>
      </section>

      <section className="px-6 pb-24 pt-4 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {eras.map((era) => (
            <EraCard key={era.slug} era={era} size="wide" />
          ))}
        </div>
      </section>
    </div>
  );
}
