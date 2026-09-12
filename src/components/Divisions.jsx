import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';

const ITEMS = [
  {
    id: 'mens',
    label: "Men's Division",
    copy: 'Engineered tailoring for the modern wardrobe.',
    img: 'https://media.base44.com/images/public/6aa4252f63cd2cf7a693af44/1d1f81319_generated_b934abc1.jpg',
  },
  {
    id: 'womens',
    label: "Women's Division",
    copy: 'Fluid silhouettes, precise construction.',
    img: 'https://media.base44.com/images/public/6aa4252f63cd2cf7a693af44/d0e7b4c8f_generated_22b82780.jpg',
  },
  {
    id: 'kids',
    label: "Kid's Division",
    copy: 'Soft-hand construction, certified safety.',
    img: 'https://media.base44.com/images/public/6aa4252f63cd2cf7a693af44/731f4f629_generated_c6024d9c.jpg',
  },
];

export default function Divisions() {
  return (
    <section
      id="divisions"
      className="px-6 sm:px-10 py-24 sm:py-32 max-w-[120rem] mx-auto"
      aria-label="Our divisions"
    >
      <div className="mb-12 sm:mb-16">
        <span className="font-mono-stitch text-[10px] tracking-[0.35em] uppercase text-white/40">
          Section 02
        </span>
        <h2 className="mt-4 font-display text-4xl sm:text-5xl tracking-tight text-white">
          The divisions
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {ITEMS.map((item, i) => (
          <motion.a
            key={item.id}
            href={`#${item.id}`}   // FIX: was href__
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: i * 0.1 }}
            className="group relative block aspect-[3/4] overflow-hidden rounded-sm bg-[#111] border border-white/10"
            aria-label={item.label}
          >
            <Image
              src={item.img}
              alt={item.label}
              className="absolute inset-0 w-full h-full transition-transform duration-[1.2s] group-hover:scale-105"
              fittingType="fill"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/90 via-[#0a0a0a]/20 to-transparent" />
            <div className="absolute inset-0 p-6 flex flex-col justify-end">
              <h3 className="font-display text-3xl text-white">{item.label}</h3>
              <p className="mt-2 text-sm text-white/60 font-sans-stitch">{item.copy}</p>
              <span
                className="mt-4 font-mono-stitch text-[10px] tracking-[0.25em] uppercase text-[#B08D57]"
                aria-hidden="true"
              >
                Explore →
              </span>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
