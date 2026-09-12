import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

// Main Gender Divisions
const GENDER_CATEGORIES = [
  { id: 'men', label: 'Men', folder: 'Men', spec: 'Tailored Architecture & Structural Fit' },
  { id: 'women', label: 'Women', folder: 'Women', spec: 'Fluid Silhouette & Precise Cut' },
  { id: 'kids', label: 'Kids', folder: 'Kids', spec: 'Soft Durability & Comfort Motion' },
];

// Independent Crafting Techniques (Regardless of Gender)
const TECHNIQUE_CATEGORIES = [
  { id: 'knitwear', label: 'Knitwear', folder: 'Knitwear', spec: 'Loop · Stretch · Comfort' },
  { id: 'wovenwear', label: 'Wovenwear', folder: 'Wovenwear', spec: 'Structure · Drape · Integrity' },
  { id: 'sportswear', label: 'Sportswear', folder: 'Sportswear', spec: 'Performance · Mesh · Motion' },
];

export default function Categories() {
  const [activeCategory, setActiveCategory] = useState(null);
  const galleryRef = useRef(null);

  // Dynamic image path resolver
  const getImagePath = (folderName, imgIndex) => {
    return `/StitchStudioPictures/${folderName}/image_${imgIndex}.jpeg`;
  };

  // Click handler: Sets category and smooth-scrolls to the gallery viewer
  const handleSelectCategory = (cat) => {
    setActiveCategory(cat);
    setTimeout(() => {
      galleryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <section
      id="categories"
      className="px-6 sm:px-10 py-24 sm:py-32 max-w-[120rem] mx-auto"
      aria-label="Material archive — crafting techniques"
    >
      {/* Header */}
      <div className="mb-16 max-w-3xl">
        <span className="font-mono-stitch text-[10px] tracking-[0.35em] uppercase text-[#B08D57]">
          The Archive Collection
        </span>
        <h2 className="mt-4 font-display text-4xl sm:text-6xl tracking-tight text-white">
          Explore by Division & Technique
        </h2>
        <p className="mt-4 text-white/50 font-sans-stitch text-base sm:text-lg">
          Select any division or crafting technique below to view its dedicated photo archive.
        </p>
      </div>

      {/* SECTION 1: MAIN GENDER DIVISIONS (Men, Women, Kids) */}
      <div className="mb-20">
        <h3 className="font-mono-stitch text-xs tracking-[0.3em] uppercase text-white/40 mb-6 flex items-center gap-3">
          <span className="w-6 h-px bg-[#B08D57]" />
          Divisions
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {GENDER_CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              onClick={() => handleSelectCategory(cat)}
              className={`group relative overflow-hidden rounded-sm border cursor-pointer transition-all ${
                activeCategory?.id === cat.id
                  ? 'border-[#B08D57] ring-1 ring-[#B08D57]'
                  : 'border-white/10 bg-[#111]'
              }`}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-black/40">
                <img
                  src={getImagePath(cat.folder, 1)}
                  alt={cat.label}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    // Automatic fallback try for .jpg if .jpeg fails
                    if (e.target.src.endsWith('.jpeg')) {
                      e.target.src = `/StitchStudioPictures/${cat.folder}/image_1.jpg`;
                    } else {
                      e.target.src = 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80';
                    }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-70" />
              </div>

              <div className="p-6 flex flex-col gap-2">
                <span className="font-mono-stitch text-[10px] tracking-[0.25em] uppercase text-[#B08D57]">
                  {cat.spec}
                </span>
                <h4 className="font-display text-3xl text-white">{cat.label}</h4>
                <span className="font-mono-stitch text-[10px] tracking-[0.25em] uppercase text-white/50 group-hover:text-white transition-colors">
                  View {cat.label} Archive →
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* SECTION 2: INDEPENDENT FABRIC TECHNIQUES (Knitwear, Wovenwear, Sportswear) */}
      <div>
        <h3 className="font-mono-stitch text-xs tracking-[0.3em] uppercase text-white/40 mb-6 flex items-center gap-3">
          <span className="w-6 h-px bg-[#B08D57]" />
          Crafting Techniques
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TECHNIQUE_CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              onClick={() => handleSelectCategory(cat)}
              className={`group relative overflow-hidden rounded-sm border cursor-pointer transition-all ${
                activeCategory?.id === cat.id
                  ? 'border-[#B08D57] ring-1 ring-[#B08D57]'
                  : 'border-white/10 bg-[#111]'
              }`}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-black/40">
                <img
                  src={getImagePath(cat.folder, 1)}
                  alt={cat.label}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    // Automatic fallback try for .jpg if .jpeg fails
                    if (e.target.src.endsWith('.jpeg')) {
                      e.target.src = `/StitchStudioPictures/${cat.folder}/image_1.jpg`;
                    } else {
                      e.target.src = 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80';
                    }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-70" />
              </div>

              <div className="p-6 flex flex-col gap-2">
                <span className="font-mono-stitch text-[10px] tracking-[0.25em] uppercase text-[#B08D57]">
                  {cat.spec}
                </span>
                <h4 className="font-display text-3xl text-white">{cat.label}</h4>
                <span className="font-mono-stitch text-[10px] tracking-[0.25em] uppercase text-white/50 group-hover:text-white transition-colors">
                  View {cat.label} Archive →
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* DYNAMIC GALLERY REVEAL (Triggers when clicking any card above) */}
      {activeCategory && (
        <motion.div
          ref={galleryRef}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-20 pt-12 border-t border-white/10"
        >
          <div className="flex justify-between items-center mb-8">
            <div>
              <span className="font-mono-stitch text-[10px] tracking-[0.25em] uppercase text-[#B08D57]">
                Selected Category
              </span>
              <h3 className="font-display text-3xl text-white mt-1">
                {activeCategory.label} Picture Gallery
              </h3>
            </div>
            <button
              onClick={() => setActiveCategory(null)}
              className="font-mono-stitch text-xs tracking-[0.2em] uppercase text-white/40 hover:text-white border border-white/10 px-4 py-2 rounded transition-colors"
            >
              Close Gallery [✕]
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[1, 2, 3].map((imgIndex) => (
              <div
                key={imgIndex}
                className="relative aspect-[3/4] overflow-hidden rounded border border-white/10 bg-[#111] group"
              >
                <img
                  src={getImagePath(activeCategory.folder, imgIndex)}
                  alt={`${activeCategory.label} specimen ${imgIndex}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    // Try .jpg fallback if .jpeg fails
                    if (e.target.src.endsWith('.jpeg')) {
                      e.target.src = `/StitchStudioPictures/${activeCategory.folder}/image_${imgIndex}.jpg`;
                    } else {
                      e.target.src = 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=600&q=80';
                    }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                <span className="absolute bottom-4 left-4 font-mono-stitch text-[10px] text-[#B08D57] uppercase tracking-widest">
                  {activeCategory.label} — Specimen 0{imgIndex}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </section>
  );
}