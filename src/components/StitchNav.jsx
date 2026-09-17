import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Image } from '@/components/ui/image';

const LOGO_URL =
  'https://media.base44.com/images/public/user_6aa30c9b7d4d3ee19d78fa98/44904353d_stitch_profile_photo.jpg';

const LINKS = [
  { label: "Men's", href: '#divisions' },
  { label: "Women's", href: '#divisions' },
  { label: "Kid's", href: '#divisions' },
  { label: 'Home Textile', href: '#home-textile' },
];

export default function StitchNav() {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);
  const toggle = useCallback(() => setOpen((o) => !o), []);

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 bg-canvas/80 backdrop-blur-md border-b border-ink/10">
        <div className="flex items-center justify-between px-5 sm:px-8 h-16">
          <a href="#top" className="flex items-center gap-3" aria-label="Stitch Studio — home">
            <div className="w-9 h-9 rounded-full overflow-hidden ring-1 ring-ink/15 bg-ink/5">
              <Image
                src={LOGO_URL}
                alt="Stitch Studio logo"
                className="w-full h-full object-cover"
                fittingType="fit"
              />
            </div>
            <span className="font-display text-xl tracking-tight text-ink">
              Stitch Studio<span className="text-gold">®</span>
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-8" aria-label="Primary navigation">
            {LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="font-mono-stitch text-[11px] tracking-[0.2em] uppercase text-ink/70 hover:text-ink transition-colors"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              className="font-mono-stitch text-[11px] tracking-[0.2em] uppercase text-ink border border-ink/30 px-5 py-2.5 hover:bg-ink hover:text-canvas transition-colors"
            >
              Inquire
            </a>
          </nav>

          <button
            onClick={toggle}
            className="md:hidden text-ink p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-canvas flex flex-col"
          >
            <div className="flex items-center justify-between px-5 h-16 border-b border-ink/10">
              <span className="font-display text-xl text-ink">Stitch Studio®</span>
              <button
                onClick={close}
                className="text-ink p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 flex flex-col justify-center px-6 gap-2" aria-label="Mobile navigation">
              {[...LINKS, { label: 'Contact', href: '#contact' }].map((l, i) => (
                <motion.a
                  key={l.label}
                  href={l.href}
                  onClick={close}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="font-display text-4xl text-ink py-3 border-b border-ink/10 hover:text-gold"
                >
                  {l.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}