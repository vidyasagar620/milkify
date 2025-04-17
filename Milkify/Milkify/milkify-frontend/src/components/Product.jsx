import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "../styles/Product.css";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    description: "",
    price: "",
    image_url: "",
  });
  const [isEditing, setIsEditing] = useState(false);

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`http://localhost:5000/api/products/${formData.id}`, formData);
        setIsEditing(false);
      } else {
        await axios.post("http://localhost:5000/api/products", formData);
      }
      setFormData({ id: null, name: "", description: "", price: "", image_url: "" });
      fetchProducts();
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const handleEdit = (product) => {
    setFormData(product);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="home-container">
      <Sidebar />
      <main className="home-content">
        <Header />
        <div className="product-section">
          <h2>🛒 Manage Products</h2>

          {/* 🔹 Add/Edit Form */}
          <form onSubmit={handleSubmit} className="product-form">
            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
            <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
            <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
            <input type="text" name="image_url" placeholder="Image URL" value={formData.image_url} onChange={handleChange} required />
            <button type="submit" className="submit-btn">
              {isEditing ? "✏️ Update Product" : "➕ Add Product"}
            </button>
          </form>

          {/* 🔹 Product Grid */}
          <div className="product-grid">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <img src={product.image_url} alt={product.name} className="product-img" />
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p className="price">₹{product.price}</p>
                <div className="card-actions">
                  <button onClick={() => handleEdit(product)} className="edit-btn"> Edit</button>
                  <button onClick={() => handleDelete(product.id)} className="delete-btn"> Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Product;
