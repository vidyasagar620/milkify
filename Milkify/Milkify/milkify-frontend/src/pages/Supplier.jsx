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
  const [editSupplier, setEditSupplier] = useState(null);

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
      if (editSupplier) {
        // Update existing supplier
        await axios.put(`http://localhost:5000/api/suppliers/${editSupplier.id}`, newSupplier);
        setEditSupplier(null); // Reset edit state
      } else {
        // Add new supplier
        await axios.post("http://localhost:5000/api/suppliers", newSupplier);
      }
      fetchSuppliers(); // Fetch updated supplier list
      setNewSupplier({ name: "", contact: "", location: "" }); // Reset form
    } catch (error) {
      console.error("Failed to submit supplier", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/suppliers/${id}`);
      fetchSuppliers(); // Refresh list after deletion
    } catch (error) {
      console.error("Failed to delete supplier", error);
    }
  };

  const handleEdit = (supplier) => {
    setNewSupplier(supplier);
    setEditSupplier(supplier); // Set supplier data to be updated
  };

  return (
    <div className="supplier-page">
      <Sidebar />
      <main className="supplier-main">
        
        <h1>Manage Suppliers</h1>

        {/* Add or Edit Supplier Form */}
        <div className="add-supplier-form">
          <h2>{editSupplier ? "Edit Supplier" : "Add New Supplier"}</h2>
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
            <button type="submit">{editSupplier ? "Update Supplier" : "Add Supplier"}</button>
            {editSupplier && (
              <button type="button" className="cancel-button" onClick={() => setEditSupplier(null)}>
                Cancel
              </button>
            )}
          </form>
        </div>

        {/* Supplier List */}
          <h2>Suppliers List</h2>
        <div className="supplier-grid">
          {suppliers.length === 0 ? (
            <p>No suppliers available.</p>
          ) : (
            suppliers.map((supplier) => (
              <div key={supplier.id} className="supplier-card">
                <h3>{supplier.name}</h3>
                <p><strong>Contact:</strong> {supplier.contact}</p>
                <p><strong>Location:</strong> {supplier.location}</p>
                <div className="action-buttons">
                  <button onClick={() => handleEdit(supplier)}>Edit</button>
                  <button onClick={() => handleDelete(supplier.id)}>Delete</button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Supplier;
