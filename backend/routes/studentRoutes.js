const express = require("express");

const {
  createStudent,
  getStudents,
  getStudentById,
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

module.exports = router;