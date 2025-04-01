import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Navbar from "../components/Navbar"; // ✅ Import Navbar
import "../styles/ManageSuppliers.css"; // Add CSS file

const ManageSuppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [newSupplier, setNewSupplier] = useState({ name: "", contact: "", address: "" });

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/suppliers");
      setSuppliers(response.data);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    }
  };

  const handleChange = (e) => {
    setNewSupplier({ ...newSupplier, [e.target.name]: e.target.value });
  };

  const handleAddSupplier = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/suppliers", newSupplier);
      setSuppliers([...suppliers, response.data]);
      setNewSupplier({ name: "", contact: "", address: "" });
    } catch (error) {
      console.error("Error adding supplier:", error);
    }
  };

  const handleDeleteSupplier = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/suppliers/${id}`);
      setSuppliers(suppliers.filter((supplier) => supplier.id !== id));
    } catch (error) {
      console.error("Error deleting supplier:", error);
    }
  };

  return (
    <div className="home-container">
    <Sidebar /> <Navbar />
    <main className="home-content">
      <Header />
      
      <h1>Milkify - Manage Suppliers</h1>
     <div className="supplier-container">
        <h2>Manage Suppliers</h2>
        <form onSubmit={handleAddSupplier}>
          <input type="text" name="name" placeholder="Supplier Name" value={newSupplier.name} onChange={handleChange} required />
          <input type="text" name="contact" placeholder="Contact" value={newSupplier.contact} onChange={handleChange} required />
          <input type="text" name="address" placeholder="Address" value={newSupplier.address} onChange={handleChange} required />
          <button type="submit">Add Supplier</button>
        </form>

        <table border="1">
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier) => (
              <tr key={supplier.id}>
                <td>{supplier.name}</td>
                <td>{supplier.contact}</td>
                <td>{supplier.address}</td>
                <td>
                  <button onClick={() => handleDeleteSupplier(supplier.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </main>
    </div>
  );
};

export default ManageSuppliers;
