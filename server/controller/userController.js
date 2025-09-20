const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

// Importing users data
const data = require("../assets/users/users.json");
const userFile = path.join(__dirname, "../assets/users/users.json");

const app = express();

app.use(cors());
app.use(express.json());

// Getting all users
const getUsers = async (req, res) => {
  try {
    res.status(200).json(data.users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Getting a user by ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = data.users.find((u) => u.id === parseInt(id));
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Loggin in
const logIn = async (req, res) => {
  try {
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

// Create user Data
const createUser = async (req, res) => {
  // For Encryption
  const saltRounds = 10;

  const userDatas = JSON.parse(fs.readFileSync(userFile, "utf-8"));

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

    // Checking email is already registered or not
    const isRegistered = userDatas.users.find(
      (user) => user.email === userData.email
    );

    if (isRegistered) {
      return res.status(400).json({ message: "Email is already registered!" });
    }

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
      profileImage: null,
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

    // Writing data into json file
    fs.writeFileSync(userFile, JSON.stringify(userDatas, null, 2));

    res
      .status(201)
      .json({ message: "User created successfully!", user: loggedInUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getUsers, getUserById, logIn, createUser };
