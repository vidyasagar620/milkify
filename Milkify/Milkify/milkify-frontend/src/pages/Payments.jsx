import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "../styles/Payments.css";

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [form, setForm] = useState({ title: "", amount: "", type: "income", date: "" });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    const res = await axios.get("http://localhost:5000/api/payments");
    setPayments(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await axios.put(`http://localhost:5000/api/payments/${editId}`, form);
    } else {
      await axios.post("http://localhost:5000/api/payments", form);
    }
    setForm({ title: "", amount: "", type: "income", date: "" });
    setEditId(null);
    fetchPayments();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/payments/${id}`);
    fetchPayments();
  };

  const handleEdit = (payment) => {
    setForm(payment);
    setEditId(payment.id);
  };

  const today = new Date().toISOString().split("T")[0];
  const todayTotal = payments.filter(p => p.date === today);
  const todayIncome = todayTotal.filter(p => p.type === "income").reduce((acc, p) => acc + Number(p.amount), 0);
  const todayExpense = todayTotal.filter(p => p.type === "expense").reduce((acc, p) => acc + Number(p.amount), 0);

  const last7Days = payments.filter(p => new Date(p.date) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000));
  const last30Days = payments.filter(p => new Date(p.date) >= new Date(Date.now() - 30 * 24 * 60 * 60 * 1000));

  const weeklyAvg = last7Days.reduce((sum, p) => sum + Number(p.amount), 0) / 7;
  const monthlyAvg = last30Days.reduce((sum, p) => sum + Number(p.amount), 0) / 30;

  return (
    <div className="home-container">
    <Sidebar />
    <main className="home-content">
      {/* <Header /> */}
    
    <div className="payment-container">
      
      <h2>💰 Payment Management</h2>

      <form className="payment-form" onSubmit={handleSubmit}>
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required />
        <input name="amount" value={form.amount} onChange={handleChange} placeholder="Amount" required type="number" />
        <select name="type" value={form.type} onChange={handleChange}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <input name="date" value={form.date} onChange={handleChange} type="date" required />
        <button type="submit">{editId ? "Update" : "Add"} Payment</button>
      </form>

      <div className="payment-grid">
        {payments.map(p => (
          <div key={p.id} className={`payment-card ${p.type}`}>
            <h4>{p.title}</h4>
            <p>₹{p.amount}</p>
            <p>{p.type.toUpperCase()}</p>
            <p>{p.date}</p>
            <button onClick={() => handleEdit(p)}>Edit</button>
            <button onClick={() => handleDelete(p.id)}>Delete</button>
          </div>
        ))}
      </div>

      <div className="payment-summary">
        <h3>📊 Summary</h3>
        <p>Today's Income: ₹{todayIncome}</p>
        <p>Today's Expense: ₹{todayExpense}</p>
        <p>Weekly Avg: ₹{weeklyAvg.toFixed(2)}</p>
        <p>Monthly Avg: ₹{monthlyAvg.toFixed(2)}</p>
      </div>
    </div>
    </main>
    </div>

  );
};

export default Payments;
