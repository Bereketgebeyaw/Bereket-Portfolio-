import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Code, Globe, Database } from 'lucide-react';
import './Projects.css';

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: 'Backmarket E-Commerce Platform',
      description: 'A full-stack e-commerce solution with React frontend, Node.js backend, and PostgreSQL database.',
      image: '/api/placeholder/400/300',
      category: 'fullstack',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Express'],
      github: 'https://github.com/Bereketgebeyaw/Backmarket_mentor',
      live: null,
      features: ['User authentication', 'Product management', 'Shopping cart', 'Payment integration']
    },
    {
      id: 2,
      title: 'Amhara Jobs - Job Board Platform',
      description: 'A comprehensive job board application connecting employers and job seekers with advanced search and filtering. Built for the Ethiopian job market.',
      image: '/api/placeholder/400/300',
      category: 'fullstack',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Express'],
      github: 'https://github.com/Bereketgebeyaw/AmharaJobs',
      live: 'https://amharajobs.vercel.app/',
      features: ['Job posting', 'Advanced search', 'Application tracking', 'Employer dashboard', 'Ethiopian market focus']
    },
    {
      id: 3,
      title: 'Asset Management Platform',
      description: 'A robust asset management system for tracking and managing company resources and inventory. Built with .NET 9.0, React, and PostgreSQL.',
      image: '/api/placeholder/400/300',
      category: 'fullstack',
      technologies: ['React', '.NET 9.0', 'PostgreSQL', 'C#', 'Entity Framework'],
      github: 'https://github.com/Bereketgebeyaw/asset_management',
      live: null,
      features: ['Asset tracking', 'Inventory management', 'Reporting', 'User permissions', 'JWT Authentication']
    },
    {
      id: 4,
      title: 'Mentor Website',
      description: 'A professional mentor website built with modern web technologies. Features responsive design and user-friendly interface.',
      image: '/api/placeholder/400/300',
      category: 'frontend',
      technologies: ['EJS', 'CSS', 'JavaScript', 'Node.js', 'Responsive Design'],
      github: 'https://github.com/Bereketgebeyaw/Mentor',
      live: null,
      features: ['Responsive design', 'Professional layout', 'Modern UI/UX', 'Cross-browser compatibility']
    },
    {
      id: 7,
      title: 'KITE LLC - Company Website',
      description: 'A modern, responsive company website for KITE LLC, an IT solution provider based in Dubai. Features professional design and comprehensive business information.',
      image: '/api/placeholder/400/300',
      category: 'frontend',
      technologies: ['React', 'HTML5', 'CSS3', 'Responsive Design', 'Bootstrap'],
      github: 'https://github.com/Bereketgebeyaw',
      live: 'https://www.kitellc.net/',
      features: ['Responsive design', 'Business services showcase', 'Contact forms', 'SEO optimized', 'Professional branding']
    },
    {
      id: 5,
      title: 'Fashion Design Website',
      description: 'A creative fashion design platform showcasing designs and managing fashion portfolios.',
      image: '/api/placeholder/400/300',
      category: 'fullstack',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Image handling'],
      github: 'https://github.com/Bereketgebeyaw',
      live: null,
      features: ['Portfolio showcase', 'Design management', 'Image galleries', 'Client collaboration']
    },
    {
      id: 6,
      title: 'API Development Services',
      description: 'Custom API development for various client needs using modern backend technologies.',
      image: '/api/placeholder/400/300',
      category: 'backend',
      technologies: ['Node.js', 'Express', 'PostgreSQL', 'REST APIs'],
      github: 'https://github.com/Bereketgebeyaw',
      live: null,
      features: ['RESTful APIs', 'Database design', 'Authentication', 'Documentation']
    }
  ];

  const categories = [
    { key: 'all', label: 'All Projects', icon: <Code /> },
    { key: 'frontend', label: 'Frontend', icon: <Globe /> },
    { key: 'backend', label: 'Backend', icon: <Database /> },
    { key: 'fullstack', label: 'Full Stack', icon: <Code /> }
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  return (
    <div className="projects">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="projects-header"
        >
          <h1>My Projects</h1>
          <p>Here are some of the projects I've worked on</p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="filters"
        >
          <div className="filter-buttons">
            {categories.map((category) => (
              <motion.button
                key={category.key}
                className={`filter-btn ${filter === category.key ? 'active' : ''}`}
                onClick={() => setFilter(category.key)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.icon}
                {category.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="projects-grid"
        >
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="project-card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                onClick={() => setSelectedProject(project)}
              >
                <div className="project-image">
                  <div className="image-placeholder">
                    <Code size={48} />
                  </div>
                  <div className="project-overlay">
                    <span>Click to view details</span>
                  </div>
                </div>
                <div className="project-content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-tech">
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <span key={techIndex} className="tech-tag">{tech}</span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="tech-tag">+{project.technologies.length - 3}</span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              className="project-modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                className="project-modal"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="modal-header">
                  <h2>{selectedProject.title}</h2>
                  <button 
                    className="close-btn"
                    onClick={() => setSelectedProject(null)}
                  >
                    ×
                  </button>
                </div>
                
                <div className="modal-content">
                  <div className="modal-image">
                    <div className="image-placeholder">
                      <Code size={64} />
                    </div>
                  </div>
                  
                  <div className="modal-details">
                    <p className="modal-description">{selectedProject.description}</p>
                    
                    <div className="modal-tech">
                      <h4>Technologies Used:</h4>
                      <div className="tech-tags">
                        {selectedProject.technologies.map((tech, index) => (
                          <span key={index} className="tech-tag">{tech}</span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="modal-features">
                      <h4>Key Features:</h4>
                      <ul>
                        {selectedProject.features.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="modal-links">
                      <a 
                        href={selectedProject.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn btn-secondary"
                      >
                        <Github size={20} />
                        View Code
                      </a>
                      {selectedProject.live && (
                        <a 
                          href={selectedProject.live} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="btn btn-primary"
                        >
                          <ExternalLink size={20} />
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Projects;
