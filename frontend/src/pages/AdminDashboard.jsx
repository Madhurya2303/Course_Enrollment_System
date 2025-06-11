import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [courses, setCourses] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [capacity, setCapacity] = useState("");
  const [instructorId, setInstructorId] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const fetchCourses = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/v1/courses");
      const data = await res.json();
      if (Array.isArray(data)) {
        setCourses(data);
      } else {
        setCourses([]);
        console.error("Unexpected data format:", data);
      }
    } catch (err) {
      console.error("Error fetching courses:", err);
      setCourses([]);
    }
  };

  const handleAddCourse = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        title,
        description,
        capacity: parseInt(capacity),
        instructor_id: parseInt(instructorId),
      };

      const res = await fetch("http://localhost:3000/api/v1/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to add course");
      await fetchCourses();
      setMessage("✅ Course added successfully.");
      setTitle("");
      setDescription("");
      setCapacity("");
      setInstructorId("");
    } catch (err) {
      setMessage("❌ Failed to add course.");
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this course?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:3000/api/v1/courses/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setCourses(courses.filter((course) => course.id !== id));
      } else {
        console.error("Failed to delete course");
      }
    } catch (err) {
      console.error("Error deleting course:", err);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <div className="flex justify-between items-center p-6 bg-white shadow-md border-b">
        <h1 className="text-2xl font-bold text-blue-800">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-200"
        >
          Logout
        </button>
      </div>

      <div className="max-w-5xl mx-auto p-6">
        {/* Form Section */}
        <form
          onSubmit={handleAddCourse}
          className="bg-white rounded-2xl shadow-lg p-8 mb-12 border border-blue-100"
        >
          <h3 className="text-xl font-semibold text-gray-700 mb-6">
            ➕ Add New Course
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Course Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="border border-gray-300 px-4 py-2 rounded-xl focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="border border-gray-300 px-4 py-2 rounded-xl focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="number"
              placeholder="Capacity"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              required
              className="border border-gray-300 px-4 py-2 rounded-xl focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="number"
              placeholder="Instructor ID"
              value={instructorId}
              onChange={(e) => setInstructorId(e.target.value)}
              required
              className="border border-gray-300 px-4 py-2 rounded-xl focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="mt-6 w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition duration-200"
          >
            Add Course
          </button>

          {message && (
            <p
              className={`mt-4 text-center font-medium ${
                message.startsWith("✅")
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}
        </form>

        {/* Courses Section */}
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">
          📚 All Courses
        </h3>

        {courses.length === 0 ? (
          <p className="text-center text-gray-500">No courses found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white border border-gray-100 rounded-2xl shadow-md p-6 hover:shadow-lg transition duration-300 flex flex-col justify-between"
              >
                <div>
                  <h4 className="text-lg font-bold text-blue-700 mb-1">
                    {course.title}
                  </h4>
                  <p className="text-sm text-gray-600 mb-2">
                    {course.description}
                  </p>
                  {/* <p className="text-sm text-gray-500 mb-1">
                     Capacity: <strong>{course.capacity}</strong>
                  </p> */}
                  <p className="text-sm text-gray-500">
                     Instructor ID: <strong>{course.instructor_id}</strong>
                  </p>
                  <p className="text-sm text-gray-500">
                     Enrolled Students: <strong>{course.students_count}</strong>
                  </p>

                </div>
                <button
                  onClick={() => handleDelete(course.id)}
                  className="mt-4 bg-red-600 hover:bg-red-700 text-white font-medium py-2 rounded-xl transition duration-200"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
