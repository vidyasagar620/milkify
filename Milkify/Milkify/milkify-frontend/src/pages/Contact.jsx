import React from 'react';
import '../styles/pages.css';
import Sidebar from "../components/Sidebar";
import Header from '../components/Header';

const Contact = () => {
  return (
    <div className="supplier-page">
      <Sidebar/>
      <main className="supplier-main">
      <Header/>
    <div className="page-container">
      <h2 className="page-title">Contact Us</h2>
      <div className="card-box">
        <p className="card-text">Have questions? Reach out to us!</p>
        <ul className="card-list">
          <li><strong>Email:</strong> support@milkify.com</li>
          <li><strong>Phone:</strong> +91 98765 43210</li>
          <li><strong>Address:</strong> 123 Dairy Lane, Village Town, India</li>
        </ul>
      </div>
    </div>
      </main>
    </div>
  );
};

export default Contact;
