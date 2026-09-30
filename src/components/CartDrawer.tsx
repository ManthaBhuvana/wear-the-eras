import { AnimatePresence, motion } from "framer-motion";
import { X, Minus, Plus } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useStore } from "@/store/useStore";
import { productMap } from "@/data/products";

export function CartDrawer() {
  const open = useStore((s) => s.cartOpen);
  const setOpen = useStore((s) => s.setCartOpen);
  const cart = useStore((s) => s.cart);
  const updateQty = useStore((s) => s.updateQty);
  const removeFromCart = useStore((s) => s.removeFromCart);

  const subtotal = cart.reduce((sum, line) => {
    const p = productMap[line.productId];
    return sum + (p?.price ?? 0) * line.qty;
  }, 0);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-110 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <motion.aside
            role="dialog"
            aria-label="Shopping cart"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: [0.7, 0, 0.3, 1] }}
            className="fixed right-0 top-0 z-120 flex h-full w-full max-w-md flex-col border-l border-white/10 bg-black/95 text-white backdrop-blur-xl"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
              <span className="tracked-tight text-[11px]">YOUR CART</span>
              <button onClick={() => setOpen(false)} aria-label="Close cart">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5">
              {cart.length === 0 && (
                <div className="py-20 text-center">
                  <p className="font-display text-2xl">Your cart is empty.</p>
                  <p className="mt-3 text-sm opacity-70">
                    Add something you love.
                  </p>
                </div>
              )}
              <ul className="space-y-6">
                {cart.map((line) => {
                  const p = productMap[line.productId];
                  if (!p) return null;
                  return (
                    <li
                      key={`${line.productId}-${line.size}`}
                      className="flex gap-4 border-b border-white/5 pb-6"
                    >
                      <div
                        className="h-32 w-28 shrink-0 bg-linear-to-br from-zinc-700 to-zinc-950"
                      />
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <p className="font-display text-base leading-tight">
                            {p.name}
                          </p>
                          <p className="mt-1 text-[11px] tracked-tight opacity-60">
                            Size {line.size}
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 border border-white/15 px-2 py-1">
                            <button
                              onClick={() =>
                                updateQty(p.id, line.size, line.qty - 1)
                              }
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-5 text-center text-xs">
                              {line.qty}
                            </span>
                            <button
                              onClick={() =>
                                updateQty(p.id, line.size, line.qty + 1)
                              }
                              aria-label="Increase quantity"
                              disabled={line.qty >= p.stock}
                              className="disabled:opacity-30"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-sm">
                              ${p.price * line.qty}
                            </span>
                            <button
                              onClick={() => removeFromCart(p.id, line.size)}
                              className="text-[10px] tracked-tight opacity-60 hover:opacity-100"
                            >
                              REMOVE
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="border-t border-white/10 px-6 py-5">
              <div className="flex items-baseline justify-between">
                <span className="tracked-tight text-[11px] opacity-70">
                  SUBTOTAL
                </span>
                <span className="font-display text-2xl">${subtotal}</span>
              </div>
              <Link
                to="/checkout"
                onClick={() => setOpen(false)}
                className="mt-5 block w-full bg-white py-4 text-center text-[12px] tracked-tight text-black transition-colors hover:bg-white/90"
              >
                PROCEED TO CHECKOUT
              </Link>
              <p className="mt-4 text-center text-[11px] opacity-50">
                Free shipping on orders over $100. Taxes calculated at checkout.
              </p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
