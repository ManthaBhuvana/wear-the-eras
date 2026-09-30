import {
  createFileRoute,
  Link,
  useNavigate,
} from "@tanstack/react-router";
import { useEffect } from "react";
import { useStore } from "@/store/useStore";
import { motion } from "framer-motion";

export const Route = createFileRoute("/order-confirmed")({
  head: () => ({ meta: [{ title: "Order Confirmed — Wear The Eras" }] }),
  component: OrderConfirmed,
});

function OrderConfirmed() {
  const navigate = useNavigate();

const orderPlaced = useStore((s) => s.orderPlaced);

const setOrderPlaced = useStore((s) => s.setOrderPlaced);

const setStartedCheckout = useStore(
  (s) => s.setStartedCheckout,
);

useEffect(() => {
  if (!orderPlaced) {
    navigate({ to: "/" });
  }
}, [orderPlaced, navigate]);
  const orderId = `WRD-${Math.floor(10000 + Math.random() * 89999)}`;
  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-6 pt-24 pb-24 text-white">
      <div className="max-w-xl text-center">
        <motion.svg
          viewBox="0 0 100 100"
          className="mx-auto h-20 w-20"
          initial="hidden"
          animate="visible"
        >
          <motion.circle
            cx="50" cy="50" r="44" fill="none" stroke="#fbbf24" strokeWidth="2"
            variants={{ hidden: { pathLength: 0 }, visible: { pathLength: 1 } }}
            transition={{ duration: 1 }}
          />
          <motion.path
            d="M30 52 L 45 67 L 72 38" fill="none" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round"
            variants={{ hidden: { pathLength: 0 }, visible: { pathLength: 1 } }}
            transition={{ duration: 0.8, delay: 0.6 }}
          />
        </motion.svg>
        <h1 className="mt-8 font-display text-5xl">Order confirmed.</h1>
        <p className="mt-4 opacity-70">
          Thanks for your purchase. We&apos;ve sent a receipt to your email.
        </p>
        <p className="mt-8 text-[12px] tracked-tight opacity-80">Order #{orderId}</p>
        <p className="mt-1 text-[12px] tracked-tight opacity-60">
          ESTIMATED DELIVERY: 5–7 BUSINESS DAYS
        </p>
        <Link
  to="/"
  onClick={() => {
    setOrderPlaced(false);
    setStartedCheckout(false);
  }}
  className="mt-10 inline-block bg-white px-7 py-4 text-[12px] tracked-tight text-black"
></Link>
      </div>
    </div>
  );
}
