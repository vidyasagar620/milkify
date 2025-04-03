import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faShoppingCart,
  faList,
  faUser,
  faCreditCard,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/Sidebar.css";
import Logo from "../assets/milkyfy-logo.png"; // Adjust the path as necessary


const Sidebar = () => {
  const location = useLocation(); // ✅ Get the current route

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <img src={Logo} alt="Milkify Logo" className="login-logo" />
      </div>
      <nav className="sidebar-nav">
        <Link to="/home" className={location.pathname === "/home" ? "active" : ""}>
          <FontAwesomeIcon icon={faHome} /> Home
        </Link>
        <Link to="/products" className={location.pathname === "/products" ? "active" : ""}>
          <FontAwesomeIcon icon={faShoppingCart} /> Products
        </Link>
        <Link to="/collection" className={location.pathname === "/collection" ? "active" : ""}>
          <FontAwesomeIcon icon={faList} /> Collection
        </Link>
        <Link to="/supplier" className={location.pathname === "/supplier" ? "active" : ""}>
          <FontAwesomeIcon icon={faUser} /> Supplier
        </Link>
        <Link to="/payments" className={location.pathname === "/payments" ? "active" : ""}>
          <FontAwesomeIcon icon={faCreditCard} /> Payments
        </Link>
        <Link to="/contact" className={location.pathname === "/contact" ? "active" : ""}>
          <FontAwesomeIcon icon={faPhone} /> Contact
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
