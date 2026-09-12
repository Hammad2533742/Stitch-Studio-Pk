import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';

const SUGGESTIONS = [
  'What divisions do you manufacture for?',
  'What is your delivery timeline?',
  'What is your MOQ?',
  'Do you do home textiles?',
];

const INTRO =
  "Welcome to the Stitch Studio atelier. Ask me about our divisions, techniques, timelines, or manufacturing — I'll answer from our knowledge base. Anything else goes straight to our team.";

// SECURITY: Hard limits to prevent abuse / large payloads
const MAX_QUESTION_LENGTH = 500;
const MAX_EMAIL_LENGTH = 254; // RFC 5321

// SECURITY: Simple email format check — full validation happens server-side
const isValidEmail = (v) => !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: 'bot', text: INTRO }]);
  const [input, setInput] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading, open]);

  const send = useCallback(
    async (text) => {
      const q = (text ?? input).trim();
      if (!q || loading) return;

      // SECURITY: Enforce question length limit
      if (q.length > MAX_QUESTION_LENGTH) {
        setMessages((m) => [
          ...m,
          { role: 'bot', text: `Please keep your question under ${MAX_QUESTION_LENGTH} characters.` },
        ]);
        return;
      }

      // SECURITY: Validate email before sending
      const trimmedEmail = email.trim();
      if (trimmedEmail && !isValidEmail(trimmedEmail)) {
        setEmailError('Please enter a valid email address.');
        return;
      }
      setEmailError('');

      setMessages((m) => [...m, { role: 'user', text: q }]);
      setInput('');
      setLoading(true);

      try {
        const res = await base44.functions.invoke('StitchChatbot', {
          question: q,
          // SECURITY: Only send email if provided and valid
          email: trimmedEmail || undefined,
        });

        const data = res?.data || {};
        // SECURITY: Only use known safe fields from the response
        const reply =
          data.status === 'answered'
            ? String(data.answer || '').trim() ||
              "I couldn't find an answer in our knowledge base."
            : typeof data.message === 'string'
            ? data.message
            : "I couldn't answer that from our knowledge base, so I've forwarded it to creative@stitchstudiopk.com.";

        setMessages((m) => [
          ...m,
          { role: 'bot', text: reply, routed: data.status === 'routed' },
        ]);
      } catch {
        // SECURITY: Never expose raw error details to the user
        setMessages((m) => [
          ...m,
          {
            role: 'bot',
            text: 'Something went wrong reaching the atelier. Please try again or email creative@stitchstudiopk.com.',
          },
        ]);
      } finally {
        setLoading(false);
      }
    },
    [input, email, loading]
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        send();
      }
    },
    [send]
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full bg-[#B08D57] text-[#0a0a0a] flex items-center justify-center shadow-lg shadow-black/40 hover:scale-105 transition-transform"
        aria-label={open ? 'Close chat concierge' : 'Open chat concierge'}
        aria-expanded={open}
        aria-controls="chatbot-panel"
      >
        {open ? <X className="w-6 h-6" aria-hidden="true" /> : <MessageCircle className="w-6 h-6" aria-hidden="true" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id="chatbot-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Stitch Studio Concierge"
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 right-5 z-50 w-[92vw] max-w-sm h-[70vh] max-h-[560px] bg-[#0a0a0a]/95 backdrop-blur-md border border-white/15 rounded-lg flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-white/10 flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-full bg-[#B08D57]/15 border border-[#B08D57]/40 flex items-center justify-center"
                aria-hidden="true"
              >
                <span className="w-2 h-2 rounded-full bg-[#B08D57] animate-pulse" />
              </div>
              <div>
                <div className="font-display text-lg text-white leading-none">
                  Stitch Studio Concierge
                </div>
                <div className="font-mono-stitch text-[9px] tracking-[0.25em] uppercase text-white/40 mt-1">
                  RAG · Atelier knowledge base
                </div>
              </div>
            </div>

            {/* Message thread */}
            <div
              ref={scrollRef}    // FIX: was ref__
              className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
              role="log"
              aria-live="polite"
              aria-label="Chat messages"
            >
              {messages.map((m, i) => (
                <div key={i} className={m.role === 'user' ? 'flex justify-end' : 'flex justify-start'}>
                  <div
                    className={
                      m.role === 'user'
                        ? 'max-w-[80%] bg-[#B08D57] text-[#0a0a0a] text-sm px-4 py-2.5 rounded-2xl rounded-br-sm'
                        : 'max-w-[85%] bg-white/5 border border-white/10 text-white/85 text-sm px-4 py-2.5 rounded-2xl rounded-bl-sm'
                    }
                  >
                    {/* SECURITY: Text rendered via JSX — no dangerouslySetInnerHTML, XSS-safe */}
                    {m.text}
                    {m.routed && (
                      <div className="mt-2 pt-2 border-t border-white/10 font-mono-stitch text-[9px] tracking-[0.2em] uppercase text-[#B08D57]">
                        Forwarded → creative@stitchstudiopk.com
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start" aria-label="Thinking…">
                  <div className="bg-white/5 border border-white/10 px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1.5">
                    {[0, 1, 2].map((d) => (
                      <span
                        key={d}
                        className="w-1.5 h-1.5 rounded-full bg-white/50 animate-bounce"
                        style={{ animationDelay: `${d * 0.15}s` }}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quick-start suggestions */}
            {messages.length <= 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-2" aria-label="Suggested questions">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => send(s)}
                    className="font-mono-stitch text-[9px] tracking-[0.15em] uppercase text-white/70 border border-white/15 px-3 py-1.5 rounded-full hover:bg-[#B08D57] hover:text-[#0a0a0a] hover:border-[#B08D57] transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Optional email field */}
            <div className="px-4 pb-1">
              <label htmlFor="chatbot-email" className="sr-only">
                Your email (optional)
              </label>
              <input
                id="chatbot-email"
                type="email"
                value={email}
                onChange={(e) => {
                  // SECURITY: Enforce email length limit
                  if (e.target.value.length <= MAX_EMAIL_LENGTH) {
                    setEmail(e.target.value);
                    setEmailError('');
                  }
                }}
                placeholder="Your email (optional — so we can reply)"
                autoComplete="email"
                className="w-full bg-transparent border border-white/10 rounded-md px-3 py-2 text-xs text-white/80 placeholder:text-white/30 focus:outline-none focus:border-[#B08D57]"
                aria-describedby={emailError ? 'chatbot-email-error' : undefined}
              />
              {emailError && (
                <p id="chatbot-email-error" className="mt-1 text-[10px] text-red-400 font-mono-stitch">
                  {emailError}
                </p>
              )}
            </div>

            {/* Input row */}
            <div className="p-3 border-t border-white/10 flex items-center gap-2">
              <label htmlFor="chatbot-input" className="sr-only">
                Ask the atelier
              </label>
              <input
                id="chatbot-input"
                value={input}
                onChange={(e) => {
                  // SECURITY: Enforce question length limit silently
                  if (e.target.value.length <= MAX_QUESTION_LENGTH) {
                    setInput(e.target.value);
                  }
                }}
                onKeyDown={handleKeyDown}
                placeholder="Ask the atelier…"
                maxLength={MAX_QUESTION_LENGTH}
                className="flex-1 bg-transparent text-sm text-white placeholder:text-white/30 focus:outline-none"
                aria-label="Your question"
              />
              <button
                type="button"
                onClick={() => send()}
                disabled={loading || !input.trim()}
                className="w-9 h-9 rounded-full bg-[#B08D57] text-[#0a0a0a] flex items-center justify-center disabled:opacity-40 hover:scale-105 transition-transform"
                aria-label="Send message"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                ) : (
                  <Send className="w-4 h-4" aria-hidden="true" />
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
