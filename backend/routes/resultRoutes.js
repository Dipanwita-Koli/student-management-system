const express = require("express");

const {
  createResult,
  getResults,
  getResultById,
  updateResult,
  deleteResult,
} = require("../controllers/resultController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

// Create Result - Admin and Teacher
router.post(
  "/",
  protect,
  authorizeRoles("admin", "teacher"),
  createResult
);

// Get all Results - Logged-in users
router.get(
  "/",
  protect,
  getResults
);

// Get single Result - Logged-in users
router.get(
  "/:id",
  protect,
  getResultById
);

// Update Result - Admin and Teacher
router.put(
  "/:id",
  protect,
  authorizeRoles("admin", "teacher"),
  updateResult
);

// Delete Result - Admin only
router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteResult
);

module.exports = router;