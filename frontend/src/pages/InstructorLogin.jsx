import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChalkboardTeacher } from 'react-icons/fa';
import { MdLock, MdEmail, MdPerson } from 'react-icons/md';
import { GiSecretBook } from 'react-icons/gi';

export default function InstructorLogin() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [instructorSecret, setInstructorSecret] = useState('');
  const [error, setError] = useState('');

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setName('');
    setInstructorSecret('');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLogin) {
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      if (password.length < 6) {
        setError('Password must be at least 6 characters');
        return;
      }
    }

    const url = isLogin
      ? 'http://localhost:3000/api/v1/instructor_auth/sign_in'
      : 'http://localhost:3000/api/v1/instructor_auth';

    const payload = isLogin
      ? { email, password }
      : {
          email,
          password,
          password_confirmation: confirmPassword,
          name,
          instructor_secret: instructorSecret,
        };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        if (isLogin) {
          localStorage.setItem("instructor-token", response.headers.get("access-token"));
          localStorage.setItem("instructor-client", response.headers.get("client"));
          localStorage.setItem("instructor-uid", response.headers.get("uid"));

          navigate('/instructor-dashboard');
        } else {
          alert("Registration successful. Please log in.");
          resetForm();
          setIsLogin(true);
        }
      } else {
        const errorMsg =
          data.errors?.full_messages?.[0] ||
          data.errors?.[0] ||
          data.error ||
          'Something went wrong';
        setError(errorMsg);
      }
    } catch (err) {
      setError('Server error');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="flex flex-col items-center mb-6">
          <FaChalkboardTeacher size={40} className="text-blue-700 mb-2" />
          <h2 className="text-2xl font-bold text-blue-700">
            {isLogin ? 'Instructor Login' : 'Instructor Registration'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-gray-700 mb-1">Name</label>
              <div className="flex items-center border rounded px-3 py-2 bg-gray-50">
                <MdPerson className="text-gray-500 mr-2" />
                <input
                  className="w-full bg-transparent outline-none"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <div className="flex items-center border rounded px-3 py-2 bg-gray-50">
              <MdEmail className="text-gray-500 mr-2" />
              <input
                className="w-full bg-transparent outline-none"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <div className="flex items-center border rounded px-3 py-2 bg-gray-50">
              <MdLock className="text-gray-500 mr-2" />
              <input
                className="w-full bg-transparent outline-none"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {!isLogin && (
            <>
              <div>
                <label className="block text-gray-700 mb-1">Confirm Password</label>
                <div className="flex items-center border rounded px-3 py-2 bg-gray-50">
                  <MdLock className="text-gray-500 mr-2" />
                  <input
                    className="w-full bg-transparent outline-none"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Instructor Secret Code</label>
                <div className="flex items-center border rounded px-3 py-2 bg-gray-50">
                  <GiSecretBook className="text-gray-500 mr-2" />
                  <input
                    className="w-full bg-transparent outline-none"
                    value={instructorSecret}
                    onChange={(e) => setInstructorSecret(e.target.value)}
                    required
                  />
                </div>
              </div>
            </>
          )}

          {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
          >
            {isLogin ? 'Login' : 'Register'}
          </button>

          <p
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}
            className="text-sm text-blue-600 text-center mt-4 cursor-pointer hover:underline"
          >
            {isLogin ? 'New instructor? Register here' : 'Already have an account? Login'}
          </p>
        </form>
      </div>
    </div>
  );
}
