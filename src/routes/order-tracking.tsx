import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/order-tracking")({
  head: () => ({
    meta: [
      { title: "Order Tracking — Wear The Eras" },
      { name: "description", content: "Track the status of your Wear The Eras order." },
    ],
  }),
  component: OrderTrackingPage,
});

function OrderTrackingPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-black px-6 pt-32 pb-24 text-white md:px-10">
      <div className="mx-auto max-w-xl">
        <p className="text-[11px] tracked-tight opacity-60">SUPPORT</p>
        <h1 className="mt-2 font-display text-5xl">Order Tracking</h1>
        <p className="mt-4 text-sm leading-relaxed opacity-70">
          Enter your order number and the email you used at checkout — you'll
          also find both in your order confirmation email.
        </p>

        <form onSubmit={handleSubmit} className="mt-10 space-y-5">
          <div>
            <label htmlFor="order" className="text-[11px] tracked-tight opacity-60">
              Order Number
            </label>
            <input
              id="order"
              required
              placeholder="e.g. WTE-10234"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              className="mt-2 w-full border-b border-white/20 bg-transparent py-2 text-sm outline-none placeholder:opacity-40 focus:border-white"
            />
          </div>
          <div>
            <label htmlFor="track-email" className="text-[11px] tracked-tight opacity-60">
              Email
            </label>
            <input
              id="track-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full border-b border-white/20 bg-transparent py-2 text-sm outline-none focus:border-white"
            />
          </div>
          <button
            type="submit"
            className="bg-white px-7 py-4 text-[12px] tracked-tight text-black"
          >
            TRACK ORDER
          </button>
        </form>

        {submitted && (
          <div className="mt-10 border border-white/10 p-6 text-sm">
            <p className="text-[11px] tracked-tight opacity-60">STATUS</p>
            <p className="mt-2">
              We couldn't find a live match for order{" "}
              <span className="text-white">{orderNumber || "—"}</span> yet — our
              tracking system connects to your shipping carrier once your order
              ships. Check back soon, or reach out on the{" "}
              <Link to="/contact" className="underline underline-offset-4">
                Contact
              </Link>{" "}
              page if it's been more than 2 business days since you ordered.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
