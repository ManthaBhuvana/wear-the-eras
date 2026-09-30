import { hash, type Product } from "@/data/products";

export interface ReviewPhoto {
  id: string;
  initials: string;
  stars: number;
  caption: string;
  tint: string;
}

const NAMES = [
  "AK", "SM", "RJ", "TL", "MP", "NV", "CD", "JH", "PB", "KY", "OS", "GT",
];

const CAPTIONS = [
  "Perfect fit and true to size.",
  "The colour is even better in person.",
  "Great quality, exceeded expectations.",
  "Comfortable — wear it constantly.",
  "Exactly as pictured, so happy with it.",
  "Fabric feels premium, holds up well after washing.",
  "Runs slightly oversized but love the look.",
  "Fast shipping, great packaging too.",
];

const TINTS = [
  "#B7ADA1", "#C9A5A5", "#6E2637", "#171717", "#8a8177", "#a9787d",
];

// Deterministic per-product gallery so every visit shows the same set,
// without needing a real photo-upload/review backend yet.
export function getReviewPhotos(product: Product, count = 8): ReviewPhoto[] {
  return Array.from({ length: count }, (_, i) => {
    const h = hash(`${product.id}-review-${i}`);
    const starOffset = (h % 3) - 1; // -1, 0, or 1 relative to product rating
    const stars = Math.min(5, Math.max(3, Math.round(product.rating) + starOffset));
    return {
      id: `${product.id}-photo-${i}`,
      initials: NAMES[h % NAMES.length],
      stars,
      caption: CAPTIONS[(h >> 3) % CAPTIONS.length],
      tint: TINTS[(h >> 6) % TINTS.length],
    };
  });
}
