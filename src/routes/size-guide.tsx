import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/size-guide")({
  head: () => ({
    meta: [
      { title: "Size Guide — Wear The Eras" },
      { name: "description", content: "Find your fit across every Wear The Eras tee and cap." },
    ],
  }),
  component: SizeGuidePage,
});

const SHIRT_SIZES = [
  { size: "XS", chest: "32–34\"", length: "26.5\"" },
  { size: "S", chest: "35–37\"", length: "27.5\"" },
  { size: "M", chest: "38–40\"", length: "28.5\"" },
  { size: "L", chest: "41–43\"", length: "29.5\"" },
  { size: "XL", chest: "44–46\"", length: "30.5\"" },
  { size: "XXL", chest: "47–49\"", length: "31.5\"" },
];

function SizeGuidePage() {
  return (
    <div className="min-h-screen bg-black px-6 pt-32 pb-24 text-white md:px-10">
      <div className="mx-auto max-w-3xl">
        <p className="text-[11px] tracked-tight opacity-60">INFORMATION</p>
        <h1 className="mt-2 font-display text-5xl">Size Guide</h1>
        <p className="mt-4 max-w-xl text-sm leading-relaxed opacity-70">
          Our tees run true to size with a relaxed, heavyweight fit. If you're between
          sizes, or prefer an oversized look, we recommend sizing up.
        </p>

        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[420px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-white/20 text-[11px] tracked-tight opacity-60">
                <th className="py-3 pr-4">Size</th>
                <th className="py-3 pr-4">Chest</th>
                <th className="py-3">Length</th>
              </tr>
            </thead>
            <tbody>
              {SHIRT_SIZES.map((row) => (
                <tr key={row.size} className="border-b border-white/10">
                  <td className="py-3 pr-4 font-display text-lg">{row.size}</td>
                  <td className="py-3 pr-4 opacity-80">{row.chest}</td>
                  <td className="py-3 opacity-80">{row.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-12 space-y-3 text-sm leading-relaxed opacity-70">
          <p>
            <span className="text-white">Caps</span> — one size, adjustable strap
            (fits most head sizes 21"–24").
          </p>
          <p>
            <span className="text-white">Measuring tip</span> — lay a garment you
            already own flat and measure pit-to-pit for chest, and shoulder seam to
            hem for length.
          </p>
        </div>

        <Link
          to="/shop"
          className="mt-12 inline-block bg-white px-7 py-4 text-[12px] tracked-tight text-black"
        >
          CONTINUE SHOPPING
        </Link>
      </div>
    </div>
  );
}
