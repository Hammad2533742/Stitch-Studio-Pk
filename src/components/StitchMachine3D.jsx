import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function StitchMachine3D({ onMachineClick }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative w-full py-12 flex items-center justify-center">
      <div className={`absolute w-72 h-72 rounded-full blur-[100px] transition-all duration-700 pointer-events-none ${isHovered ? 'bg-gold/25 scale-125' : 'bg-gold/10 scale-100'}`} />

      <motion.button
        type="button"
        onClick={onMachineClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="relative group cursor-pointer w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-ink border border-canvas/10 p-2 shadow-[0_20px_50px_rgba(43,33,24,0.4)] overflow-hidden transition-all duration-500 focus:outline-none"
      >
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none" />

        <div className={`absolute inset-2 rounded-full border transition-all duration-500 ${isHovered ? 'border-gold shadow-[0_0_25px_rgba(156,122,70,0.4)]' : 'border-canvas/10'}`} />

        <div className="relative w-full h-full rounded-full bg-gradient-to-b from-ink to-[#1C140D] flex flex-col items-center justify-center p-6 border border-black/40 shadow-inner">
          <span className="font-mono-stitch text-[8px] sm:text-[9px] tracking-[0.35em] uppercase text-gold mb-2 transition-colors duration-300">
            STITCH STUDIO • ATELIER
          </span>

          <div className="relative my-1">
            <h1 className={`font-display text-7xl sm:text-8xl tracking-widest transition-all duration-500 select-none ${isHovered ? 'text-transparent bg-clip-text bg-gradient-to-b from-[#FFF0D0] via-[#E2C17C] to-gold drop-shadow-[0_4px_12px_rgba(156,122,70,0.5)]' : 'text-[#1C140D]'}`}>
              S
            </h1>
            <div className={`absolute -top-1 -right-2 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-30'}`}>
              <Sparkles className="w-4 h-4 text-[#E2C17C]" />
            </div>
          </div>

          <div className="mt-2 flex items-center gap-2">
            <span className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${isHovered ? 'bg-[#E2C17C] animate-ping' : 'bg-canvas/20'}`} />
            <span className={`font-mono-stitch text-[9px] tracking-[0.3em] uppercase transition-colors duration-300 ${isHovered ? 'text-canvas' : 'text-canvas/40'}`}>
              [ PRESS TO WEAVE ]
            </span>
          </div>
        </div>

        <div className={`absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-gold/20 to-transparent transition-opacity duration-500 pointer-events-none ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
      </motion.button>
    </div>
  );
}