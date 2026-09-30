import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Heart, Menu, Search, ShoppingBag, User } from "lucide-react";
import { useStore } from "@/store/useStore";
import { SearchOverlay } from "@/components/SearchOverlay";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/eras", label: "Eras" },
  { to: "/quiz", label: "Quiz" },
  { to: "/new", label: "New" },
  { to: "/", hash: "memes", label: "Memes" },
] as const;

export function Navbar() {
  const cart = useStore((s) => s.cart);
  const wishlist = useStore((s) => s.wishlist);
  const setCartOpen = useStore((s) => s.setCartOpen);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((s) => !s);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const cartCount = cart.reduce((n, l) => n + l.qty, 0);

  return (
    <>
      <header
        className="fixed left-0 right-0 top-0 z-50"
        style={{
          backgroundColor: "var(--era-navbar, rgba(4,4,4,0.85))",
          color: "var(--era-text, #ffffff)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid color-mix(in srgb, var(--era-text, #ffffff) 12%, transparent)",
        }}
      >
        <nav
          className="mx-auto flex items-center justify-between px-6 py-4 md:px-10"
          style={{ height: 72 }}
        >
          <div className="flex items-center gap-4">
            <button
              aria-label="Open menu"
              className="md:hidden"
              onClick={() => setMenuOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>
            <Link to="/" className="font-display text-lg md:text-xl">
              <span style={{ letterSpacing: "0.25em" }}>WEAR THE ERAS</span>
            </Link>
          </div>

          <div className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                hash={"hash" in l ? l.hash : undefined}
                className="text-[12px] tracked-tight"
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-5">
            <button aria-label="Search" onClick={() => setSearchOpen(true)}>
              <Search className="h-4 w-4" />
            </button>
            <Link to="/wishlist" aria-label="Wishlist" className="relative">
              <Heart className="h-4 w-4" />
              {wishlist.length > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-white px-1 text-[9px] font-medium text-black">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <button
              aria-label="Cart"
              onClick={() => setCartOpen(true)}
              className="relative"
            >
              <ShoppingBag className="h-4 w-4" />
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-white px-1 text-[9px] font-medium text-black">
                  {cartCount}
                </span>
              )}
            </button>
            <Link to="/login" aria-label="Login" className="hidden md:block">
              <User className="h-4 w-4" />
            </Link>
          </div>
        </nav>
      </header>

      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent side="left" className="flex w-4/5 flex-col bg-black text-white sm:max-w-xs">
          <SheetHeader>
            <SheetTitle className="font-display text-lg tracking-[0.2em] text-white">
              WEAR THE ERAS
            </SheetTitle>
          </SheetHeader>
          <nav className="mt-8 flex flex-col gap-6">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                hash={"hash" in l ? l.hash : undefined}
                onClick={() => setMenuOpen(false)}
                className="text-lg tracked-tight"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto flex flex-col gap-4 border-t border-white/10 pt-6">
            <Link
              to="/wishlist"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 text-sm tracked-tight opacity-80"
            >
              <Heart className="h-4 w-4" /> Wishlist
            </Link>
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 text-sm tracked-tight opacity-80"
            >
              <User className="h-4 w-4" /> Account
            </Link>
          </div>
        </SheetContent>
      </Sheet>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}