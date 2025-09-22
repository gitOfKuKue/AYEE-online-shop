const fs = require("fs");
const path = require("path");

// ✅ Correct relative path
const productFile = path.join(__dirname, "..", "assets", "products", "products_list.json");

// Load existing products or start empty
let products = [];
if (fs.existsSync(productFile)) {
  products = JSON.parse(fs.readFileSync(productFile, "utf-8")).products || [];
}

const getProducts = (req, res) => {
  res.json(products);
};

const getProductById = (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id, 10));
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
};

const createProduct = (req, res) => {
  try {
    const { title, price, category, description } = req.body;
    const imageName = req.file ? req.file.filename : null; // only store filename

    const newProduct = {
      id: products.length + 1,
      title,
      price,
      category,
      description,
      image: imageName,
      rating: 0,
      sold: 0,
      valid: true,
    };

    products.push(newProduct);

    // ✅ Save and immediately update the in-memory list
    fs.writeFileSync(productFile, JSON.stringify({ products }, null, 2));
    // (optional) reload to guarantee sync if multiple processes are writing
    products = JSON.parse(fs.readFileSync(productFile, "utf-8")).products;

    // ✅ Send back the updated products list so the frontend can refresh immediately
    res.status(201).json({
      message: "Product created successfully!",
      product: newProduct,
      products,   // include updated list for instant refresh
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = { getProducts, getProductById, createProduct };
