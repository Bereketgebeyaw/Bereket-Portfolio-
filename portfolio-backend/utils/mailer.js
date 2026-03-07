const nodemailer = require('nodemailer');

const EMAIL_USER = process.env.EMAIL_USER || 'gebeyawbereket8@gmail.com';
const EMAIL_PASS = process.env.EMAIL_PASS;

if (!EMAIL_PASS) {
  console.warn('⚠️  EMAIL_PASS is not set. Mailer will fail until this is provided in environment variables.');
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS
  }
});

async function verifyTransporter() {
  try {
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
  return transporter.sendMail(options);
}

module.exports = { transporter, verifyTransporter, sendMail, EMAIL_USER };
