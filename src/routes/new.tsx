import { createFileRoute } from "@tanstack/react-router";
import {
  latestDrop,
  recentlyAdded,
  limitedDrops,
  restockedProducts,
} from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/new")({
  head: () => ({
    meta: [
      { title: "New Drops — Wear The Eras" },
      {
        name: "description",
        content:
          "New arrivals, recently added pieces, limited drops and restocks — everything fresh at Wear The Eras.",
      },
    ],
  }),
  component: NewDropsPage,
});

const SECTIONS = [
  { id: "new-arrivals", label: "New Arrivals" },
  { id: "recently-added", label: "Recently Added" },
  { id: "limited-drops", label: "Limited Drops" },
  { id: "restocked", label: "Restocked" },
];

function NewDropsPage() {
  const arrivals = latestDrop().filter(Boolean);
  const recent = recentlyAdded(8);
  const limited = limitedDrops();
  const restocked = restockedProducts();

  return (
    <div className="bg-background text-foreground">
      {/* Header */}
      <section className="px-6 pb-10 pt-32 md:px-10 md:pt-40">
        <div className="mx-auto max-w-7xl">
          <p className="text-[11px] tracked-tight text-muted-foreground uppercase">
            New Drops
          </p>
          <h1 className="mt-2 font-display text-4xl md:text-6xl">
            Fresh Off The Rack
          </h1>
          <p className="mt-4 max-w-lg text-[15px] text-muted-foreground">
            The newest pieces across every era, what just came back in stock,
            and what&apos;s only around for a limited time.
          </p>
        </div>
      </section>

      {/* Quick nav */}
      <section className="border-b border-border px-6 md:px-10">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto pb-4">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="shrink-0 whitespace-nowrap border border-charcoal/20 px-5 py-2.5 text-[11px] tracked-tight uppercase transition-colors hover:border-charcoal/50"
            >
              {s.label}
            </a>
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      <section id="new-arrivals" className="px-6 py-20 md:px-10">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="NEW ARRIVALS" title="Just Dropped" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {arrivals.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Recently Added */}
      <section id="recently-added" className="bg-card px-6 py-20 md:px-10">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="RECENTLY ADDED"
            title="Fresh To The Archive"
            subtitle="Every piece added most recently, across every era."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {recent.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Limited Drops */}
      <section id="limited-drops" className="px-6 py-20 md:px-10">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="LIMITED DROPS"
            title="While They Last"
            subtitle="Small-batch runs — once they're gone, they're gone."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {limited.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Restocked Products */}
      <section id="restocked" className="bg-card px-6 py-20 md:px-10">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="RESTOCKED"
            title="Back By Popular Demand"
            subtitle="Sold-out favourites, back in stock."
          />
          {restocked.length === 0 ? (
            <p className="mt-8 text-sm text-muted-foreground">
              Nothing&apos;s back in stock right now — check back soon.
            </p>
          ) : (
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
              {restocked.map((p) => (
                <div key={p.id}>
                  <span className="mb-2 inline-block bg-burgundy px-3 py-1 text-[9px] tracked-tight text-ivory">
                    BACK IN STOCK
                  </span>
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div>
      <p className="text-[11px] tracked-tight text-muted-foreground uppercase">
        {eyebrow}
      </p>
      <h2 className="mt-2 font-display text-4xl md:text-5xl">{title}</h2>
      {subtitle && (
        <p className="mt-3 max-w-md text-[14px] text-muted-foreground">
          {subtitle}
        </p>
      )}
    </div>
  );
}
