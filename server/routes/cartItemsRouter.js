const express = require("express");

const {
  addCartItem,
  adjustQuantity,
  deleteAllProducts
} = require("../controller/cartItemsController");

const router = express.Router();

router.post("/users/:id/cart", addCartItem);
router.patch("/users/:id/cart/quantity", adjustQuantity);
router.delete("/users/:id", deleteAllProducts);

module.exports = router;
