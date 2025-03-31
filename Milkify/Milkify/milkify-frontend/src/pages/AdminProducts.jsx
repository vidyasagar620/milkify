import { useState, useEffect } from "react";
import axios from "axios";

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
    <div>
      <h2>Admin - Manage Products</h2>

      {/* 🔹 Add Product Form */}
      <form onSubmit={handleAddProduct}>
        <input type="text" name="name" placeholder="Name" value={newProduct.name} onChange={handleChange} required />
        <input type="text" name="description" placeholder="Description" value={newProduct.description} onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price" value={newProduct.price} onChange={handleChange} required />
        <input type="text" name="image_url" placeholder="Image URL" value={newProduct.image_url} onChange={handleChange} required />
        <button type="submit">Add Product</button>
      </form>

      {/* 🔹 Products Table */}
      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td><img src={product.image_url} alt={product.name} width="50" /></td>
              <td>
                <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProducts;
