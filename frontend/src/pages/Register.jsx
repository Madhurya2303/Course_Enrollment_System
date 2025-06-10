import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

export default function Register() {
  const { role } = useParams(); 
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        name,
        email,
        password: role === "student" ? "student_dummy_password" : password,
        password_confirmation:
          role === "student" ? "student_dummy_password" : password,
      };

      const res = await fetch("http://localhost:3000/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Registration failed");
      const data = await res.json();

      alert("✅ Registration successful! You can now log in.");
      navigate(`/login/${role}`);
    } catch (err) {
      console.error("Registration error:", err);
      setMessage("❌ Registration failed. Please check your input.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleRegister}
        className="w-full max-w-md bg-white p-8 rounded-xl shadow-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-blue-700 capitalize">
          {role} Registration
        </h2>

        <input
          type="text"
          className="w-full border px-4 py-2 rounded"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          className="w-full border px-4 py-2 rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {role !== "student" && (
          <input
            type="password"
            className="w-full border px-4 py-2 rounded"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        )}

        {role === "student" && (
          <p className="text-sm text-gray-600 text-center">
            Students do not need a password. A temporary one will be assigned.
          </p>
        )}

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Register
        </button>

        {message && (
          <p className="text-center text-sm text-red-500">{message}</p>
        )}

        <p className="text-center text-sm text-gray-600 mt-4">
          Already registered?{" "}
          <Link
            to={`/login/${role}`}
            className="text-blue-600 hover:underline font-medium"
          >
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
}