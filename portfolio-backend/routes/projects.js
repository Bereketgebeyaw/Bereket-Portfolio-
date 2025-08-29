const express = require('express');
const { body, validationResult } = require('express-validator');
const pool = require('../config/database');

const router = express.Router();

// Get all projects
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    let query = 'SELECT * FROM projects ORDER BY created_at DESC';
    let params = [];

    if (category && category !== 'all') {
      query = 'SELECT * FROM projects WHERE category = $1 ORDER BY created_at DESC';
      params = [category];
    }

    const result = await pool.query(query, params);
    res.json({
      success: true,
      data: result.rows,
      count: result.rows.length
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch projects',
      message: error.message
    });
  }
});

// Get project by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM projects WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Project not found'
      });
    }

    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch project',
      message: error.message
    });
  }
});

// Create new project
router.post('/', [
  body('title').trim().isLength({ min: 1, max: 255 }).withMessage('Title is required and must be less than 255 characters'),
  body('description').trim().isLength({ min: 1 }).withMessage('Description is required'),
  body('category').trim().isLength({ min: 1 }).withMessage('Category is required'),
  body('technologies').isArray({ min: 1 }).withMessage('At least one technology is required'),
  body('github_url').optional().isURL().withMessage('GitHub URL must be a valid URL'),
  body('live_url').optional().isURL().withMessage('Live URL must be a valid URL')
], async (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const {
      title,
      description,
      image_url,
      category,
      technologies,
      github_url,
      live_url,
      features
    } = req.body;

    const result = await pool.query(`
      INSERT INTO projects (title, description, image_url, category, technologies, github_url, live_url, features)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `, [title, description, image_url, category, technologies, github_url, live_url, features]);

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create project',
      message: error.message
    });
  }
});

// Update project
router.put('/:id', [
  body('title').optional().trim().isLength({ min: 1, max: 255 }).withMessage('Title must be less than 255 characters'),
  body('description').optional().trim().isLength({ min: 1 }).withMessage('Description cannot be empty'),
  body('category').optional().trim().isLength({ min: 1 }).withMessage('Category cannot be empty'),
  body('technologies').optional().isArray({ min: 1 }).withMessage('At least one technology is required'),
  body('github_url').optional().isURL().withMessage('GitHub URL must be a valid URL'),
  body('live_url').optional().isURL().withMessage('Live URL must be a valid URL')
], async (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { id } = req.params;
    const updateFields = [];
    const values = [];
    let paramCount = 1;

    // Build dynamic update query
    Object.keys(req.body).forEach(key => {
      if (req.body[key] !== undefined) {
        updateFields.push(`${key} = $${paramCount}`);
        values.push(req.body[key]);
        paramCount++;
      }
    });

    if (updateFields.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'No fields to update'
      });
    }

    // Add updated_at timestamp
    updateFields.push(`updated_at = CURRENT_TIMESTAMP`);
    
    // Add ID to values array
    values.push(id);

    const query = `
      UPDATE projects 
      SET ${updateFields.join(', ')}
      WHERE id = $${paramCount}
      RETURNING *
    `;

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Project not found'
      });
    }

    res.json({
      success: true,
      message: 'Project updated successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update project',
      message: error.message
    });
  }
});

// Delete project
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM projects WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Project not found'
      });
    }

    res.json({
      success: true,
      message: 'Project deleted successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete project',
      message: error.message
    });
  }
});

// Get project categories
router.get('/categories/list', async (req, res) => {
  try {
    const result = await pool.query('SELECT DISTINCT category FROM projects ORDER BY category');
    const categories = result.rows.map(row => row.category);
    
    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch categories',
      message: error.message
    });
  }
});

module.exports = router;
