const express = require("express");

const {
  createDepartment,
  getDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
} = require("../controllers/departmentController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

// Create department — Admin only
router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  createDepartment
);

// Get all departments — Admin and Teacher
router.get(
  "/",
  protect,
  authorizeRoles("admin", "teacher"),
  getDepartments
);

// Get single department — Admin and Teacher
router.get(
  "/:id",
  protect,
  authorizeRoles("admin", "teacher"),
  getDepartmentById
);

// Update department — Admin only
router.put(
  "/:id",
  protect,
  authorizeRoles("admin"),
  updateDepartment
);

// Delete department — Admin only
router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteDepartment
);

module.exports = router;