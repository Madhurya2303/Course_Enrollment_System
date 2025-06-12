import React from 'react';
import { useNavigate } from 'react-router-dom';

const Intro = () => {
  const navigate = useNavigate();

  const handleLogin = (role) => {
    if (role === "admin") {
      navigate("/admin-login");
    } else if (role === "instructor") {
      navigate("/login/instructor");
    } else if (role === "student") {
      navigate("/login/student");
    }
  };

  const handleRegister = (role) => {
    navigate(`/register/${role}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 text-blue-700">
        Course Enrollment System
      </h1>

      <img
        src="CEM_IMG.png"
        alt="Course"
        className="w-full max-w-md mb-10 rounded shadow-md"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        <div
          className="bg-white shadow-md p-6 rounded hover:shadow-xl cursor-pointer text-center"
          onClick={() => handleLogin('student')}
        >
          <h2 className="text-xl font-semibold text-green-700">Student Login</h2>
          <p className="mt-2 text-sm text-gray-600">Enroll and manage your courses</p>
        </div>

        <div
          className="bg-white shadow-md p-6 rounded hover:shadow-xl cursor-pointer text-center"
          onClick={() => handleLogin('instructor')}
        >
          <h2 className="text-xl font-semibold text-blue-700">Instructor Login</h2>
          <p className="mt-2 text-sm text-gray-600">Manage their course content</p>
        </div>

        <div
          className="bg-white shadow-md p-6 rounded hover:shadow-xl cursor-pointer text-center"
          onClick={() => handleLogin('admin')}
        >
          <h2 className="text-xl font-semibold text-red-700">Admin Login</h2>
          <p className="mt-2 text-sm text-gray-600">Administer the platform</p>
        </div>
      </div>
    </div>
  );
};

export default Intro;
