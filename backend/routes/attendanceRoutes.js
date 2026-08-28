const express = require("express");

const {
  createAttendance,
  getAttendances,
  getAttendanceById,
} = require("../controllers/attendanceController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

// Create Attendance - Admin and Teacher
router.post(
  "/",
  protect,
  authorizeRoles("admin", "teacher"),
  createAttendance
);

// Get all Attendance - Logged-in users
router.get(
  "/",
  protect,
  getAttendances
);

// Get single Attendance - Logged-in users
router.get(
  "/:id",
  protect,
  getAttendanceById
);

module.exports = router;