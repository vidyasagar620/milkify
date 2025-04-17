import { Link } from "react-router-dom";
import "../styles/AdminPanel.css";

const AdminPanel = () => {
  return (
    
    <div className="admin-panel">
      
      <h2>Admin Dashboard</h2>
      <ul>
        <li><Link to="/admin/products">Manage Products</Link></li>
        <li><Link to="/admin/suppliers">Manage Suppliers</Link></li>
        <li><Link to="/admin/milk-production">Daily Milk Production</Link></li>
        <li><Link to="/admin/earnings">Earnings Report</Link></li>
        <li><Link to="/admin/settings">Settings</Link></li>
      </ul>
    </div>
  );
};

export default AdminPanel;
