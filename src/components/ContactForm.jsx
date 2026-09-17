import { useState, useCallback } from 'react';
import { Loader2, CheckCircle2 } from 'lucide-react';

const MAX = { name: 80, email: 100, phone: 30, message: 1000 };

export default function ContactForm() {
  const [values, setValues] = useState({ firstName: '', lastName: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const update = useCallback((field, max) => (e) => {
    setValues((prev) => ({ ...prev, [field]: e.target.value.slice(0, max) }));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!values.lastName.trim()) {
      setError('Last name is required.');
      return;
    }
    setError('');
    setStatus('submitting');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.status === 'ok') {
        setStatus('success');
        setValues({ firstName: '', lastName: '', email: '', phone: '', message: '' });
      } else {
        setStatus('error');
        setError(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setError('Something went wrong. Please try again.');
    }
  }, [values]);

  if (status === 'success') {
    return (
      <div className="bg-panel border border-ink/10 rounded-sm p-8 sm:p-10 flex flex-col items-center text-center gap-3">
        <CheckCircle2 className="w-8 h-8 text-gold" aria-hidden="true" />
        <p className="font-display text-2xl text-ink">Thank you</p>
        <p className="text-sm text-ink/70 font-sans-stitch">
          We've received your message and will be in touch within 1 business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-panel border border-ink/10 rounded-sm p-8 sm:p-10 grid grid-cols-1 sm:grid-cols-2 gap-5">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="firstName" className="font-mono-stitch text-[10px] tracking-[0.2em] uppercase text-ink/60">First Name</label>
        <input id="firstName" value={values.firstName} onChange={update('firstName', MAX.name)} maxLength={MAX.name}
          className="bg-canvas border border-ink/15 rounded-sm px-3 py-2.5 text-sm text-ink focus:outline-none focus:border-gold" />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="lastName" className="font-mono-stitch text-[10px] tracking-[0.2em] uppercase text-ink/60">
          Last Name <span className="text-gold">*</span>
        </label>
        <input id="lastName" required value={values.lastName} onChange={update('lastName', MAX.name)} maxLength={MAX.name}
          className="bg-canvas border border-ink/15 rounded-sm px-3 py-2.5 text-sm text-ink focus:outline-none focus:border-gold" />
      </div>

      <div className="flex flex-col gap-1.5 sm:col-span-2">
        <label htmlFor="email" className="font-mono-stitch text-[10px] tracking-[0.2em] uppercase text-ink/60">Email <span className="text-gold">*</span></label>
        <input id="email" type="email" required value={values.email} onChange={update('email', MAX.email)} maxLength={MAX.email}
          className="bg-canvas border border-ink/15 rounded-sm px-3 py-2.5 text-sm text-ink focus:outline-none focus:border-gold" />
      </div>

      <div className="flex flex-col gap-1.5 sm:col-span-2">
        <label htmlFor="phone" className="font-mono-stitch text-[10px] tracking-[0.2em] uppercase text-ink/60">Phone</label>
        <input id="phone" value={values.phone} onChange={update('phone', MAX.phone)} maxLength={MAX.phone}
          className="bg-canvas border border-ink/15 rounded-sm px-3 py-2.5 text-sm text-ink focus:outline-none focus:border-gold" />
      </div>

      <div className="flex flex-col gap-1.5 sm:col-span-2">
        <label htmlFor="message" className="font-mono-stitch text-[10px] tracking-[0.2em] uppercase text-ink/60">Message <span className="text-gold">*</span></label>
        <textarea id="message" required rows={4} value={values.message} onChange={update('message', MAX.message)} maxLength={MAX.message}
          className="bg-canvas border border-ink/15 rounded-sm px-3 py-2.5 text-sm text-ink focus:outline-none focus:border-gold resize-none" />
      </div>

      {error && <p className="sm:col-span-2 text-xs text-red-700 font-mono-stitch">{error}</p>}

      <div className="sm:col-span-2">
        <button type="submit" disabled={status === 'submitting'}
          className="w-full bg-ink text-canvas font-mono-stitch text-xs tracking-[0.2em] uppercase px-6 py-3.5 hover:bg-gold transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
          {status === 'submitting' && <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />}
          Submit
        </button>
      </div>
    </form>
  );
}
