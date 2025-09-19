const express = require("express");

const {
  getCartItems,
  getCartItem,
  addCartItem,
} = require("../controller/cartItemsController");

const router = express.Router();

router.get("/cartItems", getCartItems);
router.get("/cartItems/:id", getCartItem);
router.post("/cartItems", addCartItem);

module.exports = router;
