const express = require('express');

const router = express.Router();

// Static projects data
const projects = [
  {
    id: 1,
    title: "E-commerce Platform",
    description: "A full-stack e-commerce platform built with React, Node.js, and PostgreSQL. Features include user authentication, product management, shopping cart, and payment integration.",
    image_url: "/images/ecommerce.jpg",
    category: "Web Application",
    technologies: ["React", "Node.js", "PostgreSQL", "Express", "Stripe"],
    github_url: "https://github.com/Bereketgebeyaw/ecommerce-platform",
    live_url: "https://ecommerce-demo.com",
    features: ["User Authentication", "Product Management", "Shopping Cart", "Payment Processing", "Admin Dashboard"],
    created_at: "2024-01-15T10:00:00Z"
  },
  {
    id: 2,
    title: "Job Board Application",
    description: "A comprehensive job board platform where employers can post jobs and job seekers can apply. Built with modern web technologies.",
    image_url: "/images/jobboard.jpg",
    category: "Web Application",
    technologies: ["React", "Node.js", "MongoDB", "Express", "JWT"],
    github_url: "https://github.com/Bereketgebeyaw/job-board",
    live_url: "https://jobboard-demo.com",
    features: ["Job Posting", "Application Management", "User Profiles", "Search & Filter", "Email Notifications"],
    created_at: "2024-02-20T10:00:00Z"
  },
  {
    id: 3,
    title: "Asset Management System",
    description: "A system for managing company assets including inventory tracking, maintenance schedules, and reporting features.",
    image_url: "/images/asset-management.jpg",
    category: "Management System",
    technologies: [".NET", "C#", "SQL Server", "Entity Framework", "Bootstrap"],
    github_url: "https://github.com/Bereketgebeyaw/asset-management",
    live_url: "https://asset-management-demo.com",
    features: ["Asset Tracking", "Maintenance Scheduling", "Reporting", "User Management", "Dashboard"],
    created_at: "2024-03-10T10:00:00Z"
  },
  {
    id: 4,
    title: "Fashion Design Website",
    description: "A modern, responsive website for a fashion design company showcasing their portfolio and services.",
    image_url: "/images/fashion-design.jpg",
    category: "Portfolio Website",
    technologies: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "jQuery"],
    github_url: "https://github.com/Bereketgebeyaw/fashion-design-site",
    live_url: "https://fashion-design-demo.com",
    features: ["Responsive Design", "Portfolio Gallery", "Contact Form", "Service Showcase", "Modern UI"],
    created_at: "2024-04-05T10:00:00Z"
  }
];

// Get all projects
router.get('/', (req, res) => {
  try {
    const { category } = req.query;
    let filteredProjects = projects;

    if (category && category !== 'all') {
      filteredProjects = projects.filter(project => 
        project.category.toLowerCase() === category.toLowerCase()
      );
    }

    res.json({
      success: true,
      data: filteredProjects,
      count: filteredProjects.length
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
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const project = projects.find(p => p.id === parseInt(id));

    if (!project) {
      return res.status(404).json({
        success: false,
        error: 'Project not found'
      });
    }

    res.json({
      success: true,
      data: project
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

// Get project categories
router.get('/categories/list', (req, res) => {
  try {
    const categories = [...new Set(projects.map(project => project.category))];
    
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
