const fs = require("fs");
const path = require("path");

const data = require("../assets/products/products_list.json");
const productFile = path.join(
  __dirname,
  "../assets/products/products_list.json"
);
const products = data.products;

// Getting all products
const getProducts = async (req, res) => {
  try {
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Getting item by ID
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const item = products.find((i) => i.id === parseInt(id));
    console.log(item);
    res.status(200).json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Create new product
const createProduct = async (req, res) => {
  try {
    const createdProduct = req.body;

    const formattedProduct = {
      id: products.length + 1,
      title: createdProduct.title,
      description: createdProduct.description,
      image: createdProduct.image,
      rating: 0,
      sold: 0,
      valid: true,
      category: createdProduct.category,
      price: createdProduct.price,
    };

    products.push(formattedProduct);

    fs.writeFileSync(
      productFile,
      JSON.stringify({ products: products }, null, 2)
    );

    res.status(200).json({message: "New products is added successfully!", prodcuts: products});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getProducts, getProductById, createProduct };
