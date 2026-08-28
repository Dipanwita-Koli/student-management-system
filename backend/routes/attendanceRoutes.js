const express = require("express");

const {
  createAttendance,
  getAttendances,
  getAttendanceById,
  updateAttendance,
  deleteAttendance,
} = require("../controllers/attendanceController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

// Create attendance — Admin and Teacher
router.post(
  "/",
  protect,
  authorizeRoles("admin", "teacher"),
  createAttendance
);

// Get all attendance — Admin and Teacher
router.get(
  "/",
  protect,
  authorizeRoles("admin", "teacher"),
  getAttendances
);

// Get single attendance — Admin and Teacher
router.get(
  "/:id",
  protect,
  authorizeRoles("admin", "teacher"),
  getAttendanceById
);

// Update attendance — Admin and Teacher
router.put(
  "/:id",
  protect,
  authorizeRoles("admin", "teacher"),
  updateAttendance
);

// Delete attendance — Admin only
router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteAttendance
);

module.exports = router;