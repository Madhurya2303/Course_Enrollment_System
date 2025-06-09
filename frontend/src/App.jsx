import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Intro from "./pages/Intro";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CourseList from "./pages/CourseList";
import MyEnrollments from "./pages/MyEnrollments";
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Intro />} />
        {/* <Route path="/" element={<Login />} /> */}
        <Route path="/login/:role" element={<Login />} />
        <Route path="/register/:role" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/courses" element={<CourseList />} />
        <Route path="/my-enrollments" element={<MyEnrollments />} />
      </Routes>
    </Router>
  );
}