import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      {/* ✅ Logo */}
      <div className="logo">
        <Link to="/">Milkify</Link>
      </div>

      {/* ✅ Navigation Links */}
      <ul className={menuOpen ? "nav-links open" : "nav-links"}>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/admin" className="admin-btn">Admin</Link></li>
      </ul>

      {/* ✅ Hamburger Menu */}
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <span className={menuOpen ? "bar open" : "bar"}></span>
        <span className={menuOpen ? "bar open" : "bar"}></span>
        <span className={menuOpen ? "bar open" : "bar"}></span>
      </div>
    </nav>
  );
};

export default Navbar;
