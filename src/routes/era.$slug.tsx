import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { eraMap, eras, getNeighborEras } from "@/data/eraConfig";
import { productsByEra } from "@/data/products";
import { useEraTheme } from "@/hooks/useEraTheme";
import { useStore } from "@/store/useStore";
import { ParticleCanvas } from "@/components/ParticleCanvas";
import { ProductCard } from "@/components/ProductCard";
import { EraCard } from "@/components/EraCard";

export const Route = createFileRoute("/era/$slug")({
  loader: ({ params }) => {
    const era = eraMap[params.slug];
    if (!era) throw notFound();
    return { era };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.era.name} — Wear The Eras` },
          {
            name: "description",
            content: `${loaderData.era.tagline} — Shirts and caps from the ${loaderData.era.name} era.`,
          },
          {
            property: "og:title",
            content: `${loaderData.era.name} — Wear The Eras`,
          },
          {
            property: "og:description",
            content: loaderData.era.intro,
          },
        ]
      : [],
  }),
  component: EraPage,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="text-center">
        <p className="font-script text-2xl opacity-70">
          That era hasn&apos;t been written yet.
        </p>
        <Link to="/eras" className="mt-6 inline-block underline">
          Back to the eras
        </Link>
      </div>
    </div>
  ),
});

function EraPage() {
  const { era } = Route.useLoaderData();
  useEraTheme(era);
  const setCurrentEra = useStore((s) => s.setCurrentEra);
  const [showCurtain, setShowCurtain] = useState(true);

  useEffect(() => {
    setCurrentEra(era.slug);
    const id = setTimeout(() => setShowCurtain(false), 750);
    return () => {
      clearTimeout(id);
      setCurrentEra(null);
    };
  }, [era.slug, setCurrentEra]);

  const products = productsByEra(era.slug);
  const featured = products.slice(0, 2);
  const { prev, next } = getNeighborEras(era.slug);

  // Cross-sell from neighbouring eras rather than repeating this era's own
  // products or duplicating the "explore more eras" cards below.
  const relatedProducts = [
    ...productsByEra(prev.slug).slice(0, 2),
    ...productsByEra(next.slug).slice(0, 2),
  ];

  const otherEras = eras.filter((e) => e.slug !== era.slug).slice(0, 3);

  return (
    <div style={{ background: era.surfaceColor, color: era.textColor }}>
      {showCurtain && (
        <div className="era-curtain" style={{ background: era.primaryColor }} />
      )}

      {/* HERO */}
      <section
        className="relative flex min-h-screen flex-col overflow-hidden"
        style={{ background: era.heroBg }}
      >
        {era.heroImage && (
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${era.heroImage})` }}
          />
        )}

        {era.slug === "1989" && (
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: "rgba(255,255,255,0.04)", filter: "blur(80px)" }}
          />
        )}

        <div className="noise-overlay" />
        <ParticleCanvas type={era.particleType} color={era.particleColor} />

        <div className="relative z-10 flex flex-1 flex-col justify-end p-[6vw] pb-[10vh]">
          <p className="text-[12px] tracked-tight" style={{ color: era.textColor }}>
            {era.mood}
          </p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="font-display"
            style={{
              color: era.textColor,
              fontSize: "clamp(52px, 12vw, 120px)",
              lineHeight: 1,
              letterSpacing: "-0.02em",
              fontStyle: era.slug === "tortured-poets" ? "italic" : "normal",
            }}
          >
            <span className={era.slug === "tortured-poets" ? "typewriter-cursor" : ""}>
              {era.name}
            </span>
          </motion.h1>
        </div>
      </section>

      {/* SHORT DESCRIPTION */}
      <section className="px-6 py-32 md:px-10" style={{ background: era.surfaceColor }}>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9 }}
          className="mx-auto max-w-2xl text-center font-script"
          style={{ color: era.textColor, fontSize: "30px", lineHeight: 1.4 }}
        >
          {era.intro}
        </motion.p>
      </section>

      {/* PRODUCT COLLECTION */}
      <section
        className="px-6 py-24 md:px-10"
        style={{
          background: `linear-gradient(180deg, ${era.surfaceColor} 0%, ${era.surfaceColor}f0 100%)`,
        }}
      >
        <div className="mx-auto max-w-7xl">
          <p className="text-[11px] tracked-tight" style={{ color: era.textColor }}>
            WEAR THIS ERA
          </p>
          <h2 className="mt-2 font-display text-4xl md:text-5xl" style={{ color: era.textColor }}>
            {era.collections[0]}
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} themed />
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      {featured.length > 0 && (
        <section className="px-6 py-24 md:px-10" style={{ background: era.surfaceColor }}>
          <div className="mx-auto max-w-6xl space-y-32">
            <p
              className="text-center text-[11px] tracked-tight"
              style={{ color: era.textColor }}
            >
              FEATURED PIECES
            </p>
            {featured.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8 }}
                className={`grid items-center gap-12 md:grid-cols-2 ${
                  i % 2 ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div>
                  <h3
                    className="font-display text-3xl leading-tight md:text-4xl"
                    style={{ color: era.textColor }}
                  >
                    {p.name}
                  </h3>
                  <p
                    className="mt-5 max-w-sm text-[15px] opacity-80"
                    style={{ color: era.textColor }}
                  >
                    {p.description}
                  </p>
                  <p
                    className="mt-6 text-[12px] tracked-tight"
                    style={{ color: era.textColor, opacity: 0.7 }}
                  >
                    FROM THE {p.collection.toUpperCase()}
                  </p>
                </div>
                <ProductCard product={p} themed />
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* RELATED PRODUCTS */}
      {relatedProducts.length > 0 && (
        <section
          className="px-6 py-24 md:px-10"
          style={{ background: era.surfaceColor, borderTop: `1px solid ${era.textColor}22` }}
        >
          <div className="mx-auto max-w-7xl">
            <p className="text-[11px] tracked-tight" style={{ color: era.textColor }}>
              YOU MIGHT ALSO LIKE
            </p>
            <h2 className="mt-2 font-display text-3xl md:text-4xl" style={{ color: era.textColor }}>
              From Neighbouring Eras
            </h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ERA NAVIGATION */}
      <section className="px-6 py-24 md:px-10" style={{ background: era.surfaceColor }}>
        <div className="mx-auto max-w-7xl">
          <p className="text-[11px] tracked-tight" style={{ color: era.textColor }}>
            EXPLORE MORE ERAS
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {otherEras.map((e) => (
              <EraCard key={e.slug} era={e} size="wide" />
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER NAV */}
      <section
        className="border-t px-6 py-16 text-center md:px-10"
        style={{ background: era.surfaceColor, borderColor: `${era.textColor}33` }}
      >
        <div
          className="mx-auto flex max-w-3xl items-center justify-between gap-6 text-[14px]"
          style={{ color: era.textColor }}
        >
          <Link
            to="/era/$slug"
            params={{ slug: prev.slug }}
            className="flex items-center gap-3 hover:opacity-70"
          >
            <span style={{ color: era.accentColor }}>←</span> {prev.name}
          </Link>
          <Link to="/eras" className="text-[11px] tracked-tight opacity-70 hover:opacity-100">
            ALL ERAS
          </Link>
          <Link
            to="/era/$slug"
            params={{ slug: next.slug }}
            className="flex items-center gap-3 hover:opacity-70"
          >
            {next.name} <span style={{ color: era.accentColor }}>→</span>
          </Link>
        </div>
        {era.easterEgg && (
          <p
            className="mt-12 font-script text-sm opacity-40 transition-opacity hover:opacity-100"
            style={{ color: era.textColor }}
          >
            &ldquo;{era.easterEgg}&rdquo;
          </p>
        )}
      </section>
    </div>
  );
}
