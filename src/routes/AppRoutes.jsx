import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/auth/Login";
import AdminDashboard from "../pages/admin/Dashboard";
import Students from "../pages/admin/Students";
import TeacherDashboard from "../pages/teacher/Dashboard";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
      <Route path="/" element={<Login />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/students" element={<Students />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;