import React from 'react';
import '../styles/pages.css';
import Sidebar from "../components/Sidebar";
import Header from '../components/Header';


const Payment = () => {
    return (
      <div className="supplier-page">
      <Sidebar/>
      <main className="supplier-main">
      <Header/>
      <div className="page-container">
        <h2 className="page-title">Payments</h2>
        <div className="card-box">
          <h3 className="card-title">Recent Transactions</h3>
          <p className="card-text">No payments made yet.</p>
        </div>
      </div>
      </main>
      </div>
    );
  };
  
  export default Payment;
  
