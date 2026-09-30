import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  X,
  ArrowRight,
  Sparkles,
  Layers,
  Tag,
  Clock3,
  TrendingUp,
  Zap,
} from "lucide-react";
import { products, type Product, allColors } from "@/data/products";
import { eras, type EraConfig } from "@/data/eraConfig";
import { ShirtSilhouette } from "@/components/ProductCard";

/* ---------------- Search domain ---------------- */

type CategoryValue = "shirts" | "caps" | "new" | "bestsellers" | "limited";

const CATEGORIES: {
  value: CategoryValue;
  label: string;
  icon: typeof Layers;
}[] = [
  { value: "shirts", label: "T-Shirts", icon: Layers },
  { value: "caps", label: "Caps", icon: Layers },
  { value: "new", label: "New Arrivals", icon: Clock3 },
  { value: "bestsellers", label: "Best Sellers", icon: TrendingUp },
  { value: "limited", label: "Limited Drops", icon: Zap },
];

const COLOR_HEX: Record<string, string> = {
  Charcoal: "#171717",
  Ivory: "#f7f5f0",
  Burgundy: "#6e2637",
  Taupe: "#b7ada1",
  Rose: "#c9a5a5",
};

const collectionsList = Array.from(new Set(products.map((p) => p.collection))).map((name) => {
  const sample = products.find((p) => p.collection === name)!;
  return { name, era: eras.find((e) => e.slug === sample.era) };
});

type ResultItem =
  | { kind: "product"; key: string; score: number; product: Product }
  | { kind: "collection"; key: string; score: number; name: string; era?: EraConfig }
  | { kind: "era"; key: string; score: number; era: EraConfig }
  | { kind: "color"; key: string; score: number; name: string }
  | {
      kind: "category";
      key: string;
      score: number;
      value: CategoryValue;
      label: string;
      count: number;
    };

function rank(query: string, ...fields: (string | undefined)[]) {
  const q = query.trim().toLowerCase();
  if (!q) return 0;
  let score = 0;
  for (const f of fields) {
    if (!f) continue;
    const lower = f.toLowerCase();
    if (lower === q) score += 100;
    else if (lower.startsWith(q)) score += 50;
    else if (lower.includes(q)) score += 20;
  }
  return score;
}

function searchAll(query: string) {
  const q = query.trim().toLowerCase();
  if (!q || q.length < 2) {
    return { products: [], collections: [], eras: [], colors: [], categories: [] };
  }

  // Products
  const productResults = products
    .map((p) => {
      const typeSynonyms = p.type === "shirt" ? "tee tshirt t-shirt shirt" : "hat cap";
      const score = rank(q, p.name, p.collection, p.color, p.description, typeSynonyms);
      return { kind: "product" as const, key: p.id, score, product: p };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6);

  // Collections
  const collectionResults = collectionsList
    .map(({ name, era }) => ({
      kind: "collection" as const,
      key: name,
      score: rank(q, name, era?.name),
      name,
      era,
    }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);

  // Eras
  const eraResults = eras
    .map((era) => ({
      kind: "era" as const,
      key: era.slug,
      score: rank(q, era.name, era.tagline, era.mood, era.slug),
      era,
    }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);

  // Colours
  const colorResults = allColors
    .map((name) => ({
      kind: "color" as const,
      key: name,
      score: rank(q, name),
      name,
    }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);

  // Product categories
  const categoryResults = CATEGORIES.map((c) => ({
    kind: "category" as const,
    key: c.value,
    score: rank(q, c.label, c.value),
    value: c.value,
    label: c.label,
    count: countForCategory(c.value),
  }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);

  return {
    products: productResults,
    collections: collectionResults,
    eras: eraResults,
    colors: colorResults,
    categories: categoryResults,
  };
}

function countForCategory(value: CategoryValue) {
  switch (value) {
    case "shirts":
      return products.filter((p) => p.type === "shirt").length;
    case "caps":
      return products.filter((p) => p.type === "cap").length;
    case "limited":
      return products.filter((p) => p.limited).length;
    default:
      return products.length;
  }
}

/* ---------------- Overlay ---------------- */

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const grouped = useMemo(() => searchAll(query), [query]);
  const flat = useMemo(
    () => [
      ...grouped.products,
      ...grouped.collections,
      ...grouped.eras,
      ...grouped.colors,
      ...grouped.categories,
    ],
    [grouped],
  );
  const totalResults = flat.length;

  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const goTo = useCallback(
    (result: ResultItem) => {
      onClose();
      if (result.kind === "product") {
        navigate({ to: "/product/$id", params: { id: result.product.id } });
      } else if (result.kind === "era") {
        navigate({ to: "/era/$slug", params: { slug: result.era.slug } });
      } else if (result.kind === "collection") {
        navigate({ to: "/shop", search: { q: result.name } });
      } else if (result.kind === "color") {
        navigate({ to: "/shop", search: { color: result.name } });
      } else if (result.kind === "category") {
        navigate({ to: "/shop", search: { category: result.value } });
      }
    },
    [navigate, onClose],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, Math.max(flat.length - 1, 0)));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      }
      if (e.key === "Enter") {
        const result = flat[activeIndex];
        if (result) {
          e.preventDefault();
          goTo(result);
        }
      }
    },
    [open, onClose, flat, activeIndex, goTo],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  let cursor = 0;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-100 flex items-start justify-center bg-black/80 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="mt-[12vh] w-[92vw] max-w-xl overflow-hidden border border-white/10 bg-[#0a0a0a] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
              <Search className="h-4 w-4 shrink-0 text-white/40" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActiveIndex(0);
                }}
                placeholder="Search products, eras, collections, colours…"
                className="flex-1 bg-transparent text-[15px] text-white placeholder:text-white/30 outline-none"
              />
              <button
                onClick={onClose}
                className="flex h-7 w-7 items-center justify-center rounded border border-white/10 text-white/40 transition-colors hover:bg-white/5 hover:text-white"
                aria-label="Close search"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto">
              {query.trim().length < 2 ? (
                <div className="px-5 py-10 text-center">
                  <Sparkles className="mx-auto h-5 w-5 text-white/20" />
                  <p className="mt-3 text-[12px] tracked-tight text-white/40">TYPE TO SEARCH</p>
                  <p className="mt-1 text-sm text-white/30">
                    Products, eras, collections, colours &amp; categories
                  </p>
                </div>
              ) : totalResults === 0 ? (
                <div className="px-5 py-10 text-center">
                  <p className="text-lg text-white/40">Nothing matches.</p>
                  <p className="mt-1 text-[11px] text-white/30">Try a different keyword</p>
                </div>
              ) : (
                <div className="py-3">
                  <ResultSection title="Products" count={grouped.products.length}>
                    {grouped.products.map((r) => {
                      const idx = cursor++;
                      return (
                        <ProductRow
                          key={r.key}
                          result={r}
                          active={idx === activeIndex}
                          onHover={() => setActiveIndex(idx)}
                          onSelect={() => goTo(r)}
                        />
                      );
                    })}
                  </ResultSection>

                  <ResultSection title="Collections" count={grouped.collections.length}>
                    {grouped.collections.map((r) => {
                      const idx = cursor++;
                      return (
                        <CollectionRow
                          key={r.key}
                          result={r}
                          active={idx === activeIndex}
                          onHover={() => setActiveIndex(idx)}
                          onSelect={() => goTo(r)}
                        />
                      );
                    })}
                  </ResultSection>

                  <ResultSection title="Eras" count={grouped.eras.length}>
                    {grouped.eras.map((r) => {
                      const idx = cursor++;
                      return (
                        <EraRow
                          key={r.key}
                          result={r}
                          active={idx === activeIndex}
                          onHover={() => setActiveIndex(idx)}
                          onSelect={() => goTo(r)}
                        />
                      );
                    })}
                  </ResultSection>

                  <ResultSection title="Colours" count={grouped.colors.length}>
                    {grouped.colors.map((r) => {
                      const idx = cursor++;
                      return (
                        <ColorRow
                          key={r.key}
                          result={r}
                          active={idx === activeIndex}
                          onHover={() => setActiveIndex(idx)}
                          onSelect={() => goTo(r)}
                        />
                      );
                    })}
                  </ResultSection>

                  <ResultSection title="Categories" count={grouped.categories.length}>
                    {grouped.categories.map((r) => {
                      const idx = cursor++;
                      return (
                        <CategoryRow
                          key={r.key}
                          result={r}
                          active={idx === activeIndex}
                          onHover={() => setActiveIndex(idx)}
                          onSelect={() => goTo(r)}
                        />
                      );
                    })}
                  </ResultSection>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between border-t border-white/10 px-5 py-2.5 text-[10px] text-white/25 tracked-tight">
              <span>{totalResults} RESULTS</span>
              <span className="hidden md:inline">↑↓ NAVIGATE · ENTER SELECT · ESC CLOSE</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------------- Sections & rows ---------------- */

function ResultSection({
  title,
  count,
  children,
}: {
  title: string;
  count: number;
  children: ReactNode;
}) {
  if (count === 0) return null;

  return (
    <div className="mb-1">
      <p className="px-5 pb-1 pt-2 text-[10px] tracked-tight text-white/30">
        {title.toUpperCase()}
      </p>
      {children}
    </div>
  );
}

function RowShell({
  active,
  onHover,
  onSelect,
  icon,
  title,
  subtitle,
}: {
  active: boolean;
  onHover: () => void;
  onSelect: () => void;
  icon: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
}) {
  return (
    <button
      onClick={onSelect}
      onMouseEnter={onHover}
      className={`flex w-full items-center gap-4 px-5 py-3 text-left transition-colors ${
        active ? "bg-white/8" : "hover:bg-white/5"
      }`}
    >
      {icon}
      <div className="min-w-0 flex-1">
        <p className="truncate text-[14px] text-white">{title}</p>
        {subtitle && <p className="mt-0.5 truncate text-[11px] text-white/40">{subtitle}</p>}
      </div>
      <ArrowRight className="h-3.5 w-3.5 shrink-0 text-white/20" />
    </button>
  );
}

function ProductRow({
  result,
  active,
  onHover,
  onSelect,
}: {
  result: Extract<ResultItem, { kind: "product" }>;
  active: boolean;
  onHover: () => void;
  onSelect: () => void;
}) {
  const p = result.product;
  const era = eras.find((e) => e.slug === p.era);
  return (
    <RowShell
      active={active}
      onHover={onHover}
      onSelect={onSelect}
      title={p.name}
      subtitle={`${p.collection} · $${p.price}`}
      icon={
        <div
          className="relative h-10 w-10 shrink-0 overflow-hidden rounded"
          style={{ background: era?.cardGradient ?? "#222" }}
        >
          <ShirtSilhouette type={p.type} color={era?.accentColor ?? "#fff"} />
        </div>
      }
    />
  );
}

function CollectionRow({
  result,
  active,
  onHover,
  onSelect,
}: {
  result: Extract<ResultItem, { kind: "collection" }>;
  active: boolean;
  onHover: () => void;
  onSelect: () => void;
}) {
  return (
    <RowShell
      active={active}
      onHover={onHover}
      onSelect={onSelect}
      title={result.name}
      subtitle={result.era ? result.era.name : "Collection"}
      icon={
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded"
          style={{ background: result.era?.primaryColor ?? "#333", opacity: 0.9 }}
        >
          <Layers className="h-4 w-4 text-white/90" />
        </div>
      }
    />
  );
}

function EraRow({
  result,
  active,
  onHover,
  onSelect,
}: {
  result: Extract<ResultItem, { kind: "era" }>;
  active: boolean;
  onHover: () => void;
  onSelect: () => void;
}) {
  const era = result.era;
  return (
    <RowShell
      active={active}
      onHover={onHover}
      onSelect={onSelect}
      title={era.name}
      subtitle={era.tagline}
      icon={
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
          style={{ background: era.primaryColor }}
        >
          <Sparkles className="h-4 w-4" style={{ color: era.textColor }} />
        </div>
      }
    />
  );
}

function ColorRow({
  result,
  active,
  onHover,
  onSelect,
}: {
  result: Extract<ResultItem, { kind: "color" }>;
  active: boolean;
  onHover: () => void;
  onSelect: () => void;
}) {
  const hex = COLOR_HEX[result.name] ?? "#888";
  return (
    <RowShell
      active={active}
      onHover={onHover}
      onSelect={onSelect}
      title={result.name}
      subtitle="Shop this colour"
      icon={
        <div
          className="h-10 w-10 shrink-0 rounded-full border border-white/15"
          style={{ background: hex }}
        />
      }
    />
  );
}

function CategoryRow({
  result,
  active,
  onHover,
  onSelect,
}: {
  result: Extract<ResultItem, { kind: "category" }>;
  active: boolean;
  onHover: () => void;
  onSelect: () => void;
}) {
  return (
    <RowShell
      active={active}
      onHover={onHover}
      onSelect={onSelect}
      title={result.label}
      subtitle={`${result.count} pieces`}
      icon={
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-white/5">
          <Tag className="h-4 w-4 text-white/80" />
        </div>
      }
    />
  );
}
