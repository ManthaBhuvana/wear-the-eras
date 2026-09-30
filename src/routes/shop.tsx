import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import {
  products as allProducts,
  allColors,
  allSizes,
  priceBounds,
  latestDropIds,
  bestSellerIds,
  type Product,
} from "@/data/products";
import { eras } from "@/data/eraConfig";
import { ProductCard } from "@/components/ProductCard";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

/* ---------------- Types & constants ---------------- */

type Category = "all" | "shirts" | "caps" | "new" | "bestsellers" | "limited";
type SortKey = "featured" | "newest" | "price-asc" | "price-desc" | "rating";

const CATEGORY_VALUES: Category[] = ["all", "shirts", "caps", "new", "bestsellers", "limited"];

interface ShopSearch {
  q?: string;
  era?: string;
  color?: string;
  category?: Category;
}

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — Wear The Eras" },
      {
        name: "description",
        content:
          "Browse every shirt and cap across every era — filter by era, size, colour, price and rating.",
      },
    ],
  }),
  validateSearch: (search: Record<string, unknown>): ShopSearch => ({
    q: typeof search.q === "string" ? search.q : undefined,
    era: typeof search.era === "string" ? search.era : undefined,
    color: typeof search.color === "string" ? search.color : undefined,
    category:
      typeof search.category === "string" && CATEGORY_VALUES.includes(search.category as Category)
        ? (search.category as Category)
        : undefined,
  }),
  component: ShopPage,
});

const CATEGORIES: { value: Category; label: string }[] = [
  { value: "all", label: "All Products" },
  { value: "shirts", label: "T-Shirts" },
  { value: "caps", label: "Caps" },
  { value: "new", label: "New Arrivals" },
  { value: "bestsellers", label: "Best Sellers" },
  { value: "limited", label: "Limited Drops" },
];

const SORTS: { value: SortKey; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Customer Rating" },
];

const RATING_OPTIONS = [4.5, 4, 3];

interface Filters {
  eras: string[];
  types: Array<"shirt" | "cap">;
  sizes: string[];
  colors: string[];
  minPrice: number;
  maxPrice: number;
  minRating: number;
}

const emptyFilters = (): Filters => ({
  eras: [],
  types: [],
  sizes: [],
  colors: [],
  minPrice: priceBounds.min,
  maxPrice: priceBounds.max,
  minRating: 0,
});

/* ---------------- Page ---------------- */

function ShopPage() {
  const search = Route.useSearch();

  const [category, setCategory] = useState<Category>(search.category ?? "all");
  const [filters, setFilters] = useState<Filters>(() => ({
    ...emptyFilters(),
    eras: search.era ? [search.era] : [],
    colors: search.color ? [search.color] : [],
  }));
  const [sort, setSort] = useState<SortKey>("featured");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [query, setQuery] = useState(search.q ?? "");

  // Re-sync local state whenever the URL search params change — e.g. when
  // arriving here from global search with a fresh ?q=/era=/color=/category=.
  useEffect(() => {
    setCategory(search.category ?? "all");
    setFilters({
      ...emptyFilters(),
      eras: search.era ? [search.era] : [],
      colors: search.color ? [search.color] : [],
    });
    setQuery(search.q ?? "");
  }, [search.q, search.era, search.color, search.category]);

  const filtered = useMemo(
    () => selectAndSort(allProducts, category, filters, sort, query),
    [category, filters, sort, query],
  );

  const activeFilterCount =
    filters.eras.length +
    filters.types.length +
    filters.sizes.length +
    filters.colors.length +
    (filters.minRating > 0 ? 1 : 0) +
    (filters.minPrice > priceBounds.min || filters.maxPrice < priceBounds.max ? 1 : 0);

  return (
    <div className="bg-background text-foreground">
      {/* Header */}
      <section className="px-6 pb-10 pt-32 md:px-10 md:pt-40">
        <div className="mx-auto max-w-7xl">
          <p className="text-[11px] tracked-tight text-muted-foreground uppercase">Shop</p>
          <h1 className="mt-2 font-display text-4xl md:text-6xl">
            {query.trim() ? `Results for “${query.trim()}”` : "The Full Collection"}
          </h1>
          <p className="mt-4 max-w-lg text-[15px] text-muted-foreground">
            {query.trim()
              ? `${filtered.length} ${filtered.length === 1 ? "piece matches" : "pieces match"} your search.`
              : "Every shirt and cap, every era, in one place. Filter by what matters to you and find the piece that's yours."}
          </p>

          {/* Search within shop */}
          <div className="mt-6 flex max-w-md items-center gap-3 border border-charcoal/20 px-4 py-3 focus-within:border-charcoal">
            <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products, collections, colours…"
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Category chips */}
      <section className="border-b border-border px-6 md:px-10">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto pb-4">
          {CATEGORIES.map((c) => (
            <button
              key={c.value}
              onClick={() => setCategory(c.value)}
              className={`shrink-0 whitespace-nowrap border px-5 py-2.5 text-[11px] tracked-tight uppercase transition-colors ${
                category === c.value
                  ? "border-charcoal bg-charcoal text-ivory"
                  : "border-charcoal/20 text-foreground hover:border-charcoal/50"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </section>

      {/* Body: sidebar + grid */}
      <section className="px-6 py-10 md:px-10 md:py-14">
        <div className="mx-auto flex max-w-7xl gap-10">
          {/* Desktop sidebar */}
          <aside className="hidden w-64 shrink-0 lg:block">
            <div className="sticky top-28">
              <FilterPanel filters={filters} setFilters={setFilters} />
            </div>
          </aside>

          {/* Grid column */}
          <div className="min-w-0 flex-1">
            {/* Toolbar */}
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
              <p className="text-[13px] text-muted-foreground">
                {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
              </p>

              <div className="flex items-center gap-3">
                {/* Mobile filter trigger */}
                <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                  <SheetTrigger asChild>
                    <button className="flex items-center gap-2 border border-charcoal/20 px-4 py-2.5 text-[11px] tracked-tight uppercase transition-colors hover:border-charcoal/50 lg:hidden">
                      <SlidersHorizontal className="h-3.5 w-3.5" />
                      Filters
                      {activeFilterCount > 0 && (
                        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-burgundy text-[9px] text-ivory">
                          {activeFilterCount}
                        </span>
                      )}
                    </button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-full overflow-y-auto sm:max-w-sm">
                    <SheetHeader>
                      <SheetTitle className="font-display text-2xl">Filters</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <FilterPanel filters={filters} setFilters={setFilters} />
                    </div>
                    <button
                      onClick={() => setMobileFiltersOpen(false)}
                      className="mt-8 w-full bg-primary py-4 text-[12px] tracked-tight text-primary-foreground"
                    >
                      SHOW {filtered.length} RESULTS
                    </button>
                  </SheetContent>
                </Sheet>

                {/* Sort */}
                <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
                  <SelectTrigger className="w-47.5 border-charcoal/20 text-[12px] tracked-tight uppercase">
                    <SelectValue placeholder="Sort" />
                  </SelectTrigger>
                  <SelectContent>
                    {SORTS.map((s) => (
                      <SelectItem key={s.value} value={s.value}>
                        {s.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Active filter pills */}
            {activeFilterCount > 0 && (
              <div className="mb-8 flex flex-wrap items-center gap-2">
                <ActivePills filters={filters} setFilters={setFilters} />
                <button
                  onClick={() => setFilters(emptyFilters())}
                  className="text-[11px] tracked-tight text-muted-foreground underline hover:text-foreground"
                >
                  Clear all
                </button>
              </div>
            )}

            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <p className="font-display text-2xl">No pieces match yet.</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Try clearing a filter or search term.
                </p>
                <button
                  onClick={() => {
                    setFilters(emptyFilters());
                    setCategory("all");
                    setQuery("");
                  }}
                  className="mt-6 border border-charcoal/30 px-6 py-3 text-[11px] tracked-tight uppercase hover:border-charcoal"
                >
                  Reset filters
                </button>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 xl:gap-8">
                {filtered.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ---------------- Filtering & sorting ---------------- */

function selectAndSort(
  products: Product[],
  category: Category,
  filters: Filters,
  sort: SortKey,
  query = "",
): Product[] {
  const q = query.trim().toLowerCase();

  let list = products.filter((p) => {
    if (category === "shirts" && p.type !== "shirt") return false;
    if (category === "caps" && p.type !== "cap") return false;
    if (category === "new" && !latestDropIds.has(p.id)) return false;
    if (category === "bestsellers" && !bestSellerIds.has(p.id)) return false;
    if (category === "limited" && !p.limited) return false;

    if (filters.eras.length && !filters.eras.includes(p.era)) return false;
    if (filters.types.length && !filters.types.includes(p.type)) return false;
    if (filters.sizes.length && !p.sizes.some((s) => filters.sizes.includes(s))) return false;
    if (filters.colors.length && !filters.colors.includes(p.color)) return false;
    if (p.price < filters.minPrice || p.price > filters.maxPrice) return false;
    if (p.rating < filters.minRating) return false;

    if (q) {
      const haystack = [p.name, p.collection, p.color, p.type, p.description]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(q)) return false;
    }

    return true;
  });

  switch (sort) {
    case "price-asc":
      list = [...list].sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      list = [...list].sort((a, b) => b.price - a.price);
      break;
    case "rating":
      list = [...list].sort((a, b) => b.rating - a.rating);
      break;
    case "newest":
      // Placeholder recency signal — swap for a real createdAt once available.
      list = [...list].reverse();
      break;
    case "featured":
    default:
      break;
  }

  return list;
}

/* ---------------- Filter panel ---------------- */

function FilterPanel({
  filters,
  setFilters,
}: {
  filters: Filters;
  setFilters: (f: Filters) => void;
}) {
  const toggle = <K extends "eras" | "types" | "sizes" | "colors">(
    key: K,
    value: Filters[K][number],
  ) => {
    const current = filters[key] as Array<Filters[K][number]>;

    setFilters({
      ...filters,
      [key]: current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value],
    } as Filters);
  };

  return (
    <div className="space-y-8">
      {/* Era */}
      <FilterGroup title="Era">
        <div className="max-h-56 space-y-2.5 overflow-y-auto pr-1">
          {eras.map((era) => (
            <label key={era.slug} className="flex cursor-pointer items-center gap-2.5 text-[13px]">
              <Checkbox
                checked={filters.eras.includes(era.slug)}
                onCheckedChange={() => toggle("eras", era.slug)}
              />
              {era.name}
            </label>
          ))}
        </div>
      </FilterGroup>

      {/* Product Type */}
      <FilterGroup title="Product Type">
        {(["shirt", "cap"] as const).map((t) => (
          <label key={t} className="flex cursor-pointer items-center gap-2.5 text-[13px]">
            <Checkbox
              checked={filters.types.includes(t)}
              onCheckedChange={() => toggle("types", t)}
            />
            {t === "shirt" ? "T-Shirts" : "Caps"}
          </label>
        ))}
      </FilterGroup>

      {/* Size */}
      <FilterGroup title="Size">
        <div className="flex flex-wrap gap-2">
          {allSizes.map((size) => {
            const active = filters.sizes.includes(size);
            return (
              <button
                key={size}
                onClick={() => toggle("sizes", size)}
                className={`border px-3 py-1.5 text-[11px] tracked-tight transition-colors ${
                  active
                    ? "border-charcoal bg-charcoal text-ivory"
                    : "border-charcoal/25 hover:border-charcoal/60"
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </FilterGroup>

      {/* Colour */}
      <FilterGroup title="Colour">
        {allColors.map((color) => (
          <label key={color} className="flex cursor-pointer items-center gap-2.5 text-[13px]">
            <Checkbox
              checked={filters.colors.includes(color)}
              onCheckedChange={() => toggle("colors", color)}
            />
            {color}
          </label>
        ))}
      </FilterGroup>

      {/* Price */}
      <FilterGroup title="Price">
        <div className="flex items-center gap-3 text-[13px]">
          <span>${filters.minPrice}</span>
          <input
            type="range"
            min={priceBounds.min}
            max={priceBounds.max}
            value={filters.maxPrice}
            onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) })}
            className="flex-1 accent-[var(--wte-burgundy)]"
          />
          <span>${filters.maxPrice}</span>
        </div>
        <p className="mt-1 text-[11px] text-muted-foreground">Up to ${filters.maxPrice}</p>
      </FilterGroup>

      {/* Rating */}
      <FilterGroup title="Rating">
        <div className="space-y-2.5">
          {RATING_OPTIONS.map((r) => (
            <label key={r} className="flex cursor-pointer items-center gap-2.5 text-[13px]">
              <input
                type="radio"
                name="minRating"
                checked={filters.minRating === r}
                onChange={() => setFilters({ ...filters, minRating: r })}
                className="h-4 w-4 accent-[var(--wte-burgundy)]"
              />
              {r}+ stars
            </label>
          ))}
          <label className="flex cursor-pointer items-center gap-2.5 text-[13px]">
            <input
              type="radio"
              name="minRating"
              checked={filters.minRating === 0}
              onChange={() => setFilters({ ...filters, minRating: 0 })}
              className="h-4 w-4 accent-[var(--wte-burgundy)]"
            />
            Any rating
          </label>
        </div>
      </FilterGroup>
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-3 text-[11px] tracked-tight text-muted-foreground uppercase">{title}</p>
      <div className="space-y-2.5">{children}</div>
    </div>
  );
}

/* ---------------- Active filter pills ---------------- */

function ActivePills({
  filters,
  setFilters,
}: {
  filters: Filters;
  setFilters: (f: Filters) => void;
}) {
  const pills: { label: string; onRemove: () => void }[] = [
    ...filters.eras.map((slug) => ({
      label: eras.find((e) => e.slug === slug)?.name ?? slug,
      onRemove: () => setFilters({ ...filters, eras: filters.eras.filter((e) => e !== slug) }),
    })),
    ...filters.types.map((t) => ({
      label: t === "shirt" ? "T-Shirts" : "Caps",
      onRemove: () => setFilters({ ...filters, types: filters.types.filter((x) => x !== t) }),
    })),
    ...filters.sizes.map((s) => ({
      label: `Size ${s}`,
      onRemove: () => setFilters({ ...filters, sizes: filters.sizes.filter((x) => x !== s) }),
    })),
    ...filters.colors.map((c) => ({
      label: c,
      onRemove: () => setFilters({ ...filters, colors: filters.colors.filter((x) => x !== c) }),
    })),
    ...(filters.minRating > 0
      ? [
          {
            label: `${filters.minRating}+ stars`,
            onRemove: () => setFilters({ ...filters, minRating: 0 }),
          },
        ]
      : []),
    ...(filters.maxPrice < priceBounds.max
      ? [
          {
            label: `Up to $${filters.maxPrice}`,
            onRemove: () => setFilters({ ...filters, maxPrice: priceBounds.max }),
          },
        ]
      : []),
  ];

  return (
    <>
      {pills.map((pill, i) => (
        <button
          key={i}
          onClick={pill.onRemove}
          className="flex items-center gap-1.5 border border-charcoal/20 px-3 py-1.5 text-[11px] tracked-tight uppercase hover:border-charcoal/50"
        >
          {pill.label}
          <X className="h-3 w-3" />
        </button>
      ))}
    </>
  );
}
