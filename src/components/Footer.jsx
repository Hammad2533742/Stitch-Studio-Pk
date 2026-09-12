import { Image } from '@/components/ui/image';
import Ticker from './Ticker';

const LOGO_URL =
  'https://media.base44.com/images/public/user_6aa30c9b7d4d3ee19d78fa98/44904353d_stitch_profile_photo.jpg';

const DIVISIONS = ["Men's", "Women's", "Kid's"];
const TECHNIQUES = ['Knit', 'Woven', 'Sportswear'];

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/10" aria-label="Site footer">
      <Ticker />

      <div className="px-6 sm:px-10 pt-16 pb-10 max-w-[120rem] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-white/10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-full overflow-hidden ring-1 ring-white/20 bg-white/5">
                <Image
                  src={LOGO_URL}
                  alt="Stitch Studio logo"
                  className="w-full h-full object-cover"
                  fittingType="fit"
                />
              </div>
              <div>
                <span className="block font-display text-xl text-white">
                  Stitch Studio<span className="text-[#B08D57]">®</span>
                </span>
                <span className="block font-mono-stitch text-[10px] tracking-[0.3em] uppercase text-white/40 mt-1">
                  Atelier · Since 2019
                </span>
              </div>
            </div>
            <p className="text-sm text-white/50 font-sans-stitch max-w-xs">
              A luxury fashion-manufacturing atelier. Men's, women's, and kid's across knit, woven,
              and sportswear. Delivery from 7 working days.
            </p>
          </div>

          {/* Divisions & Techniques nav */}
          <nav aria-label="Footer navigation — divisions and techniques">
            <span className="font-mono-stitch text-[10px] tracking-[0.3em] uppercase text-white/40">
              Divisions
            </span>
            <ul className="mt-5 space-y-3 font-sans-stitch text-sm text-white/70">
              {DIVISIONS.map((l) => (
                <li key={l}>
                  {/* FIX: href was href__ */}
                  <a href="#divisions" className="hover:text-[#B08D57] transition-colors">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
            <span className="block mt-6 font-mono-stitch text-[10px] tracking-[0.3em] uppercase text-white/40">
              Techniques
            </span>
            <ul className="mt-5 space-y-3 font-sans-stitch text-sm text-white/70">
              {TECHNIQUES.map((l) => (
                <li key={l}>
                  <a href={`#${l.toLowerCase()}`} className="hover:text-[#B08D57] transition-colors">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Partner */}
          <div>
            <span className="font-mono-stitch text-[10px] tracking-[0.3em] uppercase text-white/40">
              Partner
            </span>
            <p className="mt-5 text-sm text-white/70 font-sans-stitch">
              Home textile &amp; canvas — Nadir Saidjan Industries.
            </p>
            {/* FIX: href was href__; rel already correct */}
            <a
              href="https://nadirsaidjan.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-[#B08D57] hover:text-white transition-colors font-mono-stitch text-xs tracking-[0.2em] uppercase"
            >
              nadirsaidjan.com →
            </a>
            <div className="h-px w-24 bg-[#B08D57] mt-6" aria-hidden="true" />
          </div>
        </div>

        {/* Wordmark + copyright */}
        <h2 className="pt-8 font-display text-[12vw] md:text-[7vw] font-bold tracking-tighter leading-none text-white/90" aria-hidden="true">
          STITCH STUDIO®
        </h2>
        <p className="mt-6 font-mono-stitch text-[10px] tracking-[0.3em] uppercase text-white/40">
          © {new Date().getFullYear()} Stitch Studio Atelier — Engineered for Android, iOS &amp; Windows.
        </p>
      </div>
    </footer>
  );
}
