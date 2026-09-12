// SECURITY: No dynamic data rendered — static list is safe from XSS.
const ITEMS = [
  'Delivery from 7 working days',
  "Men's · Women's · Kid's",
  'Sports · Woven · Knit',
  'Bulk manufacturing',
  'Home textile partner — Nadir Saidjan',
];

export default function Ticker() {
  // Quadruple items for seamless infinite scroll without JS
  const row = [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS];

  return (
    // SECURITY: aria-hidden keeps the repetitive ticker out of the accessibility tree
    <div
      className="overflow-hidden border-y border-white/10 bg-[#0a0a0a] py-3"
      aria-hidden="true"
    >
      <div className="flex w-max animate-marquee">
        {row.map((t, i) => (
          // Using index as key is intentional here — purely decorative, never reordered.
          <span
            key={i}
            className="font-mono-stitch text-[10px] tracking-[0.3em] uppercase text-white/50 whitespace-nowrap px-6 flex items-center"
          >
            {t}
            <span className="text-[#B08D57] ml-6" aria-hidden="true">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}
