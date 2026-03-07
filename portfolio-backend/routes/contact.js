const express = require('express');
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');

const router = express.Router();

// Create email transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'gebeyawbereket8@gmail.com',
      pass: process.env.EMAIL_PASS
    }
  });
};

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

    // Create email transporter
    const transporter = createTransporter();

    // Email content
    const mailOptions = {
      from: 'gebeyawbereket8@gmail.com',
      to: 'gebeyawbereket8@gmail.com', // Your email where you want to receive messages
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><em>This message was sent from your portfolio contact form.</em></p>
      `,
      replyTo: email // So you can reply directly to the person who contacted you
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: 'Message sent successfully! I\'ll get back to you soon.'
    });

  } catch (error) {
    // Log full stack for debugging
    console.error('Error sending email:', error && error.stack ? error.stack : error);
    // In development, return the error message to help debugging
    const devMessage = process.env.NODE_ENV === 'development' ? (error && error.message ? error.message : String(error)) : 'An error occurred while sending your message. Please try again later.';
    res.status(500).json({
      success: false,
      error: 'Failed to send message',
      message: devMessage
    });
  }
});

module.exports = router;
