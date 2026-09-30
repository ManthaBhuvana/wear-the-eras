import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Wear The Eras" },
      { name: "description", content: "How Wear The Eras collects, uses and protects your data." },
    ],
  }),
  component: PrivacyPage,
});

const SECTIONS = [
  {
    title: "Information We Collect",
    body: "When you shop with us, we collect the information you provide directly — name, email, shipping address and payment details — along with basic usage data like pages visited and items viewed, used to improve the shopping experience.",
  },
  {
    title: "How We Use Your Information",
    body: "We use your information to process orders, provide customer support, send order updates, and — with your consent — send occasional marketing emails about new drops. You can unsubscribe from marketing emails at any time.",
  },
  {
    title: "Sharing Your Information",
    body: "We share information only with the service providers required to run our store — payment processors, shipping carriers and email tools — and never sell your personal data to third parties.",
  },
  {
    title: "Cookies",
    body: "We use cookies to keep your cart and wishlist in sync and to understand how visitors use our site. You can disable cookies in your browser settings, though some features may not work as expected.",
  },
  {
    title: "Your Rights",
    body: "You can request a copy of the data we hold about you, ask us to correct it, or request deletion of your account at any time by contacting us.",
  },
];

function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black px-6 pt-32 pb-24 text-white md:px-10">
      <div className="mx-auto max-w-2xl">
        <p className="text-[11px] tracked-tight opacity-60">LEGAL</p>
        <h1 className="mt-2 font-display text-5xl">Privacy Policy</h1>
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
          Questions about this policy? Reach out at hello@wearttheeras.com.
        </p>
      </div>
    </div>
  );
}
