import React from 'react';
import { motion } from 'framer-motion';
import { Download, Mail, Linkedin, Github, Globe } from 'lucide-react';
import './About.css';

const About = () => {
  const experiences = [
    {
      title: 'Full Stack Software Developer',
      company: 'Freelance/Client Projects',
      description: 'Designing and implementing functional websites including company sites, e-commerce platforms, job boards, asset management systems, and fashion design websites.'
    },
    {
      title: 'Full Stack Developer',
      company: 'Various Client Projects',
      description: 'Built and maintained multiple client projects including e-commerce sites, job boards, and asset management platforms using React, Node.js, PostgreSQL, and .NET.'
    },
    {
      title: 'Web Developer',
      company: 'Freelance Development',
      description: 'Created responsive and functional websites for various clients, specializing in modern web technologies and user experience design.'
    }
  ];

  const education = [
    {
      year: '2020 - 2024',
      degree: 'Bachelor of Information Systems',
      school: 'Addis Ababa University',
      description: 'Specialized in Information Systems and Software Development'
    }
  ];

  const skills = [
    { category: 'Frontend', items: ['React', 'HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'Responsive Design'] },
    { category: 'Backend', items: ['Node.js', 'Express', '.NET', 'PostgreSQL', 'Database Design', 'API Development'] },
    { category: 'Tools & Platforms', items: ['Git', 'VS Code', 'Postman', 'Figma', 'Adobe XD', 'Docker'] }
  ];

  return (
    <div className="about">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="about-header"
        >
          <h1>About Me</h1>
          <p>Get to know me better</p>
        </motion.div>

        {/* Personal Info */}
        <section className="personal-info">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="info-content"
          >
            <div className="profile-section">
              <div className="profile-image">
                <img 
                  src="/portfolio-photo.jpg" 
                  alt="Berekete Gebeyaw - Full Stack Developer"
                  className="profile-photo"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="image-placeholder" style={{ display: 'none' }}>
                  <Globe size={64} />
                </div>
              </div>
              <div className="profile-details">
                <h2>Berekete Gebeyaw</h2>
                <h3>Full Stack Software Developer</h3>
                <p>
                  I'm a passionate developer with expertise in designing and implementing 
                  functional websites and applications. I specialize in company sites, 
                  e-commerce platforms, job boards, asset management systems, and fashion 
                  design websites using React, Node.js, PostgreSQL, .NET and other modern technologies.
                </p>
                <div className="profile-actions">
                  <button 
                    className="btn btn-primary"
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = '/resume/Bereket Gebeyaw resume.pdf';
                      link.download = 'Bereket Gebeyaw resume.pdf';
                      link.target = '_blank';
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                  >
                    <Download size={20} />
                    Download CV
                  </button>
                  <div className="social-links">
                    <a href="mailto:gebeyawbereket8@gmail.com" className="social-link">
                      <Mail size={20} />
                    </a>
                    <a href="https://www.linkedin.com/in/bereket-g-a8b728234/" target="_blank" rel="noopener noreferrer" className="social-link">
                      <Linkedin size={20} />
                    </a>
                    <a href="https://github.com/Bereketgebeyaw" target="_blank" rel="noopener noreferrer" className="social-link">
                      <Github size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Experience */}
        <section className="experience">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="section-content"
          >
            <h2>Work Experience</h2>
            <div className="timeline">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  className="timeline-item"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <h3>{exp.title}</h3>
                    <h4>{exp.company}</h4>
                    <p>{exp.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Education */}
        <section className="education">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="section-content"
          >
            <h2>Education</h2>
            <div className="timeline">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  className="timeline-item"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <div className="timeline-year">{edu.year}</div>
                    <h3>{edu.degree}</h3>
                    <h4>{edu.school}</h4>
                    <p>{edu.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Skills */}
        <section className="skills-section">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="section-content"
          >
            <h2>Skills & Technologies</h2>
            <div className="skills-grid">
              {skills.map((skillGroup, index) => (
                <motion.div
                  key={index}
                  className="skill-group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h3>{skillGroup.category}</h3>
                  <div className="skill-tags">
                    {skillGroup.items.map((skill, skillIndex) => (
                      <span key={skillIndex} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default About;
