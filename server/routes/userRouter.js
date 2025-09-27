const express = require("express");
const fs = require("fs");
const path = require("path");

const {
  getUsers,
  getUserById,
  logIn,
  sendingOtp,
  createUser,
  updateUserProfile,
  deleteUser,
} = require("../controller/userController");
const multer = require("multer");

const uploadDir = path.join(__dirname, "..", "uploads", "users");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = Date.now() + ext;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

const router = express.Router();

router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.post("/login", logIn);
router.post("/sign-up/sendingOtp", sendingOtp);
router.post("/users", createUser);
router.patch("/users/:id", upload.single("profileImage"), updateUserProfile);
router.delete("/users/:id", deleteUser);

module.exports = router;
