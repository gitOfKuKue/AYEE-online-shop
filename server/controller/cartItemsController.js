const fs = require("fs");
const path = require("path");

// Path to the JSON file so we can write changes back
const usersFile = path.join(__dirname, "../assets/users/users.json");

/**
 * POST /api/users/:id/cart
 * Add a new product to a user's cart
 */
const addCartItem = async (req, res) => {
  const userDatas = JSON.parse(fs.readFileSync(usersFile, "utf-8"));
  try {
    const userId = parseInt(req.params.id, 10); // :id from URL
    const { productId, quantity } = req.body; // from request body

    if (!productId || !quantity) {
      return res
        .status(400)
        .json({ error: "productId and quantity are required" });
    }

    // Find the user
    const user = userDatas.users.find((u) => u.id === userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Push the new item into the user's cart
    user.cart.push({ productId, quantity });

    // Persist changes back to the JSON file
    fs.writeFileSync(usersFile, JSON.stringify(userDatas, null, 2));

    return res.status(201).json({
      message: "Items added successfully!",
      cart: user.cart,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// ✅ Adjust the quantity of a product in a user's cart
//    - Increase or decrease depending on the `action` sent in body
//    - Remove the item if quantity reaches 0
const adjustQuantity = async (req, res) => {
  try {
    const userDatas = JSON.parse(fs.readFileSync(usersFile, "utf-8"));
    const userId = Number(req.params.id);
    const { productId, action } = req.body; // action: "increment" | "decrement"

    if (!productId) {
      return res.status(400).json({ message: "productId is required" });
    }
    if (!["increment", "decrement"].includes(action)) {
      return res
        .status(400)
        .json({ message: "action must be 'increment' or 'decrement'" });
    }

    // ---- Find user ----
    const user = userDatas.users.find((u) => u.id === userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ---- Find product in cart ----
    const cartItem = user.cart.find(
      (item) => Number(item.productId) === Number(productId)
    );
    if (!cartItem) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    // ---- Adjust quantity ----
    if (action === "increment") {
      cartItem.quantity += 1;
    } else if (action === "decrement") {
      cartItem.quantity -= 1;
      // remove item completely if quantity <= 0
      if (cartItem.quantity <= 0) {
        user.cart = user.cart.filter(
          (item) => Number(item.productId) !== Number(productId)
        );
      }
    }

    // ---- Save back to JSON file ----
    fs.writeFileSync(usersFile, JSON.stringify(userDatas, null, 2));

    return res.status(200).json({
      message: "Cart updated successfully",
      user, // return the updated user or just user.cart if you prefer
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { addCartItem, adjustQuantity };
