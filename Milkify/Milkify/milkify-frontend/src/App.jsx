import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProducts from "./pages/AdminProducts";
import Product from "./components/Product";
import AdminPanel from "./pages/AdminPanel";
import ManageSuppliers from "./pages/ManageSuppliers";
import Collection from "./pages/Collection";
import SignupPage from "./pages/SignupPage";
import ForgotPassword from "./pages/ForgotPassword";
import SavePassword from "./pages/SavePassword";
import Supplier from "./pages/Supplier";
import Contact from "./pages/Contact";
import Payments from './pages/Payments'; 
import Sidebar from "./components/Sidebar";






function App() {
  return (
    <Router>
      <>
        <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/products" element={<Product />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/save-password" element={<SavePassword />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/suppliers" element={<ManageSuppliers />} />
          <Route path="/suppliers" element={<ManageSuppliers />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/supplier" element={<Supplier />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/payments" element={<Payments />} />

          
          <Route path="*" element={<div>Page Not Found</div>} />

        </Routes>
      </>
    </Router>
  );
}

export default App;
