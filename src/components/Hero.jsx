import { useState } from 'react';
import { motion } from 'framer-motion';
import SewingMascotOverlay from './SewingMascotOverlay';

const STATS = [
  { n: '7', l: 'Working days from' },
  { n: '3', l: 'Divisions' },
  { n: '9+', l: 'Fabric categories' },
  { n: '35+', l: 'Production lines' },
];

const LINES = ['We sew the wardrobe', 'of the world, one', 'stitch at a time.'];

export default function Hero() {
  const [isMascotOpen, setIsMascotOpen] = useState(false);

  return (
    <section
      id="top"
      className="relative pt-24 sm:pt-32 pb-20 px-6 sm:px-10 max-w-[120rem] mx-auto"
      aria-label="Hero — Stitch Studio atelier"
    >
      {/* Decorative gold glow — hidden from screen readers */}
      <div
        aria-hidden="true"
        className="absolute top-10 left-1/2 -translate-x-1/2 w-[80vw] max-w-3xl h-[40vh] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(176,141,87,0.22), transparent 65%)',
          filter: 'blur(20px)',
        }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Heading, Subtext, & Action Buttons */}
        <div className="lg:col-span-7">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative font-mono-stitch text-[10px] tracking-[0.4em] uppercase text-[#B08D57] mb-8 flex items-center gap-3"
          >
            <span className="w-8 h-px bg-[#B08D57]" aria-hidden="true" />
            Fashion manufacturing atelier — Est. on the floor
          </motion.p>

          {/* Accessible main heading with animated text lines */}
          <h1 className="relative font-display text-[12vw] sm:text-[8vw] lg:text-[5vw] leading-[0.95] tracking-tight text-white">
            {LINES.map((line, i) => (
              <span key={line} className="block overflow-hidden">
                <motion.span
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  className="block"
                >
                  {i === 2 ? (
                    <>
                      stitch at a time<span className="text-[#B08D57]">.</span>
                    </>
                  ) : (
                    line
                  )}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-8 max-w-xl text-base sm:text-lg text-white/60 font-sans-stitch leading-relaxed"
          >
            A luxury fashion-manufacturing atelier. Three divisions — Men's, Women's, Kid's — each
            cut across Sports, Woven and Knit. Delivery timelines starting from 7 working days,
            tailored to custom order specifications.
          </motion.p>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <a
              href="#atelier"
              className="bg-white text-[#0a0a0a] font-mono-stitch text-xs tracking-[0.2em] uppercase px-7 py-4 hover:bg-[#B08D57] hover:text-white transition-colors"
            >
              Enter the atelier →
            </a>
            <button
              type="button"
              onClick={() => setIsMascotOpen(true)}
              className="border border-white/30 text-white font-mono-stitch text-xs tracking-[0.2em] uppercase px-7 py-4 hover:bg-white/10 transition-colors cursor-pointer"
            >
              Let's sew
            </button>
          </motion.div>
        </div>

        {/* Right Column: Embedded Interactive Video Card */}
        <div className="lg:col-span-5">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative w-full aspect-[4/5] max-w-md mx-auto overflow-hidden rounded-2xl border border-[#B08D57]/30 bg-black/40 shadow-2xl backdrop-blur-sm group"
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              poster="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1000&q=80"
              className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-all duration-700"
            >
              <source src="/videos/hero-craftsmanship.mp4" type="video/mp4" />
            </video>

            {/* Dark gradient vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

            {/* Atelier Floating Badge */}
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between pointer-events-none">
              <span className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#B08D57]/40 text-[10px] font-mono-stitch text-[#B08D57] uppercase tracking-widest">
                Live Craftsmanship
              </span>
              <span className="w-2 h-2 rounded-full bg-[#B08D57] animate-ping" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="mt-20 grid grid-cols-2 md:grid-cols-4 border-t border-l border-white/10">
        {STATS.map((s) => (
          <div key={s.l} className="border-r border-b border-white/10 p-6 sm:p-8">
            <div className="font-display text-5xl sm:text-6xl text-white" aria-label={`${s.n} — ${s.l}`}>
              {s.n}
            </div>
            <div className="mt-2 font-mono-stitch text-[10px] tracking-[0.25em] uppercase text-white/40" aria-hidden="true">
              {s.l}
            </div>
          </div>
        ))}
      </div>

      {/* Sewing Mascot Overlay triggered by "Let's sew" */}
      <SewingMascotOverlay
        isOpen={isMascotOpen}
        onClose={() => setIsMascotOpen(false)}
      />
    </section>
  );
}