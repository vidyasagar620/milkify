import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/AdminProducts.css";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    image_url: "",
  });

  // ✅ Fetch Products
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

  // ✅ Handle Input Change
  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  // ✅ Add Product
  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/products", newProduct);
      setProducts([...products, response.data]);
      setNewProduct({ name: "", description: "", price: "", image_url: "" });
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  // ✅ Delete Product
  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="admin-container">
      <h2 className="admin-title">🛒 Admin - Manage Products</h2>

      {/* 🔹 Add Product Form */}
      <form onSubmit={handleAddProduct} className="product-form">
        <input type="text" name="name" placeholder="Product Name" value={newProduct.name} onChange={handleChange} required />
        <input type="text" name="description" placeholder="Description" value={newProduct.description} onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price" value={newProduct.price} onChange={handleChange} required />
        <input type="text" name="image_url" placeholder="Image URL" value={newProduct.image_url} onChange={handleChange} required />
        <button type="submit" className="add-btn">➕ Add Product</button>
      </form>

      {/* 🔹 Products Grid */}
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image_url} alt={product.name} className="product-img" />
            <h3 className="product-name">{product.name}</h3>
            <p className="product-desc">{product.description}</p>
            <p className="product-price">₹{product.price}</p>
            <button className="delete-btn" onClick={() => handleDeleteProduct(product.id)}>❌ Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProducts;
