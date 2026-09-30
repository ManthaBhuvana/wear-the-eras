import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/shipping")({
  head: () => ({
    meta: [
      { title: "Shipping — Wear The Eras" },
      { name: "description", content: "Shipping times, rates and tracking for Wear The Eras orders." },
    ],
  }),
  component: ShippingPage,
});

const ROWS = [
  { region: "Standard (5–7 business days)", price: "Free over $100, otherwise $6" },
  { region: "Express (2–3 business days)", price: "$14" },
  { region: "International (7–14 business days)", price: "Calculated at checkout" },
];

function ShippingPage() {
  return (
    <div className="min-h-screen bg-black px-6 pt-32 pb-24 text-white md:px-10">
      <div className="mx-auto max-w-2xl">
        <p className="text-[11px] tracked-tight opacity-60">INFORMATION</p>
        <h1 className="mt-2 font-display text-5xl">Shipping</h1>

        <div className="mt-10 divide-y divide-white/10 border-y border-white/10">
          {ROWS.map((row) => (
            <div key={row.region} className="flex flex-col gap-1 py-4 sm:flex-row sm:justify-between">
              <span className="text-sm">{row.region}</span>
              <span className="text-sm opacity-70">{row.price}</span>
            </div>
          ))}
        </div>

        <div className="mt-10 space-y-4 text-sm leading-relaxed opacity-70">
          <p>
            Orders are processed within 1–2 business days. You'll receive a
            shipping confirmation email with tracking as soon as your order
            leaves our warehouse.
          </p>
          <p>
            Limited drops and pre-orders ship on the date listed on the product
            page — everything else ships same-week.
          </p>
          <p>
            Already placed an order? Head to{" "}
            <Link to="/order-tracking" className="text-white underline underline-offset-4">
              Order Tracking
            </Link>{" "}
            to check its status.
          </p>
        </div>
      </div>
    </div>
  );
}
