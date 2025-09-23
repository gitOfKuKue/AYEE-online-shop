const fs = require("fs");
const path = require("path");

// Path to the JSON file so we can write changes back
const usersFile = path.join(__dirname, "../assets/users/users.json");
const productsFile = path.join(
  __dirname,
  "../assets/products/products_list.json"
);

/**
 * POST /api/users/:id/cart
 * Add a new product to a user's cart
 */
const addCartItem = async (req, res) => {
  const userDatas = JSON.parse(fs.readFileSync(usersFile, "utf-8"));
  const productDatas = JSON.parse(fs.readFileSync(productsFile, "utf-8"));
  try {
    const userId = parseInt(req.params.id, 10); // user id remains numeric
    const { productId, quantity } = req.body; // productId will be a string

    if (!productId || typeof quantity !== "number") {
      return res.status(400).json({
        error: "productId (string) and quantity (number) are required",
      });
    }

    // Find the user
    const user = userDatas.users.find((u) => u.id === userId);
    const product = productDatas.products.find((p) => p.id === productId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // ✅ check available stock BEFORE pushing to cart
    if (product.quantity < quantity) {
      return res.status(400).json({
        error: `Out of stock! Only ${product.quantity} left.`,
      });
    }

    // Push the new item into the user's cart
    user.cart.push({ productId: String(productId), quantity });
    product.quantity -= quantity;

    // Persist changes back to the JSON file
    fs.writeFileSync(usersFile, JSON.stringify(userDatas, null, 2));
    fs.writeFileSync(productsFile, JSON.stringify(productDatas, null, 2));

    return res.status(201).json({
      message: "Items added successfully!",
      cart: user.cart,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * PATCH /api/users/:id/cart/quantity
 * Increase or decrease a product quantity in a user's cart
 */
const adjustQuantity = async (req, res) => {
  try {
    const userDatas = JSON.parse(fs.readFileSync(usersFile, "utf-8"));
    const productDatas = JSON.parse(fs.readFileSync(productsFile, "utf-8"));
    const userId = parseInt(req.params.id, 10);
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
    const product = productDatas.products.find((p) => p.id === productId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // ---- Find product in cart (compare as string) ----
    const cartItem = user.cart.find(
      (item) => String(item.productId) === String(productId)
    );
    if (!cartItem) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    // ---- Adjust quantity ----
    if (action === "increment") {
      if (product.quantity <= 0) {
        return res
          .status(400)
          .json({ message: "Out of stock! No more items available." });
      }
      cartItem.quantity += 1;
      product.quantity -= 1;
    } else if (action === "decrement") {
      cartItem.quantity -= 1;
      product.quantity += 1;
      // remove item completely if quantity <= 0
      if (cartItem.quantity <= 0) {
        user.cart = user.cart.filter(
          (item) => String(item.productId) !== String(productId)
        );
      }
    }

    // ---- Save back to JSON file ----
    fs.writeFileSync(usersFile, JSON.stringify(userDatas, null, 2));
    fs.writeFileSync(productsFile, JSON.stringify(productDatas, null, 2));

    return res.status(200).json({
      message: "Cart updated successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

/**
 * DELETE /api/users/:id/cart
 * Delete all products in a user's cart
 */
const deleteAllProducts = async (req, res) => {
  try {
    const { id } = req.params;

    const userDatas = JSON.parse(fs.readFileSync(usersFile, "utf-8"));
    const user = userDatas.users.find((user) => user.id === Number(id));
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    user.cart = [];

    fs.writeFileSync(usersFile, JSON.stringify(userDatas, null, 2));
    res.status(200).json({ message: "Cleared all products!", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addCartItem, adjustQuantity, deleteAllProducts };
