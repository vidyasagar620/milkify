import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer
} from "recharts";

import "../styles/Payments.css";

const PaymentPage = () => {
  const [payments, setPayments] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);

  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [type, setType] = useState("income");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchPayments();
    fetchWeeklyData();
    fetchMonthlyData();
  }, []);

  const fetchPayments = async () => {
    const res = await axios.get("http://localhost:5000/api/payments");
    setPayments(res.data);
  };

  const fetchWeeklyData = async () => {
    const res = await axios.get("http://localhost:5000/api/revenue/weekly");
    setWeeklyData(res.data);
  };

  const fetchMonthlyData = async () => {
    const res = await axios.get("http://localhost:5000/api/revenue/monthly");
    setMonthlyData(res.data);
  };

  const handleAdd = async () => {
    await axios.post("http://localhost:5000/api/payments", {
      amount,
      date,
      time,
      type,
      description,
    });
    fetchPayments();
    fetchWeeklyData();
    fetchMonthlyData();
    setAmount(""); setDate(""); setTime(""); setType("income"); setDescription("");
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/payments/${id}`);
    setPayments(payments.filter(p => p.id !== id));
  };

  return (
    <div className="home-container">
      <Sidebar />
      <main className="home-content">
        <div className="payment-container">
          <h2>Payment Management</h2>
          <div className="form-container">
            <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
            <button onClick={handleAdd}>Add Payment</button>
          </div>

          <h3>All Payments</h3>
          <div className="payment-list">
            {payments.length === 0 ? (
              <p>No payments found.</p>
            ) : (
              payments.map((p) => (
                <div className={`payment-card ${p.type}`} key={p.id}>
                  <strong>₹{p.amount}</strong> on {p.date} at {p.time}
                  <p>{p.description}</p>
                  <button onClick={() => handleDelete(p.id)}>Delete</button>
                </div>
              ))
            )}
          </div>

          <h3>Weekly Revenue</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="income" fill="#4CAF50" />
              <Bar dataKey="expense" fill="#f44336" />
            </BarChart>
          </ResponsiveContainer>

          <h3>Monthly Revenue</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="income" stroke="#4CAF50" />
              <Line type="monotone" dataKey="expense" stroke="#f44336" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </main>
    </div>
  );
};

export default PaymentPage;
