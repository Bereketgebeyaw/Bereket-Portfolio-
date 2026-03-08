const nodemailer = require('nodemailer');

const EMAIL_USER = process.env.EMAIL_USER || 'gebeyawbereket8@gmail.com';
const EMAIL_PASS = process.env.EMAIL_PASS;
const EMAIL_FROM = process.env.EMAIL_FROM || EMAIL_USER;
const EMAIL_TO = process.env.EMAIL_TO || EMAIL_USER;
const EMAIL_PROVIDER = String(process.env.EMAIL_PROVIDER || 'gmail').toLowerCase();

if (!EMAIL_PASS) {
  console.warn('⚠️  EMAIL_PASS is not set. Mailer will fail until this is provided in environment variables.');
}

function createTransporter() {
  if (!EMAIL_PASS) return null;

  if (EMAIL_PROVIDER === 'gmail') {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS
      }
    });
  }

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const secure = String(process.env.SMTP_SECURE || '').toLowerCase() === 'true' || port === 465;

  if (!host) {
    console.warn('⚠️  SMTP_HOST is not set. Set EMAIL_PROVIDER=gmail or configure SMTP_HOST/SMTP_PORT.');
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS
    }
  });
}

let transporter = createTransporter();

async function verifyTransporter() {
  try {
    if (!transporter) {
      console.warn('⚠️  Mailer verify skipped: transporter is not configured (missing EMAIL_PASS)');
      return;
    }
    await transporter.verify();
    console.log('✅ Mailer: SMTP transporter is ready');
  } catch (err) {
    console.error('❌ Mailer verify failed:', err && err.message ? err.message : err);
  }
}

async function sendMail(options) {
  // options should include { from, to, subject, html, replyTo }
  if (!EMAIL_PASS) {
    throw new Error('EMAIL_PASS is not configured on the server');
  }
  if (!transporter) {
    transporter = createTransporter();
  }
  if (!transporter) {
    throw new Error('Email transporter could not be initialized (check EMAIL_PROVIDER/SMTP_HOST)');
  }
  return transporter.sendMail(options);
}

module.exports = { transporter, verifyTransporter, sendMail, EMAIL_USER, EMAIL_FROM, EMAIL_TO };
