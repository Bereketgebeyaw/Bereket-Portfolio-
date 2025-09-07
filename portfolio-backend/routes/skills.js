const express = require('express');

const router = express.Router();

// Static skills data
const skills = [
  {
    category: "Frontend",
    skills: [
      { id: 1, name: "React", proficiency: 5 },
      { id: 2, name: "HTML5", proficiency: 5 },
      { id: 3, name: "CSS3", proficiency: 5 },
      { id: 4, name: "JavaScript", proficiency: 5 },
      { id: 5, name: "TypeScript", proficiency: 4 },
      { id: 6, name: "Responsive Design", proficiency: 5 }
    ]
  },
  {
    category: "Backend",
    skills: [
      { id: 7, name: "Node.js", proficiency: 5 },
      { id: 8, name: "Express", proficiency: 5 },
      { id: 9, name: ".NET", proficiency: 4 },
      { id: 10, name: "PostgreSQL", proficiency: 4 },
      { id: 11, name: "Database Design", proficiency: 4 },
      { id: 12, name: "API Development", proficiency: 5 }
    ]
  },
  {
    category: "Blockchain & Web3",
    skills: [
      { id: 13, name: "ICP (Internet Computer Protocol)", proficiency: 4 },
      { id: 14, name: "Web3 Development", proficiency: 4 },
      { id: 15, name: "Blockchain Development", proficiency: 4 },
      { id: 16, name: "Smart Contracts", proficiency: 3 }
    ]
  },
  {
    category: "Tools & Platforms",
    skills: [
      { id: 17, name: "Git", proficiency: 5 },
      { id: 18, name: "VS Code", proficiency: 5 },
      { id: 19, name: "Postman", proficiency: 4 },
      { id: 20, name: "Figma", proficiency: 3 },
      { id: 21, name: "Adobe XD", proficiency: 3 },
      { id: 22, name: "Docker", proficiency: 3 }
    ]
  }
];

// Get all skills grouped by category
router.get('/', (req, res) => {
  try {
    res.json({
      success: true,
      data: skills
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

module.exports = router;
