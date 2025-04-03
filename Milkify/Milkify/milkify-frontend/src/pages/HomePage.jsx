import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
// import Navbar from "../components/Navbar"; // ✅ Import Navbar
import "../styles/HomePage.css";


const HomePage = () => {
  const [stats, setStats] = useState({ cows: 0, dailyMilk: 0, earnings: 0 });

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
      
      <Sidebar /> 
      
      <main className="home-content">
        <Header />
        
        
        {/* Farm Stats */}
        <section className="farm-stats">
          
          <div className="stats-card">
            <h3>Total Cows</h3>
            <p>{stats.cows}</p>
          </div>
          <div className="stats-card">
            <h3>Milk Production (L/Day)</h3>
            <p>{stats.dailyMilk} L</p>
          </div>
          <div className="stats-card">
            <h3>Daily Earnings</h3>
            <p>₹{stats.earnings}</p>
          </div>
        </section>

        {/* Products Section */}
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
      </main>
      
    </div>
  );
};

export default HomePage;
