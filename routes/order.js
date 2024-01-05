const router = require("express").Router();

const {
  createOrder,
  updateOrder,
  deleteOrder,
  getAll,
  getUserOrder,
  getMonthlyIncome,
} = require("../controllers/orderController");

const {
  checkAllPermission,
  userAuth,
  checkAdminPermission,
} = require("../middlewares/authMiddleware");

router.post("/", userAuth, createOrder);

router.put("/:id", checkAdminPermission, updateOrder);

router.delete("/:id", checkAdminPermission, deleteOrder);

router.get("/", checkAllPermission, getUserOrder);

router.get("/", checkAdminPermission, getAll);

router.get("/monthlyIncome", checkAdminPermission, getMonthlyIncome);

module.exports = router;
