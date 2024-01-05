const router = require("express").Router();

const {
  createCart,
  updateCart,
  deleteCart,
  getAll,
  getUserCart,
} = require("../controllers/cartController");

const {
  checkAllPermission,
  userAuth,
  checkAdminPermission,
} = require("../middlewares/authMiddleware");

router.post("/", userAuth, createCart);

router.put("/:id", checkAllPermission, updateCart);

router.delete("/:id", checkAllPermission, deleteCart);

router.get("/", checkAllPermission, getUserCart);

router.get("/", checkAdminPermission, getAll);

module.exports = router;
