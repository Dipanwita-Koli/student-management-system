const express = require("express");

const {
  createCourse,
  getCourses,
  getCourseById,
} = require("../controllers/courseController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

// Create Course - Admin only
router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  createCourse
);

// Get all Courses - Logged-in users
router.get(
  "/",
  protect,
  getCourses
);

// Get single Course - Logged-in users
router.get(
  "/:id",
  protect,
  getCourseById
);

module.exports = router;