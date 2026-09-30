import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — Wear The Eras" },
      { name: "description", content: "The terms that govern use of the Wear The Eras store." },
    ],
  }),
  component: TermsPage,
});

const SECTIONS = [
  {
    title: "Orders & Payment",
    body: "All orders are subject to availability and confirmation of payment. Prices are listed in USD and may change without notice, though confirmed orders are honored at the price paid.",
  },
  {
    title: "Limited Drops",
    body: "Limited-run items are sold while supplies last and may not be restocked. Purchase limits may apply per customer to keep drops fair.",
  },
  {
    title: "Shipping & Risk",
    body: "Risk of loss passes to you upon delivery to the shipping carrier. See our Shipping page for estimated timelines.",
  },
  {
    title: "Returns",
    body: "Returns are accepted per our Returns policy. Final-sale and limited-drop items are excluded unless stated otherwise.",
  },
  {
    title: "Intellectual Property",
    body: "All designs, graphics and site content are the property of Wear The Eras and may not be reproduced without permission.",
  },
  {
    title: "Limitation of Liability",
    body: "Wear The Eras is not liable for indirect or incidental damages arising from use of this site or its products, to the extent permitted by law.",
  },
];

function TermsPage() {
  return (
    <div className="min-h-screen bg-black px-6 pt-32 pb-24 text-white md:px-10">
      <div className="mx-auto max-w-2xl">
        <p className="text-[11px] tracked-tight opacity-60">LEGAL</p>
        <h1 className="mt-2 font-display text-5xl">Terms &amp; Conditions</h1>
        <p className="mt-4 text-xs opacity-50">Last updated: January 2026</p>

        <div className="mt-10 space-y-8">
          {SECTIONS.map((s) => (
            <div key={s.title}>
              <h2 className="font-display text-xl">{s.title}</h2>
              <p className="mt-2 text-sm leading-relaxed opacity-70">{s.body}</p>
            </div>
          ))}
        </div>

        <p className="mt-10 text-sm leading-relaxed opacity-70">
          By using this site, you agree to these terms. Questions? Contact us at
          hello@wearttheeras.com.
        </p>
      </div>
    </div>
  );
}
