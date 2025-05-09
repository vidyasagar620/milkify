import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <nav>
        <ul>
          <li><Link to="/admin/products">Manage Products</Link></li>
          <li><Link to="/admin/orders">Manage Orders</Link></li>
          <li><Link to="/admin/suppliers">Manage Suppliers</Link></li>
        </ul>
      </nav>
    </div>
  );
  function AdminDashboard() {
    return (
      <div>
        <h1>Admin Dashboard</h1>
      </div>
    );
  }
  
};

export default AdminDashboard;
