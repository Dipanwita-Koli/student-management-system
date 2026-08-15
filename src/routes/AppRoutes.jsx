import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/auth/Login";
import AdminDashboard from "../pages/admin/Dashboard";
import Students from "../pages/admin/Students";
import Departments from "../pages/admin/Departments";
import Courses from "../pages/admin/Courses";
import TeacherDashboard from "../pages/teacher/Dashboard";
import StudentDashboard from "../pages/student/Dashboard";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/students" element={<Students />} />
      <Route path="/admin/departments" element={<Departments />} />
      <Route path="/admin/courses" element={<Courses />} />

      <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
      <Route path="/student/dashboard" element={<StudentDashboard />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;