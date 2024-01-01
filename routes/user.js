const {
  updateUser,
  deleteUser,
  getUser,
  getAllUser,
  getUserStats,
} = require("../controllers/userController");

const {
  checkAllPermission,
  checkAdminPermission,
} = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.put("/:id", checkAllPermission, updateUser);

router.delete("/:id", checkAllPermission, deleteUser);

router.get("/find/:id", checkAdminPermission, getUser);

router.get("/", checkAdminPermission, getAllUser);

router.get("/stats", checkAdminPermission, getUserStats);

module.exports = router;
