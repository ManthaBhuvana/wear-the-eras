export interface Product {
    id: string;
    name: string;
    type: "shirt" | "cap";
    era: string;
    collection: string;
    price: number;
    sizes: string[];
    stock: number;
    limited: boolean;
    inventoryLine: string;
    description: string;
    rating: number; // 1–5, one decimal
    ratingCount: number;
    color: string;
    material: string;
    restocked: boolean;
}

const SHIRT_SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
const CAP_SIZES = ["One Size"];

// Small fixed colourway rotation used across the catalogue — swap for real
// per-product colour data whenever photography/colour options are finalised.
const COLORWAYS = ["Charcoal", "Ivory", "Burgundy", "Taupe", "Rose"];

// Deterministic pseudo-rating/colour from the product id, so every product
// gets a stable, believable rating and colour without hand-authoring one
// for each of the 24 entries above. Replace with real review data later.
export const hash = (str: string) => {
    let h = 0;
    for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
    return h;
};

const make = (
    id: string,
    era: string,
    name: string,
    type: "shirt" | "cap",
    collection: string,
    price: number,
    inventoryLine: string,
    stock = 6,
    limited = true,
): Product => {
    const h = hash(id);
    return {
        id,
        name,
        type,
        era,
        collection,
        price,
        sizes: type === "shirt" ? SHIRT_SIZES : CAP_SIZES,
        stock,
        limited,
        inventoryLine,
        description:
            type === "shirt"
                ? "Heavyweight 100% cotton. Oversized fit. Garment-dyed in small batches."
                : "Structured 6-panel. Embroidered front, cotton twill. Adjustable strap.",
        rating: Math.round((4 + (h % 11) / 10) * 10) / 10, // 4.0–5.0
        ratingCount: 20 + (h % 180),
        color: COLORWAYS[h % COLORWAYS.length],
        material:
            type === "shirt"
                ? "100% combed ring-spun cotton, 240gsm heavyweight jersey. Pre-shrunk, garment-dyed."
                : "100% cotton twill shell, structured 6-panel crown. Cotton sweatband, adjustable strap.",
        restocked: h % 4 === 0,
    };
};

export const products: Product[] = [
    make("debut-shirt-1", "debut", "Tim McGraw Porch Tee", "shirt", "Debut Essentials", 48, "Only 5 left — the front porch is closing.", 5),
    make("debut-cap-1", "debut", "Perfectly Good Heart Cap", "cap", "Debut Essentials", 36, "Limited run of 100.", 12),

    make("fearless-shirt-1", "fearless", "Fearless Golden Tee", "shirt", "Fearless Drop", 52, "Only 8 left — fearlessly yours.", 8),
    make("fearless-cap-1", "fearless", "You Belong With Me Cap", "cap", "Fearless Drop", 38, "Limited to 150.", 14),

    make("speaknow-shirt-1", "speak-now", "Enchanted Oversized Tee", "shirt", "Enchanted Collection", 58, "Only 6 left — it's enchanting.", 6),
    make("speaknow-cap-1", "speak-now", "Haunted Midnight Cap", "cap", "Enchanted Collection", 40, "Limited.", 10),

    make("red-shirt-1", "red", "All Too Well Varsity Tee", "shirt", "Red Drop", 64, "Only 3 left — the scarf is staying.", 3),
    make("red-cap-1", "red", "Treacherous Cap", "cap", "Red Drop", 42, "Limited to 100.", 7),

    make("1989-shirt-1", "1989", "Style Oversized Tee", "shirt", "1989 Essentials", 58, "Only 7 left.", 7),
    make("1989-cap-1", "1989", "New York City Cap", "cap", "1989 Essentials", 40, "Limited.", 11),

    make("rep-shirt-1", "reputation", "Look What You Made Me Wear Tee", "shirt", "Reputation Drop", 68, "Only 4 left — she's dead.", 4),
    make("rep-cap-1", "reputation", "I'm Sorry, The Old Cap Can't Come Cap", "cap", "Reputation Drop", 44, "Limited to 80.", 6),

    make("lover-shirt-1", "lover", "London Boy Tee", "shirt", "Lover Pastel Set", 58, "Only 9 left.", 9),
    make("lover-cap-1", "lover", "Lover Pastel Cap", "cap", "Lover Pastel Set", 40, "Limited.", 13),

    make("folk-shirt-1", "folklore", "Cardigan Vintage Tee", "shirt", "Folklore Collection", 62, "Only 5 left — under someone's bed.", 5),
    make("folk-cap-1", "folklore", "Seven Cap", "cap", "Folklore Collection", 42, "Limited to 90.", 8),

    make("ever-shirt-1", "evermore", "Willow Oversized Tee", "shirt", "Evermore Collection", 62, "Only 6 left.", 6),
    make("ever-cap-1", "evermore", "Champagne Problems Cap", "cap", "Evermore Collection", 42, "Limited.", 9),

    make("mid-shirt-1", "midnights", "Lavender Haze Oversized Tee", "shirt", "Meet Me At Midnight", 58, "Only 4 left — it's a love story, but make it midnight.", 4),
    make("mid-shirt-2", "midnights", "Anti-Hero Confessional Tee", "shirt", "Meet Me At Midnight", 62, "Only 6 left.", 6),
    make("mid-cap-1", "midnights", "Bejeweled Midnight Cap", "cap", "Meet Me At Midnight", 44, "Limited to 120.", 10),

    make("ttpd-shirt-1", "tortured-poets", "The Manuscript Tee", "shirt", "TTPD First Edition", 68, "Only 7 left — first edition.", 7),
    make("ttpd-cap-1", "tortured-poets", "Loml Cap", "cap", "TTPD First Edition", 44, "Limited.", 9),

    make("show-shirt-1", "showgirl", "Showstopper Gold Tee", "shirt", "Showgirl Encore", 72, "Only 5 left — curtain rises.", 5),
    make("show-cap-1", "showgirl", "Opening Night Cap", "cap", "Showgirl Encore", 46, "Limited to 100.", 11),
];

export const productMap: Record<string, Product> = Object.fromEntries(
    products.map((p) => [p.id, p]),
);

export const productsByEra = (slug: string) =>
    products.filter((p) => p.era === slug);

export const featuredProducts = () =>
    products.filter((p) => p.era === "midnights").slice(0, 2);

export const latestDrop = () => [
    productMap["mid-shirt-1"],
    productMap["ttpd-shirt-1"],
    productMap["show-shirt-1"],
    productMap["lover-shirt-1"],
];

export const bestSellers = () => [
    productMap["rep-shirt-1"],
    productMap["1989-cap-1"],
    productMap["folk-shirt-1"],
    productMap["red-cap-1"],
];

export const latestDropIds = new Set(latestDrop().filter(Boolean).map((p) => p!.id));
export const bestSellerIds = new Set(bestSellers().filter(Boolean).map((p) => p!.id));

// Broader reverse-catalogue-order feed, distinct from the small curated
// "New Arrivals" set above. Swap for a real createdAt-sorted query later.
export const recentlyAdded = (limit = 8) =>
    [...products]
        .reverse()
        .filter((p) => !latestDropIds.has(p.id))
        .slice(0, limit);

export const limitedDrops = () => products.filter((p) => p.limited);

export const restockedProducts = () => products.filter((p) => p.restocked);

export const allColors = Array.from(new Set(products.map((p) => p.color))).sort();
export const allSizes = Array.from(
    new Set(products.flatMap((p) => p.sizes)),
).sort((a, b) => {
    const order = ["XS", "S", "M", "L", "XL", "XXL", "One Size"];
    return order.indexOf(a) - order.indexOf(b);
});
export const priceBounds = {
    min: Math.min(...products.map((p) => p.price)),
    max: Math.max(...products.map((p) => p.price)),
};

// Deterministic 5→1 star breakdown that's consistent with a product's
// average rating (skews toward 5★/4★ for high-rated products). Replace with
// real aggregated review data once a review system exists.
export function ratingBreakdown(product: Product): { stars: number; pct: number }[] {
    const h = hash(product.id + "-breakdown");
    const skew = (product.rating - 3) / 2; // -0.5..1
    const raw = [5, 4, 3, 2, 1].map((stars, i) => {
        const base = Math.max(2, 30 + skew * 45 - i * 12 + ((h >> (i * 4)) % 9));
        return { stars, base };
    });
    const total = raw.reduce((sum, r) => sum + r.base, 0);
    return raw.map((r) => ({ stars: r.stars, pct: Math.round((r.base / total) * 100) }));
}
