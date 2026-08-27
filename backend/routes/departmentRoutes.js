const express = require("express");
const {
  createDepartment,
  getDepartments,
} = require("../controllers/departmentController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  createDepartment
);

router.get(
  "/",
  protect,
  getDepartments
);

module.exports = router;