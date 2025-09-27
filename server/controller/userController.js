const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

// Importing users data
const data = require("../assets/users/users.json");
const userFile = path.join(__dirname, "../assets/users/users.json");

const app = express();
app.use(cors());
app.use(express.json());

// Generate OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000);

const otpStore = {};

const loadUsers = () => JSON.parse(fs.readFileSync(userFile, "utf-8"));
const saveUser = (userDatas) =>
  fs.writeFileSync(userFile, JSON.stringify(userDatas, null, 2));

// Sending OTP to user
const sendOTPMail = async (toEmail, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });

  const mailOptions = {
    from: `"AYEE – Online Shop" <${process.env.EMAIL}>`,
    to: toEmail,
    subject: "Your OTP Code for Sign Up",
    text: `Your OTP is ${otp}.`,
    html: `
      <div style="font-family: Arial; padding: 20px; background: #f4f4f4;">
        <h2>Welcome to AYEE – Online Shop</h2>
        <p>Your OTP code is:</p>
        <div style="font-size: 24px; font-weight: bold; background: #4CAF50; color: #fff; padding: 10px 20px; display: inline-block; border-radius: 6px;">
          ${otp}
        </div>
        <p>This code is valid for 5 minutes.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

// Getting all users
const getUsers = async (req, res) => {
  try {
    const data = loadUsers();
    res.status(200).json(data.users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Getting a user by ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = loadUsers();
    const user = data.users.find((u) => u.id === parseInt(id));
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Loggin in
const logIn = async (req, res) => {
  try {
    const data = loadUsers();
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please fill the form!" });
    }

    const user = data.users.find((u) => u.email === email);

    if (!user) {
      return res.status(400).json({ message: "No user found!" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password!" });
    }

    const token = "123@wedf";

    res.status(200).json({
      message: "Log in successfully!",
      user: { user },
      token: token,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Sending OTP
const sendingOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const userDatas = loadUsers();
    if (!email) res.status(404).json({ message: "Email required!" });

    // Checking email is already registered or not
    const isRegistered = userDatas.users.find((user) => user.email === email);

    if (isRegistered) {
      return res.status(404).json({ message: "Email has already registered!" });
    }

    const otp = generateOTP();
    otpStore[email] = otp;
    await sendOTPMail(email, otp);
    res.status(200).json({ message: "OTP has sent to your email!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create user Data
const createUser = async (req, res) => {
  // For Encryption
  const saltRounds = 10;

  const userDatas = loadUsers();

  try {
    const userData = req.body;

    // Checking all form is filled or not
    const required = [
      "firstName",
      "lastName",
      "email",
      "phoneNo",
      "address",
      "password",
      "confirmPassword",
    ];

    if (required.some((k) => !userData?.[k]?.trim())) {
      return res.status(400).json({ message: "Please fill the form!" });
    }

    if (otpStore[userData.email] === Number(userData.otp)) {
      const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

      const now = new Date();

      const loggedInUser = {
        id: data.users.length + 1,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        phone: userData.phoneNo,
        password: hashedPassword,
        role: "user",
        createdAt: now,
        profileImage: "defaultProfilePic.png",
        shippingAddress: userData.address,
        billingAddress: "",
        preferredPaymentMethod: "",
        loyaltyPoints: 0,
        wishlist: [],
        recentOrders: [],
        membershipTier: "Bronze",
        preferredCategories: [],
        cart: [],
        paymentMethods: [],
        lastLogin: "",
      };

      userDatas.users.push(loggedInUser);
      saveUser(userDatas);
      delete otpStore[userData.email];
      res
        .status(201)
        .json({ message: "User created successfully!", user: loggedInUser });
    } else {
      res.status(404).json({ message: "OTP doesn't match!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update the user profile
const updateUserProfile = async (req, res) => {
  try {
    const usersData = loadUsers();
    const updatedInfos = req.body; // text fields
    const profileImageFile = req.file; // uploaded file
    const { id } = req.params;

    // ✅ find the user by id (convert both to string for safety)
    const user = usersData.users.find((u) => String(u.id) === String(id));
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    if (updatedInfos.currentPwd) {
      const isMatch = await bcrypt.compare(
        updatedInfos.currentPwd,
        user.password
      );

      if (!isMatch) {
        return res
          .status(400)
          .json({ message: "Password is wrong!", status: "currentPassword" });
      }
    }

    // For Encryption
    const saltRounds = 10;

    // Hashing
    updatedInfos.password = await bcrypt.hash(
      updatedInfos.password,
      saltRounds
    );

    // ✅ update text fields
    Object.assign(user, updatedInfos);

    // ✅ update profile image if a file is uploaded
    if (profileImageFile) {
      user.profileImage = profileImageFile.filename;
    }

    // ✅ write updated data back to JSON file
    saveUser(usersData);

    res.status(200).json({
      message: "Profile updated",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Make sure loadUsers is awaited if it returns a Promise
    const usersData = await loadUsers();

    // Find the user to delete
    const deletedUser = usersData.users.find(
      (u) => String(u.id) === String(id)
    );

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Filter out the deleted user
    const updatedUsers = usersData.users.filter(
      (u) => String(u.id) !== String(id)
    );

    // Save updated users
    await saveUser({ users: updatedUsers });

    res
      .status(200)
      .json({ message: "User deleted successfully!", user: deletedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUsers,
  getUserById,
  logIn,
  sendingOtp,
  createUser,
  updateUserProfile,
  deleteUser,
};
