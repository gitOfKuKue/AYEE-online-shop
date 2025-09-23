// controllers/products.js
const fs = require("fs");
const path = require("path");

// 🔧 Use a plain utility, not a React hook.
// Make sure ../common/useGenerateId.js exports a plain function like:
//   module.exports = function useGenerateId(prefix, title, time, category) { ... }
const useGenerateId = require("../common/useGenerateId");

// ✅ Correct relative path to the JSON file
const productFile = path.join(
  __dirname,
  "..",
  "assets",
  "products",
  "products_list.json"
);

// Load existing products or start empty
let products = [];
if (fs.existsSync(productFile)) {
  products = JSON.parse(fs.readFileSync(productFile, "utf-8")).products || [];
}

/**
 * GET /api/products
 */
const getProducts = (req, res) => {
  res.json(products);
};

/**
 * GET /api/products/:id
 */
const getProductById = (req, res) => {
  // ✅ IDs are stored as strings for consistency
  const product = products.find((p) => p.id === req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
};

/**
 * POST /api/products
 */
const createProduct = (req, res) => {
  try {
    const { title, price, quantity, category, description, time } = req.body;
    const imageName = req.file ? req.file.filename : null; // only store filename

    const id = useGenerateId("product", title, time, category);

    const newProduct = {
      id,
      title,
      price: parseFloat(price),
      quantity: Number(quantity),
      category,
      description,
      image: imageName,
      rating: 0,
      sold: 0,
      valid: true,
      time,
    };

    products.push(newProduct);

    // ✅ Save and immediately update the in-memory list
    fs.writeFileSync(productFile, JSON.stringify({ products }, null, 2));
    products = JSON.parse(fs.readFileSync(productFile, "utf-8")).products;

    res.status(201).json({
      message: "Product created successfully!",
      product: newProduct,
      products, // include updated list for instant refresh
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * PUT /api/products/:id
 */
const updateProduct = (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, price, category, quantity, valid } = req.body;

    const index = products.findIndex((p) => p.id === id);
    if (index === -1) {
      return res.status(404).json({ message: "Product not found!" });
    }

    // ✅ Ensure valid is parsed correctly from form data ("true"/"false")
    const parsedValid =
      typeof valid === "boolean"
        ? valid
        : String(valid).toLowerCase() === "true";

    // Update fields
    products[index] = {
      ...products[index],
      title,
      description,
      price: Number(price),
      quantity: Number(quantity),
      category,
      valid: parsedValid,
      // If a new file is uploaded, update the image filename
      ...(req.file && { image: req.file.filename }),
    };

    // Save back to JSON file
    fs.writeFileSync(productFile, JSON.stringify({ products }, null, 2));

    res.status(200).json({
      message: "Product updated successfully!",
      product: products[index],
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getProducts, getProductById, createProduct, updateProduct };
