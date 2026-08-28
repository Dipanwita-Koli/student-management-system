const express = require("express");

const {
  createEnrollment,
  getEnrollments,
  getEnrollmentById,
  updateEnrollment,
  deleteEnrollment,
} = require("../controllers/enrollmentController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

// Create enrollment — Admin only
router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  createEnrollment
);

// Get all enrollments — Admin and Teacher
router.get(
  "/",
  protect,
  authorizeRoles("admin", "teacher"),
  getEnrollments
);

// Get single enrollment — Admin and Teacher
router.get(
  "/:id",
  protect,
  authorizeRoles("admin", "teacher"),
  getEnrollmentById
);

// Update enrollment — Admin only
router.put(
  "/:id",
  protect,
  authorizeRoles("admin"),
  updateEnrollment
);

// Delete enrollment — Admin only
router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteEnrollment
);

module.exports = router;