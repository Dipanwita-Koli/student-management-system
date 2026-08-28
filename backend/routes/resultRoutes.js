const express = require("express");

const {
  createResult,
  getResults,
  getResultById,
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

module.exports = router;