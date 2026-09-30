import { createFileRoute, Link } from "@tanstack/react-router";
import { useStore } from "@/store/useStore";
import { productMap } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/wishlist")({
  head: () => ({ meta: [{ title: "Wishlist — Wear The Eras" }] }),
  component: WishlistPage,
});

function WishlistPage() {
  const wishlist = useStore((s) => s.wishlist);
  const items = wishlist.map((id) => productMap[id]).filter(Boolean);

  return (
    <div className="min-h-screen bg-black px-6 pt-32 pb-24 text-white md:px-10">
      <div className="mx-auto max-w-7xl">
        <p className="text-[11px] tracked-tight opacity-60">SAVED</p>
        <h1 className="mt-2 font-display text-5xl">Your Wishlist</h1>

        {items.length === 0 ? (
          <div className="mt-24 text-center">
            <p className="text-2xl opacity-70">Nothing saved yet.</p>
            <Link to="/" className="mt-8 inline-block bg-white px-7 py-4 text-[12px] tracked-tight text-black">
              CONTINUE SHOPPING
            </Link>
          </div>
        ) : (
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {items.map((p) => p && <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </div>
  );
}
