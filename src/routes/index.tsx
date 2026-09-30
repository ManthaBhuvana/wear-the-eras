import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { bestSellers, featuredProducts, latestDrop } from "@/data/products";
import { eras } from "@/data/eraConfig";
import { ProductCard } from "@/components/ProductCard";
import { EraCard } from "@/components/EraCard";
import { MemeSection } from "@/components/MemeSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Wear The Eras — Every Era Has a Look" },
      {
        name: "description",
        content:
          "Wear The Eras — fashion-forward merch, era by era. Shirts and caps for every mood.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <Hero />
      <BrandIntro />
      <NewArrivals />
      <BestSellers />
      <ShopByEra />
      <FeaturedProduct />
      <EraQuiz />
      <MemeSection />
      <Newsletter />
      <SocialLinks />
    </>
  );
}

/* ---------------- Hero ---------------- */

function Hero() {
  return (
    <section className="bg-background text-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 pb-14 pt-32 md:grid-cols-2 md:items-center md:gap-12 md:px-10 md:pb-24 md:pt-44">
        <div>
          <p className="text-[11px] tracked-tight text-muted-foreground uppercase">
            Wear The Eras
          </p>
          <h1 className="mt-4 font-display text-[44px] leading-[1.05] md:text-[76px]">
            Every Era
            <br />
            Has a Look.
          </h1>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-muted-foreground md:text-[16px]">
            Limited-run shirts and caps built around distinct eras — each with
            its own colours, mood and story. Find the one that&apos;s yours.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              to="/shop"
              className="bg-primary px-7 py-4 text-[12px] font-medium tracked-tight text-primary-foreground transition-opacity hover:opacity-90"
            >
              SHOP NOW
            </Link>
            <Link
              to="/quiz"
              className="border border-charcoal/30 px-7 py-4 text-[12px] tracked-tight text-foreground transition-colors hover:border-charcoal hover:bg-charcoal hover:text-ivory"
            >
              FIND YOUR ERA
            </Link>
          </div>
        </div>

        {/* Editorial image panel — swap this gradient block for real product/editorial photography */}
        <div className="relative aspect-4/5 w-full overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(160deg, var(--wte-taupe) 0%, var(--wte-rose) 55%, var(--wte-burgundy) 100%)",
            }}
          />
          <div className="noise-overlay" />
          <div className="absolute inset-x-6 bottom-6 md:inset-x-10 md:bottom-10">
            <p className="font-script text-2xl text-ivory md:text-3xl">
              &ldquo;Every era, worn.&rdquo;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Brand Intro ---------------- */

function BrandIntro() {
  return (
    <section className="bg-card px-6 py-20 text-center md:px-10 md:py-28">
      <div className="mx-auto max-w-2xl">
        <p className="text-[11px] tracked-tight text-muted-foreground uppercase">
          The Brand
        </p>
        {/* Placeholder brand copy — final wording TBD */}
        <p className="mt-5 font-script text-2xl leading-relaxed text-foreground md:text-3xl">
          Wear The Eras is merch for people who live in moods — the golden
          ones, the quiet ones, the 3am ones. Minimal, fashion-forward pieces
          designed around distinct eras, so however you&apos;re feeling,
          there&apos;s a look for it.
        </p>
      </div>
    </section>
  );
}

/* ---------------- New Arrivals ---------------- */

function NewArrivals() {
  const products = latestDrop().filter(Boolean);
  return (
    <section id="shop" className="bg-background px-6 py-20 text-foreground md:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="NEW ARRIVALS" title="Just Dropped" to="/new" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Best Sellers ---------------- */

function BestSellers() {
  const products = bestSellers().filter(Boolean);
  return (
    <section className="bg-card px-6 py-20 text-foreground md:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="BEST SELLERS" title="Fan Favourites" to="/shop" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Shop by Era ---------------- */

function ShopByEra() {
  const featured = eras.slice(0, 8);
  return (
    <section className="bg-background px-6 py-20 text-foreground md:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="SHOP BY ERA"
          title="Find Your Collection"
          to="/eras"
          linkLabel="VIEW ALL ERAS →"
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((era) => (
            <EraCard key={era.slug} era={era} size="wide" />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Featured Product ---------------- */

function FeaturedProduct() {
  const [product] = featuredProducts();
  if (!product) return null;

  return (
    <section className="bg-card px-6 py-20 text-foreground md:px-10">
      <div className="mx-auto max-w-7xl">
        <p className="text-[11px] tracked-tight text-muted-foreground uppercase">
          FEATURED PRODUCT
        </p>
        <div className="mt-8 grid gap-10 md:grid-cols-2 md:items-center">
          <div className="max-w-sm">
            <ProductCard product={product} />
          </div>
          <div>
            <span className="text-[11px] tracked-tight text-muted-foreground uppercase">
              {product.collection}
            </span>
            <h2 className="mt-2 font-display text-4xl leading-tight md:text-5xl">
              {product.name}
            </h2>
            <p className="mt-5 max-w-md text-[15px] text-muted-foreground">
              {product.description}
            </p>
            <Link
              to="/product/$id"
              params={{ id: product.id }}
              className="mt-8 inline-block bg-primary px-7 py-4 text-[12px] tracked-tight text-primary-foreground transition-opacity hover:opacity-90"
            >
              SHOP THIS PIECE — ${product.price}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Era Quiz CTA ---------------- */

function EraQuiz() {
  return (
    <section className="relative bg-charcoal px-6 py-24 text-center text-ivory md:px-10">
      <div className="mx-auto max-w-2xl">
        <p className="text-[11px] tracked-tight opacity-70 uppercase">
          NOT SURE WHAT TO PICK?
        </p>
        <h2 className="mt-3 font-display text-4xl md:text-5xl">
          Take the Era Quiz.
        </h2>
        <p className="mt-4 text-base opacity-80">
          Five quick questions. We&apos;ll match you to the era that&apos;s
          yours.
        </p>
        <Link
          to="/quiz"
          className="mt-8 inline-block bg-burgundy px-8 py-4 text-[12px] tracked-tight text-ivory transition-opacity hover:opacity-90"
        >
          START QUIZ →
        </Link>
      </div>
    </section>
  );
}

/* ---------------- Newsletter ---------------- */

function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="bg-rose/30 px-6 py-20 text-center text-foreground md:px-10">
      <div className="mx-auto max-w-lg">
        <h2 className="font-display text-3xl md:text-4xl">Stay in the loop</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          New drops, restocks and era launches — straight to your inbox.
        </p>

        {submitted ? (
          <p className="mt-8 text-sm text-burgundy">
            You&apos;re on the list. Welcome to the archive.
          </p>
        ) : (
          <form
            className="mt-8 flex flex-col gap-3 sm:flex-row"
            onSubmit={(e) => {
              e.preventDefault();
              if (!email.includes("@")) return;
              setSubmitted(true);
            }}
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 border border-charcoal/20 bg-white px-4 py-4 text-sm text-foreground outline-none focus:border-charcoal"
            />
            <button
              type="submit"
              className="bg-primary px-7 py-4 text-[12px] tracked-tight text-primary-foreground transition-opacity hover:opacity-90"
            >
              SUBSCRIBE
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

/* ---------------- Social Links ---------------- */

function SocialLinks() {
  return (
    <section className="bg-background px-6 py-12 text-center text-foreground md:px-10">
      <p className="text-[11px] tracked-tight text-muted-foreground uppercase">
        Follow Along
      </p>
      <div className="mt-4 flex justify-center gap-8 text-sm">
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noreferrer"
          className="tracked-tight text-foreground transition-colors hover:text-burgundy"
        >
          Instagram
        </a>
        <a
          href="https://pinterest.com"
          target="_blank"
          rel="noreferrer"
          className="tracked-tight text-foreground transition-colors hover:text-burgundy"
        >
          Pinterest
        </a>
      </div>
    </section>
  );
}

/* ---------------- Shared ---------------- */

function SectionHeader({
  eyebrow,
  title,
  to,
  hash,
  linkLabel = "VIEW ALL →",
}: {
  eyebrow: string;
  title: string;
  to: string;
  hash?: string;
  linkLabel?: string;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-6">
      <div>
        <p className="text-[11px] tracked-tight text-muted-foreground uppercase">
          {eyebrow}
        </p>
        <h2 className="mt-2 font-display text-4xl md:text-5xl">{title}</h2>
      </div>
      <Link
        to={to}
        hash={hash}
        className="hidden text-[12px] tracked-tight underline opacity-70 transition-opacity hover:opacity-100 md:inline"
      >
        {linkLabel}
      </Link>
    </div>
  );
}
