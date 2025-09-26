const express = require("express");

const {
  getUsers,
  getUserById,
  logIn,
  sendingOtp,
  createUser,
} = require("../controller/userController");

const router = express.Router();

router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.post("/login", logIn);
router.post("/sign-up/sendingOtp", sendingOtp);
router.post("/users", createUser);

module.exports = router;
