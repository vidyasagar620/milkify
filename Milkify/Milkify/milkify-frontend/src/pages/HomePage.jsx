import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "../styles/HomePage.css";

const HomePage = () => {
  const [stats, setStats] = useState({ cows: 0, dailyMilk: 0, earnings: 0 });
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [collections, setCollections] = useState([]); // ✅ New state

  useEffect(() => {
    fetchFarmStats();
    fetchProducts();
    fetchSuppliers();
    fetchCollections(); // ✅ Fetch collections on mount
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

  const fetchCollections = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/collections");
      setCollections(response.data);
    } catch (error) {
      console.error("Error fetching collections:", error);
    }
  };

  return (
    <div className="home-container">
      <Sidebar />

      <main className="home-content">
        <Header />

        {/* ✅ Farm Stats */}
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

        {/* ✅ Products Section */}
        <section className="products">
          <h2>Our Products</h2>
          <div className="product-grid">
            {products.length === 0 ? (
              <p>No products available.</p>
            ) : (
              products.map((product) => (
                <div key={product.id} className="product-card">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="product-img"
                  />
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

        {/* ✅ Collections Section */}
        <section className="collections">
          <h2>Our Collections</h2>
          <p>Explore our premium dairy collections</p>
          <div className="collection-grid">
            {collections.length === 0 ? (
              <p className="loading-text">Loading collections...</p>
            ) : (
              collections.map((item) => (
                <div key={item.id} className="collection-card">
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="collection-img"
                  />
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
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
