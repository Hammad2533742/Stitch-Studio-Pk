import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { ChevronLeft, ChevronRight, X, Sparkles } from 'lucide-react';

// Add filenames here as you drop images into /public/StitchStudioPictures/<folder>/
const FABRIC_CATEGORIES = [
  {
    id: 'sports',
    title: 'Sports & Activewear',
    subtitle: 'High-performance synthetics & technical knits',
    coverImage: 'https://media.base44.com/images/public/6aa4252f63cd2cf7a693af44/1d1f81319_generated_b934abc1.jpg',
    images: [
      { src: '/StitchStudioPictures/sports/sports-1.jpg', alt: 'Sports item 1' },
      { src: '/StitchStudioPictures/sports/sports-2.jpg', alt: 'Sports item 2' },
    ],
  },
  {
    id: 'woven',
    title: 'Woven Precision',
    subtitle: 'Structured suiting, outerwear & cotton twills',
    coverImage: 'https://media.base44.com/images/public/6aa4252f63cd2cf7a693af44/d0e7b4c8f_generated_22b82780.jpg',
    images: [
      { src: '/StitchStudioPictures/woven/woven-1.jpg', alt: 'Woven item 1' },
      { src: '/StitchStudioPictures/woven/woven-2.jpg', alt: 'Woven item 2' },
    ],
  },
  {
    id: 'knitted',
    title: 'Knit Excellence',
    subtitle: 'Luxurious gauges, fleece & breathable knits',
    coverImage: 'https://media.base44.com/images/public/6aa4252f63cd2cf7a693af44/731f4f629_generated_c6024d9c.jpg',
    images: [
      { src: '/StitchStudioPictures/knit/knit-1.jpg', alt: 'Knit item 1' },
      { src: '/StitchStudioPictures/knit/knit-2.jpg', alt: 'Knit item 2' },
    ],
  },
];

export default function AtelierFloor() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openSlider = (category) => {
    setActiveCategory(category);
    setCurrentIndex(0);
  };

  const handleNext = () => {
    if (!activeCategory) return;
    setCurrentIndex((prev) => (prev + 1) % activeCategory.images.length);
  };

  const handlePrev = () => {
    if (!activeCategory) return;
    setCurrentIndex((prev) => (prev - 1 + activeCategory.images.length) % activeCategory.images.length);
  };

  return (
    <section id="atelier" className="px-6 sm:px-10 py-24 max-w-[120rem] mx-auto">
      <div className="mb-12">
        <span className="font-mono-stitch text-[10px] tracking-[0.35em] uppercase text-gold">
          Gender-Independent Fabrications
        </span>
        <h2 className="mt-2 font-display text-4xl sm:text-5xl text-ink">Fabrication Categories</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {FABRIC_CATEGORIES.map((cat, i) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            onClick={() => openSlider(cat)}
            className="group relative aspect-[4/5] rounded-xl overflow-hidden bg-panel border border-ink/10 cursor-pointer shadow-xl"
          >
            <Image
              src={cat.coverImage}
              alt={cat.title}
              className="absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-105 filter brightness-90 group-hover:brightness-100"
              fittingType="fill"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
              <span className="font-mono-stitch text-[10px] uppercase tracking-[0.25em] text-gold-light flex items-center gap-2">
                <Sparkles className="w-3 h-3" />
                {cat.images.length > 0 ? `${cat.images.length} Loaded Items` : 'Dynamic Gallery'}
              </span>
              <h3 className="font-display text-3xl text-white mt-1">{cat.title}</h3>
              <p className="text-xs text-white/70 font-sans-stitch mt-2">{cat.subtitle}</p>
              <button type="button" className="mt-6 inline-flex items-center text-xs font-mono-stitch tracking-widest text-white uppercase group-hover:text-gold-light transition-colors">
                Launch Dynamic Gallery →
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {activeCategory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[160] bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-10 select-none"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h4 className="font-display text-2xl text-white tracking-wide">{activeCategory.title}</h4>
                <p className="font-mono-stitch text-xs text-gold-light tracking-widest uppercase mt-1">
                  Item {currentIndex + 1} of {activeCategory.images.length}
                </p>
              </div>
              <button type="button" onClick={() => setActiveCategory(null)} className="p-3 text-white/50 hover:text-white transition-colors bg-white/5 rounded-full" aria-label="Close Gallery">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="relative flex-1 flex items-center justify-center my-6">
              {activeCategory.images.length > 0 ? (
                <div className="relative w-full max-w-4xl h-[60vh] flex items-center justify-center">
                  <AnimatePresence mode="popLayout">
                    <motion.div
                      key={currentIndex}
                      initial={{ scale: 0.8, opacity: 0, rotateY: 25, x: 150 }}
                      animate={{ scale: 1, opacity: 1, rotateY: 0, x: 0 }}
                      exit={{ scale: 0.8, opacity: 0, rotateY: -25, x: -150 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <Image
                        src={activeCategory.images[currentIndex].src}
                        alt={activeCategory.images[currentIndex].alt}
                        className="max-w-full max-h-full object-contain rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-white/10"
                        fittingType="fit"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              ) : (
                <div className="text-center font-mono-stitch text-white/40 uppercase tracking-widest">
                  No images found for {activeCategory.id}
                </div>
              )}

              {activeCategory.images.length > 1 && (
                <>
                  <button type="button" onClick={handlePrev} className="absolute left-2 sm:left-8 top-1/2 -translate-y-1/2 bg-black/80 hover:bg-gold text-white p-4 rounded-full border border-white/20 transition-all hover:scale-110 active:scale-95 shadow-xl">
                    <ChevronLeft className="w-7 h-7" />
                  </button>
                  <button type="button" onClick={handleNext} className="absolute right-2 sm:right-8 top-1/2 -translate-y-1/2 bg-black/80 hover:bg-gold text-white p-4 rounded-full border border-white/20 transition-all hover:scale-110 active:scale-95 shadow-xl">
                    <ChevronRight className="w-7 h-7" />
                  </button>
                </>
              )}
            </div>

            <div className="flex gap-3 overflow-x-auto justify-start sm:justify-center py-3 border-t border-white/10 no-scrollbar">
              {activeCategory.images.map((img, idx) => (
                <button key={idx} type="button" onClick={() => setCurrentIndex(idx)} className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 cursor-pointer ${idx === currentIndex ? 'border-gold scale-110 opacity-100 shadow-[0_0_15px_rgba(176,141,87,0.5)]' : 'border-transparent opacity-30 hover:opacity-80'}`}>
                  <Image src={img.src} alt={img.alt} className="w-full h-full object-cover" fittingType="fill" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}