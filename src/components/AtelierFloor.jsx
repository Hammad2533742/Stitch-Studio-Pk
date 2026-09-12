import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

// DYNAMIC CATEGORY DATA - All 17+ images can be listed here without hard limits
const FABRIC_CATEGORIES = [
  {
    id: 'sports',
    title: 'Sports & Activewear',
    subtitle: 'High-performance synthetics & technical knits',
    coverImage: 'https://media.base44.com/images/public/6aa4252f63cd2cf7a693af44/1d1f81319_generated_b934abc1.jpg',
    images: [
      { src: '/StitchStudioPictures/sports/sports-1.jpg', alt: 'Sports item 1' },
      { src: '/StitchStudioPictures/sports/sports-2.jpg', alt: 'Sports item 2' },
      { src: '/StitchStudioPictures/sports/sports-3.jpg', alt: 'Sports item 3' },
      { src: '/StitchStudioPictures/sports/sports-4.jpg', alt: 'Sports item 4' },
      { src: '/StitchStudioPictures/sports/sports-5.jpg', alt: 'Sports item 5' },
      { src: '/StitchStudioPictures/sports/sports-6.jpg', alt: 'Sports item 6' },
      { src: '/StitchStudioPictures/sports/sports-7.jpg', alt: 'Sports item 7' },
      { src: '/StitchStudioPictures/sports/sports-8.jpg', alt: 'Sports item 8' },
      { src: '/StitchStudioPictures/sports/sports-9.jpg', alt: 'Sports item 9' },
      { src: '/StitchStudioPictures/sports/sports-10.jpg', alt: 'Sports item 10' },
      { src: '/StitchStudioPictures/sports/sports-11.jpg', alt: 'Sports item 11' },
      { src: '/StitchStudioPictures/sports/sports-12.jpg', alt: 'Sports item 12' },
      { src: '/StitchStudioPictures/sports/sports-13.jpg', alt: 'Sports item 13' },
      { src: '/StitchStudioPictures/sports/sports-14.jpg', alt: 'Sports item 14' },
      { src: '/StitchStudioPictures/sports/sports-15.jpg', alt: 'Sports item 15' },
      { src: '/StitchStudioPictures/sports/sports-16.jpg', alt: 'Sports item 16' },
      { src: '/StitchStudioPictures/sports/sports-17.jpg', alt: 'Sports item 17' },
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
      { src: '/StitchStudioPictures/woven/woven-3.jpg', alt: 'Woven item 3' },
      { src: '/StitchStudioPictures/woven/woven-4.jpg', alt: 'Woven item 4' },
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
      { src: '/StitchStudioPictures/knit/knit-3.jpg', alt: 'Knit item 3' },
    ],
  },
];

export default function AtelierFabricSections() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [slideIndex, setSlideIndex] = useState(0);

  const openSlider = (category) => {
    setActiveCategory(category);
    setSlideIndex(0);
  };

  const handleNext = () => {
    if (!activeCategory) return;
    setSlideIndex((prev) => (prev + 1) % activeCategory.images.length);
  };

  const handlePrev = () => {
    if (!activeCategory) return;
    setSlideIndex((prev) => (prev - 1 + activeCategory.images.length) % activeCategory.images.length);
  };

  return (
    <section className="px-6 sm:px-10 py-24 max-w-[120rem] mx-auto">
      <div className="mb-12">
        <span className="font-mono-stitch text-[10px] tracking-[0.35em] uppercase text-white/40">Techniques</span>
        <h2 className="mt-4 font-display text-4xl sm:text-5xl text-white">Fabrications & Crafts</h2>
      </div>

      {/* Elegant Cover Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {FABRIC_CATEGORIES.map((cat, i) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            onClick={() => openSlider(cat)}
            className="group relative aspect-[4/5] rounded-lg overflow-hidden bg-[#111] border border-white/10 cursor-pointer"
          >
            <Image
              src={cat.coverImage}
              alt={cat.title}
              className="absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-105"
              fittingType="fill"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
              <span className="font-mono-stitch text-[10px] uppercase tracking-[0.2em] text-[#B08D57]">
                {cat.images.length} Dynamic Items Available
              </span>
              <h3 className="font-display text-2xl text-white mt-1">{cat.title}</h3>
              <p className="text-xs text-white/60 font-sans-stitch mt-1">{cat.subtitle}</p>
              <button
                type="button"
                className="mt-4 inline-flex items-center text-xs font-mono-stitch tracking-widest text-[#B08D57] uppercase group-hover:text-white transition-colors"
              >
                Explore Collection →
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Dynamic Slide Transition Modal (Supports Unlimited Images) */}
      <AnimatePresence>
        {activeCategory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[130] bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-12"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h4 className="font-display text-2xl text-white">{activeCategory.title}</h4>
                <p className="font-mono-stitch text-xs text-[#B08D57] tracking-widest uppercase">
                  Showing {slideIndex + 1} of {activeCategory.images.length}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveCategory(null)}
                className="p-2 text-white/50 hover:text-white transition-colors"
              >
                <X className="w-8 h-8" />
              </button>
            </div>

            {/* Slider Stage */}
            <div className="relative flex-1 flex items-center justify-center my-6 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={slideIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className="max-w-4xl max-h-[65vh] w-full h-full flex items-center justify-center"
                >
                  <Image
                    src={activeCategory.images[slideIndex].src}
                    alt={activeCategory.images[slideIndex].alt}
                    className="max-w-full max-h-full object-contain rounded-lg shadow-2xl border border-white/10"
                    fittingType="fit"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Prev / Next Arrows */}
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-[#B08D57] text-white p-4 rounded-full border border-white/20 transition-all"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-[#B08D57] text-white p-4 rounded-full border border-white/20 transition-all"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Thumbnails Bar */}
            <div className="flex gap-2 overflow-x-auto justify-center py-2 border-t border-white/10">
              {activeCategory.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSlideIndex(idx)}
                  className={`w-14 h-14 rounded overflow-hidden border-2 transition-all flex-shrink-0 ${
                    idx === slideIndex ? 'border-[#B08D57] scale-105' : 'border-transparent opacity-30 hover:opacity-100'
                  }`}
                >
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