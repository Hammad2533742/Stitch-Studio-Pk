import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

// Maps to your /StitchStudioPictures directory dynamically
const GALLERY_DATA = {
  mens: [
    { src: 'https://media.base44.com/images/public/6aa4252f63cd2cf7a693af44/1d1f81319_generated_b934abc1.jpg', title: "Men's Outerwear" },
    { src: '/StitchStudioPictures/mens/mens-1.jpg', title: "Men's Tailoring" },
    { src: '/StitchStudioPictures/mens/mens-2.jpg', title: "Men's Casual Wear" },
    { src: '/StitchStudioPictures/mens/mens-3.jpg', title: "Men's Knitwear" },
  ],
  womens: [
    { src: 'https://media.base44.com/images/public/6aa4252f63cd2cf7a693af44/d0e7b4c8f_generated_22b82780.jpg', title: "Women's Couture" },
    { src: '/StitchStudioPictures/womens/womens-1.jpg', title: "Women's Essentials" },
    { src: '/StitchStudioPictures/womens/womens-2.jpg', title: "Women's Evening Wear" },
  ],
  kids: [
    { src: 'https://media.base44.com/images/public/6aa4252f63cd2cf7a693af44/731f4f629_generated_c6024d9c.jpg', title: "Kid's Wear" },
    { src: '/StitchStudioPictures/kids/kids-1.jpg', title: "Kid's Knitwear" },
  ],
};

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
  const [activeDivision, setActiveDivision] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const openGallery = (divisionId) => {
    setActiveDivision(divisionId);
    setActiveImageIndex(0);
  };

  const currentGallery = activeDivision ? GALLERY_DATA[activeDivision] || [] : [];

  const handleNext = () => {
    setActiveImageIndex((prev) => (prev + 1) % currentGallery.length);
  };

  const handlePrev = () => {
    setActiveImageIndex((prev) => (prev - 1 + currentGallery.length) % currentGallery.length);
  };

  return (
    <section id="divisions" className="px-6 sm:px-10 py-24 sm:py-32 max-w-[120rem] mx-auto">
      <div className="mb-12 sm:mb-16">
        <span className="font-mono-stitch text-[10px] tracking-[0.35em] uppercase text-white/40">Section 02</span>
        <h2 className="mt-4 font-display text-4xl sm:text-5xl tracking-tight text-white">The divisions</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {ITEMS.map((item, i) => (
          <motion.button
            key={item.id}
            type="button"
            onClick={() => openGallery(item.id)}
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: i * 0.1 }}
            className="group relative block aspect-[3/4] overflow-hidden rounded-sm bg-[#111] border border-white/10 text-left cursor-pointer w-full"
          >
            <Image src={item.img} alt={item.label} className="absolute inset-0 w-full h-full transition-transform duration-[1.2s] group-hover:scale-105" fittingType="fill" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/90 via-[#0a0a0a]/20 to-transparent" />
            <div className="absolute inset-0 p-6 flex flex-col justify-end">
              <h3 className="font-display text-3xl text-white">{item.label}</h3>
              <p className="mt-2 text-sm text-white/60 font-sans-stitch">{item.copy}</p>
              <span className="mt-4 font-mono-stitch text-[10px] tracking-[0.25em] uppercase text-[#B08D57]">
                View Gallery ({GALLERY_DATA[item.id]?.length || 0}) →
              </span>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Full-Screen Interactive Lightbox Gallery */}
      <AnimatePresence>
        {activeDivision && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col justify-between p-6 sm:p-10"
          >
            {/* Gallery Header */}
            <div className="flex items-center justify-between text-white border-b border-white/10 pb-4">
              <span className="font-mono-stitch text-xs uppercase tracking-[0.2em] text-[#B08D57]">
                {activeDivision}'s Gallery — Image {activeImageIndex + 1} of {currentGallery.length}
              </span>
              <button
                type="button"
                onClick={() => setActiveDivision(null)}
                className="p-2 text-white/60 hover:text-white transition-colors"
                aria-label="Close Lightbox"
              >
                <X className="w-8 h-8" />
              </button>
            </div>

            {/* Lightbox Main Image Frame */}
            <div className="relative flex-1 flex items-center justify-center my-6 overflow-hidden">
              {currentGallery.length > 0 && (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeImageIndex}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                    className="relative max-w-5xl max-h-[70vh] w-full h-full flex items-center justify-center"
                  >
                    <Image
                      src={currentGallery[activeImageIndex].src}
                      alt={currentGallery[activeImageIndex].title}
                      className="max-w-full max-h-full object-contain rounded-md shadow-2xl"
                      fittingType="fit"
                    />
                  </motion.div>
                </AnimatePresence>
              )}

              {/* Navigation Controls */}
              {currentGallery.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-[#B08D57] text-white p-3 rounded-full border border-white/20 transition-all"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-[#B08D57] text-white p-3 rounded-full border border-white/20 transition-all"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Navigation Bar */}
            <div className="flex gap-3 overflow-x-auto justify-center py-2 border-t border-white/10">
              {currentGallery.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${
                    idx === activeImageIndex ? 'border-[#B08D57] scale-105' : 'border-transparent opacity-40 hover:opacity-100'
                  }`}
                >
                  <Image src={img.src} alt={img.title} className="w-full h-full object-cover" fittingType="fill" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}