import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';

export default function SewingMascotOverlay({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Subtle Ambient Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[150] bg-black/60 backdrop-blur-md cursor-pointer"
          />

          {/* Luxury Garment Label / Atelier Signature Tag */}
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 bottom-0 z-[160] w-full max-w-md bg-[#0d0d0d] border-l border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.9)] p-8 sm:p-12 flex flex-col justify-between overflow-hidden"
          >
            {/* Background Texture & Liquid Metallic Weave Line */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
            
            {/* Animated Metallic Thread Running Down Left Border */}
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: '100%' }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
              className="absolute left-0 top-0 w-1 bg-gradient-to-b from-[#B08D57] via-[#E2C17C] to-[#B08D57] shadow-[0_0_12px_#B08D57]"
            />

            {/* Top Bar / Close Trigger */}
            <div className="flex items-center justify-between z-10 border-b border-white/10 pb-6">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#B08D57] animate-pulse" />
                <span className="font-mono-stitch text-[10px] tracking-[0.3em] uppercase text-white/50">
                  ATELIER SPECIFICATION
                </span>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-2 text-white/40 hover:text-white transition-colors bg-white/5 hover:bg-white/10 rounded-full"
                aria-label="Close atelier specification"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Garment Care Spec Body */}
            <div className="my-auto z-10 space-y-8">
              {/* Season & Batch Stamp */}
              <div className="flex justify-between items-end border-b border-white/5 pb-4">
                <div>
                  <span className="font-mono-stitch text-[9px] uppercase tracking-widest text-[#B08D57]">
                    LOT NO.
                  </span>
                  <p className="font-mono-stitch text-xs text-white tracking-widest">STITCH-2026-X</p>
                </div>
                <div className="text-right">
                  <span className="font-mono-stitch text-[9px] uppercase tracking-widest text-[#B08D57]">
                    CRAFT
                  </span>
                  <p className="font-mono-stitch text-xs text-white tracking-widest">HIGH-PRECISION</p>
                </div>
              </div>

              {/* Embroidered Brand Monogram Header */}
              <div className="relative py-8 px-6 bg-black/60 rounded-xl border border-white/10 overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-[#B08D57]/10 via-transparent to-transparent opacity-50" />
                
                <span className="font-mono-stitch text-[9px] uppercase tracking-[0.35em] text-[#B08D57] block mb-2">
                  REGISTERED TRADEMARK
                </span>
                
                <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-[0.15em] text-transparent bg-clip-text bg-gradient-to-r from-white via-[#E2C17C] to-[#B08D57]">
                  STITCH STUDIO
                </h2>

                <p className="font-mono-stitch text-[10px] text-white/40 tracking-[0.25em] uppercase mt-2">
                  FULL-SCALE GARMENT MANUFACTURING
                </p>
              </div>

              {/* Technical Specifications List */}
              <div className="space-y-4 font-mono-stitch text-xs">
                <div className="flex justify-between text-white/70">
                  <span>DIVISIONS:</span>
                  <span className="text-white font-sans-stitch font-medium">Men's • Women's • Kid's</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>FABRICATIONS:</span>
                  <span className="text-white font-sans-stitch font-medium">Sports • Woven • Knit</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>OPERATIONS:</span>
                  <span className="text-white font-sans-stitch font-medium">Seamless • Cut & Sew</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>FINISHING:</span>
                  <span className="text-[#B08D57] font-sans-stitch font-medium">Gold Grade Standard</span>
                </div>
              </div>
            </div>

            {/* Bottom Luxury Footer Stamp */}
            <div className="z-10 border-t border-white/10 pt-6 flex items-center justify-between">
              <div className="flex items-center gap-2 text-white/40 font-mono-stitch text-[10px] tracking-widest uppercase">
                <Sparkles className="w-3.5 h-3.5 text-[#B08D57]" />
                <span>ORIGINAL GARMENT TAG</span>
              </div>
              <span className="font-mono-stitch text-[10px] text-[#B08D57] tracking-widest">
                EST. FLOOR
              </span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}