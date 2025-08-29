import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, Linkedin, Github, Globe, MessageCircle } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus(null), 3000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <Mail size={24} />,
      title: 'Email',
      value: 'gebeyawbereket8@gmail.com',
      link: 'mailto:gebeyawbereket8@gmail.com'
    },

    {
      icon: <MapPin size={24} />,
      title: 'Location',
      value: 'Addis Ababa, Ethiopia',
      link: null
    }
  ];

  const socialLinks = [
    {
      icon: <Linkedin size={24} />,
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/bereket-g-a8b728234/',
      color: '#0077b5'
    },
    {
      icon: <Github size={24} />,
      name: 'GitHub',
      url: 'https://github.com/Bereketgebeyaw',
      color: '#333'
    },
    {
      icon: <Globe size={24} />,
      name: 'Website',
      url: 'https://example.com',
      color: '#007acc'
    }
  ];

  return (
    <div className="contact">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="contact-header"
        >
          <h1>Get In Touch</h1>
          <p>Let's work together on your next project</p>
        </motion.div>

        <div className="contact-content">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="contact-info"
          >
            <h2>Let's Connect</h2>
            <p>
              I'm always interested in hearing about new opportunities and exciting projects. 
              Whether you have a question or just want to say hi, feel free to reach out!
            </p>
            
            <div className="info-items">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  className="info-item"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="info-icon">{info.icon}</div>
                  <div className="info-content">
                    <h3>{info.title}</h3>
                    {info.link ? (
                      <a href={info.link} className="info-link">{info.value}</a>
                    ) : (
                      <span>{info.value}</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="social-section">
              <h3>Follow Me</h3>
              <div className="social-links">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    style={{ '--social-color': social.color }}
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="contact-form-container"
          >
            <div className="form-header">
              <MessageCircle size={32} />
              <h2>Send Message</h2>
            </div>

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="What's this about?"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  placeholder="Tell me about your project..."
                />
              </div>

              <motion.button
                type="submit"
                className="submit-btn"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <span className="loading">Sending...</span>
                ) : (
                  <>
                    <Send size={20} />
                    Send Message
                  </>
                )}
              </motion.button>

              {submitStatus === 'success' && (
                <motion.div
                  className="success-message"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  Thank you! Your message has been sent successfully.
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="additional-info"
        >
          <div className="info-card">
            <h3>Response Time</h3>
            <p>I typically respond to messages within 24 hours during business days.</p>
          </div>
          <div className="info-card">
            <h3>Availability</h3>
            <p>I'm currently available for freelance projects and full-time opportunities.</p>
          </div>
          <div className="info-card">
            <h3>Let's Collaborate</h3>
            <p>Whether it's a small project or a large application, I'd love to hear about it!</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
