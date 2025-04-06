import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
// import Navbar from "../components/Navbar"; 
import "../styles/Product.css";

const Product = () => {
  const [products, setProducts] = useState([]);

  // ✅ Fetch Products from API
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <div className="home-container">
    <Sidebar />
    <main className="home-content">
      <Header />
      
      <header className="product-header">
        <h1>Our Dairy Products</h1>
        
      </header>

      <section className="product-list">
        {products.length === 0 ? (
          <p className="loading-text">Loading products...</p>
        ) : (
          <div className="product-grid">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <img src={product.image_url} alt={product.name} className="product-img" />
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p className="price">₹{product.price}</p>
              </div>
            ))}
          </div>
        )}
      </section>
      </main>
      
    </div>
  );
};

export default Product;
