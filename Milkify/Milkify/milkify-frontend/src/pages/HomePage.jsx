import { useState, useEffect, Component } from "react";
import axios from "axios";
import "../styles/HomePage.css";
import Navbar from "../components/Navbar"; // ✅ Import Navbar
const HomePage = () => {
  const [stats, setStats] = useState({
    cows: 0,
    dailyMilk: 0,
    earnings: 0,
  });

  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    fetchFarmStats();
    fetchProducts();
    fetchSuppliers();
  }, []);

  const fetchFarmStats = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/farm-stats");
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching farm stats:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchSuppliers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/suppliers");
      setSuppliers(response.data);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    }
  };

  return (
    <div className="home-container">
      <Navbar /> {Component/Navbar.jsx}
      {/* ✅ Hero Section */}
      <header className="hero">
        <div className="hero-content">
          <h1>Welcome to <span>Milkify</span></h1>
          <p>Fresh Dairy Management System</p>
        </div>
      </header>

      {/* ✅ Farm Overview */}
      <section className="farm-stats">
        <h2>Farm Overview</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Cows</h3>
            <p>{stats.cows}</p>
          </div>
          <div className="stat-card">
            <h3>Milk Produced (Liters/Day)</h3>
            <p>{stats.dailyMilk} L</p>
          </div>
          <div className="stat-card">
            <h3>Daily Earnings</h3>
            <p>₹{stats.earnings}</p>
          </div>
        </div>
      </section>

      {/* ✅ Products Section */}
      <section className="products">
        <h2>Our Products</h2>
        <div className="product-grid">
          {products.length === 0 ? (
            <p>No products available.</p>
          ) : (
            products.map((product) => (
              <div key={product.id} className="product-card">
                <img src={product.image_url} alt={product.name} className="product-img" />
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p className="price">₹{product.price}</p>
              </div>
            ))
          )}
        </div>
      </section>

      {/* ✅ Suppliers Section */}
      <section className="suppliers">
        <h2>Our Suppliers</h2>
        <div className="supplier-grid">
          {suppliers.length === 0 ? (
            <p>No suppliers available.</p>
          ) : (
            suppliers.map((supplier) => (
              <div key={supplier.id} className="supplier-card">
                <h3>{supplier.name}</h3>
                <p>{supplier.contact}</p>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
