import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/returns")({
  head: () => ({
    meta: [
      { title: "Returns — Wear The Eras" },
      { name: "description", content: "Our returns and exchanges policy." },
    ],
  }),
  component: ReturnsPage,
});

const STEPS = [
  {
    title: "1. Start a return",
    body: "Email us at returns@wearttheeras.com with your order number within 30 days of delivery.",
  },
  {
    title: "2. Send it back",
    body: "Pack the item in its original condition with tags attached and ship it to the address we send you.",
  },
  {
    title: "3. Get refunded",
    body: "Once received and inspected, we'll refund your original payment method within 5–7 business days.",
  },
];

function ReturnsPage() {
  return (
    <div className="min-h-screen bg-black px-6 pt-32 pb-24 text-white md:px-10">
      <div className="mx-auto max-w-2xl">
        <p className="text-[11px] tracked-tight opacity-60">INFORMATION</p>
        <h1 className="mt-2 font-display text-5xl">Returns</h1>
        <p className="mt-4 text-sm leading-relaxed opacity-70">
          Not the right fit? Unworn, unwashed items in original condition can be
          returned within 30 days of delivery for a full refund or exchange.
        </p>

        <div className="mt-10 space-y-8">
          {STEPS.map((step) => (
            <div key={step.title}>
              <h2 className="font-display text-xl">{step.title}</h2>
              <p className="mt-2 text-sm leading-relaxed opacity-70">{step.body}</p>
            </div>
          ))}
        </div>

        <p className="mt-10 text-xs leading-relaxed opacity-50">
          Note: limited drops and final-sale items are not eligible for return.
          Look for the "Final Sale" tag on the product page.
        </p>

        <Link
          to="/contact"
          className="mt-10 inline-block bg-white px-7 py-4 text-[12px] tracked-tight text-black"
        >
          START A RETURN
        </Link>
      </div>
    </div>
  );
}
