const { Resend } = require('resend');

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const EMAIL_USER = process.env.EMAIL_USER || 'gebeyawbereket8@gmail.com';
const EMAIL_FROM = process.env.EMAIL_FROM || 'onboarding@resend.dev';
const EMAIL_TO = process.env.EMAIL_TO || EMAIL_USER;

if (!RESEND_API_KEY) {
  console.warn('⚠️  RESEND_API_KEY is not set. Mailer will fail until this is provided in environment variables.');
}

const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

async function verifyTransporter() {
  try {
    if (!resend) {
      console.warn('⚠️  Mailer verify skipped: RESEND_API_KEY is not configured');
      return;
    }
    // Lightweight call to confirm API key works
    await resend.apiKeys.list();
    console.log('✅ Mailer: Resend API key is valid');
  } catch (err) {
    console.error('❌ Mailer verify failed:', err && err.message ? err.message : err);
  }
}

async function sendMail(options) {
  // options should include { from, to, subject, html, replyTo }
  if (!resend) {
    throw new Error('RESEND_API_KEY is not configured on the server');
  }

  const from = options.from || EMAIL_FROM;
  const to = options.to || EMAIL_TO;
  const replyTo = options.replyTo || options.reply_to;

  const { data, error } = await resend.emails.send({
    from,
    to,
    subject: options.subject,
    html: options.html,
    replyTo
  });

  if (error) {
    throw new Error(error.message || 'Failed to send email via Resend');
  }

  return data;
}

module.exports = { resend, verifyTransporter, sendMail, EMAIL_USER, EMAIL_FROM, EMAIL_TO };
