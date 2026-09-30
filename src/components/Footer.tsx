import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black px-6 py-16 text-white/80 md:px-10">
      <div className="mx-auto grid max-w-7xl gap-12 sm:grid-cols-2 lg:grid-cols-5">
        <div className="sm:col-span-2 lg:col-span-1">
          <Link to="/" className="font-display text-2xl tracking-[0.25em]">
            WEAR THE ERAS
          </Link>
          <p className="mt-4 font-script text-lg italic opacity-70">
            Every Era Has a Look.
          </p>
          <p className="mt-6 text-xs leading-relaxed opacity-50">
            Heavyweight cotton. Small-batch garment-dyed. Free shipping on orders over $100.
          </p>
        </div>

        <div>
          <p className="mb-4 text-[11px] tracked-tight opacity-60">Shop</p>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/shop" className="transition-colors hover:text-white">
                All Products
              </Link>
            </li>
            <li>
              <Link to="/new" className="transition-colors hover:text-white">
                New Arrivals
              </Link>
            </li>
            <li>
              <Link
                to="/shop"
                search={{ category: "bestsellers" }}
                className="transition-colors hover:text-white"
              >
                Best Sellers
              </Link>
            </li>
            <li>
              <Link to="/eras" className="transition-colors hover:text-white">
                Era Archive
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="mb-4 text-[11px] tracked-tight opacity-60">Information</p>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/size-guide" className="transition-colors hover:text-white">
                Size Guide
              </Link>
            </li>
            <li>
              <Link to="/shipping" className="transition-colors hover:text-white">
                Shipping
              </Link>
            </li>
            <li>
              <Link to="/returns" className="transition-colors hover:text-white">
                Returns
              </Link>
            </li>
            <li>
              <Link to="/faq" className="transition-colors hover:text-white">
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="mb-4 text-[11px] tracked-tight opacity-60">Support</p>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/contact" className="transition-colors hover:text-white">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/order-tracking" className="transition-colors hover:text-white">
                Order Tracking
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="mb-4 text-[11px] tracked-tight opacity-60">Social</p>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="transition-colors hover:text-white"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Pinterest"
                className="transition-colors hover:text-white"
              >
                Pinterest
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-16 flex max-w-7xl flex-col items-center gap-4 border-t border-white/10 pt-6 text-[11px] opacity-50 md:flex-row md:justify-between">
        <p>© 2025 Wear The Eras. All rights reserved.</p>
        <div className="flex gap-6">
          <Link to="/privacy" className="hover:text-white hover:opacity-100">
            Privacy Policy
          </Link>
          <Link to="/terms" className="hover:text-white hover:opacity-100">
            Terms &amp; Conditions
          </Link>
        </div>
      </div>
    </footer>
  );
}
