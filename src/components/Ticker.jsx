const ITEMS = [
  'Delivery from 7 working days',
  "Men's · Women's · Kid's",
  'Sports · Woven · Knit',
  'Bulk manufacturing',
  'Home textile partner — Nadir Saidjan',
];

export default function Ticker() {
  const row = [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS];

  return (
    <div
      className="overflow-hidden border-y border-ink/10 bg-canvas py-3"
      aria-hidden="true"
    >
      <div className="flex w-max animate-marquee">
        {row.map((t, i) => (
          <span
            key={i}
            className="font-mono-stitch text-[10px] tracking-[0.3em] uppercase text-ink/50 whitespace-nowrap px-6 flex items-center"
          >
            {t}
            <span className="text-gold ml-6" aria-hidden="true">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}