const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_QUESTION_LENGTH = 500;
const INSTRUCTIONS = `You are the concierge for Stitch Studio, a luxury fashion-manufacturing atelier in Pakistan. Answer only from these facts: Stitch Studio manufactures men's, women's, and kid's wear; techniques are sportswear, woven, and knit; timelines start at 7 working days; fabrics include fleece, jersey, terry, suede, viscose, polyester, nylon, bubble, memory, twill cotton, and linen; home textiles are manufactured with Nadir Saidjan Industries; contact is creative@stitchstudiopk.com. Keep answers warm, concise, and under 90 words. If the answer is not covered by these facts, reply with exactly: ESCALATE`;

const textValue = (input, limit) => String(input ?? '').slice(0, limit).trim();

async function sendEscalation(question, email) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !from || !to) return false;

  const result = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from,
      to: [to],
      subject: 'New Stitch Studio chat enquiry',
      text: `Question:\n${question}\n\nVisitor email: ${email || 'Not provided'}`,
    }),
  });
  return result.ok;
}

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ error: 'Method not allowed.' });
  }

  const question = textValue(request.body?.question, MAX_QUESTION_LENGTH);
  const email = textValue(request.body?.email, 254);
  if (!question) return response.status(400).json({ error: 'A question is required.' });
  if (email && !EMAIL_REGEX.test(email)) return response.status(400).json({ error: 'Enter a valid email address.' });
  if (!process.env.OPENAI_API_KEY) return response.status(503).json({ error: 'The concierge is being configured. Please email creative@stitchstudiopk.com.' });

  try {
    const openaiResponse = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-5-mini',
        instructions: INSTRUCTIONS,
        input: question,
        max_output_tokens: 180,
        store: false,
      }),
    });
    if (!openaiResponse.ok) throw new Error('OpenAI request failed.');
    const result = await openaiResponse.json();
    const answer = String(result.output_text ?? '').trim();

    if (answer !== 'ESCALATE' && answer) {
      return response.status(200).json({ status: 'answered', answer });
    }

    const delivered = await sendEscalation(question, email);
    return response.status(200).json({
      status: 'routed',
      message: delivered
        ? "Great question — I've forwarded it to our atelier team. They'll get back to you shortly."
        : 'For a tailored answer, please email creative@stitchstudiopk.com.',
    });
  } catch {
    return response.status(503).json({ error: 'The concierge is unavailable right now. Please email creative@stitchstudiopk.com.' });
  }
}
