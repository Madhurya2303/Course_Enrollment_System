import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function updateInstructorAuthHeaders(res) {
  const token = res.headers.get("access-token");
  const client = res.headers.get("client");
  const uid = res.headers.get("uid");

  if (token && client && uid) {
    localStorage.setItem("instructor-token", token);
    localStorage.setItem("instructor-client", client);
    localStorage.setItem("instructor-uid", uid);
  }
}

export default function InstructorDashboard() {
  const [courses, setCourses] = useState([]);
  const [instructor, setInstructor] = useState({ name: "", email: "" });
  const navigate = useNavigate(); 

  const fetchInstructorProfile = async () => {
    try {
      const token = localStorage.getItem("instructor-token");
      const client = localStorage.getItem("instructor-client");
      const uid = localStorage.getItem("instructor-uid");

      const response = await fetch("http://localhost:3000/api/v1/instructor_profile", {
        headers: {
          "Content-Type": "application/json",
          "access-token": token,
          client: client,
          uid: uid,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch instructor profile");
      }

      const data = await response.json();
      setInstructor({ name: data.name, email: data.email });

      const formattedCourses = data.courses.map(course => ({
        ...course,
        enrolled_students: course.students_count || 0,
      }));

      setCourses(formattedCourses);
    } catch (error) {
      console.error("Profile fetch error:", error.message);
    }
  };

  useEffect(() => {
    fetchInstructorProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("instructor-token");
    localStorage.removeItem("instructor-client");
    localStorage.removeItem("instructor-uid");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Welcome, {instructor.name}</h1>
          <p className="text-lg text-gray-600">Email: {instructor.email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>

      <h2 className="text-2xl font-semibold mb-4">📚 Your Courses</h2>

      {courses.length === 0 ? (
        <p>No courses assigned yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white p-6 rounded-xl shadow border border-gray-200"
            >
              <h3 className="text-xl font-bold text-blue-800 mb-1">{course.title}</h3>
              <p className="text-gray-600 mb-2">{course.description}</p>
              <p className="text-sm text-gray-700">
                Enrolled: <strong>{course.enrolled_students}</strong> / {course.capacity}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
