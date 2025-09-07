import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Code, Palette, Database, Globe, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const skills = [
    { icon: <Code />, title: 'Frontend Development', description: 'React, HTML5, CSS3, JavaScript' },
    { icon: <Palette />, title: 'UI/UX Design', description: 'Figma, Adobe XD, Responsive Design' },
    { icon: <Database />, title: 'Backend Development', description: 'Node.js, .NET, PostgreSQL' },
    { icon: <Globe />, title: 'Web3 & Blockchain', description: 'ICP, Smart Contracts, Blockchain Development' },
    { icon: <Globe />, title: 'Full Stack Solutions', description: 'E-commerce, Job Boards, Asset Management' }
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-text"
          >
            <h1 className="hero-title">
              Hi, I'm <span className="highlight">Berekete Gebeyaw</span>
            </h1>
            <h2 className="hero-subtitle">Full Stack & Web3 Developer</h2>
            <p className="hero-description">
              I design and implement functional websites and applications including company sites, 
              e-commerce platforms, job boards, asset management systems, and fashion design websites. 
              I specialize in React, Node.js, PostgreSQL, .NET, Web3 technologies, and blockchain development using ICP.
            </p>
            <div className="hero-buttons">
              <Link to="/projects">
                <motion.button
                  className="btn btn-primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View My Work
                  <ArrowRight size={20} />
                </motion.button>
              </Link>
              <Link to="/contact">
                <motion.button
                  className="btn btn-secondary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get In Touch
                </motion.button>
              </Link>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hero-visual"
          >
            <div className="hero-image">
              <div className="floating-card">
                <Code size={48} />
                <span>Full Stack</span>
              </div>
              <div className="floating-card">
                <Zap size={48} />
                <span>Web3</span>
              </div>
              <div className="floating-card">
                <Database size={48} />
                <span>Web Apps</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="skills">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="section-header"
          >
            <h2>What I Do</h2>
            <p>I specialize in creating modern web applications with cutting-edge technologies</p>
          </motion.div>

          <div className="skills-grid">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                className="skill-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <div className="skill-icon">{skill.icon}</div>
                <h3>{skill.title}</h3>
                <p>{skill.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="cta-content"
          >
            <h2>Ready to Start Your Project?</h2>
            <p>Let's work together to bring your ideas to life</p>
            <Link to="/contact">
              <motion.button
                className="btn btn-primary btn-large"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Let's Talk
                <ArrowRight size={20} />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
