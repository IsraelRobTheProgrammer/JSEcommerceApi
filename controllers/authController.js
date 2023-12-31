const User = require("../models/User");
const crypto = require("crypto-js");

// register
const register = async (req, res) => {
  try {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: crypto.AES.encrypt(
        req.body.password,
        process.env.SECRET_KEY
      ).toString(),
      isAdmin: false || req.body.isAdmin,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      _id: savedUser._id,
      username: savedUser.username,
      email: savedUser.email,
      isAdmin: savedUser.isAdmin,
    });
  } catch (error) {
    console.log(error, "sorry an error occured");
    res.status(500).json(error);
  }
};

// login
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const foundUser = await User.findOne({ username });
    !foundUser && res.status(401).json("Wrong Credentials");

    const hashPwd = crypto.AES.decrypt(
      foundUser.password,
      process.env.SECRET_KEY
    );

    const pwd = hashPwd.toString(crypto.enc.Utf8);
    pwd !== password && res.status(401).json("Wrong Credentials");

    const accessToken = foundUser.createJWT();

    foundUser.password = undefined;
    res.status(200).json({
      success: true,
      message: "Login successfully",
      foundUser,
      accessToken,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { login, register };
