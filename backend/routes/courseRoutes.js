const express = require("express");

const {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

// Create course — Admin only
router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  createCourse
);

// Get all courses — Admin and Teacher
router.get(
  "/",
  protect,
  authorizeRoles("admin", "teacher"),
  getCourses
);

// Get single course — Admin and Teacher
router.get(
  "/:id",
  protect,
  authorizeRoles("admin", "teacher"),
  getCourseById
);

// Update course — Admin only
router.put(
  "/:id",
  protect,
  authorizeRoles("admin"),
  updateCourse
);

// Delete course — Admin only
router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteCourse
);

module.exports = router;