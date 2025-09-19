const data = require("../assets/products/products_list.json");
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
    const item = products.find(i => i.id === parseInt(id));
    console.log(item);
    res.status(200).json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getProducts, getProductById };
