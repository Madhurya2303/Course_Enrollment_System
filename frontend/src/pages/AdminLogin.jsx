import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleAdminLogin = (e) => {
    e.preventDefault();

    if (email === "admin@login.com" && password === "@admin123") {
      navigate("/admin-dashboard");
    } else {
      setMessage("❌ Invalid admin credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleAdminLogin}
        className="w-full max-w-md bg-white p-8 rounded-xl shadow-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-red-700">Course Enrollment System <br></br> Admin Login</h2>

        <input
          type="email"
          className="w-full border px-4 py-2 rounded"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          className="w-full border px-4 py-2 rounded"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>

        {message && (
          <p className="text-center text-sm text-red-500">{message}</p>
        )}
      </form>
    </div>
  );
}
