const crypto = require("crypto-js");
const User = require("../models/User");

// UPDATE USER
const updateUser = async (req, res) => {
  if (req.body.password) {
    req.body.password = crypto.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY
    ).toString();
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).send(error);
  }
};

// DELETE USER
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).send("User has been deleted");
  } catch (error) {
    res.status(500).send(error);
  }
};

// GET USER
const getUser = async (req, res) => {
  try {
    const foundUser = await User.findById(req.params.id);
    if (!foundUser) res.status(404).send("No User found");
    else {
      foundUser.password = undefined;

      res.status(200).json(foundUser);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// GET ALL USERS
const getAllUser = async (req, res) => {
  const querySearch = req.query.new;

  try {
    const foundUsers = querySearch
      ? await User.find().sort({ _id: -1 }).limit(1)
      : await User.find();
    if (!foundUsers) res.status(404).send("No User found");
    else {
      foundUsers.password = undefined;

      res.status(200).json(foundUsers);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// GET USER STATS
const getUserStats = async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = { updateUser, deleteUser, getUser, getAllUser, getUserStats };
