const JWT = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
  const authHeader = req?.headers?.authorization;

  if (!authHeader || !authHeader?.startsWith("Bearer")) {
    console.log("auth 1");
    next("Authentication failed");
  }

  const token = authHeader?.split(" ")[1];

  try {
    const userToken = JWT.verify(token, process.env.JWT_SECRET_KEY);
    console.log("auth 2");

    req.user = {
      userId: userToken.userId,
      userType: userToken.isAdmin,
    };

    next();
  } catch (error) {
    console.log("auth 3");
    console.log(error);
    next("Authentication failed");
  }
};

const checkAllPermission = (req, res, next) => {
  userAuth(req, res, () => {
    if (req.user.userId === req.params.id || req.user.userType) {
      next();
    } else {
      res.status(403).send("You're not allowed to carry out this operation");
    }
  });
};

const checkAdminPermission = (req, res, next) => {
  userAuth(req, res, () => {
    if (req.user.userType) {
      next();
    } else {
      res.status(403).send("You're not allowed to carry out this operation");
    }
  });
};

module.exports = { checkAllPermission, userAuth, checkAdminPermission };
