const express = require("express");

const {
  addCartItem,
  adjustQuantity
} = require("../controller/cartItemsController");

const router = express.Router();

router.post("/users/:id/cart", addCartItem);
router.patch("/users/:id/cart/quantity", adjustQuantity);

module.exports = router;
