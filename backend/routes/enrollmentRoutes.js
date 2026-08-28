const express = require("express");

const {
  createEnrollment,
  getEnrollments,
  getEnrollmentById,
} = require("../controllers/enrollmentController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

// Create Enrollment - Admin only
router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  createEnrollment
);

// Get all Enrollments - Logged-in users
router.get(
  "/",
  protect,
  getEnrollments
);

// Get single Enrollment - Logged-in users
router.get(
  "/:id",
  protect,
  getEnrollmentById
);

module.exports = router;