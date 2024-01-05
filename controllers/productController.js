const Product = require("../models/Cart");

// CREATE PRODUCT
const createProduct = async (req, res) => {
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();

    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).send(error);
  }
};

// UPDATE PRODUCT
const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).send(error);
  }
};

// DELETE PRODUCT
const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).send("Product has been deleted");
  } catch (error) {
    res.status(500).send(error);
  }
};

// GET PRODUCT
const getProduct = async (req, res) => {
  try {
    const foundProduct = await Product.findById(req.params.id);
    if (!foundProduct) res.status(404).send("No Product found");
    else {

      res.status(200).json(foundProduct);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// GET ALL PRODUCTS
const getAllProduct = async (req, res) => {
  const queryNew = req.query.new;
  const queryCategory = req.query.category;

  try {
    let foundProduct;

    if (queryNew) {
      foundProduct = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (queryCategory) {
      foundProduct = await Product.find({
        categories: {
          $in: [queryCategory],
        },
      });
    } else {
      foundProduct = await Product.find();
    }
    res.status(200).json(foundProduct);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProduct,
  getProduct,
};
