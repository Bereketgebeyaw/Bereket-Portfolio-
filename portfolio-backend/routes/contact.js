const express = require('express');
const { body, validationResult } = require('express-validator');
const pool = require('../config/database');

const router = express.Router();

// Submit contact form
router.post('/', [
  body('name').trim().isLength({ min: 1, max: 255 }).withMessage('Name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('subject').trim().isLength({ min: 1, max: 255 }).withMessage('Subject is required'),
  body('message').trim().isLength({ min: 1, max: 2000 }).withMessage('Message is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { name, email, subject, message } = req.body;

    const result = await pool.query(`
      INSERT INTO contact_messages (name, email, subject, message)
      VALUES ($1, $2, $3, $4)
      RETURNING id, created_at
    `, [name, email, subject, message]);

    res.status(201).json({
      success: true,
      message: 'Message sent successfully!',
      data: {
        id: result.rows[0].id,
        submittedAt: result.rows[0].created_at
      }
    });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to send message',
      message: 'An error occurred while sending your message. Please try again later.'
    });
  }
});

// Get all contact messages (admin)
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM contact_messages ORDER BY created_at DESC');
    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch messages',
      message: error.message
    });
  }
});

module.exports = router;
