const express = require("express");

const {
  createTeacher,
  getTeachers,
  getTeacherById,
} = require("../controllers/teacherController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

// Create Teacher - Admin only
router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  createTeacher
);

// Get all Teachers - Logged-in users
router.get(
  "/",
  protect,
  getTeachers
);

// Get single Teacher - Logged-in users
router.get(
  "/:id",
  protect,
  getTeacherById
);

module.exports = router;