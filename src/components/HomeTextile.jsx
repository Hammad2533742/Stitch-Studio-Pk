import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';

const TEXTILE_IMG =
  'https://media.base44.com/images/public/6aa4252f63cd2cf7a693af44/88051a47e_generated_image.png';

export default function HomeTextile() {
  return (
    <section
      id="home-textile"
      className="px-6 sm:px-10 py-24 sm:py-32 max-w-[120rem] mx-auto"
      aria-label="Home textile — partner integration"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          <span className="font-mono-stitch text-[10px] tracking-[0.35em] uppercase text-ink/40">
            Partner integration
          </span>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl tracking-tight text-ink">
            Home textile
          </h2>
          <p className="mt-6 text-ink/70 font-sans-stitch text-lg leading-relaxed max-w-md">
            Our home textile and canvas manufacturing is operated by our partner — Nadir Saidjan
            Industries, a vertically integrated mill. Explore their catalog directly.
          </p>
          
          <a
            href="https://nadirsaidjan.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 border border-ink/30 text-ink font-mono-stitch text-xs tracking-[0.2em] uppercase px-7 py-4 hover:bg-ink hover:text-canvas transition-colors"
          >
            Visit nadirsaidjan.com →
          </a>
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative aspect-[4/3] overflow-hidden rounded-sm border border-ink/10"
        >
          <Image
            src={TEXTILE_IMG}
            alt="Nadir Saidjan home textile manufacturing facility"
            className="absolute inset-0 w-full h-full"
            fittingType="fill"
          />
        </motion.div>
      </div>
    </section>
  );
}