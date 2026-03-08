const express = require('express');
const { body, validationResult } = require('express-validator');
const { sendMail, EMAIL_FROM, EMAIL_TO } = require('../utils/mailer');

const router = express.Router();

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (ch) => {
    switch (ch) {
      case '&': return '&amp;';
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '"': return '&quot;';
      case "'": return '&#39;';
      default: return ch;
    }
  });
}

// Submit contact form
router.post('/', [
  body('name').trim().isLength({ min: 1, max: 255 }).withMessage('Name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('subject').trim().isLength({ min: 1, max: 255 }).withMessage('Subject is required'),
  body('message').trim().isLength({ min: 1, max: 2000 }).withMessage('Message is required')
], async (req, res) => {
  try {
    // Log incoming request for debugging (will appear in server logs)
    console.log('Incoming contact request:', {
      ip: req.ip,
      body: req.body && {
        name: req.body.name,
        email: req.body.email,
        subject: req.body.subject
        // intentionally not logging full message to avoid large logs
      }
    });
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { name, email, subject, message } = req.body;
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeSubject = escapeHtml(subject);
    const safeMessageHtml = escapeHtml(message).replace(/\n/g, '<br>');

    // Email content
    const mailOptions = {
      from: EMAIL_FROM,
      to: EMAIL_TO, // receive messages at the configured email
      subject: `Portfolio Contact: ${safeSubject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Subject:</strong> ${safeSubject}</p>
        <p><strong>Message:</strong></p>
        <p>${safeMessageHtml}</p>
        <hr>
        <p><em>This message was sent from your portfolio contact form.</em></p>
      `,
      replyTo: email // So you can reply directly to the person who contacted you
    };

    // Send email using shared mailer
    await sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: 'Message sent successfully! I\'ll get back to you soon.'
    });

  } catch (error) {
    // Log full stack for debugging
    console.error('Error sending email:', error && error.stack ? error.stack : error);
    // Always return a short, safe error message so the frontend can show what went wrong
    const safeMessage = error && error.message
      ? String(error.message).slice(0, 300)
      : 'An error occurred while sending your message. Please try again later.';
    res.status(500).json({
      success: false,
      error: 'Failed to send message',
      message: safeMessage
    });
  }
});

module.exports = router;
