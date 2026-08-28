const express = require("express");

const {
  createTeacher,
  getTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
} = require("../controllers/teacherController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

// Create teacher — Admin only
router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  createTeacher
);

// Get all teachers — Admin and Teacher
router.get(
  "/",
  protect,
  authorizeRoles("admin", "teacher"),
  getTeachers
);

// Get single teacher — Admin and Teacher
router.get(
  "/:id",
  protect,
  authorizeRoles("admin", "teacher"),
  getTeacherById
);

// Update teacher — Admin only
router.put(
  "/:id",
  protect,
  authorizeRoles("admin"),
  updateTeacher
);

// Delete teacher — Admin only
router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteTeacher
);

module.exports = router;