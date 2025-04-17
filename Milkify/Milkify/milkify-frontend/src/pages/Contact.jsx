import React, { useState } from 'react';
import '../styles/pages.css';
import Sidebar from "../components/Sidebar";
import Header from '../components/Header';
import { Mail, Phone, MapPin } from 'lucide-react';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/contact', formData);
      setStatus('✅ Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Contact form error:', error);
      setStatus('❌ Something went wrong. Please try again later.');
    }
    
  };

  return (
    <div className="supplier-page">
      <Sidebar />
      <main className="supplier-main">
        <div className="page-container contact-container">
          <h2 className="page-title">Contact Us</h2>

          <div className="contact-grid">
            {/* 📞 Contact Info */}
            <div className="contact-info card-box">
              <h3>Get in Touch</h3>
              <ul className="contact-list">
                <li><Mail className="icon" /> support@milkify.com</li>
                <li><Phone className="icon" /> +91 98765 43210</li>
                <li><MapPin className="icon" /> 123 Dairy Lane, Village Town, India</li>
                <li><a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer">
                  <img src="/whatsapp-icon.svg" alt="WhatsApp" className="icon" /> Chat on WhatsApp
                </a></li>
                <li><a href="https://instagram.com/milkifyapp" target="_blank" rel="noopener noreferrer">
                  <img src="/instagram-icon.svg" alt="Instagram" className="icon" /> Follow us on Instagram
                </a></li>
              </ul>
            </div>

            {/* 📬 Contact Form */}
            <div className="contact-form card-box">
              <h3>Send a Message</h3>
              <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
                <textarea name="message" rows="5" placeholder="Your Message..." value={formData.message} onChange={handleChange} required></textarea>
                <button type="submit">Send</button>
                {status && <p className="status-msg">{status}</p>}
              </form>
            </div>
          </div>

          {/* 🗺️ Map Embed */}
          <div className="map-box card-box">
            <h3>Visit Us</h3>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.9028726353494!2d85.1376!3d25.5941!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed58c55b4446b9%3A0xc6841d1b39f0cf38!2sPatna%2C%20Bihar%20800001!5e0!3m2!1sen!2sin!4v1713366101512"
              width="100%"
              height="250"
              style={{ border: 0, borderRadius: "8px" }}
              allowFullScreen=""
              loading="lazy"
              title="Google Map"
            ></iframe>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;
