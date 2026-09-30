import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Heart, Star, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import type { Product } from "@/data/products";
import { eraMap } from "@/data/eraConfig";
import { useStore } from "@/store/useStore";
import { LimitedBadge } from "@/components/LimitedBadge";

interface Props {
  product: Product;
  themed?: boolean; // use era CSS vars
}

export function ProductCard({ product, themed = false }: Props) {
  const era = eraMap[product.era];
  const wishlist = useStore((s) => s.wishlist);
  const toggleWishlist = useStore((s) => s.toggleWishlist);
  const addToCart = useStore((s) => s.addToCart);
  const [quickOpen, setQuickOpen] = useState(false);
  const [size, setSize] = useState(product.sizes[2] ?? product.sizes[0]);
  const wished = wishlist.includes(product.id);

  const accent = themed ? "var(--era-primary)" : era?.primaryColor;
  const glow = themed ? "var(--era-glow)" : era?.glowColor;

  const quickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    const defaultSize = product.sizes[2] ?? product.sizes[0];
    addToCart(product.id, defaultSize, 1);
    toast.success(`Added to cart — ${product.name} (${defaultSize})`);
  };

  return (
    <>
      <div className="group relative">
        <div className="absolute right-3 top-3 z-20 flex flex-col gap-2">
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(product.id);
            }}
            aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm transition-transform hover:scale-110"
          >
            <Heart
              className="h-4 w-4"
              style={{
                color: wished ? accent : "white",
                fill: wished ? accent : "transparent",
              }}
            />
          </button>
          <button
            onClick={quickAdd}
            aria-label="Quick add to cart"
            title="Quick add to cart"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-black/40 opacity-0 backdrop-blur-sm transition-all hover:scale-110 group-hover:opacity-100"
          >
            <ShoppingBag className="h-4 w-4 text-white" />
          </button>
        </div>

        {product.limited && <LimitedBadge className="absolute left-3 top-3 z-20" />}

        <Link to="/product/$id" params={{ id: product.id }} className="block overflow-hidden">
          <div
            className="relative aspect-4/5 w-full overflow-hidden"
            style={{ background: era?.cardGradient }}
          >
            <div className="noise-overlay" />
            {/* Stylised shirt/cap silhouette */}
            <ShirtSilhouette type={product.type} color={era?.accentColor ?? "#fff"} />

            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{ boxShadow: `inset 0 0 80px 10px ${glow}` }}
            />

            <button
              onClick={(e) => {
                e.preventDefault();
                setQuickOpen(true);
              }}
              className="absolute bottom-0 left-0 right-0 translate-y-full bg-white py-3 text-[11px] tracked-tight text-black transition-transform duration-300 group-hover:translate-y-0"
            >
              QUICK VIEW
            </button>
          </div>

          <div className="pt-4">
            <div className="flex items-center justify-between">
              <p className="font-body text-[15px] font-medium leading-tight">{product.name}</p>
              <span className="font-body text-[16px]">${product.price}</span>
            </div>
            <div className="mt-1.5 flex items-center justify-between">
              <RatingStars rating={product.rating} count={product.ratingCount} />
              <span className="text-[11px] tracked-tight opacity-60 uppercase">
                {product.type === "cap" ? "Cap" : "Shirt"}
              </span>
            </div>
            <p className="mt-1 text-[11px] opacity-60">{product.inventoryLine}</p>
          </div>
        </Link>
      </div>

      <AnimatePresence>
        {quickOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-130 flex items-center justify-center bg-black/70 p-4"
            onClick={() => setQuickOpen(false)}
            role="dialog"
            aria-label="Quick view"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid w-full max-w-3xl grid-cols-1 overflow-hidden border border-white/10 bg-[#0a0a0a] text-white md:grid-cols-2"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-4/5" style={{ background: era?.cardGradient }}>
                <div className="noise-overlay" />
                <ShirtSilhouette type={product.type} color={era?.accentColor ?? "#fff"} />
              </div>
              <div className="flex flex-col justify-between p-8">
                <div>
                  <span className="text-[10px] tracked-tight opacity-60 uppercase">
                    {product.collection}
                  </span>
                  <h3 className="mt-2 font-display text-3xl leading-tight">{product.name}</h3>
                  <div className="mt-3">
                    <RatingStars rating={product.rating} count={product.ratingCount} light />
                  </div>
                  <p className="mt-6 text-sm opacity-70">{product.description}</p>
                  <div className="mt-6">
                    <p className="text-[10px] tracked-tight opacity-70">SIZE</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {product.sizes.map((s) => (
                        <button
                          key={s}
                          onClick={() => setSize(s)}
                          className="border px-3 py-2 text-xs transition-colors"
                          style={{
                            borderColor: s === size ? accent : "rgba(255,255,255,0.2)",
                            background: s === size ? accent : "transparent",
                            color: s === size ? "#0a0a0a" : "white",
                          }}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-8 space-y-3">
                  <button
                    onClick={() => {
                      addToCart(product.id, size);
                      setQuickOpen(false);
                    }}
                    className="w-full bg-white py-4 text-[12px] tracked-tight text-black hover:bg-white/90"
                  >
                    ADD TO CART · ${product.price}
                  </button>
                  <button
                    onClick={() => setQuickOpen(false)}
                    className="block w-full text-center text-[11px] tracked-tight opacity-60 hover:opacity-100"
                  >
                    CLOSE
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function RatingStars({
  rating,
  count,
  light = false,
}: {
  rating: number;
  count?: number;
  light?: boolean;
}) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            className="h-3 w-3"
            style={{
              fill: i <= Math.round(rating) ? "#d97706" : "transparent",
              color:
                i <= Math.round(rating)
                  ? "#d97706"
                  : light
                    ? "rgba(255,255,255,0.3)"
                    : "rgba(23,23,23,0.25)",
            }}
          />
        ))}
      </div>
      <span className="text-[11px] opacity-60">
        {rating.toFixed(1)}
        {count ? ` (${count})` : ""}
      </span>
    </div>
  );
}

export function ShirtSilhouette({ type, color }: { type: "shirt" | "cap"; color: string }) {
  if (type === "cap") {
    return (
      <svg
        viewBox="0 0 200 200"
        className="absolute inset-0 m-auto h-3/5 w-3/5 opacity-90"
        fill="none"
      >
        <path
          d="M30 120 C 30 70, 80 40, 110 40 C 150 40, 180 70, 180 120 L 180 130 L 30 130 Z"
          fill={color}
          opacity="0.92"
        />
        <ellipse cx="105" cy="135" rx="80" ry="10" fill={color} opacity="0.6" />
        <circle cx="110" cy="85" r="3" fill="#0a0a0a" opacity="0.5" />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 200 220"
      className="absolute inset-0 m-auto h-4/5 w-4/5 opacity-90"
      fill="none"
    >
      <path
        d="M50 30 L 80 25 C 85 45, 115 45, 120 25 L 150 30 L 180 65 L 160 80 L 160 200 L 40 200 L 40 80 L 20 65 Z"
        fill={color}
        opacity="0.92"
      />
    </svg>
  );
}