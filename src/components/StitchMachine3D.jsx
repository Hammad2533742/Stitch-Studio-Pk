import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function StitchMachine3D({ onMachineClick }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative w-full py-12 flex items-center justify-center">
      {/* Background Radial Ambient Glow */}
      <div 
        className={`absolute w-72 h-72 rounded-full blur-[100px] transition-all duration-700 pointer-events-none ${
          isHovered ? 'bg-[#B08D57]/25 scale-125' : 'bg-[#B08D57]/10 scale-100'
        }`} 
      />

      {/* Interactive Debossed Monogram Emblem */}
      <motion.button
        type="button"
        onClick={onMachineClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="relative group cursor-pointer w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-[#0d0d0d] border border-white/10 p-2 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-500 focus:outline-none"
      >
        {/* Leather/Fabric Subtle Texture Layer */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none" />

        {/* Outer Metallic Ring */}
        <div className={`absolute inset-2 rounded-full border transition-all duration-500 ${
          isHovered ? 'border-[#B08D57] shadow-[0_0_25px_rgba(176,141,87,0.4)]' : 'border-white/10'
        }`} />

        {/* Inner Debossed Emblem Surface */}
        <div className="relative w-full h-full rounded-full bg-gradient-to-b from-[#141414] to-[#080808] flex flex-col items-center justify-center p-6 border border-black/80 shadow-inner">
          
          {/* Subtle Atelier Tag Top */}
          <span className="font-mono-stitch text-[8px] sm:text-[9px] tracking-[0.35em] uppercase text-[#B08D57] mb-2 transition-colors duration-300">
            STITCH STUDIO • ATELIER
          </span>

          {/* Gold Foil Embossed 'S' Monogram */}
          <div className="relative my-1">
            <h1 className={`font-display text-7xl sm:text-8xl tracking-widest transition-all duration-500 select-none ${
              isHovered 
                ? 'text-transparent bg-clip-text bg-gradient-to-b from-[#FFF0D0] via-[#E2C17C] to-[#B08D57] drop-shadow-[0_4px_12px_rgba(176,141,87,0.5)]' 
                : 'text-[#1a1a1a] drop-shadow-[0_2px_2px_rgba(255,255,255,0.05)]'
            }`}>
              S
            </h1>
            
            {/* Thread Cross-Stitch Accent Lines */}
            <div className={`absolute -top-1 -right-2 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-30'}`}>
              <Sparkles className="w-4 h-4 text-[#E2C17C]" />
            </div>
          </div>

          {/* Bottom Interactive Prompt */}
          <div className="mt-2 flex items-center gap-2">
            <span className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${isHovered ? 'bg-[#E2C17C] animate-ping' : 'bg-white/20'}`} />
            <span className={`font-mono-stitch text-[9px] tracking-[0.3em] uppercase transition-colors duration-300 ${
              isHovered ? 'text-white' : 'text-white/40'
            }`}>
              [ PRESS TO WEAVE ]
            </span>
          </div>
        </div>

        {/* Hover Rim Lighting Sweep */}
        <div className={`absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-[#B08D57]/20 to-transparent transition-opacity duration-500 pointer-events-none ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`} />
      </motion.button>
    </div>
  );
}