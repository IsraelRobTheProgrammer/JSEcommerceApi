const { checkAllPermission } = require("../middlewares/authMiddleware");
const crypto = require("crypto-js");
const User = require("../models/User");

const router = require("express").Router();

router.put("/:id", checkAllPermission, async (req, res) => {
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
});

module.exports = router;
