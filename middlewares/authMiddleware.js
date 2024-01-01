const JWT = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
  const authHeader = req?.headers?.authorization;

  if (!authHeader || !authHeader?.startsWith("Bearer")) {
    // next("Authentication failed");
  }

  const token = authHeader?.split(" ")[1];

  try {
    const userToken = JWT.verify(token, process.env.JWT_SECRET_KEY);

    req.user = {
      userId: userToken.userId,
      userType: userToken.userType,
    };

    next();
  } catch (error) {
    res.status(401).json({ error: error.name, message: error.message });
    // next("Authentication failed");
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
    console.log(req.user);
    if (req.user.userType) {
      next();
    } else {
      res.status(403).send("You're not allowed to carry out this operation");
    }
  });
};

module.exports = { checkAllPermission, userAuth, checkAdminPermission };
