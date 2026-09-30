import { create } from "zustand";
import { persist } from "zustand/middleware";
import { productMap } from "@/data/products";

export interface CartLine {
  productId: string;
  size: string;
  qty: number;
}

interface StoreState {
  cart: CartLine[];
  wishlist: string[];
  cartOpen: boolean;
  currentEra: string |null;

  // Route protection flags
  hasVisitedCart: boolean;
  hasStartedCheckout: boolean;
  orderPlaced: boolean;
  isLoggedIn: boolean;

  addToCart: (productId: string, size: string, qty?: number) => void;
  removeFromCart: (productId: string, size: string) => void;
  updateQty: (productId: string, size: string, qty: number) => void;
  toggleWishlist: (productId: string) => void;

  setCartOpen: (open: boolean) => void;
  setCurrentEra: (slug: string | null) => void;
  clearCart: () => void;

  // Route protection setters
  setVisitedCart: (visited: boolean) => void;
  setStartedCheckout: (started: boolean) => void;
  setOrderPlaced: (placed: boolean) => void;

  login: () => void;
  logout: () => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      cart: [],
      wishlist: [],
      cartOpen: false,
      currentEra: null,

      // Route protection state
      hasVisitedCart: false,
      hasStartedCheckout: false,
      orderPlaced: false,
      isLoggedIn: false,

      addToCart: (productId, size, qty = 1) =>
        set((s) => {
          const stock = productMap[productId]?.stock ?? Infinity;
          const existing = s.cart.find(
            (c) => c.productId === productId && c.size === size,
          );

          if (existing) {
            return {
              cart: s.cart.map((c) =>
                c === existing
                  ? { ...c, qty: Math.min(stock, c.qty + qty) }
                  : c,
              ),
              cartOpen: true,
            };
          }

          return {
            cart: [...s.cart, { productId, size, qty: Math.min(stock, qty) }],
            cartOpen: true,
          };
        }),

      removeFromCart: (productId, size) =>
        set((s) => ({
          cart: s.cart.filter(
            (c) => !(c.productId === productId && c.size === size),
          ),
        })),

      updateQty: (productId, size, qty) =>
        set((s) => {
          const stock = productMap[productId]?.stock ?? Infinity;
          return {
            cart: s.cart
              .map((c) =>
                c.productId === productId && c.size === size
                  ? { ...c, qty: Math.min(stock, qty) }
                  : c,
              )
              .filter((c) => c.qty > 0),
          };
        }),

      toggleWishlist: (productId) =>
        set((s) => ({
          wishlist: s.wishlist.includes(productId)
            ? s.wishlist.filter((id) => id !== productId)
            : [...s.wishlist, productId],
        })),

      setCartOpen: (cartOpen) => set({ cartOpen }),

      setCurrentEra: (currentEra) => set({ currentEra }),

      clearCart: () =>
        set({
          cart: [],
        }),

      // Route protection setters
      setVisitedCart: (visited) =>
        set({
          hasVisitedCart: visited,
        }),

      setStartedCheckout: (started) =>
        set({
          hasStartedCheckout: started,
        }),

      setOrderPlaced: (placed) =>
        set({
          orderPlaced: placed,
        }),

      login: () =>
        set({
          isLoggedIn: true,
        }),

      logout: () =>
        set({
          isLoggedIn: false,
        }),
    }),
    {
      name: "wte-store",

      partialize: (s) => ({
  cart: s.cart,
  wishlist: s.wishlist,
  isLoggedIn: s.isLoggedIn,
}),
    },
  ),
);