import { createFileRoute } from "@tanstack/react-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Wear The Eras" },
      { name: "description", content: "Answers to common questions about orders, sizing and shipping." },
    ],
  }),
  component: FaqPage,
});

const FAQS = [
  {
    q: "How long does shipping take?",
    a: "Standard shipping takes 5–7 business days, express is 2–3 business days. Limited drops ship on the date shown on the product page.",
  },
  {
    q: "What's your return policy?",
    a: "Unworn items in original condition can be returned within 30 days of delivery. See our Returns page for the full process.",
  },
  {
    q: "How do I know what size to order?",
    a: "Check our Size Guide for a full chest and length chart. Our tees run true to size with a relaxed fit.",
  },
  {
    q: "Do you restock sold-out items?",
    a: "Some pieces are restocked, others are one-time limited drops. Join the waitlist on a sold-out product page to be notified.",
  },
  {
    q: "Do you ship internationally?",
    a: "Yes — international shipping rates and timelines are calculated at checkout based on your address.",
  },
  {
    q: "How can I track my order?",
    a: "Use the Order Tracking page with your order number and email, or the tracking link in your shipping confirmation email.",
  },
];

function FaqPage() {
  return (
    <div className="min-h-screen bg-black px-6 pt-32 pb-24 text-white md:px-10">
      <div className="mx-auto max-w-2xl">
        <p className="text-[11px] tracked-tight opacity-60">INFORMATION</p>
        <h1 className="mt-2 font-display text-5xl">FAQ</h1>

        <Accordion type="single" collapsible className="mt-10">
          {FAQS.map((item, i) => (
            <AccordionItem key={item.q} value={`item-${i}`} className="border-white/10">
              <AccordionTrigger className="text-left text-sm">{item.q}</AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed opacity-70">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
