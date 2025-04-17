import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "../styles/Supplier.css";

const Supplier = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [newSupplier, setNewSupplier] = useState({
    name: "",
    contact: "",
    location: "",
  });
  const [editingSupplier, setEditingSupplier] = useState(null);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSupplier((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingSupplier) {
        // Update supplier if editing
        await axios.put(`http://localhost:5000/api/suppliers/${editingSupplier.id}`, newSupplier);
        setEditingSupplier(null); // Reset editing mode
      } else {
        // Add new supplier if not editing
        await axios.post("http://localhost:5000/api/suppliers", newSupplier);
      }
      fetchSuppliers();
      setNewSupplier({ name: "", contact: "", location: "" }); // Reset form
    } catch (error) {
      console.error("Failed to add/update supplier", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/suppliers/${id}`);
      fetchSuppliers(); // Refresh the supplier list after deletion
    } catch (error) {
      console.error("Failed to delete supplier", error);
    }
  };

  const handleEdit = (supplier) => {
    setEditingSupplier(supplier);
    setNewSupplier({ name: supplier.name, contact: supplier.contact, location: supplier.location });
  };

  return (
    <div className="supplier-page">
      <Sidebar />
      <main className="supplier-main">
        <Header />
        <h1>Manage Suppliers</h1>

        {/* Add/Edit Supplier Form */}
        <div className="add-supplier-form">
          <h2>{editingSupplier ? "Edit Supplier" : "Add New Supplier"}</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={newSupplier.name}
              onChange={handleInputChange}
              placeholder="Supplier Name"
              required
            />
            <input
              type="text"
              name="contact"
              value={newSupplier.contact}
              onChange={handleInputChange}
              placeholder="Contact"
              required
            />
            <input
              type="text"
              name="location"
              value={newSupplier.location}
              onChange={handleInputChange}
              placeholder="Location"
              required
            />
            <button type="submit">{editingSupplier ? "Update Supplier" : "Add Supplier"}</button>
            {editingSupplier && (
              <button type="button" onClick={() => setEditingSupplier(null)}>
                Cancel
              </button>
            )}
          </form>
        </div>

        {/* Supplier List */}
        <div className="supplier-grid">
          <h2>Suppliers List</h2>
          {suppliers.length === 0 ? (
            <p>No suppliers available.</p>
          ) : (
            suppliers.map((supplier) => (
              <div key={supplier.id} className="supplier-card">
                <h3>{supplier.name}</h3>
                <p><strong>Contact:</strong> {supplier.contact}</p>
                <p><strong>Location:</strong> {supplier.location}</p>
                <button onClick={() => handleEdit(supplier)}>Edit</button>
                <button onClick={() => handleDelete(supplier.id)}>Delete</button>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Supplier;
