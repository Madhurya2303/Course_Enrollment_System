import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/auth/sign_in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error("Login failed");

      const token = res.headers.get("access-token");
      const client = res.headers.get("client");
      const uid = res.headers.get("uid");
      const data = await res.json();

      if (!token || !client || !uid) throw new Error("Missing auth headers");
      localStorage.setItem("access-token", token);
      localStorage.setItem("client", client);
      localStorage.setItem("uid", uid);
      localStorage.setItem("user-name", data.data.name);
      localStorage.setItem("user-id", data.data.id);

      alert("✅ Login successful!");
      navigate("/courses");
    } catch (err) {
      console.error("Login error:", err);
      setMessage("❌ Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white p-8 rounded-xl shadow-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-blue-700">
          Course Enrollment System - Student Login
        </h2>

        <input
          type="email"
          className="w-full border px-4 py-2 rounded"
          placeholder="Email"
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
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
        >
          Login
        </button>

        {message && (
          <p className="text-center text-sm text-red-500">{message}</p>
        )}

        <p className="text-center text-sm text-gray-600 mt-4">
          If new user:{" "}
          <Link
            to="/register"
            className="text-blue-600 hover:underline font-medium"
          >
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
}