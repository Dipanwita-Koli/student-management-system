const express = require("express");

const {
  createStudent,
  getStudents,
  getStudentById,
  deleteStudent,
} = require("../controllers/studentController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

// Create student — Admin only
router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  createStudent
);

// Get all students — Admin and Teacher
router.get(
  "/",
  protect,
  authorizeRoles("admin", "teacher"),
  getStudents
);

// Get single student — Admin and Teacher
router.get(
  "/:id",
  protect,
  authorizeRoles("admin", "teacher"),
  getStudentById
);

// Delete student — Admin only
router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteStudent
);

module.exports = router;