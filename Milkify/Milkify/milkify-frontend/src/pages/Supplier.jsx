import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

import "../styles/Supplier.css";

const Supplier = () => {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/suppliers");
      setSuppliers(res.data);
    } catch (error) {
      console.error("Failed to fetch suppliers", error);
    }
  };

  return (
    <div className="supplier-page">
      <Sidebar />
      <main className="supplier-main">
      <Header/>
        <h1>Suppliers List</h1>
        <div className="supplier-grid">
          {suppliers.length === 0 ? (
            <p>No suppliers available.</p>
          ) : (
            suppliers.map((supplier) => (
              <div key={supplier.id} className="supplier-card">
                <h3>{supplier.name}</h3>
                <p><strong>Contact:</strong> {supplier.contact}</p>
                <p><strong>Location:</strong> {supplier.location}</p>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Supplier;
