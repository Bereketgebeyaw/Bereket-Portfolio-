const express = require('express');
const { body, validationResult } = require('express-validator');
const pool = require('../config/database');

const router = express.Router();

// Get all skills grouped by category
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT category, 
             array_agg(json_build_object('id', id, 'name', name, 'proficiency', proficiency)) as skills
      FROM skills 
      GROUP BY category 
      ORDER BY category
    `);

    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('Error fetching skills:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch skills',
      message: error.message
    });
  }
});

// Add new skill
router.post('/', [
  body('category').trim().isLength({ min: 1, max: 100 }).withMessage('Category is required'),
  body('name').trim().isLength({ min: 1, max: 255 }).withMessage('Skill name is required'),
  body('proficiency').isInt({ min: 1, max: 5 }).withMessage('Proficiency must be between 1 and 5')
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

    const { category, name, proficiency } = req.body;

    const result = await pool.query(`
      INSERT INTO skills (category, name, proficiency)
      VALUES ($1, $2, $3)
      RETURNING *
    `, [category, name, proficiency]);

    res.status(201).json({
      success: true,
      message: 'Skill added successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error adding skill:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to add skill',
      message: error.message
    });
  }
});

module.exports = router;
