import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      localStorage.setItem("token", data.token);
      navigate("/admin");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Admin Login</h1>
      <form onSubmit={handleLogin} className="mt-4">
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="block p-2 border mb-2" />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="block p-2 border mb-2" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">Login</button>
      </form>
    </div>
  );
}
