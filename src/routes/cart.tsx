import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useStore } from "@/store/useStore";
import { productMap } from "@/data/products";
import { eraMap } from "@/data/eraConfig";
import { ShirtSilhouette } from "@/components/ProductCard";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Your Cart — Wear The Eras" }] }),
  component: CartPage,
});

function CartPage() {
  const navigate = useNavigate();

  const cart = useStore((s) => s.cart);
  const updateQty = useStore((s) => s.updateQty);
  const removeFromCart = useStore((s) => s.removeFromCart);
  const setStartedCheckout = useStore((s) => s.setStartedCheckout);

  const subtotal = cart.reduce((sum, l) => {
    const p = productMap[l.productId];
    return sum + (p?.price ?? 0) * l.qty;
  }, 0);
  const shipping = subtotal === 0 || subtotal > 100 ? 0 : 8;
  const total = subtotal + shipping;
  const itemCount = cart.reduce((n, l) => n + l.qty, 0);

  return (
    <div className="min-h-screen bg-charcoal px-6 pt-32 pb-24 text-ivory md:px-10">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[11px] tracked-tight text-rose">YOUR BAG</p>
            <h1 className="mt-2 font-display text-4xl md:text-5xl">Shopping Cart</h1>
          </div>
          {cart.length > 0 && (
            <Link
              to="/shop"
              className="group hidden items-center gap-2 text-[11px] tracked-tight text-ivory/60 transition-colors hover:text-ivory sm:flex"
            >
              <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
              CONTINUE SHOPPING
            </Link>
          )}
        </div>

        {cart.length === 0 ? (
          /* ---------------- Empty state ---------------- */
          <div className="mt-24 flex flex-col items-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-ivory/15">
              <ShoppingBag className="h-6 w-6 text-ivory/50" strokeWidth={1.5} />
            </div>
            <p className="mt-8 font-display text-2xl text-ivory/80">Your cart is empty.</p>
            <Link
              to="/eras"
              className="mt-8 inline-block bg-ivory px-8 py-4 text-[12px] tracked-tight text-charcoal transition-colors hover:bg-burgundy hover:text-ivory"
            >
              EXPLORE THE ERAS
            </Link>
          </div>
        ) : (
          /* ---------------- Cart contents ---------------- */
          <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_380px]">
            <ul className="space-y-6">
              {cart.map((line) => {
                const p = productMap[line.productId];
                if (!p) return null;
                const era = eraMap[p.era];

                return (
                  <li
                    key={`${line.productId}-${line.size}`}
                    className="flex gap-5 border-b border-ivory/10 pb-6 sm:gap-6"
                  >
                    {/* Product image */}
                    <Link
                      to="/product/$id"
                      params={{ id: p.id }}
                      className="relative h-32 w-24 shrink-0 overflow-hidden sm:h-36 sm:w-28"
                      style={{ background: era?.cardGradient ?? "#2a2a2a" }}
                    >
                      <div className="noise-overlay" />
                      <ShirtSilhouette type={p.type} color={era?.accentColor ?? "#fff"} />
                    </Link>

                    <div className="flex flex-1 flex-col justify-between">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <Link
                            to="/product/$id"
                            params={{ id: p.id }}
                            className="font-display text-lg leading-tight sm:text-xl"
                          >
                            {p.name}
                          </Link>
                          <p className="mt-1.5 text-[11px] tracked-tight text-ivory/50">
                            SIZE {line.size}
                          </p>
                        </div>

                        {/* Price */}
                        <span className="shrink-0 text-[15px] text-ivory/90 sm:text-base">
                          ${p.price}
                        </span>
                      </div>

                      <div className="flex items-end justify-between gap-4">
                        {/* Quantity */}
                        <div>
                          <div className="flex items-center gap-3 border border-ivory/15 px-3 py-2">
                            <button
                              onClick={() => updateQty(p.id, line.size, line.qty - 1)}
                              aria-label="Decrease quantity"
                              className="text-ivory/70 transition-colors hover:text-ivory"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-5 text-center text-sm">{line.qty}</span>
                            <button
                              onClick={() => updateQty(p.id, line.size, line.qty + 1)}
                              aria-label="Increase quantity"
                              disabled={line.qty >= p.stock}
                              className="text-ivory/70 transition-colors hover:text-ivory disabled:opacity-30"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          {line.qty >= p.stock && (
                            <p className="mt-1.5 text-[10px] tracked-tight text-amber-400">
                              Max stock reached
                            </p>
                          )}
                        </div>

                        {/* Line subtotal + remove */}
                        <div className="flex items-center gap-5">
                          <span className="font-display text-lg sm:text-xl">
                            ${p.price * line.qty}
                          </span>
                          <button
                            onClick={() => removeFromCart(p.id, line.size)}
                            aria-label="Remove from cart"
                            title="Remove"
                            className="text-ivory/50 transition-colors hover:text-burgundy"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            {/* ---------------- Summary ---------------- */}
            <aside className="h-fit border border-ivory/10 p-8">
              <p className="text-[11px] tracked-tight text-ivory/50">ORDER SUMMARY</p>

              <div className="mt-6 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-ivory/60">
                    Subtotal · {itemCount} {itemCount === 1 ? "item" : "items"}
                  </span>
                  <span>${subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ivory/60">
                    Shipping {subtotal > 100 && "(free over $100)"}
                  </span>
                  <span>{shipping === 0 ? "FREE" : `$${shipping}`}</span>
                </div>
              </div>

              <div className="mt-6 flex items-baseline justify-between border-t border-ivory/10 pt-5">
                <span className="tracked-tight text-[11px] text-ivory/70">TOTAL</span>
                <span className="font-display text-3xl">${total}</span>
              </div>

              <button
                onClick={() => {
                  setStartedCheckout(true);
                  navigate({ to: "/checkout" });
                }}
                className="mt-6 w-full bg-ivory py-4 text-[12px] tracked-tight text-charcoal transition-colors hover:bg-burgundy hover:text-ivory"
              >
                PROCEED TO CHECKOUT
              </button>

              <Link
                to="/shop"
                className="mt-4 block text-center text-[11px] tracked-tight text-ivory/50 transition-colors hover:text-ivory"
              >
                CONTINUE SHOPPING
              </Link>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
