import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, Minus, Plus, Ruler } from "lucide-react";
import { toast } from "sonner";
import { productMap, productsByEra } from "@/data/products";
import { eraMap, shortEraName } from "@/data/eraConfig";
import { useStore } from "@/store/useStore";
import { useEraTheme } from "@/hooks/useEraTheme";
import { ProductCard, RatingStars } from "@/components/ProductCard";
import { ReviewsSection } from "@/components/ReviewsSection";
import { LimitedBadge } from "@/components/LimitedBadge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = productMap[params.id];
    if (!product) throw notFound();
    const era = eraMap[product.era];
    return { product, era };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — Wear The Eras` },
          { name: "description", content: loaderData.product.description },
        ]
      : [],
  }),
  component: ProductPage,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
      <div className="text-center">
        <p className="font-script text-2xl opacity-70">
          That piece isn&apos;t in the archive.
        </p>
        <Link to="/shop" className="mt-6 inline-block underline">
          Back to the shop
        </Link>
      </div>
    </div>
  ),
});

function ProductPage() {
  const { product, era } = Route.useLoaderData();
  useEraTheme(era);
  const navigate = useNavigate();

  const [size, setSize] = useState(product.sizes[2] ?? product.sizes[0]);
  const [qty, setQty] = useState(1);

  const addToCart = useStore((s) => s.addToCart);
  const toggleWishlist = useStore((s) => s.toggleWishlist);
  const wished = useStore((s) => s.wishlist.includes(product.id));
  const setStartedCheckout = useStore((s) => s.setStartedCheckout);

  const outOfStock = product.stock <= 0;

  const eraProducts = productsByEra(product.era).filter((p) => p.id !== product.id);
  const matchingShirt = eraProducts.find((p) => p.type === "shirt");
  const matchingCap = eraProducts.find((p) => p.type === "cap");
  const morePieces = eraProducts.filter(
    (p) => p.id !== matchingShirt?.id && p.id !== matchingCap?.id,
  );
  const completeTheLook = [matchingShirt, matchingCap, ...morePieces].filter(
    (p): p is NonNullable<typeof p> => Boolean(p),
  );

  const handleAddToCart = () => {
    addToCart(product.id, size, qty);
    toast.success(`${product.name} added to cart`, {
      description: `Size ${size} · Qty ${qty}`,
    });
  };

  const handleBuyNow = () => {
    addToCart(product.id, size, qty);
    setStartedCheckout(true);
    navigate({ to: "/checkout" });
  };

  return (
    <div style={{ background: era.surfaceColor, color: era.textColor }}>
      <div className="grid pt-24 md:min-h-screen md:grid-cols-2 md:pt-0">
        {/* LARGE PRODUCT IMAGERY */}
        <div
          className="relative flex aspect-square items-center justify-center overflow-hidden md:aspect-auto md:min-h-screen"
          style={{ background: era.cardGradient }}
        >
          <div className="noise-overlay" />
          <ProductSilhouette type={product.type} color={era.accentColor} />
          {product.limited && (
            <LimitedBadge className="absolute left-6 top-6 z-20 md:left-10 md:top-28" />
          )}
        </div>

        {/* DETAILS */}
        <div className="flex flex-col justify-center p-8 md:px-16 md:pb-16 md:pt-32">
          <Link
            to="/era/$slug"
            params={{ slug: era.slug }}
            className="inline-flex w-fit items-center gap-2 text-[11px] tracked-tight uppercase opacity-70 transition-opacity hover:opacity-100"
            style={{ color: era.textColor }}
          >
            {product.collection} · {shortEraName(era.name)} Era
          </Link>

          <h1 className="mt-4 font-display text-4xl leading-tight md:text-5xl">
            {product.name}
          </h1>

          <div className="mt-4">
            <RatingStars rating={product.rating} count={product.ratingCount} />
          </div>

          <p className="mt-5 font-display text-3xl">${product.price}</p>

          <p className="mt-6 max-w-md text-[15px] opacity-80">
            {product.description}
          </p>

          {/* Colour & material */}
          <div className="mt-8 flex flex-wrap gap-8 text-[13px]">
            <div>
              <p className="text-[11px] tracked-tight opacity-60 uppercase">Colour</p>
              <div className="mt-2 flex items-center gap-2">
                <span
                  className="h-4 w-4 rounded-full border"
                  style={{ background: era.accentColor, borderColor: `${era.textColor}44` }}
                />
                {product.color}
              </div>
            </div>
            <div className="max-w-[220px]">
              <p className="text-[11px] tracked-tight opacity-60 uppercase">Material</p>
              <p className="mt-2 opacity-80">{product.material}</p>
            </div>
          </div>

          {/* Size */}
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <p className="text-[11px] tracked-tight opacity-70 uppercase">Size</p>
              <SizeGuideDialog type={product.type} textColor={era.textColor} />
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className="border px-4 py-3 text-xs transition-colors"
                  style={{
                    borderColor: s === size ? era.primaryColor : `${era.textColor}33`,
                    background: s === size ? era.primaryColor : "transparent",
                    color: s === size ? era.surfaceColor : era.textColor,
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mt-8 flex items-center gap-4">
            <div
              className="flex items-center border px-3 py-3"
              style={{ borderColor: `${era.textColor}33` }}
            >
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="px-2 disabled:opacity-30"
                aria-label="Decrease quantity"
                disabled={outOfStock}
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="w-8 text-center text-sm">{qty}</span>
              <button
                onClick={() => setQty(Math.min(product.stock, qty + 1))}
                className="px-2 disabled:opacity-30"
                aria-label="Increase quantity"
                disabled={outOfStock || qty >= product.stock}
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
            <p className="text-[12px] opacity-60">{product.inventoryLine}</p>
          </div>

          {/* CTAs */}
          <div className="mt-8 flex flex-col gap-3">
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                disabled={outOfStock}
                className="flex-1 border py-4 text-[12px] tracked-tight transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-40"
                style={{ borderColor: era.textColor, color: era.textColor }}
              >
                {outOfStock ? "OUT OF STOCK" : "ADD TO CART"}
              </button>
              <button
                onClick={() => {
                  toggleWishlist(product.id);
                  toast(wished ? "Removed from wishlist" : "Added to wishlist", {
                    description: product.name,
                  });
                }}
                aria-label="Wishlist"
                className="flex items-center justify-center border px-5"
                style={{ borderColor: era.textColor }}
              >
                <Heart
                  className="h-5 w-5"
                  style={{
                    color: era.textColor,
                    fill: wished ? era.textColor : "transparent",
                  }}
                />
              </button>
            </div>
            <button
              onClick={handleBuyNow}
              disabled={outOfStock}
              className="w-full py-4 text-[12px] tracked-tight transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
              style={{ background: era.primaryColor, color: era.surfaceColor }}
            >
              BUY NOW
            </button>
          </div>
        </div>
      </div>

      <ReviewsSection product={product} era={era} />

      {/* COMPLETE YOUR ERA */}
      {completeTheLook.length > 0 && (
        <section className="px-6 py-24 md:px-10" style={{ background: era.surfaceColor }}>
          <div className="mx-auto max-w-7xl">
            <p className="text-[11px] tracked-tight opacity-70">COMPLETE THE LOOK</p>
            <h2 className="mt-2 font-display text-3xl md:text-4xl">
              Complete Your {shortEraName(era.name)} Look
            </h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {completeTheLook.slice(0, 4).map((p) => (
                <div key={p.id}>
                  <p className="mb-2 text-[10px] tracked-tight opacity-60 uppercase">
                    {p.id === matchingShirt?.id
                      ? "Matching T-Shirt"
                      : p.id === matchingCap?.id
                        ? "Matching Cap"
                        : "Related Piece"}
                  </p>
                  <ProductCard product={p} themed />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

/* ---------------- Size guide ---------------- */

function SizeGuideDialog({
  type,
  textColor,
}: {
  type: "shirt" | "cap";
  textColor: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="flex items-center gap-1.5 text-[11px] tracked-tight underline opacity-70 hover:opacity-100"
          style={{ color: textColor }}
        >
          <Ruler className="h-3 w-3" />
          Size Guide
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">
            {type === "shirt" ? "T-Shirt Size Guide" : "Cap Size Guide"}
          </DialogTitle>
        </DialogHeader>

        {type === "shirt" ? (
          <table className="mt-2 w-full text-left text-sm">
            <thead>
              <tr className="border-b text-[11px] tracked-tight uppercase opacity-60">
                <th className="py-2">Size</th>
                <th className="py-2">Chest (in)</th>
                <th className="py-2">Length (in)</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["XS", "36–38", "26"],
                ["S", "38–40", "27"],
                ["M", "40–42", "28"],
                ["L", "42–44", "29"],
                ["XL", "44–46", "30"],
                ["XXL", "46–48", "31"],
              ].map(([s, chest, length]) => (
                <tr key={s} className="border-b last:border-0">
                  <td className="py-2 font-medium">{s}</td>
                  <td className="py-2 opacity-80">{chest}</td>
                  <td className="py-2 opacity-80">{length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="mt-2 text-sm opacity-80">
            One size fits most — adjustable strap fits head circumferences
            from roughly 21&Prime; to 24&Prime; (54–61cm).
          </p>
        )}
        <p className="mt-4 text-[11px] opacity-50">
          Measurements are garment measurements, laid flat. For a looser,
          oversized fit, consider sizing up.
        </p>
      </DialogContent>
    </Dialog>
  );
}

/* ---------------- Silhouette imagery ---------------- */

function ProductSilhouette({
  type,
  color,
}: {
  type: "shirt" | "cap";
  color: string;
}) {
  if (type === "cap") {
    return (
      <svg viewBox="0 0 200 200" className="relative z-10 h-2/5 w-2/5" fill="none">
        <path
          d="M30 120 C 30 70, 80 40, 110 40 C 150 40, 180 70, 180 120 L 180 130 L 30 130 Z"
          fill={color}
          opacity="0.95"
        />
        <ellipse cx="105" cy="135" rx="80" ry="10" fill={color} opacity="0.65" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 200 220" className="relative z-10 h-2/3 w-2/3" fill="none">
      <path
        d="M50 30 L 80 25 C 85 45, 115 45, 120 25 L 150 30 L 180 65 L 160 80 L 160 200 L 40 200 L 40 80 L 20 65 Z"
        fill={color}
        opacity="0.95"
      />
    </svg>
  );
}