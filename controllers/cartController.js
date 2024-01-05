const Cart = require("../models/Cart");

// CREATE CART
const createCart = async (req, res) => {
  const newCart = new Cart(req.body);

  try {
    const savedCart = await newCart.save();

    res.status(201).json(savedCart);
  } catch (error) {
    res.status(500).send(error);
  }
};

// UPDATE CART
const updateCart = async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).send(error);
  }
};

// DELETE CART
const deleteCart = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).send("Cart has been deleted");
  } catch (error) {
    res.status(500).send(error);
  }
};

// GET USER CART
const getUserCart = async (req, res) => {
  try {
    const foundCart = await Cart.findOne({ userId: req.params.id });
    if (!foundCart) res.status(404).send("No Cart found");
    else {
      res.status(200).json(foundCart);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// GET ALL
const getAll = async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createCart,
  updateCart,
  deleteCart,
  getAll,
  getUserCart,
};
