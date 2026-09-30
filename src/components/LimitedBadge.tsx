/**
 * Single source of truth for the "LIMITED" badge, used on product cards
 * (shop, era pages, etc.) and on the individual product page.
 *
 * Solid near-black pill with white text and a thin white ring, so it stays
 * clearly visible on any era gradient (light or dark) and never blends into
 * the product image. Pass `className` only for positioning.
 */
export function LimitedBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3.5 py-1.5 text-[10px] font-semibold tracked-tight ${className}`}
      style={{
        background: "#0a0a0a",
        color: "#ffffff",
        border: "1px solid rgba(255,255,255,0.85)",
        boxShadow: "0 2px 8px rgba(0,0,0,0.35)",
      }}
    >
      LIMITED
    </span>
  );
}