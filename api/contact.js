const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const value = (input, limit) => String(input ?? '').slice(0, limit).trim();

async function sendEmail({ subject, text }) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !from || !to) {
    throw new Error('Email service is not configured.');
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from, to: [to], subject, text }),
  });

  if (!response.ok) throw new Error('Email service request failed.');
}

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ error: 'Method not allowed.' });
  }

  const firstName = value(request.body?.firstName, 80);
  const lastName = value(request.body?.lastName, 80);
  const email = value(request.body?.email, 100);
  const phone = value(request.body?.phone, 30);
  const message = value(request.body?.message, 1000);

  if (!lastName || !email || !message) {
    return response.status(400).json({ error: 'Last name, email, and message are required.' });
  }
  if (!EMAIL_REGEX.test(email)) {
    return response.status(400).json({ error: 'Enter a valid email address.' });
  }

  try {
    await sendEmail({
      subject: `New Stitch Studio enquiry — ${firstName} ${lastName}`.trim(),
      text: `Name: ${firstName} ${lastName}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\n\nMessage:\n${message}`,
    });
    return response.status(200).json({ status: 'ok' });
  } catch {
    return response.status(503).json({ error: 'We could not send your message right now. Please email creative@stitchstudiopk.com.' });
  }
}
