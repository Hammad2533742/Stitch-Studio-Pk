import { Mail, Phone, MapPin } from 'lucide-react';

// Update once the mailbox + real number/address are live
const CONTACT_EMAIL = 'creative@stitchstudiopk.com';
const CONTACT_PHONE = '+92 322 2888338';
const CONTACT_ADDRESS = 'Lahore, Pakistan';

export default function ContactCard() {
  return (
    <div className="bg-panel border border-ink/10 rounded-sm p-8 sm:p-10">
      <h3 className="font-display text-3xl text-ink">Get in touch</h3>
      <p className="mt-4 text-ink/70 font-sans-stitch text-sm leading-relaxed max-w-sm">
        If you have any questions about our services or need help with an order,
        fill out the form and we'll get back to you within 1 business day.
      </p>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center shrink-0">
            <Mail className="w-4 h-4 text-gold" aria-hidden="true" />
          </div>
          <div>
            <p className="font-mono-stitch text-[10px] tracking-[0.2em] uppercase text-ink/50">Email</p>
            <a href={`mailto:${CONTACT_EMAIL}`} className="mt-1 block text-sm text-ink hover:text-gold transition-colors font-sans-stitch">
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center shrink-0">
            <Phone className="w-4 h-4 text-gold" aria-hidden="true" />
          </div>
          <div>
            <p className="font-mono-stitch text-[10px] tracking-[0.2em] uppercase text-ink/50">Phone</p>
            <a href={`tel:${CONTACT_PHONE.replace(/\s/g, '')}`} className="mt-1 block text-sm text-ink hover:text-gold transition-colors font-sans-stitch">
              {CONTACT_PHONE}
            </a>
          </div>
        </div>

        <div className="flex items-start gap-3 sm:col-span-2">
          <div className="w-10 h-10 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center shrink-0">
            <MapPin className="w-4 h-4 text-gold" aria-hidden="true" />
          </div>
          <div>
            <p className="font-mono-stitch text-[10px] tracking-[0.2em] uppercase text-ink/50">Address</p>
            <p className="mt-1 text-sm text-ink font-sans-stitch">{CONTACT_ADDRESS}</p>
          </div>
        </div>
      </div>
    </div>
  );
}