

import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

export default function Register() {
  const { role } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [messages, setMessages] = useState([]);

  const isPasswordValid = (pwd) => {
    const lengthOK = pwd.length >= 6;
    const hasNumber = /\d/.test(pwd);
    const hasSpecial = /[!@#$%^&*]/.test(pwd);
    return lengthOK && hasNumber && hasSpecial;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (role !== "student") {
      if (password !== confirmPassword) {
        return setMessages(["❌ Passwords do not match."]);
      }
      if (!isPasswordValid(password)) {
        return setMessages([
          "❌ Password must be at least 6 characters and include a number and a special character.",
        ]);
      }
    }

    try {
      const payload = {
        name,
        email,
        password,
        password_confirmation:confirmPassword,
      };

      const res = await fetch("http://localhost:3000/api/v1/auth", { //posting to backend API
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        const errors = new Set();

        if (data.errors && typeof data.errors === "object") {
          Object.entries(data.errors).forEach(([field, msgs]) => {
            if (field === "full_messages") return; 
            msgs.forEach((msg) => {
              errors.add(`❌ ${capitalize(field)} ${msg}`);
            });
          });
        }
        else if (Array.isArray(data.errors)) {
          data.errors.forEach((msg) => errors.add(`❌ ${msg}`));
        } 
        else {
          errors.add("❌ Registration failed.");
        }

        setMessages(Array.from(errors));
        return;
      }

      alert("✅ Registration successful! You can now log in.");
      navigate(`/login/student`);
    } catch (err) {
      console.error("Registration error:", err);
      setMessages(["❌ Registration failed. Please try again."]);
    }
  };

  const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

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

        {role !== "student" ? (
          <>
            <input
              type="password"
              className="w-full border px-4 py-2 rounded"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <input
              type="password"
              className="w-full border px-4 py-2 rounded"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <ul className="text-xs text-gray-600 list-disc ml-5">
              <li>Minimum 6 characters</li>
              <li>At least 1 number</li>
              <li>At least 1 special character (!@#$%^&*)</li>
            </ul>
          </>
        ) : (
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

        {messages.length > 0 && (
          <div className="text-sm text-red-500 space-y-1 text-center">
            {messages.map((msg, index) => (
              <p key={index}>{msg}</p>
            ))}
          </div>
        )}

        <p className="text-center text-sm text-gray-600 mt-4">
          Already registered?{" "}
          <Link
            to={`/login/student`}
            className="text-blue-600 hover:underline font-medium"
          >
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
}
