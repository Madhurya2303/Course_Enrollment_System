import { useEffect, useState } from "react";

export default function MyEnrollments() {
  const [enrollments, setEnrollments] = useState([]);
  const [error, setError] = useState("");

  const getAuthHeaders = () => {
    const token = localStorage.getItem("access-token");
    const client = localStorage.getItem("client");
    const uid = localStorage.getItem("uid");

    if (!token || !client || !uid) {
      return null;
    }

    return {
      "Content-Type": "application/json",
      "access-token": token,
      client: client,
      uid: uid,
    };
  };

  const fetchMyEnrollments = async () => {
    const headers = getAuthHeaders();
    if (!headers) {
      setError("❌ Not authenticated. Please login again.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/v1/my_enrollments", {
        method: "GET",
        headers,
      });

      if (!res.ok) throw new Error("Failed to fetch enrollments");
      const data = await res.json();
      setEnrollments(data);
    } catch (err) {
      console.error("❌ Fetch error:", err.message);
      setError(err.message);
    }
  };

  const handleDelete = async (courseId) => {
    const headers = getAuthHeaders();
    if (!headers) {
      alert("❌ Not authenticated. Please login again.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:3000/api/v1/enrollments/${courseId}`, {
        method: "DELETE",
        headers,
      });

      if (!res.ok) throw new Error("Failed to delete enrollment");

      // ✅ Sync with localStorage
      const current = JSON.parse(localStorage.getItem("enrolled-course-ids") || "[]");
      const updated = current.filter((id) => id !== courseId);
      localStorage.setItem("enrolled-course-ids", JSON.stringify(updated));

      alert("✅ Unenrolled successfully!");
      fetchMyEnrollments(); // Refresh list
    } catch (err) {
      console.error("❌ Delete error:", err.message);
      alert("❌ Failed to delete: " + err.message);
    }
  };

  useEffect(() => {
    fetchMyEnrollments();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">My Enrolled Courses</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {enrollments.map((course) => (
          <div
            key={course.id}
            className="flex flex-col justify-between h-64 border p-4 rounded shadow bg-white"
          >
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">{course.title}</h2>
              <p className="text-gray-700">{course.description}</p>
              <p>Credit Hours: {course.credit_hours}</p>
              <p>Capacity: {course.capacity}</p>
            </div>
            <button
              onClick={() => handleDelete(course.id)}
              className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 inline-block"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
