import { useState } from 'react';
import { motion } from 'framer-motion';
import SewingMascotOverlay from './SewingMascotOverlay';
import StitchMachine3D from './StitchMachine3D';

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
    <section id="top" className="relative pt-24 sm:pt-32 pb-20 px-6 sm:px-10 max-w-[120rem] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative font-mono-stitch text-[10px] tracking-[0.4em] uppercase text-[#B08D57] mb-8 flex items-center gap-3"
          >
            <span className="w-8 h-px bg-[#B08D57]" />
            Fashion manufacturing atelier — Est. on the floor
          </motion.p>

          <h1 className="relative font-display text-[12vw] sm:text-[8vw] lg:text-[5vw] leading-[0.95] tracking-tight text-white">
            {LINES.map((line, i) => (
              <span key={line} className="block overflow-hidden">
                <motion.span
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  className="block"
                >
                  {i === 2 ? <>stitch at a time<span className="text-[#B08D57]">.</span></> : line}
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
            A luxury fashion-manufacturing atelier. Three divisions — Men's, Women's, Kid's — each cut across Sports, Woven and Knit. Delivery timelines starting from 7 working days.
          </motion.p>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <a href="#divisions" className="bg-white text-[#0a0a0a] font-mono-stitch text-xs tracking-[0.2em] uppercase px-7 py-4 hover:bg-[#B08D57] hover:text-white transition-colors">
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

        {/* 3D Interactive Model Box */}
        <div className="lg:col-span-5 h-[450px] w-full relative">
          <StitchMachine3D onMachineClick={() => setIsMascotOpen(true)} />
        </div>
      </div>

      {/* Live Repeating Number Stats Grid */}
      <div className="mt-20 grid grid-cols-2 md:grid-cols-4 border-t border-l border-white/10">
        {STATS.map((s) => (
          <motion.div
            key={s.l}
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5 }}
            className="border-r border-b border-white/10 p-6 sm:p-8"
          >
            <div className="font-display text-5xl sm:text-6xl text-white">{s.n}</div>
            <div className="mt-2 font-mono-stitch text-[10px] tracking-[0.25em] uppercase text-white/40">{s.l}</div>
          </motion.div>
        ))}
      </div>

      <SewingMascotOverlay isOpen={isMascotOpen} onClose={() => setIsMascotOpen(false)} />
    </section>
  );
}