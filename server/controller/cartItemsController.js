const express = require("express");
const cors = require("cors");

const app = express();

// Getting all items in cart
const getCartItems = async (req, res) => {
  try {
    res.status(200).json(cartItems);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Getting item in cart by Id
const getCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const searchedItem = cartItems.carts.find(
      (item) => item.id === parseInt(id)
    );

    res.status(200).json(searchedItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Adding item to cart
const addCartItem = async (req, res) => {
  try {
    const sentItem = req.body;

    return res.status(200).json({ message: "Hello"});

    // ✅ Add new item to cart
    cartItems.carts.push(addedItem);

    // ✅ Respond with updated cart
    res.status(201).json({
      message: "Item added successfully!",
      item: addedItem,
      carts: cartItems.carts,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getCartItems, getCartItem, addCartItem };
