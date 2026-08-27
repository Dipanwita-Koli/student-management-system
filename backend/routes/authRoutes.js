const express = require("express");
const { registerUser, loginUser, getMe } = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);

router.get("/admin-test", protect, authorizeRoles("admin"), (req, res) => {
  res.json({
    message: "Welcome Admin! You have admin access.",
  });
});

module.exports = router;