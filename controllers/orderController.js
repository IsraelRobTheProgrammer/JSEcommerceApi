const Order = require("../models/Order");

// CREATE ORDER
const createOrder = async (req, res) => {
  const newOrder = new Order(req.body);

  try {
    const savedOrder = await newOrder.save();

    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).send(error);
  }
};

// UPDATE ORDER
const updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).send(error);
  }
};

// DELETE ORDER
const deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).send("Order has been deleted");
  } catch (error) {
    res.status(500).send(error);
  }
};

// GET USER ORDERS
const getUserOrder = async (req, res) => {
  try {
    const foundOrder = await Order.find({ userId: req.params.id });
    if (!foundOrder) res.status(404).send("No Order found");
    else {
      res.status(200).json(foundOrder);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// GET ALL
const getAll = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).send(error);
  }
};

// GET MONTHLY INCOME

const getMonthlyIncome = async (req, res) => {
  const date = new Date();
  const lastTwoMonth = new Date(date.setMonth(date.getMonth()));

  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $lte: lastTwoMonth } } },
      {
        $project: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);

    res.status(200).json(income);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createOrder,
  updateOrder,
  deleteOrder,
  getAll,
  getUserOrder,
  getMonthlyIncome,
};
