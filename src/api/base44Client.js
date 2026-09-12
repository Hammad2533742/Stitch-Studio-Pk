const fallback = { functions: { invoke: async (_name, { question }) => ({ data: { status: 'answered', answer: `Thanks for your question about ${question}. Our concierge service is being connected; please email creative@stitchstudiopk.com for a tailored response.` } }) } };
export const base44 = window.base44 ?? fallback;
