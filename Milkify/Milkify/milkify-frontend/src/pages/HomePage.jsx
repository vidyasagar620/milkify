import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/HomePage.css";

const HomePage = () => {
  const [products, setProducts] = useState([]);

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
      {/* ✅ Hero Section */}
      <header className="hero">
        <div className="hero-content">
          <h1>Welcome to <span>Milkify</span></h1>
          <p>Fresh & Organic Dairy Products Delivered to You</p>
          <button className="shop-btn">Shop Now</button>
        </div>
      </header>

      {/* ✅ Products Section */}
      <section className="products">
        <h2>Our Products</h2>
        <div className="product-grid">
          {products.length === 0 ? (
            <p>Loading products...</p>
          ) : (
            products.map((product) => (
              <div key={product.id} className="product-card">
                <img src={product.image_url} alt={product.name} className="product-img" />
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p className="price">₹{product.price}</p>
                <button className="buy-btn">Buy Now</button>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
