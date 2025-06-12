import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function updateAuthHeaders(res) {
  const token = res.headers.get("access-token");
  const client = res.headers.get("client");
  const uid = res.headers.get("uid");

  if (token && client && uid) {
    localStorage.setItem("access-token", token);
    localStorage.setItem("client", client);
    localStorage.setItem("uid", uid);
  }
}



export default function CourseList() {
  const [courses, setCourses] = useState([]);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const userId = localStorage.getItem("user-id");

  const getAuthHeaders = () => {
    const token = localStorage.getItem("access-token");
    const client = localStorage.getItem("client");
    const uid = localStorage.getItem("uid");

    if (!token || !client || !uid) return null;

    return {
      "Content-Type": "application/json",
      "access-token": token,
      client,
      uid,
    };
  };

  const fetchCourses = async () => {
    const headers = getAuthHeaders();
    if (!headers) {
      setError("❌ Not authenticated. Please login again.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/api/v1/courses", { headers });
      if (!res.ok) throw new Error("Failed to fetch courses");

      const data = await res.json();
      setCourses(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchMyEnrollments = async () => {
    const headers = getAuthHeaders();
    if (!headers || !userId) return;

    try {
      const res = await fetch("http://localhost:3000/api/v1/my_enrollments", { headers });
      if (!res.ok) throw new Error("Failed to fetch enrollments");

      const data = await res.json();
      const ids = data.map(course => course.id);
      setEnrolledCourseIds(ids);

      const all = JSON.parse(localStorage.getItem("user-enrollments") || "{}");
      all[userId] = ids;
      localStorage.setItem("user-enrollments", JSON.stringify(all));
    } catch (err) {
      console.error("❌ Enrollment fetch error:", err.message);
    }
  };

  const handleEnroll = async (courseId) => {
    const headers = getAuthHeaders();
    if (!headers) return alert("❌ Not authenticated.");

    try {
      const res = await fetch("http://localhost:3000/api/v1/enrollments", {
        method: "POST",
        headers,
        body: JSON.stringify({ course_id: courseId }),
      });

      if (!res.ok) throw new Error("Failed to enroll");

      const updated = [...enrolledCourseIds, courseId];
      setEnrolledCourseIds(updated);

      const all = JSON.parse(localStorage.getItem("user-enrollments") || "{}");
      all[userId] = updated;
      localStorage.setItem("user-enrollments", JSON.stringify(all));

      await fetchCourses();
    } catch (err) {
      alert("❌ " + err.message);
    }
  };

  const handleDelete = async (courseId) => {
    const headers = getAuthHeaders();
    if (!headers) return alert("❌ Not authenticated.");

    try {
      const res = await fetch(`http://localhost:3000/api/v1/enrollments/${courseId}`, {
        method: "DELETE",
        headers,
      });

      if (!res.ok) throw new Error("Failed to delete enrollment");

      const updated = enrolledCourseIds.filter(id => id !== courseId);
      setEnrolledCourseIds(updated);

      const all = JSON.parse(localStorage.getItem("user-enrollments") || "{}");
      all[userId] = updated;
      localStorage.setItem("user-enrollments", JSON.stringify(all));

      await fetchCourses();
    } catch (err) {
      alert("❌ " + err.message);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    fetchCourses();
    fetchMyEnrollments();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-indigo-700">Welcome to Course Enrollment System</h1>
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Profile
          </button>
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-52 bg-white border rounded shadow-lg z-10">
              <button
                onClick={() => navigate("/my-enrollments")}
                className="block px-4 py-2 w-full text-left hover:bg-gray-100"
              >
                Enrolled Courses
              </button>
              <button
                onClick={handleLogout}
                className="block px-4 py-2 w-full text-left hover:bg-gray-100 text-red-600"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Error */}
      {error && <div className="text-red-600 p-4 text-center font-medium">{error}</div>}

      {/* Loading */}
      {loading ? (
        <div className="p-6 text-center text-gray-600">Loading courses...</div>
      ) : (
        <>
          <div className="px-6 pt-6">
            <h2 className="text-2xl font-bold text-indigo-700 mb-4">Available Courses</h2>
          </div>

          <div className="p-6 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map(course => (
              <div
                key={course.id}
                className="border p-5 rounded-xl shadow bg-white flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">{course.title}</h3>
                  <p className="text-gray-600 text-sm">{course.description}</p>
                  <p className="text-sm text-gray-500">Instructor: {course.instructor_name || "Unassigned"}</p>
                  <p className="text-sm text-gray-500">Credit Hours: {course.credit_hours}</p>
                  <p className="text-sm text-gray-500">Capacity: {course.capacity}</p>
                  <p className="text-sm text-gray-500">
                    👨‍🎓 Enrolled: <strong>{course.students_count}</strong> / {course.capacity}
                  </p>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {enrolledCourseIds.includes(course.id) ? (
                    <>
                      <span className="bg-green-500 text-white text-sm px-3 py-1 rounded">✅ Enrolled</span>
                      <button
                        onClick={() => handleDelete(course.id)}
                        className="bg-red-600 text-white text-sm px-3 py-1 rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </>
                  ) : course.students_count >= course.capacity ? (
                    <button
                      disabled
                      className="bg-gray-400 text-white text-sm px-3 py-1 rounded cursor-not-allowed"
                    >
                      Full
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEnroll(course.id)}
                      className="bg-green-600 text-white text-sm px-3 py-1 rounded hover:bg-green-700"
                    >
                      Enroll
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
