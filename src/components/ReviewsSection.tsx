import { Star } from "lucide-react";
import type { Product } from "@/data/products";
import { ratingBreakdown } from "@/data/products";
import { getReviewPhotos } from "@/data/reviews";
import type { EraConfig } from "@/data/eraConfig";
import { shortEraName } from "@/data/eraConfig";

interface Props {
  product: Product;
  era: EraConfig;
}

export function ReviewsSection({ product, era }: Props) {
  const breakdown = ratingBreakdown(product);
  const photos = getReviewPhotos(product);

  return (
    <section className="px-6 py-24 md:px-10" style={{ background: era.surfaceColor }}>
      <div className="mx-auto max-w-7xl">
        <p className="text-[11px] tracked-tight opacity-70">CUSTOMER REVIEWS</p>
        <h2 className="mt-2 font-display text-3xl md:text-4xl">
          What {shortEraName(era.name)} Wearers Say
        </h2>

        {/* Rating summary — the visual priority alongside photos */}
        <div className="mt-12 grid gap-12 lg:grid-cols-[280px_1fr]">
          <div>
            <p className="font-display text-6xl leading-none">
              {product.rating.toFixed(1)}
            </p>
            <div className="mt-3">
              <BigStars rating={product.rating} color={era.accentColor} />
            </div>
            <p className="mt-2 text-[13px] opacity-70">
              Based on {product.ratingCount} ratings
            </p>

            <div className="mt-8 space-y-2.5">
              {breakdown.map((row) => (
                <div key={row.stars} className="flex items-center gap-3 text-[12px]">
                  <span className="w-8 shrink-0 opacity-70">{row.stars}★</span>
                  <div
                    className="h-2 flex-1 overflow-hidden rounded-full"
                    style={{ background: `${era.textColor}1a` }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${row.pct}%`, background: era.primaryColor }}
                    />
                  </div>
                  <span className="w-9 shrink-0 text-right opacity-60">{row.pct}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Customer photo gallery */}
          <div>
            <p className="text-[11px] tracked-tight opacity-70 uppercase">
              Customer Photos
            </p>
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {photos.map((photo) => (
                <figure
                  key={photo.id}
                  className="group relative aspect-square overflow-hidden"
                  style={{ background: photo.tint }}
                >
                  <div className="noise-overlay" />
                  <div
                    className="absolute inset-0 flex items-center justify-center text-2xl font-display opacity-40 transition-transform duration-300 group-hover:scale-110"
                    style={{ color: era.surfaceColor }}
                  >
                    {photo.initials}
                  </div>
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ boxShadow: `inset 0 0 0 2px ${era.primaryColor}` }}
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-black/40 p-2.5 backdrop-blur-sm">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star
                          key={i}
                          className="h-2.5 w-2.5"
                          style={{
                            fill: i < photo.stars ? "#d97706" : "transparent",
                            color: i < photo.stars ? "#d97706" : "rgba(255,255,255,0.4)",
                          }}
                        />
                      ))}
                    </div>
                    <p className="mt-1 line-clamp-2 text-[11px] leading-snug text-white/90">
                      {photo.caption}
                    </p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BigStars({ rating, color }: { rating: number; color: string }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className="h-5 w-5"
          style={{
            fill: i < Math.round(rating) ? color : "transparent",
            color: i < Math.round(rating) ? color : `${color}55`,
          }}
        />
      ))}
    </div>
  );
}
